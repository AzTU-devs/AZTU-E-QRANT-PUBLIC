// Shared types and pure display helpers for the public site. No server-only
// code here, so both server components and client components may import it.

export interface Person {
  // No FIN code: the public API never publishes personal identifiers.
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
  winner?: boolean;
  lead: { name: string | null; surname: string | null } | null;
}

export interface ProjectDetail {
  project_code: number;
  project_name: string | null;
  description: string | null;
  year: number | null;
  priotet_name: string | null;
  winner?: boolean;
  lead: Person | null;
  collaborators: Person[];
}

export interface WinnerItem {
  project_code: number;
  project_name: string | null;
  description: string | null;
  year: number | null;
  priotet_name: string | null;
  lead: Person | null;
  collaborators: Person[];
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  published: boolean;
  created_by: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface LeadTreeNode {
  project_code: number;
  project_name: string | null;
  year: number | null;
  lead: Person | null;
  collaborators: Person[];
}

/** Plain-text excerpt from rich-text HTML (for list previews / meta).
 * Only block-level boundaries add a space, so inline tags (bold, links, spans)
 * don't split words — e.g. "<strong>W</strong>ord" stays "Word", not "W ord". */
export function htmlExcerpt(html: string | null, max = 180): string {
  if (!html) return "";
  const text = html
    .replace(/<\/(p|div|li|h[1-6]|tr|blockquote)>/gi, " ")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > max ? text.slice(0, max).trimEnd() + "…" : text;
}

/** SEO-friendly slug from a title (transliterates Azerbaijani letters). */
export function slugify(text: string | null): string {
  if (!text) return "";
  const az: Record<string, string> = { "ə": "e", "ç": "c", "ğ": "g", "ı": "i", "ö": "o", "ş": "s", "ü": "u" };
  return text
    .toLowerCase()
    .replace(/[əçğıöşü]/g, (c) => az[c] ?? c)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+|-+$)/g, "")
    .slice(0, 80)
    .replace(/-+$/, "");
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
