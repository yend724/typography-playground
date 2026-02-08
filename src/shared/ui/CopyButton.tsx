import { useState, useCallback } from "react";

type CopyButtonProps = Readonly<{
  text: string;
  label?: string;
}>;

export const CopyButton = ({ text, label = "Copy" }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleClick = useCallback(async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <button
      onClick={handleClick}
      className="px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
    >
      {copied ? "Copied!" : label}
    </button>
  );
};
