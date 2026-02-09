import type { PropertyCategory } from "../../shared/types/typography";
import { PropertyControl } from "./PropertyControl";

type Props = Readonly<{
  category: PropertyCategory;
}>;

export const CategorySection = ({ category }: Props) => {
  return (
    <details open className="group">
      <summary className="flex cursor-pointer list-none items-center justify-between bg-gray-800 px-4 py-2 [&::-webkit-details-marker]:hidden">
        <h2 className="flex items-center gap-1.5 text-sm font-semibold text-white">
          <span className="inline-block transition-transform group-open:rotate-90">&#9654;</span>
          {category.label}
        </h2>
        <div className="flex gap-2 text-xs">
          <a
            href={category.specUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            Spec
          </a>
          <a
            href={category.mdnUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            MDN
          </a>
        </div>
      </summary>
      <div className="px-4 pb-3">
        {category.properties.map((prop) => (
          <PropertyControl key={prop.cssProperty} definition={prop} />
        ))}
      </div>
    </details>
  );
};
