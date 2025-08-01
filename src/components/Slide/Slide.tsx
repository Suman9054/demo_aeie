import { AnimatePresence, motion } from "motion/react";
import React from "react";

type SlideshowProps = {
  image: { src: string };
};

export const Slideshow: React.FC<SlideshowProps> = ({ image }) => (
  <AnimatePresence>
    <motion.img
      key={image.src}
      src={image.src}
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
    />
  </AnimatePresence>
);
