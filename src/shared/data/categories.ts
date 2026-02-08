import type { PropertyCategory } from "../types/typography";
import { fontProperties } from "./properties/font";
import { textProperties } from "./properties/text";
import { textDecorationProperties } from "./properties/textDecoration";
import { writingModesProperties } from "./properties/writingModes";

export const categories: readonly PropertyCategory[] = [
  {
    id: "css-fonts",
    label: "CSS Fonts",
    specUrl: "https://www.w3.org/TR/css-fonts-4/",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_fonts",
    properties: fontProperties,
  },
  {
    id: "css-text",
    label: "CSS Text",
    specUrl: "https://www.w3.org/TR/css-text-4/",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_text",
    properties: textProperties,
  },
  {
    id: "css-text-decoration",
    label: "CSS Text Decoration",
    specUrl: "https://www.w3.org/TR/css-text-decor-4/",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_text_decoration",
    properties: textDecorationProperties,
  },
  {
    id: "css-writing-modes",
    label: "CSS Writing Modes",
    specUrl: "https://www.w3.org/TR/css-writing-modes-4/",
    mdnUrl: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_writing_modes",
    properties: writingModesProperties,
  },
];
