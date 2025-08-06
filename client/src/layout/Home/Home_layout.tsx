import react from "react";
import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { Underline } from "../../components/underline/Underline";
export function Homelayout(): react.JSX.Element {
  const location = useLocation();
  return (
    <div className="min-h-screen min-w-screen">
      <div className="flex items-center justify-center fixed w-4/5 z-50 py-3 px-6  bg-black/10 border border-white/10 rounded-2xl left-1/2 transform -translate-x-1/2 top-4">
        <div className="flex  gap-4 text-gray-400">
          <Link
            to="/"
            className="font-mono  [&.active]:text-teal-500  "
          >
            {""}Home
            {location.pathname === "/" ? <Underline /> : null}
          </Link>
          <Link
            to="/Events"
            className="font-mono [&.active]:text-teal-500"
          >
            {""}Event
            {location.pathname ==="/Events" ? <Underline /> : null}
          </Link>
          <Link
            to="/Study"
            className="font-mono [&.active]:text-teal-500"
          >
            {""}Study
            {location.pathname==="/Study" ? <Underline /> : null}
          </Link>
          <Link
            to="/about-us"
            className="font-mono [&.active]:text-teal-500"
          >
            {""}About
            {location.pathname === "/about-us"? <Underline /> : null}
          </Link>
          <Link
            to="/contectUs"
            className="font-mono [&.active]:text-teal-500"
          >
            {""}Contect us
            {location.pathname === "/contectUs" ? <Underline /> : null}
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
