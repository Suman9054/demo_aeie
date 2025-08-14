import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Footer_layout(): React.JSX.Element {
  return (
    <footer className="w-full bg-gradient-to-br from-blue-400 via-indigo-900 to-blue-950 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Section 1: Logos */}
        <div className="flex items-center gap-6">
          <img
            src="/logo1.png"
            alt="Logo 1"
            className="w-14 h-14 object-contain"
          />
          <img
            src="/logo2.png"
            alt="Logo 2"
            className="w-14 h-14 object-contain"
          />
        </div>

        {/* Section 2: Description */}
        <div className="text-center md:text-left max-w-md text-sm font-light leading-relaxed">
          <p>
            The Department of Applied Electronics & Instrumentation Engineering
            is dedicated to nurturing innovation and excellence in embedded
            systems, automation, and industrial instrumentation.
          </p>
        </div>

        {/* Section 3: Social Icons */}
        <div className="flex gap-5 text-2xl">
          <a
            href="mailto:hodaeie.hit@gmail.com"
            className="hover:text-red-400 transition"
          >
            <MdEmail />
          </a>
          <a
            href="https://www.facebook.com/share/1ST1a2TfqD/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.instagram.com/aeie.hit/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-400 transition"
          >
            <FaInstagram />
          </a>
          <a
            href="https://x.com/HODAEIE"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-400 transition"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.linkedin.com/in/aeie-hit-00614a378/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-300 transition"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://youtube.com/@aeiehit?si=CGniaiyWR6vjKnqE"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-500 transition"
          >
            <FaYoutube />
          </a>
        </div>
      </div>
    </footer>
  );
}
