import { CONTACT } from "@/data/site";

export type ContributionDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

export type GithubProfile = {
  username: string;
  total: number;
  days: ContributionDay[];
  repos: number;
  since: string;
  languages: { name: string; count: number }[];
};

const USERNAME = CONTACT.github.split("/").pop()!;
const DAY = 60 * 60 * 24;

async function getJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      next: { revalidate: DAY },
      headers: { Accept: "application/json", "User-Agent": "haseeb-portfolio" },
      signal: AbortSignal.timeout(8000),
    });
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null;
  }
}

/** Public GitHub data for the profile section. Returns null if GitHub is unreachable (section degrades gracefully). */
export async function getGithubProfile(): Promise<GithubProfile | null> {
  const [contrib, user, repos] = await Promise.all([
    getJson<{ total: { lastYear: number }; contributions: ContributionDay[] }>(
      `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`,
    ),
    getJson<{ public_repos: number; created_at: string }>(`https://api.github.com/users/${USERNAME}`),
    getJson<{ language: string | null; fork: boolean }[]>(`https://api.github.com/users/${USERNAME}/repos?per_page=100`),
  ]);

  if (!contrib) return null;

  const langCount = new Map<string, number>();
  for (const r of repos ?? []) {
    if (r.language && !r.fork) langCount.set(r.language, (langCount.get(r.language) ?? 0) + 1);
  }

  return {
    username: USERNAME,
    total: contrib.total.lastYear,
    days: contrib.contributions,
    repos: user?.public_repos ?? 0,
    since: user?.created_at?.slice(0, 4) ?? "",
    languages: [...langCount].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count),
  };
}
