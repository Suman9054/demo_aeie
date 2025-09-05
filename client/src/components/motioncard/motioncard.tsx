import React, { useState } from "react";
import { motion } from "framer-motion";
import type { TargetAndTransition } from "framer-motion";

interface Stats {
  label: string;
  value: string;
}
type XY = "x" | "y";
interface CardProps {
  title: string;
  icon: string;
  stats: Stats[];
  bgColor: string;
  textColor: string;
  description: string;
  xy: XY;
}

export const Mcard = ({
  title,
  xy,
  icon,
  description,
  stats,
  bgColor,
  textColor,
}: CardProps): React.JSX.Element => {
  const [isHovered, setIsHovered] = useState(false);
  const internalaimaton: TargetAndTransition = {
    opacity: 0,
    [xy]: 40,
  };

  const animation: TargetAndTransition = {
    opacity: 1,
    [xy]: 0,
  };

  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl backdrop-blur-md border border-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 cursor-pointer ${bgColor} min-h-[280px] w-80 p-6`}
      initial={internalaimaton}
      whileInView={animation}
      transition={{ delay: 0.5, duration: 0.7 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />

      <div className="relative z-10 h-full flex flex-col">
        <div className="mb-4">
          <div
            className={`text-4xl mb-3 ${textColor} transition-transform duration-300 ${
              isHovered ? "scale-110" : ""
            }`}
          >
            {icon}
          </div>
          <h3 className={`text-2xl font-bold ${textColor} capitalize`}>
            {title}
          </h3>
        </div>

        <p className="text-white/80 text-sm mb-6 flex-grow leading-relaxed">
          {description}
        </p>

        <div className="space-y-2">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex justify-between items-center text-white/70 text-sm"
            >
              <span>{stat.label}</span>
              <span className={`font-semibold ${textColor}`}>{stat.value}</span>
            </div>
          ))}
        </div>

        <div
          className={`absolute bottom-4 right-4 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full ${textColor.replace(
              "text-",
              "bg-",
            )} flex items-center justify-center`}
          >
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
