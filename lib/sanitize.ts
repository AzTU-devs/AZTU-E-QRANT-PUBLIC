import "server-only";
import sanitizeHtml from "sanitize-html";

// Announcement HTML is authored in the admin panel and rendered here with
// dangerouslySetInnerHTML. The API sanitises on write, but this site sanitises
// again on the server before rendering as defence in depth (finding P-L6).
// The allow-list mirrors the admin editor's formatting (Quill + tables).
const ALLOWED_TAGS = [
  "p", "br", "span", "div",
  "strong", "b", "em", "i", "u", "s", "strike",
  "ul", "ol", "li",
  "h1", "h2", "h3", "h4",
  "blockquote", "a",
  "table", "thead", "tbody", "tfoot", "tr", "td", "th", "col", "colgroup", "caption",
];

export function sanitizeAnnouncement(html: string | null | undefined): string {
  if (!html) return "";
  return sanitizeHtml(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: {
      "*": ["class", "data-list", "data-row"],
      a: ["href", "title", "target", "rel"],
      td: ["colspan", "rowspan"],
      th: ["colspan", "rowspan"],
      col: ["span", "width"],
    },
    // Only safe URL schemes; no javascript:.
    allowedSchemes: ["http", "https", "mailto"],
    allowProtocolRelative: false,
    transformTags: {
      // Force external links to be safe.
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer nofollow" }),
    },
  });
}
