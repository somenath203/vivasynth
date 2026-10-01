"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useAuth, RedirectToSignIn } from "@clerk/nextjs";

import { getParticularMockInterviewBasedOnUniqueMockInterviewId } from "@/server-actions/mock-interview-server-actions";
import QuestionsSectionComponent from "./_components/QuestionsSectionComponent";
import { Button } from "@/components/ui/button";


const EnableWebcamAndRecordAnswerGetAIFeedbackDynamic = dynamic(
  () => import("./_components/EnableWebcamRecordAnsGetAIFeedback"),
  {
    ssr: false,
  },
);


const Page = ({ params }) => {

  const { isLoaded, isSignedIn } = useAuth();

  const [ mockInterviewWholeData, setMockInterviewWholeData ] = useState();

  const [ mockInterViewQuestionAnswerData, setMockInterviewQuestionAnswerData ] = useState();

  const [ indexOfCurrentlyActiveQuestion, setIndexOfCurrentlyActiveQuestion ] = useState(0);

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

  
  if (!isLoaded) {

    return null;

  }

  if (!isSignedIn) {

    return <RedirectToSignIn />
    
  }

  return (
    <div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Questions */}
        <QuestionsSectionComponent 
          mockInterviewQuestionAnswerData={mockInterViewQuestionAnswerData} 
          questionAnswerIndexSelectedByUser={indexOfCurrentlyActiveQuestion}
        />

        {/* Video and Audio recording */}
        <EnableWebcamAndRecordAnswerGetAIFeedbackDynamic
          wholeInterviewData={mockInterviewWholeData}
          mockInterviewQuestionAnswerData={mockInterViewQuestionAnswerData}
          questionAnswerIndexSelectedByUser={indexOfCurrentlyActiveQuestion}
        />

      </div>

      {/* 'previous' and 'next' buttons to go to previous question or the next question */}
      <div className="flex items-center justify-end gap-6 mb-5">

        {indexOfCurrentlyActiveQuestion !== mockInterViewQuestionAnswerData?.length - 1 && (

          <Button onClick={() => setIndexOfCurrentlyActiveQuestion(indexOfCurrentlyActiveQuestion + 1)} className="p-5 hover:cursor-pointer">Next Question</Button>

        )}

        {indexOfCurrentlyActiveQuestion === mockInterViewQuestionAnswerData?.length - 1 && (

          <Link href={`/dashboard/interview/${mockInterviewWholeData?.uniqueMockInterviewId}/feedback`}>
            <Button className="p-5 hover:cursor-pointer">End Interview</Button>
          </Link>

        )}

      </div>

    </div>
  )
};

export default Page;
