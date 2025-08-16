import React from "react";
import { Link, Outlet, useLocation } from "@tanstack/react-router";
import Footer from "./Footer_layout";

export function Homelayout(): React.JSX.Element {
  const location = useLocation();

  return (
    <div className="min-h-screen w-full  text-white flex flex-col justify-between">
      {/* Navbar */}
      <div className="sticky top-0 bg-blue-700 z-50">
        <nav className="flex justify-center items-center gap-8 py-3 px-10">
          <Link
            to="/"
            className="relative font-medium text-gray-300 transition-transform duration-300 hover:text-white hover:scale-110"
            aria-current={location.pathname === "/" ? "page" : undefined}
          >
            Home
            {location.pathname === "/" && (
              <span className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-teal-400 transition-all duration-300 ease-in-out scale-x-100 origin-left" />
            )}
          </Link>
          <Link
            to="/Events"
            className="relative font-medium text-gray-300 transition-transform duration-300 hover:text-white hover:scale-110"
            aria-current={location.pathname === "/Events" ? "page" : undefined}
          >
            Event
            {location.pathname === "/Events" && (
              <span className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-teal-400 transition-all duration-300 ease-in-out scale-x-100 origin-left" />
            )}
          </Link>
          <Link
            to="/Study"
            className="relative font-medium text-gray-300 transition-transform duration-300 hover:text-white hover:scale-110"
            aria-current={location.pathname === "/Study" ? "page" : undefined}
          >
            Study
            {location.pathname === "/Study" && (
              <span className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-teal-400 transition-all duration-300 ease-in-out scale-x-100 origin-left" />
            )}
          </Link>
          <Link
            to="/about-us"
            className="relative font-medium text-gray-300 transition-transform duration-300 hover:text-white hover:scale-110"
            aria-current={location.pathname === "/about-us" ? "page" : undefined}
          >
            About
            {location.pathname === "/about-us" && (
              <span className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-teal-400 transition-all duration-300 ease-in-out scale-x-100 origin-left" />
            )}
          </Link>
          <Link
            to="/contactUs"
            className="relative font-medium text-gray-300 transition-transform duration-300 hover:text-white hover:scale-110"
            aria-current={location.pathname === "/contactUs" ? "page" : undefined}
          >
            Contact us
            {location.pathname === "/contactUs" && (
              <span className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-teal-400 transition-all duration-300 ease-in-out scale-x-100 origin-left" />
            )}
          </Link>
        </nav>
      </div>

      {/* Page Content */}
      <div className="min-h-screen pt-0 bg-gradient-to-br from-blue-400 via-indigo-900 to-blue-950 text-white overflow-hidden relative">
        <Outlet />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
