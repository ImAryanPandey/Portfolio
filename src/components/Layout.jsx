import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans selection:bg-red-900 selection:text-white">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-77.5 w-77.5 rounded-full bg-red-900 opacity-20 blur-[100px]"></div>
      </div>

      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
