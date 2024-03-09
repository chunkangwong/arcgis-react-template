import { lazy, Suspense, useMemo } from "react";

interface WidgetRendererProps {
  widgetId: string;
}

export const WidgetRenderer = ({ widgetId }: WidgetRendererProps) => {
  const Widget = useMemo(
    () => lazy(() => import(`../widgets/${widgetId}/index.ts`)),
    [],
  );

  return (
    <Suspense fallback="Loading...">
      <Widget />
    </Suspense>
  );
};
