import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

import { Homelayout } from "./layout/Home/Home_layout";
import { Homepage } from "./pages/home/Home";
import Event_page from "./pages/Event/Event";
import About_layout from "./layout/about/about_layout";
import "./index.css";
const rootRoute = createRootRoute({
  component: Homelayout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Homepage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about-us",
  component: About_layout,
});

const Event_pagerout = createRoute({
  getParentRoute: () => rootRoute,
  path: "/Events",
  component: Event_page,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  Event_pagerout,
  aboutRoute,
]);

const router = createRouter({ routeTree });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
