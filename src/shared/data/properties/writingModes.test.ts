import { describe, it, expect } from "vitest";
import { writingModesProperties } from "./writingModes";

describe("writingModesProperties", () => {
  it("3 個のプロパティが定義されている", () => {
    expect(writingModesProperties).toHaveLength(3);
  });

  it("すべてのプロパティに必須フィールドがある", () => {
    for (const prop of writingModesProperties) {
      expect(prop.cssProperty).toBeTruthy();
      expect(prop.label).toBeTruthy();
      expect(prop.description).toBeTruthy();
      expect(prop.defaultValue).toBeDefined();
      expect(prop.controlType).toBeTruthy();
    }
  });

  it("cssProperty に重複がない", () => {
    const cssProperties = writingModesProperties.map((p) => p.cssProperty);
    expect(new Set(cssProperties).size).toBe(cssProperties.length);
  });
});
