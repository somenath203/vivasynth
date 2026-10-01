"use server";

import { auth } from "@clerk/nextjs/server";
import { and, desc, eq } from "drizzle-orm";

import { db } from "..";
import { mockInterviewDataTable, userAnswerDataTable } from "@/db/schema";


export const storeMockInterviewDataInDB = async ( jobPosition, jobDescription, yearsOfExperience, generatedMockInterviewQuestionsAndAnswersByAI, emailIdOfTheUserWhoCreatedTheMockInterview, createdAt, uniqueMockInterviewId ) => {

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


export const storeUserAnswerInDB = async (mockInterviewUniqueId, question, actualAnswer, answerGivenByUser, feedbackByAI, ratingByAI, emailIdOfTheUserToWhomThisAnswerDataBelongTo, createdAt) => {

  try {

    const { isAuthenticated } = await auth();

    if (!isAuthenticated) {

      throw new Error("You must be signed in to access this server.");

    }

    await db.insert(userAnswerDataTable).values({
      mockIdOfTheInterviewToWhichThisQnABelongsTo: mockInterviewUniqueId,
      question: question,
      actualAns: actualAnswer,
      answerGivenByUser: answerGivenByUser,
      feedbackByAI: feedbackByAI,
      ratingByAI: ratingByAI,
      emailIdOfTheUserToWhomThisAnswerDataBelongTo:
        emailIdOfTheUserToWhomThisAnswerDataBelongTo,
      createdAt: createdAt,
    });

    return {
      success: true,
      message: "User answer stored successfully.",
    };

  } catch (error) {

    console.error("Error storing user answer data:", error);

    return {
      success: false,
      message: error?.message || "Failed to store user answer. Please try again.",
    };

  }

};


export const getAllMockInterviewAnswerDataForParticularInterview = async (mockInterviewUniqueId, userEmailAddress) => {

  try {

    const { isAuthenticated } = await auth();

    if (!isAuthenticated) {

      throw new Error("You must be signed in to access this server.");

    }

    const mockInterviewAnswerData = await db
      .select()
      .from(userAnswerDataTable)
      .where(
        and(
          eq(
            userAnswerDataTable.mockIdOfTheInterviewToWhichThisQnABelongsTo,
            mockInterviewUniqueId,
          ),
          eq(
            userAnswerDataTable.emailIdOfTheUserToWhomThisAnswerDataBelongTo,
            userEmailAddress,
          ),
        ),
      )
      .orderBy(userAnswerDataTable.id);

    return {
      success: true,
      data: mockInterviewAnswerData,
    };

  } catch (error) {

    console.error("Error fetching the data:", error);

    return {
      success: false,
      message: error?.message || "Failed to fetch the data. Please try again.",
    };

  }
  
};


export const getAllMockInterviewDataForParticularUser = async (emailAddressOfTheUser) => {

  try {

    const { isAuthenticated } = await auth();

    if (!isAuthenticated) {

      throw new Error("You must be signed in to access this server.");

    }

    const mockInterviewData = await db
      .select()
      .from(mockInterviewDataTable)
      .where(eq(mockInterviewDataTable.emailIdOfTheUserWhoCreatedTheMockInterview, emailAddressOfTheUser))
      .orderBy(desc(mockInterviewDataTable.id));

    return {
      success: true,
      data: mockInterviewData,
    };

  } catch (error) {

    console.error("Error fetching user's mock interview data:", error);

    return {
      success: false,
      message: error?.message || "Failed to fetch mock interview data. Please try again.",
    };

  }

};