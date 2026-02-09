import type { SliderConfig } from "../../../shared/types/typography";

type Props = Readonly<{
  value: string;
  onChange: (value: string) => void;
  config: SliderConfig;
  label?: string;
}>;

const parseNumericValue = (value: string, unit: string): number => {
  const numeric = unit ? value.replace(unit, "") : value;
  return Number(numeric) || 0;
};

export const SliderInput = ({ value, onChange, config, label }: Props) => {
  const numericValue = parseNumericValue(value, config.unit);

  const handleChange = (newValue: string) => {
    const formatted = config.unit ? `${newValue}${config.unit}` : newValue;
    onChange(formatted);
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="range"
        min={config.min}
        max={config.max}
        step={config.step}
        value={numericValue}
        onChange={(e) => handleChange(e.target.value)}
        aria-label={label}
        className="flex-1"
      />
      <input
        type="number"
        min={config.min}
        max={config.max}
        step={config.step}
        value={numericValue}
        onChange={(e) => handleChange(e.target.value)}
        aria-label={label ? `${label} value` : undefined}
        className="w-16 px-1 py-0.5 text-sm text-right border border-gray-300 rounded"
      />
      {config.unit && (
        <span className="text-sm text-gray-500 w-6">{config.unit}</span>
      )}
    </div>
  );
};
