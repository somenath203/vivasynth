"use server";

import { auth } from "@clerk/nextjs/server";

import { db } from "..";
import { mockInterviewDataTable } from "@/db/schema";


export const storeMockInterviewDataInDB = async (
  jobPosition,
  jobDescription,
  yearsOfExperience,
  generatedMockInterviewQuestionsAndAnswersByAI,
  emailIdOfTheUserWhoCreatedTheMockInterview,
  createdAt,
  uniqueMockInterviewId,
) => {

  try {

    const { isAuthenticated } = await auth();

    if (!isAuthenticated) {

      throw new Error("You must be signed in to create a post.");

    }

    await db.insert(mockInterviewDataTable).values({
      jobPosition: jobPosition,
      jobDescription: jobDescription,
      yearsOfExperience: yearsOfExperience,
      generatedMockInterviewQuestionsAndAnswersByAI: generatedMockInterviewQuestionsAndAnswersByAI,
      emailIdOfTheUserWhoCreatedTheMockInterview: emailIdOfTheUserWhoCreatedTheMockInterview,
      createdAt: createdAt,
      uniqueMockInterviewId: uniqueMockInterviewId,
    });

    return {
      success: true,
    };

  } catch (error) {

    console.error("Error saving mock interview data:", error);

    return {
      success: false,
      message: error?.message || "Failed to save mock interview data. Please try again.",
    };

  }

};
