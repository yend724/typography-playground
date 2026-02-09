type Props = Readonly<{
  value: string;
  onChange: (value: string) => void;
  label?: string;
}>;

export const TextInput = ({ value, onChange, label }: Props) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={label}
      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded"
    />
  );
};
