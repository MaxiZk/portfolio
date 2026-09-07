import Link from "next/link";

export default function Contact() {
  return (
    <div style={{ maxWidth: "896px", margin: "0 auto", padding: "80px 24px", minHeight: "100vh", backgroundColor: "#FAFAF7", color: "#14171A" }}>
      <h1 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "48px" }}>Contact</h1>
      <div style={{ display: "grid", gap: "16px" }}>
        <div>
          <p style={{ fontSize: "14px", opacity: 0.5, marginBottom: "4px" }}>Email</p>
          <Link href="mailto:maxizuidwijk@gmail.com" style={{ color: "#BA7517", textDecoration: "none" }}>
            maxizuidwijk@gmail.com
          </Link>
        </div>
        <div>
          <p style={{ fontSize: "14px", opacity: 0.5, marginBottom: "4px" }}>LinkedIn</p>
          <Link href="https://linkedin.com/in/maximo-zuidwijk-9311271b2" target="_blank" style={{ color: "#BA7517", textDecoration: "none" }}>
            linkedin.com/in/maximo-zuidwijk-9311271b2
          </Link>
        </div>
        <div>
          <p style={{ fontSize: "14px", opacity: 0.5, marginBottom: "4px" }}>GitHub</p>
          <Link href="https://github.com/MaxiZk" target="_blank" style={{ color: "#BA7517", textDecoration: "none" }}>
            github.com/MaxiZk
          </Link>
        </div>
      </div>
    </div>
  );
}
