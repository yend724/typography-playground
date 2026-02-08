import type { AxisConfig } from "../../../shared/types/typography";

type Props = Readonly<{
  value: string;
  onChange: (value: string) => void;
  config: AxisConfig;
}>;

const parseAxisValues = (
  value: string,
  config: AxisConfig
): Record<string, number> => {
  const result: Record<string, number> = {};
  for (const axis of config.axes) {
    result[axis.tag] = axis.defaultValue;
  }
  const parts = value.split(",").map((s) => s.trim());
  for (const part of parts) {
    const match = part.match(/"([^"]+)"\s+([-\d.]+)/);
    if (match) {
      result[match[1]] = Number(match[2]);
    }
  }
  return result;
};

const buildAxisValue = (
  axisValues: Record<string, number>,
  config: AxisConfig
): string =>
  config.axes
    .map((axis) => `"${axis.tag}" ${axisValues[axis.tag] ?? axis.defaultValue}`)
    .join(", ");

export const AxisSliderGroup = ({ value, onChange, config }: Props) => {
  const axisValues = parseAxisValues(value, config);

  const handleAxisChange = (tag: string, newValue: number) => {
    const updated = { ...axisValues, [tag]: newValue };
    onChange(buildAxisValue(updated, config));
  };

  return (
    <div className="flex flex-col gap-2">
      {config.axes.map((axis) => (
        <div key={axis.tag}>
          <span className="text-xs text-gray-500">{axis.name}</span>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={axis.min}
              max={axis.max}
              step={axis.step}
              value={axisValues[axis.tag]}
              onChange={(e) =>
                handleAxisChange(axis.tag, Number(e.target.value))
              }
              className="flex-1"
            />
            <input
              type="number"
              min={axis.min}
              max={axis.max}
              step={axis.step}
              value={axisValues[axis.tag]}
              onChange={(e) =>
                handleAxisChange(axis.tag, Number(e.target.value))
              }
              className="w-16 px-1 py-0.5 text-sm text-right border border-gray-300 rounded"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
