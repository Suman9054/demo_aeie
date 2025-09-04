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
import Department from "./pages/About_club/Department/Department";
import ProfessorsPage from "./pages/About_club/Faculty/Faculty";
import TechnicalStaff from "./pages/About_club/Technicalstuf/TechnicalStaff";
import { Placement } from "./pages/About_club/Placement/Placement";
import MediaClub from "./pages/About_club/mediaclub/MediaClub";
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

const AEIEROute = createRoute({
  getParentRoute:()=> aboutRoute,
  path:"/",
  component:Department,
});

const FacultyRoute = createRoute({
  getParentRoute:()=> aboutRoute,
  path:"/Faculty",
  component:ProfessorsPage
});

const TechnicalStafRoute = createRoute({
  getParentRoute:()=>aboutRoute,
  path:"/Technicalstaf",
  component:TechnicalStaff
});

const PlacementRoute = createRoute({
 getParentRoute:()=>aboutRoute,
 path:"/Placement",
 component:Placement
});

const MediaclubRoute = createRoute({
  getParentRoute:()=> aboutRoute,
  path:"/Mediaclub",
  component:MediaClub
});



const Event_pagerout = createRoute({
  getParentRoute: () => rootRoute,
  path: "/Events",
  component: Event_page,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  Event_pagerout,
  aboutRoute.addChildren([AEIEROute,FacultyRoute,TechnicalStafRoute,PlacementRoute,MediaclubRoute]),
]);

const router = createRouter({ routeTree });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
