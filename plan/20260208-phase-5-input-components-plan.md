# Phase 5: 入力コンポーネント群

## Context

Basic Text カテゴリの 9 プロパティを操作するための入力コンポーネント群を作成する。`PropertyControl` ディスパッチャーが `controlType` に応じて適切な入力コンポーネントを描画し、`CategorySection` で折りたたみ可能なカテゴリ UI を提供する。

## 前提

- Phase 4 完了（PlaygroundView + ControlPanel + PreviewPanel の骨組みが存在する）
- Phase 2 の型定義（`PropertyDefinition`, `SliderConfig`, `SelectConfig` 等）が利用可能
- Phase 3 の `useTypography()` で `state` / `setProperty` / `resetProperty` にアクセス可能

## 進捗

| Step | 内容 | 状態 |
|---|---|---|
| 5-1 | SliderInput | done |
| 5-2 | SelectInput | done |
| 5-3 | ColorInput | done |
| 5-4 | TextInput | done |
| 5-5 | PropertyLabel | done |
| 5-6 | PropertyControl（ディスパッチャー） | done |
| 5-7 | CategorySection | done |
| 5-8 | ControlPanel に接続 | done |
| 5-9 | 動作確認 | done |

---

## Step 5-1: SliderInput

### 要件

- range スライダー + number 入力 + 単位表示
- `value`, `onChange`, `config`(SliderConfig) を Props で受け取る
- TDD: スライダー操作 → onChange コールバック

### 新規ファイル

| ファイル | 操作 |
|---|---|
| `src/features/controls/inputs/SliderInput.test.tsx` | 新規 — テスト |
| `src/features/controls/inputs/SliderInput.tsx` | 新規 — 実装 |

### Props

```ts
type Props = Readonly<{
  value: string;
  onChange: (value: string) => void;
  config: SliderConfig;
}>;
```

---

## Step 5-2: SelectInput

### 要件

- ドロップダウン (`<select>`) で列挙値を選択
- `value`, `onChange`, `config`(SelectConfig) を Props で受け取る
- TDD: 選択変更 → onChange コールバック

### 新規ファイル

| ファイル | 操作 |
|---|---|
| `src/features/controls/inputs/SelectInput.test.tsx` | 新規 — テスト |
| `src/features/controls/inputs/SelectInput.tsx` | 新規 — 実装 |

### Props

```ts
type Props = Readonly<{
  value: string;
  onChange: (value: string) => void;
  config: SelectConfig;
}>;
```

---

## Step 5-3: ColorInput

### 要件

- `<input type="color">` + HEX テキスト表示
- `value`, `onChange` を Props で受け取る
- TDD: 色変更 → onChange コールバック

### 新規ファイル

| ファイル | 操作 |
|---|---|
| `src/features/controls/inputs/ColorInput.test.tsx` | 新規 — テスト |
| `src/features/controls/inputs/ColorInput.tsx` | 新規 — 実装 |

### Props

```ts
type Props = Readonly<{
  value: string;
  onChange: (value: string) => void;
}>;
```

---

## Step 5-4: TextInput

### 要件

- 自由テキスト入力 (`<input type="text">`)
- `value`, `onChange` を Props で受け取る
- TDD: テキスト入力 → onChange コールバック

### 新規ファイル

| ファイル | 操作 |
|---|---|
| `src/features/controls/inputs/TextInput.test.tsx` | 新規 — テスト |
| `src/features/controls/inputs/TextInput.tsx` | 新規 — 実装 |

### Props

```ts
type Props = Readonly<{
  value: string;
  onChange: (value: string) => void;
}>;
```

---

## Step 5-5: PropertyLabel

### 要件

- プロパティラベル + 説明ツールチップ + リセットボタン
- リセットボタンはデフォルト値と異なる場合のみ表示
- テストは任意（UI 表示のみ）

### 新規ファイル

| ファイル | 操作 |
|---|---|
| `src/features/controls/PropertyLabel.tsx` | 新規 |

### Props

```ts
type Props = Readonly<{
  label: string;
  description: string;
  isModified: boolean;
  onReset: () => void;
}>;
```

---

## Step 5-6: PropertyControl（ディスパッチャー）

### 要件

- `PropertyDefinition` を受け取り、`controlType` に応じて適切な入力コンポーネントを描画
- `PropertyLabel` + 入力コンポーネントの組み合わせ
- TDD: controlType ごとに正しいコンポーネントが描画されること

### 新規ファイル

| ファイル | 操作 |
|---|---|
| `src/features/controls/PropertyControl.test.tsx` | 新規 — テスト |
| `src/features/controls/PropertyControl.tsx` | 新規 — 実装 |

### Props

```ts
type Props = Readonly<{
  definition: PropertyDefinition;
}>;
```

### ディスパッチ

| controlType | コンポーネント |
|---|---|
| `slider` | SliderInput |
| `select` | SelectInput |
| `color` | ColorInput |
| `text` | TextInput |
| `font-family` | （Phase 8 で追加） |
| `multi-value` | （Phase 7 で追加） |
| `axis-slider-group` | （Phase 7 で追加） |

---

## Step 5-7: CategorySection

### 要件

- 折りたたみ開閉 UI
- 変更数バッジ（デフォルト値と異なるプロパティの数を表示）
- `defaultExpanded` で初期状態を制御
- TDD: 折りたたみ開閉の振る舞い

### 新規ファイル

| ファイル | 操作 |
|---|---|
| `src/features/controls/CategorySection.test.tsx` | 新規 — テスト |
| `src/features/controls/CategorySection.tsx` | 新規 — 実装 |

### Props

```ts
type Props = Readonly<{
  category: PropertyCategory;
}>;
```

---

## Step 5-8: ControlPanel に接続

### 要件

- categories データから CategorySection を描画する
- プレースホルダーを実際のコンポーネントに置き換え

### 変更ファイル

| ファイル | 操作 |
|---|---|
| `src/features/controls/ControlPanel.tsx` | 変更 |

---

## Step 5-9: 動作確認

### 検証項目

- `pnpm vitest run` — 全テスト pass
- `pnpm build` — 型エラーなくビルド完了
- ブラウザで Basic Text カテゴリの 9 プロパティ（font-family 除く）が操作可能

---

## 検証チェックリスト

- [ ] `pnpm vitest run` — 全テスト pass
- [ ] `pnpm build` — 型エラーなくビルド完了
- [ ] SliderInput: range + number 入力で値が変更される
- [ ] SelectInput: ドロップダウンで値が選択される
- [ ] ColorInput: カラーピッカーで色が変更される
- [ ] TextInput: テキスト入力で値が変更される
- [ ] PropertyControl: controlType に応じた入力コンポーネントが表示される
- [ ] CategorySection: 折りたたみ開閉が動作する
- [ ] ControlPanel: Basic Text カテゴリが表示される

## 注意事項

- スタイリングは Tailwind CSS を使用
- `handle` prefix でイベントハンドラ、`on` prefix でコールバック props
- named export のみ
- アロー関数コンポーネント
