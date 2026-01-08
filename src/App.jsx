import React from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero'; 
import Stats from './components/Stats';
import Projects from './components/Projects';

function App() {
  return (
    <Layout>
      <Hero />
      <Stats />
      <Projects />
    </Layout>
  );
}

export default App;