import React, { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import type { Variants } from "motion/react";
import * as motion from "motion/react-client";

/**
 * Slidenaebar.tsx
 * - Responsive sidebar with slide animation and controlled/uncontrolled API.
 * - Sidebar visual width: min(320px, 85vw)
 * - TypeScript: uses Theme = (typeof colorThemes)[keyof typeof colorThemes]
 */

interface NavItem {
  to: string;
  label: string;
  icon?: React.ReactNode;
}

const colorThemes = {
  "deep-tech": {
    colors: ["#4338CA", "#7C3AED", "#EC4899", "#F97316", "#10B981"] as const,
    background: "#0F172A",
    sidebar: "#1E293B",
    text: "#F1F5F9",
    textSecondary: "#94A3B8",
    hover: "#334155",
    active: "#475569",
  },
  "blue-purple": {
    colors: ["#3B82F6", "#6366F1", "#8B5CF6", "#A855F7", "#D946EF"] as const,
    background: "#0C0A1D",
    sidebar: "#1A1B3A",
    text: "#E2E8F0",
    textSecondary: "#A1A1AA",
    hover: "#2D2B4A",
    active: "#3D3B5A",
  },
  "electric": {
    colors: ["#06B6D4", "#3B82F6", "#6366F1", "#8B5CF6", "#EC4899"] as const,
    background: "#0A0A0A",
    sidebar: "#1C1C1E",
    text: "#FFFFFF",
    textSecondary: "#A1A1A6",
    hover: "#2C2C2E",
    active: "#3A3A3C",
  },
  "academic": {
    colors: ["#1E40AF", "#3B82F6", "#6366F1", "#8B5CF6", "#A855F7"] as const,
    background: "#0F1419",
    sidebar: "#1E2A47",
    text: "#E1E8F0",
    textSecondary: "#9CA3AF",
    hover: "#2C3E50",
    active: "#34495E",
  },
  "neon": {
    colors: ["#00F5FF", "#1E90FF", "#9932CC", "#FF1493", "#FF4500"] as const,
    background: "#0D1117",
    sidebar: "#161B22",
    text: "#F0F6FC",
    textSecondary: "#8B949E",
    hover: "#21262D",
    active: "#30363D",
  },
} as const;

// Theme union type (fixes the TS error)
type Theme = (typeof colorThemes)[keyof typeof colorThemes];

interface SlidenaebarProps {
  navItems: NavItem[];
  theme?: keyof typeof colorThemes; // accept theme keys: "deep-tech" | "blue-purple" | ...
  isOpen?: boolean; // controlled
  onOpenChange?: (open: boolean) => void;
}

export default function Slidenaebar({
  navItems,
  theme = "deep-tech",
  isOpen: controlledIsOpen,
  onOpenChange,
}: SlidenaebarProps) {
  // Controlled vs uncontrolled
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = typeof controlledIsOpen === "boolean";
  const isOpen = isControlled ? controlledIsOpen! : internalOpen;
  

  const containerRef = useRef<HTMLDivElement | null>(null);
  const { height } = useDimensions(containerRef);
  const currentTheme: Theme = colorThemes[theme];

  // lock horizontal scroll on body while sidebar is open
  useEffect(() => {
    const prevOverflowX = document.body.style.overflowX || "";
    if (isOpen) document.body.style.overflowX = "hidden";
    else document.body.style.overflowX = prevOverflowX;
    return () => {
      document.body.style.overflowX = prevOverflowX;
    };
  }, [isOpen]);

  return (
    <motion.nav
      ref={containerRef}
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      variants={containerVariants}
      style={nav}
      aria-hidden={!isOpen}
    >
      <motion.div
        style={{
          ...background,
          background: `linear-gradient(145deg, ${currentTheme.sidebar} 0%, ${currentTheme.active} 100%)`,
        }}
        variants={sidebarVariants}
        custom={height}
      />

      <Navigation navItems={navItems} theme={currentTheme} />

      
    </motion.nav>
  );
}

/* ---------- variants ---------- */

const containerVariants: Variants = {
  open: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 18,
    },
  },
  closed: {
    x: "-100%",
    transition: {
      type: "spring",
      stiffness: 900,
      damping: 60,
    },
  },
};

const sidebarVariants: Variants = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: { type: "spring", stiffness: 20, restDelta: 2 },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: { delay: 0.08, type: "spring", stiffness: 400, damping: 40 },
  },
};

const navListVariants: Variants = {
  open: { transition: { staggerChildren: 0.06, delayChildren: 0.18 } },
  closed: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

const itemVariants: Variants = {
  open: { y: 0, opacity: 1, transition: { y: { stiffness: 1000, velocity: -100 } } },
  closed: { y: 30, opacity: 0, transition: { y: { stiffness: 1000 } } },
};

/* ---------- subcomponents (use Theme type) ---------- */

const Navigation = ({
  navItems,
  theme,
}: {
  navItems: NavItem[];
  theme: Theme;
}) => (
  <motion.ul style={list} variants={navListVariants} aria-label="Primary navigation">
    {navItems.map((item, i) => (
      <MenuItem key={i} i={i} to={item.to} label={item.label} icon={item.icon} theme={theme} />
    ))}
  </motion.ul>
);

const MenuItem = ({
  i,
  to,
  label,
  icon,
  theme,
}: {
  i: number;
  to: string;
  label: string;
  icon?: React.ReactNode;
  theme: Theme;
}) => {
  const borderColor = theme.colors[i % theme.colors.length];
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.li
      style={listItem}
      variants={itemVariants}
      whileHover={{ scale: 1.03, x: 8 }}
      whileTap={{ scale: 0.97 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link to={to} className="flex items-center gap-4 w-full p-2 rounded-lg" style={{ textDecoration: "none" }}>
        <motion.div
          style={{
            ...iconPlaceholder,
            border: `2px solid ${borderColor}`,
            backgroundColor: isHovered ? borderColor : "transparent",
            boxShadow: isHovered ? `0 0 20px ${borderColor}40` : "none",
            color: isHovered ? "#fff" : borderColor,
          }}
          animate={{ rotate: isHovered ? 360 : 0, scale: isHovered ? 1.06 : 1 }}
          transition={{ duration: 0.35 }}
        >
          {icon && <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</div>}
        </motion.div>

        <motion.span
          style={{ ...textPlaceholder, color: theme.text, fontSize: 16, fontWeight: isHovered ? 600 : 400 }}
          animate={{ color: isHovered ? borderColor : theme.text }}
          transition={{ duration: 0.18 }}
        >
          {label}
        </motion.span>
      </Link>
    </motion.li>
  );
};

const Path = ({ theme, ...props }: { theme: Theme; [k: string]: any }) => (
  <motion.path fill="transparent" strokeWidth="3" stroke={theme.text} strokeLinecap="round" {...props} />
);


/* ---------- styles ---------- */

const nav: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  overflow: "hidden",
  overflowX: "hidden",
  zIndex: 50,
  boxSizing: "border-box",
};

const background: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  width: "min(320px, 85vw)",
  maxWidth: 320,
  backdropFilter: "blur(10px)",
  borderRight: "1px solid rgba(255, 255, 255, 0.08)",
  boxSizing: "border-box",
};

const toggleContainer: React.CSSProperties = {
  outline: "none",
  WebkitUserSelect: "none",
  MozUserSelect: "none",
  cursor: "pointer",
  position: "absolute",
  top: 18,
  left: 15,
  width: 50,
  height: 50,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.25s ease",
  zIndex: 120,
  boxSizing: "border-box",
};

const list: React.CSSProperties = {
  listStyle: "none",
  padding: 25,
  margin: 0,
  position: "absolute",
  top: 90,
  width: "calc(min(320px, 85vw) - 50px)",
  maxWidth: "calc(320px - 50px)",
  boxSizing: "border-box",
};

const listItem: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: 0,
  margin: 0,
  listStyle: "none",
  marginBottom: 16,
  cursor: "pointer",
  boxSizing: "border-box",
};

const iconPlaceholder: React.CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: "50%",
  flex: "0 0 40px",
  marginRight: 16,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.3s ease",
  boxSizing: "border-box",
};

const textPlaceholder: React.CSSProperties = {
  flex: 1,
  transition: "all 0.2s ease",
  fontFamily: "'Inter', sans-serif",
  boxSizing: "border-box",
};

/* ---------- utilities ---------- */

const useDimensions = (ref: React.RefObject<HTMLElement | null>) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // initial
    dimensions.current.width = el.offsetWidth;
    dimensions.current.height = el.offsetHeight;

    // ResizeObserver to update dimensions on resize
    const ro = new (window as any).ResizeObserver((entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        const cr = entry.contentRect;
        dimensions.current.width = Math.round(cr.width);
        dimensions.current.height = Math.round(cr.height);
      }
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);

  return dimensions.current;
};
