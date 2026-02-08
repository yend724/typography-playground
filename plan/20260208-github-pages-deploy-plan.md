# GitHub Pages デプロイ（GitHub Actions 自動デプロイ）

## Context

Typography Playground を GitHub Pages で公開する。`main` ブランチへの push 時に GitHub Actions で自動ビルド＆デプロイする。

## 前提

- リポジトリ: `https://github.com/yend724/typography-playground`
- 公開 URL: `https://yend724.github.io/typography-playground/`
- Vite の `base` 設定でサブパスに対応する必要がある
- GitHub Actions の `actions/deploy-pages` を使用する（`gh-pages` ブランチ方式ではない）

## 進捗

| Step | 内容 | 状態 |
|---|---|---|
| 1 | `vite.config.ts` に `base` を追加 | pending |
| 2 | GitHub Actions ワークフローファイルを作成 | pending |
| 3 | ビルド動作確認 | pending |
| 4 | GitHub リポジトリ設定の案内 | pending |

---

## Step 1: `vite.config.ts` に `base` を追加

### 要件

- GitHub Pages のサブパス（`/typography-playground/`）でアセットが正しく読み込まれるように `base` を設定する

### 変更ファイル

| ファイル | 操作 |
|---|---|
| `vite.config.ts` | 変更 — `base` 追加 |

### コードスニペット

**vite.config.ts**
```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/typography-playground/",
  plugins: [react(), tailwindcss()],
});
```

### 検証

- `pnpm build` がエラーなく完了する
- `dist/index.html` 内のアセットパスが `/typography-playground/` で始まっている

---

## Step 2: GitHub Actions ワークフローファイルを作成

### 要件

- `main` ブランチへの push 時に自動でビルド＆デプロイする
- pnpm を使用する
- GitHub Pages の公式推奨方式（`actions/deploy-pages`）を使用する

### 新規ファイル

| ファイル | 操作 |
|---|---|
| `.github/workflows/deploy.yml` | 新規 |

### コードスニペット

**.github/workflows/deploy.yml**
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm

      - run: pnpm install --frozen-lockfile

      - run: pnpm build

      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

### 設計判断

- **`pnpm/action-setup@v4`**: `packageManager` フィールドが `package.json` になくても `pnpm-lock.yaml` の存在から自動検出する
- **Node.js 22**: 現行 LTS
- **`--frozen-lockfile`**: CI ではロックファイルを変更しない
- **`workflow_dispatch`**: 手動トリガーも可能にする
- **`concurrency`**: 同時デプロイを防止する

---

## Step 3: ビルド動作確認

### 要件

- `base` 設定後にローカルビルドが正常に動作することを確認する

### 検証項目

```bash
pnpm build          # エラーなく完了する
pnpm preview        # ローカルプレビューで正しく表示される
```

---

## Step 4: GitHub リポジトリ設定の案内

### 要件

- GitHub Pages のソースを GitHub Actions に設定する手順をユーザーに案内する

### 手順

1. GitHub リポジトリの **Settings** > **Pages** を開く
2. **Source** を **GitHub Actions** に変更する
3. `main` ブランチに push すると自動でデプロイが実行される

---

## 検証チェックリスト

- [ ] `pnpm build` — エラーなく `dist/` にビルド出力される
- [ ] `dist/index.html` — アセットパスが `/typography-playground/` で始まっている
- [ ] `.github/workflows/deploy.yml` — ファイルが正しい場所に存在する
- [ ] GitHub リポジトリ Settings > Pages > Source が "GitHub Actions" になっている
- [ ] push 後に Actions タブでワークフローが成功する
- [ ] `https://yend724.github.io/typography-playground/` でアプリが表示される
