export interface WorkEntry {
  company: string;
  role: string;
  start: string;
  end: string;
  flag?: string;
  current?: boolean;
}

export const WORK: WorkEntry[] = [
  { company: "Intelligent Machines", role: "Annotation Team Lead", start: "Aug 2019", end: "Sep 2020" },
  { company: "Intelligent Machines", role: "Junior QA Analyst", start: "Oct 2020", end: "Mar 2022" },
  { company: "Cloudly IO", role: "AI/ML Research Intern", start: "Aug 2024", end: "Jan 2025", flag: "shipped: 3GPP golden topology generators" },
  { company: "Cloudly IO", role: "AI/ML Engineer", start: "Feb 2025", end: "now", flag: "shipped: end-to-end MRO rApp pipeline", current: true },
];

export const NEXT_NODE = "next: AI research lab";
