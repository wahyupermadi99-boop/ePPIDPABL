/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Download, Phone, Check, AlertCircle, FileText, CheckCircle, Scale } from 'lucide-react';
import { InfoRequestForm, ObjectionForm } from '../types';
import { jsPDF } from 'jspdf';

interface FormulirViewProps {
  onAddSubmission: (type: 'permohonan' | 'keberatan', data: any) => void;
}

export default function FormulirView({ onAddSubmission }: FormulirViewProps) {
  const [activeFormTab, setActiveFormTab] = useState<'wa' | 'permohonan' | 'keberatan'>('wa');
  
  // States for Permohonan Form
  const [permohonanData, setPermohonanData] = useState<InfoRequestForm>({
    nama: '',
    nik: '',
    alamat: '',
    email: '',
    telepon: '',
    pekerjaan: '',
    rincianInformasi: '',
    tujuanPenggunaan: '',
    caraMemperoleh: 'membaca',
    caraMendapatkan: 'email'
  });
  
  // States for Keberatan Form
  const [keberatanData, setKeberatanData] = useState<ObjectionForm>({
    nomorRegistrasi: '',
    tujuanInformasi: '',
    namaPemohon: '',
    alamat: '',
    pekerjaan: '',
    telepon: '',
    alasanKeberatan: [],
    kasusPosisi: '',
    namaKuasa: '',
    alamatKuasa: '',
    teleponKuasa: ''
  });

  const [isPermohonanSubmitted, setIsPermohonanSubmitted] = useState(false);
  const [isKeberatanSubmitted, setIsKeberatanSubmitted] = useState(false);
  const [submittedRegNum, setSubmittedRegNum] = useState('');

  // WhatsApp Config
  const [waMessage, setWaMessage] = useState('Halo PPID Pengadilan Agama Blitar, saya ingin menanyakan tentang prosedur beracara dan jadwal pelayanan informasi.');

  const handleSendWhatsApp = () => {
    const formattedPhone = "6282143635431"; // Mock official PA Blitar WhatsApp number
    const encodedText = encodeURIComponent(waMessage);
    window.open(`https://wa.me/${formattedPhone}?text=${encodedText}`, '_blank');
  };

  const handlePermohonanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!permohonanData.nama || !permohonanData.nik || !permohonanData.rincianInformasi) {
      alert('Mohon isi field wajib (Nama, NIK, dan Rincian Informasi)');
      return;
    }
    const regNum = `REG-PPID-${Date.now().toString().slice(-6)}`;
    setSubmittedRegNum(regNum);
    onAddSubmission('permohonan', { ...permohonanData, regNum, date: new Date().toLocaleDateString('id-ID') });

    // Format WhatsApp message elegantly
    const waText = `*FORMULIR PERMOHONAN INFORMASI RESMI*
*e-PPID Pengadilan Agama Blitar*

*No. Registrasi:* ${regNum}
*Tanggal:* ${new Date().toLocaleDateString('id-ID')}

*I. IDENTITAS PEMOHON*
• *Nama Lengkap:* ${permohonanData.nama}
• *NIK:* ${permohonanData.nik}
• *Pekerjaan:* ${permohonanData.pekerjaan || '-'}
• *Alamat:* ${permohonanData.alamat}
• *No. Telepon / WA:* ${permohonanData.telepon}
• *Email:* ${permohonanData.email || '-'}

*II. RINCIAN PERMOHONAN*
• *Informasi yang Dibutuhkan:*
${permohonanData.rincianInformasi}

• *Tujuan Penggunaan:*
${permohonanData.tujuanPenggunaan || '-'}

• *Cara Memperoleh:* ${permohonanData.caraMemperoleh === 'membaca' ? 'Membaca / Melihat / Mendengarkan' : 'Mendapatkan Salinan Dokumen'}
• *Cara Mendapatkan Salinan:* ${
      permohonanData.caraMendapatkan === 'email' ? 'Kirim via Email Resmi' :
      permohonanData.caraMendapatkan === 'whatsapp' ? 'Kirim via WhatsApp (PDF)' :
      permohonanData.caraMendapatkan === 'langsung' ? 'Mengambil Langsung ke Meja Layanan' :
      'Dikirim via Pos / Kurir'
    }

---
Mohon kiranya permohonan informasi kami dapat diproses sesuai dengan ketentuan SK KMA No. 2-144/KMA/SK/VIII/2022. Terima kasih.`;

    const formattedPhone = "6282143635431"; // Hotline PPID PA Blitar
    const encodedText = encodeURIComponent(waText);
    window.open(`https://wa.me/${formattedPhone}?text=${encodedText}`, '_blank');

    setIsPermohonanSubmitted(true);
  };

  const handleKeberatanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keberatanData.nomorRegistrasi || !keberatanData.namaPemohon || keberatanData.alasanKeberatan.length === 0) {
      alert('Mohon isi field wajib (No. Registrasi, Nama Pemohon, dan minimal 1 Alasan Keberatan)');
      return;
    }
    const regNum = `KEB-PPID-${Date.now().toString().slice(-6)}`;
    setSubmittedRegNum(regNum);
    onAddSubmission('keberatan', { ...keberatanData, regNum, date: new Date().toLocaleDateString('id-ID') });

    // Format WhatsApp message elegantly for Keberatan
    const waText = `*FORMULIR PENGAJUAN KEBERATAN RESMI*
*e-PPID Pengadilan Agama Blitar*

*No. Registrasi Keberatan:* ${regNum}
*Tanggal:* ${new Date().toLocaleDateString('id-ID')}

*I. DETAIL PERMOHONAN AWAL*
• *No. Pendaftaran Informasi:* ${keberatanData.nomorRegistrasi}
• *Tujuan Penggunaan Informasi:* ${keberatanData.tujuanInformasi || '-'}

*II. IDENTITAS PEMOHON KEBERATAN*
• *Nama Lengkap:* ${keberatanData.namaPemohon}
• *Alamat:* ${keberatanData.alamat || '-'}
• *Pekerjaan:* ${keberatanData.pekerjaan || '-'}
• *No. Telepon / WA:* ${keberatanData.telepon || '-'}

${keberatanData.namaKuasa ? `*III. IDENTITAS KUASA PEMOHON*
• *Nama Kuasa:* ${keberatanData.namaKuasa}
• *Alamat Kuasa:* ${keberatanData.alamatKuasa || '-'}
• *No. Telepon Kuasa:* ${keberatanData.teleponKuasa || '-'}
` : ''}
*${keberatanData.namaKuasa ? 'IV' : 'III'}. ALASAN KEBERATAN*
${keberatanData.alasanKeberatan.map((alasan, index) => `${index + 1}. ${alasan}`).join('\n')}

*KASUS POSISI (URAIAN):*
${keberatanData.kasusPosisi || '-'}

---
Pengajuan keberatan ini dikirimkan sesuai dengan prosedur penyelesaian sengketa informasi di Pengadilan Agama Blitar. Terima kasih.`;

    const formattedPhone = "6282143635431"; // Hotline PPID PA Blitar
    const encodedText = encodeURIComponent(waText);
    window.open(`https://wa.me/${formattedPhone}?text=${encodedText}`, '_blank');

    setIsKeberatanSubmitted(true);
  };

  const handleAlasanToggle = (alasan: string) => {
    const current = [...keberatanData.alasanKeberatan];
    const index = current.indexOf(alasan);
    if (index === -1) {
      current.push(alasan);
    } else {
      current.splice(index, 1);
    }
    setKeberatanData({ ...keberatanData, alasanKeberatan: current });
  };

  const handleResetPermohonan = () => {
    setPermohonanData({
      nama: '',
      nik: '',
      alamat: '',
      email: '',
      telepon: '',
      pekerjaan: '',
      rincianInformasi: '',
      tujuanPenggunaan: '',
      caraMemperoleh: 'membaca',
      caraMendapatkan: 'email'
    });
    setIsPermohonanSubmitted(false);
  };

  const handleResetKeberatan = () => {
    setKeberatanData({
      nomorRegistrasi: '',
      tujuanInformasi: '',
      namaPemohon: '',
      alamat: '',
      pekerjaan: '',
      telepon: '',
      alasanKeberatan: [],
      kasusPosisi: '',
      namaKuasa: '',
      alamatKuasa: '',
      teleponKuasa: ''
    });
    setIsKeberatanSubmitted(false);
  };

  const downloadMockPdf = (type: 'permohonan' | 'keberatan') => {
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Header (Kop Surat)
      doc.setFont('times', 'bold');
      doc.setFontSize(14);
      doc.text('PENGADILAN AGAMA BLITAR', 105, 18, { align: 'center' });
      
      doc.setFont('times', 'normal');
      doc.setFontSize(10);
      doc.text('Jl. Imam Bonjol No. 42, Kota Blitar, Jawa Timur', 105, 23, { align: 'center' });
      doc.text('Telepon: (0342) 801296 | Website: www.pa-blitar.go.id', 105, 27, { align: 'center' });
      
      doc.setFont('times', 'bold');
      doc.setFontSize(11);
      doc.text('PEJABAT PENGELOLA INFORMASI DAN DOKUMENTASI (PPID)', 105, 33, { align: 'center' });

      // Double divider line
      doc.setLineWidth(0.6);
      doc.line(15, 36, 195, 36);
      doc.setLineWidth(0.2);
      doc.line(15, 37.5, 195, 37.5);

      if (type === 'permohonan') {
        // Document Title
        doc.setFont('times', 'bold');
        doc.setFontSize(12);
        doc.text('TANDA BUKTI REGISTRASI PERMOHONAN INFORMASI', 105, 47, { align: 'center' });
        
        doc.setFont('times', 'bold');
        doc.setFontSize(10);
        doc.text(`NOMOR REGISTRASI: ${submittedRegNum || 'REG-PPID-MOCK'}`, 105, 52, { align: 'center' });

        doc.setFont('times', 'normal');
        doc.setFontSize(10);
        
        let y = 62;
        const leftColX = 20;
        const rightColX = 65;
        const rightColWidth = 130;

        const addRow = (label: string, value: string) => {
          doc.setFont('times', 'bold');
          doc.text(label, leftColX, y);
          doc.setFont('times', 'normal');
          doc.text(':', rightColX - 3, y);
          
          const lines = doc.splitTextToSize(value || '-', rightColWidth);
          doc.text(lines, rightColX, y);
          y += (lines.length * 5) + 3;
        };

        addRow('Tanggal Pengajuan', new Date().toLocaleDateString('id-ID'));
        addRow('Nama Pemohon', permohonanData.nama);
        addRow('NIK / No. Identitas', permohonanData.nik);
        addRow('Pekerjaan', permohonanData.pekerjaan || '-');
        addRow('Alamat Lengkap', permohonanData.alamat);
        addRow('No. Telepon / WA', permohonanData.telepon);
        addRow('Email', permohonanData.email || '-');
        
        y += 2;
        doc.setFont('times', 'bold');
        doc.text('RINCIAN PERMOHONAN INFORMASI:', leftColX, y);
        y += 6;
        
        doc.setFont('times', 'italic');
        const infoLines = doc.splitTextToSize(permohonanData.rincianInformasi || '-', 175);
        doc.text(infoLines, leftColX, y);
        y += (infoLines.length * 5) + 6;

        doc.setFont('times', 'bold');
        doc.text('Tujuan Penggunaan Informasi:', leftColX, y);
        y += 6;
        
        doc.setFont('times', 'normal');
        const tujuanLines = doc.splitTextToSize(permohonanData.tujuanPenggunaan || '-', 175);
        doc.text(tujuanLines, leftColX, y);
        y += (tujuanLines.length * 5) + 6;

        addRow('Cara Memperoleh', permohonanData.caraMemperoleh === 'membaca' ? 'Membaca / Melihat / Mendengarkan' : 'Mendapatkan Salinan Dokumen');
        
        const caraMendapatkanLabel = 
          permohonanData.caraMendapatkan === 'email' ? 'Kirim via Email Resmi' :
          permohonanData.caraMendapatkan === 'whatsapp' ? 'Kirim via WhatsApp (PDF)' :
          permohonanData.caraMendapatkan === 'langsung' ? 'Mengambil Langsung ke Meja Layanan' :
          'Dikirim via Pos / Kurir';
        addRow('Cara Mendapatkan', caraMendapatkanLabel);

        y += 5;
        if (y > 240) {
          doc.addPage();
          y = 30;
        }

        doc.setFont('times', 'normal');
        doc.setFontSize(9);
        doc.text('Catatan:', leftColX, y);
        y += 4;
        doc.text('1. Tanda bukti digital ini sah dan diterbitkan secara otomatis oleh sistem e-PPID Pengadilan Agama Blitar.', leftColX, y);
        y += 4;
        doc.text('2. Permohonan Anda akan diproses dalam waktu maksimal 10 hari kerja sejak permohonan dicatatkan.', leftColX, y);

        y += 12;
        if (y > 240) {
          doc.addPage();
          y = 30;
        }
        
        doc.setFont('times', 'normal');
        doc.setFontSize(10);
        doc.text('Blitar, ' + new Date().toLocaleDateString('id-ID'), 140, y);
        y += 5;
        doc.setFont('times', 'bold');
        doc.text('Petugas PPID PA Blitar', 140, y);
        y += 18;
        doc.text('( Sistem e-PPID )', 140, y);

        doc.save(`Tanda_Bukti_Permohonan_${submittedRegNum || 'MOCK'}.pdf`);
      } else {
        // Document Title
        doc.setFont('times', 'bold');
        doc.setFontSize(12);
        doc.text('TANDA BUKTI PENGAJUAN KEBERATAN INFORMASI', 105, 47, { align: 'center' });
        
        doc.setFont('times', 'bold');
        doc.setFontSize(10);
        doc.text(`NOMOR REGISTRASI KEBERATAN: ${submittedRegNum || 'KEB-PPID-MOCK'}`, 105, 52, { align: 'center' });

        doc.setFont('times', 'normal');
        doc.setFontSize(10);
        
        let y = 62;
        const leftColX = 20;
        const rightColX = 65;
        const rightColWidth = 130;

        const addRow = (label: string, value: string) => {
          doc.setFont('times', 'bold');
          doc.text(label, leftColX, y);
          doc.setFont('times', 'normal');
          doc.text(':', rightColX - 3, y);
          
          const lines = doc.splitTextToSize(value || '-', rightColWidth);
          doc.text(lines, rightColX, y);
          y += (lines.length * 5) + 3;
        };

        addRow('Tanggal Pengajuan', new Date().toLocaleDateString('id-ID'));
        addRow('No. Permohonan Awal', keberatanData.nomorRegistrasi);
        addRow('Nama Pemohon Keberatan', keberatanData.namaPemohon);
        addRow('Pekerjaan Pemohon', keberatanData.pekerjaan || '-');
        addRow('Alamat Lengkap', keberatanData.alamat || '-');
        addRow('No. Telepon / WA', keberatanData.telepon || '-');

        if (keberatanData.namaKuasa) {
          y += 3;
          doc.setFont('times', 'bold');
          doc.text('IDENTITAS KUASA PEMOHON:', leftColX, y);
          y += 6;
          addRow('Nama Kuasa', keberatanData.namaKuasa);
          addRow('Alamat Kuasa', keberatanData.alamatKuasa || '-');
          addRow('No. Telepon Kuasa', keberatanData.teleponKuasa || '-');
        }

        y += 2;
        doc.setFont('times', 'bold');
        doc.text('ALASAN-ALASAN KEBERATAN:', leftColX, y);
        y += 6;
        
        doc.setFont('times', 'normal');
        keberatanData.alasanKeberatan.forEach((alasan) => {
          const lines = doc.splitTextToSize(`- ${alasan}`, 175);
          doc.text(lines, leftColX, y);
          y += (lines.length * 5) + 2;
        });

        y += 3;
        doc.setFont('times', 'bold');
        doc.text('KASUS POSISI / URAIAN SINGKAT:', leftColX, y);
        y += 6;
        
        doc.setFont('times', 'italic');
        const kasusLines = doc.splitTextToSize(keberatanData.kasusPosisi || '-', 175);
        doc.text(kasusLines, leftColX, y);
        y += (kasusLines.length * 5) + 6;

        if (y > 240) {
          doc.addPage();
          y = 30;
        }

        doc.setFont('times', 'normal');
        doc.setFontSize(9);
        doc.text('Catatan:', leftColX, y);
        y += 4;
        doc.text('1. Tanda bukti digital ini sah dan diterbitkan secara otomatis oleh sistem e-PPID Pengadilan Agama Blitar.', leftColX, y);
        y += 4;
        doc.text('2. Keberatan Anda akan diproses oleh Atasan PPID Pengadilan Agama Blitar sesuai ketentuan undang-undang.', leftColX, y);

        y += 12;
        if (y > 240) {
          doc.addPage();
          y = 30;
        }
        
        doc.setFont('times', 'normal');
        doc.setFontSize(10);
        doc.text('Blitar, ' + new Date().toLocaleDateString('id-ID'), 140, y);
        y += 5;
        doc.setFont('times', 'bold');
        doc.text('Petugas PPID PA Blitar', 140, y);
        y += 18;
        doc.text('( Sistem e-PPID )', 140, y);

        doc.save(`Tanda_Bukti_Keberatan_${submittedRegNum || 'MOCK'}.pdf`);
      }
    } catch (error) {
      console.error('Gagal membuat PDF:', error);
      alert('Maaf, terjadi kesalahan saat membuat berkas PDF. Silakan coba kembali.');
    }
  };

  // Legal standard objections in Indonesian
  const DAFTAR_ALASAN_KEBERATAN = [
    "Permohonan Informasi Ditolak dengan alasan yang tidak sah",
    "Informasi berkala tidak disediakan atau tidak diumumkan secara rutin",
    "Permohonan penggandaan informasi tidak dilayani / dipersulit",
    "Pembebanan biaya penggandaan informasi tidak wajar / tidak sesuai tarif resmi",
    "Penyampaian informasi melebihi batas waktu yang ditetapkan undang-undang (10+7 hari kerja)",
    "Permohonan informasi ditanggapi secara tidak memuaskan",
    "Informasi yang diberikan tidak sesuai dengan yang dimohonkan"
  ];

  return (
    <div className="w-full">
      {/* Tab Selectors inside page */}
      <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-2xl mb-6 shadow-inner border border-slate-200/50 dark:border-slate-800/40">
        <button
          onClick={() => { setActiveFormTab('wa'); }}
          className={`flex-1 py-2.5 px-0.5 text-center text-[10px] sm:text-xs font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-1 ${activeFormTab === 'wa' ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-sky-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'}`}
          id="tab-wa"
        >
          <Phone size={12} className="shrink-0" />
          <span className="truncate">E-Permohonan (WA)</span>
        </button>
        <button
          onClick={() => { setActiveFormTab('permohonan'); }}
          className={`flex-1 py-2.5 px-0.5 text-center text-[10px] sm:text-xs font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-1 ${activeFormTab === 'permohonan' ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-sky-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'}`}
          id="tab-permohonan"
        >
          <FileText size={12} className="shrink-0" />
          <span className="truncate">Permohonan</span>
        </button>
        <button
          onClick={() => { setActiveFormTab('keberatan'); }}
          className={`flex-1 py-2.5 px-0.5 text-center text-[10px] sm:text-xs font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-1 ${activeFormTab === 'keberatan' ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-sky-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'}`}
          id="tab-keberatan"
        >
          <Scale size={12} className="shrink-0" />
          <span className="truncate">Keberatan</span>
        </button>
      </div>

      {/* 1. WHATSAPP ELECTRONIC PERMOHONAN */}
      {activeFormTab === 'wa' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm"
        >
          <div className="flex items-start gap-4 mb-5">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-2xl shadow-sm">
              <Phone size={24} />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-slate-950 dark:text-white">Layanan WhatsApp PPID</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Kirim permohonan informasi publik secara langsung, responsif, dan mudah melalui Unit Meja Informasi WhatsApp resmi.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950/40 rounded-2xl p-5 border border-slate-100 dark:border-slate-850 mb-6">
            <h4 className="text-xs font-bold text-indigo-950 dark:text-slate-300 uppercase tracking-wider mb-2">Informasi Kontak Layanan</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-dashed border-slate-200 dark:border-slate-800">
                <span className="text-slate-500">Hotline PPID</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">+62 821-4363-5431</span>
              </div>
              <div className="flex justify-between py-1 border-b border-dashed border-slate-200 dark:border-slate-800">
                <span className="text-slate-500">Jam Layanan</span>
                <span className="font-medium">Senin - Kamis (08:00 - 15:30 WIB)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Biaya Layanan</span>
                <span className="font-semibold text-green-600 dark:text-green-400">Gratis (Rp 0,-)</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                Sesuaikan Pesan Pembuka Anda:
              </label>
              <textarea
                value={waMessage}
                onChange={(e) => setWaMessage(e.target.value)}
                rows={4}
                className="w-full text-xs p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-sky-500 focus:border-transparent transition-all font-sans"
                placeholder="Tulis pesan permohonan Anda..."
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleSendWhatsApp}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold text-sm shadow-lg shadow-emerald-500/20 hover:from-emerald-600 hover:to-green-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
              id="send-wa-button"
            >
              <Send size={16} />
              <span>Kirim Permohonan via WhatsApp</span>
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* 2. FORMULIR PERMOHONAN INFORMASI */}
      {activeFormTab === 'permohonan' && (
        <div className="space-y-6">
          {!isPermohonanSubmitted ? (
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handlePermohonanSubmit}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-sm space-y-5"
            >
              <div className="border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
                <h2 className="font-serif font-bold text-xl text-slate-950 dark:text-white">Formulir Permohonan Informasi</h2>
                <p className="text-xs text-slate-400 dark:text-slate-400 mt-1">
                  Isi formulir elektronik di bawah ini dengan lengkap untuk mengajukan permohonan salinan resmi informasi Pengadilan Agama Blitar.
                </p>
              </div>

              {/* Data Diri Section */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-indigo-900 dark:text-sky-400 uppercase tracking-wider">I. Identitas Pemohon</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      Nama Lengkap Pemohon <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={permohonanData.nama}
                      onChange={(e) => setPermohonanData({ ...permohonanData, nama: e.target.value })}
                      className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-sky-500 focus:border-transparent transition-all"
                      placeholder="Sesuai KTP"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      Nomor Induk Kependudukan (NIK) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={16}
                      value={permohonanData.nik}
                      onChange={(e) => setPermohonanData({ ...permohonanData, nik: e.target.value })}
                      className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-sky-500 focus:border-transparent transition-all"
                      placeholder="16 digit angka KTP"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      Email Aktif
                    </label>
                    <input
                      type="email"
                      value={permohonanData.email}
                      onChange={(e) => setPermohonanData({ ...permohonanData, email: e.target.value })}
                      className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-sky-500 focus:border-transparent transition-all"
                      placeholder="contoh@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      Nomor Telepon / WA <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={permohonanData.telepon}
                      onChange={(e) => setPermohonanData({ ...permohonanData, telepon: e.target.value })}
                      className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-sky-500 focus:border-transparent transition-all"
                      placeholder="0812xxxxxxxx"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Pekerjaan
                  </label>
                  <input
                    type="text"
                    value={permohonanData.pekerjaan}
                    onChange={(e) => setPermohonanData({ ...permohonanData, pekerjaan: e.target.value })}
                    className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-sky-500 focus:border-transparent transition-all"
                    placeholder="PNS, Karyawan, Wiraswasta, Pelajar, dll."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Alamat Lengkap <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={permohonanData.alamat}
                    onChange={(e) => setPermohonanData({ ...permohonanData, alamat: e.target.value })}
                    className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-sky-500 focus:border-transparent transition-all"
                    placeholder="Jalan, RT/RW, Dusun, Desa, Kecamatan, Kabupaten/Kota"
                  />
                </div>
              </div>

              {/* Rincian Permohonan Section */}
              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <h3 className="text-xs font-bold text-indigo-900 dark:text-sky-400 uppercase tracking-wider">II. Rincian Informasi</h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Rincian Informasi yang Dibutuhkan <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={permohonanData.rincianInformasi}
                    onChange={(e) => setPermohonanData({ ...permohonanData, rincianInformasi: e.target.value })}
                    className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-sky-500 focus:border-transparent transition-all"
                    placeholder="Jelaskan secara detail informasi apa yang Anda butuhkan (contoh: Laporan Keuangan DIPA 04 Tahun 2024)"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Tujuan Penggunaan Informasi
                  </label>
                  <input
                    type="text"
                    value={permohonanData.tujuanPenggunaan}
                    onChange={(e) => setPermohonanData({ ...permohonanData, tujuanPenggunaan: e.target.value })}
                    className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-sky-500 focus:border-transparent transition-all"
                    placeholder="Contoh: Keperluan penelitian akademis, arsip pribadi, dll."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                      Cara Memperoleh Informasi
                    </label>
                    <select
                      value={permohonanData.caraMemperoleh}
                      onChange={(e) => setPermohonanData({ ...permohonanData, caraMemperoleh: e.target.value as any })}
                      className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-sky-500 focus:border-transparent transition-all"
                    >
                      <option value="membaca">Membaca / Melihat / Mendengarkan</option>
                      <option value="menyalin">Mendapatkan Salinan Dokumen (Hard/Soft copy)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                      Cara Mendapatkan Salinan
                    </label>
                    <select
                      value={permohonanData.caraMendapatkan}
                      onChange={(e) => setPermohonanData({ ...permohonanData, caraMendapatkan: e.target.value as any })}
                      className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-sky-500 focus:border-transparent transition-all"
                    >
                      <option value="email">Kirim via Email Resmi</option>
                      <option value="whatsapp">Kirim via WhatsApp (PDF)</option>
                      <option value="langsung">Mengambil Langsung ke Meja Layanan PA Blitar</option>
                      <option value="kurir">Dikirim via Pos / Kurir (Biaya kirim ditanggung pemohon)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold text-sm shadow-lg shadow-emerald-500/20 hover:from-emerald-600 hover:to-green-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  id="submit-permohonan-button"
                >
                  <Phone size={15} />
                  <span>Kirim via WhatsApp Resmi</span>
                </motion.button>
              </div>
            </motion.form>
          ) : (
            /* Success State with Printable Receipt Card */
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl text-center space-y-6"
            >
              <div className="w-16 h-16 bg-green-50 dark:bg-green-950/30 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle size={36} />
              </div>

              <div>
                <h3 className="font-serif font-bold text-xl text-slate-900 dark:text-white">Formulir Sukses Dikirim!</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-sm mx-auto">
                  Permohonan informasi Anda telah berhasil dicatat pada sistem internal ePPID Pengadilan Agama Blitar.
                </p>
              </div>

              {/* Printable Receipt */}
              <div className="bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 p-6 rounded-2xl text-left font-mono text-xs max-w-md mx-auto space-y-3 shadow-inner relative overflow-hidden">
                <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-br from-indigo-500/5 to-transparent rounded-full" />
                <div className="border-b border-dashed border-slate-200 dark:border-slate-800 pb-3 mb-2 flex justify-between items-center">
                  <span className="font-bold text-indigo-700 dark:text-sky-400">TANDA BUKTI PPID</span>
                  <span className="text-[10px] text-slate-400">PA BLITAR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">NO. REGISTRASI:</span>
                  <span className="font-bold text-slate-950 dark:text-white">{submittedRegNum}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">TANGGAL DAFTAR:</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{new Date().toLocaleDateString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">NAMA PEMOHON:</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200 uppercase">{permohonanData.nama}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">NIK:</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{permohonanData.nik.replace(/(.{4})/g, '$1 ')}</span>
                </div>
                <div className="border-t border-dashed border-slate-200 dark:border-slate-800 pt-3 mt-2">
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">RINCIAN PERMOHONAN:</p>
                  <p className="text-[11px] font-sans text-slate-700 dark:text-slate-300 line-clamp-3 leading-relaxed">
                    {permohonanData.rincianInformasi}
                  </p>
                </div>
                <div className="border-t border-slate-100 dark:border-slate-850 pt-2 text-center text-[10px] text-slate-400">
                  Simpan tanda bukti digital ini untuk pelacakan status.
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
                <button
                  onClick={() => downloadMockPdf('permohonan')}
                  className="flex-1 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  id="print-receipt-button"
                >
                  <Download size={14} />
                  <span>Cetak / Unduh PDF</span>
                </button>
                <button
                  onClick={handleResetPermohonan}
                  className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 dark:bg-indigo-700 text-white font-semibold text-xs hover:bg-indigo-700 transition-all cursor-pointer"
                  id="new-request-button"
                >
                  Ajukan Form Baru
                </button>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* 3. FORMULIR KEBERATAN */}
      {activeFormTab === 'keberatan' && (
        <div className="space-y-6">
          {!isKeberatanSubmitted ? (
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleKeberatanSubmit}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-sm space-y-5"
            >
              <div className="border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
                <h2 className="font-serif font-bold text-xl text-slate-950 dark:text-white">Formulir Keberatan Layanan</h2>
                <p className="text-xs text-slate-400 dark:text-slate-400 mt-1">
                  Ajukan keberatan resmi atas ketidakpuasan pelayanan informasi PPID Pengadilan Agama Blitar sesuai ketentuan UU KIP.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider flex items-center gap-1">
                  <AlertCircle size={14} />
                  <span>I. Referensi Permohonan Awal</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      Nomor Registrasi Permohonan Awal <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={keberatanData.nomorRegistrasi}
                      onChange={(e) => setKeberatanData({ ...keberatanData, nomorRegistrasi: e.target.value })}
                      className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="Contoh: REG-PPID-123456"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      Tujuan Informasi yang Dimohonkan
                    </label>
                    <input
                      type="text"
                      value={keberatanData.tujuanInformasi}
                      onChange={(e) => setKeberatanData({ ...keberatanData, tujuanInformasi: e.target.value })}
                      className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="Contoh: Untuk data skripsi perdata agama"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <h3 className="text-xs font-bold text-indigo-900 dark:text-sky-400 uppercase tracking-wider">II. Identitas Pemohon Keberatan</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      Nama Lengkap Pemohon Keberatan <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={keberatanData.namaPemohon}
                      onChange={(e) => setKeberatanData({ ...keberatanData, namaPemohon: e.target.value })}
                      className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="Sesuai KTP"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      Pekerjaan
                    </label>
                    <input
                      type="text"
                      value={keberatanData.pekerjaan}
                      onChange={(e) => setKeberatanData({ ...keberatanData, pekerjaan: e.target.value })}
                      className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="Pekerjaan"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      No. Telepon Aktif <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={keberatanData.telepon}
                      onChange={(e) => setKeberatanData({ ...keberatanData, telepon: e.target.value })}
                      className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="08xxxxxxxxxx"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      Nama Kuasa Pemohon <span className="text-slate-400">(Opsional)</span>
                    </label>
                    <input
                      type="text"
                      value={keberatanData.namaKuasa}
                      onChange={(e) => setKeberatanData({ ...keberatanData, namaKuasa: e.target.value })}
                      className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="Nama Advokat / Kuasa Hukum"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Alamat Lengkap Pemohon Keberatan <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={keberatanData.alamat}
                    onChange={(e) => setKeberatanData({ ...keberatanData, alamat: e.target.value })}
                    className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="Alamat domisili"
                  />
                </div>
              </div>

              {/* Alasan Keberatan Section */}
              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <h3 className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">III. Alasan Keberatan (Pilih Minimal Satu) <span className="text-rose-500">*</span></h3>

                <div className="space-y-2.5">
                  {DAFTAR_ALASAN_KEBERATAN.map((alasan, index) => {
                    const isChecked = keberatanData.alasanKeberatan.includes(alasan);
                    return (
                      <div
                        key={index}
                        onClick={() => handleAlasanToggle(alasan)}
                        className={`p-3.5 rounded-2xl border text-xs cursor-pointer flex items-start gap-3 transition-all ${isChecked ? 'bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-800/60 text-indigo-950 dark:text-indigo-200' : 'bg-slate-50/60 dark:bg-slate-950/20 border-slate-200 dark:border-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-100/50'}`}
                      >
                        <div className={`mt-0.5 w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-all ${isChecked ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900'}`}>
                          {isChecked && <Check size={11} strokeWidth={3} />}
                        </div>
                        <span className="leading-normal">{alasan}</span>
                      </div>
                    );
                  })}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Kasus Posisi <span className="text-slate-400">(Kronologi Singkat / Penjelasan)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={keberatanData.kasusPosisi}
                    onChange={(e) => setKeberatanData({ ...keberatanData, kasusPosisi: e.target.value })}
                    className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="Uraikan kronologi pengajuan informasi, penolakan, atau pelayanan yang kurang memuaskan dari PPID Pelaksana..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold text-sm shadow-lg shadow-red-500/20 hover:from-red-600 hover:to-rose-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  id="submit-keberatan-button"
                >
                  <Phone size={15} />
                  <span>Kirim Keberatan via WhatsApp</span>
                </motion.button>
              </div>
            </motion.form>
          ) : (
            /* Success state for Keberatan Form */
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl text-center space-y-6"
            >
              <div className="w-16 h-16 bg-rose-50 dark:bg-rose-950/30 text-rose-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <Scale size={36} />
              </div>

              <div>
                <h3 className="font-serif font-bold text-xl text-slate-900 dark:text-white">Keberatan Resmi Diajukan!</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-sm mx-auto">
                  Pengajuan keberatan Anda telah berhasil didaftarkan ke Atasan PPID Pengadilan Agama Blitar.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 p-6 rounded-2xl text-left font-mono text-xs max-w-md mx-auto space-y-3 shadow-inner">
                <div className="border-b border-dashed border-slate-200 dark:border-slate-800 pb-3 mb-2 flex justify-between items-center">
                  <span className="font-bold text-rose-600 dark:text-rose-400 uppercase">TANDA TERIMA KEBERATAN</span>
                  <span className="text-[10px] text-slate-400">PA BLITAR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">KODE KEBERATAN:</span>
                  <span className="font-bold text-slate-950 dark:text-white">{submittedRegNum}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">NO. REGISTRASI AWAL:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{keberatanData.nomorRegistrasi}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">TANGGAL PENGAJUAN:</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{new Date().toLocaleDateString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">PEMOHON KEBERATAN:</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200 uppercase">{keberatanData.namaPemohon}</span>
                </div>
                <div className="border-t border-dashed border-slate-200 dark:border-slate-800 pt-3 mt-2">
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">JUMLAH ALASAN KEBERATAN:</p>
                  <p className="text-[11px] font-sans font-bold text-rose-600 dark:text-rose-400">
                    {keberatanData.alasanKeberatan.length} Alasan Hukum Terpilih
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
                <button
                  onClick={() => downloadMockPdf('keberatan')}
                  className="flex-1 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  id="print-objection-button"
                >
                  <Download size={14} />
                  <span>Cetak / Unduh PDF</span>
                </button>
                <button
                  onClick={handleResetKeberatan}
                  className="flex-1 py-3 px-4 rounded-xl bg-rose-600 dark:bg-rose-700 text-white font-semibold text-xs hover:bg-rose-700 transition-all cursor-pointer"
                  id="new-objection-button"
                >
                  Ajukan Keberatan Baru
                </button>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
