import { Map } from "./components/Map";
import { SearchButton } from "./components/SearchButton";
import { Sidebar } from "./components/Sidebar";
import { WidgetSidebar } from "./components/WidgetSidebar";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <div className="flex h-full w-full">
      <WidgetSidebar />
      <Sidebar />
      <Map />
      <SearchButton asMapWidget />
      <Toaster />
    </div>
  );
}

export default App;
