"use client";

import { motion } from "framer-motion";

export default function TechnicalStaff() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true }}
      className="p-4"
    >
      <p>
        Our skilled technical staff ensures the smooth functioning of
        laboratories and supports students during practical sessions.
      </p>
      <p className="mt-4">
        They play a vital role in maintaining equipment, troubleshooting issues,
        and assisting with project work.
      </p>
    </motion.div>
  );
}
