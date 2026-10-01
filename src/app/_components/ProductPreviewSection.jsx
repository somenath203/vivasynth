import { ChevronLeft, ChevronRight, Lightbulb, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ProductPreviewSection() {
  return (
    <section>
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            See Exactly How to Improve Every Answer
          </h2>
          <p className="mt-4 text-muted-foreground">
            After your interview, review each question with your answer, the expected
            answer, and AI feedback side by side.
          </p>
        </div>

        <Card className="mt-12 shadow-lg">
          <CardHeader className="gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge>Question 3</Badge>
              <Badge variant="secondary">Frontend Developer</Badge>
            </div>
            <CardTitle className="text-lg leading-snug sm:text-xl">
              &ldquo;Explain the difference between server-side rendering and client-side
              rendering.&rdquo;
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-border bg-muted/50 p-4">
                <Badge variant="outline" className="mb-3">Your Answer</Badge>
                <p className="text-sm text-muted-foreground">
                  With server-side rendering the page is built on the server, so the
                  user gets HTML quickly. With client-side rendering the browser
                  downloads JavaScript and builds the page itself, which can feel
                  slower on first load.
                </p>
              </div>
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
                <Badge className="mb-3">Expected Answer</Badge>
                <p className="text-sm text-muted-foreground">
                  SSR renders HTML on the server for each request, improving first
                  paint and SEO. CSR sends a minimal HTML shell and renders in the
                  browser, which suits highly interactive apps. Many frameworks, like
                  Next.js, let you combine both depending on the page.
                </p>
              </div>
            </div>

            <Separator />

            <div>
              <div className="mb-3 flex items-center gap-2">
                <Sparkles className="size-4 text-primary" />
                <h3 className="font-semibold">AI Feedback</h3>
              </div>
              <div className="grid gap-4 text-sm md:grid-cols-2">
                <div>
                  <p className="mb-1 font-medium">What you did well</p>
                  <p className="text-muted-foreground">
                    You explained where the page is built in each approach and noted
                    the effect on first load time.
                  </p>
                </div>
                <div>
                  <p className="mb-1 font-medium">What to improve</p>
                  <p className="text-muted-foreground">
                    Mention SEO and when you would choose each approach. A real
                    example, such as a marketing page versus a dashboard, makes the
                    answer stronger.
                  </p>
                </div>
              </div>
              <div className="mt-4 flex gap-3 rounded-lg bg-secondary p-4 text-sm">
                <Lightbulb className="mt-0.5 size-4 shrink-0 text-primary" />
                <p className="text-secondary-foreground">
                  <span className="font-medium">Improvement tip: </span>
                  Finish by naming a trade-off, then say which approach you would pick
                  for the project in the question.
                </p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="justify-between">
            <Button variant="outline" size="sm" tabIndex={-1}>
              <ChevronLeft className="size-4" /> Previous
            </Button>
            <Button variant="outline" size="sm" tabIndex={-1}>
              Next <ChevronRight className="size-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}