# Phase 2: 型定義と Basic Text データ

## Context

Typography プロパティをデータ駆動で扱うための型定義と、最初のカテゴリ (Basic Text) のプロパティデータを作成する。Phase 5 で UI と結合して動作確認できる状態を目指す。

## 前提

- Phase 1 完了（Vite + React + Tailwind v4 + Vitest 動作確認済み）

## 進捗

| Step | 内容 | 状態 |
|---|---|---|
| 2-1 | 型定義の作成 | done |
| 2-2 | Basic Text プロパティ定義 | done |
| 2-3 | カテゴリ組み立て | done |

---

## Step 2-1: 型定義の作成

### 要件

- `PropertyDefinition` と `PropertyCategory` を中心とした型体系を定義する
- `controlType` に応じた設定型 (`SliderConfig`, `SelectConfig`, `MultiValueConfig`, `AxisConfig`) を定義する
- TDD: 型の構造検証テストを先に書く

### 新規ファイル

| ファイル | 操作 |
|---|---|
| `src/shared/types/typography.ts` | 新規 — 型定義 |
| `src/shared/types/typography.test.ts` | 新規 — テスト |

### 設計方針

- `type` + `Readonly<{}>` を使用（`interface` は使わない）
- `controlType` はユニオン型で定義
- 判別可能ユニオン (discriminated union) で `PropertyDefinition` を定義し、`controlType` に応じた config を型安全に参照できるようにする

### コードスニペット

**src/shared/types/typography.ts**
```ts
export type ControlType =
  | "slider"
  | "select"
  | "color"
  | "text"
  | "font-family"
  | "multi-value"
  | "axis-slider-group";

export type SliderConfig = Readonly<{
  min: number;
  max: number;
  step: number;
  unit: string;
}>;

export type SelectOption = Readonly<{
  value: string;
  label: string;
}>;

export type SelectConfig = Readonly<{
  options: readonly SelectOption[];
}>;

export type MultiValueSubField = Readonly<{
  name: string;
  label: string;
  type: "slider" | "color";
  sliderConfig?: SliderConfig;
}>;

export type MultiValueConfig = Readonly<{
  subFields: readonly MultiValueSubField[];
  template: string; // e.g. "{offsetX} {offsetY} {blur} {color}"
}>;

export type AxisDefinition = Readonly<{
  tag: string;    // e.g. "wght"
  name: string;   // e.g. "Weight"
  min: number;
  max: number;
  step: number;
  defaultValue: number;
}>;

export type AxisConfig = Readonly<{
  axes: readonly AxisDefinition[];
}>;

export type PropertyDefinitionBase = Readonly<{
  cssProperty: string;
  label: string;
  description: string;
  defaultValue: string;
}>;

export type PropertyDefinition =
  | (PropertyDefinitionBase & Readonly<{ controlType: "slider"; config: SliderConfig }>)
  | (PropertyDefinitionBase & Readonly<{ controlType: "select"; config: SelectConfig }>)
  | (PropertyDefinitionBase & Readonly<{ controlType: "color" }>)
  | (PropertyDefinitionBase & Readonly<{ controlType: "text" }>)
  | (PropertyDefinitionBase & Readonly<{ controlType: "font-family" }>)
  | (PropertyDefinitionBase & Readonly<{ controlType: "multi-value"; config: MultiValueConfig }>)
  | (PropertyDefinitionBase & Readonly<{ controlType: "axis-slider-group"; config: AxisConfig }>);

export type PropertyCategory = Readonly<{
  id: string;
  label: string;
  description: string;
  properties: readonly PropertyDefinition[];
  defaultExpanded: boolean;
}>;
```

**src/shared/types/typography.test.ts**
```ts
import { describe, it, expect } from "vitest";
import type { PropertyDefinition, PropertyCategory } from "./typography";

describe("Typography 型定義", () => {
  it("slider 型の PropertyDefinition が正しく構成できる", () => {
    const prop: PropertyDefinition = {
      cssProperty: "font-size",
      label: "Font Size",
      description: "フォントサイズ",
      defaultValue: "16px",
      controlType: "slider",
      config: { min: 8, max: 120, step: 1, unit: "px" },
    };
    expect(prop.controlType).toBe("slider");
    expect(prop.config.min).toBe(8);
  });

  it("select 型の PropertyDefinition が正しく構成できる", () => {
    const prop: PropertyDefinition = {
      cssProperty: "font-style",
      label: "Font Style",
      description: "フォントスタイル",
      defaultValue: "normal",
      controlType: "select",
      config: {
        options: [
          { value: "normal", label: "Normal" },
          { value: "italic", label: "Italic" },
        ],
      },
    };
    expect(prop.controlType).toBe("select");
    expect(prop.config.options).toHaveLength(2);
  });

  it("PropertyCategory が正しく構成できる", () => {
    const category: PropertyCategory = {
      id: "basic-text",
      label: "Basic Text",
      description: "基本テキストプロパティ",
      properties: [],
      defaultExpanded: true,
    };
    expect(category.id).toBe("basic-text");
    expect(category.defaultExpanded).toBe(true);
  });
});
```

### 検証

- `pnpm vitest run src/shared/types/typography.test.ts` が通る

---

## Step 2-2: Basic Text プロパティ定義

### 要件

- Basic Text カテゴリの 9 プロパティを定義する（font-family は Phase 8 で追加）
- architecture.md のプロパティ表に沿った設定値を使用する
- TDD: 必須フィールドの存在、cssProperty の重複なしを検証

### 新規ファイル

| ファイル | 操作 |
|---|---|
| `src/shared/data/properties/basicText.ts` | 新規 — 9 プロパティ定義 |
| `src/shared/data/properties/basicText.test.ts` | 新規 — テスト |

### プロパティ一覧

| cssProperty | controlType | 設定 |
|---|---|---|
| `font-size` | slider | 8–120px, step 1, default "16px" |
| `font-weight` | slider | 100–900, step 100, unit "", default "400" |
| `font-style` | select | normal / italic / oblique, default "normal" |
| `line-height` | slider | 0.5–4, step 0.1, unit "", default "1.5" |
| `letter-spacing` | slider | -5–20px, step 0.5, default "0px" |
| `word-spacing` | slider | -5–30px, step 0.5, default "0px" |
| `text-align` | select | start / end / left / center / right / justify, default "start" |
| `text-indent` | slider | -50–100px, step 1, default "0px" |
| `color` | color | default "#000000" |

### コードスニペット

**src/shared/data/properties/basicText.ts**
```ts
import type { PropertyDefinition } from "../../types/typography";

export const basicTextProperties: readonly PropertyDefinition[] = [
  {
    cssProperty: "font-size",
    label: "Font Size",
    description: "テキストのフォントサイズを設定します",
    defaultValue: "16px",
    controlType: "slider",
    config: { min: 8, max: 120, step: 1, unit: "px" },
  },
  {
    cssProperty: "font-weight",
    label: "Font Weight",
    description: "フォントの太さを設定します",
    defaultValue: "400",
    controlType: "slider",
    config: { min: 100, max: 900, step: 100, unit: "" },
  },
  // ... 残り 7 プロパティ
];
```

**src/shared/data/properties/basicText.test.ts**
```ts
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
```

### 検証

- `pnpm vitest run src/shared/data/properties/basicText.test.ts` が通る

---

## Step 2-3: カテゴリ組み立て

### 要件

- カテゴリ配列を定義し、Basic Text のみを含める
- Phase 7, 8 で残りカテゴリを順次追加する前提の構造にする
- TDD: カテゴリ配列の整合性テスト

### 新規ファイル

| ファイル | 操作 |
|---|---|
| `src/shared/data/categories.ts` | 新規 — カテゴリ配列 |
| `src/shared/data/categories.test.ts` | 新規 — テスト |

### コードスニペット

**src/shared/data/categories.ts**
```ts
import type { PropertyCategory } from "../types/typography";
import { basicTextProperties } from "./properties/basicText";

export const categories: readonly PropertyCategory[] = [
  {
    id: "basic-text",
    label: "Basic Text",
    description: "基本的なテキストプロパティ",
    properties: basicTextProperties,
    defaultExpanded: true,
  },
];
```

**src/shared/data/categories.test.ts**
```ts
import { describe, it, expect } from "vitest";
import { categories } from "./categories";

describe("categories", () => {
  it("少なくとも 1 カテゴリが存在する", () => {
    expect(categories.length).toBeGreaterThanOrEqual(1);
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
});
```

### 検証

- `pnpm vitest run src/shared/data/categories.test.ts` が通る

---

## 検証チェックリスト

Phase 2 完了時に以下をすべて確認する:

- [ ] `pnpm vitest run` — 全テスト pass（Phase 1 の App.test.tsx + Phase 2 の 3 テストファイル）
- [ ] `pnpm build` — 型エラーなくビルド完了
- [ ] `PropertyDefinition` が判別可能ユニオンで `controlType` ごとに型安全
- [ ] Basic Text の 9 プロパティが architecture.md の設定値と一致
- [ ] font-family は含まれていない（Phase 8 で追加予定）
- [ ] categories 配列に Basic Text カテゴリのみ含まれている

## 注意事項

- `type` + `Readonly<{}>` を使用する（`interface` は使わない）
- `export default` は使わない
- 配列は `readonly` 修飾子を付ける
- テスト名は日本語可
