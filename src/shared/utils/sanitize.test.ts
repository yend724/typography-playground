import { describe, it, expect } from "vitest";
import { sanitizeCSSValue } from "./sanitize";

describe("sanitizeCSSValue", () => {
  it("通常の CSS 値はそのまま返す", () => {
    expect(sanitizeCSSValue("16px")).toBe("16px");
    expect(sanitizeCSSValue("bold")).toBe("bold");
    expect(sanitizeCSSValue("#ff0000")).toBe("#ff0000");
    expect(sanitizeCSSValue("'Noto Sans JP', sans-serif")).toBe(
      "'Noto Sans JP', sans-serif",
    );
  });

  it("url() を含む値はサニタイズされる", () => {
    expect(sanitizeCSSValue("url(https://evil.com/track.gif)")).not.toContain(
      "url(",
    );
  });

  it("URL の大文字小文字バリエーションも除去する", () => {
    expect(sanitizeCSSValue("URL(https://evil.com)")).not.toContain("URL(");
    expect(sanitizeCSSValue("Url(https://evil.com)")).not.toContain("Url(");
  });

  it("expression() を除去する", () => {
    expect(sanitizeCSSValue("expression(alert(1))")).not.toContain(
      "expression(",
    );
  });

  it("javascript: プロトコルを除去する", () => {
    expect(sanitizeCSSValue("javascript:alert(1)")).not.toContain(
      "javascript:",
    );
  });

  it("空文字列はそのまま返す", () => {
    expect(sanitizeCSSValue("")).toBe("");
  });

  it("複数の危険パターンを同時に除去する", () => {
    const result = sanitizeCSSValue("url(evil) expression(bad) javascript:x");
    expect(result).not.toContain("url(");
    expect(result).not.toContain("expression(");
    expect(result).not.toContain("javascript:");
  });
});
