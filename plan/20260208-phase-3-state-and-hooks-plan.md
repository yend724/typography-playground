# Phase 3: 状態管理とコアフック

## Context

CSS ユーティリティ関数、Typography 状態管理（useReducer + Context）、CSS 出力フックを実装する。Phase 5 でコントロールと結合するための状態管理基盤。

## 前提

- Phase 2 完了（型定義 + Basic Text プロパティデータ + categories 配列が存在する）

## 進捗

| Step | 内容 | 状態 |
|---|---|---|
| 3-1 | CSS ユーティリティ関数 | done |
| 3-2 | Typography 状態管理フック | done |
| 3-3 | CSS 出力フック | done |
| 3-4 | App.tsx に Provider 接続 | done |

---

## Step 3-1: CSS ユーティリティ関数

### 要件

- `cssPropertyToReact()`: CSS の kebab-case プロパティ名を React の camelCase に変換する
- `buildAppliedStyles()`: `Record<string, string | undefined>` の state と `categories` から `React.CSSProperties` を生成する
- TDD: 入出力の検証テストを先に書く

### 新規ファイル

| ファイル | 操作 |
|---|---|
| `src/shared/utils/css.test.ts` | 新規 — テスト |
| `src/shared/utils/css.ts` | 新規 — 実装 |

### コードスニペット

**src/shared/utils/css.test.ts**
```ts
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
    const state = { "font-size": "24px", "color": undefined };
    const result = buildAppliedStyles(state);
    expect(result).toEqual({ fontSize: "24px" });
  });

  it("空の state では空オブジェクトを返す", () => {
    const result = buildAppliedStyles({});
    expect(result).toEqual({});
  });
});
```

**src/shared/utils/css.ts**
```ts
import type React from "react";

export const cssPropertyToReact = (cssProperty: string): string =>
  cssProperty.replace(/-([a-z])/g, (_, char: string) => char.toUpperCase());

export const buildAppliedStyles = (
  state: Readonly<Record<string, string | undefined>>
): React.CSSProperties => {
  const styles: Record<string, string> = {};
  for (const [key, value] of Object.entries(state)) {
    if (value !== undefined) {
      styles[cssPropertyToReact(key)] = value;
    }
  }
  return styles;
};
```

### 検証

- `pnpm vitest run src/shared/utils/css.test.ts` が通る

---

## Step 3-2: Typography 状態管理フック

### 要件

- `useReducer` + React Context で状態管理
- State: `Record<string, string | undefined>`
- Actions: `SET_PROPERTY` / `RESET_PROPERTY` / `RESET_ALL` / `LOAD_PRESET`
- `TypographyProvider` コンポーネント + `useTypography()` フック
- `appliedStyles` を `useMemo` で算出
- TDD: Reducer ロジックと Context の統合テスト

### 新規ファイル

| ファイル | 操作 |
|---|---|
| `src/shared/hooks/useTypographyState.test.tsx` | 新規 — テスト |
| `src/shared/hooks/useTypographyState.ts` | 新規 — 実装 |

### 設計方針

- `categories` から全プロパティの `defaultValue` を収集して初期 state を構築する
- `setProperty(cssProperty, value)` / `resetProperty(cssProperty)` / `resetAll()` / `loadPreset(state)` を公開
- Provider 外で `useTypography()` を呼んだ場合はエラーにする

### コードスニペット

**テストの概要**
```ts
describe("useTypographyState", () => {
  it("初期状態でデフォルト値が設定されている")
  it("setProperty で値を変更できる")
  it("resetProperty でデフォルト値に戻る")
  it("resetAll で全プロパティがデフォルト値に戻る")
  it("appliedStyles が state から算出される")
});
```

**Reducer の型**
```ts
type TypographyState = Readonly<Record<string, string | undefined>>;

type TypographyAction =
  | Readonly<{ type: "SET_PROPERTY"; cssProperty: string; value: string }>
  | Readonly<{ type: "RESET_PROPERTY"; cssProperty: string }>
  | Readonly<{ type: "RESET_ALL" }>
  | Readonly<{ type: "LOAD_PRESET"; state: TypographyState }>;
```

### 検証

- `pnpm vitest run src/shared/hooks/useTypographyState.test.tsx` が通る

---

## Step 3-3: CSS 出力フック

### 要件

- `useCSSOutput()`: 現在の state からデフォルト値と異なるプロパティのみを CSS 文字列として生成する
- セレクタは `.my-text { ... }` 形式
- TDD: デフォルト値のみの場合と変更ありの場合を検証

### 新規ファイル

| ファイル | 操作 |
|---|---|
| `src/shared/hooks/useCSSOutput.test.tsx` | 新規 — テスト |
| `src/shared/hooks/useCSSOutput.ts` | 新規 — 実装 |

### コードスニペット

**テストの概要**
```ts
describe("useCSSOutput", () => {
  it("デフォルト値のみの場合は空の CSS ブロックを返す")
  it("変更されたプロパティのみ CSS に含まれる")
  it("CSS プロパティは kebab-case で出力される")
});
```

**出力例**
```css
.my-text {
  font-size: 24px;
  font-weight: 700;
}
```

### 検証

- `pnpm vitest run src/shared/hooks/useCSSOutput.test.tsx` が通る

---

## Step 3-4: App.tsx に Provider 接続

### 要件

- `TypographyProvider` で App 全体をラップする
- この時点ではまだ UI コンポーネントは無いが、Provider が正常に動作することを確認する

### 変更ファイル

| ファイル | 操作 |
|---|---|
| `src/App.tsx` | 変更 — TypographyProvider でラップ |

### コードスニペット

**src/App.tsx**
```tsx
import { TypographyProvider } from "./shared/hooks/useTypographyState";

export const App = () => {
  return (
    <TypographyProvider>
      <div className="min-h-screen bg-gray-50">
        <h1 className="text-2xl font-bold p-4">Typography Playground</h1>
      </div>
    </TypographyProvider>
  );
};
```

### 検証

- `pnpm vitest run` — 全テスト pass
- `pnpm build` — 型エラーなくビルド完了

---

## 検証チェックリスト

Phase 3 完了時に以下をすべて確認する:

- [ ] `pnpm vitest run` — 全テスト pass
- [ ] `pnpm build` — 型エラーなくビルド完了
- [ ] `cssPropertyToReact` が kebab-case → camelCase を正しく変換する
- [ ] `buildAppliedStyles` が undefined を除外して `React.CSSProperties` を返す
- [ ] `useTypography()` で state / setProperty / resetProperty / resetAll / appliedStyles にアクセスできる
- [ ] `useCSSOutput()` がデフォルト値と異なるプロパティのみ CSS 文字列を生成する
- [ ] `App.tsx` が `TypographyProvider` でラップされている

## 注意事項

- `useReducer` + Context を使用する（外部ライブラリは導入しない）
- Provider 外での `useTypography()` 呼び出しはエラーにする
- `appliedStyles` は `useMemo` で算出する
- Reducer は純粋関数にする（副作用なし）
