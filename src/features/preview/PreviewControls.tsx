export type BackgroundMode = "light" | "dark";

type PreviewControlsProps = Readonly<{
  previewText: string;
  onPreviewTextChange: (text: string) => void;
  backgroundMode: BackgroundMode;
  onBackgroundModeChange: (mode: BackgroundMode) => void;
}>;

export const PreviewControls = ({
  previewText,
  onPreviewTextChange,
  backgroundMode,
  onBackgroundModeChange,
}: PreviewControlsProps) => {
  return (
    <div className="flex items-center gap-3">
      <textarea
        value={previewText}
        onChange={(e) => onPreviewTextChange(e.target.value)}
        placeholder="Preview text..."
        className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded resize-none"
        rows={1}
      />
      <div className="flex gap-1">
        <button
          onClick={() => onBackgroundModeChange("light")}
          className={`px-2 py-1 text-xs rounded transition-colors ${
            backgroundMode === "light"
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Light
        </button>
        <button
          onClick={() => onBackgroundModeChange("dark")}
          className={`px-2 py-1 text-xs rounded transition-colors ${
            backgroundMode === "dark"
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Dark
        </button>
      </div>
    </div>
  );
};
