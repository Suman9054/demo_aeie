import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Code, 
  FileText, 
  X, 
  Download, 
  ChevronRight, 
  Database, 
  Layout, 
  Server, 
  Globe, 
  Cpu,
  GraduationCap
} from 'lucide-react';

// --- Types ---
interface Resource {
  title: string;
  size: string;
  url: string; // In a real app, this would be the PDF link
}

interface StudyNode {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: React.ElementType;
  color: string;
  bgGradient: string;
  resources: Resource[];
}

// --- Mock Data ---
const studyPathData: StudyNode[] = [
  {
    id: '1',
    title: 'Foundations of Web',
    shortDescription: 'HTML5 semantic structure & CSS3 fundamentals.',
    fullDescription: 'Begin your journey by mastering the building blocks of the web. This module covers semantic HTML tags for accessibility and SEO, followed by the styling power of CSS3, including Flexbox and Grid layouts.',
    icon: Layout,
    color: 'text-orange-500',
    bgGradient: 'from-orange-50 to-orange-100',
    resources: [
      { title: 'HTML5 Cheatsheet.pdf', size: '2.4 MB', url: '#' },
      { title: 'Modern CSS Layouts Guide.pdf', size: '3.1 MB', url: '#' },
      { title: 'Accessibility Best Practices.pdf', size: '1.2 MB', url: '#' },
    ]
  },
  {
    id: '2',
    title: 'JavaScript Mastery',
    shortDescription: 'ES6+ syntax, DOM manipulation, and async programming.',
    fullDescription: 'Dive deep into the language of the web. Learn modern ES6+ syntax, understand the Event Loop, master DOM manipulation without frameworks, and handle asynchronous operations using Promises and Async/Await.',
    icon: Code,
    color: 'text-yellow-500',
    bgGradient: 'from-yellow-50 to-yellow-100',
    resources: [
      { title: 'The Modern JS Handbook.pdf', size: '5.6 MB', url: '#' },
      { title: 'Async/Await Deep Dive.pdf', size: '1.8 MB', url: '#' },
    ]
  },
  {
    id: '3',
    title: 'Frontend Frameworks',
    shortDescription: 'Component architecture with React & State Management.',
    fullDescription: 'Scale your applications using React. Understand the Virtual DOM, component lifecycle, Hooks (useState, useEffect, useMemo), and manage complex state with Context API or Redux.',
    icon: Globe,
    color: 'text-blue-500',
    bgGradient: 'from-blue-50 to-blue-100',
    resources: [
      { title: 'React Hooks Reference.pdf', size: '2.2 MB', url: '#' },
      { title: 'Component Patterns.pdf', size: '4.0 MB', url: '#' },
      { title: 'State Management Strategies.pdf', size: '3.5 MB', url: '#' },
    ]
  },
  {
    id: '4',
    title: 'Backend Logic',
    shortDescription: 'Node.js runtime, Express servers, and APIs.',
    fullDescription: 'Move to the server-side. Learn how Node.js works, build RESTful APIs using Express, handle authentication with JWTs, and structure your backend for scalability and security.',
    icon: Server,
    color: 'text-green-500',
    bgGradient: 'from-green-50 to-green-100',
    resources: [
      { title: 'Node.js Architecture.pdf', size: '3.8 MB', url: '#' },
      { title: 'REST API Standards.pdf', size: '2.5 MB', url: '#' },
    ]
  },
  {
    id: '5',
    title: 'Database Design',
    shortDescription: 'SQL vs NoSQL, schema design, and ORMs.',
    fullDescription: 'Data is the core of any application. Compare Relational (PostgreSQL) and Non-Relational (MongoDB) databases. Learn normalization, indexing strategies, and how to use Prisma or Mongoose.',
    icon: Database,
    color: 'text-purple-500',
    bgGradient: 'from-purple-50 to-purple-100',
    resources: [
      { title: 'SQL Injection Prevention.pdf', size: '1.5 MB', url: '#' },
      { title: 'Database Indexing Guide.pdf', size: '4.2 MB', url: '#' },
    ]
  },
  {
    id: '6',
    title: 'DevOps & Deployment',
    shortDescription: 'CI/CD pipelines, Docker containers, and Cloud.',
    fullDescription: 'Prepare for production. Containerize applications with Docker, set up CI/CD pipelines with GitHub Actions, and deploy to cloud platforms like AWS, Vercel, or DigitalOcean.',
    icon: Cpu,
    color: 'text-slate-600',
    bgGradient: 'from-slate-50 to-slate-100',
    resources: [
      { title: 'Docker for Beginners.pdf', size: '6.1 MB', url: '#' },
      { title: 'CI/CD Pipeline Checklist.pdf', size: '1.1 MB', url: '#' },
    ]
  }
];

// --- Components ---

const PDFLink = ({ resource }: { resource: Resource }) => (
  <button 
    className="group flex items-center justify-between w-full p-4 mb-3 bg-white border border-gray-200 rounded-xl hover:border-indigo-500 hover:shadow-md transition-all duration-200 text-left"
    onClick={() => alert(`Downloading ${resource.title}...`)}
  >
    <div className="flex items-center space-x-3">
      <div className="p-2 bg-red-50 text-red-500 rounded-lg group-hover:bg-red-100 transition-colors">
        <FileText size={20} />
      </div>
      <div>
        <p className="font-medium text-gray-800 group-hover:text-indigo-600 transition-colors">{resource.title}</p>
        <p className="text-xs text-gray-400">{resource.size}</p>
      </div>
    </div>
    <div className="text-gray-400 group-hover:text-indigo-600">
      <Download size={20} />
    </div>
  </button>
);

const Card = ({ 
  node, 
  index, 
  onClick 
}: { 
  node: StudyNode; 
  index: number; 
  onClick: (id: string) => void 
}) => {
  return (
    <div className="relative flex items-center mb-12 last:mb-0 group">
      {/* Timeline Line (Vertical) - Hidden for last item */}
      

      {/* Number/Icon Bubble */}
      

      {/* Card Content */}
      <div 
        onClick={() => onClick(node.id)}
        className="ml-6 grow cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
      >
        <div className={`p-6 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 bg-linear-to-br ${node.bgGradient} transition-all duration-300 relative overflow-hidden`}>
          
          {/* Decorative background shape */}
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-white opacity-20 rounded-full blur-xl" />

          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-2 py-1 text-xs font-bold tracking-wider text-gray-500 uppercase bg-white/50 rounded-md">
                  Module {index + 1}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{node.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{node.shortDescription}</p>
            </div>
            <div className="hidden sm:flex w-8 h-8 rounded-full bg-white/60 items-center justify-center text-gray-400">
              <ChevronRight size={20} />
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-black/5 flex items-center text-xs font-medium text-gray-500">
             <BookOpen size={14} className="mr-1.5" />
             {node.resources.length} Resources Available
          </div>
        </div>
      </div>
    </div>
  );
};

const ExpandedOverlay = ({ 
  node, 
  isOpen, 
  onClose 
}: { 
  node: StudyNode | null; 
  isOpen: boolean; 
  onClose: () => void 
}) => {
  if (!node) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
    >
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
        onClick={onClose}
      />

      {/* Modal Card */}
      <div 
        className={`bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl transform transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}
      >
        {/* Header Image/Gradient */}
        <div className={`h-32 sm:h-48 bg-linear-to-r ${node.bgGradient} relative overflow-hidden`}>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/10 hover:bg-black/20 text-black/60 rounded-full backdrop-blur-md transition-all"
          >
            <X size={20} />
          </button>
          
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white opacity-20 rounded-full blur-3xl" />
          
          <div className="absolute bottom-6 left-6 sm:left-8 flex items-end">
            <div className="bg-white p-3 rounded-xl shadow-lg text-gray-800">
              <node.icon size={32} className={node.color} />
            </div>
            <div className="ml-4 mb-1 text-white drop-shadow-md">
              <h2 className="text-3xl font-bold text-gray-900">{node.title}</h2>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <span className="w-1 h-6 bg-indigo-500 rounded-full mr-3"></span>
              Overview
            </h3>
            <p className="text-gray-600 leading-relaxed text-base">
              {node.fullDescription}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-1 h-6 bg-indigo-500 rounded-full mr-3"></span>
              Study Materials & PDFs
            </h3>
            <div className="space-y-2">
              {node.resources.map((resource, idx) => (
                <PDFLink key={idx} resource={resource} />
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
             <button 
                onClick={onClose}
                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
             >
               Close
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Study() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const activeNode = studyPathData.find(n => n.id === activeId) || null;

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveId(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen  font-sans selection:bg-indigo-100">
      
      {/* Header */}
      <header className=" sticky top-0 z-40 bg-opacity-80 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <GraduationCap size={24} />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Full Stack Path</h1>
          </div>
          <div className="text-sm font-medium text-gray-500">
            {studyPathData.length} Modules
          </div>
        </div>
      </header>

      {/* Main Timeline Container */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Learning Journey</h2>
          <p className="text-gray-600">Click on a module card to view details and download study materials.</p>
        </div>

        <div className="relative pl-4 sm:pl-0">
          {studyPathData.map((node, index) => (
            <Card 
              key={node.id} 
              node={node} 
              index={index} 
              onClick={setActiveId} 
            />
          ))}
        </div>

        <div className="mt-12 text-center">
            <div className="inline-flex items-center justify-center p-2 px-4 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                You are all caught up!
            </div>
        </div>
      </main>

      {/* Expanded View Overlay */}
      <ExpandedOverlay 
        node={activeNode} 
        isOpen={!!activeId} 
        onClose={() => setActiveId(null)} 
      />

    </div>
  );
}


