import type { SelectConfig } from "../../../shared/types/typography";

type Props = Readonly<{
  value: string;
  onChange: (value: string) => void;
  config: SelectConfig;
}>;

export const SelectInput = ({ value, onChange, config }: Props) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
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
