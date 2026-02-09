export type ControlType =
  | "slider"
  | "select"
  | "color"
  | "text"
  | "multi-value"
  | "axis-slider-group";

export type SliderConfig = Readonly<{
  min: number;
  max: number;
  step: number;
  unit: string;
}>;

export type SelectOption = Readonly<{
  value: string;
  label: string;
}>;

export type SelectConfig = Readonly<{
  options: readonly SelectOption[];
}>;

export type MultiValueSubField = Readonly<{
  name: string;
  label: string;
  type: "slider" | "color";
  sliderConfig?: SliderConfig;
}>;

export type MultiValueConfig = Readonly<{
  subFields: readonly MultiValueSubField[];
  template: string;
}>;

export type AxisDefinition = Readonly<{
  tag: string;
  name: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
}>;

export type AxisConfig = Readonly<{
  axes: readonly AxisDefinition[];
}>;

export type PropertyDefinitionBase = Readonly<{
  cssProperty: string;
  label: string;
  description: string;
  defaultValue: string;
}>;

export type PropertyDefinition =
  | (PropertyDefinitionBase & Readonly<{ controlType: "slider"; config: SliderConfig }>)
  | (PropertyDefinitionBase & Readonly<{ controlType: "select"; config: SelectConfig }>)
  | (PropertyDefinitionBase & Readonly<{ controlType: "color" }>)
  | (PropertyDefinitionBase & Readonly<{ controlType: "text" }>)
  | (PropertyDefinitionBase & Readonly<{ controlType: "multi-value"; config: MultiValueConfig }>)
  | (PropertyDefinitionBase &
      Readonly<{ controlType: "axis-slider-group"; config: AxisConfig }>);

export type PropertyCategory = Readonly<{
  id: string;
  label: string;
  specUrl: string;
  mdnUrl: string;
  properties: readonly PropertyDefinition[];
}>;
