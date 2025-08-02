import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useState } from "react";

interface Image {
  src: string;
  alt?: string;
  id:number;
  about?: string;
}

interface SlideshowProps {
  images: Image[];
}

export const Slideshow: React.FC<SlideshowProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-80 h-80 md:w-96 md:h-96">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full p-2">
        <div className="w-full h-full rounded-full overflow-hidden bg-black/20">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              className="w-full h-full object-cover"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </AnimatePresence>
        </div>
      </div>
      
      {/* Navigation dots */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-pink-400 w-6' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
