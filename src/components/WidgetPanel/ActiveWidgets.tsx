import {
  selectActiveWidgets,
  selectDockedWidget,
  useWidgetStore,
} from "@/store/useWidgetStore";
import { useTranslation } from "react-i18next";
import { WidgetRenderer } from "./WidgetRenderer";

export const ActiveWidgets = () => {
  const { t } = useTranslation();

  const dockedWidget = useWidgetStore(selectDockedWidget);
  const activeWidgets = useWidgetStore(selectActiveWidgets);

  if (activeWidgets.length === 0) {
    return <p className="text-center">{t("No widget available")}</p>;
  }

  return (
    <>
      {activeWidgets.map((widget) => (
        <div hidden={widget.id !== dockedWidget?.id} key={widget.id}>
          <WidgetRenderer widgetId={widget.id} />
        </div>
      ))}
    </>
  );
};
