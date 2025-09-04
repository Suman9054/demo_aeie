

import React from "react";
import { motion,  } from "framer-motion";
import type{ Variants } from "framer-motion";

interface Professor {
  id: number;
  name: string;
  qualification: string;
  designation: string;
  fieldsOfResearch: string[];
  image: string;
  department: string;
}

const professorsData: Professor[] = [
  {
    id: 1,
    name: "Prof.Dr. Uday Maji",
    qualification: "PhD (Tech), M.Tech, B. Tech",
    designation: "Professor & Head of Department",
    fieldsOfResearch: [
      "Digital Electronics",
      "Microprocessor and Microcontroller",
      "Digital Signal Processing",
      "Biomedical Signal Processing",
    ],
    image:
      "https://images.unsplash.com/photo-1494790108755-2616c6d5b2be?w=300&h=300&fit=crop&crop=face",
    department: "Applied Electronics and Instrumentation Engineering",
  },
  {
    id: 2,
    name: "Mr. Debadatta Ghosh",
    qualification: "M.Tech, B.Tech, B.Sc (Hons.)",
    designation: "Associate Professor",
    fieldsOfResearch: [
      "Analog Electronics",
      "Electrical & Electronics Measurement",
      "Power Electronics",
      "Digital Signal Processing",
    ],
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    department: "Applied Electronics and Instrumentation Engineering",
  },
];

// Animation variants
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1], // cubic-bezier (easeInOut)
    },
  },
};

const ProfessorCard: React.FC<{ professor: Professor }> = ({ professor }) => {
  return (
    <motion.div
      className="relative group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-105 overflow-hidden border border-gray-200 hover:border-blue-300 cursor-pointer"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />

      {/* Card Content */}
      <div className="relative p-6 z-10">
        <div className="flex justify-center mb-4">
          <motion.img
            src={professor.image}
            alt={professor.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            whileHover={{ scale: 1.1, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </div>

        <h3 className="text-xl font-bold text-gray-800 text-center mb-2 group-hover:text-blue-600 transition-colors duration-300">
          {professor.name}
        </h3>

        <p className="text-sm text-gray-600 text-center mb-2">{professor.designation}</p>
        <p className="text-xs text-gray-500 text-center mb-3">{professor.qualification}</p>

        <div className="flex flex-wrap justify-center gap-2">
          {professor.fieldsOfResearch.map((field, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
            >
              {field}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function ProfessorsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-12">
        Meet Our Professors
      </h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {professorsData.map((professor) => (
          <ProfessorCard key={professor.id} professor={professor} />
        ))}
      </div>
    </div>
  );
}
