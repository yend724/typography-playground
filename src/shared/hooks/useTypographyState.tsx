import { createContext, useContext, useReducer, useMemo } from "react";
import type React from "react";
import type { ReactNode } from "react";
import { categories } from "../data/categories";
import { buildAppliedStyles } from "../utils/css";

type TypographyState = Record<string, string | undefined>;

type TypographyAction =
  | Readonly<{ type: "SET_PROPERTY"; cssProperty: string; value: string }>
  | Readonly<{ type: "RESET_PROPERTY"; cssProperty: string }>
  | Readonly<{ type: "RESET_ALL" }>
  | Readonly<{ type: "LOAD_PRESET"; state: TypographyState }>;

type TypographyContextValue = Readonly<{
  state: TypographyState;
  appliedStyles: React.CSSProperties;
  setProperty: (cssProperty: string, value: string) => void;
  resetProperty: (cssProperty: string) => void;
  resetAll: () => void;
  loadPreset: (state: TypographyState) => void;
}>;

const buildDefaultState = (): TypographyState => {
  const state: TypographyState = {};
  for (const category of categories) {
    for (const prop of category.properties) {
      state[prop.cssProperty] = prop.defaultValue;
    }
  }
  return state;
};

const defaultState = buildDefaultState();

const typographyReducer = (
  state: TypographyState,
  action: TypographyAction
): TypographyState => {
  switch (action.type) {
    case "SET_PROPERTY":
      return { ...state, [action.cssProperty]: action.value };
    case "RESET_PROPERTY":
      return { ...state, [action.cssProperty]: defaultState[action.cssProperty] };
    case "RESET_ALL":
      return { ...defaultState };
    case "LOAD_PRESET":
      return { ...defaultState, ...action.state };
  }
};

const TypographyContext = createContext<TypographyContextValue | null>(null);

export const TypographyProvider = ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  const [state, dispatch] = useReducer(typographyReducer, defaultState);

  const appliedStyles = useMemo(() => buildAppliedStyles(state), [state]);

  const value = useMemo(
    (): TypographyContextValue => ({
      state,
      appliedStyles,
      setProperty: (cssProperty, value) =>
        dispatch({ type: "SET_PROPERTY", cssProperty, value }),
      resetProperty: (cssProperty) =>
        dispatch({ type: "RESET_PROPERTY", cssProperty }),
      resetAll: () => dispatch({ type: "RESET_ALL" }),
      loadPreset: (presetState) =>
        dispatch({ type: "LOAD_PRESET", state: presetState }),
    }),
    [state, appliedStyles]
  );

  return (
    <TypographyContext.Provider value={value}>
      {children}
    </TypographyContext.Provider>
  );
};

export const useTypography = (): TypographyContextValue => {
  const context = useContext(TypographyContext);
  if (context === null) {
    throw new Error("useTypography must be used within a TypographyProvider");
  }
  return context;
};
