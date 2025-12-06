import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
import { AuthLayout } from "./layout/Auth_layout/Auth_layout";
import LoginForm from "./pages/Auth/Login/Login";
import RegistrationForm from "./pages/Auth/Register/Register";
import { authverify } from "./utils/authverify/Authverify";
import UserPage from "./pages/userpage/user";
import AdminDashboard from "./pages/Admin/admin";
import Event_ from "./pages/event_/event_le";
import study from "./pages/study/study";

const queryClient = new QueryClient();

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
  getParentRoute: () => aboutRoute,
  path: "/",
  component: Department,
});

const FacultyRoute = createRoute({
  getParentRoute: () => aboutRoute,
  path: "/faculty",
  component: ProfessorsPage,
});

const TechnicalStafRoute = createRoute({
  getParentRoute: () => aboutRoute,
  path: "/technicalstaf",
  component: TechnicalStaff,
});

const PlacementRoute = createRoute({
  getParentRoute: () => aboutRoute,
  path: "/placement",
  component: Placement,
});

const MediaclubRoute = createRoute({
  getParentRoute: () => aboutRoute,
  path: "/mediaclub",
  component: MediaClub,
});

const Event_pagerout = createRoute({
  getParentRoute: () => rootRoute,
  path: "/events",
  component: Event_page,
});

const event_routes = createRoute({
  getParentRoute: () => rootRoute,
  path: "/events/$id",
  component: Event_,
});

const study_routes = createRoute({
  getParentRoute: () => rootRoute,
  path: "/study",
  component: study,
});

const AuthRootrout = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth",
  component: AuthLayout,
});

const LoginRoute = createRoute({
  getParentRoute: () => AuthRootrout,
  path: "/login",
  component: LoginForm,
  validateSearch: (s: { redirect?: string }) => s,
});

const RegistrationRoute = createRoute({
  getParentRoute: () => AuthRootrout,
  path: "/registr",
  component: RegistrationForm,
});

const userroute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/user",
  component: UserPage,
  beforeLoad: authverify,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminDashboard,
});
const routeTree = rootRoute.addChildren([
  homeRoute,
  Event_pagerout,
  aboutRoute.addChildren([
    AEIEROute,
    FacultyRoute,
    TechnicalStafRoute,
    PlacementRoute,
    MediaclubRoute,
  ]),
  AuthRootrout.addChildren([LoginRoute, RegistrationRoute]),
  userroute,
  adminRoute,
  event_routes,
  study_routes,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
