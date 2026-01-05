import { createRoot } from "react-dom/client";
import { AuthProvider } from "./providers/auth/Auth.provider";
import Router from "./App/Router";
import { RouterProvider } from "react-router";
import ThemeProvider from "./providers/theme/theme.provider";
import "./index.css";


createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <ThemeProvider>
      <RouterProvider router={Router} />
    </ThemeProvider>
  </AuthProvider>
);
