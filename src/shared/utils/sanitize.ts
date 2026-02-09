import DOMPurify from "dompurify";

const DANGEROUS_PATTERNS: readonly RegExp[] = [
  /url\s*\([^()]*(?:\([^()]*\)[^()]*)*\)/gi,
  /expression\s*\([^()]*(?:\([^()]*\)[^()]*)*\)/gi,
  /javascript\s*:/gi,
];

const stripDangerousPatterns = (value: string): string => {
  let result = value;
  for (const pattern of DANGEROUS_PATTERNS) {
    result = result.replace(pattern, "");
  }
  return result;
};

const PROPERTY_KEY = "--_sanitize";

const sanitizeViaDOMPurify = (value: string): string => {
  const escaped = value.replace(/"/g, "&quot;");
  const dirty = `<span style="${PROPERTY_KEY}: ${escaped}"></span>`;
  const clean = DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ["span"],
    ALLOWED_ATTR: ["style"],
  });

  const match = clean.match(new RegExp(`${PROPERTY_KEY}:\\s*([^"]*)`));
  if (!match) return "";

  return match[1].replace(/;?\s*$/, "");
};

export const sanitizeCSSValue = (value: string): string => {
  if (value === "") return "";

  const afterDOMPurify = sanitizeViaDOMPurify(value);
  return stripDangerousPatterns(afterDOMPurify);
};
