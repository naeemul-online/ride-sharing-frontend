import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router/dom";
import { Toaster } from "./components/ui/sonner.tsx";
import "./index.css";
import { ThemeProvider } from "./providers/theme.provider.tsx";
import { store } from "./redux/store.ts";
import { router } from "./routes/index.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
        <Toaster richColors />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
