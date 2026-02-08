# Typography Playground アーキテクチャ

## 概要

CSSのTypographyプロパティをインタラクティブに操作し、リアルタイムプレビューで効果を確認できるブラウザアプリケーション。

## 技術スタック

- **Vite + React (TypeScript)**
- **Tailwind CSS v4** (アプリUI用)
- プレビュー領域はインラインスタイルで動的CSS適用

---

## レイアウト

```
┌─────────────────────────────────────────────────────┐
│  Header (タイトル / リセットボタン / プリセット選択)    │
├──────────────────────┬──────────────────────────────┤
│  Control Panel (40%) │  Preview Panel (60%)          │
│  ┌────────────────┐  │  ┌────────────────────────┐  │
│  │ ▼ Basic Text   │  │  │                        │  │
│  │  font-family   │  │  │  リアルタイム           │  │
│  │  font-size     │  │  │  プレビュー領域         │  │
│  │  font-weight   │  │  │  (インラインスタイル)    │  │
│  │  ...           │  │  │                        │  │
│  ├────────────────┤  │  └────────────────────────┘  │
│  │ ▶ Decoration   │  │  ┌────────────────────────┐  │
│  ├────────────────┤  │  │ .my-text {             │  │
│  │ ▶ Advanced     │  │  │   font-size: 24px;     │  │
│  ├────────────────┤  │  │   font-weight: 700;    │  │
│  │ ▶ OpenType     │  │  │ }         [Copy]       │  │
│  └────────────────┘  │  └────────────────────────┘  │
└──────────────────────┴──────────────────────────────┘
```

---

## データ駆動設計

各CSSプロパティを `PropertyDefinition` オブジェクトで定義し、`controlType` に応じて適切な入力コンポーネントを自動レンダリングする。

```
PropertyDefinition → PropertyControl(dispatcher) → SliderInput / SelectInput / ColorInput / ...
```

---

## 状態管理

- `useReducer` + React Context（外部ライブラリ不要）
- State: `Record<string, string | undefined>` (CSSプロパティ名 → 値)
- `appliedStyles`: stateから `React.CSSProperties` を `useMemo` で計算

---

## データフロー

```
┌─────────────────────────────────────────────┐
│          useTypographyState()               │
│  state: Record<string, string | undefined>  │
│  dispatch: (property, value) => void        │
│  appliedStyles: React.CSSProperties         │
└────────┬──────────────────────┬─────────────┘
         │                      │
    ┌────▼─────┐         ┌─────▼──────┐
    │ Controls │ onChange │  Preview   │
    │ Panel    │────────→│  Panel     │
    │(reads    │         │(reads      │
    │ state)   │         │ applied    │
    └──────────┘         │ Styles)    │
                         └─────┬──────┘
                               │
                        ┌──────▼──────┐
                        │ useCSSOutput│
                        │ (CSS文字列   │
                        │  生成)      │
                        └─────────────┘
```

---

## プロジェクト構造

```
src/
├── App.tsx                            # ルートコンポーネント
├── main.tsx                           # エントリポイント
├── index.css                          # Tailwind v4 (@import "tailwindcss")
│
├── shared/                            # グローバル共有項目
│   ├── types/
│   │   └── typography.ts              # PropertyDefinition, PropertyCategory 等
│   ├── data/
│   │   ├── categories.ts              # カテゴリ組み立て
│   │   ├── fonts.ts                   # Google Fonts一覧 (80フォント)
│   │   └── properties/
│   │       ├── basicText.ts           # Basic Text (10)
│   │       ├── decorationTransform.ts # Decoration & Transform (10)
│   │       ├── advanced.ts            # Advanced (12)
│   │       └── opentype.ts            # OpenType Features (8)
│   ├── hooks/
│   │   ├── useTypographyState.ts      # useReducer + Context
│   │   ├── useGoogleFonts.ts          # フォント読み込み
│   │   └── useCSSOutput.ts            # CSS文字列生成
│   ├── utils/
│   │   ├── css.ts                     # kebab→camelCase変換
│   │   └── fonts.ts                   # フォントURL構築
│   └── ui/                            # 汎用UIパーツ (どこからでも使える)
│       ├── Tooltip.tsx                # ツールチップ
│       └── CopyButton.tsx             # コピーボタン
│
├── features/                          # 機能単位のモジュール
│   ├── controls/                      # プロパティ操作機能
│   │   ├── ControlPanel.tsx           # コントロールパネル全体
│   │   ├── CategorySection.tsx        # 折りたたみセクション
│   │   ├── PropertyControl.tsx        # ディスパッチャー
│   │   ├── PropertyLabel.tsx          # ラベル + 説明 + リセット
│   │   └── inputs/
│   │       ├── SliderInput.tsx        # 数値スライダー
│   │       ├── SelectInput.tsx        # ドロップダウン
│   │       ├── ColorInput.tsx         # カラーピッカー
│   │       ├── TextInput.tsx          # テキスト入力
│   │       ├── FontFamilyInput.tsx    # フォント選択
│   │       ├── MultiValueInput.tsx    # 複合値 (text-shadow)
│   │       └── AxisSliderGroup.tsx    # Variable Font軸
│   └── preview/                       # プレビュー機能
│       ├── PreviewPanel.tsx           # プレビューパネル全体
│       ├── PreviewText.tsx            # スタイル適用テキスト
│       ├── PreviewControls.tsx        # テキスト編集 / 背景切替
│       └── CSSOutput.tsx              # CSS出力 + コピー
│
├── views/                             # ページ単位
│   └── PlaygroundView.tsx             # メインページ (レイアウト + features組み立て)
```

---

## カテゴリ構成（全40プロパティ）

### 1. Basic Text（10プロパティ）- デフォルト展開

| プロパティ | コントロール | 設定 |
|---|---|---|
| font-family | font-family | Google Fonts検索 |
| font-size | slider | 8–120px, step 1 |
| font-weight | slider | 100–900, step 100 |
| font-style | select | normal / italic / oblique |
| line-height | slider | 0.5–4, step 0.1 (unitless) |
| letter-spacing | slider | -5–20px, step 0.5 |
| word-spacing | slider | -5–30px, step 0.5 |
| text-align | select | start / end / left / center / right / justify |
| text-indent | slider | -50–100px, step 1 |
| color | color | カラーピッカー |

### 2. Decoration & Transform（10プロパティ）- 折りたたみ

| プロパティ | コントロール | 設定 |
|---|---|---|
| text-decoration-line | select | none / underline / overline / line-through |
| text-decoration-style | select | solid / double / dotted / dashed / wavy |
| text-decoration-color | color | カラーピッカー |
| text-decoration-thickness | slider | 0–10px, step 0.5 |
| text-underline-offset | slider | -5–15px, step 1 |
| text-decoration-skip-ink | select | auto / all / none |
| text-transform | select | none / uppercase / lowercase / capitalize / full-width |
| text-shadow | multi-value | offsetX / offsetY / blur / color |
| font-variant-caps | select | normal / small-caps / all-small-caps 他 |
| font-variant-numeric | select | normal / ordinal / slashed-zero / lining-nums 他 |

### 3. Advanced（12プロパティ）- 折りたたみ

| プロパティ | コントロール | 設定 |
|---|---|---|
| writing-mode | select | horizontal-tb / vertical-rl / vertical-lr |
| text-orientation | select | mixed / upright / sideways |
| direction | select | ltr / rtl |
| unicode-bidi | select | normal / embed / bidi-override / isolate 他 |
| text-overflow | select | clip / ellipsis |
| white-space | select | normal / nowrap / pre / pre-wrap / pre-line / break-spaces |
| word-break | select | normal / break-all / keep-all / break-word |
| overflow-wrap | select | normal / break-word / anywhere |
| hyphens | select | none / manual / auto |
| column-count | slider | 1–6, step 1 |
| column-gap | slider | 0–60px, step 1 |
| column-rule | text | 自由入力 (例: "1px solid #ccc") |

### 4. OpenType Features（8プロパティ）- 折りたたみ

| プロパティ | コントロール | 設定 |
|---|---|---|
| font-feature-settings | text | 自由入力 (例: "'liga' 1, 'kern' 1") |
| font-variant-ligatures | select | normal / none / common-ligatures 他 |
| font-variant-east-asian | select | normal / jis78 / jis83 / simplified 他 |
| font-optical-sizing | select | auto / none |
| font-variation-settings | axis-slider-group | wght / wdth / slnt / ital 軸 |
| font-kerning | select | auto / normal / none |
| font-size-adjust | slider | 0–1, step 0.01 |
| font-stretch | select | ultra-condensed ～ ultra-expanded |

---

## 入力コンポーネント種別

| controlType | 用途 | 対応プロパティ例 |
|---|---|---|
| `slider` | 数値範囲 (range + number入力) | font-size, line-height |
| `select` | 列挙値ドロップダウン | font-style, text-align |
| `color` | カラーピッカー | color, text-decoration-color |
| `text` | 自由テキスト入力 | font-feature-settings, column-rule |
| `font-family` | Google Fonts検索・選択 | font-family |
| `multi-value` | 複合値（複数サブ値の組み合わせ） | text-shadow |
| `axis-slider-group` | Variable Font軸スライダー群 | font-variation-settings |

---

## Google Fonts連携

- **APIキー不要**: 厳選80フォントを静的データとして保持
- 動的 `<link>` タグ挿入でオンデマンド読み込み
- カテゴリ: Sans-serif / Serif / Monospace / Display / Handwriting
- **日本語フォント対応**: Noto Sans JP, Noto Serif JP, M PLUS Rounded 1c 等
