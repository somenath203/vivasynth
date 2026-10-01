import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is VivaSynth?",
    answer:
      "VivaSynth is an AI-powered platform for practicing interviews. You create a mock interview, answer the questions, and get personalized feedback on your answers.",
  },
  {
    question: "How are interview questions generated?",
    answer:
      "Questions are generated from the job position, the job description or technology stack, and the years of experience you enter.",
  },
  {
    question: "Can I answer questions using my voice?",
    answer:
      "Yes. You can use your microphone to answer each question naturally, just like in a real interview.",
  },
  {
    question: "Does the application provide feedback on my answers?",
    answer:
      "Yes. AI analyzes your response and gives feedback with suggestions for improvement.",
  },
  {
    question: "Can I compare my answer with the expected answer?",
    answer:
      "Yes. After you complete the interview, you can review your response alongside the expected answer.",
  },
  {
    question: "Can I review previous interviews?",
    answer:
      "Yes. Completed interviews, along with your answers and feedback, are available in your interview history.",
  },
  {
    question: "Do I need an account?",
    answer:
      "Yes. You need to sign in so your interview data can be created and stored.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="scroll-mt-16 border-y border-border bg-secondary/40">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.question} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}