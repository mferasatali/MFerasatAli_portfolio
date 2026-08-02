export interface GitHubProfile {
  login: string;
  name: string | null;
  avatarUrl: string;
  bio: string | null;
  publicRepos: number;
  followers: number;
  htmlUrl: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  htmlUrl: string;
  language: string | null;
  stargazersCount: number;
  forksCount: number;
  updatedAt: string;
}

export const GITHUB_USERNAME = "mferasatali";

export const GITHUB_FALLBACK: {
  profile: GitHubProfile;
  repos: GitHubRepo[];
} = {
  profile: {
    login: GITHUB_USERNAME,
    name: "Muhammad Ferasat Ali",
    avatarUrl: "https://github.com/mferasatali.png",
    bio: "Full-Stack Engineer · Vue · React · Node.js · AI/LLM",
    publicRepos: 0,
    followers: 0,
    htmlUrl: "https://github.com/mferasatali",
  },
  repos: [],
};

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Vue: "#41b883",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
};

export function getLanguageColor(language: string | null): string {
  if (!language) return "var(--color-text-dim)";
  return LANGUAGE_COLORS[language] ?? "#8b5cf6";
}

export async function fetchGitHubData(): Promise<{
  profile: GitHubProfile;
  repos: GitHubRepo[];
}> {
  const headers = { Accept: "application/vnd.github+json" };

  const [profileRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers }),
    fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6&type=owner`,
      { headers }
    ),
  ]);

  if (!profileRes.ok || !reposRes.ok) {
    throw new Error("GitHub API unavailable");
  }

  const profileData = await profileRes.json();
  const reposData = await reposRes.json();

  const profile: GitHubProfile = {
    login: profileData.login,
    name: profileData.name,
    avatarUrl: profileData.avatar_url,
    bio: profileData.bio,
    publicRepos: profileData.public_repos,
    followers: profileData.followers,
    htmlUrl: profileData.html_url,
  };

  const repos: GitHubRepo[] = (reposData as Array<Record<string, unknown>>)
    .filter((r) => !r.fork)
    .slice(0, 6)
    .map((r) => ({
      id: r.id as number,
      name: r.name as string,
      description: r.description as string | null,
      htmlUrl: r.html_url as string,
      language: r.language as string | null,
      stargazersCount: r.stargazers_count as number,
      forksCount: r.forks_count as number,
      updatedAt: r.updated_at as string,
    }));

  return { profile, repos };
}
