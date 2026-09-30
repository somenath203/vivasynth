"use client";

import { useState } from "react";

import toast from "react-hot-toast";

import { LightbulbIcon, Volume2 } from "lucide-react";


const QuestionsSectionComponent = ({ mockInterviewQuestionAnswerData, questionAnswerIndexSelectedByUser }) => {


  const [isSpeakingQuestion, setIsSpeakingQuestion] = useState(false);
  

  const convertQuestionTextToSpeech = (questionText) => {

    /*
     * checks whether the user's browser supports the Web Speech API for text-to-speech
     */
    if ("speechSynthesis" in window) {

      const speech = new SpeechSynthesisUtterance(questionText);

      /*
       * runs when the browser starts speaking the question
       */
      speech.onstart = () => {

        setIsSpeakingQuestion(true);

      };

      /*
       * runs automatically when the browser finishes speaking the question
       */
      speech.onend = () => {

        setIsSpeakingQuestion(false);

      };

      window.speechSynthesis.speak(speech);

    } else {

      toast.error("Sorry, your browser does not support text to speech");

    }

  };


  return (
    <div className="p-5 border rounded-lg my-10">

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

        {mockInterviewQuestionAnswerData && mockInterviewQuestionAnswerData?.map((qna, index) => (

            <h2
              key={index}
              className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer ${
                questionAnswerIndexSelectedByUser === index
                  ? "bg-primary text-white"
                  : "bg-secondary"
              }`}
            >
              Question #{index + 1}
            </h2>

          ))}

      </div>

      {/* showing the question based on the index of that question selected by user */}
      <h2 className="my-5 text-sm md:text-lg">
        {mockInterviewQuestionAnswerData?.[questionAnswerIndexSelectedByUser]?.question}
      </h2>

      {/* allows the user to hear the interview question using text-to-speech */}
      {isSpeakingQuestion ? (

        <Volume2 disabled={true} className="transition-all animate-pulse" />

      ) : (

        <Volume2
          className="hover:cursor-pointer"
          onClick={() => convertQuestionTextToSpeech(mockInterviewQuestionAnswerData?.[questionAnswerIndexSelectedByUser]?.question)}
        />

      )}

      <div className="border rounded-lg p-5 bg-blue-100 mt-20">

        <h2 className="flex items-center gap-2 text-primary">
          <LightbulbIcon /> <strong>Note:</strong>
        </h2>

        <h2 className="text-sm text-primary my-2">
          Click on &apos;Record Answer&apos; when you&apos;re ready to answer
          the question. At the end of the interview, you&apos;ll receive
          detailed feedback for each question, along with the correct answer and
          your response so you can easily compare them.
        </h2>

      </div>

    </div>
  );
};


export default QuestionsSectionComponent;
