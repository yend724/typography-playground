import type React from "react";
import { sanitizeCSSValue } from "./sanitize";

export const cssPropertyToReact = (cssProperty: string): string =>
  cssProperty.replace(/-([a-z])/g, (_, char: string) => char.toUpperCase());

export const buildAppliedStyles = (
  state: Readonly<Record<string, string | undefined>>,
): React.CSSProperties => {
  const styles: Record<string, string> = {};
  for (const [key, value] of Object.entries(state)) {
    if (value !== undefined) {
      styles[cssPropertyToReact(key)] = sanitizeCSSValue(value);
    }
  }
  return styles;
};
