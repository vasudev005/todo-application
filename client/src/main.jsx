import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./index.css";

import ErrorBoundary from "./components/common/ErrorBoundary";

import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { TaskProvider } from "./contexts/TaskContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <ErrorBoundary>
        <ThemeProvider>
          <AuthProvider>
            <TaskProvider>

              <App />

              <Toaster
                position="top-right"
                toastOptions={{
                  style: {
                    borderRadius: "18px",
                    padding: "14px 16px",
                  },
                }}
              />

            </TaskProvider>
          </AuthProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </HashRouter>
  </React.StrictMode>
);