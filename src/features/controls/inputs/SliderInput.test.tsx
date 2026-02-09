import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SliderInput } from "./SliderInput";

const defaultConfig = { min: 8, max: 120, step: 1, unit: "px" } as const;

describe("SliderInput", () => {
  it("range スライダーと number 入力が表示される", () => {
    render(
      <SliderInput value="16px" onChange={vi.fn()} config={defaultConfig} />,
    );
    expect(screen.getByRole("slider")).toBeInTheDocument();
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
  });

  it("number 入力の変更で onChange が呼ばれる", () => {
    const handleChange = vi.fn();
    render(
      <SliderInput
        value="16px"
        onChange={handleChange}
        config={defaultConfig}
      />,
    );
    fireEvent.change(screen.getByRole("spinbutton"), {
      target: { value: "24" },
    });
    expect(handleChange).toHaveBeenCalledWith("24px");
  });

  it("range スライダーの変更で onChange が呼ばれる", () => {
    const handleChange = vi.fn();
    render(
      <SliderInput
        value="16px"
        onChange={handleChange}
        config={defaultConfig}
      />,
    );
    fireEvent.change(screen.getByRole("slider"), {
      target: { value: "32" },
    });
    expect(handleChange).toHaveBeenCalledWith("32px");
  });

  it("単位なしの場合は値のみで onChange が呼ばれる", () => {
    const handleChange = vi.fn();
    const config = { min: 100, max: 900, step: 100, unit: "" } as const;
    render(<SliderInput value="400" onChange={handleChange} config={config} />);
    fireEvent.change(screen.getByRole("spinbutton"), {
      target: { value: "700" },
    });
    expect(handleChange).toHaveBeenCalledWith("700");
  });

  it("単位が表示される", () => {
    render(
      <SliderInput value="16px" onChange={vi.fn()} config={defaultConfig} />,
    );
    expect(screen.getByText("px")).toBeInTheDocument();
  });
});
