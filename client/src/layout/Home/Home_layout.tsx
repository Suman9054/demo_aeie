import React from "react";
import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { Underline } from "../../components/underline/Underline";

export function Homelayout(): React.JSX.Element {
  const location = useLocation();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-950 to-black ">
      {/* Navbar */}
      <div className="flex items-center justify-center fixed w-4/5 z-50 py-3 px-6 bg-black/50 border border-white/10 rounded-2xl left-1/2 transform -translate-x-1/2 top-4 backdrop-blur-lg ">
        <div className="flex gap-4 text-gray-400">
          <Link
            to="/"
            className="font-mono [&.active]:text-teal-500 transition-transform duration-200 hover:scale-110"
          >
            Home
            {location.pathname === "/" ? <Underline w="w-9" /> : null}
          </Link>
          <Link
            to="/events"
            className="font-mono [&.active]:text-teal-500 transition-transform duration-200 hover:scale-110"
          >
            Event
            {location.pathname === "/events" ? <Underline w="w-11" /> : null}
          </Link>
          <Link
            to="/"
            className="font-mono [&.active]:text-teal-500 transition-transform duration-200 hover:scale-110"
          >
            Study
            {location.pathname === "/study" ? <Underline w="w-10" /> : null}
          </Link>
          <Link
            to="/about-us"
            className="font-mono [&.active]:text-teal-500 transition-transform duration-200 hover:scale-110"
          >
            About
            {location.pathname === "/about-us" ? <Underline w="w-11" /> : null}
          </Link>
          <Link
            to="/contactUs"
            className="font-mono [&.active]:text-teal-500 transition-transform duration-200 hover:scale-110"
          >
            Contact us
            {location.pathname === "/contactUs" ? <Underline w="w-22" /> : null}
          </Link>
          <Link
            to="/user"
            className=" transition-transform duration-200 hover:scale-110 object-fit-contain"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-circle-user-round-icon lucide-circle-user-round"
            >
              <path d="M18 20a6 6 0 0 0-12 0" />
              <circle cx="12" cy="10" r="4" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </Link>
        </div>
      </div>

      <Outlet />
    </div>
  );
}
