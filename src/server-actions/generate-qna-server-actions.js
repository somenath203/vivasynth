"use server";

import { GoogleGenAI } from "@google/genai";
import { auth } from "@clerk/nextjs/server";


const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GEMINI_API_KEY,
});


export const generateFiveQuestionsANdAnswersForMockInterview = async ( jobPosition, jobDescription, yearsOfExperience ) => {

  try {

    const { isAuthenticated } = await auth()

    if (!isAuthenticated) {

      throw new Error('You must be signed in to create a post.')

    }

    const contents = [
      {
        role: "user",
        parts: [
          {
            text: `
Job Position: Full Stack Developer
Job Description: React, Node.js, MySQL
Years of Experience: 6

Based on the information provided above, generate 5 relevant interview
questions along with their answers.

The questions should be appropriate for a candidate with 6 years of
experience and should cover relevant technical topics based on the
job description.
`,
          },
        ],
      },

      {
        role: "model",
        parts: [
          {
            text: `
[
  {
    "question": "In a large-scale React application, how do you diagnose and mitigate performance bottlenecks caused by excessive re-renders, and in what scenarios can overusing optimization hooks like useCallback or useMemo become an anti-pattern?",
    "answer": "Diagnose bottlenecks using the React DevTools Profiler and the Chrome Performance panel. Mitigate issues by colocating state closer to where it is used and selectively applying React.memo, useMemo, and useCallback. Overusing these hooks can become an anti-pattern when applied indiscriminately to cheap computations because their overhead can exceed the cost of simple re-renders."
  },
  {
    "question": "How does the Node.js event loop handle execution across different phases, and what strategies would you use to prevent CPU-intensive operations from blocking I/O throughput?",
    "answer": "The Node.js event loop processes operations through phases such as Timers, Pending Callbacks, Poll, Check, and Close Callbacks. CPU-intensive work should be moved away from the main event loop using worker_threads, child processes, background queues, or other appropriate mechanisms."
  },
  {
    "question": "When debugging a slow query in MySQL using EXPLAIN, what key indicators do you examine, and how do you design an optimal composite index for queries containing both equality filters and range filters?",
    "answer": "Important indicators include the access type, selected index, estimated rows examined, and additional operations shown in the execution plan. For composite indexes, equality conditions are generally placed before range conditions so that the index can be used efficiently."
  },
  {
    "question": "How do MySQL transaction isolation levels mitigate concurrency phenomena like dirty reads, non-repeatable reads, and phantom reads, and how should a Node.js backend handle deadlocks?",
    "answer": "MySQL provides four transaction isolation levels that provide different guarantees against concurrency anomalies. A Node.js backend should detect deadlock errors, retry the transaction using an appropriate backoff strategy, keep transactions short, and access resources in a consistent order."
  },
  {
    "question": "How would you design a robust caching and cache-invalidation strategy across a React, Node.js, and MySQL stack to handle a high-read dashboard with real-time updates?",
    "answer": "A robust solution can use client-side caching with React Query or SWR, Redis as an application-level cache using the cache-aside pattern, and event-driven invalidation when database data changes. WebSockets or Server-Sent Events can then notify connected clients to refresh affected data."
  }
]
`,
          },
        ],
      },

      {
        role: "user",
        parts: [
          {
            text: `
Generate exactly 5 relevant technical interview questions and their
answers based on the following candidate information.

Job Position:
${jobPosition}

Job Description / Tech Stack:
${jobDescription}

Years of Experience:
${yearsOfExperience}

Requirements:

- Generate exactly 5 questions.
- Each question must be technically relevant to the job position and
  job description.
- Questions must be appropriate for the specified years of experience.
- Prefer practical and scenario-based questions over basic definitions.
- Cover different relevant technical areas where appropriate.
- Do not repeat the same concept across multiple questions.
- Each question must have a clear and concise answer.
- Follow the structure demonstrated by the previous example.
- Return only the requested JSON array.
`,
          },
        ],
      },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: contents,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "array",
          minItems: 5,
          maxItems: 5,
          items: {
            type: "object",
            properties: {
              question: {
                type: "string",
                description:
                  "A relevant technical interview question appropriate for the candidate's job position, technology stack, and years of experience.",
              },
              answer: {
                type: "string",
                description:
                  "A clear, technically accurate, and concise answer to the interview question.",
              },
            },
            required: ["question", "answer"],
            additionalProperties: false,
          },
        },
      },
    });

    // const generatedQuestions = JSON.parse(response?.text);
    const generatedQuestions = response?.text;

    return generatedQuestions;

  } catch (error) {

    console.error("Error generating interview questions:", error);

    return {
      success: false,
      message:
        error?.message || "Failed to generate interview questions. Please try again.",
    };

  }

};
/**
 * Understanding everything inside "config" of "ai.models.generateContent({})"
 *
 * The "config" object tells Gemini HOW we want it to format
 * its response.
 *
 * In simple words:
 *
 *     contents = What we want Gemini to do
 *     config   = Rules for how Gemini should return the answer
 *
 *
 * 1. responseMimeType: "application/json"
 *
 * This tells Gemini:
 *
 *     "Return your response as JSON."
 *
 * Without this, Gemini could potentially return:
 *
 *     Sure! Here are 5 interview questions:
 *
 *     [
 *       {
 *         "question": "What is React?",
 *         "answer": "React is a JavaScript library..."
 *       }
 *     ]
 *
 * The problem is that there is text before the JSON.
 * If we pass the entire response to JSON.parse(), it can fail.
 *
 * With:
 *
 *     responseMimeType: "application/json"
 *
 * we tell Gemini that the response should be JSON.
 *
 *
 * 2. responseSchema
 *
 * responseSchema is basically a "rule book" for the structure
 * of Gemini's response.
 *
 * We are telling Gemini:
 *
 *     "Your response must follow this particular structure."
 *
 * Think of it like giving Gemini a form that it must fill out.
 *
 *
 * 3. type: "array"
 *
 * This tells Gemini that the TOP-LEVEL response must be an array.
 *
 * We want:
 *
 *     [
 *       {...},
 *       {...},
 *       {...}
 *     ]
 *
 * and NOT:
 *
 *     {
 *       "questions": [...]
 *     }
 *
 *
 * 4. minItems: 5
 *
 * This tells Gemini that the array must contain AT LEAST 5 items.
 *
 * For example, this has only 3 items:
 *
 *     [
 *       {...},
 *       {...},
 *       {...}
 *     ]
 *
 * So it does not satisfy the minimum of 5.
 *
 *
 * 5. maxItems: 5
 *
 * This tells Gemini that the array can contain AT MOST 5 items.
 *
 * Since we have:
 *
 *     minItems: 5
 *     maxItems: 5
 *
 * we are effectively saying:
 *
 *     "Give me EXACTLY 5 items."
 *
 *
 * 6. items
 *
 * "items" describes what EACH item inside the array should look like.
 *
 * Since our array contains interview questions, each item should be:
 *
 *     {
 *       "question": "...",
 *       "answer": "..."
 *     }
 *
 *
 * 7. type: "object"
 *
 * This tells Gemini that EACH item inside the array must be an object.
 *
 * Example:
 *
 *     {
 *       "question": "What is React?",
 *       "answer": "React is a JavaScript library..."
 *     }
 *
 *
 * 8. properties
 *
 * "properties" defines the fields that can exist inside each object.
 *
 * In our case, we define two fields:
 *
 *     question
 *     answer
 *
 * Therefore, Gemini should generate:
 *
 *     {
 *       "question": "...",
 *       "answer": "..."
 *     }
 *
 *
 * 9. question
 *
 * This defines the "question" field.
 *
 *     type: "string"
 *
 * means that the value must be text.
 *
 * Example:
 *
 *     "question": "How does the Node.js event loop work?"
 *
 * The "description" gives Gemini additional guidance about
 * what kind of question we expect.
 *
 * It tells Gemini that the question should be relevant to:
 *
 *     - the candidate's job position
 *     - the technology stack
 *     - the candidate's years of experience
 *
 *
 * 10. answer
 *
 * This defines the "answer" field.
 *
 *     type: "string"
 *
 * means that the answer must also be text.
 *
 * Example:
 *
 *     "answer": "The Node.js event loop allows Node.js to perform
 *     non-blocking I/O operations..."
 *
 * The "description" tells Gemini that the answer should be:
 *
 *     - clear
 *     - technically accurate
 *     - concise
 *
 *
 * 11. required: ["question", "answer"]
 *
 * This tells Gemini that BOTH fields are required.
 *
 * A valid object must contain:
 *
 *     {
 *       "question": "...",
 *       "answer": "..."
 *     }
 *
 * This would not satisfy our requirement:
 *
 *     {
 *       "question": "What is React?"
 *     }
 *
 * because the "answer" field is missing.
 *
 * Similarly, this would not satisfy our requirement:
 *
 *     {
 *       "answer": "React is a JavaScript library..."
 *     }
 *
 * because the "question" field is missing.
 *
 *
 * 12. additionalProperties: false
 *
 * This tells Gemini not to add extra fields to each object.
 *
 * We want ONLY:
 *
 *     {
 *       "question": "...",
 *       "answer": "..."
 *     }
 *
 * We don't want Gemini to add things such as:
 *
 *     {
 *       "question": "...",
 *       "answer": "...",
 *       "difficulty": "hard",
 *       "topic": "React"
 *     }
 *
 * Setting:
 *
 *     additionalProperties: false
 *
 * tells Gemini that only the fields defined in "properties"
 * should be present.
 *
 *
 * COMPLETE PICTURE
 *
 * All of these rules together tell Gemini:
 *
 *     "Return an array.
 *      The array must contain exactly 5 items.
 *      Each item must be an object.
 *      Each object must contain a question and an answer.
 *      Both question and answer must be strings.
 *      Do not add any other fields."
 *
 *
 * INPUT → GEMINI → OUTPUT EXAMPLE
 *
 * INPUT:
 *
 *     Job Position: Full Stack Developer
 *     Job Description: React, Node.js, MySQL
 *     Years of Experience: 6
 *
 * Gemini processes this input using our config rules.
 *
 * OUTPUT:
 *
 *     [
 *       {
 *         "question": "How would you optimize a React application
 *         suffering from excessive re-renders?",
 *         "answer": "You can use React DevTools Profiler to identify
 *         unnecessary renders and then selectively use techniques
 *         such as React.memo, useMemo, and useCallback."
 *       },
 *       {
 *         "question": "How does the Node.js event loop work?",
 *         "answer": "The event loop allows Node.js to handle
 *         asynchronous operations without blocking the main thread."
 *       },
 *       {
 *         "question": "How would you optimize a slow MySQL query?",
 *         "answer": "Use EXPLAIN to inspect the query execution plan
 *         and create appropriate indexes based on the query's filters
 *         and sorting requirements."
 *       },
 *       {
 *         "question": "How would you handle deadlocks in MySQL?",
 *         "answer": "Detect the deadlock, retry the transaction when
 *         appropriate, keep transactions short, and access resources
 *         consistently."
 *       },
 *       {
 *         "question": "How would you design caching for a full-stack
 *         application?",
 *         "answer": "A combination of client-side caching and an
 *         application-level cache such as Redis can reduce repeated
 *         database queries and improve response times."
 *       }
 *     ]
 *
 *
 * WHY THIS IS USEFUL FOR JSON.parse()
 *
 * After Gemini returns the response, you do:
 *
 *     const generatedQuestions = JSON.parse(response.text);
 *
 * JSON.parse() converts the JSON text into a normal JavaScript value.
 *
 * Before JSON.parse():
 *
 *     response.text
 *          ↓
 *     JSON string
 *
 * After JSON.parse():
 *
 *     generatedQuestions
 *          ↓
 *     JavaScript array
 *
 * So you can then access the questions normally:
 *
 *     generatedQuestions[0].question
 *
 *     generatedQuestions[0].answer
 *
 *
 * IN ONE SENTENCE:
 *
 *     responseMimeType tells Gemini "return JSON",
 *     while responseSchema tells Gemini "return JSON in THIS
 *     exact structure."
 */
