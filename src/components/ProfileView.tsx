/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Award, Users, ChevronRight, CheckCircle2, UserCheck, BookOpen, Download } from 'lucide-react';
import { PROFIL_SINGKAT_PPID, TUGAS_FUNGSI_PPID, VISI_PPID, MISI_PPID } from '../data';
import PopupModal from './PopupModal';

export default function ProfileView() {
  const [activeSubTab, setActiveSubTab] = useState<'profil' | 'tugas' | 'visi'>('profil');
  const [isOrgModalOpen, setIsOrgModalOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Profil Navigation Pill Tabs */}
      <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-2xl mb-6 shadow-inner border border-slate-200/50 dark:border-slate-800/40">
        <button
          onClick={() => setActiveSubTab('profil')}
          className={`flex-1 py-2.5 px-0.5 text-center text-[10px] sm:text-xs font-bold rounded-xl transition-all duration-300 ${activeSubTab === 'profil' ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-sky-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-850'}`}
          id="profile-sub-profil"
        >
          Profil Pengelola
        </button>
        <button
          onClick={() => setActiveSubTab('tugas')}
          className={`flex-1 py-2.5 px-0.5 text-center text-[10px] sm:text-xs font-bold rounded-xl transition-all duration-300 ${activeSubTab === 'tugas' ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-sky-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-850'}`}
          id="profile-sub-tugas"
        >
          Tugas & Wewenang
        </button>
        <button
          onClick={() => setActiveSubTab('visi')}
          className={`flex-1 py-2.5 px-0.5 text-center text-[10px] sm:text-xs font-bold rounded-xl transition-all duration-300 ${activeSubTab === 'visi' ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-sky-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-850'}`}
          id="profile-sub-visi"
        >
          Visi & Misi
        </button>
      </div>

      {/* 1. PROFIL SINGKAT PPID */}
      {activeSubTab === 'profil' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-800/80 shadow-sm">
            <h2 className="font-serif font-bold text-2xl text-slate-900 dark:text-white leading-tight">
              Profil Pengelola Informasi dan Dokumentasi (PPID)
            </h2>
            <p className="text-xs text-indigo-600 dark:text-sky-400 font-bold mt-1 uppercase tracking-wider">
              Pengadilan Agama Blitar
            </p>

            <div className="mt-6 space-y-4 text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans text-justify">
              {PROFIL_SINGKAT_PPID.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Organization Link Area */}
            <div className="mt-8 pt-6 border-t border-slate-150 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-sky-400 rounded-xl">
                  <Users size={20} />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Struktur Organisasi PPID</h4>
                  <p className="text-[10px] text-slate-400">Hubungan hierarki penanggung jawab layanan</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOrgModalOpen(true)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-800 dark:from-sky-500 dark:to-indigo-700 text-white font-semibold text-xs shadow-md shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                id="view-org-chart"
              >
                <span>Lihat Diagram Struktur</span>
                <ChevronRight size={14} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* 2. TUGAS DAN FUNGSI PPID */}
      {activeSubTab === 'tugas' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-800/80 shadow-sm">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 rounded-2xl">
                <Shield size={24} />
              </div>
              <div>
                <h2 className="font-serif font-bold text-2xl text-slate-900 dark:text-white leading-tight">
                  Tugas & Fungsi PPID
                </h2>
                <p className="text-xs text-slate-400 dark:text-slate-400 mt-1">
                  Wewenang, tanggung jawab, dan kewajiban hukum pengelola informasi.
                </p>
              </div>
            </div>

            <div className="space-y-3.5">
              {TUGAS_FUNGSI_PPID.map((tugas, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-950/25 border border-slate-100 dark:border-slate-800/60 hover:bg-slate-100/50 dark:hover:bg-slate-900/30 transition-all"
                >
                  <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-sky-400 font-mono text-xs font-bold shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans text-left">
                    {tugas}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* 3. VISI DAN MISI */}
      {activeSubTab === 'visi' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 gap-6"
        >
          {/* Visi Card */}
          <div className="bg-gradient-to-tr from-indigo-900 to-indigo-800 text-white rounded-3xl p-6 md:p-8 shadow-md relative overflow-hidden">
            <div className="absolute right-0 top-0 w-36 h-36 bg-white/5 rounded-full translate-x-12 -translate-y-12" />
            <div className="absolute left-0 bottom-0 w-24 h-24 bg-white/5 rounded-full -translate-x-6 translate-y-6" />
            
            <div className="flex items-center gap-3.5 mb-4">
              <div className="p-2.5 bg-white/10 rounded-xl">
                <Award size={20} className="text-amber-400" />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-amber-300">Visi PPID</h4>
            </div>
            
            <p className="font-serif font-bold text-lg md:text-xl leading-relaxed text-indigo-50 select-none">
              &ldquo;{VISI_PPID}&rdquo;
            </p>
          </div>

          {/* Misi Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-800/80 shadow-sm">
            <div className="flex items-center gap-3.5 mb-6">
              <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-sky-400 rounded-xl">
                <BookOpen size={20} />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Misi Layanan PPID</h4>
            </div>

            <div className="space-y-4">
              {MISI_PPID.map((misi, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-950/15 border border-slate-100 dark:border-slate-850 hover:border-slate-200 dark:hover:border-slate-800 transition-all"
                >
                  <div className="p-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0">
                    <CheckCircle2 size={16} />
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans text-left">
                    {misi}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* STRUKTUR ORGANISASI MODAL */}
      <PopupModal
        isOpen={isOrgModalOpen}
        onClose={() => setIsOrgModalOpen(false)}
        title="Struktur Organisasi PPID PA Blitar"
      >
        <div className="space-y-6 text-center">
          <p className="text-xs text-slate-400">
            Berikut adalah hierarki Pejabat Pengelola Informasi dan Dokumentasi (PPID) pada Pengadilan Agama Blitar.
          </p>

          {/* Custom vector-tree model of organization rather than a broken external image */}
          <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-850 space-y-4 select-none">
            {/* Level 1 */}
            <div className="flex justify-center">
              <div className="bg-indigo-900 text-white rounded-xl p-3 shadow-md max-w-xs border border-indigo-700">
                <p className="text-[9px] uppercase tracking-wider text-amber-400 font-bold">Atasan PPID</p>
                <p className="text-xs font-serif font-bold mt-0.5">Ketua Pengadilan Agama Blitar</p>
              </div>
            </div>

            {/* Link line */}
            <div className="w-0.5 h-4 bg-slate-350 dark:bg-slate-800 mx-auto"></div>

            {/* Level 2 */}
            <div className="flex justify-center">
              <div className="bg-indigo-750 text-white rounded-xl p-3 shadow-md max-w-xs border border-indigo-600">
                <p className="text-[9px] uppercase tracking-wider text-sky-300 font-bold">PPID Utama</p>
                <p className="text-xs font-semibold mt-0.5">Sekretaris Pengadilan Agama Blitar</p>
              </div>
            </div>

            {/* Link split lines */}
            <div className="relative w-4/5 mx-auto">
              <div className="w-0.5 h-4 bg-slate-350 dark:bg-slate-800 mx-auto"></div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-350 dark:bg-slate-800"></div>
            </div>

            {/* Level 3: Dual branches */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="bg-slate-100 dark:bg-slate-900 text-slate-850 dark:text-slate-100 rounded-xl p-2.5 border border-slate-200 dark:border-slate-800">
                <p className="text-[8px] uppercase tracking-wider text-indigo-600 dark:text-sky-400 font-bold">PPID Pelaksana Teknis</p>
                <p className="text-[10px] font-semibold mt-0.5 leading-tight">Panitera Muda Hukum</p>
                <p className="text-[9px] text-slate-400 mt-1">Bidang Kepaniteraan</p>
              </div>

              <div className="bg-slate-100 dark:bg-slate-900 text-slate-850 dark:text-slate-100 rounded-xl p-2.5 border border-slate-200 dark:border-slate-800">
                <p className="text-[8px] uppercase tracking-wider text-indigo-600 dark:text-sky-400 font-bold">PPID Pelaksana Adm.</p>
                <p className="text-[10px] font-semibold mt-0.5 leading-tight">Kasubbag Perencanaan & TI</p>
                <p className="text-[9px] text-slate-400 mt-1">Bidang Kesekretariatan</p>
              </div>
            </div>

            {/* Link lines for Officers */}
            <div className="relative w-4/5 mx-auto">
              <div className="absolute top-0 left-[25%] right-[25%] bottom-0 flex justify-between">
                <div className="w-0.5 h-4 bg-slate-350 dark:bg-slate-800"></div>
                <div className="w-0.5 h-4 bg-slate-350 dark:bg-slate-800"></div>
              </div>
            </div>

            {/* Level 4: Petugas Layanan */}
            <div className="grid grid-cols-2 gap-3 pt-3">
              <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/60 text-emerald-950 dark:text-emerald-300 rounded-xl p-2">
                <p className="text-[8px] uppercase tracking-wider font-bold">Petugas Meja Informasi</p>
                <p className="text-[9px] mt-0.5 leading-tight">Melayani Penerimaan Permohonan & Pengaduan</p>
              </div>
              
              <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/60 text-emerald-950 dark:text-emerald-300 rounded-xl p-2">
                <p className="text-[8px] uppercase tracking-wider font-bold">Petugas Pengarsipan</p>
                <p className="text-[9px] mt-0.5 leading-tight">Dokumentasi, Klasifikasi, dan Pengaburan Data</p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => window.print()}
              className="w-full py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-100 font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              id="download-structure-button"
            >
              <Download size={14} />
              <span>Unduh / Cetak Gambar Struktur</span>
            </button>
          </div>
        </div>
      </PopupModal>
    </div>
  );
}
