
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../services/supabase';

interface AdminProps {
  user: any;
}

const Admin: React.FC<AdminProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'users' | 'deploys' | 'analysis' | 'chat'>('analysis');
  const [messages, setMessages] = useState<any[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [deploys, setDeploys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Fetch all data from real database
  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Users (Profiles)
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!profileError) setUsers(profileData || []);

      // 2. Fetch Deployments
      const { data: deployData, error: deployError } = await supabase
        .from('deployments')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!deployError) setDeploys(deployData || []);

      // 3. Fetch Initial Messages
      const { data: messageData, error: msgError } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true })
        .limit(100);
      
      if (!msgError) setMessages(messageData || []);
    } catch (e) {
      console.error("Database fetch failed", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Setup Realtime for Chat
    const channel = supabase
      .channel('global-chat-room')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'messages' 
      }, (payload) => {
        setMessages((current) => {
          // Prevent duplicates
          if (current.find(m => m.id === payload.new.id)) return current;
          return [...current, payload.new];
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const myName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Admin';
    const tempInput = chatInput;
    setChatInput('');

    const { error } = await supabase.from('messages').insert([
      { 
        user_id: user.id, 
        user_name: myName, 
        text: tempInput 
      }
    ]);

    if (error) {
      alert("Error sending message: " + error.message);
      setChatInput(tempInput);
    }
  };

  const togglePremium = async (userId: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('profiles')
      .update({ is_premium: !currentStatus })
      .eq('id', userId);

    if (error) {
      alert("Failed to update status");
    } else {
      setUsers(users.map(u => u.id === userId ? { ...u, is_premium: !currentStatus } : u));
    }
  };

  const deleteUser = async (userId: string) => {
    if (!window.confirm('WARNING: This will permanently delete this profile from the database.')) return;
    
    const { error } = await supabase.from('profiles').delete().eq('id', userId);
    if (error) {
      alert("Failed to delete user: " + error.message);
    } else {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  if (loading && activeTab !== 'chat') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
        <div className="w-10 h-10 border-4 border-[#f5f5f7] border-t-[#1d1d1f] rounded-full animate-spin" />
        <p className="text-[13px] font-black uppercase tracking-widest text-[#86868b]">Syncing Database...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-8 animate-in fade-in duration-1000">
      {/* Premium Sidebar */}
      <aside className="w-full lg:w-72 shrink-0">
        <div className="bg-white/40 apple-blur border border-white/60 p-6 rounded-[2.5rem] shadow-sm sticky top-24">
          <div className="mb-10">
             <h2 className="text-2xl font-[900] text-[#1d1d1f] tracking-tighter">System Console</h2>
             <div className="flex items-center gap-2 mt-2">
               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
               <span className="text-[11px] font-black uppercase tracking-widest text-[#86868b]">Network Active</span>
             </div>
          </div>

          <nav className="space-y-2">
            {[
              { id: 'analysis', label: 'Analysis', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
              { id: 'users', label: 'Accounts', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
              { id: 'deploys', label: 'Deployments', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
              { id: 'chat', label: 'Global Chat', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-[15px] font-bold transition-all ${
                  activeTab === tab.id 
                    ? 'bg-[#1d1d1f] text-white shadow-xl scale-[1.02]' 
                    : 'text-[#86868b] hover:bg-white hover:text-[#1d1d1f] hover:shadow-sm'
                }`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={tab.icon} />
                </svg>
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="mt-12 p-5 bg-[#f5f5f7]/50 rounded-3xl">
            <p className="text-[11px] font-black uppercase text-[#86868b] tracking-widest mb-2">Logged in as</p>
            <p className="font-bold text-[#1d1d1f] truncate">{user?.email}</p>
          </div>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="flex-grow">
        
        {activeTab === 'analysis' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-100 p-8 rounded-[3rem] shadow-sm">
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#86868b] block mb-6">Database Health</span>
                <div className="flex items-end gap-2 h-32 mb-8">
                  {[20, 35, 25, 60, 45, 80, 50, 95, 70, 85].map((h, i) => (
                    <div key={i} className="flex-1 bg-blue-500/10 rounded-t-xl relative overflow-hidden">
                       <div className="absolute bottom-0 w-full bg-[#2997ff] transition-all duration-1000" style={{ height: `${h}%` }} />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-end">
                   <div>
                     <p className="text-4xl font-[900] text-[#1d1d1f] tracking-tighter">{users.length * 12}</p>
                     <p className="text-[13px] font-bold text-[#86868b]">API Requests (24h)</p>
                   </div>
                   <div className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[11px] font-black">+8.4%</div>
                </div>
              </div>

              <div className="bg-[#1d1d1f] p-8 rounded-[3rem] shadow-2xl text-white flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 block mb-6">Regional Load</span>
                  <div className="space-y-4">
                    {['US-East', 'EU-West', 'ASIA-South'].map((r, i) => (
                      <div key={r} className="space-y-1">
                        <div className="flex justify-between text-[12px] font-black uppercase text-gray-400">
                          <span>{r}</span>
                          <span>{Math.floor(Math.random() * 40) + 10}%</span>
                        </div>
                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-white h-full rounded-full" style={{ width: `${Math.random() * 60 + 20}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <button className="mt-8 py-3 bg-white text-[#1d1d1f] rounded-full text-[14px] font-black transition-all hover:bg-gray-100 active:scale-95">Rebalance Network</button>
              </div>
            </div>

            <div className="bg-white border border-gray-100 p-10 rounded-[3.5rem] shadow-sm">
               <h3 className="text-2xl font-[900] tracking-tighter mb-2 text-[#1d1d1f]">Production Summary</h3>
               <p className="text-[#86868b] font-medium mb-10">Current state of the Soraa deployment fabric.</p>
               <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                  {[
                    { l: 'Total Users', v: users.length },
                    { l: 'Premium', v: users.filter(u => u.is_premium).length },
                    { l: 'Live Deploys', v: deploys.length },
                    { l: 'Messages', v: messages.length },
                  ].map(stat => (
                    <div key={stat.l}>
                      <p className="text-[11px] font-black uppercase tracking-widest text-[#86868b] mb-1">{stat.l}</p>
                      <p className="text-3xl font-[900] text-[#1d1d1f] tracking-tighter">{stat.v}</p>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white border border-gray-100 rounded-[3rem] shadow-sm overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/20">
              <div>
                <h3 className="text-2xl font-[900] tracking-tighter text-[#1d1d1f]">User Directory</h3>
                <p className="text-[#86868b] text-[14px] font-medium">Manage privileges and account status.</p>
              </div>
              <button onClick={fetchData} className="p-3 bg-white border border-gray-100 rounded-full hover:bg-gray-50 transition-all active:rotate-180 duration-500">
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 text-[#86868b] text-[10px] font-black uppercase tracking-[0.2em]">
                    <th className="px-8 py-4">Identity</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4">Join Date</th>
                    <th className="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {users.map(u => (
                    <tr key={u.id} className="group hover:bg-gray-50/30 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <img src={u.avatar_url || `https://ui-avatars.com/api/?name=${u.full_name || u.email}&background=f5f5f7&color=1d1d1f&rounded=true`} className="w-10 h-10 rounded-full grayscale opacity-80" alt="" />
                          <div>
                            <p className="font-bold text-[#1d1d1f] tracking-tight">{u.full_name || 'Anonymous'}</p>
                            <p className="text-[12px] text-[#86868b] font-medium">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                         <button 
                          onClick={() => togglePremium(u.id, !!u.is_premium)}
                          className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                            u.is_premium ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                          }`}
                         >
                           {u.is_premium ? 'Premium' : 'Standard'}
                         </button>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-[13px] font-bold text-[#86868b]">
                          {u.created_at ? new Date(u.created_at).toLocaleDateString('en-GB') : 'Unknown'}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button onClick={() => deleteUser(u.id)} className="p-2.5 text-red-500/50 hover:text-red-500 hover:bg-red-50 rounded-full transition-all">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr><td colSpan={4} className="py-20 text-center font-medium italic text-gray-400">Database is empty.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'deploys' && (
          <div className="bg-white border border-gray-100 rounded-[3rem] shadow-sm overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500">
             <div className="p-8 border-b border-gray-50 flex items-center justify-between">
              <h3 className="text-2xl font-[900] tracking-tighter text-[#1d1d1f]">Deployment Pipeline</h3>
              <span className="px-4 py-1.5 bg-[#f5f5f7] rounded-full text-[10px] font-black uppercase tracking-widest">{deploys.length} Records</span>
            </div>
            <div className="divide-y divide-gray-50">
              {deploys.length === 0 ? (
                <div className="p-32 text-center text-[#86868b] font-medium italic">No deployment history found.</div>
              ) : (
                deploys.map(d => (
                  <div key={d.id} className="p-8 flex items-center justify-between hover:bg-gray-50/20 transition-all">
                    <div className="flex items-center gap-8">
                      <div className={`w-3.5 h-3.5 rounded-full shadow-sm ${
                        d.status === 'success' ? 'bg-[#34c759]' : d.status === 'processing' ? 'bg-[#2997ff] animate-pulse' : 'bg-[#ff3b30]'
                      }`} />
                      <div>
                        <p className="font-bold text-[#1d1d1f] text-xl tracking-tight">{d.project_name}</p>
                        <p className="text-[13px] text-[#86868b] font-medium">{d.region} • {new Date(d.created_at).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                         d.status === 'success' ? 'text-green-600 bg-green-50' : d.status === 'processing' ? 'text-blue-600 bg-blue-50' : 'text-red-600 bg-red-50'
                       }`}>{d.status}</span>
                       <button className="p-2 bg-gray-50 rounded-full hover:bg-gray-100">
                         <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                       </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="bg-white border border-gray-100 rounded-[3rem] shadow-sm flex flex-col h-[75vh] animate-in fade-in slide-in-from-right-4 duration-500 overflow-hidden relative">
            {/* Chat Header */}
            <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-white/50 apple-blur sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#1d1d1f] rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">B</div>
                <div>
                  <h3 className="font-[900] text-[#1d1d1f] tracking-tight">Global Bridge</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-[#34c759] rounded-full"></span>
                    <span className="text-[11px] font-black uppercase tracking-widest text-[#86868b]">Secured Link</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-grow p-8 overflow-y-auto space-y-6 bg-[#fbfbfd] custom-scrollbar">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-[#86868b] gap-4">
                   <div className="w-16 h-16 bg-[#f5f5f7] rounded-full flex items-center justify-center">
                     <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                   </div>
                   <p className="font-bold tracking-tight">Channel established. Say hello.</p>
                </div>
              )}
              {messages.map((msg, i) => {
                const isMe = msg.user_id === user?.id;
                return (
                  <div key={msg.id || i} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                    <div className="flex items-baseline gap-2 mb-1 px-2">
                      <span className="text-[11px] font-black text-[#1d1d1f] uppercase tracking-wider">{msg.user_name}</span>
                      <span className="text-[9px] font-bold text-[#86868b]">{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className={`max-w-[85%] px-6 py-4 rounded-[1.8rem] shadow-sm ${
                      isMe ? 'bg-[#1d1d1f] text-white rounded-tr-none' : 'bg-white border border-gray-100 text-[#1d1d1f] rounded-tl-none'
                    }`}>
                      <p className="text-[15px] font-medium leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={sendMessage} className="p-6 bg-white/80 apple-blur border-t border-gray-50">
              <div className="relative group">
                <input 
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Sync a thought..."
                  className="w-full pl-8 pr-20 py-5 rounded-full bg-[#f5f5f7] border border-transparent focus:bg-white focus:border-blue-500/20 transition-all outline-none font-medium text-[16px] shadow-inner"
                />
                <button 
                  type="submit" 
                  className="absolute right-2 top-2 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:scale-105 active:scale-90 transition-all shadow-xl"
                >
                  <svg className="w-5 h-5 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </button>
              </div>
            </form>
          </div>
        )}

      </main>
    </div>
  );
};

export default Admin;
