import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("children が表示される", () => {
    render(<Tooltip text="ヒント"><button>対象</button></Tooltip>);
    expect(screen.getByRole("button", { name: "対象" })).toBeInTheDocument();
  });

  it("ホバー前はツールチップテキストが非表示", () => {
    render(<Tooltip text="ヒント"><button>対象</button></Tooltip>);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("ホバーでツールチップテキストが表示される", () => {
    render(<Tooltip text="ヒント"><button>対象</button></Tooltip>);
    fireEvent.mouseEnter(screen.getByRole("button", { name: "対象" }));
    expect(screen.getByRole("tooltip")).toHaveTextContent("ヒント");
  });

  it("マウスアウトでツールチップが非表示になる", () => {
    render(<Tooltip text="ヒント"><button>対象</button></Tooltip>);
    const button = screen.getByRole("button", { name: "対象" });
    fireEvent.mouseEnter(button);
    fireEvent.mouseLeave(button);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });
});
