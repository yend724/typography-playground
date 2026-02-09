import { describe, it, expect } from "vitest";
import { fontProperties } from "./font";

describe("fontProperties", () => {
  it("12 個のプロパティが定義されている", () => {
    expect(fontProperties).toHaveLength(12);
  });

  it("すべてのプロパティに必須フィールドがある", () => {
    for (const prop of fontProperties) {
      expect(prop.cssProperty).toBeTruthy();
      expect(prop.label).toBeTruthy();
      expect(prop.description).toBeTruthy();
      expect(prop.defaultValue).toBeDefined();
      expect(prop.controlType).toBeTruthy();
    }
  });

  it("cssProperty に重複がない", () => {
    const cssProperties = fontProperties.map((p) => p.cssProperty);
    expect(new Set(cssProperties).size).toBe(cssProperties.length);
  });
});
