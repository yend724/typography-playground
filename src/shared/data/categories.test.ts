import { describe, it, expect } from "vitest";
import { categories } from "./categories";

describe("categories", () => {
  it("4 カテゴリが存在する", () => {
    expect(categories).toHaveLength(4);
  });

  it("カテゴリ id に重複がない", () => {
    const ids = categories.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("各カテゴリに 1 つ以上のプロパティがある", () => {
    for (const category of categories) {
      expect(category.properties.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("全カテゴリを通じて cssProperty に重複がない", () => {
    const allProps = categories.flatMap((c) =>
      c.properties.map((p) => p.cssProperty)
    );
    expect(new Set(allProps).size).toBe(allProps.length);
  });

  it("各カテゴリに specUrl と mdnUrl がある", () => {
    for (const category of categories) {
      expect(category.specUrl).toMatch(/^https:\/\//);
      expect(category.mdnUrl).toMatch(/^https:\/\/developer\.mozilla\.org/);
    }
  });
});
