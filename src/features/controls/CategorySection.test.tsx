import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import type { ReactNode } from "react";
import type { PropertyCategory } from "../../shared/types/typography";
import { TypographyProvider } from "../../shared/hooks/useTypographyState";
import { CategorySection } from "./CategorySection";

const wrapper = ({ children }: Readonly<{ children: ReactNode }>) => (
  <TypographyProvider>{children}</TypographyProvider>
);

const testCategory: PropertyCategory = {
  id: "test",
  label: "Test Category",
  description: "テスト",
  defaultExpanded: true,
  properties: [
    {
      cssProperty: "font-size",
      label: "Font Size",
      description: "フォントサイズ",
      defaultValue: "16px",
      controlType: "slider",
      config: { min: 8, max: 120, step: 1, unit: "px" },
    },
    {
      cssProperty: "color",
      label: "Color",
      description: "色",
      defaultValue: "#000000",
      controlType: "color",
    },
  ],
};

describe("CategorySection", () => {
  it("カテゴリラベルが表示される", () => {
    render(<CategorySection category={testCategory} />, { wrapper });
    expect(
      screen.getByRole("button", { name: /test category/i })
    ).toBeInTheDocument();
  });

  it("defaultExpanded=true の場合プロパティが表示される", () => {
    render(<CategorySection category={testCategory} />, { wrapper });
    expect(screen.getByText("Font Size")).toBeInTheDocument();
    expect(screen.getByText("Color")).toBeInTheDocument();
  });

  it("ヘッダークリックで折りたたみ/展開が切り替わる", async () => {
    render(<CategorySection category={testCategory} />, { wrapper });
    expect(screen.getByText("Font Size")).toBeInTheDocument();

    const button = screen.getByRole("button", { name: /test category/i });
    await userEvent.click(button);
    expect(screen.queryByText("Font Size")).not.toBeInTheDocument();

    await userEvent.click(button);
    expect(screen.getByText("Font Size")).toBeInTheDocument();
  });

  it("defaultExpanded=false の場合プロパティが非表示", () => {
    const collapsed = { ...testCategory, defaultExpanded: false };
    render(<CategorySection category={collapsed} />, { wrapper });
    expect(
      screen.getByRole("button", { name: /test category/i })
    ).toBeInTheDocument();
    expect(screen.queryByText("Font Size")).not.toBeInTheDocument();
  });
});
