import { describe, it, expect } from "vitest";
import { textDecorationProperties } from "./textDecoration";

describe("textDecorationProperties", () => {
  it("7 個のプロパティが定義されている", () => {
    expect(textDecorationProperties).toHaveLength(7);
  });

  it("すべてのプロパティに必須フィールドがある", () => {
    for (const prop of textDecorationProperties) {
      expect(prop.cssProperty).toBeTruthy();
      expect(prop.label).toBeTruthy();
      expect(prop.description).toBeTruthy();
      expect(prop.defaultValue).toBeDefined();
      expect(prop.controlType).toBeTruthy();
    }
  });

  it("cssProperty に重複がない", () => {
    const cssProperties = textDecorationProperties.map((p) => p.cssProperty);
    expect(new Set(cssProperties).size).toBe(cssProperties.length);
  });
});
