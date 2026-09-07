"use client";

import Link from "next/link";

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-brand-cream border-b border-brand-teal/10 px-6 py-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <Link href="/" className="font-display text-lg font-bold text-brand-dark">
          Máximo
        </Link>
        <div className="flex gap-8">
          <Link href="/work" className="text-sm hover:text-brand-orange transition">
            Work
          </Link>
          <Link href="/about" className="text-sm hover:text-brand-orange transition">
            About
          </Link>
          <Link href="/contact" className="text-sm hover:text-brand-orange transition">
            Contact
          </Link>
          <Link href="/status" className="text-sm hover:text-brand-orange transition">
            Status
          </Link>
        </div>
      </div>
    </nav>
  );
}
