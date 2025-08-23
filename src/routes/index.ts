import App from "@/App";
import About from "@/pages/About";
import Login from "@/pages/auth/Login";
import SignUp from "@/pages/auth/Register";
import Contact from "@/pages/Contact";
import ErrorPage from "@/pages/ErrorPage";
import Features from "@/pages/Features";

import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router";

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
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: SignUp,
  },
]);
