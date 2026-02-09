# Phase 8: font-family 追加 実装プラン

## Context

Phase 7 までで 4 カテゴリ 39 プロパティが完動しているが、`font-family` だけが未実装。Phase 8 で font-family プロパティをテキスト入力として追加し、全 40 プロパティを操作可能にする。

## 方針

font-family はテキスト入力 (`controlType: "text"`) で CSS font-family 値を自由に設定する。ローカルフォント（システムフォント）も含め任意の値を入力可能。

## 進捗

| Step | 内容 | 状態 |
|---|---|---|
| 8-1 | font-family プロパティ定義追加 | done |
| 8-2 | 動作確認 | done |

---

## Step 8-1: font-family プロパティ定義追加

### 変更ファイル

| ファイル | 操作 |
|---|---|
| `src/shared/data/properties/font.ts` | 変更 — font-family 定義追加 |

### プロパティ定義

```ts
{
  cssProperty: "font-family",
  label: "Font Family",
  description: "フォントファミリーを設定します",
  defaultValue: "system-ui, sans-serif",
  controlType: "text",
}
```

---

## Step 8-2: 動作確認

### 検証項目

- `pnpm vitest run` — 全テスト pass
- `pnpm build` — 型エラーなくビルド完了
- テキスト入力で font-family 値を変更 → プレビュー反映
- CSS 出力に font-family が正しく出力される
- 全 40 プロパティが完全動作
