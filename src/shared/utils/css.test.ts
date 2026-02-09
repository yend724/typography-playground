import { describe, it, expect } from "vitest";
import { cssPropertyToReact, buildAppliedStyles } from "./css";

describe("cssPropertyToReact", () => {
  it("kebab-case を camelCase に変換する", () => {
    expect(cssPropertyToReact("font-size")).toBe("fontSize");
    expect(cssPropertyToReact("letter-spacing")).toBe("letterSpacing");
    expect(cssPropertyToReact("text-decoration-line")).toBe(
      "textDecorationLine",
    );
  });

  it("単一語はそのまま返す", () => {
    expect(cssPropertyToReact("color")).toBe("color");
  });
});

describe("buildAppliedStyles", () => {
  it("state の値を React.CSSProperties に変換する", () => {
    const state = { "font-size": "24px", color: "#ff0000" };
    const result = buildAppliedStyles(state);
    expect(result).toEqual({ fontSize: "24px", color: "#ff0000" });
  });

  it("undefined の値は含めない", () => {
    const state: Record<string, string | undefined> = {
      "font-size": "24px",
      color: undefined,
    };
    const result = buildAppliedStyles(state);
    expect(result).toEqual({ fontSize: "24px" });
  });

  it("空の state では空オブジェクトを返す", () => {
    const result = buildAppliedStyles({});
    expect(result).toEqual({});
  });

  it("url() を含む値はサニタイズされる", () => {
    const state = { "font-family": "url(https://evil.com)" };
    const result = buildAppliedStyles(state);
    expect(result).toEqual({ fontFamily: "" });
  });

  it("expression() を含む値はサニタイズされる", () => {
    const state = { color: "expression(alert(1))" };
    const result = buildAppliedStyles(state);
    expect(result).toEqual({ color: "" });
  });

  it("通常の値はサニタイズの影響を受けない", () => {
    const state = { "font-family": "'Noto Sans JP', sans-serif" };
    const result = buildAppliedStyles(state);
    expect(result).toEqual({ fontFamily: "'Noto Sans JP', sans-serif" });
  });
});
