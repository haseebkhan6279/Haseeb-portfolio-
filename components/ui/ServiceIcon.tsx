import type { ReactNode } from "react";
import type { ServiceIcon as IconName } from "@/data/services";

const paths: Record<IconName, ReactNode> = {
  code: (
    <path
      d="M8 9l-4 3 4 3M16 9l4 3-4 3M13 5l-2 14"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  saas: (
    <>
      <rect x="3" y="4" width="18" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <rect x="3" y="14" width="18" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M7 7h.01M7 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  cart: (
    <>
      <path d="M6 6h15l-1.5 9H8L6 6z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      <circle cx="10" cy="20" r="1" fill="currentColor" />
      <circle cx="18" cy="20" r="1" fill="currentColor" />
      <path d="M6 6L5 3H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  ai: (
    <>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path
        d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </>
  ),
  landing: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  speed: (
    <>
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
    </>
  ),
  mobile: (
    <>
      <rect x="7" y="2" width="10" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M11 18h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
};

export default function ServiceIcon({ name, className = "" }: { name: IconName; className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      {paths[name]}
    </svg>
  );
}
