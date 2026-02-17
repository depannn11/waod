import React, { useState } from 'react';
import { supabase } from '../services/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [authState, setAuthState] = useState<'signin' | 'signup' | 'reset'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  if (!isOpen) return null;

  const resetMessages = () => setMessage(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    resetMessages();

    try {
      if (authState === 'signup') {
        const { error } = await (supabase.auth as any).signUp({ email, password });
        if (error) throw error;
        setMessage({ type: 'success', text: "Verification link sent! Please check your inbox." });
      } else if (authState === 'signin') {
        const { error } = await (supabase.auth as any).signInWithPassword({ email, password });
        if (error) throw error;
        onClose();
      } else if (authState === 'reset') {
        const { error } = await (supabase.auth as any).resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/#reset-password`,
        });
        if (error) throw error;
        setMessage({ type: 'success', text: "Instructions sent. Follow the link in your email." });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    resetMessages();
    const { error } = await (supabase.auth as any).signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin }
    });
    if (error) setMessage({ type: 'error', text: error.message });
  };

  const toggleState = (state: 'signin' | 'signup' | 'reset') => {
    resetMessages();
    setAuthState(state);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-md transition-all duration-500 animate-in fade-in">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />
      
      {/* Modal Container */}
      <div className="relative bg-[#fbfbfd] w-full max-w-[500px] rounded-t-[2.5rem] sm:rounded-[3rem] shadow-[0_32px_100px_-16px_rgba(0,0,0,0.5)] border-t sm:border border-white overflow-hidden animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-12 sm:zoom-in-95 duration-700 flex flex-col max-h-[94dvh]">
        
        {/* Close Button (Cross) - Accessible on all screen sizes */}
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 sm:top-10 sm:right-10 p-2.5 bg-gray-100/50 hover:bg-gray-100 rounded-full transition-all active:scale-90 z-10"
          aria-label="Close"
        >
          <svg className="w-6 h-6 sm:w-5 sm:h-5 text-gray-500 sm:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Mobile Indicator Handle */}
        <div className="sm:hidden w-12 h-1.5 bg-gray-200 rounded-full mx-auto mt-4 shrink-0" />

        <div className="px-6 py-10 sm:p-14 overflow-y-auto custom-scrollbar flex-grow">
          {/* Header */}
          <div className="mb-10 text-center sm:text-left">
            <h2 className="text-[32px] sm:text-4xl font-[900] tracking-tighter text-[#1d1d1f]">
              {authState === 'signin' && 'Welcome Back.'}
              {authState === 'signup' && 'Join the Vision.'}
              {authState === 'reset' && 'Recovery.'}
            </h2>
            <p className="text-[#86868b] text-[15px] sm:text-[17px] font-medium mt-1 leading-snug">
              {authState === 'signin' && 'Sign in to access your global console.'}
              {authState === 'signup' && 'Deploy your first project in seconds.'}
              {authState === 'reset' && "Follow the reset steps in your inbox."}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-[#86868b] uppercase tracking-[0.2em] ml-1">Work Email</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-5 rounded-[1.25rem] bg-white border border-gray-100 shadow-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/30 transition-all outline-none text-[16px] font-medium text-[#1d1d1f] placeholder:text-gray-300"
                placeholder="name@company.com"
              />
            </div>

            {authState !== 'reset' && (
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <label className="text-[11px] font-black text-[#86868b] uppercase tracking-[0.2em] ml-1">Password</label>
                  {authState === 'signin' && (
                    <button 
                      type="button"
                      onClick={() => toggleState('reset')}
                      className="text-[12px] text-blue-600 font-bold hover:underline mb-1 px-1"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-6 py-5 rounded-[1.25rem] bg-white border border-gray-100 shadow-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/30 transition-all outline-none text-[16px] font-medium text-[#1d1d1f] placeholder:text-gray-300"
                  placeholder="••••••••"
                />
              </div>
            )}

            {message && (
              <div className={`p-5 rounded-[1.25rem] text-[13px] sm:text-[14px] font-bold animate-in slide-in-from-top-2 flex items-center gap-3 border ${
                message.type === 'success' ? 'bg-green-50 border-green-100 text-green-800' : 'bg-red-50 border-red-100 text-red-800'
              }`}>
                <div className={`w-2 h-2 rounded-full shrink-0 ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
                {message.text}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#1d1d1f] text-white py-5 rounded-[1.25rem] font-black text-[18px] hover:bg-black transition-all active:scale-[0.98] shadow-2xl disabled:opacity-50 mt-2"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-[3px] border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Loading</span>
                </div>
              ) : (
                authState === 'signin' ? 'Sign In' : authState === 'signup' ? 'Create Account' : 'Recover Account'
              )}
            </button>
          </form>

          {/* Social Auth List */}
          {authState !== 'reset' && (
            <>
              <div className="relative my-12">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-[0.4em] font-black"><span className="bg-[#fbfbfd] px-5 text-[#86868b]">Fast Login</span></div>
              </div>

              <div className="grid grid-cols-1 gap-5">
                <button 
                  onClick={() => handleOAuthLogin('google')}
                  className="flex items-center justify-center gap-5 bg-white border border-gray-200 py-6 rounded-[1.5rem] font-black text-[19px] hover:bg-gray-50 transition-all active:scale-[0.98] shadow-md group"
                >
                  <svg className="w-8 h-8 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>
                <button 
                  onClick={() => handleOAuthLogin('github')}
                  className="flex items-center justify-center gap-5 bg-[#1d1d1f] text-white py-6 rounded-[1.5rem] font-black text-[19px] hover:bg-black transition-all active:scale-[0.98] shadow-xl group"
                >
                  <svg className="w-8 h-8 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </button>
              </div>
            </>
          )}

          {/* Switch States */}
          <div className="text-center mt-12 mb-6">
            <p className="text-[#86868b] text-[15px] font-bold">
              {authState === 'signin' && (
                <>
                  New to Soraa? 
                  <button onClick={() => toggleState('signup')} className="ml-2 text-blue-600 font-extrabold hover:underline underline-offset-4 transition-all">Create Account</button>
                </>
              )}
              {authState === 'signup' && (
                <>
                  Already have an account? 
                  <button onClick={() => toggleState('signin')} className="ml-2 text-blue-600 font-extrabold hover:underline underline-offset-4 transition-all">Sign In</button>
                </>
              )}
              {authState === 'reset' && (
                <button onClick={() => toggleState('signin')} className="text-blue-600 font-black hover:underline flex items-center justify-center gap-2 mx-auto underline-offset-4 transition-all">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M15 19l-7-7 7-7" /></svg>
                  Return to Login
                </button>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;