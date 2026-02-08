import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SelectInput } from "./SelectInput";

const defaultConfig = {
  options: [
    { value: "normal", label: "Normal" },
    { value: "italic", label: "Italic" },
    { value: "oblique", label: "Oblique" },
  ],
} as const;

describe("SelectInput", () => {
  it("select 要素が表示される", () => {
    render(
      <SelectInput value="normal" onChange={vi.fn()} config={defaultConfig} />
    );
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("全選択肢が表示される", () => {
    render(
      <SelectInput value="normal" onChange={vi.fn()} config={defaultConfig} />
    );
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(3);
  });

  it("選択変更で onChange が呼ばれる", () => {
    const handleChange = vi.fn();
    render(
      <SelectInput value="normal" onChange={handleChange} config={defaultConfig} />
    );
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "italic" },
    });
    expect(handleChange).toHaveBeenCalledWith("italic");
  });
});
