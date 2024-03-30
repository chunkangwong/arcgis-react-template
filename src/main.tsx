import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";

import { arcgisUser } from "./arcgis.ts";
import "./i18n.ts";
import "./index.css";
import { toggleDarkMode } from "./lib/utils.ts";

const init = async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });

  await arcgisUser.fetchCredential();

  toggleDarkMode(localStorage.theme === "dark");

  const { default: App } = await import("./App.tsx");

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </QueryClientProvider>,
  );
};

init();
