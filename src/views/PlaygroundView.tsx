import { useState } from "react";
import { useTypography } from "../shared/hooks/useTypographyState";
import { ControlPanel } from "../features/controls/ControlPanel";
import { PreviewPanel } from "../features/preview/PreviewPanel";

type Tab = "controls" | "preview";

export const PlaygroundView = () => {
  const { resetAll } = useTypography();
  const [activeTab, setActiveTab] = useState<Tab>("controls");

  return (
    <div className="min-h-screen md:h-screen bg-gray-50 flex flex-col">
      <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 shrink-0">
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

      <nav className="grid grid-cols-2 bg-white border-b border-gray-200 md:hidden">
        <button
          onClick={() => setActiveTab("controls")}
          className={`py-2.5 text-sm text-center transition-colors ${
            activeTab === "controls"
              ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
              : "text-gray-500"
          }`}
        >
          Controls
        </button>
        <button
          onClick={() => setActiveTab("preview")}
          className={`py-2.5 text-sm text-center transition-colors ${
            activeTab === "preview"
              ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
              : "text-gray-500"
          }`}
        >
          Preview
        </button>
      </nav>

      <main className="flex flex-col md:flex-row flex-1 md:overflow-hidden">
        <div
          className={`${
            activeTab === "controls" ? "flex-1" : "hidden"
          } md:flex md:flex-col overflow-y-auto md:border-r border-gray-200 bg-white md:w-80 md:max-w-80 md:shrink-0`}
        >
          <ControlPanel />
        </div>
        <div
          className={`${
            activeTab === "preview" ? "flex-1" : "hidden"
          } md:flex md:flex-col md:flex-1 overflow-y-auto`}
        >
          <PreviewPanel />
        </div>
      </main>
    </div>
  );
};
