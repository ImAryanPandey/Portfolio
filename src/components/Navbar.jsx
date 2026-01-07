import React from 'react';
import { Github, ExternalLink, Code2 } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded bg-red-600/20 text-red-500">
              <Code2 size={20} />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              ARYAN<span className="text-red-500">.DEV</span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              Projects
            </a>
            <a
              href="#"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              About
            </a>

            <a
              href="https://github.com/ImAryanPandey"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors"
            >
              <Github size={16} />
              <span className="hidden md:inline">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
