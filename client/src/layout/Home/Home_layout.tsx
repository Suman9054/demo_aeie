import React from "react";
import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { Underline } from "../../components/underline/Underline";
import Footer from "../../components/Footer/Footer_layout";


export function Homelayout(): React.JSX.Element {
  const location = useLocation();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative">
      {/* Navbar */}
      <div className="flex items-center justify-center fixed w-4/5 z-50 py-3 px-6 bg-black/40 border border-white/10 rounded-2xl left-1/2 transform -translate-x-1/2 top-4 backdrop-blur-lg">
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
          <Link
            to="/login"
            className=" transition-transform duration-200 hover:scale-110 object-fit-contain"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-circle-user-round-icon lucide-circle-user-round"
            >
              <path d="M18 20a6 6 0 0 0-12 0" />
              <circle cx="12" cy="10" r="4" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Page Content */}

      <Outlet />

      <Footer />
    </div>
  );
}
