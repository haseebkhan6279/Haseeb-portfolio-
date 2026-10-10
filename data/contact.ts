export const CONTACT_TOPICS = [
  "A freelance project",
  "A website or online shop",
  "A booking system or app",
  "A full-time role",
  "Something else",
] as const;

export function isContactTopic(value: string): boolean {
  return (CONTACT_TOPICS as readonly string[]).includes(value);
}
