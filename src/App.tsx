import { MapWrapper } from "./components/MapWrapper";
import { SearchButton } from "./components/SearchButton";
import { SearchDialog } from "./components/SearchDialog";
import { Sidebar } from "./components/Sidebar";
import { WidgetPanel } from "./components/WidgetPanel";
import { Toaster } from "./components/ui/sonner";
import { useHotkey } from "./hooks/useHotkey";
import { useSearchDialogStore } from "./store/useSearchDialogStore";
import { useSidebarStore } from "./store/useSidebarStore";

interface AppProps {
  sidebar: React.ReactNode;
  widgetPanel: React.ReactNode;
  map: React.ReactNode;
  searchButton: React.ReactNode;
  toaster: React.ReactNode;
  searchDialog: React.ReactNode;
}

function AppInner({
  sidebar,
  widgetPanel,
  map,
  searchButton,
  toaster,
  searchDialog,
}: AppProps) {
  const setSearchDialogOpen = useSearchDialogStore(
    (state) => state.setSearchDialogOpen,
  );
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);

  useHotkey("k", true, () => setSearchDialogOpen(true));
  useHotkey("b", true, () => toggleSidebar());

  return (
    <main className="flex flex-col-reverse md:flex-row h-full w-full">
      {sidebar}
      {widgetPanel}
      {map}
      {searchButton}
      {toaster}
      {searchDialog}
    </main>
  );
}

const App = () => {
  return (
    <AppInner
      sidebar={<Sidebar />}
      widgetPanel={<WidgetPanel />}
      map={<MapWrapper />}
      searchButton={<SearchButton asMapWidget />}
      toaster={<Toaster />}
      searchDialog={<SearchDialog />}
    />
  );
};

export default App;
