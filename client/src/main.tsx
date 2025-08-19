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
import Committee from "./pages/About_club/aboutSections/Committee";


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
const About_layout = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about-us",
  component: AboutUs,
});
const aboutUsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/club",
  component: AboutUs,
});


// Events page

const Event_pagerout = createRoute({
  getParentRoute: () => rootRoute,
  path: "/Events",
  component: Event_page,
});

// HOD message page
const hodMsgRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/HodMsg",
  component: HodMsg,
});
// Committee page
const CommitteeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/Committee',
  component: Committee,
});
// Contact Page


// Build route tree

const routeTree = rootRoute.addChildren([
  homeRoute,
  About_layout.addChildren([aboutUsRoute, CommitteeRoute]),
  Event_pagerout,
  hodMsgRoute,

]);

// Create router
const router = createRouter({ routeTree });

// Mount React app
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
