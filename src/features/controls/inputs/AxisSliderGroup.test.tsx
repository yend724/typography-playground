import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import type { AxisConfig } from "../../../shared/types/typography";
import { AxisSliderGroup } from "./AxisSliderGroup";

const defaultConfig: AxisConfig = {
  axes: [
    {
      tag: "wght",
      name: "Weight",
      min: 100,
      max: 900,
      step: 1,
      defaultValue: 400,
    },
    {
      tag: "wdth",
      name: "Width",
      min: 75,
      max: 125,
      step: 0.5,
      defaultValue: 100,
    },
  ],
};

describe("AxisSliderGroup", () => {
  it("全軸のラベルが表示される", () => {
    render(
      <AxisSliderGroup
        value={'"wght" 400, "wdth" 100'}
        onChange={vi.fn()}
        config={defaultConfig}
      />,
    );
    expect(screen.getByText("Weight")).toBeInTheDocument();
    expect(screen.getByText("Width")).toBeInTheDocument();
  });

  it("全軸のスライダーが表示される", () => {
    render(
      <AxisSliderGroup
        value={'"wght" 400, "wdth" 100'}
        onChange={vi.fn()}
        config={defaultConfig}
      />,
    );
    expect(screen.getAllByRole("slider")).toHaveLength(2);
  });

  it("軸スライダーの変更で合成値の onChange が呼ばれる", () => {
    const handleChange = vi.fn();
    render(
      <AxisSliderGroup
        value={'"wght" 400, "wdth" 100'}
        onChange={handleChange}
        config={defaultConfig}
      />,
    );
    const spinbuttons = screen.getAllByRole("spinbutton");
    fireEvent.change(spinbuttons[0], { target: { value: "700" } });
    expect(handleChange).toHaveBeenCalledWith('"wght" 700, "wdth" 100');
  });
});
