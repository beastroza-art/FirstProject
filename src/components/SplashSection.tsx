import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface SplashSectionProps {
  onConfirm: () => void;
}

export default function SplashSection({ onConfirm }: SplashSectionProps) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    // Progress loading bar effect
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    // Auto-transition to home after 2.3 seconds
    const timeout = setTimeout(() => {
      onConfirm();
    }, 2300);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onConfirm]);

  return (
    <div className="fixed inset-0 bg-[#f9f9f9] w-full h-full flex flex-col justify-between items-center relative overflow-hidden z-50">
      
      {/* Background radial soft light gradient */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-red-100/30 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content: Logo & Badge */}
      <main className="flex-1 flex flex-col items-center justify-center w-full px-5 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          {/* Logo container using the high fidelity transparent logo from public links */}
          <div className="w-48 h-48 sm:w-56 sm:h-56 bg-white rounded-full flex items-center justify-center p-3 shadow-md border border-gray-100/50">
            <img 
              alt="Pizza Prime Logo" 
              className="w-full h-full object-contain rounded-full" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmKcnuI-q4NM3u3T7tT7qfmaxaoTt3sndXPpgVLocMO1LQa4VZhfT1oYcdzFLobT2qyWVMaSrOQzxO-6_xC9bzaUBIuEg1xeJj-d0fUovxoz3Zf12KAQ_TPy7IJVY7dgbEdIiSoOs29WhUMVYBuqiLxv8x2Mjy-HOqkOdFSW23iZqPBAF03gq1olU4lMr6OjWXpRYUWxPmgR1Axh1_VX-0fI-tj4Z67BeRJlHttVH26qzEMHkgSPgaY2da3dHxcmSJ7dUIdJCre0Qd" 
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>

        {/* Text presentation */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center space-y-1.5"
        >
          <span className="font-display font-black text-2xl tracking-tighter text-[#af101a] block">
            PIZZA PRIME
          </span>
          <span className="font-display text-[11px] font-bold tracking-widest text-[#cca730] block uppercase">
            Experiencia Premium
          </span>
        </motion.div>
      </main>

      {/* Bottom Container: Progress line and slogan */}
      <div className="w-full max-w-[400px] flex flex-col items-center justify-center px-6 pb-12 relative z-10 space-y-4">
        
        {/* Loading Progress Bar */}
        <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden shadow-xs relative">
          <div 
            className="h-full bg-[#af101a] rounded-full transition-all duration-100 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* Slogan */}
        <p className="font-sans text-xs text-gray-400 text-center tracking-wide leading-tight">
          Experiencia Gourmet en cada Porción
        </p>

        {/* Quick entry action */}
        <button 
          onClick={onConfirm}
          className="text-[10px] font-display font-extrabold text-[#af101a] hover:underline uppercase tracking-widest cursor-pointer px-4 py-1 rounded"
        >
          Saltar Intro
        </button>
      </div>

    </div>
  );
}
