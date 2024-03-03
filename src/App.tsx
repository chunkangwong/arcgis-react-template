import { Map } from "./components/Map";
import { SearchButton } from "./components/SearchButton";
import { Sidebar } from "./components/Sidebar";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <div className="flex h-full w-full">
      <Sidebar />
      <Map />
      <SearchButton asMapWidget />
      <Toaster />
    </div>
  );
}

export default App;
