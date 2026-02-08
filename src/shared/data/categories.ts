import type { PropertyCategory } from "../types/typography";
import { basicTextProperties } from "./properties/basicText";

export const categories: readonly PropertyCategory[] = [
  {
    id: "basic-text",
    label: "Basic Text",
    description: "基本的なテキストプロパティ",
    properties: basicTextProperties,
    defaultExpanded: true,
  },
];
