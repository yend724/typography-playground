import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import type { ReactNode } from "react";
import { TypographyProvider, useTypography } from "./useTypographyState";

const wrapper = ({ children }: Readonly<{ children: ReactNode }>) => (
  <TypographyProvider>{children}</TypographyProvider>
);

describe("useTypographyState", () => {
  it("初期状態でデフォルト値が設定されている", () => {
    const { result } = renderHook(() => useTypography(), { wrapper });
    expect(result.current.state["font-size"]).toBe("16px");
    expect(result.current.state["color"]).toBe("#000000");
  });

  it("setProperty で値を変更できる", () => {
    const { result } = renderHook(() => useTypography(), { wrapper });
    act(() => {
      result.current.setProperty("font-size", "24px");
    });
    expect(result.current.state["font-size"]).toBe("24px");
  });

  it("resetProperty でデフォルト値に戻る", () => {
    const { result } = renderHook(() => useTypography(), { wrapper });
    act(() => {
      result.current.setProperty("font-size", "24px");
    });
    expect(result.current.state["font-size"]).toBe("24px");
    act(() => {
      result.current.resetProperty("font-size");
    });
    expect(result.current.state["font-size"]).toBe("16px");
  });

  it("resetAll で全プロパティがデフォルト値に戻る", () => {
    const { result } = renderHook(() => useTypography(), { wrapper });
    act(() => {
      result.current.setProperty("font-size", "24px");
      result.current.setProperty("color", "#ff0000");
    });
    act(() => {
      result.current.resetAll();
    });
    expect(result.current.state["font-size"]).toBe("16px");
    expect(result.current.state["color"]).toBe("#000000");
  });

  it("appliedStyles が state から算出される", () => {
    const { result } = renderHook(() => useTypography(), { wrapper });
    act(() => {
      result.current.setProperty("font-size", "24px");
    });
    expect(result.current.appliedStyles).toHaveProperty("fontSize", "24px");
  });

  it("Provider 外で useTypography を呼ぶとエラーになる", () => {
    expect(() => {
      renderHook(() => useTypography());
    }).toThrow();
  });
});
