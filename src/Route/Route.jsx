import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout/RootLayout.jsx";
import Home from "../pages/Home/Home.jsx";

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
        
    }
])