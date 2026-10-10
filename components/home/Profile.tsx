import { getGithubProfile } from "@/lib/github";
import ProfileCard from "./ProfileCard";

/** Server wrapper: fetches public GitHub data (cached daily) for the profile card. */
export default async function Profile() {
  const github = await getGithubProfile();
  return <ProfileCard github={github} />;
}
