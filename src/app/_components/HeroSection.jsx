import Link from "next/link";
import { Mic, Sparkles, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GET_STARTED_HREF } from "../../links";

export default function HeroSection() {
  return (
    <section className="overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:gap-16">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Practice Smarter. Interview Better.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground lg:mx-0">
            Prepare for real-world interviews with AI-powered mock interviews,
            personalized questions, voice-based practice, and actionable feedback.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link href={GET_STARTED_HREF}>Start Practicing</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
              <Link href="#how-it-works">See How It Works</Link>
            </Button>
          </div>
        </div>

        {/* Interview preview */}
        <Card className="shadow-lg">
          <CardHeader className="gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge>Frontend Developer</Badge>
              <Badge variant="secondary">2 Years Experience</Badge>
            </div>
            <CardTitle className="text-base leading-snug font-semibold">
              Question 2: What is the difference between useMemo and useCallback in React?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex h-20 w-32 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground">
                <Video className="size-6" />
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Video className="size-4 text-primary" /> Camera on
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mic className="size-4 text-primary" /> Microphone on
                  <span className="ml-1 flex items-end gap-0.5" aria-hidden="true">
                    <span className="h-2 w-0.5 rounded bg-primary" />
                    <span className="h-4 w-0.5 rounded bg-primary" />
                    <span className="h-3 w-0.5 rounded bg-primary" />
                    <span className="h-5 w-0.5 rounded bg-primary" />
                    <span className="h-2 w-0.5 rounded bg-primary" />
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="size-2 rounded-full bg-destructive" /> Recording
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-muted p-4 text-sm">
              <p className="mb-1 font-medium">Your answer (transcribed)</p>
              <p className="text-muted-foreground">
                useMemo caches the result of a calculation, while useCallback caches
                a function so it keeps the same reference between renders...
              </p>
            </div>

            <Separator />

            <div className="flex gap-3 text-sm">
              <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />
              <div>
                <p className="mb-1 font-medium">AI feedback</p>
                <p className="text-muted-foreground">
                  Clear explanation of both hooks. Add a short example of when each
                  one actually prevents extra re-renders.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}