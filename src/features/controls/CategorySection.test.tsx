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
  id: "css-fonts",
  label: "CSS Fonts",
  specUrl: "https://www.w3.org/TR/css-fonts-4/",
  mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_fonts",
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
    expect(screen.getByText("CSS Fonts")).toBeInTheDocument();
  });

  it("デフォルトで開いた状態でプロパティが表示される", () => {
    render(<CategorySection category={testCategory} />, { wrapper });
    expect(screen.getByText("Font Size")).toBeInTheDocument();
    expect(screen.getByText("Color")).toBeInTheDocument();
  });

  it("ヘッダークリックで折りたたみできる", async () => {
    const user = userEvent.setup();
    render(<CategorySection category={testCategory} />, { wrapper });

    const summary = screen.getByText("CSS Fonts").closest("summary")!;
    await user.click(summary);

    expect(screen.queryByText("Font Size")).not.toBeVisible();
  });

  it("W3C Spec へのリンクが表示される", () => {
    render(<CategorySection category={testCategory} />, { wrapper });
    const specLink = screen.getByRole("link", { name: /spec/i });
    expect(specLink).toHaveAttribute(
      "href",
      "https://www.w3.org/TR/css-fonts-4/",
    );
    expect(specLink).toHaveAttribute("target", "_blank");
  });

  it("MDN へのリンクが表示される", () => {
    render(<CategorySection category={testCategory} />, { wrapper });
    const mdnLink = screen.getByRole("link", { name: /mdn/i });
    expect(mdnLink).toHaveAttribute(
      "href",
      "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_fonts",
    );
    expect(mdnLink).toHaveAttribute("target", "_blank");
  });
});
