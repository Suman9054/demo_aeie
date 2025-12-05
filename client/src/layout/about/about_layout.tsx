
import { Outlet } from "@tanstack/react-router";
import Slidenaebar from "../../components/slidenavebar/Slidenaebar";

export default function AppLayout() {
  
  

  return (
    <div className="min-h-screen flex" style={{ boxSizing: "border-box" }}>
    
      <Slidenaebar 
          navItems={[
            { to: "/about-us/", label: "AEIE" },
            { to: "/about-us/faculty", label: "Faculty" },
            { to: "/about-us/technicalstaf", label: "Technical Staff" },
            { to: "/about-us/placement", label: "Placement" },
            { to: "/about-us/mediaclub", label: "Media Club" },
          ]}
        />
    
     
       
    
        <Outlet />
     
    </div>
  );
}

