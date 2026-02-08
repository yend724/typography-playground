import { TypographyProvider } from "./shared/hooks/useTypographyState";

export const App = () => {
  return (
    <TypographyProvider>
      <div className="min-h-screen bg-gray-50">
        <h1 className="text-2xl font-bold p-4">Typography Playground</h1>
      </div>
    </TypographyProvider>
  );
};
