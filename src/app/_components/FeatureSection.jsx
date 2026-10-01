import { Brain, GitCompare, History, MessageSquareText, Mic, Video } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Interview Questions",
    description:
      "Generate personalized interview questions based on the job position, job description or technology stack, and years of experience.",
  },
  {
    icon: Video,
    title: "Realistic Mock Interviews",
    description:
      "Practice answering questions in an interview-style environment using your microphone and webcam.",
  },
  {
    icon: Mic,
    title: "Voice-Based Answering",
    description: "Answer questions naturally using your voice instead of typing every response.",
  },
  {
    icon: MessageSquareText,
    title: "Personalized AI Feedback",
    description:
      "Receive AI-generated feedback on your answers with practical suggestions for improvement.",
  },
  {
    icon: GitCompare,
    title: "Answer Comparison",
    description:
      "Compare your response with the expected answer to understand what you did well and what you can improve.",
  },
  {
    icon: History,
    title: "Interview History",
    description:
      "Review your previous interviews, questions, answers, and AI-generated feedback from your dashboard.",
  },
];

export default function FeatureSection() {
  return (
    <section id="features" className="scroll-mt-16">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          Everything You Need to Practice with Confidence
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <Card
              key={title}
              className="transition-colors hover:border-primary/40"
            >
              <CardHeader>
                <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <CardTitle className="text-lg">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}