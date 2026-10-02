"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useAuth, RedirectToSignIn } from "@clerk/nextjs";
import { WebcamIcon } from "lucide-react";

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

  const [isWebCamEnabled, setIsWebCamEnabled] = useState(false);

  const [ mockInterviewWholeData, setMockInterviewWholeData ] = useState();

  const [ mockInterViewQuestionAnswerData, setMockInterviewQuestionAnswerData ] = useState();

  const [ indexOfCurrentlyActiveQuestion, setIndexOfCurrentlyActiveQuestion ] = useState(0);

  const [ isRecordingParent, setIsRecordingParent ] = useState(false);

  const [ isGeneratingFeedbackParent, setIsGeneratingFeedbackParent ] = useState(false);

  const isNavigationDisabled = isRecordingParent || isGeneratingFeedbackParent;

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
          isWebCamEnabled={isWebCamEnabled}
          setIsWebCamEnabled={setIsWebCamEnabled}
          setIsRecordingParent={setIsRecordingParent}
          setIsGeneratingFeedbackParent={setIsGeneratingFeedbackParent}
        />

      </div>

      {/* 'previous' and 'next' buttons to go to previous question or the next question */}
      {isWebCamEnabled ? (

        <div className="flex items-center justify-end gap-6 mb-5">

          {indexOfCurrentlyActiveQuestion !== mockInterViewQuestionAnswerData?.length - 1 && (

            <Button
              onClick={() => setIndexOfCurrentlyActiveQuestion(indexOfCurrentlyActiveQuestion + 1)}
              disabled={isNavigationDisabled}
              className="p-5 hover:cursor-pointer"
            >
              Next Question
            </Button>
          )}

          {indexOfCurrentlyActiveQuestion === mockInterViewQuestionAnswerData?.length - 1 && (
            <Link href={`/dashboard/interview/${mockInterviewWholeData?.uniqueMockInterviewId}/feedback`}>

              <Button disabled={isNavigationDisabled} className="p-5 hover:cursor-pointer">
                End Interview
              </Button>
              
            </Link>
          )}
        </div>
      ) : (
        <div className="mb-5 flex items-center justify-end">
          <div className="flex items-center gap-3 rounded-lg border border-border bg-secondary/60 px-4 py-3 text-sm text-muted-foreground shadow-sm">
            <WebcamIcon className="h-5 w-5 shrink-0 text-primary" />

            <p>
              Please enable your camera to continue to the next question.
            </p>
          </div>
        </div>
      )}

    </div>
  )
};

export default Page;
