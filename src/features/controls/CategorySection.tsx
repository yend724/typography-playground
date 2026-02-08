import type { PropertyCategory } from "../../shared/types/typography";
import { PropertyControl } from "./PropertyControl";

type Props = Readonly<{
  category: PropertyCategory;
}>;

export const CategorySection = ({ category }: Props) => {
  return (
    <section>
      <div className="flex items-center justify-between px-4 py-2">
        <h2 className="text-sm font-semibold text-gray-800">
          {category.label}
        </h2>
        <div className="flex gap-2 text-xs">
          <a
            href={category.specUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Spec
          </a>
          <a
            href={category.mdnUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            MDN
          </a>
        </div>
      </div>
      <div className="px-4 pb-3">
        {category.properties.map((prop) => (
          <PropertyControl key={prop.cssProperty} definition={prop} />
        ))}
      </div>
    </section>
  );
};
