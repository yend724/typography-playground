import type { PropertyDefinition } from "../../types/typography";

export const textDecorationProperties: readonly PropertyDefinition[] = [
  {
    cssProperty: "text-decoration-line",
    label: "Text Decoration Line",
    description: "テキストの装飾線の種類を設定します",
    defaultValue: "none",
    controlType: "select",
    config: {
      options: [
        { value: "none", label: "None" },
        { value: "underline", label: "Underline" },
        { value: "overline", label: "Overline" },
        { value: "line-through", label: "Line Through" },
      ],
    },
  },
  {
    cssProperty: "text-decoration-style",
    label: "Text Decoration Style",
    description: "テキストの装飾線のスタイルを設定します",
    defaultValue: "solid",
    controlType: "select",
    config: {
      options: [
        { value: "solid", label: "Solid" },
        { value: "double", label: "Double" },
        { value: "dotted", label: "Dotted" },
        { value: "dashed", label: "Dashed" },
        { value: "wavy", label: "Wavy" },
      ],
    },
  },
  {
    cssProperty: "text-decoration-color",
    label: "Text Decoration Color",
    description: "テキストの装飾線の色を設定します",
    defaultValue: "#000000",
    controlType: "color",
  },
  {
    cssProperty: "text-decoration-thickness",
    label: "Text Decoration Thickness",
    description: "テキストの装飾線の太さを設定します",
    defaultValue: "1px",
    controlType: "slider",
    config: { min: 1, max: 10, step: 0.5, unit: "px" },
  },
  {
    cssProperty: "text-underline-offset",
    label: "Text Underline Offset",
    description: "下線のオフセット距離を設定します",
    defaultValue: "0px",
    controlType: "slider",
    config: { min: -5, max: 20, step: 0.5, unit: "px" },
  },
  {
    cssProperty: "text-decoration-skip-ink",
    label: "Text Decoration Skip Ink",
    description: "装飾線がグリフと重なる部分のスキップ方法を設定します",
    defaultValue: "auto",
    controlType: "select",
    config: {
      options: [
        { value: "auto", label: "Auto" },
        { value: "none", label: "None" },
        { value: "all", label: "All" },
      ],
    },
  },
  {
    cssProperty: "text-shadow",
    label: "Text Shadow",
    description: "テキストに影を追加します",
    defaultValue: "0px 0px 0px #000000",
    controlType: "multi-value",
    config: {
      subFields: [
        {
          name: "offsetX",
          label: "Offset X",
          type: "slider",
          sliderConfig: { min: -20, max: 20, step: 1, unit: "px" },
        },
        {
          name: "offsetY",
          label: "Offset Y",
          type: "slider",
          sliderConfig: { min: -20, max: 20, step: 1, unit: "px" },
        },
        {
          name: "blur",
          label: "Blur",
          type: "slider",
          sliderConfig: { min: 0, max: 20, step: 1, unit: "px" },
        },
        {
          name: "color",
          label: "Color",
          type: "color",
        },
      ],
      template: "{offsetX} {offsetY} {blur} {color}",
    },
  },
];
