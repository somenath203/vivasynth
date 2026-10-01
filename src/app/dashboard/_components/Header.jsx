"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Mic } from "lucide-react";

const Header = () => {
  return (
    <div className="p-4 flex items-center justify-between bg-secondary shadow-sm">

      {/* logo */}
      <Link href="/" className="flex items-center gap-2 font-semibold">

        <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Mic className="size-4" />
        </span>

        <span className="text-lg tracking-tight">VivaSynth</span>

      </Link>

      {/* menu */}
      <ul className="flex items-center justify-center gap-6 hover:cursor-pointer">

        <li className="hover:text-primary hover:font-bold transition-all">
          Dashboard
        </li>

        <UserButton />

      </ul>
      
    </div>
  );
};

export default Header;
