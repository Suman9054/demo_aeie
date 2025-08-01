import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

export const Homepage: React.FC = () => {
  interface particleArray {
    id: number;
    left: number;
    delay: number;
    duration: number;
  }

  const [particles, setParticles] = useState<particleArray[]>([]);
  const text = "Welcome!";
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Time between each character
      },
    },
  };
  const letterVariants = {
    hidden: { opacity: 0, y: `0.25em` },
    visible: {
      opacity: 1,
      y: `0em`,
    },
  };

  useEffect(() => {
    // Generate particles
    const particleArray = [];
    for (let i = 0; i < 20; i++) {
      particleArray.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 4,
      });
    }
    setParticles(particleArray);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-950 text-white overflow-hidden relative">
      {/* Animated particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-0.5 h-0.5 bg-pink-400 rounded-full opacity-60"
          initial={{ y: 0, opacity: 0.6 }}
          animate={{ y: -window.innerHeight, opacity: 0 }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
          style={{
            left: `${particle.left}%`,
            bottom: 0,
          }}
        />
      ))}

      <div className="flex items-center justify-between px-8 md:px-16 py-16 max-w-7xl mx-auto min-h-screen">
        <div className="flex-1 max-w-lg z-10">
          <div className="text-4xl md:text-6xl font-bold mb-8 leading-tight pt-6">
            <motion.span
              className="text-pink-400 font-mono font-bold text-5xl md:text-7xl block mb-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {text.split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
            <span className="text-white text-4xl md:text-6xl">to AEIE</span>
          </div>

          <p className="text-gray-200 text-lg mb-8 leading-relaxed">
            Something extraordinary is brewing. We're crafting a revolutionary
            platform that will transform how you experience digital innovation.
            Get ready for cutting-edge technology, seamless design, and features
            that haven't been seen before.
          </p>
        </div>
      </div>
    </div>
  );
};
