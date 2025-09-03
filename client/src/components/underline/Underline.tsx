import { motion } from "motion/react";
import React from "react";
interface wate {
  w: string;
}

export function Underline({ w }: wate): React.JSX.Element {
  return (
    <motion.div
      className={`absolute   h-0.5 ${w} bg-orange-400 rounded-full`}
      layoutId="underline"
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    />
  );
}
