import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react';

const Contact = () => {
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/ImAryanPandey', icon: <Github size={20} /> },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/ImAryanPandey', icon: <Linkedin size={20} /> },
    { name: 'Email', url: 'mailto:aryandev@example.com', icon: <Mail size={20} /> }
  ];

  return (
    <footer className="py-20 relative z-10 border-t border-white/5 bg-[#0a0a0a]" id="contact">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Ready to <span className="text-red-500">Initialize</span>?
            </h2>
            <p className="text-gray-400 text-lg max-w-md leading-relaxed mb-8">
              I am currently available for freelance work and full-time opportunities.
              Let's build a scalable system together.
            </p>

            <a
              href="mailto:aryandev@example.com"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all"
            >
              <Mail size={20} /> Start Conversation
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {socialLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="p-6 bg-[#0F0F11] border border-white/10 rounded-2xl hover:border-red-500/30 hover:bg-white/5 transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-gray-400 group-hover:text-white transition-colors">
                    {link.icon}
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="text-gray-600 group-hover:text-red-400 transition-colors"
                  />
                </div>
                <div className="font-mono text-sm text-gray-500 group-hover:text-red-400 mb-1">
                  ./{link.name.toLowerCase()}
                </div>
                <div className="font-bold text-white text-lg">
                  {link.name}
                </div>
              </a>
            ))}
          </motion.div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600 font-mono">
          <div>
            SYSTEM_STATUS: <span className="text-green-500">ONLINE</span>
          </div>
          <div>
            © 2026 ARYAN PANDEY. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
