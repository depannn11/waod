
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { AppRoute } from '../types';
import AuthModal from './AuthModal';

interface NavbarProps {
  user: any;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleLogout = async () => {
    await (supabase.auth as any).signOut();
    navigate(AppRoute.HOME);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-14 glass-effect z-[60] border-b border-gray-100 flex items-center">
        <div className="max-w-6xl mx-auto w-full px-6 flex justify-between items-center h-full">
          <Link to={AppRoute.HOME} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-[#1d1d1f] rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 active:scale-95">
              <span className="text-white text-[16px] font-bold">S</span>
            </div>
            <span className="font-bold text-[19px] tracking-tight text-[#1d1d1f]">Soraa</span>
          </Link>

          <div className="flex items-center gap-6 text-[13px] font-medium text-[#1d1d1f]/70">
            <Link to={AppRoute.DASHBOARD} className="hover:text-black transition-colors">Explore</Link>
            <Link to={AppRoute.ADMIN} className="hover:text-black transition-colors font-bold text-blue-600">Admin</Link>
            
            {user ? (
              <div className="flex items-center gap-4">
                 <button 
                  onClick={handleLogout}
                  className="px-5 py-2 bg-[#1d1d1f] text-white rounded-full hover:bg-black transition-all active:scale-95 text-[12px] font-semibold"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="px-5 py-2 bg-[#1d1d1f] text-white rounded-full hover:bg-black transition-all active:scale-95 shadow-md text-[12px] font-semibold"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>
      
      {!user && (
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
        />
      )}
    </>
  );
};

export default Navbar;
