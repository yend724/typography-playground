const STORAGE_KEY = "typography-playground:state";

type StoredState = Record<string, string | undefined>;

const isStoredState = (value: unknown): value is StoredState => {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }
  return Object.values(value as Record<string, unknown>).every(
    (v) => v === undefined || typeof v === "string",
  );
};

export const loadState = (): StoredState | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return null;

    const parsed: unknown = JSON.parse(raw);
    if (!isStoredState(parsed)) return null;

    return parsed;
  } catch {
    return null;
  }
};

export const saveState = (state: StoredState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage が無効・満杯でも無視
  }
};

export const clearState = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // 無視
  }
};
