import App from "@/App";
import About from "@/pages/About";
import Login from "@/pages/auth/Login";
import SignUp from "@/pages/auth/Register";
import Driver from "@/pages/driver/Driver";

import Home from "@/pages/Home";
import Ride from "@/pages/Ride/Ride";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: "ride", Component: Ride },
      { path: "drive", Component: Driver },
      { path: "about", Component: About },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: SignUp,
  },
]);
