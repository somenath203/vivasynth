'use client';

import { useUser, useAuth, RedirectToSignIn } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { ChevronDown, CheckCircle2, CircleAlert } from "lucide-react";
import Link from "next/link";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { getAllMockInterviewAnswerDataForParticularInterview } from "@/server-actions/mock-interview-server-actions";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";


const Page = ({ params }) => {

  const [ uniqueMockInterviewId, setUniqueMockInterviewId ] = useState();

  const [ mockInterviewQnaDataAlongWithRatingAndFeedback, setMockInterviewQnaDataAlongWithRatingAndFeedback ] = useState([]);

  const [ loadingMockInterviewQnaData, setLoadingMockInterviewQnaData ] = useState();

  const { user } = useUser();

  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {

    const getInterviewFeedback = async () => {

      try {

        setLoadingMockInterviewQnaData(true);

        const { mockInterviewUniqueId } = await params;

        const res = await getAllMockInterviewAnswerDataForParticularInterview(mockInterviewUniqueId, user?.emailAddresses[0]?.emailAddress);

        if (res?.success) {

          console.log(res?.data);
          
          setMockInterviewQnaDataAlongWithRatingAndFeedback(res?.data);

          setUniqueMockInterviewId(mockInterviewUniqueId);

        }
        
      } catch (error) {

        console.log(error);
        
      } finally {

        setLoadingMockInterviewQnaData(false);

      }

  }

    getInterviewFeedback();

  }, [params, user?.emailAddresses]);


  if (!isLoaded) {

    return null;

  }

  if (!isSignedIn) {

    return <RedirectToSignIn />
    
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">

      {/* Header */}
      <div className="mb-8">

        {mockInterviewQnaDataAlongWithRatingAndFeedback?.length > 0 && <div className="mb-3 flex items-center gap-2 text-green-600">
          <CheckCircle2 size={20} />
          <h2 className="text-sm font-medium">Interview Completed Successfully</h2>
        </div>}

        <h2 className="text-3xl font-bold tracking-tight">Here is your interview feedback</h2>

        <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-500">Below, you&apos;ll find the interview question, the correct answer, your response, and AI-generated feedback to help you improve.</p>

      </div>

      {mockInterviewQnaDataAlongWithRatingAndFeedback?.length === 0 && (

        <div className="flex min-h-100 items-center justify-center">

          <div className="w-full max-w-md rounded-2xl border bg-background p-8 text-center shadow-sm">

            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
              <CircleAlert className="h-7 w-7 text-muted-foreground" />
            </div>

            <h2 className="text-2xl font-bold tracking-tight">
              No Interview Record Found
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              You haven&apos;t completed this interview yet. Start the interview to
              receive your personalized feedback and performance analysis.
            </p>

            <Link href={`/dashboard/interview/${uniqueMockInterviewId}/start-interview`} className="mt-6 inline-flex">

              <Button className="px-6 hover:cursor-pointer">
                Start Interview
              </Button>

            </Link>

          </div>
          
        </div>

      )}

      {/* Interview data */}
      {loadingMockInterviewQnaData ? <Loader2 size={30} className="text-primary transition-all animate-spin duration-150" /> : <div className="space-y-3">

        {mockInterviewQnaDataAlongWithRatingAndFeedback?.map((data, index) => (

          <Collapsible className="group/item rounded-xl border bg-background" key={data?.id}>

            <CollapsibleTrigger className="group flex w-full items-start justify-between gap-4 p-4 text-left hover:cursor-pointer">

              <span className="flex gap-3">
                <span className="text-sm font-medium text-gray-400">Q{index + 1}</span>
                <span className="font-medium leading-snug">{data?.question}</span>
              </span>

              <ChevronDown size={20} className="mt-0.5 shrink-0 text-gray-400 transition-transform group-data-[state=open]:rotate-180" />

            </CollapsibleTrigger>

            <CollapsibleContent>
              
              <div className="flex flex-col gap-3 border-t p-4">

                <p className="text-sm">
                  <strong>Rating: </strong>
                  <span className="font-semibold text-red-500">{data?.ratingByAI}</span>
                </p>

                <div className="rounded-lg border-l-4 border-red-400 bg-red-50 p-3 text-sm leading-relaxed text-red-900">
                  <strong>Your answer: </strong> {data?.answerGivenByUser}
                </div>

                <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-3 text-sm leading-relaxed text-green-900">
                  <strong>Actual answer: </strong> {data?.actualAns}
                </div>

                <div className="rounded-lg border-l-4 border-blue-400 bg-blue-50 p-3 text-sm leading-relaxed text-primary">
                  <strong>Feedback: </strong> {data?.feedbackByAI}
                </div>

              </div>

            </CollapsibleContent>

          </Collapsible>

        ))}

      </div>}

      {!loadingMockInterviewQnaData && <div className="mt-8">

        <Link href='/dashboard'>
          <Button className="p-4 hover:cursor-pointer">Go to Dashboard</Button>
        </Link>

      </div>}

    </div>
  )
}

export default Page