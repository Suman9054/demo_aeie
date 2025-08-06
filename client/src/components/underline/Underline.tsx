import { motion } from "motion/react";
import React from "react";

export function Underline(): React.JSX.Element {
  return (
    <motion.div
      className="absolute   h-0.5 w-9 bg-gray-900 rounded-full"
      layoutId="underline"
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    />
  );
}
