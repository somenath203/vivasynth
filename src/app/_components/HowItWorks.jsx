import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  {
    number: "01",
    title: "Create Your Interview",
    description:
      "Enter the job position, job description or technology stack, and years of experience.",
  },
  {
    number: "02",
    title: "Get AI-Generated Questions",
    description:
      "AI generates personalized interview questions and expected answers based on the information you provide.",
  },
  {
    number: "03",
    title: "Answer the Questions",
    description:
      "Enable your microphone and webcam and answer the questions naturally as you would during a real interview.",
  },
  {
    number: "04",
    title: "Review Your Feedback",
    description:
      "Receive AI-generated feedback and compare your responses with the expected answers to identify areas for improvement.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-16 border-y border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">How It Works</h2>
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li key={step.number}>
              <Card className="h-full">
                <CardHeader>
                  <span className="text-3xl font-bold text-primary">{step.number}</span>
                  <CardTitle className="pt-2 text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}