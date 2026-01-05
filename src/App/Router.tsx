import { createBrowserRouter } from "react-router";
import AuthUi from "../modules/auth/Auth.ui";
import ProtectedRoute from "./ProtectedRoute";

const Router = createBrowserRouter([
    {
        path: "/login",
        element: <AuthUi />
    },
    {
        path: "/",
        element: <ProtectedRoute><h1>Home Protected</h1></ProtectedRoute>
    }
]);

export default Router;