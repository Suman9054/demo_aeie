import React, { useState, useEffect } from "react";
import {
  BookOpen,
  FileText,
  Download,
  ChevronRight,
  Database,
  Layout,
  Magnet,
  Server,
  Globe,
  Cpu,
  Book,
  ArrowRight,
} from "lucide-react";

// --- Types ---
interface Resource {
  title: string;
  url: string; // In a real app, this would be the PDF link
}

interface StudyNode {
  id: string;
  title: string;
  shortDescription: string;
  icon: React.ElementType;
  color: string;
  bgGradient: string;
  resources: Resource[];
}

// --- Mock Data ---
const studyPathData: StudyNode[] = [
  {
    id: "1",
    title: "Contrl System",
    shortDescription: "Dr. Asim Halder",

    icon: Layout,
    color: "text-orange-500",
    bgGradient: "from-orange-50 to-orange-100",
    resources: [
      {
        title: "Feed back in Control.pdf",
        url: " /documents/ah/controlsystem/FeedbackinControl",
      },
      { title: "Time.pdf", url: "/documents/ah/controlsystem/Z" },
      { title: "Z.pdf", url: "/documents/ah/controlsystem/time" },
    ],
  },
  {
    id: "2",
    title: "Syllabus of AEIE",
    shortDescription: "Syllabus for AEIE department .",

    icon: Book,
    color: "text-yellow-500",
    bgGradient: "from-yellow-50 to-yellow-100",
    resources: [{ title: "Syllabus.pdf", url: "/documents/syllabus" }],
  },
  {
    id: "3",
    title: "EM Theory",
    shortDescription: "Dr. Asim Halder",

    icon: Magnet,
    color: "text-blue-500",
    bgGradient: "from-blue-50 to-blue-100",
    resources: [
      { title: "Lecture1.pdf", url: "/documents/ah/emthory/Letcur1" },
      { title: "Lecture2.pdf", url: "/documents/ah/emthory/Letcur2" },
      { title: "Lecture3.pdf", url: "/documents/ah/emthory/Letcur3" },
      { title: "Lecture4.pdf", url: "/documents/ah/emthory/Letcur4" },
      { title: "Lecture5.pdf", url: "/documents/ah/emthory/Letcur5" },
      { title: "Lecture6.pdf", url: "/documents/ah/emthory/Letcur6" },
      { title: "Lecture7.pdf", url: "/documents/ah/emthory/Letcur7" },
      { title: "Lecture8.pdf", url: "/documents/ah/emthory/Letcur8" },
      { title: "Lecture9.pdf", url: "/documents/ah/emthory/Letcur9" },
      { title: "Lecture10.pdf", url: "/documents/ah/emthory/Letcur10" },
    ],
  },
  {
    id: "4",
    title: "Analog Electronics",
    shortDescription: "Mr. Debadatta Ghosh",

    icon: Cpu,
    color: "text-green-500",
    bgGradient: "from-green-50 to-green-100",
    resources: [
      { title: "bjt bias.pdf", url: "/documents/ddg/analogelectronis/bjtbias" },
      {
        title: "cliper clamper.pdf",
        url: "/documents/ddg/analogelectronis/clipperclamper",
      },
      {
        title: "diode characteristics.pdf",
        url: "/documents/ddg/analogelectronis/diodecharacteristics",
      },
      {
        title: "diode multiplier.pdf",
        url: "/documents/ddg/analogelectronis/diodemultiplyer",
      },
      {
        title: "diode rectifier.pdf",
        url: "/documents/ddg/analogelectronis/dioderectifiers",
      },
      {
        title: "Emitter Bias.pdf",
        url: "/documents/ddg/analogelectronis/emiterbias",
      },
      {
        title: "Feedback Amplifier.pdf",
        url: " /documents/ddg/analogelectronis/FeedbackAmplifier",
      },
      {
        title: "Feedback Oscillator.pdf",
        url: "/documents/ddg/analogelectronis/FeedbackOscillator",
      },
      {
        title: "Function generator.pdf",
        url: "/documents/ddg/analogelectronis/functiongenerator",
      },
      {
        title: "Introduction to intrigated Circuit.pdf",
        url: "/documents/ddg/analogelectronis/introductiontointegratedcircuits",
      },
      {
        title: "opamp a better insight.pdf",
        url: "/documents/ddg/analogelectronis/opamp_abetterinsight",
      },
      {
        title: "opamp applications nonlinear.pdf",
        url: "/documents/ddg/analogelectronis/opamp_applications_nonlinear",
      },
      {
        title: "Operational Amplifier.pdf",
        url: "/documents/ddg/analogelectronis/OperationalAmplifier",
      },
      {
        title: "Opamp with feedback.pdf",
        url: "/documents/ddg/analogelectronis/opamp_with_feedback",
      },
      {
        title: "Oscillator.pdf",
        url: "/documents/ddg/analogelectronis/Oscillator",
      },
      {
        title: "pn junction diode1.pdf",
        url: "/documents/ddg/analogelectronis/pn_junc_diode1",
      },
      {
        title: "pn junction diode2.pdf",
        url: "/documents/ddg/analogelectronis/pn_junc_diode2",
      },
      {
        title: "pn junction diode3.pdf",
        url: "/documents/ddg/analogelectronis/pn_junc_diode3",
      },
      {
        title: "Power Amplifier.pdf",
        url: "/documents/ddg/analogelectronis/PowerAmplifier",
      },
      {
        title: "semiconductor1.pdf",
        url: "/documents/ddg/analogelectronis/semiconductor1",
      },
      {
        title: "semiconductor2.pdf",
        url: "/documents/ddg/analogelectronis/semiconductor2",
      },
      {
        title: "some important conventions.pdf",
        url: "/documents/ddg/analogelectronis/SomeImportantconventions",
      },
      {
        title: "Stability Factor Analysis.pdf",
        url: "/documents/ddg/analogelectronis/StabilityFactorAnalysis",
      },
      {
        title: "Temperatur compensation.pdf",
        url: "/documents/ddg/analogelectronis/TEMPERATURECOMPENSATION",
      },
      {
        title: "Transistor Amplifier.pdf",
        url: "/documents/ddg/analogelectronis/TransistorAmplifier",
      },
      {
        title: "transistor fundamentals.pdf",
        url: "/documents/ddg/analogelectronis/transistorfundamentals",
      },
      {
        title: "Types of diodes.pdf",
        url: "/documents/ddg/analogelectronis/TypesofDiodes",
      },
      {
        title: "voltage regulator.pdf",
        url: "/documents/ddg/analogelectronis/voltage_regulator",
      },
      {
        title: "opamp hand book.pdf",
        url: "/documents/ddg/analogelectronis/op-amphandbook",
      },
      {
        title: "Semiconductor hand book.pdf",
        url: "/documents/ddg/analogelectronis/SEMICONDUCTORHANDBOOK",
      },
      {
        title: "smps basias.pdf",
        url: "/documents/ddg/analogelectronis/smps_basics",
      },
    ],
  },
  {
    id: "5",
    title: "Electric Machine",
    shortDescription: "Dr. Debdatta Ghosh",

    icon: Server,
    color: "text-purple-500",
    bgGradient: "from-purple-50 to-purple-100",
    resources: [
      {
        title: "amature reaction.pdf",
        url: "/documents/ddg/ElectricalMachine/armaturereaction",
      },
      {
        title: "back electromotive force.pdf",
        url: "/documents/ddg/ElectricalMachine/Backelectromotiveforce",
      },
      {
        title: "Cogging and crawling introduction.pdf",
        url: "/documents/ddg/ElectricalMachine/Coggingandcrawling_inductionmotors",
      },
      {
        title: "DC machines.pdf",
        url: "/documents/ddg/ElectricalMachine/DC-machines",
      },
      {
        title: "introduction motor1.pdf",
        url: "/documents/ddg/ElectricalMachine/inductionmotor1",
      },
      {
        title: "introduction motor2.pdf",
        url: "/documents/ddg/ElectricalMachine/inductionmotor2",
      },
      {
        title: "Lectue Transform.pdf",
        url: "/documents/ddg/ElectricalMachine/Lecture_Transformers",
      },
      {
        title: "short notes special machines.pdf",
        url: "/documents/ddg/ElectricalMachine/short_notes_specialmachines",
      },
      {
        title: "Three phase Star Delta.pdf",
        url: "/documents/ddg/ElectricalMachine/ThreePhaseStarDelta",
      },
    ],
  },
  {
    id: "6",
    title: "Power Electronics",
    shortDescription: "Dr. Debdatta Ghosh",

    icon: Cpu,
    color: "text-slate-600",
    bgGradient: "from-slate-50 to-slate-100",
    resources: [
      { title: "ac voltage controller.pdf", url: "/documents/ddg/PowerElectronics/ac_voltage_controller" },
      { title: "cycloconverter.pdf", url: "/documents/ddg/PowerElectronics/cycloconverter" },
      { title: "Free wheeling diode.pdf", url: "/documents/ddg/PowerElectronics/FreeWheelingDiode" },
      { title: "Harmonic Reduction techniqe in inverter.pdf", url: "/documents/ddg/PowerElectronics/HarmonicReductiontechniqueinInverter" },
      { title: "Inverters.pdf", url: "/documents/ddg/PowerElectronics/INVERTERS" },
      { title: "powerelectronics introduction.pdf", url: "/documents/ddg/PowerElectronics/powerelectronics-introduction" },
      { title: "SCR Commutation Circuits.pdf", url: "/documents/ddg/PowerElectronics/SCRCommutationCircuits" },
      { title: "SCR protection Circuits.pdf", url: "/documents/ddg/PowerElectronics/SCRProtectionCircuits" },
      { title: "scr highlights.pdf", url: "/documents/ddg/PowerElectronics/scr-highlights" },
      { title: "SCR.pdf", url: "/documents/ddg/PowerElectronics/scr" },
      { title: "Single Phase Inverters.pdf", url: "/documents/ddg/PowerElectronics/SinglePhaseInverters" },
      { title: "Three phase inverters.pdf", url: "/documents/ddg/PowerElectronics/ThreePhaseInverter" },
      { title: "Transistor Amplifier.pdf", url: "/documents/ddg/PowerElectronics/TransistorAmplifier" },
      { title: "tric.pdf", url: "/documents/ddg/PowerElectronics/triac" },
      { title: "ujt triggering.pdf", url: "/documents/ddg/PowerElectronics/ujttriggering" },
    ],
  },
];

// --- Components ---

const PDFLink = ({ resource }: { resource: Resource }) => (
  <button
    className="group flex items-center justify-between w-full p-4 mb-3 bg-white border border-gray-200 rounded-xl hover:border-indigo-500 hover:shadow-md transition-all duration-200 text-left"
    onClick={() => window.open(resource.url, "_blank") }
  >
    <div className="flex items-center space-x-3">
      <div className="p-2 bg-red-50 text-red-500 rounded-lg group-hover:bg-red-100 transition-colors">
        <FileText size={20} />
      </div>
      <div>
        <p className="font-medium text-gray-800 group-hover:text-indigo-600 transition-colors">
          {resource.title}
        </p>
      </div>
    </div>
    <div className="text-gray-400 group-hover:text-indigo-600">
      <ArrowRight size={20} />
    </div>
  </button>
);

const Card = ({
  node,
  onClick,
}: {
  node: StudyNode;
  index: number;
  onClick: (id: string) => void;
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
        <div
          className={`p-6 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 bg-linear-to-br ${node.bgGradient} transition-all duration-300 relative overflow-hidden`}
        >
          {/* Decorative background shape */}
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-white opacity-20 rounded-full blur-xl" />

          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {node.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {node.shortDescription}
              </p>
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
  onClose,
}: {
  node: StudyNode | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!node) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />

      {/* Modal Card */}
      <div
        className={`bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl transform transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) ${isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-8"}`}
      >
        {/* Header Image/Gradient */}
        <div
          className={`h-32 sm:h-48 bg-linear-to-r ${node.bgGradient} relative overflow-hidden`}
        >
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

  const activeNode = studyPathData.find((n) => n.id === activeId) || null;

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveId(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen  font-sans ">
      {/* Main Timeline Container */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your Learning Journey
          </h2>
          <p className="text-gray-600">
            Click on a module card to view details and download study materials.
          </p>
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
