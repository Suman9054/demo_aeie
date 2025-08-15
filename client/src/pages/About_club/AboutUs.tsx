import { Link, useLocation } from "@tanstack/react-router";
import { useMemo, type ComponentType } from "react";

// Direct imports (no lazy)
import MediaClub from "./aboutSections/MediaClub";
import Institute from "./aboutSections/Institute";
import Department from "./aboutSections/Department";
import Faculty from "./aboutSections/Faculty";
import TechnicalStaff from "./aboutSections/TechnicalStaff";
import Committee from "./aboutSections/Committee";
import ISA from "./aboutSections/ISA";

type SectionName =
  | "Media Club"
  | "Institute"
  | "Department"
  | "Faculty"
  | "Technical Staff"
  | "Committee"
  | "ISA";

// Mapping section names to components
const sectionComponents: Record<SectionName, ComponentType> = {
  "Media Club": MediaClub,
  Institute,
  Department,
  Faculty,
  "Technical Staff": TechnicalStaff,
  Committee,
  ISA,
};

export default function AboutUs(): React.JSX.Element {
  const location = useLocation();

  // Get active section directly from the URL query param
  const activeSection = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get("section") as SectionName | null;
    return section && section in sectionComponents
      ? section
      : "Media Club"; // default
  }, [location.search]);

  const ActiveComponent = sectionComponents[activeSection];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-400 via-indigo-900 to-blue-950 text-white overflow-hidden">
      {/* Fixed Sidebar */}
      <aside className="fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-indigo-800 via-indigo-900 to-blue-950 shadow-xl p-6 flex flex-col gap-4 border-r border-indigo-700 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-white">About Menu</h2>
        <nav className="flex flex-col gap-2">
          {(Object.keys(sectionComponents) as SectionName[]).map((item) => (
            <Link
              key={item}
              to={`/about-us?section=${encodeURIComponent(item)}`}
              className={`text-left px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeSection === item
                  ? "bg-indigo-700 text-white"
                  : "text-indigo-100 hover:bg-indigo-700 hover:text-white hover:translate-x-1"
              }`}
            >
              {item}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Scrollable Main Content */}
      <main className="ml-64 flex-1 p-10 overflow-y-auto h-screen">
        <h1 className="text-4xl font-bold mb-6 drop-shadow-lg">
          About Our — {activeSection}
        </h1>
        {/* key forces remount so useEffect in each section runs */}
        <ActiveComponent key={activeSection} />
      </main>
    </div>
  );
}
