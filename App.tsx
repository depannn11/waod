
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { supabase } from './services/supabase';
import { AppRoute } from './types';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import Admin from './components/Admin';
import Legal from './components/Legal';

const ADMIN_EMAIL = 'admin@xte.web.id';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (supabase.auth as any).getSession().then(({ data: { session } }: any) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = (supabase.auth as any).onAuthStateChange((_event: any, session: any) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#fbfbfd]">
        <div className="w-12 h-12 border-4 border-[#86868b] border-t-[#1d1d1f] rounded-full animate-spin"></div>
      </div>
    );
  }

  const isAdmin = user?.email === ADMIN_EMAIL;

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col selection:bg-blue-100">
        <Navbar user={user} />
        <main className="flex-grow pt-14">
          <Routes>
            <Route path={AppRoute.HOME} element={<Landing />} />
            <Route path={AppRoute.DASHBOARD} element={<Dashboard user={user} />} />
            <Route 
              path={AppRoute.ADMIN} 
              element={isAdmin ? <Admin user={user} /> : <Navigate to={AppRoute.HOME} replace />} 
            />
            <Route path={AppRoute.TERMS} element={<Legal type="terms" />} />
            <Route path={AppRoute.PRIVACY} element={<Legal type="privacy" />} />
          </Routes>
        </main>
        
        <footer className="bg-[#f5f5f7] border-t border-gray-200 py-12">
          <div className="max-w-6xl mx-auto px-6 text-[12px] text-[#86868b] leading-relaxed">
            <p className="mb-4 text-[#1d1d1f] font-medium uppercase tracking-widest">
              Soraa deployment
            </p>
            <p className="mb-4">
              Copyright © 2026 Soraa Systems. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link to={AppRoute.PRIVACY} className="hover:underline transition-colors hover:text-black">Privacy Policy</Link>
              <span className="text-gray-300">|</span>
              <Link to={AppRoute.TERMS} className="hover:underline transition-colors hover:text-black">Terms of Use</Link>
            </div>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
