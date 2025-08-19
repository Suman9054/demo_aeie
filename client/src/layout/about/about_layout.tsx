import React from "react";
import { Link, Outlet } from "@tanstack/react-router";

export default function About_layout(): React.JSX.Element {
  return (
    <div className="min-h-screen min-w-screen">
      <div className=" fixed w-20 h-96 bg-black/10  border border-white/10 rounded-2xl left-4 top-20 z-50 p-4">
        <div className=" flex flex-col gap-3 text-gray-400 pt-15 pr-4">
          <Link
            to="/about-us/aeie"
            className="font-mono  [&.active]:text-teal-500 "
          >
            {" "}
            AEIE
          </Link>

          <Link
            to="/about-us/faculty"
            className="font-mono  [&.active]:text-teal-500"
          >
            {" "}
            Faculty
          </Link>

          <Link
            to="/about-us/committee"
            className="font-mono  [&.active]:text-teal-500"
          >
            {" "}
            Tchnicalstuf
          </Link>

          <Link
            to="/about-us/about-club"
            className="font-mono  [&.active]:text-teal-500"
          >
            {" "}
            AEIE_HORIZON
          </Link>

          <Link
            to="https://hit-aeie.netlify.app/student_chapter"
            className="font-mono  [&.active]:text-teal-500"
          >
            {" "}
            ISA
          </Link>
          <Link
            to="/about-us/club"
            className="font-mono  [&.active]:text-teal-500"
          >
            {" "}
            Placement
          </Link>
        </div>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
