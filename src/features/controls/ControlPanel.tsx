import { categories } from "../../shared/data/categories";
import { CategorySection } from "./CategorySection";

export const ControlPanel = () => {
  return (
    <div>
      {categories.map((category) => (
        <CategorySection key={category.id} category={category} />
      ))}
    </div>
  );
};
