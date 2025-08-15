import React from "react";

// TypeScript interface for Professor
interface Professor {
  id: number;
  name: string;
  qualification: string;
  designation: string;
  fieldsOfResearch: string[];
  image: string;
  department: string;
}

// Data
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
  // ... You can paste the rest here unchanged (except trimming field names)
];

// Props interface for card
interface ProfessorCardProps {
  professor: Professor;
}

// Individual Card
const ProfessorCard: React.FC<ProfessorCardProps> = ({ professor }) => {
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
const ProfessorCards: React.FC = () => {
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
        {professorsData.map((professor) => (
          <ProfessorCard key={professor.id} professor={professor} />
        ))}
      </div>
    </div>
  );
};

export default ProfessorCards;
