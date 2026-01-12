import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Star, GitFork, AlertCircle, Layers } from 'lucide-react';

const Projects = () => {
  const [projects, setProjects] = useState({ featured: [], latest: [] });
  const [activeTab, setActiveTab] = useState('featured');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') === -1) {
          throw new Error('Received HTML instead of JSON. Check Vite Proxy config.');
        }
        const data = await response.json();
        if (data.success) {
          setProjects(data.data);
        } else {
          setError('Backend reported an error.');
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const activeList = activeTab === 'featured' ? projects.featured : projects.latest;

  return (
    <section className="py-20 relative z-10" id="projects">
      <div className="max-w-7xl mx-auto px-4">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Deployed <span className="text-red-500">Systems</span>
            </h2>
            <div className="h-1 w-20 bg-red-500 rounded-full"></div>
          </motion.div>

          <div className="flex bg-[#0F0F11] border border-white/10 rounded-lg p-1 self-start md:self-auto">
            {['featured', 'latest'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all capitalize whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab === 'latest' ? 'Latest Activity' : tab}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="p-4 border border-red-500/50 bg-red-500/10 rounded-lg text-red-200 flex items-center gap-2 mb-8">
            <AlertCircle size={20} />
            <span>Error: {error} (Check if backend is running on port 3000)</span>
          </div>
        )}

        {/* COMPACT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="h-80 bg-white/5 rounded-xl animate-pulse border border-white/5"
                  ></div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="contents"
              >
                {activeList && activeList.length === 0 && (
                  <div className="col-span-full py-20 text-center text-gray-500 border border-dashed border-white/10 rounded-2xl">
                    <p>No projects found in this category.</p>
                    {activeTab === 'featured' && (
                      <p className="text-xs mt-2">
                        (Pin repositories on GitHub to see them here)
                      </p>
                    )}
                  </div>
                )}

                {activeList?.map((project) => (
                  <div
                    key={project.id}
                    className="group flex flex-col bg-[#0F0F11] border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all h-full"
                  >
                    {/* 1. THUMBNAIL (h-36) */}
                    <div className="h-36 w-full relative overflow-hidden border-b border-white/5 bg-[#050505]">
                        {project.image ? (
                            // IMAGE EXISTS
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        ) : (
                            // NO IMAGE -> TERMINAL FALLBACK (Dark Glass UI)
                            <div className="w-full h-full bg-[#0a0a0a] p-4 flex flex-col font-mono text-[10px] relative overflow-hidden group-hover:bg-[#111] transition-colors">
                                {/* Header: Traffic Lights */}
                                <div className="flex justify-between items-center mb-3 opacity-50">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
                                    </div>
                                    <div className="text-[8px] text-gray-600">bash</div>
                                </div>
                                
                                {/* Content: Generic Flow */}
                                <div className="space-y-1.5 z-10">
                                    {/* Line 1: cd */}
                                    <div className="flex gap-1.5 text-gray-400">
                                        <span className="text-green-500">➜</span>
                                        <span className="text-blue-400">~</span>
                                        <span className="text-gray-300">cd {project.title.toLowerCase().replace(/\s+/g, '-')}</span>
                                    </div>
                                    
                                    {/* Line 2: Install */}
                                    <div className="text-gray-500 pl-3">installing dependencies...</div>
                                    
                                    {/* Line 3: System Processing (Active) */}
                                    <div className="flex gap-1.5 text-gray-300 pl-3">
                                         <span className="text-green-500">[System]:</span>
                                         <span>Processing...</span>
                                         <motion.span 
                                            animate={{ opacity: [0, 1, 0] }} 
                                            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                                            className="w-1.5 h-3 bg-red-500 inline-block align-middle ml-0.5"
                                         />
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {/* Language Tag (Floating) */}
                        <div className="absolute top-3 right-3">
                             <span
                                className="flex items-center gap-1.5 text-[10px] font-bold font-mono px-2 py-1 rounded bg-black/80 backdrop-blur-md text-white border border-white/10 shadow-lg"
                                style={{ borderColor: `${project.stats.langColor}40` }}
                              >
                                <span style={{ color: project.stats.langColor }} className="text-[14px] leading-none">•</span>
                                {project.stats.lang}
                              </span>
                        </div>
                    </div>

                    {/* 2. CONTENT (Padding 5) */}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors truncate pr-2">
                            {project.title}
                        </h3>
                        <div className="flex gap-3 text-gray-500 shrink-0 pt-1">
                          {project.stats.stars > 0 && (
                            <span className="flex items-center gap-1 text-xs hover:text-yellow-400 transition-colors">
                              <Star size={12} /> {project.stats.stars}
                            </span>
                          )}
                          {project.stats.forks > 0 && (
                            <span className="flex items-center gap-1 text-xs hover:text-blue-400 transition-colors">
                              <GitFork size={12} /> {project.stats.forks}
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-2 min-h-[2.5em]">
                        {project.description}
                      </p>

                      {/* Tech Stack Chips (Strictly 3 + overflow) */}
                      <div className="flex flex-wrap gap-2 mb-5 mt-auto">
                        {project.tech.slice(0, 3).map((t, i) => (
                          <span key={i} className="text-[10px] px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/5">
                            {t}
                          </span>
                        ))}
                        {project.tech.length > 3 && (
                            <span className="text-[10px] px-2 py-1 rounded bg-white/5 text-gray-500 border border-white/5 flex items-center gap-1" title={project.tech.slice(3).join(', ')}>
                             <Layers size={10} /> +{project.tech.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-2 pt-4 border-t border-white/5">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 text-white font-medium text-xs hover:bg-white/10 border border-white/5 transition-all group/btn"
                        >
                          <Github size={14} className="group-hover/btn:scale-110 transition-transform"/> 
                          <span>Source</span>
                        </a>
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white text-black font-bold text-xs hover:bg-gray-200 transition-all"
                          >
                            <ExternalLink size={14} /> 
                            <span>Demo</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Projects;