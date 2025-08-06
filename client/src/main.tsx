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
import { AboutUs } from "./pages/About_club/AboutUs";
import About_layout from "./layout/about/about_layout";
import Event_page from "./pages/Event/Event";


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
  path: "/about-us",
  component: About_layout,
});
const Aboutclubroute = createRoute({
  getParentRoute: () => AboutUsroute,
  path: "/about-club",
  component: AboutUs,
});
const Event_pagerout = createRoute({
  getParentRoute: () => rootrouter,
  path: "/Events",
  component:Event_page,
});

const routeTree = rootrouter.addChildren([
  Homeroute,
  AboutUsroute.addChildren([Aboutclubroute]),
  Event_pagerout,
]);
const router = createRouter({ routeTree });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
