import Link from "next/link";
import { Mic } from "lucide-react";
import { GET_STARTED_HREF, SIGN_IN_HREF } from "../../links";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "FAQs", href: "#faq" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign In", href: SIGN_IN_HREF },
      { label: "Get Started", href: GET_STARTED_HREF },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div>
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Mic className="size-4" />
              </span>
              <span className="text-lg tracking-tight">VivaSynth</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              AI-powered interview practice designed to help you prepare, practice, and improve.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-20">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="text-sm font-semibold">{col.title}</h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-sm text-muted-foreground flex flex-col gap-2">
          
          <p>© {new Date().getFullYear()} VivaSynth.</p>

          <p>Made with 💖 by Somenath Choudhury</p>

        </div>
      </div>
    </footer>
  );
}