import { useTypography } from "../shared/hooks/useTypographyState";
import { ControlPanel } from "../features/controls/ControlPanel";
import { PreviewPanel } from "../features/preview/PreviewPanel";

export const PlaygroundView = () => {
  const { resetAll } = useTypography();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">
          Typography Playground
        </h1>
        <button
          onClick={resetAll}
          className="px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
        >
          Reset All
        </button>
      </header>

      <main className="flex flex-1 overflow-hidden">
        <div className="w-2/5 overflow-y-auto border-r border-gray-200 bg-white">
          <ControlPanel />
        </div>
        <div className="w-3/5 overflow-y-auto">
          <PreviewPanel />
        </div>
      </main>
    </div>
  );
};
