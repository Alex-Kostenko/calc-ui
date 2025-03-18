import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { store } from "@store/store.ts";
import { Provider } from "react-redux";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js").then(() => {
    console.log("Service Worker Registered");
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
