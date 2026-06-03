import { siteConfig } from "./site";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface Person {
  fin_kod: string;
  name: string | null;
  surname: string | null;
  father_name?: string | null;
  work_place?: string | null;
  department?: string | null;
  duty?: string | null;
  scientific_degree?: string | null;
  scientific_name?: string | null;
}

export interface ProjectListItem {
  project_code: number;
  project_name: string | null;
  description: string | null;
  year: number | null;
  priotet_name: string | null;
  lead: { name: string | null; surname: string | null } | null;
}

export interface ProjectDetail {
  project_code: number;
  project_name: string | null;
  description: string | null;
  year: number | null;
  priotet_name: string | null;
  lead: Person | null;
  collaborators: Person[];
}

export interface LeadTreeNode {
  project_code: number;
  project_name: string | null;
  year: number | null;
  lead: Person | null;
  collaborators: Person[];
}

interface ApiEnvelope<T> {
  status: number;
  message: string;
  data: T;
  success_code?: string;
}

/* ------------------------------------------------------------------ */
/* Fetch helpers                                                       */
/* ------------------------------------------------------------------ */

const REVALIDATE_SECONDS = 300; // ISR: refresh public data every 5 minutes.

/**
 * Normalize the configured base URL so it is always just the host/origin.
 * Forgiving of a trailing slash or an accidental `/api` suffix, because the
 * request paths below already start with `/api/...`.
 */
function normalizedBase(): string {
  return siteConfig.apiBaseUrl.replace(/\/+$/, "").replace(/\/api$/i, "");
}

async function apiGet<T>(path: string): Promise<T | null> {
  const url = `${normalizedBase()}${path}`;
  try {
    const res = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      console.error(`API ${path} responded ${res.status}`);
      return null;
    }

    const json = (await res.json()) as ApiEnvelope<T>;
    return json?.data ?? null;
  } catch (err) {
    console.error(`Failed to fetch ${url}:`, err);
    return null;
  }
}

export async function getProjects(): Promise<ProjectListItem[]> {
  const data = await apiGet<ProjectListItem[]>("/api/public/projects");
  return data ?? [];
}

export async function getProject(code: number | string): Promise<ProjectDetail | null> {
  return apiGet<ProjectDetail>(`/api/public/project/${code}`);
}

export async function getLeadsTree(): Promise<LeadTreeNode[]> {
  const data = await apiGet<LeadTreeNode[]>("/api/public/leads-tree");
  return data ?? [];
}

/* ------------------------------------------------------------------ */
/* Display helpers                                                     */
/* ------------------------------------------------------------------ */

export function fullName(p: {
  name?: string | null;
  surname?: string | null;
  father_name?: string | null;
} | null): string {
  if (!p) return "Naməlum";
  return [p.name, p.surname, p.father_name].filter(Boolean).join(" ") || "Naməlum";
}

export const UNKNOWN_YEAR = "Tarix qeyd olunmayıb";

/** Group projects by year, returning years sorted descending. */
export function groupByYear<T extends { year: number | null }>(
  items: T[]
): { year: number | null; label: string; items: T[] }[] {
  const map = new Map<number | null, T[]>();
  for (const item of items) {
    const key = item.year ?? null;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(item);
  }

  return Array.from(map.entries())
    .sort((a, b) => {
      if (a[0] === null) return 1;
      if (b[0] === null) return -1;
      return b[0] - a[0];
    })
    .map(([year, items]) => ({
      year,
      label: year === null ? UNKNOWN_YEAR : String(year),
      items,
    }));
}
