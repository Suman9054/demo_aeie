import React from "react";

// TypeScript interface for Committee
interface Committee {
  id: number;
  name: string;
  qualification: string;
  designation: string;
  fieldsOfResearch: string[];
  image: string;
  department: string;
}

// Data
const CommitteeData: Committee[] = [
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
      "https://ik.imagekit.io/AEIE/aeie_media/hod%20sir.jpg?updatedAt=1754924385305",
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
      "https://ik.imagekit.io/AEIE/aeie_media/dg_20sir.jpg?updatedAt=1755281954881",
    department: "Applied Electronics and Instrumentation Engineering",
  },
  {
    id: 3,
    name: "Dr. Soumya Roy",
    qualification: "PhD (Engg.), M.Tech, B.E",
    designation: "Associate Professor",
    fieldsOfResearch: ["Astrophysical Signal Processing", "Embedded System", "Microprocessor & Microcontroller"],
    image: "https://ik.imagekit.io/AEIE/aeie_media/soumya_20roy.jpg?updatedAt=1755282391825",
    department: "Applied Electronics and Instrumentation Engineering"
  },
  {
    id: 4,
    name: "Dr. Asim Halder",
    qualification: "PhD (Tech), M.Tech, B.Tech",
    designation: "Associate Professor",
    fieldsOfResearch: ["Analog Electronics", "Field Theory", "Linear Control Theory", "Nonlinear Control System"],
    image: "https://ik.imagekit.io/AEIE/aeie_media/asim_20sir.jpg?updatedAt=1755282354543",
    department: "Applied Electronics and Instrumentation Engineering"
  },
  {
    id: 5,
    name: "Dr. Madhumita Das",
    qualification: "PhD (Engg.), M.Tech, B.Tech",
    designation: "Assistant Professor",
    fieldsOfResearch: ["Solar Photovoltaics", "Control Theory", "Electrical & Electronics Measurement"],
    image: "https://ik.imagekit.io/AEIE/aeie_media/madhumita_20mam.jpg?updatedAt=1755282390675",
    department: "Applied Electronics and Instrumentation Engineering"
  },
  {
    id: 6,
    name: "Dr. Moumita Sahoo",
    qualification: "PhD (Tech), M.Tech, B.Tech",
    designation: "Assistant Professor",
    fieldsOfResearch: [" Circuit Theory", "Measurement", "Digital Signal Processing", "Medical Image Processing"],
    image: "https://ik.imagekit.io/AEIE/aeie_media/maumita_20mam.gif?updatedAt=1755282308537",
    department: "Applied Electronics and Instrumentation Engineering"
  },
  {
    id: 7,
    name: "Mr. Rohan Mandal",
    qualification: "M.Tech, B. Tech",
    designation: "Assistant Professor",
    fieldsOfResearch: ["Biomedical signal Processing", "Sensors and Transducers", "Power Electronics"],
    image: "https://ik.imagekit.io/AEIE/aeie_media/rohan_20sir.jpg?updatedAt=1755282287946",
    department: "Applied Electronics and Instrumentation Engineering"
  },
  {
    id: 8,
    name: "Mr. Priyonko Das",
    qualification: "M.Tech, B.Tech",
    designation: "Assistant Professor",
    fieldsOfResearch: ["Biomedical Instrumentation", "Networking", "Image Processing"],
    image: "https://ik.imagekit.io/AEIE/aeie_media/priyanko_20sir.jpg?updatedAt=1755282263659",
    department: "Applied Electronics and Instrumentation Engineering"
  },
  {
    id: 9,
    name: "Dr. Somak Karan",
    qualification: "PhD (Tech), M.Tech, B.Tech",
    designation: "Assistant Professor",
    fieldsOfResearch: ["Process Control", "Power Plant Instrumentation", "Advanced Process Control"],
    image: "https://ik.imagekit.io/AEIE/aeie_media/somak_20sir.jpg?updatedAt=1755282240620",
    department: "Applied Electronics and Instrumentation Engineering"
  },
  {
    id: 10,
    name: "Dr. Saorabh Kumar Mondal",
    qualification: "PhD (Engg.), M.Tech, B.Tech",
    designation: "Assistant Professor",
    fieldsOfResearch: ["Image Processing", "Digital Electronics", "Microprocessor & Microcontroller"],
    image: "https://ik.imagekit.io/AEIE/aeie_media/saurabh_20sir.png?updatedAt=1755282220710",
    department: "Applied Electronics and Instrumentation Engineering"
  },
  {
    id: 11,
    name: "Mrs. Sweta Bijali Maity",
    qualification: "M.Tech, B.Tech",
    designation: "Assistant Professor",
    fieldsOfResearch: ["Basic Electronics", "Renewable Energy"],
    image: "https://ik.imagekit.io/AEIE/aeie_media/sweta_20mam.png?updatedAt=1755282200052",
    department: "Applied Electronics and Instrumentation Engineering"
  },
  {
    id: 12,
    name: "Mrs. Priyanka Rakshit Sarkar",
    qualification: "M.Tech, B.Tech",
    designation: "Assistant Professor",
    fieldsOfResearch: ["Basic Electronics", "Industrial Instrumentation"],
    image: "https://ik.imagekit.io/AEIE/aeie_media/priyanka_20mam.jpg?updatedAt=1755282178094",
    department: "Applied Electronics and Instrumentation Engineering"
  }
];

// Props interface for card
interface CommitteeCardProps {
  professor: Committee;
}

// Individual Card
const CommitteeCard: React.FC<CommitteeCardProps> = ({ professor }) => {
  return (
    <div
      className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl 
                 transition-all duration-300 ease-in-out transform hover:-translate-y-2 
                 hover:scale-105 overflow-hidden border border-gray-200 
                 hover:border-blue-300 cursor-pointer"
    >
      {/* Background hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Card Content */}
      <div className="relative p-6 z-10">
        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          <img
            src={professor.image}
            alt={`${professor.name} - ${professor.designation}`}
            loading="lazy"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/placeholder.png";
            }}
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg 
                       group-hover:scale-110 group-hover:border-blue-300 transition-all duration-300"
          />
        </div>

        {/* Name */}
        <h3 className="text-xl font-bold text-gray-800 text-center mb-2 group-hover:text-blue-600 transition-colors duration-300">
          {professor.name}
        </h3>

        {/* Department */}
        <div className="text-center mb-3">
          <span className="inline-block text-xs font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full group-hover:bg-purple-200 transition-colors duration-300">
            {professor.department}
          </span>
        </div>

        {/* Designation */}
        <div className="text-center mb-4">
          <p className="text-sm font-semibold text-white bg-blue-500 py-2 px-4 rounded-full group-hover:bg-blue-600 transition-colors duration-300">
            {professor.designation}
          </p>
        </div>

        {/* Qualification */}
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <h4 className="text-sm font-semibold text-gray-700">Qualification</h4>
          </div>
          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg group-hover:bg-gray-100 transition-colors duration-300">
            {professor.qualification}
          </p>
        </div>

        {/* Research Fields */}
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
            <h4 className="text-sm font-semibold text-gray-700">Research Fields</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {professor.fieldsOfResearch.map((field) => (
              <span
                key={`${professor.id}-${field}`}
                className="text-xs font-medium bg-purple-100 text-purple-700 px-2 py-1 rounded-full group-hover:bg-purple-200 group-hover:text-purple-800 transition-colors duration-300"
              >
                {field.trim()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main component
const CommitteeCards: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
          Meet Our{" "}
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-pulse">
            Distinguished Faculty
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Our professors are world-renowned experts and researchers, bringing
          cutting-edge knowledge and decades of industry experience to shape the
          next generation of innovators.
        </p>
        <div className="mt-8 flex justify-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-1 w-24 rounded-full" />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 place-items-center">
        {CommitteeData.map((Committee) => (
          <CommitteeCard key={Committee.id} professor={Committee} />
        ))}
      </div>
    </div>
  );
};

export default CommitteeCards;
