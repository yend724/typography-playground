import { describe, it, expect } from "vitest";
import { cssPropertyToReact, buildAppliedStyles } from "./css";

describe("cssPropertyToReact", () => {
  it("kebab-case を camelCase に変換する", () => {
    expect(cssPropertyToReact("font-size")).toBe("fontSize");
    expect(cssPropertyToReact("letter-spacing")).toBe("letterSpacing");
    expect(cssPropertyToReact("text-decoration-line")).toBe("textDecorationLine");
  });

  it("単一語はそのまま返す", () => {
    expect(cssPropertyToReact("color")).toBe("color");
  });
});

describe("buildAppliedStyles", () => {
  it("state の値を React.CSSProperties に変換する", () => {
    const state = { "font-size": "24px", "color": "#ff0000" };
    const result = buildAppliedStyles(state);
    expect(result).toEqual({ fontSize: "24px", color: "#ff0000" });
  });

  it("undefined の値は含めない", () => {
    const state: Record<string, string | undefined> = {
      "font-size": "24px",
      "color": undefined,
    };
    const result = buildAppliedStyles(state);
    expect(result).toEqual({ fontSize: "24px" });
  });

  it("空の state では空オブジェクトを返す", () => {
    const result = buildAppliedStyles({});
    expect(result).toEqual({});
  });
});
