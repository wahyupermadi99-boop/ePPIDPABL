/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Regulation {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  description?: string;
}

export interface InfoItem {
  id: string;
  title: string;
  category: string;
  linkText?: string;
  url?: string;
  content?: string;
}

export interface ProfileSubMenu {
  id: 'profil_ppid' | 'tugas_fungsi' | 'visi_misi';
  title: string;
}

export interface ServiceSubMenu {
  id: 'maklumat' | 'prosedur_permohonan' | 'prosedur_keberatan' | 'prosedur_sengketa' | 'jalur_waktu' | 'biaya';
  title: string;
}

export interface FormSubMenu {
  id: 'permohonan_wa' | 'form_permohonan' | 'form_keberatan';
  title: string;
}

export interface InfoRequestForm {
  nama: string;
  nik: string;
  alamat: string;
  email: string;
  telepon: string;
  pekerjaan: string;
  rincianInformasi: string;
  tujuanPenggunaan: string;
  caraMemperoleh: 'melihat' | 'membaca' | 'mendengarkan' | 'menyalin';
  caraMendapatkan: 'langsung' | 'email' | 'kurir' | 'whatsapp';
}

export interface ObjectionForm {
  nomorRegistrasi: string;
  tujuanInformasi: string;
  namaPemohon: string;
  alamat: string;
  pekerjaan: string;
  telepon: string;
  alasanKeberatan: string[];
  kasusPosisi: string;
  namaKuasa?: string;
  alamatKuasa?: string;
  teleponKuasa?: string;
}

export interface ReportItem {
  year: string;
  totalRequests: number;
  approved: number;
  rejected: number;
  pending: number;
  avgTimeDays: number;
}
