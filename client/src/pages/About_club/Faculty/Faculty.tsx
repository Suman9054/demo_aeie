import React from "react";
import { motion,  } from "framer-motion";
import { GraduationCap, Mail, Linkedin, BookOpen, Sparkles } from "lucide-react";
import type{ Variants } from "framer-motion";

// --- Types ---
interface Professor {
  id: number;
  name: string;
  qualification: string;
  designation: string;
  fieldsOfResearch: string[];
  image: string;
  department: string;
}

// --- Data ---
const professorsData: Professor[] = [
  {
    id: 1,
    name: "Prof. Dr. Uday Maji",
    qualification: "PhD (Tech), M.Tech, B. Tech",
    designation: "Professor & Head of Department",
    fieldsOfResearch: [
      "Digital Electronics",
      "Microprocessor",
      "Digital Signal Processing",
      "Biomedical Signals",
    ],
    image: "https://ik.imagekit.io/AEIE/aeie_media/hod%20sir.jpg?updatedAt=1754924385305",
    department: "Applied Electronics and Instrumentation Engineering",
  },
  {
    id: 2,
    name: "Mr. Debadatta Ghosh",
    qualification: "M.Tech, B.Tech, B.Sc (Hons.)",
    designation: "Associate Professor",
    fieldsOfResearch: [
      "Analog Electronics",
      "Measurement Systems",
      "Power Electronics",
      "Signal Processing",
    ],
    image: "https://ik.imagekit.io/AEIE/aeie_media/dg_20sir.jpg?updatedAt=1755281954881",
    department: "Applied Electronics and Instrumentation Engineering",
  },
  {
    id: 3,
    name: "Dr. Soumya Roy",
    qualification: "PhD (Engg.), M.Tech, B.E",
    designation: "Assistant Professor",
    fieldsOfResearch: [
      "Astrophysical Signal Processing",
      "Embedded Systems",
      "Microprocessor & Microcontroller",
    ],
    image: "https://ik.imagekit.io/AEIE/aeie_media/soumya_20roy.jpg?updatedAt=1755282391825",
    department: "Applied Electronics and Instrumentation Engineering",
  },
  {
    id: 4,
    name: "Dr. Asim Halder",
    qualification: "PhD (Tech), M.Tech, B.Tech",
    designation: "Assistant Professor",
    fieldsOfResearch: [
      "Analog Electronics",
      "Field Theory",
      "Linear Control Theory",
      "Nonlinear Control System"
    ],
    image: "https://ik.imagekit.io/AEIE/aeie_media/asim_20sir.jpg?updatedAt=1755282354543",
    department: "Applied Electronics and Instrumentation Engineering",
  },
  {
    id: 5,
    name: "Dr. Madhumita Das",
    qualification: "PhD (Engg.), M.Tech, B.Tech",
    designation: "Assistant Professor",
    fieldsOfResearch: [
      "Digital Signal Processing",
      "Image Processing",
      "Machine Learning",
      "Embedded Systems"
    ],
    image: "https://ik.imagekit.io/AEIE/aeie_media/madhumita_20mam.jpg?updatedAt=1755282390675",
    department: "Applied Electronics and Instrumentation Engineering",
  },
  {
    id: 6,
    name: "Dr. Moumita Sahoo",
    qualification: "PhD (Tech), M.Tech, B.Tech",
    designation: "Assistant Professor",
    fieldsOfResearch: [
      "Circuit Theory",
      "Measurement",
      "Digital Signal Processing and Medical Image Processing"
     
    ],
    image: "https://ik.imagekit.io/AEIE/aeie_media/maumita_20mam.gif?updatedAt=1755282308537",
    department: "Applied Electronics and Instrumentation Engineering",
  },
  {
    id: 7,
    name: "Mr. Rohan Mandal",
    qualification: "M.Tech, B. Tech",
    designation: "Assistant Professor",
    fieldsOfResearch: [
      "Biomedical signal Processing",
      "Sensors and Transducers",
      "Power Electronics",
      
    ],
    image: "https://ik.imagekit.io/AEIE/aeie_media/rohan_20sir.jpg?updatedAt=1755282287946",
    department: "Applied Electronics and Instrumentation Engineering",
  },
  {
    id: 8,
    name: "Mr. Priyonko Das",
    qualification: "M.Tech, B.Tech",
    designation: "Assistant Professor",
    fieldsOfResearch: [
      "Biomedical Instrumentation",
      "Networking",
      "Image Processing",
    ],
    image: "https://ik.imagekit.io/AEIE/aeie_media/priyanko_20sir.jpg?updatedAt=1755282263659",
    department: "Applied Electronics and Instrumentation Engineering",
  },
  {
    id: 9,
    name: "Dr. Somak Karan",
    qualification: "PhD (Tech), M.Tech, B.Tech",
    designation: "Assistant Professor",
    fieldsOfResearch: [
      "Process Control",
      "Power Plant Instrumentation",
      "Advanced Process Control",
    ],
    image: "https://ik.imagekit.io/AEIE/aeie_media/somak_20sir.jpg?updatedAt=1755282240620",
    department: "Applied Electronics and Instrumentation Engineering",
  },
  {
    id: 10,
    name: "Dr. Saorabh Kumar Mondal",
    qualification: "PhD (Engg.), M.Tech, B.Tech",
    designation: "Assistant Professor",
    fieldsOfResearch: [
      "Image Processing",
      "Digital Electronics",
      "Microprocessor & Microcontroller",
    ],
    image: "https://ik.imagekit.io/AEIE/aeie_media/saurabh_20sir.png?updatedAt=1755282220710",
    department: "Applied Electronics and Instrumentation Engineering",
  },
  {
    id: 11,
    name: "Mrs. Sweta Bijali Maity",
    qualification: "M.Tech, B.Tech",
    designation: "Assistant Professor",
    fieldsOfResearch: [
      "Basic Electronics",
      "Renewable Energy",
      
    ],
    image: "https://ik.imagekit.io/AEIE/aeie_media/sweta_20mam.png?updatedAt=1755282200052",
    department: "Applied Electronics and Instrumentation Engineering",
  },
  {
    id: 12,
    name: "Mrs. Priyanka Rakshit Sarkar",
    qualification: "M.Tech, B.Tech",
    designation: "Assistant Professor",
    fieldsOfResearch: [
      "Basic Electronics",
      " Industrial Instrumentation",
    ],
    image: "https://ik.imagekit.io/AEIE/aeie_media/priyanka_20mam.jpg?updatedAt=1755282178094",
    department: "Applied Electronics and Instrumentation Engineering",
  }




];

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 50, damping: 15 },
  },
};

// --- Background Components ---
const GridPattern = () => (
  <svg
    className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 mask-[radial-gradient(100%_100%_at_top_right,white,transparent)] dark:stroke-gray-800/50"
    aria-hidden="true"
  >
    <defs>
      <pattern
        id="grid-pattern"
        width={40}
        height={40}
        x="50%"
        y={-1}
        patternUnits="userSpaceOnUse"
      >
        <path d="M.5 40V.5H40" fill="none" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" strokeWidth={0} fill="url(#grid-pattern)" />
  </svg>
);

const BackgroundOrbs = () => (
  <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen opacity-30 animate-blob" />
    <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen opacity-30 animate-blob animation-delay-2000" />
    <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen opacity-30 animate-blob animation-delay-4000" />
  </div>
);

// --- Main Card Component ---
const ProfessorCard: React.FC<{ professor: Professor }> = ({ professor }) => {
  return (
    <motion.div
      variants={cardVariants}
      className="group relative w-full h-full"
    >
      {/* Card Container */}
      <div className="relative h-full overflow-hidden rounded-3xl border border-white/20 bg-white/70 backdrop-blur-xl dark:bg-slate-900/60 dark:border-white/10 shadow-xl transition-all duration-500 hover:shadow-indigo-500/20 hover:-translate-y-2">
        
        {/* Top Decorative Banner */}
        <div className="h-24 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-90 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Image Container */}
        <div className="flex justify-center -mt-12 px-6">
          <motion.div 
            className="relative rounded-full p-1.5 bg-white dark:bg-slate-900 shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-indigo-100 dark:border-indigo-900">
               <img
                src={professor.image}
                alt={professor.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            {/* Status Indicator */}
            <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-4 border-white dark:border-slate-900 rounded-full z-10" title="Active Faculty" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 pt-4 text-center">
          
          {/* Name & Role */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {professor.name}
          </h3>
          <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2">
            {professor.designation}
          </p>
          
          {/* Qualifications */}
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-6 bg-slate-100 dark:bg-slate-800/50 py-1.5 px-3 rounded-full mx-auto w-fit">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{professor.qualification}</span>
          </div>

          <div className="w-full h-px bg-linear-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700 mb-4" />

          {/* Research Fields */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Research Focus
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {professor.fieldsOfResearch.map((field, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800/50 transition-all hover:bg-indigo-100 dark:hover:bg-indigo-900/50 cursor-default"
                >
                  {field}
                </span>
              ))}
            </div>
          </div>

          {/* Action Footer (Visual Only) */}
          <div className="flex justify-center gap-4 pt-2">
             <SocialBtn icon={<Mail size={16} />} label="Email" />
             <SocialBtn icon={<Linkedin size={16} />} label="LinkedIn" />
             <SocialBtn icon={<BookOpen size={16} />} label="Publications" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SocialBtn = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <button className="p-2 rounded-full text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-400 transition-all duration-200" title={label}>
    {icon}
  </button>
);

export default function ProfessorsPage() {
  return (
    <div className="relative min-h-screen w-full bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <GridPattern />
      <BackgroundOrbs />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-2">
            <Sparkles size={14} />
            <span>World-Class Faculty</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Meet Our <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-pink-600">Professors</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Pioneering research and shaping the future of Electronics & Instrumentation Engineering through excellence in teaching and innovation.
          </p>
        </motion.div>

        {/* Grid Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-start"
        >
          {professorsData.map((professor) => (
            <ProfessorCard key={professor.id} professor={professor} />
          ))}
          
          {/* Placeholder for layout demonstration (Optional) */}
           {/* <div className="hidden lg:flex items-center justify-center w-full h-full min-h-[400px] border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-3xl text-slate-400 text-sm font-medium">
             Join our Faculty
           </div> */}
        </motion.div>
      </div>
    </div>
  );
}