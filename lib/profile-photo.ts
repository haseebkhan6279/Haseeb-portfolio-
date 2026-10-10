import { existsSync } from "node:fs";
import path from "node:path";

const CANDIDATES = ["haseeb.jpg", "haseeb.jpeg", "haseeb.png", "haseeb.webp"];

/** Public URL of the profile photo in public/images/, or null if none has been added yet. Server-only. */
export function getProfilePhoto(): string | null {
  for (const file of CANDIDATES) {
    if (existsSync(path.join(process.cwd(), "public", "images", file))) return `/images/${file}`;
  }
  return null;
}
