import { describe, it, expect } from "vitest";
import { basicTextProperties } from "./basicText";

describe("basicTextProperties", () => {
  it("9 個のプロパティが定義されている", () => {
    expect(basicTextProperties).toHaveLength(9);
  });

  it("すべてのプロパティに必須フィールドがある", () => {
    for (const prop of basicTextProperties) {
      expect(prop.cssProperty).toBeTruthy();
      expect(prop.label).toBeTruthy();
      expect(prop.description).toBeTruthy();
      expect(prop.defaultValue).toBeDefined();
      expect(prop.controlType).toBeTruthy();
    }
  });

  it("cssProperty に重複がない", () => {
    const cssProperties = basicTextProperties.map((p) => p.cssProperty);
    expect(new Set(cssProperties).size).toBe(cssProperties.length);
  });

  it("font-family は含まれない（Phase 8 で追加）", () => {
    const cssProperties = basicTextProperties.map((p) => p.cssProperty);
    expect(cssProperties).not.toContain("font-family");
  });
});
