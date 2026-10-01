import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GET_STARTED_HREF } from "../../links";

export default function CTASection() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="rounded-2xl bg-primary px-6 py-12 text-center text-primary-foreground shadow-lg sm:px-12 sm:py-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Ready to Practice for Your Next Interview?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
            Create a personalized mock interview and start practicing with AI-powered feedback.
          </p>
          <Button size="lg" variant="secondary" asChild className="mt-8 w-full sm:w-auto">
            <Link href={GET_STARTED_HREF}>Start Your Mock Interview</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}