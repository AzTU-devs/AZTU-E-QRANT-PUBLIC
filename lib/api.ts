import "server-only";
import { siteConfig } from "./site";
import type { ProjectListItem, ProjectDetail, WinnerItem, Announcement, LeadTreeNode } from "./model";

// Re-export the shared types and helpers so existing server-side imports from
// "@/lib/api" keep working. Client components must import from "@/lib/model".
export * from "./model";

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

async function apiGet<T>(path: string, opts?: { noStore?: boolean }): Promise<T | null> {
  const url = `${normalizedBase()}${path}`;
  try {
    const res = await fetch(url, {
      // Time-sensitive data (announcements) opts out of the ISR cache so newly
      // published items appear immediately; everything else uses ISR.
      ...(opts?.noStore
        ? { cache: "no-store" as const }
        : { next: { revalidate: REVALIDATE_SECONDS } }),
      // Server-to-server key: these requests run on the Next.js server, never
      // in a visitor's browser, so the key is not exposed. The backend refuses
      // /api/public/* without it. (No NEXT_PUBLIC_ prefix — keep it that way,
      // or Next.js would bundle it into client code.)
      headers: {
        Accept: "application/json",
        ...(process.env.PUBLIC_API_KEY ? { "X-Public-Api-Key": process.env.PUBLIC_API_KEY } : {}),
      },
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

export async function getWinners(): Promise<WinnerItem[]> {
  const data = await apiGet<WinnerItem[]>("/api/public/winners");
  return data ?? [];
}

export async function getAnnouncements(): Promise<Announcement[]> {
  const data = await apiGet<Announcement[]>("/api/public/announcements", { noStore: true });
  return data ?? [];
}

export async function getAnnouncement(id: number | string): Promise<Announcement | null> {
  return apiGet<Announcement>(`/api/public/announcement/${id}`, { noStore: true });
}
