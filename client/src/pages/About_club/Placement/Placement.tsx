import React from "react";
import { motion } from "framer-motion";

const recruiters = [
  "TCS",
  "Infosys",
  "Wipro",
  "Accenture",
  "Tech Mahindra",
  "Cognizant",
  "Capgemini",
  "Tata Steel",
];

const stats = [
  { label: "AEIE Placement Rate", value: "92%" },
  { label: "Median Package (AEIE)", value: "₹5 LPA" },
  { label: "Average Package", value: "₹5–6 LPA" },
];

export function Placement(): React.JSX.Element {
  return (
    <main className="flex-1 w-full px-4 py-15 md:px-10 lg:px-16 text-gray-100">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto space-y-10"
      >
        {/* Hero */}
        <header className="space-y-3">

          <h1 className="text-2xl md:text-3xl font-semibold text-white">
            Shaping careers in Electronics, Instrumentation & Automation
          </h1>
          <p className="text-sm md:text-base text-gray-300 max-w-3xl">
            The Department of Applied Electronics & Instrumentation Engineering maintains a
            strong track record in campus placements. Our curriculum, labs, and industry
            collaborations prepare students for roles in core engineering domains as well
            as software and analytics.
          </p>
        </header>

        {/* Stats row */}
        <section className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.03 }}
              className="rounded-2xl border border-emerald-500/30 bg-slate-900/60 px-4 py-5 shadow-sm"
            >
              <p className="text-xs uppercase tracking-wide text-emerald-200 mb-1">
                {stat.label}
              </p>
              <p className="text-xl md:text-2xl font-semibold text-white">
                {stat.value}
              </p>
            </motion.div>
          ))}
        </section>

        {/* Narrative + highlights */}
        <section className="grid gap-8 md:grid-cols-[1.4fr,1fr] items-start">
          <div className="space-y-4 text-sm md:text-base text-gray-200">
            <h2 className="text-lg font-semibold text-white mb-1">Why recruiters choose AEIE graduates</h2>
            <p>
              Students from AEIE are trained in control systems, automation, embedded systems,
              signal processing, industrial instrumentation and power electronics. This mix of
              hardware and software exposure makes them suitable for a wide range of roles in
              core industries as well as IT.
            </p>
            <p>
              The department organizes regular workshops, industrial visits, and project-based
              courses which build confidence and problem-solving skills. Final-year projects
              are often done in collaboration with industry or research labs.
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1 text-gray-300">
              <li>Dedicated departmental placement coordinator and faculty mentors</li>
              <li>Soft-skill and aptitude training in collaboration with the Training & Placement Cell</li>
              <li>Alumni network in PSU, core industries and multinational companies</li>
            </ul>
          </div>

          {/* Recruiters card */}
          <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-white mb-3">
              Some of our regular recruiters
            </h3>
            <div className="flex flex-wrap gap-2">
              {recruiters.map((name) => (
                <span
                  key={name}
                  className="rounded-full bg-slate-800 px-3 py-1 text-[11px] font-medium text-slate-100 border border-slate-600/80"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline-style note */}
        <section className="mt-4 rounded-2xl border border-slate-700 bg-slate-900/70 p-4 text-xs md:text-sm text-gray-300">
          <p className="font-semibold text-white mb-1">Internships & higher studies</p>
          <p>
            Many students also opt for internships and higher studies in reputed institutes.
            The department supports students with recommendation letters, project guidance and
            preparation for exams like GATE, GRE and other entrance tests.
          </p>
        </section>
      </motion.section>
    </main>
  );
}
