import { createBrowserRouter } from "react-router";
import AuthUi from "../modules/login/Login.ui";
import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "./AppLayout";

const Router = createBrowserRouter([
    {
        path: "/login",
        element: <AuthUi />
    },
    {
        path: "/",
        element: <ProtectedRoute><AppLayout /></ProtectedRoute>,
        children: [
            {path: "products", element: <div>Productos</div>}
        ]
    }
]);

export default Router;