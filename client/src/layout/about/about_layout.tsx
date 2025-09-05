import { Outlet } from "@tanstack/react-router";
import Slidenaebar from "../../components/slidenavebar/Slidenaebar";

export default function About_layout(): React.JSX.Element {
  return (
    <div className="min-h-screen flex">
      <div className=" fixed left-0 top-0 h-full">
        <Slidenaebar
          navItems={[
            { to: "/about-us/", label: "AEIE" },
            { to: "/about-us/faculty", label: "Faculty" },
            { to: "/about-us/technicalstaf", label: "Technical Staff" },
            { to: "/about-us/placement", label: "Placement" },
            { to: "/about-us/mediaclub", label: "Media Club" },
          ]}
        />
      </div>

      <div className="flex-1 ml-64 p-20">
        <Outlet />
      </div>
    </div>
  );
}
