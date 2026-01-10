import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ChevronRight, Cpu, MessageSquare } from 'lucide-react';

const ArcBot = ({ isOpen, onClose, onOpen }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', content: 'ARC SYSTEM v2.0 [ONLINE]' },
    { type: 'bot', content: 'Identity confirmed: System ARC. \nConnected to Aryan\'s Neural Link. \nState your query.' }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, loading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleCommand = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const cmd = input.trim();

    setHistory(prev => [...prev, { type: 'user', content: cmd }]);
    setInput('');
    setLoading(true);

    try {
      const apiHistory = history
        .filter(msg => msg.type !== 'system')
        .map(msg => ({
          role: msg.type === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: cmd,
          history: apiHistory
        })
      });

      const data = await res.json();

      if (data.success) {
        setHistory(prev => [...prev, { type: 'bot', content: data.reply }]);
      } else {
        throw new Error(data.reply || 'Unknown Error');
      }
    } catch (err) {
      setHistory(prev => [
        ...prev,
        { type: 'system', content: `ERROR: ${err.message || 'CONNECTION SEVERED'}` }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={onOpen}
            className="fixed bottom-6 right-6 z-50 p-4 bg-red-600 hover:bg-red-500 text-white rounded-full shadow-lg shadow-red-900/20 transition-colors"
          >
            <MessageSquare size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-4 right-4 md:bottom-8 md:right-8 w-[90vw] md:w-112.5 h-150 bg-[#050505]/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl flex flex-col overflow-hidden z-50 font-mono text-sm"
            style={{ boxShadow: '0 0 50px -12px rgba(255, 0, 0, 0.15)' }}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Cpu size={18} className="text-red-500" />
                  <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                </div>
                <span className="text-gray-200 font-bold tracking-wider">SYSTEM_ARC</span>
              </div>
              <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-black/40">
              {history.map((msg, i) => (
                <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] ${
                      msg.type === 'user'
                        ? 'text-right'
                        : msg.type === 'system'
                        ? 'w-full text-center my-2'
                        : 'text-left'
                    }`}
                  >
                    {msg.type !== 'system' && (
                      <div
                        className={`text-[10px] mb-1 font-bold ${
                          msg.type === 'user' ? 'text-red-500' : 'text-blue-400'
                        }`}
                      >
                        {msg.type === 'user' ? 'USER@HOST' : 'ARC@CORE'}
                      </div>
                    )}

                    <div
                      className={`inline-block p-3 rounded-md border text-sm leading-relaxed whitespace-pre-wrap ${
                        msg.type === 'user'
                          ? 'bg-red-500/10 text-gray-200 border-red-500/20'
                          : msg.type === 'system'
                          ? 'bg-transparent border-none text-gray-600 text-xs font-mono uppercase tracking-widest'
                          : 'bg-[#111] text-gray-300 border-white/10'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 p-3 bg-[#111] border border-white/10 rounded-md">
                    <span className="w-1.5 h-1.5 bg-blue-500/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-blue-500/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-blue-500/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleCommand} className="p-3 border-t border-white/10 bg-black/60 flex gap-2 items-center">
              <ChevronRight className="text-red-500 shrink-0" size={18} />
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter command..."
                className="flex-1 bg-transparent text-white focus:outline-none placeholder-gray-600 font-mono text-sm"
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="text-gray-500 hover:text-red-500 disabled:opacity-50 disabled:hover:text-gray-500 transition-colors"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ArcBot;
