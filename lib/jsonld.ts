/**
 * Safe serialisation for a <script type="application/ld+json"> block.
 *
 * Applicant-controlled strings (project names, people's names) flow into the
 * structured-data JSON. Injected raw, a value containing a closing script tag
 * would break out of the script element and inject markup (finding P-M2).
 * Escaping the angle brackets, ampersand and the two JS line separators makes
 * the payload inert inside the script context while remaining valid JSON.
 */

// U+2028 / U+2029 built at runtime so no literal separator ever appears in this
// source file (they would break the module's own parsing).
const LINE_SEP = new RegExp(String.fromCharCode(0x2028), "g");
const PARA_SEP = new RegExp(String.fromCharCode(0x2029), "g");

export const serializeJsonLd = (obj: unknown): string =>
  JSON.stringify(obj)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(LINE_SEP, "\\u2028")
    .replace(PARA_SEP, "\\u2029");
