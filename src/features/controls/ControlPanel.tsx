import { categories } from "../../shared/data/categories";
import { CategorySection } from "./CategorySection";

export const ControlPanel = () => {
  return (
    <div>
      {categories.map((category, index) => (
        <div key={category.id}>
          {index > 0 && <hr className="border-gray-300 mx-4" />}
          <CategorySection category={category} />
        </div>
      ))}
    </div>
  );
};
