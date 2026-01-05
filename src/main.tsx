import { createRoot } from "react-dom/client";
import { AuthProvider } from "./modules/auth/Auth.provider";
import { RouterProvider } from "react-router-dom";
import Router from "./App/Router";


createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <RouterProvider router={Router} />
  </AuthProvider>
);
