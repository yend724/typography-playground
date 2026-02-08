# Phase 4: レイアウトシェル

## Context

PlaygroundView（Header + 左右分割）、ControlPanel（左パネル）、PreviewPanel（右パネル）の骨組みを作成する。この Phase では中身はプレースホルダーで、Phase 5・6 で実際のコンポーネントを配置する。

## 前提

- Phase 3 完了（状態管理 + CSS ユーティリティ + Provider 接続済み）

## 進捗

| Step | 内容 | 状態 |
|---|---|---|
| 4-1 | PlaygroundView の作成 | done |
| 4-2 | ControlPanel コンテナ | done |
| 4-3 | PreviewPanel コンテナ | done |
| 4-4 | App.tsx で PlaygroundView を描画 | done |

---

## Step 4-1: PlaygroundView の作成

### 要件

- Header（タイトル + リセットボタン）を含むページレイアウト
- 左右分割レイアウト（Control 40% / Preview 60%）
- architecture.md のレイアウト図に沿った構造

### 新規ファイル

| ファイル | 操作 |
|---|---|
| `src/views/PlaygroundView.tsx` | 新規 |

### コードスニペット

```tsx
import { useTypography } from "../shared/hooks/useTypographyState";
import { ControlPanel } from "../features/controls/ControlPanel";
import { PreviewPanel } from "../features/preview/PreviewPanel";

export const PlaygroundView = () => {
  const { resetAll } = useTypography();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="...">
        <h1>Typography Playground</h1>
        <button onClick={resetAll}>Reset All</button>
      </header>

      {/* Main: 左右分割 */}
      <main className="flex flex-1 overflow-hidden">
        <div className="w-2/5 overflow-y-auto ...">
          <ControlPanel />
        </div>
        <div className="w-3/5 sticky top-0 ...">
          <PreviewPanel />
        </div>
      </main>
    </div>
  );
};
```

### 検証

- ブラウザで Header + 左右分割が表示される

---

## Step 4-2: ControlPanel コンテナ

### 要件

- スクロール可能な左パネル
- この時点ではプレースホルダーテキストを表示

### 新規ファイル

| ファイル | 操作 |
|---|---|
| `src/features/controls/ControlPanel.tsx` | 新規 |

### コードスニペット

```tsx
export const ControlPanel = () => {
  return (
    <div className="p-4">
      <p className="text-gray-500">Controls will be here</p>
    </div>
  );
};
```

---

## Step 4-3: PreviewPanel コンテナ

### 要件

- sticky 右パネル
- この時点ではプレースホルダーテキストを表示

### 新規ファイル

| ファイル | 操作 |
|---|---|
| `src/features/preview/PreviewPanel.tsx` | 新規 |

### コードスニペット

```tsx
export const PreviewPanel = () => {
  return (
    <div className="p-4">
      <p className="text-gray-500">Preview will be here</p>
    </div>
  );
};
```

---

## Step 4-4: App.tsx で PlaygroundView を描画

### 要件

- App.tsx の内容を PlaygroundView に置き換える
- TypographyProvider は維持

### 変更ファイル

| ファイル | 操作 |
|---|---|
| `src/App.tsx` | 変更 — PlaygroundView を描画 |
| `src/App.test.tsx` | 変更 — 新しい構造に合わせて更新 |

### 検証

- `pnpm vitest run` — 全テスト pass
- `pnpm build` — 型エラーなくビルド完了
- ブラウザで左右分割レイアウトが表示される

---

## 検証チェックリスト

Phase 4 完了時に以下をすべて確認する:

- [ ] `pnpm vitest run` — 全テスト pass
- [ ] `pnpm build` — 型エラーなくビルド完了
- [ ] Header にタイトルとリセットボタンが表示される
- [ ] 左右分割レイアウト（40% / 60%）が表示される
- [ ] 左パネル（ControlPanel）がスクロール可能
- [ ] 右パネル（PreviewPanel）が sticky

## 注意事項

- スタイリングは Tailwind CSS を使用（インラインスタイルはプレビュー領域のみ）
- named export を使用（export default は使わない）
- アロー関数コンポーネントを使用
