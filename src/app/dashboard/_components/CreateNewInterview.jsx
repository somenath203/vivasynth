"use client";

import { CirclePlus, Loader2 } from "lucide-react";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import moment from "moment";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { generateFiveQuestionsANdAnswersForMockInterview } from "@/server-actions/google-gemini-server-actions";
import { storeMockInterviewDataInDB } from "@/server-actions/mock-interview-server-actions";


const CreateNewInterview = () => {

  const { user } = useUser();

  const [showCreateInterviewDialogBox, setShowCreateInterviewDialogBox] = useState(false);

  const [jobPositionInput, setJobPositionInput] = useState("");
  const [jobDescriptionInput, setJobDescriptionInput] = useState("");
  const [yearOfExperienceInput, setYearOfExperieneInput] = useState("");

  const [loadingAIResponse, setLoadingAIResponse] = useState(false);

  const [ generatedQuestionsAndAnswersByAI, setGeneratedQuestionsAndAnswersByAI ] = useState();

  const router = useRouter();


  const handleSubmitForm = async (e) => {

    try {

      e.preventDefault();

      setLoadingAIResponse(true);

      const res = await generateFiveQuestionsANdAnswersForMockInterview(
        jobPositionInput,
        jobDescriptionInput,
        yearOfExperienceInput,
      );

      if (res) {

        setGeneratedQuestionsAndAnswersByAI(res);

        const storeAllDataInDB = await storeMockInterviewDataInDB(
          jobPositionInput,
          jobDescriptionInput,
          yearOfExperienceInput,
          res,
          user?.emailAddresses[0]?.emailAddress,
          moment().format('DD-MM-yyyy'),
          uuidv4(),
        );

        if (storeAllDataInDB?.success) {

          toast.success("Mock interview created successfully!");

          setShowCreateInterviewDialogBox(false);

          router.push(`/dashboard/interview/${storeAllDataInDB?.dataStoredInDB?.uniqueMockInterviewId}`);

        }

      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoadingAIResponse(false);

    }

  };

  return (
    <div>

      <div
        className="p-10 border hover:shadow-md bg-secondary rounded-lg flex justify-center items-center gap-1 hover:cursor-pointer transition-all"
        onClick={() => setShowCreateInterviewDialogBox(true)}
      >

        <CirclePlus /> <h2 className="text-lg">Create New</h2>

      </div>

      <AlertDialog
        open={showCreateInterviewDialogBox}
        onOpenChange={setShowCreateInterviewDialogBox}
      >
        <AlertDialogContent className="max-w-2xl!">

          <AlertDialogHeader>

            <AlertDialogTitle className="text-xl">
              Tell us about the role you are interviewing for
            </AlertDialogTitle>

            <AlertDialogDescription>
              Share the job title, job description or tech stack, and your years
              of experience so we can generate a personalized mock interview for
              you.
            </AlertDialogDescription>

          </AlertDialogHeader>

          <form onSubmit={handleSubmitForm}>

            <div className="my-2">

              <Label>Job Title / Role</Label>

              <Input
                placeholder="full stack developer"
                className="mt-1"
                onChange={(e) => setJobPositionInput(e.target.value)}
                required
              />

            </div>

            <div className="my-2">

              <Label>Job Description / Technology Stack</Label>

              <Textarea
                className="mt-1 resize-none!"
                placeholder="e.g. React, Vue, NodeJS, MySQL, etc."
                onChange={(e) => setJobDescriptionInput(e.target.value)}
                required
              />

            </div>

            <div className="my-2">

              <Label>Years of Experience</Label>

              <Input
                placeholder="e.g. 5"
                className="mt-1"
                type="number"
                min="0"
                max="50"
                onChange={(e) => setYearOfExperieneInput(e.target.value)}
                required
              />

            </div>

            <div className="flex items-center justify-end gap-2">

              <Button
                variant="ghost"
                className="hover:cursor-pointer"
                type="button"
                disabled={loadingAIResponse}
                onClick={() => setShowCreateInterviewDialogBox(false)}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="hover:cursor-pointer"
                disabled={loadingAIResponse}
              >
                {loadingAIResponse ? (
                  <Loader2 className="animate-spin duration-150" />
                ) : (
                  "Start Interview"
                )}
              </Button>

            </div>

          </form>

        </AlertDialogContent>
        
      </AlertDialog>

    </div>
  );
};

export default CreateNewInterview;
