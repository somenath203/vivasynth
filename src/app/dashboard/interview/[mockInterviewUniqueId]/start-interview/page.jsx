"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { getParticularMockInterviewBasedOnUniqueMockInterviewId } from "@/server-actions/mock-interview-server-actions";
import QuestionsSectionComponent from "./_components/QuestionsSectionComponent";


const EnableWebcamAndRecordAnswerDynamic = dynamic(
  () => import("./_components/EnableWebcamAndRecordAnswer"),
  {
    ssr: false,
  },
);


const Page = ({ params }) => {

  const [ mockInterviewWholeData, setMockInterviewWholeData ] = useState();

  const [ mockInterViewQuestionAnswerData, setMockInterviewQuestionAnswerData ] = useState();

  const [ indexOfQuestionAnswerSelectedByUser, setIndexOfQuestionAnswerSelectedByUser ] = useState(0);

  useEffect(() => {

    const getInterviewDataBasedOnMockInterviewUniqueIdComingFromParams = async () => {

        try {

          const { mockInterviewUniqueId } = await params;

          const getWholeMockInterviewBasedOnMockInterviewUniqueId = await getParticularMockInterviewBasedOnUniqueMockInterviewId(mockInterviewUniqueId);

          if (getWholeMockInterviewBasedOnMockInterviewUniqueId?.success) {

            setMockInterviewWholeData(getWholeMockInterviewBasedOnMockInterviewUniqueId?.dataStoredInDB);

            const parsedGeneratedQuestionsAnswers = JSON.parse(getWholeMockInterviewBasedOnMockInterviewUniqueId?.dataStoredInDB?.generatedMockInterviewQuestionsAndAnswersByAI)

            setMockInterviewQuestionAnswerData(parsedGeneratedQuestionsAnswers);

          }

        } catch (error) {

          console.log(error);

        }

      };

    getInterviewDataBasedOnMockInterviewUniqueIdComingFromParams();

  }, [params]);
  
  console.log(mockInterViewQuestionAnswerData);
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

      {/* Questions */}
      <QuestionsSectionComponent 
        mockInterviewQuestionAnswerData={mockInterViewQuestionAnswerData} 
        questionAnswerIndexSelectedByUser={indexOfQuestionAnswerSelectedByUser}
      />

      {/* Video/Audio recording */}
      <EnableWebcamAndRecordAnswerDynamic />

    </div>
  )
};

export default Page;
