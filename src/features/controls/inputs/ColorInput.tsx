type Props = Readonly<{
  value: string;
  onChange: (value: string) => void;
}>;

export const ColorInput = ({ value, onChange }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="color"
        value={value}
        onInput={(e) => onChange((e.target as HTMLInputElement).value)}
        aria-label="color picker"
        className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
      />
      <span className="text-sm text-gray-600 font-mono">{value}</span>
    </div>
  );
};
