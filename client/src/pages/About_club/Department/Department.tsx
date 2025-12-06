import type { JSX } from "react";
import { motion } from "framer-motion";

export default function Department(): JSX.Element {
  return (
    <div className=" max-w-screen text justify-center items-center   p-20">
      <motion.h2
        className="text-2xl font-bold mb-4 text-center text-amber-300"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Department of Applied Electronics and Instrumentation Engineering
      </motion.h2>

      <motion.p
        className="leading-relaxed text-gray-300 px-4 md:px-20 text-justify mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        The Department of Applied Electronics and Instrumentation Engineering at
        Haldia Institute of Technology (HIT), established in 1996, is a
        forward-looking academic unit committed to producing skilled
        professionals in the fields of instrumentation, control systems, and
        industrial automation. The department follows an Outcome-Based Education
        (OBE) structure...
      </motion.p>

      <br />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2 overflow-clip overflow-x-hidden"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {[
          {
            title: "Vision",
            text: "To become a dynamic contributor to the community by ensuring excellence...",
          },
          {
            title: "Mission",
            text: `M1: To produce quality engineering graduates...
                   M2: To add a skill-set such as communication parameter...
                   M3: To ensure the capability of work in a team effectively...`,
          },
          {
            title: "Program Outcomes (POs)",
            text: "To become a dynamic contributor to the community by ensuring excellence...",
          },
          {
            title: "Program Education Objectives (PEOs)",
            text: `PEO 1: To impart technical competency...
                   PEO 2: To prepare students for successful careers...
                   PEO 3: To frame the mindset to enhance technical knowledge...
                   PEO 4: To develop the ability to function effectively...
                   PEO 5: To fulfill the needs of society...`,
          },
          {
            title: "Program Specific Outcomes (PSOs)",
            text: `PSO 1: Able to develop a strong foundation in STEM...
                   PSO 2: Able to implement a range of instrumentation engineering...
                   PSO 3: Able to extend electronics and instrumentation engineering...`,
          },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            className="bg-blue-400/20 text-white p-6 rounded-xl shadow-lg text-center"
            variants={{
              hidden: { opacity: 0, scale: 0.8, y: 50 },
              visible: {
                opacity: 1,
                scale: 1,
                y: 0,
                transition: { duration: 0.6, ease: "easeOut" },
              },
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h2 className="text-xl font-bold mb-2">{item.title}</h2>
            <p className="text-sm leading-relaxed whitespace-pre-line">
              {item.text}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
