import react, { useState } from "react";
import { Link, Outlet } from "@tanstack/react-router";
import { motion } from "motion/react";
export function Homelayout(): react.JSX.Element {
  const [selectedTab, setSelectedTab] = useState(1);
  const handleTabClick = (tabIndex: number) => {
    setSelectedTab(tabIndex);
  };
  return (
    <div className="">
      <div className="flex justify-around fixed top-0 left-0 right-0 z-50 flexjustify-between py-6 px-8 bg-gradient-to-r from-purple-900/80 via-indigo-900/80 to-blue-900/80 backdrop-blur-md border-b border-white/10">
        <div className="flex justify-start ">
          <span className="">HIT AEIE</span>
        </div>
        <div className="flex  gap-4 text-gray-400">
          <Link
            to="/"
            className="font-mono  [&.active]:text-teal-500  "
            onClick={() => handleTabClick(1)}
          >
            {""}Home
            {selectedTab === 1 ? (
              <motion.div
                className="absolute   h-0.5 w-9 bg-gray-900 rounded-full"
                layoutId="underline"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            ) : null}
          </Link>
          <Link
            to="/Events"
            className="font-mono [&.active]:text-teal-500"
            onClick={() => handleTabClick(2)}
          >
            {""}Events
            {selectedTab === 2 ? (
              <motion.div
                className="absolute   h-0.5 w-13 bg-gray-900 rounded-full"
                layoutId="underline"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            ) : null}
          </Link>
          <Link
            to="/Study"
            className="font-mono [&.active]:text-teal-500"
            onClick={() => handleTabClick(3)}
          >
            {""}Study
            {selectedTab === 3 ? (
              <motion.div
                className="absolute   h-0.5 w-9 bg-gray-900 rounded-full"
                layoutId="underline"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            ) : null}
          </Link>
          <Link
            to="/AboutUs"
            className="font-mono [&.active]:text-teal-500"
            onClick={() => handleTabClick(4)}
          >
            {""}About
            {selectedTab === 4 ? (
              <motion.div
                className="absolute   h-0.5 w-10 bg-gray-900 rounded-full"
                layoutId="underline"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            ) : null}
          </Link>
          <Link
            to="/contectUs"
            className="font-mono [&.active]:text-teal-500"
            onClick={() => handleTabClick(5)}
          >
            {""}Contect us
            {selectedTab === 5 ? (
              <motion.div
                className="absolute   h-0.5 w-23 bg-gray-900 rounded-full"
                layoutId="underline"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            ) : null}
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
