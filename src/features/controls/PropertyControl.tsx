import type { PropertyDefinition } from "../../shared/types/typography";
import { useTypography } from "../../shared/hooks/useTypographyState";
import { PropertyLabel } from "./PropertyLabel";
import { SliderInput } from "./inputs/SliderInput";
import { SelectInput } from "./inputs/SelectInput";
import { ColorInput } from "./inputs/ColorInput";
import { TextInput } from "./inputs/TextInput";
import { MultiValueInput } from "./inputs/MultiValueInput";
import { AxisSliderGroup } from "./inputs/AxisSliderGroup";

type Props = Readonly<{
  definition: PropertyDefinition;
}>;

export const PropertyControl = ({ definition }: Props) => {
  const { state, setProperty, resetProperty } = useTypography();
  const currentValue = state[definition.cssProperty] ?? definition.defaultValue;
  const isModified = currentValue !== definition.defaultValue;

  const handleChange = (value: string) => {
    setProperty(definition.cssProperty, value);
  };

  const handleReset = () => {
    resetProperty(definition.cssProperty);
  };

  const renderInput = () => {
    switch (definition.controlType) {
      case "slider":
        return (
          <SliderInput
            value={currentValue}
            onChange={handleChange}
            config={definition.config}
          />
        );
      case "select":
        return (
          <SelectInput
            value={currentValue}
            onChange={handleChange}
            config={definition.config}
          />
        );
      case "color":
        return <ColorInput value={currentValue} onChange={handleChange} />;
      case "text":
        return <TextInput value={currentValue} onChange={handleChange} />;
      case "multi-value":
        return (
          <MultiValueInput
            value={currentValue}
            onChange={handleChange}
            config={definition.config}
          />
        );
      case "axis-slider-group":
        return (
          <AxisSliderGroup
            value={currentValue}
            onChange={handleChange}
            config={definition.config}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="py-2">
      <PropertyLabel
        label={definition.label}
        description={definition.description}
        isModified={isModified}
        onReset={handleReset}
      />
      {renderInput()}
    </div>
  );
};
