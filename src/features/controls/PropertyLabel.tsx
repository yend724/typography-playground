type Props = Readonly<{
  label: string;
  description: string;
  isModified: boolean;
  onReset: () => void;
}>;

export const PropertyLabel = ({
  label,
  description,
  isModified,
  onReset,
}: Props) => {
  return (
    <div className="flex items-center justify-between mb-1">
      <label className="text-sm font-medium text-gray-700" title={description}>
        {label}
      </label>
      {isModified && (
        <button
          onClick={onReset}
          className="text-xs text-blue-500 hover:text-blue-700"
          aria-label={`Reset ${label}`}
        >
          Reset
        </button>
      )}
    </div>
  );
};
