import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import type { MultiValueConfig } from "../../../shared/types/typography";
import { MultiValueInput } from "./MultiValueInput";

const defaultConfig: MultiValueConfig = {
  subFields: [
    {
      name: "offsetX",
      label: "Offset X",
      type: "slider",
      sliderConfig: { min: -20, max: 20, step: 1, unit: "px" },
    },
    {
      name: "offsetY",
      label: "Offset Y",
      type: "slider",
      sliderConfig: { min: -20, max: 20, step: 1, unit: "px" },
    },
    {
      name: "blur",
      label: "Blur",
      type: "slider",
      sliderConfig: { min: 0, max: 20, step: 1, unit: "px" },
    },
    {
      name: "color",
      label: "Color",
      type: "color",
    },
  ],
  template: "{offsetX} {offsetY} {blur} {color}",
};

describe("MultiValueInput", () => {
  it("サブフィールドのラベルが表示される", () => {
    render(
      <MultiValueInput
        value="0px 0px 0px #000000"
        onChange={vi.fn()}
        config={defaultConfig}
      />
    );
    expect(screen.getByText("Offset X")).toBeInTheDocument();
    expect(screen.getByText("Offset Y")).toBeInTheDocument();
    expect(screen.getByText("Blur")).toBeInTheDocument();
    expect(screen.getByText("Color")).toBeInTheDocument();
  });

  it("スライダーサブフィールドの変更で合成値の onChange が呼ばれる", () => {
    const handleChange = vi.fn();
    render(
      <MultiValueInput
        value="0px 0px 0px #000000"
        onChange={handleChange}
        config={defaultConfig}
      />
    );
    const spinbuttons = screen.getAllByRole("spinbutton");
    fireEvent.change(spinbuttons[0], { target: { value: "5" } });
    expect(handleChange).toHaveBeenCalledWith("5px 0px 0px #000000");
  });

  it("カラーサブフィールドの変更で合成値の onChange が呼ばれる", () => {
    const handleChange = vi.fn();
    render(
      <MultiValueInput
        value="0px 0px 0px #000000"
        onChange={handleChange}
        config={defaultConfig}
      />
    );
    const colorInput = screen.getByLabelText("color picker");
    fireEvent.input(colorInput, { target: { value: "#ff0000" } });
    expect(handleChange).toHaveBeenCalledWith("0px 0px 0px #ff0000");
  });
});
