# Phase 6: プレビュー機能 実装プラン

## Context

Phase 5 まで完了し、コントロールパネル（左パネル）で Basic Text の 9 プロパティを操作可能な状態。しかし右パネル（PreviewPanel）はプレースホルダーのみで、操作結果を確認できない。Phase 6 でプレビュー表示・CSS 出力・コピー機能を実装し、ツールとして実用可能な状態にする。

## 実装順序

TDD（Red → Green → Refactor）で各 Step を順に進める。

### Step 6-1: 汎用 UI パーツ

**新規作成:**
- `src/shared/ui/Tooltip.tsx` + `Tooltip.test.tsx`
- `src/shared/ui/CopyButton.tsx` + `CopyButton.test.tsx`

**Tooltip** — ホバーでテキスト表示。Props: `{ text: string; children: ReactNode }`。ローカル state `isVisible` で表示切替。

**CopyButton** — クリックで `navigator.clipboard.writeText` を呼び、2 秒間 "Copied!" 表示。Props: `{ text: string; label?: string }`。

### Step 6-2: PreviewText

**新規作成:** `src/features/preview/PreviewText.tsx` + `PreviewText.test.tsx`

Props: `{ text: string; appliedStyles: React.CSSProperties }`（Context 依存なし、props 駆動）。`style={appliedStyles}` でインラインスタイル適用。デフォルトテキストは英語パングラム + 日本語（いろは + 漢字）。

### Step 6-3: PreviewControls

**新規作成:** `src/features/preview/PreviewControls.tsx` + `PreviewControls.test.tsx`

Props: `{ previewText, onPreviewTextChange, backgroundMode, onBackgroundModeChange }`（Controlled Component）。textarea でテキスト編集、Light/Dark ボタンで背景切替。`BackgroundMode` 型もここから export。

### Step 6-4: CSSOutput

**新規作成:** `src/features/preview/CSSOutput.tsx` + `CSSOutput.test.tsx`

Props: `{ cssText: string }`。`<pre><code>` で CSS 表示 + `CopyButton` でコピー。`useCSSOutput` の呼び出しは親（PreviewPanel）に委譲。

### Step 6-5: PreviewPanel 組み立て

**既存ファイル置き換え:** `src/features/preview/PreviewPanel.tsx`
**新規作成:** `src/features/preview/PreviewPanel.test.tsx`

ローカル state: `previewText`、`backgroundMode`。Context から `appliedStyles`、`useCSSOutput()` から `cssText` を取得し、子コンポーネントに配布。

```
PreviewPanel
├── PreviewControls（テキスト編集 + 背景切替）
├── PreviewText（appliedStyles 適用）
└── CSSOutput（CSS 表示 + コピー）
```

### Step 6-6: 動作確認

`pnpm vitest run` で全テスト通過 → `pnpm dev` でブラウザ確認。

## 主要な既存ファイル（変更不要、参照のみ）

- `src/shared/hooks/useTypographyState.tsx` — `appliedStyles` 提供
- `src/shared/hooks/useCSSOutput.ts` — CSS 文字列生成
- `src/shared/utils/css.ts` — `buildAppliedStyles()`

## 設計方針

- **PreviewText, CSSOutput は props 駆動** — Context 依存は PreviewPanel に集約。テスタビリティ向上
- **スタイリング分離** — プレビューテキストは `style={}` のみ。コンテナの Tailwind クラスは Typography プロパティと無関係なレイアウト用途のみ
- **`BackgroundMode` 型は `features/preview/` 内に閉じる** — `shared/types/` に置かない

## 検証方法

1. `pnpm vitest run` — 新規 6 テストファイル + 既存テスト全通過
2. `pnpm dev` — コントロール操作 → プレビュー即時反映、CSS 出力正常、コピー動作確認
