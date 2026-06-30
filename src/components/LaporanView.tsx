/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, CheckCircle, Clock, AlertTriangle, FileText, User, Trash2, Calendar } from 'lucide-react';
import { REPORT_STATISTICS } from '../data';

interface LaporanViewProps {
  userSubmissions: any[];
  onDeleteSubmission: (regNum: string) => void;
}

export default function LaporanView({ userSubmissions, onDeleteSubmission }: LaporanViewProps) {
  // Aggregate stats from 2025 (latest year)
  const currentYearStats = REPORT_STATISTICS[REPORT_STATISTICS.length - 1];

  return (
    <div className="w-full space-y-6">
      {/* Bento Grid Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl text-left space-y-1 shadow-sm">
          <div className="p-2 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-sky-400 rounded-xl w-fit">
            <TrendingUp size={16} />
          </div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Permohonan</p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-serif font-bold text-slate-900 dark:text-white">{currentYearStats.totalRequests}</span>
            <span className="text-[10px] text-emerald-500 font-semibold">+18% (2025)</span>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl text-left space-y-1 shadow-sm">
          <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-xl w-fit">
            <CheckCircle size={16} />
          </div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Dikabulkan (Rate)</p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-serif font-bold text-slate-900 dark:text-white">
              {Math.round((currentYearStats.approved / currentYearStats.totalRequests) * 100)}%
            </span>
            <span className="text-[10px] text-slate-400">({currentYearStats.approved} Berkas)</span>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl text-left space-y-1 shadow-sm">
          <div className="p-2 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 rounded-xl w-fit">
            <Clock size={16} />
          </div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Respons Rata-rata</p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-serif font-bold text-slate-900 dark:text-white">{currentYearStats.avgTimeDays}</span>
            <span className="text-[10px] text-slate-400">Hari Kerja</span>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl text-left space-y-1 shadow-sm">
          <div className="p-2 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 rounded-xl w-fit">
            <AlertTriangle size={16} />
          </div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Ditolak / Keberatan</p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-serif font-bold text-slate-900 dark:text-white">{currentYearStats.rejected}</span>
            <span className="text-[10px] text-slate-400">Kasus Masuk</span>
          </div>
        </div>
      </div>

      {/* Historical Annual Volume Bar Chart (Beautiful pure CSS implementation) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 shadow-sm text-left">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 pl-1 border-l-2 border-indigo-600 dark:border-sky-500">
          Tren Volume Layanan Tahunan
        </h3>
        <div className="flex items-end justify-between h-36 pt-4 px-2">
          {REPORT_STATISTICS.map((stat) => {
            const percentage = (stat.totalRequests / 250) * 100;
            return (
              <div key={stat.year} className="flex flex-col items-center gap-2 group w-12">
                <div className="text-[10px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  {stat.totalRequests}
                </div>
                <div className="w-6 bg-slate-100 dark:bg-slate-950 rounded-full h-24 overflow-hidden flex items-end">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${percentage}%` }}
                    transition={{ duration: 1, type: 'spring' }}
                    className="w-full bg-indigo-600 dark:bg-sky-500 rounded-full group-hover:bg-indigo-700 transition-colors"
                  />
                </div>
                <div className="text-[11px] font-bold text-slate-600 dark:text-slate-450">
                  {stat.year}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
