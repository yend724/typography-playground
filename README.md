# Typography Playground

CSS タイポグラフィプロパティをリアルタイムプレビューで対話的に探索できるブラウザベースツール。

![Typography Playground](public/ogp.png)

**Demo**: https://yend724.github.io/typography-playground/

## 機能

- **40 種類の CSS プロパティ** を CSS 仕様ベースの 4 カテゴリに分類してインタラクティブに操作
  - CSS Fonts (font-family, font-size, font-weight, font-variation-settings など 12 種)
  - CSS Text (color, line-height, text-align, text-transform など 17 種)
  - CSS Text Decoration (text-decoration-line, text-shadow など 7 種)
  - CSS Writing Modes (writing-mode, direction など 3 種)
- **リアルタイムプレビュー** でスタイル変更を即座に確認
- **CSS 出力** で変更したプロパティのコードをワンクリックコピー
- **レスポンシブ対応** でモバイルでもタブ切り替えで操作可能

## 技術スタック

- [Vite](https://vite.dev/) + [React](https://react.dev/) (TypeScript)
- [Tailwind CSS](https://tailwindcss.com/) v4
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/)

## セットアップ

```bash
# 依存のインストール
pnpm install

# 開発サーバー起動
pnpm dev

# テスト実行
pnpm vitest run

# プロダクションビルド
pnpm build
```

## ライセンス

MIT
