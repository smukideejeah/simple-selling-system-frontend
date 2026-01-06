import { createBrowserRouter } from "react-router";
import AuthUi from "../modules/login/Login.ui";
import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "./AppLayout";
import ProductsUI from "../modules/products/Products.ui.page";

const Router = createBrowserRouter([
    {
        path: "/login",
        element: <AuthUi />
    },
    {
        path: "/",
        element: <ProtectedRoute><AppLayout /></ProtectedRoute>,
        children: [
            {path: "products", element: <ProductsUI />},
        ]
    }
]);

export default Router;