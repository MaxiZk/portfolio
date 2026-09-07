async function getGitHubUser() {
  try {
    const res = await fetch("https://api.github.com/users/MaxiZk", {
      headers: { "Accept": "application/vnd.github.v3+json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("Failed");
    return res.json();
  } catch (error) {
    console.error("GitHub fetch error:", error);
    return null;
  }
}

export default async function Status() {
  const user = await getGitHubUser();

  return (
    <div style={{ maxWidth: "896px", margin: "0 auto", padding: "80px 24px", minHeight: "100vh", backgroundColor: "#FAFAF7", color: "#14171A" }}>
      <h1 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "32px" }}>Status</h1>
      {user ? (
        <div style={{ border: "1px solid #1B3A34", borderRadius: "4px", padding: "32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "32px" }}>
            <div>
              <p style={{ fontSize: "14px", opacity: 0.5, marginBottom: "8px" }}>Repositories</p>
              <p style={{ fontSize: "32px", fontWeight: "bold" }}>{user.public_repos}</p>
            </div>
            <div>
              <p style={{ fontSize: "14px", opacity: 0.5, marginBottom: "8px" }}>Followers</p>
              <p style={{ fontSize: "32px", fontWeight: "bold" }}>{user.followers}</p>
            </div>
            <div>
              <p style={{ fontSize: "14px", opacity: 0.5, marginBottom: "8px" }}>Following</p>
              <p style={{ fontSize: "32px", fontWeight: "bold" }}>{user.following}</p>
            </div>
          </div>
          <hr style={{ margin: "32px 0", opacity: 0.1 }} />
          <div style={{ fontSize: "14px" }}>
            <p style={{ marginBottom: "8px" }}><span style={{ fontWeight: "bold" }}>Name:</span> {user.name || "N/A"}</p>
            <p style={{ marginBottom: "8px" }}><span style={{ fontWeight: "bold" }}>Bio:</span> {user.bio || "N/A"}</p>
            <p><span style={{ fontWeight: "bold" }}>Location:</span> {user.location || "N/A"}</p>
          </div>
        </div>
      ) : (
        <div style={{ border: "1px solid red", borderRadius: "4px", padding: "32px", color: "red" }}>
          Unable to fetch GitHub data
        </div>
      )}
    </div>
  );
}
