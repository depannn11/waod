
import React from 'react';

interface DashboardProps {
  user: any;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const isDemo = !user;
  const metadata = user?.user_metadata || {};
  const name = metadata.full_name || user?.email?.split('@')[0] || 'Guest Explorer';
  const avatar = metadata.avatar_url || `https://ui-avatars.com/api/?name=${name}&background=f5f5f7&color=1d1d1f&rounded=true`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-10 animate-in fade-in duration-1000">
      {isDemo && (
        <div className="bg-[#f5f5f7]/60 border border-gray-100 p-8 rounded-[2.5rem] flex flex-col items-center text-center gap-4">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
              <svg className="w-5 h-5 text-[#86868b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="space-y-1">
              <p className="text-[#1d1d1f] font-bold text-lg">Demo Mode Active</p>
              <p className="text-[#86868b] text-[15px] font-medium max-w-sm">Sign in with Soraa to unlock persistent storage and personal analytics.</p>
            </div>
          </div>
          <button className="mt-2 px-8 py-3.5 bg-[#2997ff] text-white rounded-full font-bold text-[16px] hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-blue-500/20">
            Create Free Account
          </button>
        </div>
      )}

      {/* Header Profile - Centered as per screenshot */}
      <header className="flex flex-col items-center text-center gap-6 py-8">
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-[#f5f5f7] p-1 shadow-inner border border-gray-100">
             <img 
              src={avatar} 
              alt={name}
              className="w-full h-full rounded-full object-cover grayscale opacity-90"
            />
          </div>
          <div className="absolute bottom-1 right-2 bg-[#34c759] w-6 h-6 rounded-full border-4 border-white shadow-sm"></div>
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-[900] text-[#1d1d1f] tracking-tighter">
            {isDemo ? 'Soraa Platform Demo.' : `Hello, ${name.split(' ')[0]}.`}
          </h1>
          <p className="text-xl text-[#86868b] font-medium tracking-tight">System overview for today, Januari 2026.</p>
        </div>
      </header>

      {/* Stats Grid - Vertical Stack as per Screenshot visual focus */}
      <section className="space-y-8">
        {/* Deployment Load */}
        <div className="bg-[#f5f5f7]/30 border border-gray-100 p-10 rounded-[2.5rem] relative overflow-hidden group hover:bg-white hover:shadow-2xl transition-all duration-700">
          <div className="flex flex-col h-full">
            <span className="text-[12px] font-black uppercase tracking-[0.2em] text-[#86868b] mb-4">Deployment Load</span>
            <h4 className="text-[80px] font-[900] text-[#1d1d1f] tracking-tighter leading-none">
              0.42<span className="text-3xl text-gray-300 ml-2 font-bold uppercase tracking-widest">ms</span>
            </h4>
            <div className="mt-12">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-full text-[13px] font-black">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Optimal
              </span>
            </div>
          </div>
        </div>

        {/* Global Uptime */}
        <div className="bg-[#f5f5f7]/30 border border-gray-100 p-10 rounded-[2.5rem] relative overflow-hidden group hover:bg-white hover:shadow-2xl transition-all duration-700">
          <div className="flex flex-col h-full">
            <span className="text-[12px] font-black uppercase tracking-[0.2em] text-[#86868b] mb-4">Global Uptime</span>
            <h4 className="text-[80px] font-[900] text-[#1d1d1f] tracking-tighter leading-none">
              99.9<span className="text-4xl text-gray-300 ml-1 font-bold">%</span>
            </h4>
            <div className="mt-12 space-y-3">
              <div className="w-full bg-gray-200/50 h-2 rounded-full overflow-hidden">
                <div className="bg-[#2997ff] h-full w-[99.9%] rounded-full shadow-[0_0_10px_rgba(41,151,255,0.5)]" />
              </div>
              <p className="text-[14px] text-[#86868b] font-bold tracking-tight">All 14 regions operational</p>
            </div>
          </div>
        </div>

        {/* Security Engine - Dark Mode */}
        <div className="bg-[#1d1d1f] p-10 rounded-[3rem] shadow-2xl flex flex-col justify-between min-h-[400px] text-white hover:scale-[1.01] transition-all duration-700">
          <div>
            <span className="text-[12px] font-black uppercase tracking-[0.2em] text-gray-500 mb-6 block">Security Engine</span>
            <h4 className="text-6xl font-[900] leading-[1] tracking-tighter mt-4">Active<br/>Shielding</h4>
          </div>
          <div className="mt-auto pt-12 flex items-center gap-3">
             <div className="w-3 h-3 bg-[#2997ff] rounded-full shadow-[0_0_10px_rgba(41,151,255,0.8)]" />
             <p className="text-[16px] text-gray-400 font-bold">2.4M requests filtered</p>
          </div>
        </div>
      </section>

      {/* Main Content Area - Deployment History */}
      <section className="bg-[#f5f5f7]/30 border border-gray-100 rounded-[3.5rem] p-10 group hover:bg-white hover:shadow-2xl transition-all duration-700">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h3 className="text-[32px] font-[900] tracking-tighter text-[#1d1d1f]">Deployment History</h3>
            <p className="text-[#86868b] text-lg font-medium mt-1">Real-time logs from your global edge clusters.</p>
          </div>
          <button className="px-6 py-2.5 border border-gray-200 rounded-full text-sm font-black text-[#1d1d1f] hover:bg-gray-50 transition-all active:scale-95">Download Audit Log</button>
        </div>
        
        <div className="space-y-4">
          {[
            { msg: 'Cluster HKG-1 Auto-scaled', time: 'Just now', type: 'System' },
            { msg: 'Production Release v2.4.1', time: '14 minutes ago', type: 'Deploy' },
            { msg: 'SSL Certificate Auto-renewed', time: '2 hours ago', type: 'Security' },
            { msg: 'Database Migration Completed', time: '5 hours ago', type: 'Data' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-6 hover:bg-[#fbfbfd] rounded-3xl transition-all border border-transparent hover:border-gray-100 group/item">
               <div className="flex items-center gap-6">
                 <div className="w-14 h-14 bg-white shadow-sm rounded-2xl flex items-center justify-center text-[#1d1d1f] group-hover/item:scale-110 transition-all">
                   <span className="font-black text-xs uppercase text-gray-400">{item.type[0]}</span>
                 </div>
                 <div>
                   <p className="font-black text-[18px] text-[#1d1d1f] group-hover/item:text-[#2997ff] transition-colors tracking-tight">{item.msg}</p>
                   <p className="text-[14px] text-[#86868b] font-bold">{item.time}</p>
                 </div>
               </div>
               <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity">
                 <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
               </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
