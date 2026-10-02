# VivaSynth

![VivaSynth Thumbnail](/readme_for_projects/1.png)

_Practice smarter. Interview better._

## Contents

- [Introduction](#introduction)
- [For Whom Is This Application](#for-whom-is-this-application)
- [Features of the Application](#features-of-the-application)
- [How the Application Works](#how-the-application-works)
- [Tech Stack](#tech-stack)
- [Project Walkthrough Through Screenshots](#project-walkthrough-through-screenshots)
- [Camera Usage and Privacy](#camera-usage-and-privacy)
- [Setting Up the Project Locally](#setting-up-the-project-locally)
- [Disclaimer](#disclaimer)

## Introduction

**VivaSynth** is an AI-powered mock interview application designed to help users practice for interviews in a realistic and structured way.

The application allows users to create personalized mock interviews by providing information such as the job position, job description or required technologies, and years of experience. Based on this information, Google Gemini generates interview questions along with expected answers.

Users can then attend the mock interview using their webcam and microphone. They can answer the generated questions by speaking, after which the application processes their response and uses AI to generate feedback.

VivaSynth also allows users to review their previous interview sessions and compare their responses with the expected answers and AI-generated feedback.

## For Whom Is This Application

VivaSynth can be useful for:

- Students preparing for their first technical or non-technical interview.
- Freshers who want to practice answering interview questions.
- Developers preparing for interviews based on a particular role or technology stack.
- Job seekers who want to practice speaking their answers instead of only writing them.
- Anyone who wants to become more comfortable with answering interview questions before attending a real interview.

## Features of the Application

### 1. AI-Generated Interview Questions

Users can create a personalized mock interview by providing:

- Job position
- Job description or required technology stack
- Years of experience

Google Gemini uses this information to generate interview questions and expected answers specifically for the selected interview context.

### 2. Webcam-Based Mock Interview

VivaSynth allows users to use their webcam while attending an interview.

The user must enable the webcam before starting the interview. This helps create a more realistic interview environment where the user can practice answering questions while appearing on camera.

If the webcam is not enabled, the user cannot continue to the next interview question.

### 3. Listen to Interview Questions

Users can listen to any interview question instead of reading it manually.

A microphone icon is provided directly below each question. By clicking on the icon, the application reads the selected interview question aloud, allowing users to listen to the question before answering it.

### 4. Voice-Based Answer Recording

Users can answer interview questions by speaking instead of typing their responses.

The application uses speech-to-text functionality to convert the user's spoken answer into text, which can then be processed by the AI system.

The user needs to start recording when they are ready to answer the current question and stop the recording after completing their answer.

### 5. One Answer Submission Per Question

Once the user submits an answer for a particular question and the application successfully processes the recording, the user cannot record another answer for that same question.

This keeps the interview flow structured and prevents users from repeatedly recording answers for the same question.

After the answer has been processed successfully, the application displays a confirmation and allows the user to move to the next question.

### 6. AI-Generated Feedback

After the user submits an answer, Google Gemini analyzes the response and generates feedback based on the question and the user's answer.

The feedback is intended to help users understand how their answer can be improved.

### 7. Expected Answer Comparison

VivaSynth stores the expected answer generated for each interview question.

After completing the interview, users can compare:

- The interview question
- Their recorded/transcribed answer
- The expected answer
- AI-generated feedback

This gives users a clearer understanding of the difference between their response and the expected response.

### 8. Interview History

Users can access their previous interview sessions through their interview history.

This allows them to revisit previously generated interviews and review the questions, answers, expected answers, and feedback associated with those sessions.

### 9. Authentication

VivaSynth uses Clerk Authentication to securely manage user authentication.

Authenticated users can create and access their own mock interview sessions.

## How the Application Works

The overall working flow of VivaSynth can be represented as follows:

```text
                         +----------------------+
                         |      User Signs In   |
                         +----------+-----------+
                                    |
                                    v
                         +----------------------+
                         | Create Mock Interview|
                         +----------+-----------+
                                    |
                                    v
                    +-------------------------------+
                    | Enter Job Position, Job       |
                    | Description / Tech Stack,     |
                    | and Years of Experience       |
                    +---------------+---------------+
                                    |
                                    v
                         +----------------------+
                         | Google Gemini API    |
                         | Generates Questions  |
                         | and Expected Answers |
                         +----------+-----------+
                                    |
                                    v
                         +----------------------+
                         | Start Mock Interview |
                         +----------+-----------+
                                    |
                                    v
                         +----------------------+
                         | Enable Webcam        |
                         | and Microphone        |
                         +----------+-----------+
                                    |
                                    v
                         +----------------------+
                         | Read Interview       |
                         | Question             |
                         +----------+-----------+
                                    |
                                    v
                         +----------------------+
                         | Record Answer Using  |
                         | Microphone           |
                         +----------+-----------+
                                    |
                                    v
                         +----------------------+
                         | Speech-to-Text       |
                         | Converts Answer      |
                         | into Text            |
                         +----------+-----------+
                                    |
                                    v
                         +----------------------+
                         | Submit Answer        |
                         | Once Per Question    |
                         +----------+-----------+
                                    |
                                    v
                         +----------------------+
                         | Google Gemini API    |
                         | Generates Feedback   |
                         +----------+-----------+
                                    |
                                    v
                         +----------------------+
                         | Save Answer and      |
                         | Feedback             |
                         +----------+-----------+
                                    |
                                    v
                         +----------------------+
                         | Move to Next         |
                         | Question             |
                         +----------+-----------+
                                    |
                                    v
                         +----------------------+
                         | Repeat Until All     |
                         | Questions Are Done   |
                         +----------+-----------+
                                    |
                                    v
                         +----------------------+
                         | Review Interview     |
                         | Feedback             |
                         +----------+-----------+
                                    |
                                    v
                         +----------------------+
                         | Compare Your Answer  |
                         | with Expected Answer |
                         +----------+-----------+
                                    |
                                    v
                         +----------------------+
                         | Interview History    |
                         +----------------------+
```

In simple terms:

```text
Create Interview
       |
       v
Generate Questions
       |
       v
Enable Webcam
       |
       v
Answer Question
       |
       v
Record Voice
       |
       v
Convert Speech to Text
       |
       v
Submit Answer
       |
       v
Generate AI Feedback
       |
       v
Save Answer + Feedback
       |
       v
Next Question
       |
       v
Complete Interview
       |
       v
Review Feedback + Compare Answers
```

## Tech Stack

### Frontend

- **Next.js** — React framework used to build the application.
- **Tailwind CSS** — Utility-first CSS framework used for styling.
- **shadcn/ui** — Reusable UI components used to build the interface.
- **lucide-react** — Icon library used throughout the application.

### Authentication

- **Clerk Authentication** — Used for user authentication and managing authenticated users.

### Database

- **Neon DB** — Serverless PostgreSQL database used to store application data.
- **Drizzle ORM** — Used to interact with the PostgreSQL database from the application.

### Artificial Intelligence

- **Google Gemini API** — Used to generate interview questions, expected answers, and feedback on user responses.

### Interview and Browser Features

- **react-hook-speech-to-text** — Used to convert the user's spoken answers into text.
- **react-webcam** — Used to access and display the user's webcam during the interview.

### Other Libraries

- **react-hot-toast** — Used to display notifications and status messages.
- **Moment** — Used for date formatting.
- **uuid** — Used for generating unique identifiers.

## Project Walkthrough Through Screenshots

The following screenshots provide a visual overview of VivaSynth and demonstrate how the application works from authentication and interview creation to answering questions and reviewing AI-generated feedback.

### 1. Authentication Using Clerk

Here is a screenshot of the **VivaSynth authentication page**, where users can sign in using Clerk Authentication.

![Authentication Using Clerk](/readme_for_projects/2.png)

Authentication allows users to securely access their own mock interviews and interview history.

---

### 2. Dashboard

Here is a screenshot of the **VivaSynth dashboard**, which users see after successfully signing in.

![VivaSynth Dashboard](/readme_for_projects/3.png)

The dashboard provides access to creating a new mock interview and viewing previously completed interview sessions.

---

### 3. Create a New Interview

Here is a screenshot of the **Create New Interview dialog**, where users provide the information required to generate their mock interview.

![Create New Interview Dialog](/readme_for_projects/4.png)

Users can enter details such as the job position, job description or technology stack, and years of experience. This information is used by Google Gemini to generate personalized interview questions and expected answers.

---

### 4. Check Camera Before the Interview

Here is a screenshot of the **camera check screen**, where users can check whether their webcam is working properly before starting the interview.

![Check Camera](/readme_for_projects/5.png)

This gives users an opportunity to make sure their camera is ready before entering the actual mock interview.

---

### 5. Start the Interview

Here is a screenshot of the **Start Interview screen**, where users can begin their AI-generated mock interview.

![Start Interview](/readme_for_projects/6.png)

Once the user is ready, they can start the interview and begin answering the generated questions.

---

### 6. Enable Webcam

Here is a screenshot showing the **webcam and interview controls**, where the user is required to enable their webcam before continuing.

![Enable Webcam](/readme_for_projects/7.png)

The user must enable the webcam before proceeding to the next interview question. If the webcam is not enabled, the user cannot continue to the next question.

This is intended to provide a more realistic interview-like experience.

---

### 7. Record the Answer

Here is a screenshot of the **Record Answer interface**, where the user can record their response to the current interview question.

![Record Answer](/readme_for_projects/8.png)

When the user is ready, they can click the **Record Answer** button and answer the question using their microphone.

The spoken response is captured and converted into text using speech-to-text functionality.

---

### 8. Recording, Saving, and Generating AI Feedback

Here is a screenshot showing the **answer recording and AI feedback generation process** after the user submits an answer.

![Recording Saving and AI Feedback](/readme_for_projects/9.png)

After the user stops recording, VivaSynth processes the response and sends the user's answer along with the interview question to Google Gemini.

Gemini then generates AI-based feedback for the submitted answer.

Once the answer has been successfully processed, the user cannot record another answer for the same question.

---

### 9. User Answer Saved Along With AI Feedback

Here is a screenshot showing the **user's submitted answer along with the generated AI feedback**.

![User Answer and AI Feedback](/readme_for_projects/10.png)

The user's transcribed answer and the AI-generated feedback are saved as part of the interview session.

The expected answer generated for the question is also retained, allowing the user to review and compare the expected answer with their own response later.

---

### 10. Submit the Interview

Here is a screenshot of the **interview completion screen**, where the user can submit the interview after answering all the questions.

![Submit Interview](/readme_for_projects/11.png)

After completing the interview questions, the user can submit the interview and access the generated feedback for the entire interview session.

---

### 11. Review the Generated AI Interview Feedback

Here is a screenshot of the **AI-generated interview feedback page**, where users can review their interview session question by question.

![AI Interview Feedback](/readme_for_projects/12.png)

The feedback page allows users to review:

- The interview question
- Their submitted answer
- The expected answer
- AI-generated feedback

This gives users a clear way to compare their responses with the expected answers and understand how they can improve their answers in future interviews.

## Camera Usage and Privacy

The camera in VivaSynth is used only to provide a more realistic interview experience.

It does **not** perform any kind of online proctoring, identity verification, monitoring, or surveillance. VivaSynth does not use the camera to take pictures or record video for verification purposes.

The purpose of enabling the camera is simply to give users a more realistic online interview experience, similar to attending an actual interview where the interviewer and candidate can see each other.

In short, the camera is included to improve the interview experience and provide a more realistic interview environment, not for proctoring or verification.

## Setting Up the Project Locally

Follow the steps below to run VivaSynth on your local machine.

### 1. Clone the Repository

First, clone the VivaSynth repository from GitHub:

```bash
git clone https://github.com/somenath203/vivasynth.git
```

Then, move into the project directory:

```bash
cd vivasynth
```

---

### 2. Install the Dependencies

Install all the required project dependencies using pnpm:

```bash
pnpm install
```

---

### 3. Create the Environment Variables File

Create a `.env` file in the root directory of the project.

You can use the following `.env.example` as a reference:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

CLERK_SECRET_KEY

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in

NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard

NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/dashboard

DATABASE_URL

GOOGLE_GEMINI_API_KEY
```

Add the appropriate values to the environment variables.

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` — Get the **Clerk Publishable Key** from your Clerk application.
- `CLERK_SECRET_KEY` — Get the **Clerk Secret Key** from your Clerk application.
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL` — Keep this value as `/sign-in`.
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL` — Keep this value as `/sign-up`.
- `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL` — Keep this value as `/dashboard`.
- `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL` — Keep this value as `/dashboard`.
- `DATABASE_URL` — Get the appropriate **PostgreSQL database connection string** from your database provider.
- `GOOGLE_GEMINI_API_KEY` — Get a **Google Gemini API key** from Google AI Studio.

Make sure you replace the empty variables with your own credentials before running the application.

> **Note:** Do not commit your `.env` file or expose your secret keys publicly.

---

### 4. Start the Development Server

After installing the dependencies and configuring the environment variables, start the Next.js development server:

```bash
pnpm dev
```

The application will then be available at:

```text
http://localhost:3000
```

You can open this URL in your browser to use VivaSynth locally.

## Disclaimer

VivaSynth uses artificial intelligence to generate interview questions, expected answers, and feedback.

The content generated by AI is based on the information provided to the application and the behavior of the underlying AI model. Therefore, the creator of VivaSynth does not control or guarantee the accuracy, completeness, reliability, or suitability of AI-generated content.

AI-generated questions, answers, and feedback may sometimes contain incorrect, incomplete, or misleading information. Users should use the generated content as a practice rather than as an authoritative source.

The creator of the application is not responsible for decisions, outcomes, or actions taken solely on the basis of AI-generated content.
