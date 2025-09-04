import { motion } from "framer-motion";

export default function HodMsg() {
  return (
    <motion.div
      className="min-h-screen  text-gray-200 p-20 bg-gradient-to-b from-white/5 to-transparent"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto pt-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <motion.img
            src="https://ik.imagekit.io/AEIE/aeie_media/hod%20sir.jpg?updatedAt=1754924385305"
            alt="HOD"
            className="w-full max-w-sm h-auto object-cover pt-20 rounded-bl-xl shadow-2xl"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />

          <motion.div
            className="flex-1"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.h2
              className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-yellow-300"
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Department of Applied Electronics & Instrumentation Engineering
            </motion.h2>

            <motion.h3
              className="text-lg md:text-xl lg:text-2xl font-semibold mb-6 text-blue-200"
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              Haldia Institute of Technology
            </motion.h3>

            <motion.p
              className="text-lg leading-relaxed mb-6 text-gray-100"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              Established in 1996, the AEIE Department at HIT specializes in
              instrumentation, control systems, and industrial automation.
              Following an Outcome-Based Education (OBE) approach, we integrate
              electronics, electrical engineering, and computer science
              principles.
            </motion.p>

            <motion.h4
              className="text-2xl font-bold mb-4 text-yellow-300"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              Key Highlights:
            </motion.h4>

            <motion.ul
              className="space-y-3 mb-6 text-gray-100"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              {[
                "State-of-the-art laboratories for embedded systems, PLC/SCADA, and industrial instrumentation",
                "Industry-aligned curriculum with hands-on projects",
                "Excellent placement opportunities in core and IT sectors",
                "Strong alumni network in global companies",
                "Regular industry visits and technical workshops",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-start"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 1.1 + index * 0.1 }}
                >
                  <span className="text-yellow-400 mr-3 mt-1">•</span>
                  <span className="text-lg leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.p
              className="text-lg leading-relaxed text-gray-100"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.6 }}
            >
              The department provides a comprehensive platform for aspiring
              engineers to build successful careers in instrumentation and
              automation, combining theoretical knowledge with practical,
              industry-ready skills through qualified faculty guidance and
              modern facilities.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
