import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout/RootLayout.jsx";
import Home from "../pages/Home/Home.jsx";
import AuthLayout from "../layouts/AuthLayout/AuthLayout.jsx";
import Login from "../pages/Auth/Login/Login.jsx";
import Register from "../pages/Auth/Register/Register.jsx";
import Projects from "../pages/DashBoard/Projects/Projects.jsx";
import DashBoardLayout from '../layouts/DashBoardLayout/DashBoardLayout.jsx'
import DashBoardHome from '../pages/DashBoard/DashBoardHome/DashBoardHome.jsx'
import Tasks from "../pages/DashBoard/Tasks/Tasks.jsx";
import Team from "../pages/DashBoard/Team/Team.jsx";
import Calendar from "../pages/DashBoard/Calendar/Calendar.jsx";
import Analytics from "../pages/DashBoard/Analytics/Analytics.jsx";
import Settings from "../pages/DashBoard/Settings/Settings.jsx";

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
    },

    {
        path: '/dashboard',
        Component: DashBoardLayout,
        children: [
            {
                index: true,
                Component: DashBoardHome
            },
            {
                path: '/dashboard/projects',
                Component: Projects
            },
            {
                path: '/dashboard/tasks',
                Component:Tasks
            },
            {
                path: '/dashboard/team',
                Component:Team
            },
            {
                path: '/dashboard/calendar',
                Component:Calendar
            },
            {
                path: '/dashboard/analytics',
                Component:Analytics
            },
            {
                path: '/dashboard/settings',
                Component:Settings
            }
        ]
    }
])