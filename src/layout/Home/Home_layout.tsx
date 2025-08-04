import react, { useState } from "react";
import { Link, Outlet } from "@tanstack/react-router";
import { Underline } from "../../components/underline/Underline";
export function Homelayout(): react.JSX.Element {
  const [selectedTab, setSelectedTab] = useState(1);
  const handleTabClick = (tabIndex: number) => {
    setSelectedTab(tabIndex);
  };
  return (
    <div className="min-h-screen min-w-screen">
      <div className="flex items-center justify-center fixed w-4/5 z-50 py-3 px-6  bg-black/10 border border-white/10 rounded-2xl left-1/2 transform -translate-x-1/2 top-4">
        <div className="flex  gap-4 text-gray-400">
          <Link
            to="/"
            className="font-mono  [&.active]:text-teal-500  "
            onClick={() => handleTabClick(1)}
          >
            {""}Home
            {selectedTab === 1 ? <Underline /> : null}
          </Link>
          <Link
            to="/Events"
            className="font-mono [&.active]:text-teal-500"
            onClick={() => handleTabClick(2)}
          >
            {""}Events
            {selectedTab === 2 ? <Underline /> : null}
          </Link>
          <Link
            to="/Study"
            className="font-mono [&.active]:text-teal-500"
            onClick={() => handleTabClick(3)}
          >
            {""}Study
            {selectedTab === 3 ? <Underline /> : null}
          </Link>
          <Link
            to="/about-us"
            className="font-mono [&.active]:text-teal-500"
            onClick={() => handleTabClick(4)}
          >
            {""}About
            {selectedTab === 4 ? <Underline /> : null}
          </Link>
          <Link
            to="/contectUs"
            className="font-mono [&.active]:text-teal-500"
            onClick={() => handleTabClick(5)}
          >
            {""}Contect us
            {selectedTab === 5 ? <Underline /> : null}
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
