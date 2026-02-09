import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PreviewText } from "./PreviewText";

describe("PreviewText", () => {
  it("渡されたテキストが表示される", () => {
    render(<PreviewText text="Hello World" appliedStyles={{}} />);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("appliedStyles がインラインスタイルとして適用される", () => {
    render(
      <PreviewText
        text="Sample"
        appliedStyles={{ fontSize: "24px", color: "red" }}
      />,
    );
    const el = screen.getByText("Sample");
    expect(el).toHaveStyle({ fontSize: "24px", color: "rgb(255, 0, 0)" });
  });

  it("テキストが空の場合はデフォルトテキストが表示される", () => {
    render(<PreviewText text="" appliedStyles={{}} />);
    expect(screen.getByText(/The quick brown fox/)).toBeInTheDocument();
  });
});
