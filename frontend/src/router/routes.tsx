import { createBrowserRouter, RouteObject } from "react-router-dom";
import { Home } from "../pages/Home";
import Login from "../pages/Login";

const routes: RouteObject[] = [
    {
        path: "home",
        element: <Home />,
        children: [
            
        ]
    }
]

export const router = createBrowserRouter(routes);