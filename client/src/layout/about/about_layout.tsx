import React from "react";
import { Link, Outlet } from "@tanstack/react-router";

export default function About_layout(): React.JSX.Element {
  return (
    <div className="min-h-screen min-w-screen">
      <div className=" fixed w-20 h-96 bg-black/10  border border-white/10 rounded-2xl left-4 top-20 z-50 p-4">
        <div className=" flex flex-col gap-3 text-gray-400 pt-15 pr-4">
          <div className="flex">
            <Link
              to="/about-us/aeie"
              className="font-mono  [&.active]:text-teal-500 "
            >
              {" "}
              AEIE
            </Link>
          </div>

          <div className="flex">
            <Link
              to="/about-us/faculty"
              className="font-mono  [&.active]:text-teal-500"
            >
              {" "}
              Faculty
            </Link>
          </div>

          <div className="flex">
            <Link
              to="/about-us/about-club"
              className="font-mono  [&.active]:text-teal-500"
            >
              {" "}
              Club
            </Link>
          </div>
          <div className="flex">
            <Link
              to="https://hit-aeie.netlify.app/student_chapter"
              className="font-mono  [&.active]:text-teal-500"
            >
              {" "}
              ISA
            </Link>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
