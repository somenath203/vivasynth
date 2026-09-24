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
