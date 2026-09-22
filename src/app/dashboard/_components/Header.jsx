'use client';

import { UserButton } from "@clerk/nextjs"
import Link from "next/link";
import { usePathname } from "next/navigation"

const Header = () => {

  const path = usePathname();

  return (
    <div className="p-4 flex items-center justify-between bg-secondary shadow-sm">
      
      {/* logo */}
      <Link href="/dashboard">
        <h1 className="font-semibold">Viva<span className="text-primary">Synth</span></h1>
      </Link>

      {/* menu */}
      <ul className="flex items-center justify-center gap-6 hover:cursor-pointer">

        <li className={`hover:text-primary hover:font-bold transition-all ${path === '/dashboard' && 'text-primary font-bold'}`}>Dashboard</li>

        <li className={`hover:text-primary hover:font-bold transition-all ${path === '/dashboard/questions' && 'text-primary font-bold'}`}>Questions</li>

        <li className={`hover:text-primary hover:font-bold transition-all ${path === '/dashboard/upgrade' && 'text-primary font-bold'}`}>Upgrade</li>

        <li className={`hover:text-primary hover:font-bold transition-all ${path === '/dashboard/howitworks' && 'text-primary font-bold'}`}>How it Works</li>

        <UserButton />

      </ul>

    </div>
  )
}

export default Header
