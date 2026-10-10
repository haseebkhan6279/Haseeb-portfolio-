"use client";

import { useEffect, useState } from "react";
import { PROFILE } from "@/data/site";

const fmt = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: PROFILE.timezone,
});

/** Current time in Lahore; renders a placeholder until mounted to avoid hydration mismatch. */
export default function LocalTime({ className }: { className?: string }) {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);
  return <span className={className}>{now ?? "--:--"} PKT</span>;
}
