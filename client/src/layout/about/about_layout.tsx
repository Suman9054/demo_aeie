import { Outlet } from "@tanstack/react-router";
import Slidenaebar from "../../components/slidenavebar/Slidenaebar";

export default function About_layout(): React.JSX.Element {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className=" fixed left-0 top-0 h-full">
        <Slidenaebar
          navItems={[
            { to: "/about-us/", label: "AEIE" },
            { to: "/about-us/faculty", label: "Faculty" },
            { to: "/about-us/Technicalstaf", label: "Technical Staff" },
            { to: "/about-us/placement", label: "Placement" },
            { to: "/about-us/media-club", label: "Media Club" },
          ]}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 ml-64 p-20">
        <Outlet />
      </div>
    </div>
  );
}
