import Link from "next/link";

export default function Nav() {
  return (
    <nav>
      <Link href="/" style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>
        Máximo
      </Link>
      <div style={{ display: "flex", gap: "32px" }}>
        <Link href="/work">Work</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/status">Status</Link>
      </div>
    </nav>
  );
}
