import { describe, it, expect } from "vitest";
import type { PropertyDefinition, PropertyCategory } from "./typography";

describe("Typography 型定義", () => {
  it("slider 型の PropertyDefinition が正しく構成できる", () => {
    const prop: PropertyDefinition = {
      cssProperty: "font-size",
      label: "Font Size",
      description: "フォントサイズ",
      defaultValue: "16px",
      controlType: "slider",
      config: { min: 8, max: 120, step: 1, unit: "px" },
    };
    expect(prop.controlType).toBe("slider");
    expect(prop.config.min).toBe(8);
  });

  it("select 型の PropertyDefinition が正しく構成できる", () => {
    const prop: PropertyDefinition = {
      cssProperty: "font-style",
      label: "Font Style",
      description: "フォントスタイル",
      defaultValue: "normal",
      controlType: "select",
      config: {
        options: [
          { value: "normal", label: "Normal" },
          { value: "italic", label: "Italic" },
        ],
      },
    };
    expect(prop.controlType).toBe("select");
    expect(prop.config.options).toHaveLength(2);
  });

  it("color 型の PropertyDefinition が正しく構成できる", () => {
    const prop: PropertyDefinition = {
      cssProperty: "color",
      label: "Color",
      description: "テキスト色",
      defaultValue: "#000000",
      controlType: "color",
    };
    expect(prop.controlType).toBe("color");
  });

  it("text 型の PropertyDefinition が正しく構成できる", () => {
    const prop: PropertyDefinition = {
      cssProperty: "column-rule",
      label: "Column Rule",
      description: "カラムルール",
      defaultValue: "",
      controlType: "text",
    };
    expect(prop.controlType).toBe("text");
  });

  it("multi-value 型の PropertyDefinition が正しく構成できる", () => {
    const prop: PropertyDefinition = {
      cssProperty: "text-shadow",
      label: "Text Shadow",
      description: "テキストシャドウ",
      defaultValue: "none",
      controlType: "multi-value",
      config: {
        subFields: [
          {
            name: "offsetX",
            label: "Offset X",
            type: "slider",
            sliderConfig: { min: -20, max: 20, step: 1, unit: "px" },
          },
        ],
        template: "{offsetX} {offsetY} {blur} {color}",
      },
    };
    expect(prop.controlType).toBe("multi-value");
    expect(prop.config.subFields).toHaveLength(1);
  });

  it("axis-slider-group 型の PropertyDefinition が正しく構成できる", () => {
    const prop: PropertyDefinition = {
      cssProperty: "font-variation-settings",
      label: "Font Variation Settings",
      description: "Variable Font 軸",
      defaultValue: "",
      controlType: "axis-slider-group",
      config: {
        axes: [
          { tag: "wght", name: "Weight", min: 100, max: 900, step: 1, defaultValue: 400 },
        ],
      },
    };
    expect(prop.controlType).toBe("axis-slider-group");
    expect(prop.config.axes).toHaveLength(1);
  });

  it("PropertyCategory が正しく構成できる", () => {
    const category: PropertyCategory = {
      id: "basic-text",
      label: "Basic Text",
      description: "基本テキストプロパティ",
      properties: [],
      defaultExpanded: true,
    };
    expect(category.id).toBe("basic-text");
    expect(category.defaultExpanded).toBe(true);
  });
});
