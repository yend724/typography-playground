import type { PropertyDefinition } from "../../types/typography";

export const writingModesProperties: readonly PropertyDefinition[] = [
  {
    cssProperty: "writing-mode",
    label: "Writing Mode",
    description: "テキストの書字方向を設定します",
    defaultValue: "horizontal-tb",
    controlType: "select",
    config: {
      options: [
        { value: "horizontal-tb", label: "Horizontal TB" },
        { value: "vertical-rl", label: "Vertical RL" },
        { value: "vertical-lr", label: "Vertical LR" },
      ],
    },
  },
  {
    cssProperty: "direction",
    label: "Direction",
    description: "テキストの方向を設定します",
    defaultValue: "ltr",
    controlType: "select",
    config: {
      options: [
        { value: "ltr", label: "LTR" },
        { value: "rtl", label: "RTL" },
      ],
    },
  },
  {
    cssProperty: "unicode-bidi",
    label: "Unicode Bidi",
    description: "双方向テキストのアルゴリズムを設定します",
    defaultValue: "normal",
    controlType: "select",
    config: {
      options: [
        { value: "normal", label: "Normal" },
        { value: "embed", label: "Embed" },
        { value: "bidi-override", label: "Bidi Override" },
        { value: "isolate", label: "Isolate" },
        { value: "isolate-override", label: "Isolate Override" },
        { value: "plaintext", label: "Plaintext" },
      ],
    },
  },
];
