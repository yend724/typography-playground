import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { CopyButton } from "./CopyButton";

describe("CopyButton", () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  it("ボタンが表示される", () => {
    render(<CopyButton text="copied text" />);
    expect(screen.getByRole("button", { name: "Copy" })).toBeInTheDocument();
  });

  it("カスタムラベルが表示される", () => {
    render(<CopyButton text="copied text" label="Copy CSS" />);
    expect(
      screen.getByRole("button", { name: "Copy CSS" }),
    ).toBeInTheDocument();
  });

  it("クリックで clipboard.writeText が呼ばれる", async () => {
    render(<CopyButton text="hello" />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    });
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("hello");
  });

  it("クリック後に Copied! が表示される", async () => {
    render(<CopyButton text="hello" />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    });
    expect(screen.getByRole("button", { name: "Copied!" })).toBeInTheDocument();
  });

  it("2秒後に元のラベルに戻る", async () => {
    vi.useFakeTimers();
    render(<CopyButton text="hello" />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    });
    expect(screen.getByRole("button", { name: "Copied!" })).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByRole("button", { name: "Copy" })).toBeInTheDocument();
    vi.useRealTimers();
  });
});
