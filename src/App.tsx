/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, UserCheck, BookOpen, Info, Scale, FileText, TrendingUp, 
  Search, Bell, Moon, Sun, ArrowRight, ExternalLink, Download, 
  Clock, Shield, HelpCircle, Check, Play, Book, MapPin, Globe, Award
} from 'lucide-react';

import DeviceFrame from './components/DeviceFrame';
import ProfileView from './components/ProfileView';
import RegulasiView from './components/RegulasiView';
import InformasiPublikView from './components/InformasiPublikView';
import StandarLayananView from './components/StandarLayananView';
import FormulirView from './components/FormulirView';
import LaporanView from './components/LaporanView';
import PopupModal from './components/PopupModal';

import { REGULATIONS, INFORMASI_BERKALA, INFORMASI_SETIAP_SAAT } from './data';

type AppTab = 'home' | 'profil' | 'regulasi' | 'info' | 'layanan' | 'form' | 'laporan';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('ppid_dark_mode');
    return saved === 'true';
  });

  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [globalSearch, setGlobalSearch] = useState('');
  const [userSubmissions, setUserSubmissions] = useState<any[]>([]);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [activeNotificationCount, setActiveNotificationCount] = useState(2);

  // Load and sync submissions from LocalStorage
  useEffect(() => {
    const savedSubmissions = localStorage.getItem('ppid_user_submissions');
    if (savedSubmissions) {
      setUserSubmissions(JSON.parse(savedSubmissions));
    }
  }, []);

  // Save dark mode setting
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('ppid_dark_mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('ppid_dark_mode', 'false');
    }
  }, [darkMode]);

  const handleAddSubmission = (type: 'permohonan' | 'keberatan', data: any) => {
    const newSub = { ...data, type };
    const updated = [newSub, ...userSubmissions];
    setUserSubmissions(updated);
    localStorage.setItem('ppid_user_submissions', JSON.stringify(updated));
    setActiveNotificationCount(prev => prev + 1);
  };

  const handleDeleteSubmission = (regNum: string) => {
    const updated = userSubmissions.filter(sub => sub.regNum !== regNum);
    setUserSubmissions(updated);
    localStorage.setItem('ppid_user_submissions', JSON.stringify(updated));
  };

  // Global search indexing across all submenus
  const getSearchResults = () => {
    if (!globalSearch.trim()) return [];
    
    const results: Array<{ title: string; tab: AppTab; category: string; content?: string }> = [];

    // Search in Regulations
    REGULATIONS.forEach(reg => {
      if (reg.title.toLowerCase().includes(globalSearch.toLowerCase()) || 
          reg.subtitle.toLowerCase().includes(globalSearch.toLowerCase()) ||
          (reg.description && reg.description.toLowerCase().includes(globalSearch.toLowerCase()))) {
        results.push({
          title: `${reg.title} - ${reg.subtitle}`,
          tab: 'regulasi',
          category: 'Regulasi KIP',
          content: reg.description
        });
      }
    });

    // Search in Informasi Berkala
    INFORMASI_BERKALA.forEach(item => {
      if (item.title.toLowerCase().includes(globalSearch.toLowerCase()) || 
          item.category.toLowerCase().includes(globalSearch.toLowerCase()) ||
          (item.content && item.content.toLowerCase().includes(globalSearch.toLowerCase()))) {
        results.push({
          title: item.title,
          tab: 'info',
          category: `Informasi Berkala - ${item.category}`,
          content: item.content
        });
      }
    });

    // Search in Informasi Setiap Saat
    INFORMASI_SETIAP_SAAT.forEach(item => {
      if (item.title.toLowerCase().includes(globalSearch.toLowerCase()) || 
          item.description.toLowerCase().includes(globalSearch.toLowerCase())) {
        results.push({
          title: item.title,
          tab: 'info',
          category: 'Informasi Setiap Saat',
          content: item.description
        });
      }
    });

    return results;
  };

  const searchResults = getSearchResults();

  return (
    <DeviceFrame darkMode={darkMode} setDarkMode={setDarkMode}>
      <div className={`flex flex-col min-h-full font-sans transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
        
        {/* TOP COMPACT APP BAR */}
        <div className="sticky top-0 z-40 px-6 py-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-900 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-700 to-indigo-900 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <span className="font-serif font-bold text-base">p</span>
            </div>
            <div className="text-left">
              <h2 className="font-serif font-bold text-sm leading-tight text-slate-900 dark:text-white">
                e-PPID PA Blitar
              </h2>
              <span className="text-[9px] text-emerald-500 font-bold uppercase tracking-wider block">Online</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-850 text-slate-500 dark:text-slate-400 transition-colors cursor-pointer"
              id="theme-toggle-button"
              aria-label="Ubah Tema"
            >
              {darkMode ? <Sun size={15} className="text-amber-500" /> : <Moon size={15} />}
            </button>

            {/* Notification trigger */}
            <button
              onClick={() => {
                setNotificationOpen(true);
                setActiveNotificationCount(0);
              }}
              className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-850 text-slate-500 dark:text-slate-400 relative transition-colors"
              id="bell-notification"
            >
              <Bell size={15} />
              {activeNotificationCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-950" />
              )}
            </button>
          </div>
        </div>

        {/* MAIN BODY LAYOUT (SCROLLABLE CONTAINER) */}
        <div className="flex-1 overflow-y-auto px-5 py-6 pb-24 space-y-6">

          {/* RENDERING STANDARD TABS CONTAINER */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="w-full h-full"
            >
              
              {/* 1. BERANDA TAB */}
              {activeTab === 'home' && (
                <div className="space-y-6">
                  {/* Hello Greeting Header */}
                  <div className="text-left space-y-1">
                    <h1 className="font-serif font-bold text-2xl text-slate-950 dark:text-white tracking-tight">
                      Selamat Datang di Portal PPID
                    </h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      Layanan Keterbukaan Informasi Publik Pengadilan Agama Blitar yang Cepat, Akurat, dan Transparan.
                    </p>
                  </div>

                  {/* Welcoming Banner Card */}
                  <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-850 to-indigo-950 text-white shadow-xl relative overflow-hidden text-left flex items-center justify-between">
                    <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/5 rounded-full translate-x-10 translate-y-10" />
                    <div className="space-y-3 z-10 max-w-xs">
                      <h3 className="font-serif font-bold text-base leading-snug">
                        Mewujudkan Transparansi Peradilan yang Agung dan Akuntabel
                      </h3>
                      <p className="text-[10px] text-indigo-200 leading-normal">
                        Ajukan permohonan informasi secara daring melalui sistem integrasi e-PPID yang tepercaya.
                      </p>
                      <motion.button
                         whileTap={{ scale: 0.95 }}
                         onClick={() => setActiveTab('form')}
                         className="px-4 py-2 rounded-xl bg-white text-indigo-950 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 cursor-pointer hover:bg-slate-100 transition-colors"
                         id="home-cta-button"
                      >
                        <span>Ajukan Permohonan</span>
                        <ArrowRight size={10} />
                      </motion.button>
                    </div>

                    {/* Floating Judicial Badge Illustration via CSS Grid */}
                    <div className="hidden sm:flex shrink-0 p-4 bg-white/5 rounded-2xl border border-white/10 text-white/85">
                      <Shield size={36} className="text-amber-400" />
                    </div>
                  </div>

                  {/* Quick Access Bento grid */}
                  <div className="space-y-3.5 text-left">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      Keterbukaan Informasi
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                      <div
                        onClick={() => setActiveTab('profil')}
                        className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl hover:border-indigo-500 transition-all cursor-pointer flex flex-col justify-between h-28 text-left shadow-sm hover:shadow"
                      >
                        <div className="p-2 bg-indigo-50 dark:bg-indigo-950/45 text-indigo-700 dark:text-sky-400 rounded-xl w-fit">
                          <UserCheck size={16} />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">Profil Pengelola</h4>
                          <span className="text-[9px] text-slate-400 mt-1 block">Struktur, Visi & Misi</span>
                        </div>
                      </div>

                      <div
                        onClick={() => setActiveTab('regulasi')}
                        className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl hover:border-indigo-500 transition-all cursor-pointer flex flex-col justify-between h-28 text-left shadow-sm hover:shadow"
                      >
                        <div className="p-2 bg-indigo-50 dark:bg-indigo-950/45 text-indigo-700 dark:text-sky-400 rounded-xl w-fit">
                          <BookOpen size={16} />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">Dokumentasi Regulasi</h4>
                          <span className="text-[9px] text-slate-400 mt-1 block">Pedoman & Aspek Hukum</span>
                        </div>
                      </div>

                      <div
                        onClick={() => setActiveTab('info')}
                        className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl hover:border-indigo-500 transition-all cursor-pointer flex flex-col justify-between h-28 text-left shadow-sm hover:shadow"
                      >
                        <div className="p-2 bg-indigo-50 dark:bg-indigo-950/45 text-indigo-700 dark:text-sky-400 rounded-xl w-fit">
                          <Info size={16} />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">Daftar Informasi</h4>
                          <span className="text-[9px] text-slate-400 mt-1 block">Informasi Berkala & Serta-Merta</span>
                        </div>
                      </div>

                      <div
                        onClick={() => setActiveTab('layanan')}
                        className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl hover:border-indigo-500 transition-all cursor-pointer flex flex-col justify-between h-28 text-left shadow-sm hover:shadow"
                      >
                        <div className="p-2 bg-indigo-50 dark:bg-indigo-950/45 text-indigo-700 dark:text-sky-400 rounded-xl w-fit">
                          <Scale size={16} />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">Standar Pelayanan</h4>
                          <span className="text-[9px] text-slate-400 mt-1 block">Maklumat, Prosedur & Biaya Riil</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Integrity Statement / Footer section */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 flex items-center gap-3.5 text-left">
                    <Shield size={20} className="text-amber-500 shrink-0" />
                    <div>
                      <h4 className="text-[10px] font-bold text-indigo-950 dark:text-slate-300 uppercase tracking-wider">Bebas Pungli</h4>
                      <p className="text-[10px] text-slate-450 leading-relaxed mt-0.5">
                        Segenap layanan informasi publik diselenggarakan tanpa dipungut biaya. Biaya penggandaan dokumen hanya merujuk pada ketentuan biaya riil.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. PROFIL TAB */}
              {activeTab === 'profil' && <ProfileView />}

              {/* 3. REGULASI TAB */}
              {activeTab === 'regulasi' && <RegulasiView />}

              {/* 4. INFORMASI TAB */}
              {activeTab === 'info' && <InformasiPublikView />}

              {/* 5. LAYANAN TAB */}
              {activeTab === 'layanan' && <StandarLayananView />}

              {/* 6. FORMULIR TAB */}
              {activeTab === 'form' && <FormulirView onAddSubmission={handleAddSubmission} />}

              {/* 7. LAPORAN TAB */}
              {activeTab === 'laporan' && (
                <LaporanView 
                  userSubmissions={userSubmissions} 
                  onDeleteSubmission={handleDeleteSubmission} 
                />
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* BOTTOM NAVIGATION TABS (STICKY BAR) */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg border-t border-l border-r border-slate-100 dark:border-slate-900 py-2 px-4 flex justify-around items-center max-w-[430px] mx-auto shadow-[0_-10px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_-10px_30px_rgba(0,0,0,0.4)] rounded-t-[30px]">
          <button
            onClick={() => { setActiveTab('home'); setGlobalSearch(''); }}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all cursor-pointer ${activeTab === 'home' ? 'text-indigo-700 dark:text-sky-400' : 'text-slate-400 hover:text-slate-650'}`}
            id="nav-home"
          >
            <Home size={16} />
            <span className="text-[8px] font-extrabold tracking-wide">Beranda</span>
          </button>

          <button
            onClick={() => { setActiveTab('info'); setGlobalSearch(''); }}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all cursor-pointer ${activeTab === 'info' ? 'text-indigo-700 dark:text-sky-400' : 'text-slate-400 hover:text-slate-650'}`}
            id="nav-info"
          >
            <Info size={16} />
            <span className="text-[8px] font-extrabold tracking-wide">Informasi</span>
          </button>

          {/* MIDDLE PROMINENT CIRCULAR PROFILE TAB */}
          <div className="relative -translate-y-4 flex flex-col items-center z-50">
            <button
              onClick={() => { setActiveTab('profil'); setGlobalSearch(''); }}
              className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 border-[3px] cursor-pointer ${
                activeTab === 'profil'
                  ? 'bg-indigo-700 dark:bg-sky-500 text-white border-white dark:border-slate-950 scale-110 shadow-indigo-500/30'
                  : 'bg-white dark:bg-slate-900 text-slate-450 hover:text-indigo-700 dark:hover:text-sky-400 border-slate-50 dark:border-slate-950'
              }`}
              id="nav-profile"
            >
              <UserCheck size={18} />
            </button>
            <span className={`text-[8px] font-extrabold tracking-wide mt-1 transition-colors ${
              activeTab === 'profil' ? 'text-indigo-700 dark:text-sky-400' : 'text-slate-400'
            }`}>
              Profil
            </span>
          </div>

          <button
            onClick={() => { setActiveTab('form'); setGlobalSearch(''); }}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all cursor-pointer ${activeTab === 'form' ? 'text-indigo-700 dark:text-sky-400' : 'text-slate-400 hover:text-slate-650'}`}
            id="nav-form"
          >
            <FileText size={16} />
            <span className="text-[8px] font-extrabold tracking-wide">Formulir</span>
          </button>

          <button
            onClick={() => { setActiveTab('laporan'); setGlobalSearch(''); }}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all cursor-pointer ${activeTab === 'laporan' ? 'text-indigo-700 dark:text-sky-400' : 'text-slate-400 hover:text-slate-650'}`}
            id="nav-laporan"
          >
            <TrendingUp size={16} />
            <span className="text-[8px] font-extrabold tracking-wide">Statistik</span>
          </button>
        </div>

        {/* NOTIFICATIONS TRAY (MODAL OVERLAY) */}
        <PopupModal
          isOpen={notificationOpen}
          onClose={() => setNotificationOpen(false)}
          title="Notifikasi Masuk"
        >
          <div className="space-y-4 text-left">
            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 text-emerald-950 dark:text-emerald-300 flex items-start gap-3">
              <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold leading-tight">Server e-PPID Siap Online</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                  Koneksi sistem ePPID Mahkamah Agung RI dan server lokal PA Blitar berhasil dimutakhirkan. Layanan online berjalan 100% lancar.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 text-indigo-950 dark:text-indigo-300 flex items-start gap-3">
              <Info size={16} className="text-indigo-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold leading-tight">Pemberlakuan SK KMA No. 2-144</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                  Daftar Informasi Publik (DIP) tahun 2026 telah diperbarui berdasarkan standar pelayanan keterbukaan informasi di pengadilan terbaru.
                </p>
              </div>
            </div>


          </div>
        </PopupModal>
      </div>
    </DeviceFrame>
  );
}
