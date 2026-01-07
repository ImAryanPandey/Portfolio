import React from 'react';
import { motion } from 'framer-motion';
import { Server, Users, Zap, Microscope, Brain, Rocket } from 'lucide-react';

const Stats = () => {
  return (
    <section className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4">
        
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
        >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                System <span className="text-red-500">Metrics</span>
            </h2>
            <div className="h-1 w-20 bg-red-500 rounded-full"></div>
        </motion.div>

        {/* THE 6-TILE BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">

            {/* TILE 1: THE ARCHITECT (Top Left - Spans 2 Cols) */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="md:col-span-2 bg-linear-to-br from-white/10 to-black/50 border border-white/10 rounded-2xl p-8 relative overflow-hidden group"
            >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Zap size={120} />
                </div>
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-2">The Architect</h3>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed mt-4 max-w-lg">
                        I bridge the gap between complex backend logic and smooth user experiences. 
                        As a CS Graduate (2025), I design systems that scale.
                        <br/>
                        <span className="text-red-400 font-medium text-xs mt-3 block">
                             FOCUS: SCALABILITY • SECURITY • REAL-TIME SYSTEMS
                        </span>
                    </p>
                </div>
            </motion.div>

            {/* TILE 2: THE ARSENAL (Right - Spans 1 Col, 2 Rows Tall) */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="md:row-span-2 bg-linear-to-br from-green-900/20 to-black/50 border border-green-500/20 rounded-2xl p-6 flex flex-col h-full"
            >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Server className="text-green-500" size={20}/> Arsenal
                </h3>
                
                <div className="space-y-3 flex-1 overflow-y-auto pr-2 no-scrollbar">
                    {[
                        { name: "Node.js", type: "Core" },
                        { name: "Express", type: "Backend" },
                        { name: "MongoDB", type: "Database" },
                        { name: "React", type: "Frontend" },
                        { name: "Bun", type: "Runtime" },
                        { name: "Docker", type: "DevOps" },
                        { name: "Socket.io", type: "Realtime" },
                        { name: "Git", type: "Control" }
                    ].map((tech, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors group">
                            <span className="text-sm text-gray-200 group-hover:text-white">{tech.name}</span>
                            <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">[{tech.type}]</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* TILE 3: THE EXPLORER (Tech Enthusiast) */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-linear-to-br from-yellow-900/20 to-black/50 border border-yellow-500/20 rounded-2xl p-6 hover:border-yellow-500/40 transition-colors"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-yellow-500/10 rounded-lg">
                        <Microscope className="text-yellow-500" size={20} />
                    </div>
                    <span className="text-yellow-200 font-mono text-xs tracking-wider">ENTHUSIAST</span>
                </div>
                <div className="text-lg font-bold text-white mb-2">Tech Explorer</div>
                <p className="text-xs text-gray-400 leading-relaxed">
                    I don't just use tools; I dissect them. From testing <b>AI models</b> to replacing Node with <b>Bun</b>. I dig deep to understand the "Why" behind the tech.
                </p>
            </motion.div>

            {/* TILE 4: THE MENTOR (Leadership) */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-linear-to-br from-blue-900/20 to-black/50 border border-blue-500/20 rounded-2xl p-6 hover:border-blue-500/40 transition-colors"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                        <Users className="text-blue-500" size={20} />
                    </div>
                    <span className="text-blue-200 font-mono text-xs tracking-wider">LEADERSHIP</span>
                </div>
                <div className="text-lg font-bold text-white mb-2">Head of Tech Society</div>
                <p className="text-xs text-gray-400 leading-relaxed">
                    Led PARAM. My goal isn't just to manage, but to mentor. I love breaking down complex concepts for juniors and building a community.
                </p>
            </motion.div>

            {/* TILE 5: THE PHILOSOPHY (The Mindset) - RESTORED */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-linear-to-br from-cyan-900/20 to-black/50 border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-500/40 transition-colors"
            >
                 <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-cyan-500/10 rounded-lg">
                        <Brain className="text-cyan-500" size={20} />
                    </div>
                    <span className="text-cyan-200 font-mono text-xs tracking-wider">PHILOSOPHY</span>
                </div>
                <div className="text-lg font-bold text-white mb-2">Why It Works</div>
                <p className="text-xs text-gray-400 leading-relaxed">
                    I don't stop at "it works". I prioritize deep question answering. I understand the <b>Data Structures</b> before using the library.
                </p>
            </motion.div>

            {/* TILE 6: ACTIVE PURSUITS (Merged Interests) */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="bg-linear-to-br from-pink-900/20 to-black/50 border border-pink-500/20 rounded-2xl p-6 hover:border-pink-500/40 transition-colors"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-pink-500/10 rounded-lg">
                        <Rocket className="text-pink-500" size={20} />
                    </div>
                    <span className="text-pink-200 font-mono text-xs tracking-wider">PURSUITS</span>
                </div>
                <div className="text-lg font-bold text-white mb-2">Active Pursuits</div>
                <p className="text-xs text-gray-400 leading-relaxed">
                    <b>Competitive Gamer</b> (MOBA/RPG) & <b>Pop Culture Enthusiast</b>. I value the narrative as much as the mechanics, from Anime lore to Game theory.
                </p>
            </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Stats;