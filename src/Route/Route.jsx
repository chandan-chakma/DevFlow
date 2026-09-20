import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout/RootLayout.jsx";
import Home from "../pages/Home/Home.jsx";
import AuthLayout from "../layouts/AuthLayout/AuthLayout.jsx";
import Login from "../pages/Auth/Login/Login.jsx";
import Register from "../pages/Auth/Register/Register.jsx";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component:Home
            }
        ]
        
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: '/login',
                Component:Login
            },
            {
                path: '/register',
                Component:Register
            }
        ]
    }
])