import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';

const Hero = ({ onOpenChat }) => {
  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-[85vh] flex items-center justify-center relative overflow-hidden">
      <div className="grid md:grid-cols-2 gap-12 items-center w-full">
        <div className="space-y-6 z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-red-400 font-mono"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            System Online
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-bold tracking-tight leading-none"
          >
            {/* LINE 1: BIGGEST (The Role) */}
            <span className="block text-5xl md:text-7xl text-white mb-4">
              SOFTWARE ENGINEER.
            </span>
            
            {/* LINE 2: MEDIUM (The Stack) - Darker White/Grey */}
            <span className="block text-3xl md:text-5xl text-gray-400 mb-2">
              FULL STACK.
            </span>

            {/* LINE 3: MEDIUM (The Edge) - Gradient Red */}
            <span className="block text-3xl md:text-5xl text-transparent bg-clip-text bg-linear-to-r from-red-500 to-orange-600">
              BACKEND HEAVY.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-400 max-w-lg leading-relaxed pt-2"
          >
            I build robust web applications with a focus on logic.
            Specialized in Node.js, Database Optimization,
            and writing clean, maintainable code.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <button
              onClick={scrollToProjects}
              className="group relative px-6 py-3 bg-white text-black font-semibold rounded-lg overflow-hidden transition-all hover:bg-gray-200 cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                View Work <ArrowRight size={18} />
              </span>
            </button>

            <button
              onClick={onOpenChat}
              className="px-6 py-3 border border-white/10 rounded-lg text-white hover:bg-white/5 transition-all cursor-pointer"
            >
              Initialize Chat
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden md:block"
        >
          <div className="absolute -inset-1 bg-linear-to-r from-red-600 to-orange-600 rounded-xl blur opacity-20"></div>

          <div className="relative bg-[#0F0F11] border border-white/10 rounded-xl p-6 shadow-2xl">
            <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
              </div>
              <div className="text-xs text-gray-500 font-mono ml-2 flex items-center gap-1">
                <Terminal size={12} /> aryan@backend-core:~/portfolio
              </div>
            </div>

            <div className="font-mono text-sm space-y-2">
              <div className="flex gap-2">
                <span className="text-green-500">➜</span>
                <span className="text-blue-400">~</span>
                <span className="text-gray-300">npx start-engine</span>
              </div>
              <div className="text-gray-500 animate-pulse">Initializing backend services...</div>
              <div className="text-gray-400">
                <span className="text-green-500">✔</span> Core: <span className="text-white">Node.js v24</span><br />
                <span className="text-green-500">✔</span> Framework: <span className="text-white">Express</span><br />
                <span className="text-green-500">✔</span> Database: <span className="text-white">MongoDB</span><br />
                <span className="text-green-500">✔</span> Status: <span className="text-red-500">ONLINE</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;