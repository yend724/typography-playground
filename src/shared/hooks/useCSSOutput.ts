import { useMemo } from "react";
import { useTypography } from "./useTypographyState";
import { categories } from "../data/categories";

const defaultValues = new Map<string, string>();
for (const category of categories) {
  for (const prop of category.properties) {
    defaultValues.set(prop.cssProperty, prop.defaultValue);
  }
}

export const useCSSOutput = (): string => {
  const { state } = useTypography();

  return useMemo(() => {
    const lines: string[] = [];
    for (const [cssProperty, value] of Object.entries(state)) {
      if (value !== undefined && value !== defaultValues.get(cssProperty)) {
        lines.push(`  ${cssProperty}: ${value};`);
      }
    }
    return `.my-text {\n${lines.join("\n")}${lines.length > 0 ? "\n" : ""}}`;
  }, [state]);
};
