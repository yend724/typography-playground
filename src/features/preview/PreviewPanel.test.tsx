import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import type { ReactNode } from "react";
import { TypographyProvider } from "../../shared/hooks/useTypographyState";
import { PreviewPanel } from "./PreviewPanel";

const wrapper = ({ children }: Readonly<{ children: ReactNode }>) => (
  <TypographyProvider>{children}</TypographyProvider>
);

describe("PreviewPanel", () => {
  it("デフォルトのプレビューテキストが表示される", () => {
    render(<PreviewPanel />, { wrapper });
    expect(screen.getByText(/The quick brown fox/)).toBeInTheDocument();
  });

  it("CSS Output セクションが表示される", () => {
    render(<PreviewPanel />, { wrapper });
    expect(screen.getByText("CSS Output")).toBeInTheDocument();
  });

  it("Light / Dark 切替ボタンが表示される", () => {
    render(<PreviewPanel />, { wrapper });
    expect(screen.getByRole("button", { name: "Light" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Dark" })).toBeInTheDocument();
  });

  it("テキストエリアでプレビューテキストを変更できる", () => {
    render(<PreviewPanel />, { wrapper });
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Custom text" },
    });
    const previewArea = screen.getByTestId("preview-area");
    expect(previewArea).toHaveTextContent("Custom text");
  });

  it("Dark モードで背景が暗くなる", () => {
    render(<PreviewPanel />, { wrapper });
    fireEvent.click(screen.getByRole("button", { name: "Dark" }));
    const previewArea = screen.getByTestId("preview-area");
    expect(previewArea).toHaveClass("bg-gray-900");
  });
});
