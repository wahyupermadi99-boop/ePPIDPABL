/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Scroll, Info, Check, HelpCircle, Coins, Clock, ArrowRight, MessageSquare, ExternalLink, Calendar } from 'lucide-react';
import { BIAYA_LAYANAN_NOTE } from '../data';

export default function StandarLayananView() {
  const [activeSubTab, setActiveSubTab] = useState<'maklumat' | 'prosedur_permohonan' | 'prosedur_keberatan' | 'prosedur_sengketa' | 'jalur_waktu' | 'biaya'>('maklumat');

  // Dynamic srcDoc for Maklumat Layanan Iframe (Elegant judicial certificate styling)
  const maklumatHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: 'Georgia', serif;
            background: #fdfbf7;
            color: #111c24;
            padding: 30px;
            margin: 0;
            text-align: center;
            border: 8px double #a1824a;
            border-radius: 12px;
            box-shadow: inset 0 0 40px rgba(161,130,74,0.15);
          }
          .title {
            font-size: 20px;
            font-weight: bold;
            color: #1e3a2f;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 5px;
          }
          .subtitle {
            font-size: 13px;
            font-style: italic;
            color: #c5a880;
            margin-bottom: 25px;
            text-transform: uppercase;
          }
          .text {
            font-size: 15px;
            line-height: 1.8;
            margin: 20px auto;
            max-width: 90%;
            text-align: justify;
            text-justify: inter-word;
          }
          .quote {
            font-size: 18px;
            font-weight: bold;
            color: #1e3a2f;
            margin: 30px 0;
            line-height: 1.6;
          }
          .signature {
            margin-top: 40px;
            font-size: 14px;
            font-weight: bold;
          }
          .role {
            font-size: 11px;
            color: #555;
            text-transform: uppercase;
            margin-top: 5px;
          }
        </style>
      </head>
      <body>
        <div class="title">MAKLUMAT PELAYANAN</div>
        <div class="subtitle">Pengadilan Agama Blitar</div>
        <p class="text">
          Dengan ini, kami seluruh aparat Pengadilan Agama Blitar menyatakan berkomitmen dan sanggup menyelenggarakan pelayanan informasi publik sesuai dengan standar pelayanan yang telah ditetapkan.
        </p>
        <div class="quote">
          "KAMI SANGGUP MENYELENGGARAKAN PELAYANAN SESUAI STANDAR PELAYANAN YANG DITETAPKAN DAN APABILA TIDAK MENEPATI JANJI INI, KAMI SIAP MENERIMA SANKSI SESUAI PERATURAN PERUNDANG-UNDANGAN YANG BERLAKU."
        </div>
        <p class="text">
          Kami berkomitmen untuk terus meningkatkan mutu pelayanan, kecepatan waktu respons, serta menjamin keandalan data informasi publik yang akurat demi terwujudnya peradilan yang agung dan transparan.
        </p>
        <div class="signature">
          KETUA PENGADILAN AGAMA BLITAR
          <div class="role">Atasan PPID PA Blitar</div>
        </div>
      </body>
    </html>
  `;

  // Dynamic srcDoc for Jalur & Waktu Layanan Iframe
  const jalurWaktuHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background: #f8fafc;
            color: #1e293b;
            padding: 20px;
            margin: 0;
          }
          .card {
            background: white;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
            padding: 20px;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
            margin-bottom: 15px;
          }
          .title {
            font-size: 15px;
            font-weight: bold;
            color: #1e3a8a;
            margin-bottom: 10px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
            text-align: left;
          }
          th, td {
            padding: 10px;
            border-bottom: 1px solid #e2e8f0;
          }
          th {
            background: #f1f5f9;
            color: #475569;
            font-weight: 600;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="title">JALUR PELAYANAN PPID</div>
          <table>
            <thead>
              <tr>
                <th>Metode</th>
                <th>Kanal Layanan</th>
                <th>Waktu Respons</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b>Daring (Online)</b></td>
                <td>Situs e-PPID MA & Aplikasi SI-EPPID</td>
                <td>Seketika s.d 1-3 hari kerja</td>
              </tr>
              <tr>
                <td><b>WhatsApp</b></td>
                <td>Meja Hotline PPID (+62 821-4363-5431)</td>
                <td>Seketika pada jam kerja</td>
              </tr>
              <tr>
                <td><b>Tatap Muka</b></td>
                <td>Meja Informasi PTSP PA Blitar</td>
                <td>Langsung di tempat</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="card">
          <div class="title">WAKTU PELAYANAN (JAM KERJA)</div>
          <table>
            <thead>
              <tr>
                <th>Hari</th>
                <th>Sesi Pagi</th>
                <th>Sesi Sore</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b>Senin s.d Kamis</b></td>
                <td>08:00 - 12:00 WIB</td>
                <td>13:00 - 15:30 WIB</td>
              </tr>
              <tr>
                <td><b>Jumat</b></td>
                <td>08:00 - 11:30 WIB</td>
                <td>13:30 - 16:00 WIB</td>
              </tr>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  `;

  return (
    <div className="w-full space-y-6">
      {/* Horizontal Tab Buttons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 bg-slate-100 dark:bg-slate-950 p-1.5 rounded-2xl shadow-inner border border-slate-200/50 dark:border-slate-800/40">
        <button
          onClick={() => setActiveSubTab('maklumat')}
          className={`py-2 text-center text-[10px] font-bold rounded-xl transition-all ${activeSubTab === 'maklumat' ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-sky-400 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
          id="layanan-sub-maklumat"
        >
          Maklumat Layanan
        </button>
        <button
          onClick={() => setActiveSubTab('prosedur_permohonan')}
          className={`py-2 text-center text-[10px] font-bold rounded-xl transition-all ${activeSubTab === 'prosedur_permohonan' ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-sky-400 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
          id="layanan-sub-permohonan"
        >
          Prosedur Permohonan
        </button>
        <button
          onClick={() => setActiveSubTab('prosedur_keberatan')}
          className={`py-2 text-center text-[10px] font-bold rounded-xl transition-all ${activeSubTab === 'prosedur_keberatan' ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-sky-400 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
          id="layanan-sub-keberatan"
        >
          Prosedur Keberatan
        </button>
        <button
          onClick={() => setActiveSubTab('prosedur_sengketa')}
          className={`py-2 text-center text-[10px] font-bold rounded-xl transition-all ${activeSubTab === 'prosedur_sengketa' ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-sky-400 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
          id="layanan-sub-sengketa"
        >
          Prosedur Sengketa
        </button>
        <button
          onClick={() => setActiveSubTab('jalur_waktu')}
          className={`py-2 text-center text-[10px] font-bold rounded-xl transition-all ${activeSubTab === 'jalur_waktu' ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-sky-400 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
          id="layanan-sub-jalur"
        >
          Jalur & Waktu
        </button>
        <button
          onClick={() => setActiveSubTab('biaya')}
          className={`py-2 text-center text-[10px] font-bold rounded-xl transition-all ${activeSubTab === 'biaya' ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-sky-400 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
          id="layanan-sub-biaya"
        >
          Biaya Layanan
        </button>
      </div>

      {/* 1. MAKLUMAT LAYANAN */}
      {activeSubTab === 'maklumat' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-4 overflow-hidden shadow-sm">
            <iframe
              srcDoc={maklumatHtml}
              className="w-full h-[450px] border-0 rounded-2xl"
              title="Maklumat Pelayanan PPID"
              referrerPolicy="no-referrer"
            />
          </div>
          <p className="text-[10px] text-slate-400 text-center font-medium">
            Maklumat resmi ini mengikat seluruh pimpinan dan aparatur Pengadilan Agama Blitar.
          </p>
        </motion.div>
      )}

      {/* 2. PROSEDUR PERMOHONAN INFORMASI */}
      {activeSubTab === 'prosedur_permohonan' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 text-left"
        >
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white mb-2">
              Prosedur Permohonan Informasi Publik
            </h3>
            <p className="text-[11px] text-slate-500 mb-6">
              Langkah-langkah mengajukan permintaan informasi publik resmi di Pengadilan Agama Blitar.
            </p>

            {/* Step-by-step Interactive Flowchart */}
            <div className="space-y-6 relative pl-6 border-l-2 border-indigo-100 dark:border-indigo-950">
              <div className="relative">
                <div className="absolute -left-10 top-0.5 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-md">
                  1
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Pengajuan Permohonan</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Pemohon mengajukan permohonan secara online melalui formulir digital e-PPID, WhatsApp, atau mendatangi langsung Meja Layanan Informasi PTSP PA Blitar.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-10 top-0.5 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-md">
                  2
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Verifikasi Berkas</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Petugas PPID memeriksa kelengkapan identitas pemohon (KTP/SK Badan Hukum) serta kejelasan rincian informasi publik yang dimohonkan.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-10 top-0.5 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-md">
                  3
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Uji Konsekuensi (Bila Perlu)</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Apabila informasi yang diminta berstatus rahasia atau dikecualikan, PPID akan melakukan rapat uji konsekuensi sebelum memberikan penolakan tertulis.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-10 top-0.5 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-md">
                  4
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Pemberian Tanggapan</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  PPID menerbitkan surat keputusan pemberitahuan tertulis tentang dikabulkan atau ditolaknya permohonan dalam waktu maksimal 10 + 7 hari kerja.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* 3. PROSEDUR PENGAJUAN KEBERATAN */}
      {activeSubTab === 'prosedur_keberatan' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 text-left"
        >
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white mb-2">
              Prosedur Pengajuan Keberatan
            </h3>
            <p className="text-[11px] text-slate-500 mb-6">
              Mekanisme komplain resmi apabila permohonan informasi ditolak atau tidak ditanggapi secara memuaskan.
            </p>

            <div className="space-y-6 relative pl-6 border-l-2 border-rose-100 dark:border-rose-950">
              <div className="relative">
                <div className="absolute -left-10 top-0.5 w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs font-bold shadow-md">
                  1
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Penyusunan Form Keberatan</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Pemohon mengisi Formulir Keberatan Layanan Elektronik, memilih alasan hukum keberatan (misal: penolakan sepihak, biaya tidak wajar), dan memberikan uraian kasus posisi.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-10 top-0.5 w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs font-bold shadow-md">
                  2
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Penyerahan Ke Atasan PPID</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Berkas keberatan resmi diteruskan oleh administrator PPID kepada Ketua Pengadilan Agama Blitar selaku Atasan PPID untuk dikaji ulang.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-10 top-0.5 w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs font-bold shadow-md">
                  3
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Tanggapan Atasan PPID</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Atasan PPID menerbitkan Keputusan Atasan PPID terkait keberatan pemohon paling lambat 30 hari kerja sejak berkas keberatan diterima lengkap.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* 4. PROSEDUR SENGKETA INFORMASI */}
      {activeSubTab === 'prosedur_sengketa' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 text-left"
        >
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white mb-2">
              Prosedur Penyelesaian Sengketa Informasi
            </h3>
            <p className="text-[11px] text-slate-500 mb-6">
              Prosedur ajudikasi non-litigasi di Komisi Informasi jika tanggapan Atasan PPID ditolak oleh pemohon.
            </p>

            <div className="space-y-6 relative pl-6 border-l-2 border-amber-100 dark:border-amber-950">
              <div className="relative">
                <div className="absolute -left-10 top-0.5 w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs font-bold shadow-md">
                  1
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Pengajuan ke Komisi Informasi</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Pemohon yang tidak puas dengan keputusan Atasan PPID berhak mendaftarkan sengketa informasi ke Komisi Informasi (KI) Jawa Timur/Pusat dalam waktu 14 hari kerja.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-10 top-0.5 w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs font-bold shadow-md">
                  2
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Sidang Mediasi & Ajudikasi</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Komisi Informasi menyelenggarakan sidang mediasi. Jika mediasi gagal, dilakukan sidang ajudikasi formal untuk menerbitkan Putusan Komisi Informasi.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-10 top-0.5 w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs font-bold shadow-md">
                  3
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Gugatan Banding Ke Pengadilan</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Pihak yang keberatan dengan Putusan Komisi Informasi dapat mengajukan banding/gugatan sengketa informasi publik ke Pengadilan Tata Usaha Negara (PTUN).
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* 5. JALUR & WAKTU LAYANAN */}
      {activeSubTab === 'jalur_waktu' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-4 shadow-sm">
            <iframe
              srcDoc={jalurWaktuHtml}
              className="w-full h-[400px] border-0 rounded-2xl"
              title="Jalur dan Waktu Layanan"
              referrerPolicy="no-referrer"
            />
          </div>
          <p className="text-[10px] text-slate-400 text-center font-medium">
            Layanan informasi ditutup pada hari libur nasional dan cuti bersama resmi pemerintah.
          </p>
        </motion.div>
      )}

      {/* 6. BIAYA LAYANAN */}
      {activeSubTab === 'biaya' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 text-left"
        >
          {/* Main cost list */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
            <div className="flex items-start gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 rounded-2xl">
                <Coins size={22} />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white leading-tight">
                  Biaya Memperoleh Salinan Informasi
                </h3>
                <p className="text-[11px] text-slate-400 mt-1">
                  Pengadilan Agama Blitar berkomitmen menyelenggarakan layanan tanpa pungutan liar.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-850/60 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Salinan Cetak</span>
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1">Print Out Dokumen</h4>
                </div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-xs text-slate-400">Rp</span>
                  <span className="text-2xl font-serif font-bold text-indigo-700 dark:text-sky-400">2.000,-</span>
                  <span className="text-[10px] text-slate-400 font-medium">/ Lembar</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-850/60 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Salinan Fotokopi</span>
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1">Penggandaan Berkas</h4>
                </div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-xs text-slate-400">Rp</span>
                  <span className="text-2xl font-serif font-bold text-indigo-700 dark:text-sky-400">500,-</span>
                  <span className="text-[10px] text-slate-400 font-medium">/ Lembar</span>
                </div>
              </div>
            </div>

            {/* Legal notes */}
            <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/10 text-amber-900 dark:text-amber-300 space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-amber-700 dark:text-amber-400">
                <Info size={14} />
                <span>Keterangan Legal Penarikan Biaya</span>
              </h5>
              <ul className="space-y-2 text-[11px] leading-relaxed list-disc pl-4 text-slate-600 dark:text-slate-300">
                {BIAYA_LAYANAN_NOTE.split('\n').slice(1).map((note, index) => (
                  <li key={index} className="text-justify">{note.replace(/^\d+\.\s*/, '')}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
