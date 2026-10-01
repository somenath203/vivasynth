import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";


export const mockInterviewDataTable = pgTable("mockInterviewData", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  generatedMockInterviewQuestionsAndAnswersByAI: text().notNull(),
  jobPosition: varchar().notNull(),
  jobDescription: varchar().notNull(),
  yearsOfExperience: varchar().notNull(),
  emailIdOfTheUserWhoCreatedTheMockInterview: varchar().notNull(),
  createdAt: varchar().notNull(),
  uniqueMockInterviewId: varchar().notNull(),
});

export const userAnswerDataTable = pgTable("userInterviewAnswerData", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  mockIdOfTheInterviewToWhichThisQnABelongsTo: varchar().notNull(),
  question: varchar().notNull(),
  actualAns: varchar().notNull(),
  answerGivenByUser: text().notNull(),
  feedbackByAI: text().notNull(),
  ratingByAI: varchar().notNull(),
  emailIdOfTheUserToWhomThisAnswerDataBelongTo: varchar().notNull(),
  createdAt: varchar().notNull(),
});
