/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import toast from "react-hot-toast";
import { WebcamIcon, Mic, CircleStop, Loader2 } from "lucide-react";
import useSpeechToText from "react-hook-speech-to-text";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

import { Button } from "@/components/ui/button";
import { generateInterviewAnswerFeedback } from "@/server-actions/feeback-ai-server-actions";
import { storeUserAnswerInDB } from "@/server-actions/mock-interview-server-actions";


const EnableWebcamRecordAnsGetAIFeedback = ({ wholeInterviewData, mockInterviewQuestionAnswerData, questionAnswerIndexSelectedByUser }) => {

  const { user } = useUser();

  const { error, isRecording, results, setResults, startSpeechToText, stopSpeechToText } = useSpeechToText({
      continuous: true,
      useLegacyResults: false,
    });

  const [isWebCamEnabled, setIsWebCamEnabled] = useState(false);

  const [ isGeneratingFeedbackandStoringDataInDB, setIsGeneratingFeedbackandStoringDataInDB ] = useState(false);

  const shouldSaveAnswerRef = useRef(false);
  /**
   * This ref is used to remember whether the user has clicked
   * the "Stop Recording" button.
   *
   * We start with false because initially the user has NOT asked
   * us to save their answer.
   *
   * Think of it like a small box:
   *
   *     shouldSaveAnswerRef.current
   *                 ↓
   *              [ false ]
   *
   * When the user clicks "Stop Recording", we change the value:
   *
   *     shouldSaveAnswerRef.current = true;
   *
   * Now the box contains:
   *
   *     shouldSaveAnswerRef.current
   *                 ↓
   *              [ true ]
   *
   * The useEffect checks this value:
   *
   *     if (!shouldSaveAnswerRef.current) {
   *       return;
   *     }
   *
   * This means:
   *
   *     false → "The user has NOT clicked Stop yet.
   *              Do nothing."
   *
   *     true  → "The user clicked Stop.
   *              Now we should process and save the answer."
   *
   * We use useRef instead of useState because changing this value
   * does NOT need to update the UI or cause the component to render
   * again.
   *
   * Another important point:
   *
   * With useRef, the actual value is stored inside `.current`.
   *
   * Therefore:
   *
   *     shouldSaveAnswerRef
   *     ↓
   *     { current: false }
   *
   * To read the value:
   *
   *     shouldSaveAnswerRef.current
   *
   * To change the value:
   *
   *     shouldSaveAnswerRef.current = true;
   */

  const hasSavedAnswerRef = useRef(false);
  /**
   * INPUT / OUTPUT EXAMPLE:
   *
   * Suppose the user does the following:
   *
   *     1. Clicks "Record Your Answer"
   *     2. Says: "React is a JavaScript library."
   *     3. Clicks "Stop Recording"
   *
   *
   * At the beginning:
   *
   *     shouldSaveAnswerRef.current = false
   *
   * This means:
   *
   *     "The user has not clicked Stop yet.
   *      Do not process/save the answer."
   *
   *
   * When the user clicks "Record Your Answer":
   *
   *     shouldSaveAnswerRef.current = false;
   *
   *     startSpeechToText();
   *
   * Now:
   *
   *     shouldSaveAnswerRef.current = false
   *     isRecording = true
   *
   *
   * While the user is speaking, `results` can change multiple times.
   * For example:
   *
   *     results = ["React"]
   *
   *     results = ["React is"]
   *
   *     results = ["React is a JavaScript"]
   *
   *     results = ["React is a JavaScript library."]
   *
   * Every time `results` changes, the useEffect can run because
   * `results` is one of its dependencies:
   *
   *     useEffect(() => {
   *       // ...
   *     }, [isRecording, results]);
   *
   * However, while the user is still speaking:
   *
   *     isRecording = true
   *
   * Therefore, this condition stops the effect immediately:
   *
   *     if (isRecording) {
   *       return;
   *     }
   *
   * So nothing is saved while the user is still speaking.
   *
   *
   * ---------------------------------------------------------------
   * WHEN THE USER CLICKS "STOP RECORDING":
   * ---------------------------------------------------------------
   *
   * The following code runs:
   *
   *     shouldSaveAnswerRef.current = true;
   *     stopSpeechToText();
   *
   * Now:
   *
   *     shouldSaveAnswerRef.current = true
   *
   * This means:
   *
   *     "The user has finished speaking.
   *      Process the answer when the final speech result is ready."
   *
   *
   * After speech recognition stops:
   *
   *     isRecording = false
   *
   * The useEffect can now continue because:
   *
   *     if (isRecording) {
   *       return;
   *     }
   *
   * does NOT return when `isRecording` is false.
   *
   *
   * The effect then checks:
   *
   *     if (!shouldSaveAnswerRef.current) {
   *       return;
   *     }
   *
   * Because:
   *
   *     shouldSaveAnswerRef.current = true
   *
   * the effect continues.
   *
   *
   * The results are converted into one complete answer:
   *
   *     results
   *       ↓
   *     ["React is a JavaScript library."]
   *       ↓
   *     completeUserAnswer
   *       ↓
   *     "React is a JavaScript library."
   *
   * Then:
   *
   *     shouldSaveAnswerRef.current = false;
   *
   * This is very important.
   *
   * It means:
   *
   *     "We have already handled the Stop action.
   *      Do not process it again."
   *
   * Finally:
   *
   *     saveUserAnswer(completeUserAnswer);
   *
   * is called.
   *
   *
   * OUTPUT:
   *
   *     Question:
   *     "What is React?"
   *
   *     User's Answer:
   *     "React is a JavaScript library."
   *
   *
   * ---------------------------------------------------------------
   * WHAT IF THE useEffect RUNS AGAIN?
   * ---------------------------------------------------------------
   *
   * This is possible because the useEffect depends on:
   *
   *     [isRecording, results]
   *
   * Therefore, React can execute the effect again if either
   * `isRecording` or `results` changes.
   *
   * Now imagine that the speech-to-text library updates `results`
   * one more time with the final result. In this case, 'results'
   * changes, so, 'useEffect' runs AGAIN.
   *
   * For example, suppose the answer has already been processed.
   *
   * At this point:
   *
   *     isRecording = false
   *
   *     shouldSaveAnswerRef.current = false
   *
   * Now suppose `results` changes one more time and the useEffect
   * runs again.
   *
   * The effect first checks:
   *
   *     if (isRecording) {
   *       return;
   *     }
   *
   * `isRecording` is false, so it continues.
   *
   * Then it checks:
   *
   *     if (!shouldSaveAnswerRef.current) {
   *       return;
   *     }
   *
   * But:
   *
   *     shouldSaveAnswerRef.current = false
   *
   * Therefore:
   *
   *     !false = true
   *
   * So the effect executes:
   *
   *     return;
   *
   * The effect stops here.
   *
   * `saveUserAnswer()` is NOT called again.
   *
   *
   * Therefore, even if the useEffect runs again because `results`
   * changes, the answer is not processed again because
   * `shouldSaveAnswerRef.current` was changed back to false after
   * the original Stop action was handled.
   *
   *
   * SIMPLE WAY TO REMEMBER:
   *
   *     false
   *       ↓
   *     User is recording / nothing to save yet
   *
   *     true
   *       ↓
   *     User clicked Stop
   *       ↓
   *     Process the answer
   *
   *     false
   *       ↓
   *     Stop action has already been handled
   *       ↓
   *     Do not process it again
   */

  const generateAIFeedbackAndSaveUserAnswerInDB = async (completeUserAnswer) => {

    try {

      if (!completeUserAnswer?.trim()) {

        toast.error("No answer was recorded. Please try again.");

        return;

      }

      if (completeUserAnswer.trim().length < 10) {

        toast.error("Error while saving your answer. Please record again.");

        return;
        
      }
      
      const res = await generateInterviewAnswerFeedback(
        mockInterviewQuestionAnswerData[questionAnswerIndexSelectedByUser]?.question,
        completeUserAnswer,
      );

      if (res) {

        const parsedRes = JSON.parse(res);

        const storeUserAnswerDataInDB = await storeUserAnswerInDB(
          wholeInterviewData?.uniqueMockInterviewId,
          mockInterviewQuestionAnswerData[questionAnswerIndexSelectedByUser]?.question,
          mockInterviewQuestionAnswerData[questionAnswerIndexSelectedByUser]?.answer,
          completeUserAnswer,
          parsedRes?.feedback,
          parsedRes?.rating,
          user?.emailAddresses[0]?.emailAddress,
          moment().format('DD-MM-yyyy'),
        );

        if (storeUserAnswerDataInDB?.success) {

          toast.success(storeUserAnswerDataInDB?.message);

          setResults([]);

        }

      }

    } catch (error) {

      console.log("Error while saving user answer:", error);

      toast.error("Something went wrong while saving your answer.");

    } finally {

      setIsGeneratingFeedbackandStoringDataInDB(false);

    }

  };

  useEffect(() => {

    if (error) {

      toast.error("Web Speech API is not available in this browser");

    }

  }, [error]);

  useEffect(() => {

    if (isRecording) {

      return;

    }

    if (!shouldSaveAnswerRef.current) {

      return;

    }

    if (hasSavedAnswerRef.current) {

      return;

    }

    if (!results?.length) {

      return;

    }

    const completeUserAnswer = results.map((result) => result?.transcript || "").join(" ").trim();

    if (!completeUserAnswer) {

      return;

    }

    hasSavedAnswerRef.current = true;

    shouldSaveAnswerRef.current = false;

    generateAIFeedbackAndSaveUserAnswerInDB(completeUserAnswer);

  }, [isRecording, results]);

  return (
    <div>

      {isWebCamEnabled ? (
        <>

          <Webcam
            className="w-full h-72 my-7 rounded-lg border object-cover"
            mirrored={true}
            onUserMedia={() => {

              setIsWebCamEnabled(true);

              toast.success("Camera enabled successfully");

            }}
            onUserMediaError={(error) => {

              console.log(error);

              setIsWebCamEnabled(false);

              toast.error("Something went wrong while enabling camera");

            }}
          />

          {isGeneratingFeedbackandStoringDataInDB ? (

            <Button
              variant="secondary"
              disabled
              className="w-full mt-3 py-5"
            >

              <Loader2 className="animate-spin" />

              <span>Generating feedback...</span>

            </Button>

          ) : isRecording ? (

            <Button
              variant="secondary"
              className="w-full mt-3 py-5 hover:cursor-pointer bg-red-500 text-white"
              onClick={() => {

                shouldSaveAnswerRef.current = true;

                hasSavedAnswerRef.current = false;

                setIsGeneratingFeedbackandStoringDataInDB(true);

                stopSpeechToText();

              }}
            >
              <CircleStop />

              <span>stop recording</span>

            </Button>

          ) : (

            <Button
              variant="secondary"
              className="w-full mt-3 py-5 hover:cursor-pointer"
              onClick={() => {

                shouldSaveAnswerRef.current = false;

                hasSavedAnswerRef.current = false;

                startSpeechToText();

              }}
            >

              <Mic />

              <span>record your answer</span>

            </Button>
          )}
          
        </>
      ) : (
        <>

          <WebcamIcon className="w-full mt-10 h-72 p-20 bg-secondary rounded-lg border" />

          <Button
            type="button"
            onClick={() => setIsWebCamEnabled(true)}
            className="w-full mt-3 py-5 hover:cursor-pointer"
          >
            Enable Webcam
          </Button>

        </>
      )}

    </div>
  );
};


export default EnableWebcamRecordAnsGetAIFeedback;
