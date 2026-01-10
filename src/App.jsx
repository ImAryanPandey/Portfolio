import React from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero'; 
import Stats from './components/Stats';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ArcBot from './components/ArcBot';

function App() {
  return (
    <Layout>
      <Hero />
      <Stats />
      <Projects />
      <Contact />
      <ArcBot />
    </Layout>
  );
}

export default App;