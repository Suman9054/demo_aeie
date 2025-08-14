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
import AboutUs from "./pages/About_club/AboutUs";
import Event_page from "./pages/Event/Event";
import HodMsg from "./pages/Hod/HodMsg";

// Root layout route
const rootRoute = createRootRoute({
  component: Homelayout,
});

// Home page
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Homepage,
});

// About Us page
const aboutUsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about-us",
  component: AboutUs,
});


// Events page

const Event_pagerout = createRoute({
  getParentRoute: () => rootrouter,
  path: "/Events",
  component: Event_page,
});

// HOD message page
const hodMsgRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/hod-message",
  component: HodMsg,
});


// Build route tree

const routeTree = rootrouter.addChildren([
  Homeroute,
  AboutUsroute.addChildren([Aboutclubroute]),
  Event_pagerout,
  HodMsgRoute,

]);

// Create router
const router = createRouter({ routeTree });

// Mount React app
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
