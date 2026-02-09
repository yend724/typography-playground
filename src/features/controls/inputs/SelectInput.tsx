import type { SelectConfig } from "../../../shared/types/typography";

type Props = Readonly<{
  value: string;
  onChange: (value: string) => void;
  config: SelectConfig;
  label?: string;
}>;

export const SelectInput = ({ value, onChange, config, label }: Props) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={label}
      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded bg-white"
    >
      {config.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
