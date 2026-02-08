import { TypographyProvider } from "./shared/hooks/useTypographyState";
import { PlaygroundView } from "./views/PlaygroundView";

export const App = () => {
  return (
    <TypographyProvider>
      <PlaygroundView />
    </TypographyProvider>
  );
};
