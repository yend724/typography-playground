import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { PreviewControls } from "./PreviewControls";

describe("PreviewControls", () => {
  const defaultProps = {
    previewText: "Hello",
    onPreviewTextChange: vi.fn(),
    backgroundMode: "light" as const,
    onBackgroundModeChange: vi.fn(),
  };

  it("テキストエリアが表示される", () => {
    render(<PreviewControls {...defaultProps} />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("テキストエリアに現在の値が表示される", () => {
    render(<PreviewControls {...defaultProps} />);
    expect(screen.getByRole("textbox")).toHaveValue("Hello");
  });

  it("テキスト変更で onPreviewTextChange が呼ばれる", () => {
    const handler = vi.fn();
    render(<PreviewControls {...defaultProps} onPreviewTextChange={handler} />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "New text" },
    });
    expect(handler).toHaveBeenCalledWith("New text");
  });

  it("Light / Dark ボタンが表示される", () => {
    render(<PreviewControls {...defaultProps} />);
    expect(screen.getByRole("button", { name: "Light" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Dark" })).toBeInTheDocument();
  });

  it("Dark ボタンクリックで onBackgroundModeChange が呼ばれる", () => {
    const handler = vi.fn();
    render(
      <PreviewControls {...defaultProps} onBackgroundModeChange={handler} />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Dark" }));
    expect(handler).toHaveBeenCalledWith("dark");
  });

  it("Light ボタンクリックで onBackgroundModeChange が呼ばれる", () => {
    const handler = vi.fn();
    render(
      <PreviewControls
        {...defaultProps}
        backgroundMode="dark"
        onBackgroundModeChange={handler}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Light" }));
    expect(handler).toHaveBeenCalledWith("light");
  });
});
