import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ColorInput } from "./ColorInput";

describe("ColorInput", () => {
  it("color 入力と HEX テキストが表示される", () => {
    render(<ColorInput value="#000000" onChange={vi.fn()} />);
    expect(screen.getByLabelText("color picker")).toBeInTheDocument();
    expect(screen.getByText("#000000")).toBeInTheDocument();
  });

  it("色変更で onChange が呼ばれる", () => {
    const handleChange = vi.fn();
    render(<ColorInput value="#000000" onChange={handleChange} />);
    fireEvent.input(screen.getByLabelText("color picker"), {
      target: { value: "#ff0000" },
    });
    expect(handleChange).toHaveBeenCalledWith("#ff0000");
  });
});
