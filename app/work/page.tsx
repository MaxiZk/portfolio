export default function Work() {
  return (
    <div style={{ maxWidth: "896px", margin: "0 auto", padding: "80px 24px", minHeight: "100vh", backgroundColor: "#FAFAF7", color: "#14171A" }}>
      <h1 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "48px" }}>Work</h1>
      <div style={{ display: "grid", gap: "64px" }}>
        <section>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "12px" }}>System Graph SAST</h2>
          <p style={{ opacity: 0.7, marginBottom: "12px" }}>Static security analysis tool using TypeScript/Node.js + Neo4j</p>
          <p style={{ fontSize: "14px", opacity: 0.5 }}>Placeholder: case study goes here</p>
        </section>
        <section>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "12px" }}>QA at a1qa</h2>
          <p style={{ opacity: 0.7, marginBottom: "12px" }}>Functional testing internship (completed)</p>
          <p style={{ fontSize: "14px", opacity: 0.5 }}>Placeholder: case study goes here</p>
        </section>
      </div>
    </div>
  );
}
