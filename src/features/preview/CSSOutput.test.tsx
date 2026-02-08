import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { CSSOutput } from "./CSSOutput";

describe("CSSOutput", () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  const cssText = `font-size: 24px;\ncolor: red;`;

  it("CSS テキストが表示される", () => {
    render(<CSSOutput cssText={cssText} />);
    expect(screen.getByText(/font-size: 24px/)).toBeInTheDocument();
  });

  it("code 要素内に CSS が表示される", () => {
    render(<CSSOutput cssText={cssText} />);
    const codeEl = screen.getByRole("code");
    expect(codeEl).toHaveTextContent("font-size: 24px");
  });

  it("Copy ボタンが表示される", () => {
    render(<CSSOutput cssText={cssText} />);
    expect(screen.getByRole("button", { name: "Copy" })).toBeInTheDocument();
  });

  it("Copy ボタンクリックで CSS がコピーされる", async () => {
    render(<CSSOutput cssText={cssText} />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    });
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(cssText);
  });
});
