"use server";

import { GoogleGenAI } from "@google/genai";
import { auth } from "@clerk/nextjs/server";


const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GEMINI_API_KEY,
});


export const generateInterviewAnswerFeedback = async (question, userAnswer) => {

  try {

    const { isAuthenticated } = await auth();

    if (!isAuthenticated) {

      throw new Error("You must be signed in to generate interview feedback.");

    }

    const contents = [
      {
        role: "user",
        parts: [
          {
            text: `
Question: In a large ReactJS application using Context API for global state, how do you prevent performance degradation caused by widespread component re-renders when only a small slice of the state changes?

User's Answer: In a large React application, I would avoid putting too much state into one Context. I would split the Context into smaller contexts so that components only subscribe to the state they need. I can also use useMemo and useCallback to prevent unnecessary re-renders caused by changing object or function references. For frequently changing or complex global state, I may use a state management library that supports selective subscriptions.

Based on the interview question and the user's answer, evaluate the user's response.

Provide:

1. A rating from 1 to 10 based on how well the answer addresses the question, including correctness, relevance, clarity, and completeness.

2. Constructive feedback describing areas for improvement, if any. Keep the feedback concise and limited to 3 to 5 lines.

Return the response strictly in valid JSON format using the following structure:

{
  "rating": 8,
  "feedback": "Your answer is relevant and covers the main concept, but you could improve it by providing a specific example and explaining the reasoning more clearly."
}
`,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: `
{
  "rating": 8,
  "feedback": "Your answer is strong, practical, and directly addresses the core issue with context splitting and reference memoization. To make it even more comprehensive, you could mention separating state and dispatch/updater functions into distinct contexts so action-only components don't re-render. Additionally, discussing component composition, React.memo, or selector-based approaches such as use-context-selector would demonstrate deeper knowledge of React performance optimization."
}
`,
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: `
Evaluate the user's answer based on the following interview question and answer.

Interview Question:
${question}

User's Answer:
${userAnswer}

Evaluation Requirements:

- Give a rating from 1 to 10.
- Evaluate the answer based on correctness, relevance, clarity, completeness, and technical accuracy.
- The rating should reflect how well the user's answer addresses the specific interview question.
- Give constructive feedback explaining what the user did well and what could be improved.
- Keep the feedback concise and limited to 3 to 5 lines.
- Do not criticize the answer for not mentioning concepts that are not relevant to the question.
- Do not require advanced concepts unless they would meaningfully improve the answer.
- Consider the candidate's answer as a real interview response rather than expecting a textbook answer.
- Return exactly one rating and one feedback message.
- Do not include any additional fields or text.

Return only valid JSON using exactly this structure:

{
  "rating": 8,
  "feedback": "Your answer is relevant and technically correct, but you could improve it by providing a specific example and explaining the reasoning more clearly."
}
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
          type: "object",
          properties: {
            rating: {
              type: "integer",
              minimum: 1,
              maximum: 10,
              description:
                "A rating from 1 to 10 representing how well the user's answer addresses the interview question.",
            },
            feedback: {
              type: "string",
              description:
                "Constructive feedback explaining the strengths of the user's answer and areas for improvement in 3 to 5 lines.",
            },
          },
          required: ["rating", "feedback"],
          additionalProperties: false,
        },
      },
    });

    const generatedFeedback = response?.text;

    return generatedFeedback;

  } catch (error) {

    console.error("Error generating interview answer feedback:", error);

    return {
      success: false,
      message: error?.message || "Failed to generate interview answer feedback. Please try again.",
    };

  }

};
