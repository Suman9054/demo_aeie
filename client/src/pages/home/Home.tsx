import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mcard } from "../../components/motioncard/motioncard";
import HodMsg from "../../components/Hod/HodMsg";
import { useNavigate } from "@tanstack/react-router";

type XY = "x" | "y";

interface Stat {
  label: string;
  value: string;
}

interface Card {
  title: string;
  icon: string;
  description: string;
  stats: Stat[];
  bgColor: string;
  textColor: string;
  xy: XY; // strictly "x" | "y"
}

export const Homepage: React.FC = () => {
  const text = "Welcome to AEIE";
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  const navigate = useNavigate();
  useEffect(() => {
    const typingSpeed = 100;

    if (!isDeleting && index === text.length) {
      const timeout = setTimeout(() => setIsDeleting(true), 1000);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && index === 0) {
      const timeout = setTimeout(() => setIsDeleting(false), 500);
      return () => clearTimeout(timeout);
    }

    const interval = setInterval(() => {
      if (!isDeleting) {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      } else {
        setDisplayedText((prev) => prev.slice(0, -1));
        setIndex((prev) => prev - 1);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [index, isDeleting, text]);

  const cardsData: Card[] = [
    {
      title: "placement",
      icon: "🎯",
      description:
        "Excellent placement opportunities with top companies in electronics, automation, and instrumentation sectors. Our dedicated placement cell ensures comprehensive career guidance and industry connections.",
      stats: [
        { label: "Placement Rate", value: "92%" },
        { label: "Average Package", value: "6.5 LPA" },
        { label: "Top Companies", value: "50+" },
      ],
      bgColor: "bg-amber-500/20",
      textColor: "text-amber-400",
      xy: "x",
    },
    {
      title: "features",
      icon: "⚡",
      description:
        "State-of-the-art laboratories, experienced faculty, industry-relevant curriculum, and hands-on learning approach that prepares students for real-world challenges in modern technology.",
      stats: [
        { label: "Faculty Ratio", value: "1:12" },
        { label: "Lab Facilities", value: "15+" },
        { label: "Industry Projects", value: "100+" },
      ],
      bgColor: "bg-blue-500/20",
      textColor: "text-blue-400",
      xy: "y",
    },
    {
      title: "projects",
      icon: "🚀",
      description:
        "Innovative student projects in IoT, robotics, industrial automation, and embedded systems. Regular participation in national competitions and research publications.",
      stats: [
        { label: "Active Projects", value: "80+" },
        { label: "Research Papers", value: "25+" },
        { label: "Awards Won", value: "15+" },
      ],
      bgColor: "bg-green-500/20",
      textColor: "text-green-400",
      xy: "x",
    },
  ];

  return (
    <main className="scroll-smooth overflow-x-hidden">
      <div className="min-h-screen w-full relative flex flex-col justify-between py-10  ">
        <div className="flex flex-col items-center justify-center max-w-[50%] text-center z-10 gap-2 mx-auto px-4 pt-30 flex-grow">
          <motion.h3
            className="text-3xl md:text-5xl font-sans text-gray-300 mb-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {displayedText}
            <motion.span
              className="inline-block w-[2px] h-6 md:h-8 bg-gray-300 ml-1"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            />
          </motion.h3>

          <motion.div
            className="text-gray-400 md:text-lg mb-4 text-center font-sans"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <p className="mb-4 font-thin">
              AEIE at Haldia Institute of Technology combines electronics,
              instrumentation, and modern technology to prepare students for
              careers in automation, control systems, and embedded systems. With
              experienced faculty, well-equipped labs, and active student
              engagement, the program fosters innovation and technical
              excellence for both industry success and higher studies.
            </p>
            <motion.button
              className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600 transition text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate({ to: "/about-us" })}
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 px-4  z-20">
          {cardsData.map((card) => (
            <Mcard
              key={card.title}
              title={card.title}
              icon={card.icon}
              description={card.description}
              stats={card.stats}
              bgColor={card.bgColor}
              textColor={card.textColor}
              xy={card.xy}
            />
          ))}
        </div>
      </div>
      <HodMsg />
    </main>
  );
};
