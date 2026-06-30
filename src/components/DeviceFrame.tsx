/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Smartphone, Laptop, Wifi, Battery, Signal, Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react';

interface DeviceFrameProps {
  children: React.ReactNode;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export default function DeviceFrame({ children, darkMode, setDarkMode }: DeviceFrameProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours().toString().padStart(2, '0');
      let minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#0b0f19] text-gray-100' : 'bg-slate-50 text-slate-800'}`}>
      {/* Desktop Controls (Hidden on Mobile) */}
      <div className="hidden lg:flex items-center justify-between px-8 py-4 border-b border-gray-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <span className="font-serif font-bold text-lg">p</span>
          </div>
          <div>
            <h1 className="font-serif font-bold text-lg leading-tight text-slate-900 dark:text-white">
              ePPID Pengadilan Agama Blitar
            </h1>
            <p className="text-xs text-slate-400 font-medium">Layanan Informasi Publik Digital & Modern</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Toggle Screen Mode */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all font-medium text-xs shadow-sm"
            id="view-toggle"
          >
            {isFullscreen ? (
              <>
                <Smartphone size={15} className="text-sky-600" />
                <span>Lihat Tampilan Mobile</span>
              </>
            ) : (
              <>
                <Laptop size={15} className="text-indigo-600" />
                <span>Lihat Layar Penuh</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Body Grid */}
      <div className={`flex flex-col lg:items-center lg:justify-center p-0 lg:p-6 transition-all duration-300 ${isFullscreen ? 'max-w-full' : ''}`}>
        {!isFullscreen ? (
          /* Phone Shell Mode (Desktop only, responsive mobile) */
          <div className="relative w-full lg:max-w-[430px] lg:h-[880px] lg:rounded-[55px] lg:border-[12px] lg:border-slate-900 lg:dark:border-slate-950 lg:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] lg:dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] bg-white dark:bg-slate-900 overflow-hidden flex flex-col transition-all duration-300">
            
            {/* Phone Notch/Dynamic Island & Status bar (Desktop Shell Only) */}
            <div className="hidden lg:flex items-center justify-between px-8 pt-4 pb-2 bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-gray-100 font-sans select-none z-50">
              <span className="text-xs font-semibold tracking-tight">{currentTime}</span>
              
              {/* Dynamic Island Notch */}
              <div className="absolute left-1/2 -translate-x-1/2 top-4 w-28 h-6 bg-slate-950 rounded-full flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-900/60 mr-12 border border-slate-800"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-blue-900/80"></div>
              </div>
 
              <div className="flex items-center gap-1.5 text-[11px] font-bold">
                <Signal size={13} />
                <span className="text-[10px]">5G</span>
                <Wifi size={13} />
                <Battery size={16} className="rotate-0" />
              </div>
            </div>
 
            {/* Content Container (Matches full height on mobile, fits inside phone wrapper on desktop) */}
            <div className="flex-1 flex flex-col relative overflow-y-auto lg:h-[calc(100%-40px)]">
              {children}
            </div>
 
            {/* Home indicator bar (Desktop Shell Only) */}
            <div className="hidden lg:flex justify-center items-center py-2 bg-slate-100 dark:bg-slate-950 z-50">
              <div className="w-32 h-1 bg-slate-400 dark:bg-slate-700 rounded-full"></div>
            </div>
          </div>
        ) : (
          /* Pure Fullscreen Canvas for presentation on large viewport */
          <div className="w-full max-w-7xl mx-auto bg-white dark:bg-slate-900 lg:rounded-3xl lg:shadow-2xl overflow-hidden flex flex-col min-h-[85vh] border border-slate-100 dark:border-slate-800">
            {children}
          </div>
        )}
      </div>

      {/* Small floating info note on Desktop for testing */}
      <div className="hidden lg:block text-center mt-4 text-xs text-slate-400 dark:text-slate-500 font-medium pb-8 select-none">
        Mendukung rotasi responsif dan dioptimalkan untuk performa mobile (Capacitor/Ionic ready).
      </div>
    </div>
  );
}
