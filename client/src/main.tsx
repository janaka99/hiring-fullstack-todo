import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { TodoState } from "./context/todo-state.tsx";
import { Toaster } from "./components/ui/sonner.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <TodoState>
        <App />
        <Toaster position="top-center" />
      </TodoState>
    </BrowserRouter>
  </StrictMode>
);
