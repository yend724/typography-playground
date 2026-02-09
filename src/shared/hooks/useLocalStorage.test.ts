import { describe, it, expect, beforeEach, vi } from "vitest";
import { loadState, saveState, clearState } from "./useLocalStorage";

const STORAGE_KEY = "typography-playground:state";

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("saveState / loadState", () => {
    it("保存した状態を復元できる", () => {
      const state = { "font-size": "24px", color: "#ff0000" };
      saveState(state);
      expect(loadState()).toEqual(state);
    });

    it("localStorage が空の場合 null を返す", () => {
      expect(loadState()).toBeNull();
    });

    it("不正な JSON が保存されている場合 null を返す", () => {
      localStorage.setItem(STORAGE_KEY, "invalid json{{{");
      expect(loadState()).toBeNull();
    });

    it("保存された値がオブジェクトでない場合 null を返す", () => {
      localStorage.setItem(STORAGE_KEY, '"string"');
      expect(loadState()).toBeNull();
    });
  });

  describe("clearState", () => {
    it("保存された状態をクリアする", () => {
      saveState({ "font-size": "24px" });
      clearState();
      expect(loadState()).toBeNull();
    });
  });

  describe("エラーハンドリング", () => {
    it("localStorage.setItem が例外を投げてもクラッシュしない", () => {
      const spy = vi
        .spyOn(Storage.prototype, "setItem")
        .mockImplementation(() => {
          throw new Error("QuotaExceededError");
        });

      expect(() => saveState({ "font-size": "24px" })).not.toThrow();
      spy.mockRestore();
    });

    it("localStorage.getItem が例外を投げても null を返す", () => {
      const spy = vi
        .spyOn(Storage.prototype, "getItem")
        .mockImplementation(() => {
          throw new Error("SecurityError");
        });

      expect(loadState()).toBeNull();
      spy.mockRestore();
    });
  });
});
