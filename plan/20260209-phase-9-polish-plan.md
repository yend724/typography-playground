# Phase 9: 仕上げ 実装プラン

## Context

Phase 8 までで全 40 プロパティが完動し、CSS 値サニタイズも実装済み。Phase 9 では localStorage 永続化とアクセシビリティ改善を行い、プロダクション品質に仕上げる。

## 前提

- Phase 8 完了（4 カテゴリ / 40 プロパティが動作）
- 状態管理: `useReducer` + `Context`（`SET_PROPERTY`, `RESET_PROPERTY`, `RESET_ALL`）
- レスポンシブ: モバイル（タブ切替）/ デスクトップ（左右分割）は実装済み

## 進捗

| Step | 内容 | 状態 |
|---|---|---|
| 9-1 | localStorage 永続化 | done |
| 9-2 | アクセシビリティ | done |
| 9-3 | 最終動作確認 | done |

---

## Step 9-1: localStorage 永続化

### 要件

- ページリロード後にプロパティ値を復元する
- 状態変更時に自動保存（デバウンス付き）
- `RESET_ALL` 時は localStorage もクリア
- localStorage が無効・満杯でもクラッシュしない
- TDD: 保存・復元・クリアの検証

### 新規ファイル

| ファイル | 操作 |
|---|---|
| `src/shared/hooks/useLocalStorage.test.ts` | 新規 — テスト |
| `src/shared/hooks/useLocalStorage.ts` | 新規 — 実装 |

### 変更ファイル

| ファイル | 操作 |
|---|---|
| `src/shared/hooks/useTypographyState.tsx` | 変更 — localStorage 連携追加 |
| `src/shared/hooks/useTypographyState.test.tsx` | 変更 — localStorage 関連テスト追加 |

### 設計

```ts
const STORAGE_KEY = "typography-playground:state";

// localStorage ヘルパー
const loadState = (): TypographyState | null;
const saveState = (state: TypographyState): void;
const clearState = (): void;
```

**統合方法**: `TypographyProvider` 内で:
- 初期値: `loadState() ?? defaultState` を `useReducer` の初期値に渡す
- 保存: `useEffect` で state 変更を検知し、デバウンス付きで `saveState` を呼ぶ
- クリア: `RESET_ALL` dispatch 時に `clearState` も呼ぶ

### テスト観点

- `saveState` → `loadState` で値が往復する
- `clearState` 後は `loadState` が `null` を返す
- localStorage 無効時（`setItem` が例外）でもエラーにならない
- 不正な JSON が保存されていても `null` を返す
- Provider マウント時に localStorage から復元される
- プロパティ変更 → localStorage に保存される
- `RESET_ALL` → localStorage がクリアされる

---

## Step 9-2: アクセシビリティ

### 要件

- 入力コンポーネントに適切な `aria-label` を付与
- モバイルタブに `role="tablist"` / `role="tab"` / `aria-selected` を付与

### 変更ファイル

| ファイル | 操作 |
|---|---|
| `src/features/controls/PropertyControl.tsx` | 変更 — `label` prop を各 input に渡す |
| `src/features/controls/inputs/SliderInput.tsx` | 変更 — `aria-label` 追加 |
| `src/features/controls/inputs/SelectInput.tsx` | 変更 — `aria-label` 追加 |
| `src/features/controls/inputs/TextInput.tsx` | 変更 — `aria-label` 追加 |
| `src/features/controls/inputs/ColorInput.tsx` | 変更 — `aria-label` 改善 |
| `src/features/controls/inputs/AxisSliderGroup.tsx` | 変更 — `aria-label` 追加 |
| `src/views/PlaygroundView.tsx` | 変更 — タブの ARIA ロール追加 |

### 具体的な変更

**入力コンポーネントの aria-label**:
- `SliderInput`: range に `aria-label={label}`, number に `aria-label={`${label} value`}`
- `SelectInput`: select に `aria-label={label}`
- `TextInput`: input に `aria-label={label}`
- `ColorInput`: color input に `aria-label={`${label} color picker`}`
- `AxisSliderGroup`: 各軸に `aria-label={axisName}`, number に `aria-label={`${axisName} value`}`

**モバイルタブ**:
```tsx
<nav role="tablist" aria-label="Panel switcher" className="...">
  <button role="tab" aria-selected={activeTab === "controls"} ...>Controls</button>
  <button role="tab" aria-selected={activeTab === "preview"} ...>Preview</button>
</nav>
```

---

## Step 9-3: 最終動作確認

### 検証項目

- `pnpm vitest run` — 全テスト pass
- `pnpm build` — 型エラーなくビルド完了
- ブラウザ確認:
  - プロパティ操作 → プレビュー反映
  - ページリロード → 状態復元
  - Reset All → デフォルト状態 + localStorage クリア
  - モバイル表示（タブ切替、レイアウト）
  - CSS 出力が正しい
  - 全 40 プロパティが完全動作

---

## ファイルまとめ

### 新規ファイル

| ファイル | Step |
|---|---|
| `src/shared/hooks/useLocalStorage.test.ts` | 9-1 |
| `src/shared/hooks/useLocalStorage.ts` | 9-1 |

### 変更ファイル

| ファイル | Step |
|---|---|
| `src/shared/hooks/useTypographyState.tsx` | 9-1 |
| `src/shared/hooks/useTypographyState.test.tsx` | 9-1 |
| `src/views/PlaygroundView.tsx` | 9-2 |
| `src/features/controls/PropertyControl.tsx` | 9-2 |
| `src/features/controls/inputs/SliderInput.tsx` | 9-2 |
| `src/features/controls/inputs/SelectInput.tsx` | 9-2 |
| `src/features/controls/inputs/TextInput.tsx` | 9-2 |
| `src/features/controls/inputs/ColorInput.tsx` | 9-2 |
| `src/features/controls/inputs/AxisSliderGroup.tsx` | 9-2 |

---

## 注意事項

- スタイリングは Tailwind CSS を使用（アプリ UI）
- `handle` prefix でイベントハンドラ、`on` prefix でコールバック props
- named export のみ、アロー関数コンポーネント
- TDD: Red → Green → Refactor のサイクル厳守
- localStorage のエラーハンドリングは `try/catch` で安全に処理
