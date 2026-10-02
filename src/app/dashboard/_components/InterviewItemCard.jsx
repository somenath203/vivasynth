import Link from "next/link";

import { Button } from "@/components/ui/button";


const InterviewItemCard = ({ interview }) => {

  return (
    <div className="border shadow-sm rounded-lg p-3 flex flex-col gap-3">

      <h2 className="font-bold text-primary">{interview?.jobPosition}</h2>

      <h2 className="text-sm text-gray-600">
        {interview?.yearsOfExperience} years of experience
      </h2>

      <h2 className="text-xs text-gray-400">
        Created at: {interview?.createdAt}
      </h2>

      <Link href={`/dashboard/interview/${interview?.uniqueMockInterviewId}/feedback`} className="w-full">

        <Button className="w-full hover:cursor-pointer">Feedback</Button>

      </Link>

    </div>
  );
};


export default InterviewItemCard;
