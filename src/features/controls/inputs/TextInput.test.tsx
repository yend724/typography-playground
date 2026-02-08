import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TextInput } from "./TextInput";

describe("TextInput", () => {
  it("テキスト入力が表示される", () => {
    render(<TextInput value="" onChange={vi.fn()} />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("テキスト入力の変更で onChange が呼ばれる", () => {
    const handleChange = vi.fn();
    render(<TextInput value="" onChange={handleChange} />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "1px solid #ccc" },
    });
    expect(handleChange).toHaveBeenCalledWith("1px solid #ccc");
  });
});
