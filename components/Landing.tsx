
import React from 'react';
import Hero from './Hero';

const Landing: React.FC = () => {
  return (
    <div className="pb-20">
      <Hero />
      
      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12 mt-32">
        <div className="space-y-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <h3 className="text-xl font-semibold tracking-tight">Lightning Fast</h3>
          <p className="text-[#86868b] leading-relaxed">Built with the latest technologies to ensure instant interactions and zero latency.</p>
        </div>
        
        <div className="space-y-4">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
          <h3 className="text-xl font-semibold tracking-tight">Privacy First</h3>
          <p className="text-[#86868b] leading-relaxed">Your data belongs to you. We use industry-standard encryption for everything.</p>
        </div>
        
        <div className="space-y-4">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
          </div>
          <h3 className="text-xl font-semibold tracking-tight">Modular Design</h3>
          <p className="text-[#86868b] leading-relaxed">Customize your dashboard to fit your specific needs and personal aesthetic.</p>
        </div>
      </section>
    </div>
  );
};

export default Landing;
