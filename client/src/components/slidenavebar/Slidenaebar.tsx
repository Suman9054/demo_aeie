import { Link } from "@tanstack/react-router";
import type { Variants } from "motion/react";
import * as motion from "motion/react-client";
import { useEffect, useRef, useState } from "react";

interface NavItem {
  to: string;
  label: string;
  icon?: React.ReactNode;
}

interface SlidenaebarProps {
  navItems: NavItem[];
  theme?: "deep-tech" | "blue-purple" | "electric" | "academic" | "neon";
}

const colorThemes = {
  "deep-tech": {
    colors: ["#4338CA", "#7C3AED", "#EC4899", "#F97316", "#10B981"],
    background: "#0F172A",
    sidebar: "#1E293B",
    text: "#F1F5F9",
    textSecondary: "#94A3B8",
    hover: "#334155",
    active: "#475569"
  },
  "blue-purple": {
    colors: ["#3B82F6", "#6366F1", "#8B5CF6", "#A855F7", "#D946EF"],
    background: "#0C0A1D",
    sidebar: "#1A1B3A",
    text: "#E2E8F0",
    textSecondary: "#A1A1AA",
    hover: "#2D2B4A",
    active: "#3D3B5A"
  },
  "electric": {
    colors: ["#06B6D4", "#3B82F6", "#6366F1", "#8B5CF6", "#EC4899"],
    background: "#0A0A0A",
    sidebar: "#1C1C1E",
    text: "#FFFFFF",
    textSecondary: "#A1A1A6",
    hover: "#2C2C2E",
    active: "#3A3A3C"
  },
  "academic": {
    colors: ["#1E40AF", "#3B82F6", "#6366F1", "#8B5CF6", "#A855F7"],
    background: "#0F1419",
    sidebar: "#1E2A47",
    text: "#E1E8F0",
    textSecondary: "#9CA3AF",
    hover: "#2C3E50",
    active: "#34495E"
  },
  "neon": {
    colors: ["#00F5FF", "#1E90FF", "#9932CC", "#FF1493", "#FF4500"],
    background: "#0D1117",
    sidebar: "#161B22",
    text: "#F0F6FC",
    textSecondary: "#8B949E",
    hover: "#21262D",
    active: "#30363D"
  }
};

export default function Slidenaebar({ navItems, theme = "deep-tech" }: SlidenaebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { height } = useDimensions(containerRef);
  const currentTheme = colorThemes[theme];

  return (
   
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        custom={height}
        ref={containerRef}
        style={nav}
      >
        <motion.div
          style={{
            ...background,
            background: `linear-gradient(145deg, ${currentTheme.sidebar} 0%, ${currentTheme.active} 100%)`
          }}
          variants={sidebarVariants}
        />
        <Navigation navItems={navItems} theme={currentTheme} />
        <MenuToggle toggle={() => setIsOpen(!isOpen)} theme={currentTheme} />
      </motion.nav>
   
  );
}

const navVariants: Variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const Navigation = ({ 
  navItems, 
  theme 
}: { 
  navItems: NavItem[]; 
  theme: typeof colorThemes["deep-tech"];
}) => (
  <motion.ul style={list} variants={navVariants}>
    {navItems.map((item, i) => (
      <MenuItem 
        i={i} 
        to={item.to} 
        label={item.label} 
        icon={item.icon}
        theme={theme}
        key={i} 
      />
    ))}
  </motion.ul>
);

const itemVariants: Variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const MenuItem = ({
  i,
  to,
  label,
  icon,
  theme
}: {
  i: number;
  to: string;
  label: string;
  icon?: React.ReactNode;
  theme: typeof colorThemes["deep-tech"];
}) => {
  const borderColor = theme.colors[i % theme.colors.length];
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.li
      style={listItem}
      variants={itemVariants}
      whileHover={{ scale: 1.05, x: 10 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link to={to} className="flex items-center gap-4 w-full p-2 rounded-lg transition-all duration-300">
        <motion.div 
          style={{
            ...iconPlaceholder,
            border: `2px solid ${borderColor}`,
            backgroundColor: isHovered ? borderColor : 'transparent',
            boxShadow: isHovered ? `0 0 20px ${borderColor}40` : 'none'
          }}
          animate={{
            rotate: isHovered ? 360 : 0,
            scale: isHovered ? 1.1 : 1
          }}
          transition={{ duration: 0.3 }}
        >
          {icon && (
            <div className="flex items-center justify-center w-full h-full text-sm">
              {icon}
            </div>
          )}
        </motion.div>
        <motion.span 
          style={{
            ...textPlaceholder,
            color: theme.text,
            fontSize: '16px',
            fontWeight: isHovered ? '600' : '400'
          }}
          animate={{
            color: isHovered ? borderColor : theme.text
          }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.span>
      </Link>
    </motion.li>
  );
};

const sidebarVariants: Variants = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.2,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

interface PathProps {
  d?: string;
  variants: Variants;
  transition?: { duration: number };
  theme: typeof colorThemes["deep-tech"];
}

const Path = ({ theme, ...props }: PathProps) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke={theme.text}
    strokeLinecap="round"
    {...props}
  />
);

const MenuToggle = ({ 
  toggle, 
  theme 
}: { 
  toggle: () => void; 
  theme: typeof colorThemes["deep-tech"];
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button 
      style={{
        ...toggleContainer,
        backgroundColor: isHovered ? theme.hover : 'transparent',
        border: `2px solid ${theme.colors[0]}`,
        boxShadow: isHovered ? `0 0 15px ${theme.colors[0]}30` : 'none'
      }}
      onClick={toggle}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <svg width="23" height="23" viewBox="0 0 23 23">
        <Path
          theme={theme}
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" },
          }}
        />
        <Path
          theme={theme}
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          theme={theme}
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 17 16.346" },
          }}
        />
      </svg>
    </motion.button>
  );
};

// ---------- ENHANCED STYLES ----------

const nav: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  overflow: "hidden",
  zIndex: 50,
};

const background: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  width: 320,
  backdropFilter: "blur(10px)",
  borderRight: "1px solid rgba(255, 255, 255, 0.1)"
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
  transition: "all 0.3s ease"
};

const list: React.CSSProperties = {
  listStyle: "none",
  padding: 25,
  margin: 0,
  position: "absolute",
  top: 90,
  width: 270,
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
};

const iconPlaceholder: React.CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: "50%",
  flex: "40px 0",
  marginRight: 20,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.3s ease"
};

const textPlaceholder: React.CSSProperties = {
  flex: 1,
  transition: "all 0.2s ease",
  fontFamily: "'Inter', sans-serif"
};

const useDimensions = (ref: React.RefObject<HTMLDivElement | null>) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    if (ref.current) {
      dimensions.current.width = ref.current.offsetWidth;
      dimensions.current.height = ref.current.offsetHeight;
    }
  }, [ref]);

  return dimensions.current;
};
