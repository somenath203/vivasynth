"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

import { getAllMockInterviewDataForParticularUser } from "@/server-actions/mock-interview-server-actions";
import InterviewItemCard from "./InterviewItemCard";


const InterviewHistoryList = () => {

  const { user } = useUser();

  const [interviewList, setInterviewList] = useState([]);


  useEffect(() => {

    const getInterviewListOfTheUser = async () => {

      try {

        const res = await getAllMockInterviewDataForParticularUser(user?.emailAddresses[0]?.emailAddress);

        if (res?.success) {

          setInterviewList(res?.data);

        }

      } catch (error) {

        console.log(error);

      }

    };

    getInterviewListOfTheUser();

  }, [user]);

  console.log(interviewList);
  

  return (
    <div>

      <h2 className="font-medium text-xl">History</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">

        {interviewList && interviewList?.map((interview) => (
            
            <InterviewItemCard key={interview?.id} interview={interview} />

        ))}

      </div>

    </div>
  );
};

export default InterviewHistoryList;
