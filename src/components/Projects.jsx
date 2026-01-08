import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Star, GitFork, Clock } from 'lucide-react';

const Projects = () => {
  const [projects, setProjects] = useState({ featured: [], latest: [] });
  const [activeTab, setActiveTab] = useState('featured');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        if (data.success) {
          setProjects(data.data);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
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
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
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

          <div className="flex bg-[#0F0F11] border border-white/10 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('featured')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'featured' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Featured
            </button>
            <button
              onClick={() => setActiveTab('latest')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'latest' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Latest Activity
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {loading ? (
              [1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="h-96 bg-white/5 rounded-2xl animate-pulse border border-white/5"
                ></div>
              ))
            ) : (
              activeList?.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group bg-[#0F0F11] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all flex flex-col relative"
                >
                  {project.image && (
                    <div className="absolute inset-0 z-0">
                      <img
                        src={project.image}
                        alt="preview"
                        className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity blur-sm"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-[#0F0F11] via-[#0F0F11]/90 to-transparent"></div>
                    </div>
                  )}

                  <div className="relative z-10 p-6 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-2">
                        <span
                          className="text-[10px] font-mono px-2 py-1 rounded border border-white/10 bg-black/50 text-gray-300"
                          style={{ borderColor: `${project.stats.langColor}40` }}
                        >
                          <span style={{ color: project.stats.langColor }} className="mr-1">
                            ●
                          </span>
                          {project.stats.lang}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-1 rounded border border-white/10 bg-black/50 text-gray-300 flex items-center gap-1">
                          <Clock size={10} /> {project.stats.updated}
                        </span>
                      </div>

                      <div className="flex gap-2 text-gray-500">
                        {project.stats.stars > 0 && (
                          <span className="flex items-center gap-1 text-xs">
                            <Star size={12} /> {project.stats.stars}
                          </span>
                        )}
                        {project.stats.forks > 0 && (
                          <span className="flex items-center gap-1 text-xs">
                            <GitFork size={12} /> {project.stats.forks}
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((t, i) => (
                        <span key={i} className="text-xs text-gray-500">
                          #{t}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3 mt-auto">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-colors"
                      >
                        <Github size={16} /> Code
                      </a>
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-white/10 text-white font-medium text-sm hover:bg-white/5 transition-colors"
                        >
                          <ExternalLink size={16} /> Live
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Projects;
