import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="font-display text-5xl font-bold text-brand-dark mb-6">
        Manual testing sharpened my eye for what breaks a system — now I build tools that find it automatically.
      </h1>
      <p className="text-lg text-brand-dark/70 mb-8">
        Information Engineering student, USAL · former QA Functional Testing Intern, a1qa
      </p>
      <Link
        href="/contact"
        className="inline-block bg-brand-orange text-brand-cream px-6 py-3 rounded text-sm font-medium hover:bg-brand-teal transition"
      >
        Get in touch
      </Link>
    </div>
  );
}
