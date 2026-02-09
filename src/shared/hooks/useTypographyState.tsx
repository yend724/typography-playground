import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useEffect,
  useRef,
} from "react";
import type React from "react";
import type { ReactNode } from "react";
import { categories } from "../data/categories";
import { buildAppliedStyles } from "../utils/css";
import { loadState, saveState, clearState } from "./useLocalStorage";

type TypographyState = Record<string, string | undefined>;

type TypographyAction =
  | Readonly<{ type: "SET_PROPERTY"; cssProperty: string; value: string }>
  | Readonly<{ type: "RESET_PROPERTY"; cssProperty: string }>
  | Readonly<{ type: "RESET_ALL" }>;

type TypographyContextValue = Readonly<{
  state: TypographyState;
  appliedStyles: React.CSSProperties;
  setProperty: (cssProperty: string, value: string) => void;
  resetProperty: (cssProperty: string) => void;
  resetAll: () => void;
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
  action: TypographyAction,
): TypographyState => {
  switch (action.type) {
    case "SET_PROPERTY":
      return { ...state, [action.cssProperty]: action.value };
    case "RESET_PROPERTY":
      return {
        ...state,
        [action.cssProperty]: defaultState[action.cssProperty],
      };
    case "RESET_ALL":
      return { ...defaultState };
  }
};

const TypographyContext = createContext<TypographyContextValue | null>(null);

const buildInitialState = (): TypographyState => {
  const saved = loadState();
  return saved ? { ...defaultState, ...saved } : { ...defaultState };
};

export const TypographyProvider = ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  const [state, dispatch] = useReducer(
    typographyReducer,
    undefined,
    buildInitialState,
  );
  const isResetRef = useRef(false);

  const appliedStyles = useMemo(() => buildAppliedStyles(state), [state]);

  useEffect(() => {
    if (isResetRef.current) {
      clearState();
      isResetRef.current = false;
      return;
    }

    const timer = setTimeout(() => {
      saveState(state);
    }, 500);

    return () => clearTimeout(timer);
  }, [state]);

  const value = useMemo(
    (): TypographyContextValue => ({
      state,
      appliedStyles,
      setProperty: (cssProperty, value) =>
        dispatch({ type: "SET_PROPERTY", cssProperty, value }),
      resetProperty: (cssProperty) =>
        dispatch({ type: "RESET_PROPERTY", cssProperty }),
      resetAll: () => {
        isResetRef.current = true;
        dispatch({ type: "RESET_ALL" });
      },
    }),
    [state, appliedStyles],
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
