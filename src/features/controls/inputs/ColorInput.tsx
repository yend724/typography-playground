type Props = Readonly<{
  value: string;
  onChange: (value: string) => void;
  label?: string;
}>;

export const ColorInput = ({ value, onChange, label }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="color"
        value={value}
        onInput={(e) => onChange((e.target as HTMLInputElement).value)}
        aria-label={label ? `${label} color picker` : "color picker"}
        className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
      />
      <span className="text-sm text-gray-600 font-mono">{value}</span>
    </div>
  );
};
