import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Manual testing sharpened my eye for what breaks a system — now I build tools that find it automatically.</h1>
      <p style={{ fontSize: "18px", opacity: 0.7 }}>
        Information Engineering student, USAL · former QA Functional Testing Intern, a1qa
      </p>
      <Link href="/contact" className="btn">
        Get in touch
      </Link>
    </div>
  );
}
