import { createBrowserRouter } from "react-router";
import AuthUi from "../modules/login/Login.ui";
import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "./AppLayout";
import ProductsUI from "../modules/products/Products.ui.page";
import DiscountsUI from "../modules/discounts/Discounts.ui.page";
import ProtectedRoleRoute from "./ProtectedRoleRoute";
import OrdersUI from "../modules/orders/Orders.ui.page";

const Router = createBrowserRouter([
    {
        path: "/login",
        element: <AuthUi />
    },
    {
        path: "/",
        element: <ProtectedRoute><AppLayout /></ProtectedRoute>,
        children: [
            {path: "products", element: <ProtectedRoleRoute allowedRoles={["GESTOR"]}><ProductsUI /></ProtectedRoleRoute>},
            {path: "discounts", element: <ProtectedRoleRoute allowedRoles={["GESTOR"]}><DiscountsUI /></ProtectedRoleRoute>},
            {path: "orders", element: <ProtectedRoleRoute allowedRoles={["VENDEDOR"]}><OrdersUI /></ProtectedRoleRoute>},
        ]
    }
]);

export default Router;