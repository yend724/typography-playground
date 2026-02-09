# CLAUDE.md

このファイルは Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイドラインを提供する。

## プロジェクト概要

Typography Playground — CSS タイポグラフィプロパティをリアルタイムプレビューで対話的に探索するブラウザベースツール。Vite + React (TypeScript) + Tailwind CSS v4 で構築。

## パッケージマネージャー

pnpm を使用する。npm / yarn は使わない。

## コマンド

```bash
pnpm dev             # 開発サーバー起動
pnpm build           # プロダクションビルド
pnpm preview         # プロダクションビルドのプレビュー
pnpm vitest          # 全テスト実行（watchモード）
pnpm vitest run      # テスト一回実行
pnpm vitest <path>   # 単一テストファイル実行
```

## アーキテクチャ

詳細は `docs/architecture.md` を参照。要点：

**データ駆動設計**: 各 CSS プロパティは `shared/data/properties/` 内の `PropertyDefinition` オブジェクト。`PropertyControl` が `controlType`（slider, select, color, text, multi-value, axis-slider-group）に応じて適切な入力コンポーネントにディスパッチする。

**データフロー**: `useTypographyState`（useReducer + Context）が全プロパティ値を `Record<string, string | undefined>` として保持。コントロールは `setProperty()` で書き込み、プレビューは `appliedStyles`（算出された `React.CSSProperties`）を読み取り、`useCSSOutput` が CSS 文字列を生成する。

**スタイリングの分離**: アプリ UI には Tailwind CSS、プレビュー領域には inline styles（`React.CSSProperties`）を使用。両者を混在させない。

## ディレクトリ構成

```
src/shared/     → 型、データ、hooks、utils、再利用可能 UI（Tooltip, CopyButton）
src/features/   → ドメインモジュール（controls/, preview/）
src/views/      → ページレベルコンポーネント（PlaygroundView）
```

**import ルール**: `docs/architecture.md` の「import ルール」セクションを参照。

## コーディング規約

詳細は各 skill を参照。コーディング規約は `docs/coding-guidelines.md` にもまとめてある。

| skill | 内容 |
|-------|------|
| `typescript-conventions` | 関数型 TS 規約（アロー関数、`type` + `Readonly`、ユニオン型、`any` 禁止） |
| `react` | React / Next.js 規約（アロー関数コンポーネント、Props 分割代入、不変 state） |
| `styling` | Tailwind CSS v4（アプリ UI）と inline styles（プレビュー領域）の使い分け |
| `testing` | Vitest + Testing Library 規約（振る舞いテスト、モック最小限） |
| `tdd` | TDD ワークフロー（Red → Green → Refactor） |
| `validation` | Zod + neverthrow による入力バリデーション |
| `commit-conventions` | Conventional Commits 形式（日本語） |
| `review` | コミット前のセルフレビュー |

## 実装計画

詳細は `plan/20260208-master-plan.md` の 9 フェーズ段階的計画を参照。

**Phase 単位の確認ルール**: 実装は必ず Phase 単位で進める。各 Phase の全 Step を完了したら、次の Phase に進む前にユーザーに確認を取ること。確認なしに次の Phase へ進んではならない。

## ナレッジの蓄積

同じやり取りの繰り返しや、汎用的に適用すべきルール・パターンを発見した場合は、都度適切な場所に記録すること。再度指示を受けるのを待たず、自律的に判断して書き込む。記録すべきか判断に迷った場合はユーザーに確認する。

| 記録先 | 用途 |
|--------|------|
| `CLAUDE.md` | プロジェクト全体に関わるルール・方針の追加・更新 |
| `.claude/skills/` | コーディング規約・ワークフローなど再利用可能なスキル定義 |
| `.claude/rules/` | 自動適用されるルール（ファイルパターン別トリガーなど） |
| `docs/` | アーキテクチャ・設計判断・ガイドラインの詳細ドキュメント |
| `.claude/commands/` | カスタムスラッシュコマンド（定型ワークフローの自動化） |
| `.claude/agents/` | カスタムサブエージェント（専門タスク特化） |
| `plan/` | Phase ごとの実装計画 |
