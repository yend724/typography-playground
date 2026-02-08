# Phase 7: 残りのカテゴリ + 専用入力 実装プラン

## Context

Phase 6 までで Basic Text カテゴリ（9 プロパティ）のコントロール・プレビュー・CSS 出力が完動している。しかし Typography プロパティは他にも多数あり、text-shadow のような複合値や font-variation-settings のような軸スライダーなど、既存の slider/select/color/text では表現できないコントロールが必要。Phase 7 で残り 3 カテゴリのプロパティ定義と専用入力コンポーネント（MultiValueInput, AxisSliderGroup）を追加し、全 4 カテゴリ 38 プロパティを操作可能にする。

## 進捗

| Step | 内容 | 状態 |
|---|---|---|
| 7-1 | Decoration & Transform プロパティ定義 | done |
| 7-2 | MultiValueInput | done |
| 7-3 | Advanced プロパティ定義 | done |
| 7-4 | OpenType Features プロパティ定義 | done |
| 7-5 | AxisSliderGroup | done |
| 7-6 | PropertyControl にディスパッチ追加 | done |
| 7-7 | カテゴリ組み立て更新 | done |
| 7-8 | 動作確認 | done |

---

## 新規ファイル

| ファイル | Step |
|---|---|
| `src/shared/data/properties/decorationTransform.ts` | 7-1 |
| `src/shared/data/properties/decorationTransform.test.ts` | 7-1 |
| `src/features/controls/inputs/MultiValueInput.tsx` | 7-2 |
| `src/features/controls/inputs/MultiValueInput.test.tsx` | 7-2 |
| `src/shared/data/properties/advanced.ts` | 7-3 |
| `src/shared/data/properties/advanced.test.ts` | 7-3 |
| `src/shared/data/properties/opentype.ts` | 7-4 |
| `src/shared/data/properties/opentype.test.ts` | 7-4 |
| `src/features/controls/inputs/AxisSliderGroup.tsx` | 7-5 |
| `src/features/controls/inputs/AxisSliderGroup.test.tsx` | 7-5 |

## 変更ファイル

| ファイル | Step |
|---|---|
| `src/features/controls/PropertyControl.tsx` | 7-6 |
| `src/features/controls/PropertyControl.test.tsx` | 7-6 |
| `src/shared/data/categories.ts` | 7-7 |

## 検証チェックリスト

- [x] `pnpm vitest run` — 全 24 ファイル / 94 テスト pass
- [x] `pnpm build` — 型エラーなくビルド完了
- [x] CSS Fonts: 12 プロパティが操作可能
- [x] CSS Text: 17 プロパティが操作可能
- [x] CSS Text Decoration: 7 プロパティが操作可能
- [x] CSS Writing Modes: 3 プロパティが操作可能
- [x] MultiValueInput: text-shadow の複合操作が動作する
- [x] AxisSliderGroup: font-variation-settings の軸操作が動作する
- [x] 全プロパティの変更がプレビューにリアルタイム反映される
- [x] CSS 出力に変更したプロパティが正しく出力される
