import type { PropertyDefinition } from "../../types/typography";

export const fontProperties: readonly PropertyDefinition[] = [
  {
    cssProperty: "font-family",
    label: "Font Family",
    description: "フォントファミリーを設定します",
    defaultValue: "system-ui, sans-serif",
    controlType: "text",
  },
  {
    cssProperty: "font-size",
    label: "Font Size",
    description: "テキストのフォントサイズを設定します",
    defaultValue: "16px",
    controlType: "slider",
    config: { min: 8, max: 120, step: 1, unit: "px" },
  },
  {
    cssProperty: "font-weight",
    label: "Font Weight",
    description: "フォントの太さを設定します",
    defaultValue: "400",
    controlType: "slider",
    config: { min: 100, max: 900, step: 100, unit: "" },
  },
  {
    cssProperty: "font-style",
    label: "Font Style",
    description: "フォントのスタイル（標準・イタリック・斜体）を設定します",
    defaultValue: "normal",
    controlType: "select",
    config: {
      options: [
        { value: "normal", label: "Normal" },
        { value: "italic", label: "Italic" },
        { value: "oblique", label: "Oblique" },
      ],
    },
  },
  {
    cssProperty: "font-stretch",
    label: "Font Stretch",
    description: "フォントの幅を設定します",
    defaultValue: "100%",
    controlType: "slider",
    config: { min: 50, max: 200, step: 1, unit: "%" },
  },
  {
    cssProperty: "font-size-adjust",
    label: "Font Size Adjust",
    description: "フォールバックフォントのサイズ調整係数を設定します",
    defaultValue: "0.5",
    controlType: "slider",
    config: { min: 0, max: 2, step: 0.01, unit: "" },
  },
  {
    cssProperty: "font-kerning",
    label: "Font Kerning",
    description: "フォントのカーニング情報の使用を設定します",
    defaultValue: "auto",
    controlType: "select",
    config: {
      options: [
        { value: "auto", label: "Auto" },
        { value: "normal", label: "Normal" },
        { value: "none", label: "None" },
      ],
    },
  },
  {
    cssProperty: "font-optical-sizing",
    label: "Font Optical Sizing",
    description: "光学的サイズ調整の有効・無効を設定します",
    defaultValue: "auto",
    controlType: "select",
    config: {
      options: [
        { value: "auto", label: "Auto" },
        { value: "none", label: "None" },
      ],
    },
  },
  {
    cssProperty: "font-variant-caps",
    label: "Font Variant Caps",
    description: "大文字の代替グリフの使用を設定します",
    defaultValue: "normal",
    controlType: "select",
    config: {
      options: [
        { value: "normal", label: "Normal" },
        { value: "small-caps", label: "Small Caps" },
        { value: "all-small-caps", label: "All Small Caps" },
        { value: "petite-caps", label: "Petite Caps" },
        { value: "all-petite-caps", label: "All Petite Caps" },
        { value: "unicase", label: "Unicase" },
        { value: "titling-caps", label: "Titling Caps" },
      ],
    },
  },
  {
    cssProperty: "font-variant-numeric",
    label: "Font Variant Numeric",
    description: "数字・分数・序数の代替グリフの使用を設定します",
    defaultValue: "normal",
    controlType: "select",
    config: {
      options: [
        { value: "normal", label: "Normal" },
        { value: "ordinal", label: "Ordinal" },
        { value: "slashed-zero", label: "Slashed Zero" },
        { value: "lining-nums", label: "Lining Nums" },
        { value: "oldstyle-nums", label: "Oldstyle Nums" },
        { value: "proportional-nums", label: "Proportional Nums" },
        { value: "tabular-nums", label: "Tabular Nums" },
      ],
    },
  },
  {
    cssProperty: "font-feature-settings",
    label: "Font Feature Settings",
    description: "OpenType フォント機能の有効・無効を設定します",
    defaultValue: "normal",
    controlType: "text",
  },
  {
    cssProperty: "font-variation-settings",
    label: "Font Variation Settings",
    description: "Variable Font の軸の値を設定します",
    defaultValue: '"wght" 400, "wdth" 100, "ital" 0, "slnt" 0, "opsz" 14',
    controlType: "axis-slider-group",
    config: {
      axes: [
        { tag: "wght", name: "Weight", min: 100, max: 900, step: 1, defaultValue: 400 },
        { tag: "wdth", name: "Width", min: 75, max: 125, step: 0.5, defaultValue: 100 },
        { tag: "ital", name: "Italic", min: 0, max: 1, step: 1, defaultValue: 0 },
        { tag: "slnt", name: "Slant", min: -90, max: 90, step: 1, defaultValue: 0 },
        { tag: "opsz", name: "Optical Size", min: 8, max: 144, step: 1, defaultValue: 14 },
      ],
    },
  },
];
