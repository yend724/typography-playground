import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import type { ReactNode } from "react";
import type { PropertyDefinition } from "../../shared/types/typography";
import { TypographyProvider } from "../../shared/hooks/useTypographyState";
import { PropertyControl } from "./PropertyControl";

const wrapper = ({ children }: Readonly<{ children: ReactNode }>) => (
  <TypographyProvider>{children}</TypographyProvider>
);

describe("PropertyControl", () => {
  it("slider タイプで range スライダーが表示される", () => {
    const definition: PropertyDefinition = {
      cssProperty: "font-size",
      label: "Font Size",
      description: "フォントサイズ",
      defaultValue: "16px",
      controlType: "slider",
      config: { min: 8, max: 120, step: 1, unit: "px" },
    };
    render(<PropertyControl definition={definition} />, { wrapper });
    expect(screen.getByRole("slider")).toBeInTheDocument();
    expect(screen.getByText("Font Size")).toBeInTheDocument();
  });

  it("select タイプで select 要素が表示される", () => {
    const definition: PropertyDefinition = {
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
    render(<PropertyControl definition={definition} />, { wrapper });
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByText("Font Style")).toBeInTheDocument();
  });

  it("color タイプで color 入力が表示される", () => {
    const definition: PropertyDefinition = {
      cssProperty: "color",
      label: "Color",
      description: "テキスト色",
      defaultValue: "#000000",
      controlType: "color",
    };
    render(<PropertyControl definition={definition} />, { wrapper });
    expect(screen.getByLabelText("color picker")).toBeInTheDocument();
    expect(screen.getByText("Color")).toBeInTheDocument();
  });

  it("text タイプで text 入力が表示される", () => {
    const definition: PropertyDefinition = {
      cssProperty: "column-rule",
      label: "Column Rule",
      description: "カラムルール",
      defaultValue: "",
      controlType: "text",
    };
    render(<PropertyControl definition={definition} />, { wrapper });
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByText("Column Rule")).toBeInTheDocument();
  });
});
