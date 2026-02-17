
import React from 'react';

interface LegalProps {
  type: 'terms' | 'privacy';
}

const Legal: React.FC<LegalProps> = ({ type }) => {
  const isTerms = type === 'terms';
  
  return (
    <div className="max-w-3xl mx-auto px-6 py-20 animate-in fade-in duration-700">
      <h1 className="text-4xl font-bold tracking-tight mb-4">
        {isTerms ? 'Terms of Use' : 'Privacy Policy'}
      </h1>
      <p className="text-[#86868b] mb-12">Last Updated: Januari 2026</p>
      
      <div className="prose prose-apple text-[#1d1d1f] space-y-8 text-[17px] leading-relaxed">
        <section>
          <h2 className="text-2xl font-semibold mb-4 tracking-tight">1. Services</h2>
          <p>
            Welcome to Soraa deployment. By accessing our platform, you agree to follow the design 
            standards and performance guidelines set forth by our engineering team. We provide 
            minimalist, high-speed infrastructure for modern web applications.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 tracking-tight">2. User Data</h2>
          <p>
            Soraa prioritizes your privacy. In our demo mode, we do not persist any data. For registered users, 
            we only store necessary authentication metadata provided by third-party providers like Google.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 tracking-tight">3. Global Infrastructure</h2>
          <p>
            Our platform utilizes Supabase and global edge computing to ensure sub-millisecond 
            latencies across the globe. You agree not to use our deployment services for malicious 
            purposes or unauthorized system stress testing.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 tracking-tight">4. Support</h2>
          <p>
            Contact Soraa support for technical inquiries regarding integration or system health. 
            We are dedicated to maintaining 99.9% uptime for all visionary deployments.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Legal;
