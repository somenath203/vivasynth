"use client";

import { useState, useEffect } from "react";
import { useAuth, RedirectToSignIn } from "@clerk/nextjs";
import Webcam from "react-webcam";
import { WebcamIcon, Lightbulb } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

import { getParticularMockInterviewBasedOnUniqueMockInterviewId } from "@/server-actions/mock-interview-server-actions";
import { Button } from "@/components/ui/button";


const Page = ({ params }) => {

  const { isLoaded, isSignedIn } = useAuth();

  const [ mockInterViewUniqueIdFromParams, setMockInterViewUniqueIdFromParams ] = useState();

  const [ wholeInterviewData, setWholeInterviewData ] = useState();

  const [ isWebCamEnabled, setIsWebCamEnabled ] = useState(false);


  useEffect(() => {

    const getInterviewDataBasedOnMockInterviewUniqueIdComingFromParams = async () => {

      try {

        const { mockInterviewUniqueId } = await params;

        setMockInterViewUniqueIdFromParams(mockInterviewUniqueId);

        const getWholeMockInterviewBasedOnMockInterviewUniqueId = await getParticularMockInterviewBasedOnUniqueMockInterviewId(mockInterviewUniqueId);

          if (getWholeMockInterviewBasedOnMockInterviewUniqueId?.success) {

            setWholeInterviewData(getWholeMockInterviewBasedOnMockInterviewUniqueId?.dataStoredInDB);

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
    <div className="my-10">

      <h2 className="font-bold text-2xl">Let&apos;s Get Started</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* mock interview information */}
        <div className="my-5 flex flex-col gap-5">

          <div className="rounded-lg border flex flex-col gap-5 p-5">

            <h2 className="text-lg">
              <strong>Job Role/Job Position:</strong> {wholeInterviewData?.jobPosition}
            </h2>

            <h2 className="text-lg">
              <strong>Job Description/Tech Stack:</strong> {wholeInterviewData?.jobDescription}
            </h2>

            <h2 className="text-lg">
              <strong>Years of Experience:</strong> {wholeInterviewData?.yearsOfExperience}
            </h2>

          </div>

          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-50">

            <h2 className="flex gap-2 items-center">

              <Lightbulb /> <strong>Information</strong>

            </h2>

            <h2 className="mt-3">
              Enable your camera and microphone to start your AI-generated mock interview. You’ll be asked 5 questions, and after completing the interview, you’ll receive a detailed report based on your answers.
            </h2>

          </div>

        </div>

        {/* webcam */}
        <div>

          {isWebCamEnabled ? (

            <>

              <Webcam
                className="w-full h-72 my-7 rounded-lg border object-cover"
                mirrored={true} // Mirrors the webcam preview so left-hand movements appear on the left and right-hand movements on the right.
                onUserMedia={() => {
                  /*
                  * This callback runs when React-Webcam successfully receives
                  * the user's camera media stream.
                  *
                  * At this point, the browser has granted camera access and
                  * the webcam stream is available to the component.
                  */
                  setIsWebCamEnabled(true);

                  toast.success('Camera working successfully');

                }}
                onUserMediaError={(error) => {
                  /*
                  * This callback runs when React-Webcam cannot access the
                  * user's camera, for example when camera permission is denied
                  * or the camera stream cannot be obtained.
                  */

                  console.log(error);
                  
                  setIsWebCamEnabled(false);

                  toast.error('Something went wrong while enabling camera');

                }}
              />

              <Link href={`/dashboard/interview/${mockInterViewUniqueIdFromParams}/start-interview`}>

                <Button
                  type="button"
                  className="w-full py-5 hover:cursor-pointer"
                >
                  Start Interview
                </Button>

              </Link>

            </>

          ) : (

            <>

              <WebcamIcon className="w-full h-72 my-7 p-20 bg-secondary rounded-lg border" />

              <Button
                type="button"
                onClick={() => setIsWebCamEnabled(true)}
                className="w-full py-5 hover:cursor-pointer"
              >
                Check Webcam
              </Button>

            </>

          )}

        </div>

      </div>

    </div>
  );
};

export default Page;
