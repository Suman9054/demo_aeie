import { motion } from "framer-motion";

interface CardProps {
  title: string;
  shortText: string;
  fullText: string;
  imageUrl: string;
}

export function HoverCard({ title, shortText, fullText, imageUrl }: CardProps) {
  return (
    <motion.div
      initial={{ width: "20rem", height: "24rem" }} // Initial size
      whileHover={{
        width: "80vw",  // 80% of screen width
        height: "80vh", // 80% of screen height
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="group relative overflow-hidden rounded-2xl shadow-lg cursor-default mx-auto"
    >
      {/* Image */}
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-500"></div>

      {/* Content */}
      <div className="relative z-10 p-5 flex flex-col justify-end h-full text-white">
        <h2 className="text-3xl font-bold mb-2">{title}</h2>

        {/* Short text */}
        <p className="text-base transition-opacity duration-500 group-hover:opacity-0">
          {shortText}
        </p>

        {/* Full text */}
        <p className="absolute bottom-5 left-5 right-5 text-base opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {fullText}
        </p>
      </div>
    </motion.div>
  );
}
