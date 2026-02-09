import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import type { ReactNode } from "react";
import { TypographyProvider, useTypography } from "./useTypographyState";
import { useCSSOutput } from "./useCSSOutput";

const wrapper = ({ children }: Readonly<{ children: ReactNode }>) => (
  <TypographyProvider>{children}</TypographyProvider>
);

describe("useCSSOutput", () => {
  it("デフォルト値のみの場合は空の CSS ブロックを返す", () => {
    const { result } = renderHook(() => useCSSOutput(), { wrapper });
    expect(result.current).toBe("");
  });

  it("変更されたプロパティのみ CSS に含まれる", () => {
    const { result } = renderHook(
      () => {
        const typography = useTypography();
        const cssOutput = useCSSOutput();
        return { typography, cssOutput };
      },
      { wrapper },
    );

    act(() => {
      result.current.typography.setProperty("font-size", "24px");
    });

    expect(result.current.cssOutput).toContain("font-size: 24px;");
    expect(result.current.cssOutput).not.toContain("color:");
  });

  it("CSS プロパティは kebab-case で出力される", () => {
    const { result } = renderHook(
      () => {
        const typography = useTypography();
        const cssOutput = useCSSOutput();
        return { typography, cssOutput };
      },
      { wrapper },
    );

    act(() => {
      result.current.typography.setProperty("font-size", "24px");
      result.current.typography.setProperty("font-weight", "700");
    });

    expect(result.current.cssOutput).toBe(
      "font-size: 24px;\nfont-weight: 700;",
    );
  });
});
