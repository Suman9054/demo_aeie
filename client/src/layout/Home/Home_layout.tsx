import React from "react";
import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { Underline } from "../../components/underline/Underline";
import Footer from "./Footer_layout";

export function Homelayout(): React.JSX.Element {
  const location = useLocation();

  return (
    <div className="min-h-screen w-full bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-yellow-700 via-cyan-950 to-slate-400 relative">
      {/* Navbar */}
      <div className="flex items-center justify-center fixed w-4/5 z-50 py-3 px-6 bg-black/10 border border-white/10 rounded-2xl left-1/2 transform -translate-x-1/2 top-4">
        <div className="flex gap-4 text-gray-400">
          <Link
            to="/"
            className="font-mono [&.active]:text-teal-500 transition-transform duration-200 hover:scale-110"
          >
            Home
            {location.pathname === "/" ? <Underline /> : null}
          </Link>
          <Link
            to="/Events"
            className="font-mono [&.active]:text-teal-500 transition-transform duration-200 hover:scale-110"
          >
            Event
            {location.pathname === "/Events" ? <Underline /> : null}
          </Link>
          <Link
            to="/Study"
            className="font-mono [&.active]:text-teal-500 transition-transform duration-200 hover:scale-110"
          >
            Study
            {location.pathname === "/Study" ? <Underline /> : null}
          </Link>
          <Link
            to="/about-us"
            className="font-mono [&.active]:text-teal-500 transition-transform duration-200 hover:scale-110"
          >
            About
            {location.pathname === "/about-us" ? <Underline /> : null}
          </Link>
          <Link
            to="/contactUs"
            className="font-mono [&.active]:text-teal-500 transition-transform duration-200 hover:scale-110"
          >
            Contact us
            {location.pathname === "/contactUs" ? <Underline /> : null}
          </Link>
        </div>
      </div>

      {/* Page Content */}
      
        <Outlet />
      
      <Footer />
    </div>
  );
}
