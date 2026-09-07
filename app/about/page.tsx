export default function About() {
  return (
    <div style={{ maxWidth: "896px", margin: "0 auto", padding: "80px 24px", minHeight: "100vh", backgroundColor: "#FAFAF7", color: "#14171A" }}>
      <h1 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "32px" }}>About</h1>
      <p style={{ fontSize: "18px", opacity: 0.7, marginBottom: "24px" }}>
        I started with manual testing. It sharpened my eye for what breaks a system.
      </p>
      <p style={{ fontSize: "18px", opacity: 0.7 }}>
        Now I build tools that find vulnerabilities automatically, before a human has to.
      </p>
    </div>
  );
}
