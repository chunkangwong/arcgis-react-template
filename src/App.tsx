import { MapWrapper } from "./components/MapWrapper";
import { SearchButton } from "./components/SearchButton";
import { SearchDialog } from "./components/SearchDialog";
import { Sidebar } from "./components/Sidebar";
import { WidgetSidebar } from "./components/WidgetSidebar";
import { Toaster } from "./components/ui/sonner";

interface AppProps {
  widgetSidebar: React.ReactNode;
  sidebar: React.ReactNode;
  map: React.ReactNode;
  searchButton: React.ReactNode;
  toaster: React.ReactNode;
  searchDialog: React.ReactNode;
}

function InnerApp({
  widgetSidebar,
  sidebar,
  map,
  searchButton,
  toaster,
  searchDialog,
}: AppProps) {
  return (
    <div className="flex h-full w-full">
      {widgetSidebar}
      {sidebar}
      {map}
      {searchButton}
      {toaster}
      {searchDialog}
    </div>
  );
}

const App = () => {
  return (
    <InnerApp
      widgetSidebar={<WidgetSidebar />}
      sidebar={<Sidebar />}
      map={<MapWrapper />}
      searchButton={<SearchButton asMapWidget />}
      toaster={<Toaster />}
      searchDialog={<SearchDialog />}
    />
  );
};

export default App;
