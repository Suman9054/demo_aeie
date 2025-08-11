import { lazy, Suspense, useState, ComponentType, useEffect } from "react";
import { useLocation } from "@tanstack/react-router"; // If you're using TanStack Router

type SectionName =
  | "Media Club"
  | "Institute"
  | "Department"
  | "Faculty"
  | "Technical Staff"
  | "Committee"
  | "ISA";

// Lazy imports for sections
const sectionComponents: Record<SectionName, ComponentType> = {
  "Media Club": lazy(() => import("./aboutSections/MediaClub")),
  Institute: lazy(() => import("./aboutSections/Institute")),
  Department: lazy(() => import("./aboutSections/Department")),
  Faculty: lazy(() => import("./aboutSections/Faculty")),
  "Technical Staff": lazy(() => import("./aboutSections/TechnicalStaff")),
  Committee: lazy(() => import("./aboutSections/Committee")),
  ISA: lazy(() => import("./aboutSections/ISA")),
};

export default function AboutUs(): JSX.Element {
  const [activeSection, setActiveSection] = useState<SectionName>("Media Club");

  const location = useLocation();

  // If your navbar passes a default section via query params, handle it here
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get("section") as SectionName | null;
    if (section && section in sectionComponents) {
      setActiveSection(section);
    }
  }, [location.search]);

  const ActiveComponent = sectionComponents[activeSection];

  return (
    <div className="min-h-screen flex overflow-hidden bg-gradient-to-br from-blue-400 via-indigo-900 to-blue-950 text-white">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-gradient-to-b from-indigo-800 via-indigo-900 to-blue-950 shadow-xl p-6 flex flex-col gap-4 border-r border-indigo-700">
        <h2 className="text-xl font-bold mb-4 text-white">About Menu</h2>
        <nav className="flex flex-col gap-2">
          {(Object.keys(sectionComponents) as SectionName[]).map((item) => (
            <button
              key={item}
              onClick={() => setActiveSection(item)}
              className={`text-left px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeSection === item
                  ? "bg-indigo-700 text-white"
                  : "text-indigo-100 hover:bg-indigo-700 hover:text-white hover:translate-x-1"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-auto">
        <h1 className="text-4xl font-bold mb-6 drop-shadow-lg">
          About Our — {activeSection}
        </h1>
        <Suspense fallback={<p>Loading {activeSection}...</p>}>
          <ActiveComponent />
        </Suspense>
      </main>
    </div>
  );
}
