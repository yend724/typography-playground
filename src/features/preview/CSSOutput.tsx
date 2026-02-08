import { CopyButton } from "../../shared/ui/CopyButton";

type CSSOutputProps = Readonly<{
  cssText: string;
}>;

export const CSSOutput = ({ cssText }: CSSOutputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">CSS Output</h3>
        <CopyButton text={cssText} />
      </div>
      <pre className="p-3 text-sm bg-gray-50 border border-gray-200 rounded overflow-x-auto">
        <code role="code">{cssText}</code>
      </pre>
    </div>
  );
};
