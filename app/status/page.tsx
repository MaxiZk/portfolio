async function getGitHubUser() {
  try {
    const res = await fetch("https://api.github.com/users/MaxiZk", {
      headers: {
        "Accept": "application/vnd.github.v3+json",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("Failed to fetch GitHub data");
    return res.json();
  } catch (error) {
    console.error("GitHub fetch error:", error);
    return null;
  }
}

export default async function Status() {
  const user = await getGitHubUser();

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="font-display text-4xl font-bold text-brand-dark mb-8">Status</h1>

      {user ? (
        <div className="bg-brand-cream border border-brand-teal/20 rounded p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-sm text-brand-dark/50 mb-2">Repositories</p>
              <p className="font-display text-3xl font-bold text-brand-dark">{user.public_repos}</p>
            </div>
            <div>
              <p className="text-sm text-brand-dark/50 mb-2">Followers</p>
              <p className="font-display text-3xl font-bold text-brand-dark">{user.followers}</p>
            </div>
            <div>
              <p className="text-sm text-brand-dark/50 mb-2">Following</p>
              <p className="font-display text-3xl font-bold text-brand-dark">{user.following}</p>
            </div>
          </div>

          <hr className="my-8 border-brand-teal/10" />

          <div className="text-sm text-brand-dark/60">
            <p className="mb-2">
              <span className="text-brand-dark font-medium">Name:</span> {user.name || "N/A"}
            </p>
            <p className="mb-2">
              <span className="text-brand-dark font-medium">Bio:</span> {user.bio || "N/A"}
            </p>
            <p className="mb-2">
              <span className="text-brand-dark font-medium">Location:</span> {user.location || "N/A"}
            </p>
            <p className="text-xs text-brand-dark/40 mt-6">
              Last updated: {new Date(user.updated_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-brand-cream border border-red-300/30 rounded p-8">
          <p className="text-red-600">Unable to fetch GitHub data. Please try again later.</p>
        </div>
      )}
    </div>
  );
}
