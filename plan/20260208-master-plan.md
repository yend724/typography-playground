# Typography Playground マスタープラン

作成日: 2026-02-08

## Context

CSSのTypographyプロパティは数が多く役割も複雑で把握が難しい。ブラウザ上でインタラクティブにプロパティを操作し、リアルタイムプレビューで効果を確認できるPlaygroundを構築する。

設計の詳細は以下を参照:
- [アーキテクチャ](../docs/architecture.md)
- [コーディング規約](../docs/coding-guidelines.md)

> **TDD方針**: 全フェーズを通じて Red → Green → Refactor で開発する。各Stepではテストを先に書き、テストが通る最小限の実装を書く。

---

## フェーズ一覧

| Phase | 内容 | 成果物 |
|---|---|---|
| **1** | プロジェクト初期化 | Vite + React + Tailwind v4 + Vitest 動作確認 |
| **2** | 型定義と CSS Fonts データ | `shared/types/`, `shared/data/properties/font.ts` |
| **3** | 状態管理とコアフック | `shared/hooks/`, `shared/utils/css.ts` |
| **4** | レイアウトシェル | `views/PlaygroundView.tsx` + Header |
| **5** | 入力コンポーネント群 | `features/controls/` (CSS Fonts 完動) |
| **6** | プレビュー | `features/preview/` 全コンポーネント |
| **7** | 残りのカテゴリ + 専用入力 | 全4カテゴリ (CSS Text, Text Decoration, Writing Modes) + MultiValueInput, AxisSliderGroup |
| **8** | font-family 追加 | font-family プロパティ定義 (テキスト入力) |
| **9** | 仕上げ | localStorage, プリセット, レスポンシブ, a11y |

---

## Phase 1: プロジェクト初期化

- [x] **Step 1-1**: Vite + React + TypeScript テンプレートで初期化
  - `npm create vite@latest -- --template react-ts`
- [x] **Step 1-2**: Tailwind CSS v4 導入
  - `npm install tailwindcss @tailwindcss/vite`
  - `vite.config.ts` に Tailwind プラグイン追加
  - `src/index.css` を `@import "tailwindcss";` に置換
- [x] **Step 1-3**: Vitest + Testing Library 導入
  - `npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom`
  - `vitest.config.ts` 作成 (environment: jsdom, setupFiles)
  - テストセットアップファイル作成 (`src/test/setup.ts`)
  - `package.json` に `"test": "vitest"` スクリプト追加
- [x] **Step 1-4**: 不要ファイル削除
  - `App.css`, デフォルトの `assets/` を削除
  - `App.tsx` を最小構成に書き換え
- [x] **Step 1-5**: ディレクトリ構造作成
  - `src/shared/types/`
  - `src/shared/data/properties/`
  - `src/shared/hooks/`
  - `src/shared/utils/`
  - `src/shared/ui/`
  - `src/features/controls/inputs/`
  - `src/features/preview/`
  - `src/views/`
- [x] **Step 1-6**: 動作確認
  - `npm run dev` でブラウザ表示を確認
  - `npx vitest run` でテスト実行基盤が動作することを確認

---

## Phase 2: 型定義と CSS Fonts データ

> Phase 5 時点で動作確認可能な CSS Fonts カテゴリのみ定義する。
> 残りのカテゴリ (CSS Text, Text Decoration, Writing Modes) は対応コンポーネントと同タイミングの Phase 7 で定義する。

- [x] **Step 2-1**: 型定義の作成
  - テスト: 型の構造検証 (`typography.test.ts`)
  - `shared/types/typography.ts`
  - ControlType, SliderConfig, SelectConfig, MultiValueConfig, AxisConfig
  - PropertyDefinition, PropertyCategory
- [x] **Step 2-2**: CSS Fonts プロパティ定義 (パターン確立)
  - テスト: 必須フィールドの存在、cssProperty の重複なし (`font.test.ts`)
  - `shared/data/properties/font.ts`
  - 11プロパティ: font-size, font-weight, font-style, font-stretch, font-size-adjust, font-kerning, font-optical-sizing, font-variant-caps, font-variant-numeric, font-feature-settings, font-variation-settings
  - ※ font-family は Phase 8 で追加
- [x] **Step 2-3**: カテゴリ組み立て
  - テスト: カテゴリ配列の整合性 (`categories.test.ts`)
  - `shared/data/categories.ts`
  - まず CSS Fonts のみ。Phase 7, 8 で順次追加

---

## Phase 3: 状態管理とコアフック

- [x] **Step 3-1**: CSSユーティリティ関数
  - テスト先行: `css.test.ts` — cssPropertyToReact, buildAppliedStyles の入出力検証
  - `shared/utils/css.ts`
  - `cssPropertyToReact()`: kebab-case → camelCase 変換
  - `buildAppliedStyles()`: state → React.CSSProperties 変換
- [x] **Step 3-2**: Typography状態管理フック
  - テスト先行: `useTypographyState.test.tsx` — SET_PROPERTY, RESET_PROPERTY, RESET_ALL, appliedStyles 算出
  - `shared/hooks/useTypographyState.ts`
  - Reducer: SET_PROPERTY / RESET_PROPERTY / RESET_ALL / LOAD_PRESET
  - Context Provider + useTypography() カスタムフック
  - `appliedStyles` を useMemo で算出
- [x] **Step 3-3**: CSS出力フック
  - テスト先行: `useCSSOutput.test.tsx` — デフォルト値のみの場合、変更ありの場合
  - `shared/hooks/useCSSOutput.ts`
  - デフォルト値と異なるプロパティのみCSS文字列を生成
- [x] **Step 3-4**: App.tsx にProvider接続
  - TypographyProvider で App 全体をラップ

---

## Phase 4: レイアウトシェル

- [x] **Step 4-1**: PlaygroundView の作成
  - `views/PlaygroundView.tsx`
  - Header (タイトル + リセットボタン)
  - 左右分割レイアウト (40% / 60%)
- [x] **Step 4-2**: ControlPanel コンテナ
  - `features/controls/ControlPanel.tsx`
  - スクロール可能な左パネル (プレースホルダー)
- [x] **Step 4-3**: PreviewPanel コンテナ
  - `features/preview/PreviewPanel.tsx`
  - sticky 右パネル (プレースホルダー)
- [x] **Step 4-4**: App.tsx で PlaygroundView を描画
  - ブラウザでレイアウト確認

---

## Phase 5: 入力コンポーネント群

- [x] **Step 5-1**: SliderInput
  - テスト先行: `SliderInput.test.tsx` — スライダー操作 → onChange コールバック
  - `features/controls/inputs/SliderInput.tsx`
  - range スライダー + number 入力 + 単位表示
- [x] **Step 5-2**: SelectInput
  - テスト先行: `SelectInput.test.tsx` — 選択変更 → onChange コールバック
  - `features/controls/inputs/SelectInput.tsx`
  - ドロップダウン選択
- [x] **Step 5-3**: ColorInput
  - テスト先行: `ColorInput.test.tsx` — 色変更 → onChange コールバック
  - `features/controls/inputs/ColorInput.tsx`
  - `<input type="color">` + HEX表示
- [x] **Step 5-4**: TextInput
  - テスト先行: `TextInput.test.tsx` — テキスト入力 → onChange コールバック
  - `features/controls/inputs/TextInput.tsx`
  - 自由テキスト入力
- [x] **Step 5-5**: PropertyLabel
  - `features/controls/PropertyLabel.tsx`
  - ラベル + 説明ツールチップ + リセットボタン
- [x] **Step 5-6**: PropertyControl (ディスパッチャー)
  - テスト先行: `PropertyControl.test.tsx` — controlType ごとに正しい入力コンポーネントを描画
  - `features/controls/PropertyControl.tsx`
  - controlType に応じて Step 5-1〜5-4 のコンポーネントを切り替え
- [x] **Step 5-7**: CategorySection
  - テスト先行: `CategorySection.test.tsx` — 折りたたみ開閉の振る舞い
  - `features/controls/CategorySection.tsx`
  - 折りたたみ開閉 + 変更数バッジ
- [x] **Step 5-8**: ControlPanel に接続
  - `features/controls/ControlPanel.tsx`
  - categories データから CategorySection を描画
- [x] **Step 5-9**: 動作確認
  - `npx vitest run` で全テスト通過を確認
  - CSS Fonts カテゴリの11プロパティ (font-family除く) が操作可能なことをブラウザで確認

---

## Phase 6: プレビュー

- [x] **Step 6-1**: 汎用UIパーツ
  - `shared/ui/CopyButton.tsx` — コピー + フィードバック表示
  - `shared/ui/Tooltip.tsx` — ホバーツールチップ
- [x] **Step 6-2**: PreviewText
  - テスト先行: `PreviewText.test.tsx` — appliedStyles がインラインスタイルとして適用されること
  - `features/preview/PreviewText.tsx`
  - デフォルトプレビューテキスト (英語 + 日本語)
- [x] **Step 6-3**: PreviewControls
  - `features/preview/PreviewControls.tsx`
  - プレビューテキスト編集 (textarea)
  - 背景色切替 (白 / ダーク)
- [x] **Step 6-4**: CSSOutput
  - テスト先行: `CSSOutput.test.tsx` — 変更済みプロパティのCSS表示が正しいこと
  - `features/preview/CSSOutput.tsx`
  - useCSSOutput から生成CSSを表示
  - CopyButton でクリップボードコピー
- [x] **Step 6-5**: PreviewPanel に組み立て
  - `features/preview/PreviewPanel.tsx`
  - PreviewControls + PreviewText + CSSOutput を配置
- [x] **Step 6-6**: 動作確認
  - `npx vitest run` で全テスト通過を確認
  - コントロール操作 → プレビュー即時反映をブラウザで確認
  - CSS出力が正しいことを確認
  - コピー機能が動作することを確認

---

## Phase 7: 残りのカテゴリ + 専用入力

> Phase 2 で CSS Fonts のみ定義していた。ここで残り3カテゴリの定義と、専用入力コンポーネントを同時に作成する。

- [x] **Step 7-1**: CSS Text プロパティ定義
  - テスト先行: `text.test.ts` — 定義の整合性
  - `shared/data/properties/text.ts` — 17プロパティ
- [x] **Step 7-2**: MultiValueInput
  - テスト先行: `MultiValueInput.test.tsx` — サブ値変更 → 合成値の onChange
  - `features/controls/inputs/MultiValueInput.tsx`
  - 複数サブ値 (offsetX, offsetY, blur, color) を個別操作
  - テンプレートで最終値を合成
- [x] **Step 7-3**: CSS Text Decoration プロパティ定義
  - テスト先行: `textDecoration.test.ts` — 定義の整合性
  - `shared/data/properties/textDecoration.ts` — 7プロパティ
- [x] **Step 7-4**: CSS Writing Modes プロパティ定義
  - テスト先行: `writingModes.test.ts` — 定義の整合性
  - `shared/data/properties/writingModes.ts` — 3プロパティ
- [x] **Step 7-5**: AxisSliderGroup
  - テスト先行: `AxisSliderGroup.test.tsx` — 軸スライダー操作 → 合成値の onChange
  - `features/controls/inputs/AxisSliderGroup.tsx`
  - Variable Font 軸ごとのスライダー群
  - `"wght" 400, "wdth" 100` 形式で値を合成
- [x] **Step 7-6**: PropertyControl にディスパッチ追加
  - `multi-value` → MultiValueInput
  - `axis-slider-group` → AxisSliderGroup
- [x] **Step 7-7**: カテゴリ組み立て更新
  - `shared/data/categories.ts` に 3カテゴリ追加
- [x] **Step 7-8**: 動作確認
  - `npx vitest run` で全テスト通過を確認
  - 全4カテゴリ (38プロパティ, font-family除く) が操作・プレビュー反映されることを確認
  - text-shadow の複合操作を確認
  - font-variation-settings の軸操作を確認

---

## Phase 8: font-family 追加

- [x] **Step 8-1**: font-family プロパティ定義追加
  - `shared/data/properties/font.ts` に font-family を追加 (controlType: "text")
  - CSS font-family 値をテキスト入力で自由に設定可能
- [x] **Step 8-2**: 動作確認
  - `pnpm vitest run` で全テスト通過を確認
  - `pnpm build` 型エラーなくビルド完了
  - 全40プロパティが完全動作

---

## Phase 9: 仕上げ

- [ ] **Step 9-1**: localStorage 永続化
  - テスト先行: `useLocalStorage.test.ts` — 保存・復元の検証
  - `shared/hooks/useLocalStorage.ts`
  - useTypographyState と連携し状態を自動保存・復元
- [ ] **Step 9-2**: プリセット機能
  - `shared/data/presets.ts`
  - Elegant Serif / Modern Sans / Monospace Code / Japanese Vertical 等
  - Header にプリセット選択ドロップダウン追加
- [ ] **Step 9-3**: レスポンシブ対応
  - 狭い画面 (< 768px) では上下積みレイアウトに切替
  - コントロールパネルの幅調整
- [ ] **Step 9-4**: アクセシビリティ
  - タブ順序の整理
  - スライダーのキーボード操作
  - aria-label / aria-expanded の付与
- [ ] **Step 9-5**: 最終動作確認
  - `npx vitest run` で全テスト通過を確認
  - 全フェーズの検証項目を通しでブラウザ確認
  - ページリロード後の状態復元を確認
  - レスポンシブ表示を確認

---

## 検証方法

1. `npx vitest run` で全テスト通過を確認
2. `npm run dev` でローカルサーバー起動
3. 各カテゴリのプロパティ操作 → プレビューにリアルタイム反映を確認
4. CSSOutput にプロパティが正しく出力されることを確認
5. ブラウザDevToolsでプレビュー要素のスタイルを検査
