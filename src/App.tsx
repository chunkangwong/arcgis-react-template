import { MapWrapper } from "./components/MapWrapper";
import { ProfileDialog } from "./components/ProfileDialog/ProfileDialog";
import { SearchButton } from "./components/SearchButton";
import { SearchDialog } from "./components/SearchDialog";
import { Sidebar } from "./components/Sidebar";
import { WidgetPanel } from "./components/WidgetPanel";
import { Toaster } from "./components/ui/sonner";
import { useHotkey } from "./hooks/useHotkey";
import { useLayoutStore } from "./store/useLayoutStore";
import { useSearchDialogStore } from "./store/useSearchDialogStore";

interface AppProps {
  sidebar: React.ReactNode;
  widgetPanel: React.ReactNode;
  map: React.ReactNode;
  searchButton: React.ReactNode;
  toaster: React.ReactNode;
  searchDialog: React.ReactNode;
  profileDialog: React.ReactNode;
}

function InnerApp({
  sidebar,
  widgetPanel,
  map,
  searchButton,
  toaster,
  searchDialog,
  profileDialog,
}: AppProps) {
  const setSearchDialogOpen = useSearchDialogStore(
    (state) => state.setSearchDialogOpen,
  );
  const toggleSidebar = useLayoutStore((state) => state.toggleSidebar);

  useHotkey("k", true, () => setSearchDialogOpen(true));
  useHotkey("b", true, () => toggleSidebar());

  return (
    <div className="flex h-full w-full">
      {sidebar}
      <main className="grow flex">
        {widgetPanel}
        {map}
      </main>
      {searchButton}
      {toaster}
      {searchDialog}
      {profileDialog}
    </div>
  );
}

const App = () => {
  return (
    <InnerApp
      sidebar={<Sidebar />}
      widgetPanel={<WidgetPanel />}
      map={<MapWrapper />}
      searchButton={<SearchButton asMapWidget />}
      toaster={<Toaster />}
      searchDialog={<SearchDialog />}
      profileDialog={<ProfileDialog />}
    />
  );
};

export default App;
