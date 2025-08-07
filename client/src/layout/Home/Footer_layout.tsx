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
    <footer className="w-4/5 mx-auto mb-6 px-6 py-6 bg-black/10 border border-white/10 rounded-2xl text-gray-400 flex flex-col md:flex-row justify-between items-center gap-6">
      {/* Section 1: Logos */}
      <div className="flex items-center gap-4">
        <img src="/logo1.png" alt="Logo 1" className="w-12 h-12 object-contain" />
        <img src="/logo2.png" alt="Logo 2" className="w-12 h-12 object-contain" />
      </div>

      {/* Section 2: Description */}
      <div className="text-center md:text-left max-w-xs text-sm font-mono">
        <p>
          The Department of Applied Electronics & Instrumentation Engineering is
          dedicated to nurturing innovation and excellence in embedded systems,
          automation, and industrial instrumentation.
        </p>
      </div>

      {/* Section 3: Social Icons */}
      <div className="flex gap-4 text-xl">
        <a
          href="mailto:your-email@example.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform duration-200"
        >
          <MdEmail />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform duration-200"
        >
          <FaFacebook />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform duration-200"
        >
          <FaInstagram />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform duration-200"
        >
          <FaTwitter />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform duration-200"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform duration-200"
        >
          <FaYoutube />
        </a>
      </div>
    </footer>
  );
}
