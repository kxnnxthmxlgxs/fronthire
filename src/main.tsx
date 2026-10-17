import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ApplicationsProvider from "./context/ApplicationsProvider";
import "./index.css";
import AppRoutes from "./routes/AppRoutes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ApplicationsProvider>
        <AppRoutes />
      </ApplicationsProvider>
    </BrowserRouter>
  </StrictMode>,
);