import { MapWrapper } from "./components/MapWrapper";
import { SearchButton } from "./components/SearchButton";
import { SearchDialog } from "./components/SearchDialog";
import { Sidebar } from "./components/Sidebar";
import { WidgetPanel } from "./components/WidgetPanel";
import { Toaster } from "./components/ui/sonner";

interface AppProps {
  sidebar: React.ReactNode;
  widgetPanel: React.ReactNode;
  map: React.ReactNode;
  searchButton: React.ReactNode;
  toaster: React.ReactNode;
  searchDialog: React.ReactNode;
}

function InnerApp({
  sidebar,
  widgetPanel,
  map,
  searchButton,
  toaster,
  searchDialog,
}: AppProps) {
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
    />
  );
};

export default App;
