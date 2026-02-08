# Phase 1: プロジェクト初期化

## Context

Typography Playground の土台を構築する。Vite + React + TypeScript + Tailwind CSS v4 + Vitest の開発環境をセットアップし、ディレクトリ構造を作成する。

## 前提

- なし（最初の Phase）
- pnpm を使用する（npm / yarn は使わない）

## 進捗

| Step | 内容 | 状態 |
|---|---|---|
| 1-1 | Vite + React + TypeScript テンプレート初期化 | done |
| 1-2 | Tailwind CSS v4 導入 | done |
| 1-3 | Vitest + Testing Library 導入 | done |
| 1-4 | 不要ファイル削除 + App.tsx 最小化 | done |
| 1-5 | ディレクトリ構造作成 | done |
| 1-6 | 動作確認 | done |

---

## Step 1-1: Vite + React + TypeScript テンプレートで初期化

### 要件

- Vite の React + TypeScript テンプレートでプロジェクトをスキャフォールドする
- pnpm で依存パッケージをインストールする

### 手順

```bash
pnpm create vite@latest . --template react-ts
pnpm install
```

### 検証

- `pnpm dev` でデフォルトの Vite + React 画面がブラウザに表示される

---

## Step 1-2: Tailwind CSS v4 導入

### 要件

- Tailwind CSS v4 を Vite プラグインとして導入する
- CSS ファイルを Tailwind v4 の `@import` 形式に書き換える

### 新規/変更ファイル

| ファイル | 操作 |
|---|---|
| `vite.config.ts` | 変更 — Tailwind プラグイン追加 |
| `src/index.css` | 変更 — Tailwind v4 の import 形式に置換 |

### 手順

```bash
pnpm add tailwindcss @tailwindcss/vite
```

### コードスニペット

**vite.config.ts**
```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

**src/index.css**
```css
@import "tailwindcss";
```

### 検証

- `pnpm dev` でエラーなく起動する
- 任意の要素に `className="text-red-500"` を付けて色が反映される

---

## Step 1-3: Vitest + Testing Library 導入

### 要件

- Vitest をテストランナーとして導入する
- @testing-library/react + jsdom でコンポーネントテストができる環境を整える
- テストセットアップファイルで jest-dom のマッチャーを有効にする
- package.json にテストスクリプトを追加する

### 新規/変更ファイル

| ファイル | 操作 |
|---|---|
| `vitest.config.ts` | 新規 |
| `src/test/setup.ts` | 新規 |
| `package.json` | 変更 — scripts に `"test": "vitest"` 追加 |

### 手順

```bash
pnpm add -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

### コードスニペット

**vitest.config.ts**
```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
  },
});
```

**src/test/setup.ts**
```ts
import "@testing-library/jest-dom/vitest";
```

**package.json** (scripts に追加)
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest"
  }
}
```

### 検証

- `pnpm vitest run` でテストランナーが起動し "no test files found" 等のメッセージが出る（テストファイル未作成のため正常）

---

## Step 1-4: 不要ファイル削除 + App.tsx 最小化

### 要件

- Vite テンプレートの不要ファイルを削除する
- App.tsx を最小構成に書き換える
- サンプルテスト (App.test.tsx) を作成してテスト基盤の動作を確認する

### 削除ファイル

| ファイル | 操作 |
|---|---|
| `src/App.css` | 削除 |
| `src/assets/react.svg` | 削除 |
| `public/vite.svg` | 削除 |

### 変更ファイル

| ファイル | 操作 |
|---|---|
| `src/App.tsx` | 変更 — 最小構成に書き換え |

### 新規ファイル

| ファイル | 操作 |
|---|---|
| `src/App.test.tsx` | 新規 — テスト基盤の動作確認用 |

### コードスニペット

**src/App.tsx**
```tsx
export const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold p-4">Typography Playground</h1>
    </div>
  );
};
```

**src/main.tsx**
```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

**src/App.test.tsx**
```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { App } from "./App";

describe("App", () => {
  it("タイトルが表示される", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: /typography playground/i })
    ).toBeInTheDocument();
  });
});
```

### 検証

- `pnpm vitest run` で App.test.tsx が通る
- `pnpm dev` で "Typography Playground" が表示される

---

## Step 1-5: ディレクトリ構造作成

### 要件

- architecture.md に記載されたディレクトリ構造を作成する
- 各ディレクトリに `.gitkeep` を置いて Git 追跡可能にする

### 作成ディレクトリ

```
src/
├── shared/
│   ├── types/
│   ├── data/
│   │   └── properties/
│   ├── hooks/
│   ├── utils/
│   └── ui/
├── features/
│   ├── controls/
│   │   └── inputs/
│   └── preview/
└── views/
```

### 手順

```bash
mkdir -p src/shared/types
mkdir -p src/shared/data/properties
mkdir -p src/shared/hooks
mkdir -p src/shared/utils
mkdir -p src/shared/ui
mkdir -p src/features/controls/inputs
mkdir -p src/features/preview
mkdir -p src/views
```

各ディレクトリに `.gitkeep` を配置する。

### 検証

- ディレクトリが正しく存在することを `ls -R src/` で確認

---

## Step 1-6: 動作確認

### 要件

- dev サーバー、テスト、ビルドの 3 つが正常に動作することを確認する

### 検証項目

```bash
pnpm dev          # ブラウザで "Typography Playground" が表示される
pnpm vitest run   # App.test.tsx が通る
pnpm build        # エラーなくビルドが完了する
```

---

## 検証チェックリスト

Phase 1 完了時に以下をすべて確認する:

- [ ] `pnpm dev` — ブラウザで "Typography Playground" が Tailwind スタイル付きで表示される
- [ ] `pnpm vitest run` — App.test.tsx が pass する
- [ ] `pnpm build` — エラーなく `dist/` にビルド出力される
- [ ] ディレクトリ構造が architecture.md の通りに作成されている
- [ ] 不要ファイル (App.css, assets/react.svg, public/vite.svg) が削除されている
- [ ] `src/App.tsx` が named export (`export const App`) を使用している
- [ ] `src/main.tsx` が `export default` でなく named import を使用している

## 注意事項

- パッケージマネージャは **pnpm** を使用する。`npm` / `yarn` は使わない
- `export default` は使わない。named export を使う
- アロー関数コンポーネントを使う（`function` 宣言は使わない）
- テスト名は日本語可
