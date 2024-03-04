import { selectDockedWidget, useWidgetStore } from "@/store/useWidgetStore";
import { SearchButton } from "./SearchButton";
import { Suspense, lazy, useMemo } from "react";

export const Sidebar = () => {
  const dockedWidget = useWidgetStore(selectDockedWidget);

  const Widget = useMemo(
    () => lazy(() => import(`../widgets/${dockedWidget?.id}/index.ts`)),
    [],
  );

  return (
    <div className="flex h-full w-[32rem] flex-col gap-y-4 bg-gray-100 p-4">
      <SearchButton fullWidth />
      <p className="border-b-2 text-2xl">{dockedWidget?.title}</p>
      <Suspense fallback={<p>Loading...</p>}>
        <Widget />
      </Suspense>
    </div>
  );
};
