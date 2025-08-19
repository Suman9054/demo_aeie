import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useState } from "react";

interface Image {
  src: string;
  alt?: string;
  id: number;
  about?: string;
}

interface SlideshowProps {
  images: Image[];
}

export const Slideshow: React.FC<SlideshowProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-advance slider (pauses when hovered)
  useEffect(() => {
    if (isHovered) return; // Don't start timer if hovered

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [images.length, isHovered]);

  return (
    <div className="relative w-80 h-80 md:w-96 md:h-96">
      <div className="absolute inset-0 w-150 absolute -bottom-7 left-1/2 transform -translate-x-1/2 p-2">
        <motion.div
          className="relative w-full h-full rounded-lg overflow-hidden bg-gray-900"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          {/* Slideshow content */}
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              className="w-full h-full object-cover rounded-lg border-none"
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </AnimatePresence>

          {/* Blur overlay that slides up from bottom */}
          <motion.div
            className="absolute inset-0 rounded-lg flex items-center justify-center pointer-events-none backdrop-blur-md bg-black/10 bg-opacity-40"
            initial={{ y: "100%" }}
            animate={{ y: isHovered ? "0%" : "100%" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <motion.div
              className="text-white text-xl font-bold text-center px-6 select-none"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: isHovered ? 1 : 0.8,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3, delay: isHovered ? 0.2 : 0 }}
            >
              {images[currentIndex].about || "View Image"}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Navigation dots */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-pink-400 w-6" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
