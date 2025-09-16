import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { AppThemeProvider } from "./context/ThemeContext.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import { Toaster, toast } from "react-hot-toast";
import { useTheme } from "@mui/material/styles";

function ThemedToaster() {
  const theme = useTheme();

  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
        style: {
          fontSize: "0.95rem",
          borderRadius: "8px",
          padding: "12px 16px",
          color: theme.palette.getContrastText(theme.palette.background.paper),
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        },
        success: {
          style: {
            background: theme.palette.success.main,
            color: theme.palette.getContrastText(theme.palette.success.main),
          },
        },
        error: {
          style: {
            background: theme.palette.error.main,
            color: theme.palette.getContrastText(theme.palette.error.main),
          },
        },
        loading: {
          style: {
            background: theme.palette.info.main,
            color: theme.palette.getContrastText(theme.palette.info.main),
          },
        },
      }}
    >
      {(t) => (
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            animation: t.visible
              ? "slideIn 0.3s ease-out"
              : "slideOut 0.4s ease-in forwards",
          }}
        >
          {/* Toast message */}
          <span>{t.message}</span>

          {/* Close (X) button */}
          <button
            onClick={() => toast.dismiss(t.id)}
            style={{
              border: "none",
              background: "transparent",
              color: "inherit",
              fontSize: "1.1rem",
              cursor: "pointer",
              fontWeight: "bold",
              padding: "0 4px",
            }}
          >
            ✕
          </button>

          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              height: "3px",
              width: "100%",
              background: theme.palette.common.white,
              opacity: 0.7,
              animation: "progressBar 3s linear forwards",
            }}
          />

          <style>
            {`
              @keyframes slideIn {
                from { transform: translateX(120%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
              }
              @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(120%); opacity: 0; }
              }
              @keyframes progressBar {
                from { width: 100%; }
                to { width: 0%; }
              }
            `}
          </style>
        </div>
      )}
    </Toaster>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppThemeProvider>
        <CssBaseline />
        <AuthProvider>
          <App />
          <ThemedToaster />
        </AuthProvider>
      </AppThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);