import { useState } from "react";
import type { PropertyCategory } from "../../shared/types/typography";
import { useTypography } from "../../shared/hooks/useTypographyState";
import { PropertyControl } from "./PropertyControl";

type Props = Readonly<{
  category: PropertyCategory;
}>;

export const CategorySection = ({ category }: Props) => {
  const [isExpanded, setIsExpanded] = useState(category.defaultExpanded);
  const { state } = useTypography();

  const modifiedCount = category.properties.filter(
    (prop) =>
      state[prop.cssProperty] !== undefined &&
      state[prop.cssProperty] !== prop.defaultValue
  ).length;

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsExpanded((prev) => !prev)}
        className="flex items-center justify-between w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
        aria-expanded={isExpanded}
      >
        <span className="text-sm font-semibold text-gray-800">
          {isExpanded ? "▼" : "▶"} {category.label}
        </span>
        {modifiedCount > 0 && (
          <span className="px-1.5 py-0.5 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
            {modifiedCount}
          </span>
        )}
      </button>
      {isExpanded && (
        <div className="px-4 pb-3">
          {category.properties.map((prop) => (
            <PropertyControl key={prop.cssProperty} definition={prop} />
          ))}
        </div>
      )}
    </div>
  );
};
