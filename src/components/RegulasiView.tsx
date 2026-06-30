/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Book, Download, ExternalLink, Search, FileText } from 'lucide-react';
import { REGULATIONS } from '../data';

export default function RegulasiView() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRegulations = REGULATIONS.filter(reg => 
    reg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (reg.description && reg.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="w-full space-y-6">
      {/* Header Info */}
      <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-3xl border border-slate-100 dark:border-slate-850/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-xl text-indigo-950 dark:text-white">Payung Hukum PPID</h2>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 max-w-md">
            Landasan regulasi dan standar prosedur operasional keterbukaan informasi publik di lingkungan Mahkamah Agung dan Pengadilan Agama Blitar.
          </p>
        </div>
        <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-sky-400 rounded-2xl shrink-0 self-start md:self-center">
          <Book size={22} />
        </div>
      </div>

      {/* Internal Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search size={16} />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari regulasi atau nomor undang-undang..."
          className="w-full text-xs pl-10 pr-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-sky-500 focus:border-transparent transition-all font-sans"
        />
      </div>

      {/* Regulations List */}
      <div className="space-y-4">
        {filteredRegulations.length > 0 ? (
          filteredRegulations.map((reg, index) => (
            <motion.div
              key={reg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-5 shadow-sm hover:shadow-md hover:border-slate-200 dark:hover:border-slate-750 transition-all text-left flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group"
            >
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-sky-400 rounded-lg shrink-0">
                    <FileText size={14} />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white font-sans group-hover:text-indigo-700 dark:group-hover:text-sky-400 transition-colors">
                    {reg.title}
                  </h4>
                </div>
                <h3 className="font-serif font-bold text-base text-indigo-950 dark:text-indigo-100 leading-snug">
                  {reg.subtitle}
                </h3>
                {reg.description && (
                  <p className="text-[11px] text-slate-400 dark:text-slate-450 leading-relaxed font-sans text-justify">
                    {reg.description}
                  </p>
                )}
              </div>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={reg.url}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-xs hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-700 dark:hover:text-sky-400 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                id={`reg-link-${reg.id}`}
              >
                <span>Unduh Dokumen</span>
                <Download size={13} />
              </motion.a>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-12 text-slate-400 text-xs">
            Tidak menemukan regulasi yang cocok dengan pencarian Anda.
          </div>
        )}
      </div>
    </div>
  );
}
