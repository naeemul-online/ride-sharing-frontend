import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Login from "@/pages/auth/Login";
import SignUp from "@/pages/auth/Register";
import Contact from "@/pages/Contact";
import ErrorPage from "@/pages/ErrorPage";
import Features from "@/pages/Features";

import { role } from "@/constant/role";
import Home from "@/pages/Home";
import Ride from "@/pages/Ride/Ride";
import type { TRole } from "@/types";
import { generateRoutes } from "@/utils/generateRoute";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { driverSidebarItems } from "./driverSidebarItems";
import { riderSidebarItems } from "./riderSidebarItems";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    ErrorBoundary: ErrorPage,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "features", Component: Features },
      { path: "contact", Component: Contact },
      { path: "faq", Component: Features },
    ],
  },
  {
    path: "/admin",
    Component: withAuth(DashboardLayout, role.admin as TRole),
    ErrorBoundary: ErrorPage,
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    path: "/rider",
    Component: withAuth(DashboardLayout, role.rider as TRole),
    ErrorBoundary: ErrorPage,
    children: [
      { index: true, element: <Navigate to="/rider/analytics" /> },
      ...generateRoutes(riderSidebarItems),
    ],
  },
  {
    path: "/driver",
    Component: withAuth(DashboardLayout, role.driver as TRole),
    ErrorBoundary: ErrorPage,
    children: [
      { index: true, element: <Navigate to="/driver/analytics" /> },
      ...generateRoutes(driverSidebarItems),
    ],
  },

  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/ride",
    Component: Ride,
  },
  {
    path: "/register",
    Component: SignUp,
  },
]);
