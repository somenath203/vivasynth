"use client";

import { useState, useEffect } from "react";
import Webcam from "react-webcam";
import toast from "react-hot-toast";
import { WebcamIcon, Mic, CircleStop } from "lucide-react";
import useSpeechToText from "react-hook-speech-to-text";

import { Button } from "@/components/ui/button";


const EnableWebcamAndRecordAnswer = () => {

  const {
    error,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  if (error) {

    toast.error("Web Speech API is not available in this browser");

  }


  const [isWebCamEnabled, setIsWebCamEnabled] = useState(false);

  const [userAnswerRecording, setUserAnswerRecording] = useState('');


  useEffect(() => {

    results?.map((result) => (

        setUserAnswerRecording((prevAnswer) => prevAnswer + result?.transcript)

    ));
    
  }, [results]);

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

          {isRecording ? (

            <Button
              variant="secondary"
              className="w-full mt-3 py-5 hover:cursor-pointer bg-red-500 text-white"
              onClick={stopSpeechToText}
            >

              <CircleStop /> <span>stop recording</span>

            </Button>

          ) : (

            <Button
              variant="secondary"
              className="w-full mt-3 py-5 hover:cursor-pointer"
              onClick={startSpeechToText}
            >

              <Mic /> <span>record your answer</span>

            </Button>

          )}

          <Button onClick={() => console.log(userAnswerRecording)}>Show user answer</Button>

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


export default EnableWebcamAndRecordAnswer;
