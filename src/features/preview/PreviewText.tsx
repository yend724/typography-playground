import type React from "react";

type PreviewTextProps = Readonly<{
  text: string;
  appliedStyles: React.CSSProperties;
}>;

const DEFAULT_TEXT = `The quick brown fox jumps over the lazy dog.
ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz
0123456789 !@#$%^&*()

いろはにほへと ちりぬるを わかよたれそ つねならむ
永遠の美しさを持つ文字組版 東京都渋谷区`;

export const PreviewText = ({ text, appliedStyles }: PreviewTextProps) => {
  const displayText = text || DEFAULT_TEXT;

  return (
    <div
      style={{
        all: "revert-layer",
        whiteSpace: "pre-wrap",
        overflowWrap: "break-word",
        ...appliedStyles,
      }}
    >
      {displayText}
    </div>
  );
};
