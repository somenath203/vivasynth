import { History, MessageSquareText, Mic, Sparkles } from "lucide-react";

const highlights = [
  {
    icon: Sparkles,
    title: "AI-Generated Questions",
    description: "Get interview questions tailored to the selected role and experience.",
  },
  {
    icon: Mic,
    title: "Voice-Based Answers",
    description: "Answer interview questions naturally using your microphone.",
  },
  {
    icon: MessageSquareText,
    title: "AI-Powered Feedback",
    description: "Receive personalized feedback to understand how you can improve your answers.",
  },
  {
    icon: History,
    title: "Interview History",
    description: "Review your previous mock interviews and feedback from your dashboard.",
  },
];

export default function HighlightSection() {
  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {highlights.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex gap-3">
            <Icon className="mt-0.5 size-5 shrink-0 text-primary" />
            <div>
              <h3 className="text-sm font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}