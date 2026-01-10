import React, { useState } from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ArcBot from './components/ArcBot';
import { Analytics } from '@vercel/analytics/react';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <Layout>
      <Hero onOpenChat={() => setIsChatOpen(true)} />

      <div id="about">
        <Stats />
      </div>

      <div id="projects">
        <Projects />
      </div>

      <Contact />

      <ArcBot
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onOpen={() => setIsChatOpen(true)}
      />
      <Analytics />
    </Layout>
  );
}

export default App;
