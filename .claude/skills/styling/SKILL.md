---
name: styling
description: スタイリング規約。Tailwind CSS v4 と inline styles の使い分け。 UI コンポーネントやプレビュー領域のスタイリング時に適用する。 Tailwind はアプリ UI に、inline styles はプレビュー領域に使い、混在させない。
---

# スタイリング規約

## 基本ルール：2つの領域を厳密に分離する

| 領域 | 手法 | 用途 |
|------|------|------|
| アプリ UI | Tailwind CSS v4 ユーティリティ | ヘッダー、コントロールパネル、ボタン、レイアウト |
| プレビュー領域 | inline styles (`React.CSSProperties`) | ユーザーが操作するタイポグラフィのプレビュー表示 |

**絶対に混在させない。** プレビュー領域に Tailwind を使わない。アプリ UI に inline styles を使わない。

## アプリ UI — Tailwind CSS v4

```tsx
// Good: Tailwind でアプリ UI
const ControlPanel = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <aside className="w-2/5 overflow-y-auto border-r border-gray-200 p-4">
    {children}
  </aside>
)

const Button = ({ label, onClick }: Readonly<{ label: string; onClick: () => void }>) => (
  <button
    type="button"
    className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
    onClick={onClick}
  >
    {label}
  </button>
)
```

### Tailwind のルール

- ユーティリティクラスを直接使う（`@apply` は避ける）
- レスポンシブは Tailwind のブレークポイント（`md:`, `lg:`）
- ダークモードは `dark:` プレフィックス
- カスタム値は `[]` 記法: `text-[14px]`

## プレビュー領域 — inline styles

```tsx
// Good: inline styles でプレビュー
type PreviewTextProps = Readonly<{
  text: string
  appliedStyles: React.CSSProperties
}>

const PreviewText = ({ text, appliedStyles }: PreviewTextProps) => (
  <div className="flex-1 p-6">  {/* レイアウトだけ Tailwind OK */}
    <p style={appliedStyles}>    {/* タイポグラフィは inline styles */}
      {text}
    </p>
  </div>
)
```

### プレビュー領域での例外

プレビュー領域のコンテナ（レイアウト、パディング、背景色の切り替え等）には Tailwind を使ってよい。**ユーザーが操作する CSS プロパティ**のみ `style` 属性で適用する。

## 禁止パターン

```tsx
// Bad: プレビューテキストに Tailwind を使っている
<p className="text-lg font-bold leading-relaxed">{text}</p>

// Bad: アプリ UI に inline styles を使っている
<button style={{ backgroundColor: '#3b82f6', padding: '6px 12px' }}>Save</button>

// Bad: @apply で Tailwind を CSS に変換している
// .btn { @apply rounded bg-blue-600 px-3 py-1.5; }
```

## 判断基準

迷ったら：
- 「この値はユーザーがコントロールパネルから変更するか？」→ **はい** → inline styles
- 「アプリの見た目・レイアウトの一部か？」→ **はい** → Tailwind
