import React from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero'; 
import Stats from './components/Stats';

function App() {
  return (
    <Layout>
      <Hero />
      <Stats />
    </Layout>
  );
}

export default App;