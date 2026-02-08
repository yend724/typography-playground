import { useState } from "react";
import type { ReactNode } from "react";

type TooltipProps = Readonly<{
  text: string;
  children: ReactNode;
}>;

export const Tooltip = ({ text, children }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 text-xs text-white bg-gray-800 rounded whitespace-nowrap pointer-events-none"
        >
          {text}
        </span>
      )}
    </span>
  );
};
