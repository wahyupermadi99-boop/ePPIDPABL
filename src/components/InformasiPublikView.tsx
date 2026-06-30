/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronRight, Eye, AlertTriangle, FileText, Youtube, Calendar, Clock, ExternalLink, Play, AlertCircle } from 'lucide-react';
import { INFORMASI_BERKALA, INFORMASI_SERTA_MERTA, INFORMASI_SETIAP_SAAT, YOUTUBE_VIDEO_IDS } from '../data';
import PopupModal from './PopupModal';

export default function InformasiPublikView() {
  const [activeTab, setActiveTab] = useState<'berkala' | 'sertamerta' | 'setiap_saat' | 'video'>('berkala');
  const [searchTerm, setSearchTerm] = useState('');
  
  // States for viewing details in popup
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedDetailTitle, setSelectedDetailTitle] = useState('');
  const [selectedDetailContent, setSelectedDetailContent] = useState('');

  // Track playing videos to display custom cover thumbnails before loading iframe
  const [playingVideos, setPlayingVideos] = useState<Record<string, boolean>>({});

  const handleOpenDetail = (title: string, content: string) => {
    setSelectedDetailTitle(title);
    setSelectedDetailContent(content);
    setIsDetailModalOpen(true);
  };

  // Filter Berkala by Category and Search
  const filteredBerkala = INFORMASI_BERKALA.filter(item => 
    (item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
     (item.content && item.content.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  // Group filtered Berkala items by Category for pristine section headers
  const categories = Array.from(new Set(filteredBerkala.map(item => item.category)));

  return (
    <div className="w-full space-y-6">
      {/* Upper Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 bg-slate-100 dark:bg-slate-950 p-1 rounded-2xl gap-1 shadow-inner border border-slate-200/50 dark:border-slate-800/40">
        <button
          onClick={() => { setActiveTab('berkala'); setSearchTerm(''); }}
          className={`py-2.5 px-0.5 text-center text-[10px] sm:text-xs font-bold rounded-xl transition-all duration-300 ${activeTab === 'berkala' ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-sky-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-850'}`}
          id="info-sub-berkala"
        >
          Berkala
        </button>
        <button
          onClick={() => { setActiveTab('sertamerta'); setSearchTerm(''); }}
          className={`py-2.5 px-0.5 text-center text-[10px] sm:text-xs font-bold rounded-xl transition-all duration-300 ${activeTab === 'sertamerta' ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-sky-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-850'}`}
          id="info-sub-serta-merta"
        >
          Serta Merta
        </button>
        <button
          onClick={() => { setActiveTab('setiap_saat'); setSearchTerm(''); }}
          className={`py-2.5 px-0.5 text-center text-[10px] sm:text-xs font-bold rounded-xl transition-all duration-300 ${activeTab === 'setiap_saat' ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-sky-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-850'}`}
          id="info-sub-setiap-saat"
        >
          Setiap Saat
        </button>
        <button
          onClick={() => { setActiveTab('video'); setSearchTerm(''); }}
          className={`py-2.5 px-0.5 text-center text-[10px] sm:text-xs font-bold rounded-xl transition-all duration-300 ${activeTab === 'video' ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-sky-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-850'}`}
          id="info-sub-video"
        >
          Video PPID
        </button>
      </div>

      {/* 1. INFORMASI BERKALA */}
      {activeTab === 'berkala' && (
        <div className="space-y-6">
          {/* Internal search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search size={15} />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari laporan berkala, profil, atau kinerja..."
              className="w-full text-xs pl-10 pr-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-sky-500 focus:border-transparent transition-all font-sans"
            />
          </div>

          <div className="space-y-6 text-left">
            {categories.length > 0 ? (
              categories.map((cat, idx) => (
                <div key={idx} className="space-y-3">
                  {/* Category Header */}
                  <h3 className="text-xs font-bold text-indigo-900 dark:text-sky-400 uppercase tracking-widest pl-1 border-l-2 border-indigo-600 dark:border-sky-500">
                    {cat}
                  </h3>

                  {/* Category Items list */}
                  <div className="grid grid-cols-1 gap-3">
                    {filteredBerkala
                      .filter(item => item.category === cat)
                      .map((item) => (
                        <div
                          key={item.id}
                          className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/85 rounded-2xl p-4 flex items-center justify-between gap-3 shadow-sm hover:shadow-md transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-50 dark:bg-slate-950 text-slate-450 dark:text-slate-400 rounded-xl">
                              <FileText size={16} />
                            </div>
                            <h4 className="text-xs font-semibold text-slate-850 dark:text-slate-200 leading-tight group-hover:text-indigo-700 dark:group-hover:text-sky-400 transition-colors">
                              {item.title}
                            </h4>
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleOpenDetail(item.title, item.content || "Dokumen isi belum dimasukkan.")}
                            className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 text-indigo-600 dark:text-sky-400 font-bold text-[10px] uppercase tracking-wider hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-200/55 dark:border-slate-800 flex items-center gap-1 cursor-pointer shrink-0"
                            id={`view-berkala-${item.id}`}
                          >
                            <Eye size={12} />
                            <span>Lihat</span>
                          </motion.button>
                        </div>
                      ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-slate-400 text-xs">
                Tidak ada informasi berkala yang cocok dengan pencarian Anda.
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. INFORMASI SERTA MERTA */}
      {activeTab === 'sertamerta' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-5"
        >
          <div className="bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-400 p-5 rounded-3xl flex items-start gap-3.5 text-left">
            <AlertTriangle size={20} className="shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider">Hukum Serta Merta (UU KIP Pasal 10)</h3>
              <p className="text-[11px] leading-relaxed mt-1">
                Pengadilan Agama Blitar wajib segera mengumumkan keadaan darurat atau potensi bahaya/gangguan layanan secara serta merta kepada publik demi keselamatan dan kelancaran pelayanan bersama.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-left">
            {INFORMASI_SERTA_MERTA.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-5 shadow-sm space-y-2"
              >
                <div className="flex items-center gap-2 text-rose-500">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                  <h4 className="text-xs font-bold uppercase tracking-wider font-sans">
                    {item.title}
                  </h4>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                  {item.description}
                </p>
                <div className="pt-2 text-[10px] text-slate-400 dark:text-slate-500 flex justify-between items-center border-t border-dashed border-slate-100 dark:border-slate-850">
                  <span>Status: Aman / Kondusif</span>
                  <span>Diperbarui: Hari ini</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* 3. INFORMASI TERSEDIA SETIAP SAAT */}
      {activeTab === 'setiap_saat' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 text-left"
        >
          <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-850 text-xs text-slate-500 leading-relaxed">
            <span className="font-bold text-indigo-700 dark:text-sky-400">Informasi Tersedia Setiap Saat</span> adalah informasi publik yang telah disiapkan dan dimutakhirkan oleh PPID secara konsisten, sehingga siap diberikan seketika kepada pemohon informasi saat dibutuhkan.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {INFORMASI_SETIAP_SAAT.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 shadow-sm hover:border-indigo-100 dark:hover:border-slate-750 transition-all space-y-2 flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white font-sans leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-450 mt-1.5 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-50 dark:border-slate-850 flex justify-between items-center mt-3">
                  <span className="text-[9px] font-bold text-indigo-600/70 dark:text-sky-400/80 uppercase">Dokumen Tersedia</span>
                  <button
                    onClick={() => handleOpenDetail(item.title, `Dokumen ${item.title} berstatus Terbuka untuk Umum. Anda dapat meminta salinan fisik maupun dokumen soft copy (.pdf) secara lengkap melalui unit Meja Informasi atau Formulir Permohonan dengan nomor referensi Dokumen KMA.`)}
                    className="text-[10px] font-bold text-indigo-600 dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
                    id={`request-saat-${item.id}`}
                  >
                    <span>Minta Dokumen</span>
                    <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* 4. VIDEO INFORMASI PUBLIK */}
      {activeTab === 'video' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 text-left"
        >
          <div className="grid grid-cols-1 gap-6">
            {YOUTUBE_VIDEO_IDS.map((vid) => {
              return (
                <div
                  key={vid.id}
                  className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm space-y-4 pb-5"
                >
                  {/* YouTube Thumbnail Link directly to YouTube */}
                  <a
                    href={`https://www.youtube.com/watch?v=${vid.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative aspect-video w-full bg-slate-950 overflow-hidden block group"
                  >
                    {/* Background Thumbnail Image with Hover Scale */}
                    <img 
                      src={`https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`} 
                      alt={vid.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        // Fallback if hqdefault.jpg fails
                        (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${vid.youtubeId}/0.jpg`;
                      }}
                    />
                    <div className="absolute inset-0 bg-slate-950/40 dark:bg-slate-950/60 transition-colors duration-300 group-hover:bg-slate-950/20" />
                    
                    {/* Glassmorphic Play Button Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                      <div className="w-16 h-16 rounded-full bg-rose-600/95 text-white flex items-center justify-center shadow-xl border-4 border-white/20 transition-all duration-300 transform group-hover:scale-110 group-hover:bg-rose-500">
                        <Play size={28} fill="currentColor" className="ml-1 text-white" />
                      </div>
                      <span className="mt-3 text-white text-[11px] font-bold px-3.5 py-1.5 bg-black/50 backdrop-blur-md rounded-full border border-white/10 tracking-wide select-none group-hover:bg-rose-600 transition-colors">
                        Tonton di YouTube
                      </span>
                    </div>
                  </a>

                  <div className="px-5 space-y-3">
                    <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-[10px] uppercase tracking-wider">
                      <Youtube size={14} />
                      <span>Video Edukasi PPID</span>
                    </div>
                    <h3 className="font-serif font-bold text-base text-slate-950 dark:text-white leading-snug">
                      {vid.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                      {vid.description}
                    </p>

                    {/* Thumbnail click redirects directly to official YouTube platform */}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* DETAILED DIALOG MODAL FOR INFORMATION DETAILS */}
      <PopupModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title={selectedDetailTitle}
      >
        <div className="space-y-5 text-left">
          <p className="text-xs text-indigo-600 dark:text-sky-400 font-bold uppercase tracking-widest border-b border-dashed border-slate-100 dark:border-slate-800 pb-2">
            Dokumen Resmi PPID PA Blitar
          </p>
          <div className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans whitespace-pre-line text-justify bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-100 dark:border-slate-850">
            {selectedDetailContent}
          </div>
          <div className="flex justify-end pt-3">
            <button
              onClick={() => setIsDetailModalOpen(false)}
              className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-all shadow-md shadow-indigo-500/10 cursor-pointer"
              id="detail-close-btn"
            >
              Selesai Membaca
            </button>
          </div>
        </div>
      </PopupModal>
    </div>
  );
}
