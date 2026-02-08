import type { MultiValueConfig } from "../../../shared/types/typography";
import { SliderInput } from "./SliderInput";
import { ColorInput } from "./ColorInput";

type Props = Readonly<{
  value: string;
  onChange: (value: string) => void;
  config: MultiValueConfig;
}>;

const parseSubValues = (
  value: string,
  config: MultiValueConfig
): Record<string, string> => {
  const parts = value.split(" ");
  const result: Record<string, string> = {};
  for (let i = 0; i < config.subFields.length; i++) {
    result[config.subFields[i].name] = parts[i] ?? "";
  }
  return result;
};

const buildValue = (
  subValues: Record<string, string>,
  template: string
): string => {
  let result = template;
  for (const [name, val] of Object.entries(subValues)) {
    result = result.replace(`{${name}}`, val);
  }
  return result;
};

export const MultiValueInput = ({ value, onChange, config }: Props) => {
  const subValues = parseSubValues(value, config);

  const handleSubChange = (name: string, newSubValue: string) => {
    const updated = { ...subValues, [name]: newSubValue };
    onChange(buildValue(updated, config.template));
  };

  return (
    <div className="flex flex-col gap-2">
      {config.subFields.map((field) => (
        <div key={field.name}>
          <span className="text-xs text-gray-500">{field.label}</span>
          {field.type === "slider" && field.sliderConfig ? (
            <SliderInput
              value={subValues[field.name]}
              onChange={(v) => handleSubChange(field.name, v)}
              config={field.sliderConfig}
            />
          ) : (
            <ColorInput
              value={subValues[field.name]}
              onChange={(v) => handleSubChange(field.name, v)}
            />
          )}
        </div>
      ))}
    </div>
  );
};
