"use client";

import { motion } from "framer-motion";

const staffMembers = [
  {
    name: "Mr. Saikat Karan",
    role: "Demonstrator",
    lab: "Process Control & Instrumentation Lab",
    image: "https://ik.imagekit.io/AEIE/aeie_media/saikat%20sir.jpg"
  },
  {
    name: "Mrs. Sutapa Maity",
    role: "Instructor",
    lab: "Microprocessor & Microcontroller Lab",
    image: "https://ik.imagekit.io/AEIE/aeie_media/sutapta%20mam.jpg"
  },
  {
    name: "Mrs. Subhra Pramanik Maiti",
    role: "Instructor",
    lab: "Electrical Machines & Drives Lab",
    image: "https://ik.imagekit.io/AEIE/aeie_media/subra%20mam.png"
  }, {
    name: " Mr. SovanLal Maity Jr. ",
    role: "Technician ",
    lab: "Digital  Lab",
    image: "https://ik.imagekit.io/AEIE/aeie_media/sovanlal%20sir.png"
  },
  {
    name: "Mr. Arindam Saha",
    role: "General Assistant",
    lab: "All Labs",
    image: "https://ik.imagekit.io/AEIE/aeie_media/atanu%20sir.jpg"
  }
];

export default function TechnicalStaff() {
  return (
    <main className="flex-1 w-full px-4 py-15 md:px-10 lg:px-16 text-gray-100">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto space-y-8"
      >
        <header className="space-y-3">

          <h1 className="text-2xl md:text-3xl font-semibold text-white">
            Backbone of our laboratories
          </h1>
          <p className="text-sm md:text-base text-gray-300 max-w-3xl">
            Our skilled technical staff ensures the smooth functioning of laboratories,
            supports students during practical sessions and helps faculty in conducting
            experiments, projects and workshops.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          {staffMembers.map((member) => (
            <motion.div
              key={member.name}
              whileHover={{ y: -4, scale: 1.02 }}
              className="rounded-2xl border border-slate-700 bg-slate-900/70 p-4 shadow-sm flex flex-col justify-between min-h-[150px]"
            >
              <motion.img
                src={member.image}
                alt={member.name}
                className="w-16 h-16  object-cover mb-4"
                whileHover={{ scale: 1.05 }}
              />
              <div>
                <p className="text-sm font-semibold text-white">{member.name}</p>
                <p className="mt-1 text-xs text-sky-300">{member.role}</p>
                <p className="mt-2 text-[11px] text-slate-300">{member.lab}</p>
              </div>
              <p className="mt-3 text-[11px] text-slate-400">
                Supports lab sessions, equipment maintenance and project demonstrations.
              </p>
            </motion.div>
          ))}
        </section>

        <section className="rounded-2xl border border-slate-700 bg-slate-900/70 p-4 text-xs md:text-sm text-gray-300">
          <p>
            Technical staff also assist in maintaining safety standards, inventory management
            and calibration of instruments. Their contribution ensures that students get
            reliable, hands-on exposure to real-world equipment.
          </p>
        </section>
      </motion.section>
    </main>
  );
}
