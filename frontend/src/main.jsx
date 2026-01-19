import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { PollProvider } from "./context/PollContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PollProvider>
          <App />
        </PollProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
