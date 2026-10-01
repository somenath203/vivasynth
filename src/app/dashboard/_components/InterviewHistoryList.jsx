"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

import { getAllMockInterviewDataForParticularUser } from "@/server-actions/mock-interview-server-actions";
import InterviewItemCard from "./InterviewItemCard";
import { Loader2 } from "lucide-react";


const InterviewHistoryList = () => {

  const { user } = useUser();

  const [interviewList, setInterviewList] = useState([]);

  const [ loadingList, setLoadingList ] = useState(false);


  useEffect(() => {

    const getInterviewListOfTheUser = async () => {

      try {

        setLoadingList(true);

        const res = await getAllMockInterviewDataForParticularUser(user?.emailAddresses[0]?.emailAddress);

        if (res?.success) {

          setInterviewList(res?.data);

        }

      } catch (error) {

        console.log(error);

      } finally {

        setLoadingList(false);

      }

    };

    getInterviewListOfTheUser();

  }, [user]);

  console.log(interviewList);
  

  return (
    <div className="w-full">

      <h2 className="text-2xl font-semibold tracking-tight text-foreground pb-3 border-b border-border">History</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-6 mb-4">

        {loadingList && <Loader2 size={25} className="transition-all animate-spin duration-150" />}

        {!loadingList && interviewList?.length === 0 && (
          <div className="mt-5 flex min-h-48 items-center justify-center rounded-xl border border-dashed bg-secondary/30 px-6 py-10 text-center">

            <div className="max-w-md">

              <h2 className="text-xl font-semibold tracking-tight">
                No Interview History Yet
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                You haven&apos;t created any mock interviews yet. Once you create
                an interview, your interview history will appear here.
              </p>

            </div>

          </div>
        )}

        {!loadingList && interviewList && interviewList?.length > 0 && interviewList?.map((interview) => (
            
          <InterviewItemCard key={interview?.id} interview={interview} />

        ))}

      </div>

    </div>
  );
};

export default InterviewHistoryList;