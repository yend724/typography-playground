---
name: tdd
description: >
  TDD（テスト駆動開発）のワークフロー。
  新機能やバグ修正の実装時に適用する。
  Red → Green → Refactor のサイクルを必ず守る。
---

# TDD ワークフロー

## サイクル: Red → Green → Refactor

### 1. Red — 失敗するテストを先に書く

実装より先にテストを書く。テストが失敗することを確認する。

```ts
// まずテストを書く
describe("buildAppliedStyles", () => {
  it("kebab-case の CSS プロパティを camelCase に変換して返す", () => {
    const result = buildAppliedStyles({ "font-size": "16px", "line-height": "1.5" })
    expect(result).toEqual({ fontSize: "16px", lineHeight: "1.5" })
  })

  it("undefined の値を除外する", () => {
    const result = buildAppliedStyles({ "font-size": "16px", color: undefined })
    expect(result).toEqual({ fontSize: "16px" })
  })
})
```

```bash
npx vitest run src/shared/utils/css.test.ts  # → FAIL（まだ実装がない）
```

### 2. Green — テストを通す最小限の実装

テストを通すためだけのコードを書く。完璧を目指さない。

```ts
export const buildAppliedStyles = (
  properties: Readonly<Record<string, string | undefined>>,
): React.CSSProperties => {
  const styles: Record<string, string> = {}
  for (const [key, value] of Object.entries(properties)) {
    if (value !== undefined) {
      styles[kebabToCamel(key)] = value
    }
  }
  return styles
}
```

```bash
npx vitest run src/shared/utils/css.test.ts  # → PASS
```

### 3. Refactor — テストが通ったままリファクタリング

テストが緑のまま、コードを改善する。

```ts
export const buildAppliedStyles = (
  properties: Readonly<Record<string, string | undefined>>,
): React.CSSProperties =>
  Object.entries(properties).reduce<Record<string, string>>(
    (acc, [key, value]) => (value !== undefined ? { ...acc, [kebabToCamel(key)]: value } : acc),
    {},
  )
```

```bash
npx vitest run src/shared/utils/css.test.ts  # → まだ PASS
```

## テスト粒度の指針

| 種類 | 何をテストするか | 例 |
|------|----------------|-----|
| ユーティリティ関数 | 入出力 | `kebabToCamel`, `buildAppliedStyles` |
| カスタム hooks | 状態遷移 | `useTypographyState` の dispatch 結果 |
| コンポーネント | ユーザー操作 → UI 変化 | スライダー操作 → プレビュー更新 |
| データ定義 | 構造の整合性 | 全 PropertyDefinition が必須フィールドを持つか |

## 守ること

- **テストなしにコードを書かない** — 先にテスト、次に実装
- **一度に1つ** — 1テスト書く → 通す → 次のテストへ
- **Green を壊さない** — リファクタリング中にテストが落ちたら即戻す
- **テスト名は振る舞いを書く** — 「〜した時に〜を返す」「〜の場合〜になる」

## コマンド

```bash
npx vitest              # ウォッチモード（開発中はこれ）
npx vitest run          # 全テスト1回実行
npx vitest <path>       # 特定ファイルのみ
```
