"use server";

import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

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

      throw new Error("You must be signed in to access this server.");

    }

    const dataStoredInDB = await db
      .insert(mockInterviewDataTable)
      .values({
        jobPosition: jobPosition,
        jobDescription: jobDescription,
        yearsOfExperience: yearsOfExperience,
        generatedMockInterviewQuestionsAndAnswersByAI:
          generatedMockInterviewQuestionsAndAnswersByAI,
        emailIdOfTheUserWhoCreatedTheMockInterview:
          emailIdOfTheUserWhoCreatedTheMockInterview,
        createdAt: createdAt,
        uniqueMockInterviewId: uniqueMockInterviewId,
      })
      .returning();

    console.log(dataStoredInDB);

    return {
      success: true,
      dataStoredInDB: dataStoredInDB[0],
    };

  } catch (error) {

    console.error("Error saving mock interview data:", error);

    return {
      success: false,
      message: error?.message || "Failed to save mock interview data. Please try again.",
    };

  }

};


export const getParticularMockInterviewBasedOnUniqueMockInterviewId = async (mockInterviewUniqueId) => {

  try {

    const { isAuthenticated } = await auth();

    if (!isAuthenticated) {

      throw new Error("You must be signed in to access this server.");

    }

    const fetchParticularMockInterview = await db
      .select()
      .from(mockInterviewDataTable)
      .where(
        eq(mockInterviewDataTable.uniqueMockInterviewId, mockInterviewUniqueId),
      );

    return {
      success: true,
      dataStoredInDB: fetchParticularMockInterview[0],
    };

  } catch (error) {

    console.error("Error fetching mock interview data:", error);

    return {
      success: false,
      message: error?.message || "Failed to fetch mock interview data. Please try again.",
    };

  }
  
};
