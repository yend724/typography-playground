# コーディング規約

## ディレクトリ構成ルール

| ディレクトリ        | 役割               | 配置基準                                     |
| ------------------- | ------------------ | -------------------------------------------- |
| `src/shared/`       | グローバル共有項目 | 複数 feature / view から参照されるもの       |
| `src/shared/types/` | 型定義             | アプリ全体で使う型                           |
| `src/shared/data/`  | 静的データ定義     | プロパティ定義、フォント一覧 等              |
| `src/shared/hooks/` | カスタムフック     | 状態管理、データ取得 等                      |
| `src/shared/utils/` | ユーティリティ関数 | 純粋関数、ヘルパー                           |
| `src/shared/ui/`    | 汎用UIパーツ       | Tooltip, CopyButton 等どこからでも使える部品 |
| `src/features/`     | 機能単位モジュール | 特定のドメイン機能に閉じたコンポーネント群   |
| `src/views/`        | ページ単位         | features を組み立ててページを構成            |

## インポート方針

- `shared/` は `features/` と `views/` からインポート可
- `features/` は `shared/` からインポート可。他の `features/` からは原則インポートしない
- `views/` は `shared/` と `features/` からインポート可
- 循環参照を避けること

```
views/ → features/ → shared/
  └──────────────────→ shared/
```

## コンポーネント

- 関数コンポーネント + hooks で統一
- `export default` は使わない。named export を使う
- Props の型は同一ファイル内で `interface` として定義

## 状態管理

- `useReducer` + React Context を使用
- 外部状態管理ライブラリは導入しない
- Context は `shared/hooks/` に配置

## スタイリング

- アプリUI: **Tailwind CSS v4** のユーティリティクラス
- プレビュー領域: **インラインスタイル** (`React.CSSProperties`) で動的CSS適用
- Tailwind とインラインスタイルを混在させない（役割で分離）

## テスト

### テスト駆動開発 (TDD)

- **Red → Green → Refactor** のサイクルで開発する
  1. **Red**: 失敗するテストを先に書く
  2. **Green**: テストが通る最小限の実装を書く
  3. **Refactor**: テストを維持しながらコードを整理する

### テストフレームワーク

- **Vitest** を使用 (Vite ネイティブ対応)
- コンポーネントテストには **@testing-library/react** + **jsdom** を使用

### テストファイル配置

- テスト対象ファイルと同階層に `.test.ts(x)` を並列配置

```
shared/
├── utils/
│   ├── css.ts
│   └── css.test.ts
├── hooks/
│   ├── useTypographyState.ts
│   └── useTypographyState.test.tsx
features/
├── controls/
│   ├── inputs/
│   │   ├── SliderInput.tsx
│   │   └── SliderInput.test.tsx
```

### テスト対象と方針

| 対象                        | テスト内容                                             | 優先度 |
| --------------------------- | ------------------------------------------------------ | ------ |
| `shared/utils/`             | 純粋関数の入出力                                       | 必須   |
| `shared/hooks/`             | Reducer ロジック、状態変更、算出値                     | 必須   |
| `shared/data/`              | プロパティ定義の整合性 (重複なし、必須フィールド)      | 必須   |
| `features/controls/inputs/` | ユーザー操作 → onChange コールバック                   | 必須   |
| `features/controls/`        | PropertyControl のディスパッチ、CategorySection の開閉 | 推奨   |
| `features/preview/`         | appliedStyles の適用、CSS出力の正確性                  | 推奨   |
| `views/`                    | 結合レベルのスモークテスト                             | 任意   |

### テストの書き方

- テストは **振る舞い** を検証する (実装詳細に依存しない)
- `describe` / `it` でグルーピングし、テスト名は日本語可
- コンポーネントテストでは DOM クエリに `getByRole`, `getByLabelText` を優先

```typescript
// 良い例: 振る舞いをテスト
it("font-size を変更すると appliedStyles に反映される", () => { ... })

// 悪い例: 実装詳細をテスト
it("dispatch が SET_PROPERTY アクションで呼ばれる", () => { ... })
```

## TypeScript

- `strict: true`
- `any` は使用しない
- グローバルな型定義は `shared/types/` に集約

## 命名規則

| 対象              | 規則                                              | 例                      |
| ----------------- | ------------------------------------------------- | ----------------------- |
| コンポーネント    | PascalCase                                        | `SliderInput.tsx`       |
| hooks             | camelCase, `use` プレフィクス                     | `useTypographyState.ts` |
| ユーティリティ    | camelCase                                         | `css.ts`                |
| 型 / interface    | PascalCase                                        | `PropertyDefinition`    |
| CSSプロパティキー | kebab-case (CSS準拠)                              | `font-size`             |
| ファイル名        | コンポーネントは PascalCase、それ以外は camelCase |                         |
