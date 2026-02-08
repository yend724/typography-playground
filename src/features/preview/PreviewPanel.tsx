import { useState } from "react";
import { useTypography } from "../../shared/hooks/useTypographyState";
import { useCSSOutput } from "../../shared/hooks/useCSSOutput";
import { PreviewControls } from "./PreviewControls";
import { PreviewText } from "./PreviewText";
import { CSSOutput } from "./CSSOutput";
import type { BackgroundMode } from "./PreviewControls";

export const PreviewPanel = () => {
  const [previewText, setPreviewText] = useState("");
  const [backgroundMode, setBackgroundMode] = useState<BackgroundMode>("light");
  const { appliedStyles } = useTypography();
  const cssText = useCSSOutput();

  return (
    <div className="flex flex-col gap-4 p-4 h-full">
      <PreviewControls
        previewText={previewText}
        onPreviewTextChange={setPreviewText}
        backgroundMode={backgroundMode}
        onBackgroundModeChange={setBackgroundMode}
      />

      <div
        data-testid="preview-area"
        className={`flex-1 p-6 rounded border ${
          backgroundMode === "dark"
            ? "bg-gray-900 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        <PreviewText text={previewText} appliedStyles={appliedStyles} />
      </div>

      <CSSOutput cssText={cssText} />
    </div>
  );
};
