import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Homelayout } from "./layout/Home/Home_layout";
import { Homepage } from "./pages/home/Home";
import { AboutUs } from "./pages/home/AboutUs";

const rootrouter = createRootRoute({
  component: Homelayout,
});
const Homeroute = createRoute({
  getParentRoute: () => rootrouter,
  path: "/",
  component: Homepage,
});

const AboutUsroute = createRoute({
  getParentRoute: () => rootrouter,
  path: "/AboutUs",
  component: AboutUs,
});

const routeTree = rootrouter.addChildren([Homeroute,AboutUsroute]);
const router = createRouter({ routeTree });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
