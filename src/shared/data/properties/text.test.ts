import { describe, it, expect } from "vitest";
import { textProperties } from "./text";

describe("textProperties", () => {
  it("17 個のプロパティが定義されている", () => {
    expect(textProperties).toHaveLength(17);
  });

  it("すべてのプロパティに必須フィールドがある", () => {
    for (const prop of textProperties) {
      expect(prop.cssProperty).toBeTruthy();
      expect(prop.label).toBeTruthy();
      expect(prop.description).toBeTruthy();
      expect(prop.defaultValue).toBeDefined();
      expect(prop.controlType).toBeTruthy();
    }
  });

  it("cssProperty に重複がない", () => {
    const cssProperties = textProperties.map((p) => p.cssProperty);
    expect(new Set(cssProperties).size).toBe(cssProperties.length);
  });
});
