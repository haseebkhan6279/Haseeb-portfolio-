export type TrustStat = {
  value: number;
  suffix?: string;
  label: string;
};

export const TRUST_STATS: TrustStat[] = [
  { value: 25, suffix: "+", label: "Projects Delivered" },
  { value: 20, suffix: "+", label: "Happy Clients" },
  { value: 3, suffix: "+", label: "Years Experience" },
  { value: 15, suffix: "+", label: "Technologies Used" },
];
