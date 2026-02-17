
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../types';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-[85vh] flex flex-col items-center justify-center text-center px-6 pt-16 sm:pt-24">
      <div className="max-w-4xl space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        {/* Status Indicator */}
        <div className="flex flex-col items-center gap-2 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-100 shadow-sm transition-all hover:bg-green-100 cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-black text-green-700 tracking-[0.2em] uppercase">Online</span>
          </div>
        </div>

        <h1 className="text-[3rem] sm:text-7xl md:text-[6.5rem] font-[900] text-[#1d1d1f] tracking-tighter leading-[1] transition-all">
          Soraa deployment.
        </h1>
        
        <div className="space-y-1">
          <p className="text-[18px] sm:text-2xl text-[#86868b] max-w-2xl mx-auto leading-relaxed font-semibold tracking-tight">
            support by surge.sh, free deployment platform, for websites
          </p>
        </div>
        
        <div className="pt-8 sm:pt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => navigate(AppRoute.DASHBOARD)}
            className="w-full sm:w-auto group relative flex items-center justify-center gap-3 bg-[#1d1d1f] text-white px-10 py-5 rounded-full text-[17px] font-bold hover:bg-black transition-all transform active:scale-95 shadow-2xl overflow-hidden"
          >
            <span className="relative z-10 font-bold">Launch Console</span>
            <svg className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-20 transition-opacity"></div>
          </button>
          
          <button className="w-full sm:w-auto px-8 py-5 text-[#1d1d1f] hover:bg-white rounded-full text-[17px] font-bold transition-all flex items-center justify-center gap-1 group">
            View Technical Specs
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="mt-16 sm:mt-24 w-full max-w-5xl px-4 animate-in zoom-in-95 duration-1000 delay-500 fill-mode-both">
        <div 
          className="aspect-video bg-white/40 apple-blur rounded-[2rem] sm:rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.12)] border border-white/60 overflow-hidden p-2 sm:p-4 flex flex-col relative group cursor-pointer" 
          onClick={() => navigate(AppRoute.DASHBOARD)}
        >
          {/* Pro Mockup Wrapper */}
          <div className="w-full h-full bg-[#1d1d1f] rounded-[1.5rem] sm:rounded-[2.8rem] shadow-2xl flex flex-col overflow-hidden relative">
            {/* Window Header */}
            <div className="h-8 sm:h-12 border-b border-white/5 flex items-center px-4 sm:px-8 gap-2 bg-white/5">
              <div className="flex gap-1.5 sm:gap-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56]"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27c93f]"></div>
              </div>
              <div className="flex-grow flex justify-center mr-6 sm:mr-10">
                <div className="text-[9px] sm:text-[11px] font-mono text-gray-500 uppercase tracking-widest font-bold">Soraa Cloud — Edge Manager</div>
              </div>
            </div>
            
            {/* Terminal Interface */}
            <div className="flex-grow p-4 sm:p-10 font-mono text-[10px] sm:text-[15px] flex flex-col sm:flex-row gap-6 sm:gap-12 text-left">
              <div className="flex-1 space-y-3 opacity-90 overflow-hidden">
                <div className="flex gap-3">
                   <span className="text-blue-400 font-bold">$</span>
                   <span className="text-white font-bold">soraa deploy --env production</span>
                </div>
                <div className="text-gray-400 leading-relaxed border-l-2 border-white/10 pl-4 py-1">
                   <p className="flex items-center gap-2">
                     <span className="w-1 h-1 bg-green-400 rounded-full animate-ping"></span>
                     Optimizing binary for 24 edge regions...
                   </p>
                   <p className="mt-1">✓ Assets minified [1.4MB → 240KB]</p>
                   <p>✓ Edge Middleware synthesized</p>
                   <p className="text-green-400 mt-2 font-bold flex items-center gap-2">
                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                     Deployment Live: soraa.sh/v/8f2k
                   </p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-white/5 apple-blur">
            <span className="px-10 py-4 bg-white text-[#1d1d1f] font-black text-lg rounded-full shadow-2xl tracking-tight transform group-hover:scale-105 transition-transform">
              EXPLORE PLATFORM
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
