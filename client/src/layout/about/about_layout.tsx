import  { useState } from "react";

import { Outlet } from "@tanstack/react-router";
import Slidenaebar from "../../components/slidenavebar/Slidenaebar";

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { to: "/about-us/", label: "AEIE" },
    { to: "/about-us/faculty", label: "Faculty" },
    { to: "/about-us/technicalstaf", label: "Technical Staff" },
    { to: "/about-us/placement", label: "Placement" },
    { to: "/about-us/mediaclub", label: "Media Club" },
  ];

  return (
    <div className="min-h-screen flex" style={{ boxSizing: "border-box" }}>
      <Slidenaebar
        navItems={navItems}
        isOpen={sidebarOpen}
        onOpenChange={(open) => setSidebarOpen(open)}
      />
       <button
        aria-label="Toggle sidebar"
        className="sm:p-7"
        aria-expanded={sidebarOpen}
        onClick={() => setSidebarOpen(s => !s)}
        style={{
          position: "fixed",
          top: 70,
          left: 10,
          zIndex: 999,
          width: 48,
          height: 48,
          borderRadius: "50%",
          border: "2px solid #6366F1",
          background: "rgba(0,0,0,0.3)",
        }}
      >
        {/* svg icon or text */}
        ☰
      </button>
      <div
        style={{
          flex: 1,
          // match the sidebar visual width expression exactly
          marginLeft: sidebarOpen ? "min(320px, 85vw)" : 0,
          transition: "margin-left 260ms ease",
          padding: 20,
          boxSizing: "border-box",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

