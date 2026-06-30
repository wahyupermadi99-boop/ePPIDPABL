/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Regulation, InfoItem, ReportItem } from './types';

export const PROFIL_SINGKAT_PPID = `Pengadilan Agama Blitar berkomitmen untuk memberikan layanan kepada masyarakat guna memenuhi kebutuhan informasi publik. Hal ini ditunjukkan dengan adanya unit yang memiliki fungsi layanan informasi, yaitu Subbagian Data dan Layanan Informasi pada Bagian Perpustakaan dan Layanan Informasi Biro Hukum dan Hubungan Masyarakat sejak tahun 2006 dengan terbitnya SK SEKMA nomor MA/SEK/07/SK/III/2006.

Setelah itu, terbitlah SK KMA nomor 144/KMA/SK/VIII/2007 tentang Keterbukaan Informasi di Pengadilan sebagai pedoman pelayanan informasi di Pengadilan Agama Blitar. Di tahun 2007 ini, belum dikenal istilah PPID (Pejabat Pengelola Informasi dan Dokumentasi) dan Atasan PPID melainkan Petugas Informasi dan Dokumentasi dan Penanggung Jawab. Di dalam SK KMA 144 tahun 2007 ini dijelaskan mengenai informasi yang harus diumumkan pengadilan, tata cara pengumumannya, informasi yang dapat diakses publik, dan tata cara mendapatkan informasi tersebut, biaya, prosedur keberatan, dan pemanfaatan informasi.

Kemudian, terbitlah Undang-Undang Nomor 14 Tahun 2008 tentang Keterbukaan Informasi Publik (UU KIP) yang disahkan pada bulan April 2008 dan kemudian mulai berlaku pada bulan April 2010. UU tersebut menggunakan istilah-istilah yang sedikit berbeda dengan yang digunakan pada SK KMA 144 tahun 2007, sehingga Pengadilan Agama Blitar menindaklanjuti dengan menerbitkan SK KMA nomor 1-144/KMA/SK/I/2011 tentang Pedoman Pelayanan Informasi di Pengadilan.

SK KMA 1-144 tahun 2011 menambahkan beberapa detil yang belum diatur pada SK KMA 144 tahun 2007, di antaranya informasi yang dikecualikan, prosedur pengaburan informasi yang disertai dengan contoh, dan formulir-formulir terkait pelayanan informasi. Selain itu, pelaksana pelayanan informasi menjadi empat, yaitu atasan PPID, PPID, penanggung jawab informasi, dan petugas informasi.

Pada tahun 2021, Pengadilan Agama Blitar mengembangkan sistem informasi layanan online pemohon informasi pada situs web eppid.mahkamahagung.go.id yang terkoneksi dengan jaringan internet serta aplikasi back office Sistem Informasi EPPID (SI EPPID) bagi administrator PPID yang juga terkoneksi dengan jaringan intranet. Dengan fasilitas tersebut, pemohon informasi dapat mengajukan permohonan informasi atau keberatan dengan cepat, tanpa perlu menyampaikan surat ataupun datang ke ruang layanan informasi. Situs tersebut juga dilengkapi dengan informasi mengenai pengelolaan keterbukaan informasi publik di lingkungan Pengadilan Agama Blitar.

Pada tahun 2022, sejak bulan Januari, Pengadilan Agama Blitar telah mulai mengkaji ulang SK KMA nomor 1-144/KMA/SK/I/2011 bersama dengan Komisi Informasi Pusat dan Kementerian Komunikasi dan Informatika agar sesuai dengan regulasi terbaru terkait Keterbukaan Informasi Publik, khususnya Peraturan Komisi Informasi Nomor 1 Tahun 2021. Setelah melalui beberapa rapat dalam berbagai tahapannya, terbitlah SK KMA Nomor 2-144/KMA/SK/VIII/2022 di bulan Agustus 2022.`;

export const TUGAS_FUNGSI_PPID = [
  "Menetapkan kebijakan layanan Informasi Publik.",
  "Mengkoordinasikan pendokumentasian seluruh Informasi dalam bentuk cetak atau elektronik yang meliputi: Informasi yang wajib disediakan dan diumumkan secara berkala, Informasi yang wajib tersedia setiap saat, dan Informasi terbuka lainnya yang diminta Pemohon Informasi.",
  "Mengkoordinasikan pendataan Informasi di Pengadilan dalam rangka pembuatan dan pemutakhiran DIP paling kurang 2 (dua) kali dalam 1 (satu) tahun guna memastikan ketersediaan Informasi Publik dan jangka waktu penyimpanan Informasi Publik.",
  "Mengkoordinasikan pengumuman Informasi yang wajib diumumkan secara berkala melalui media e-LID atau media lainnya.",
  "Mengkoordinasikan pemberian Informasi yang dapat diakses oleh publik dengan Petugas Layanan Informasi.",
  "Melaksanakan rapat koordinasi dan rapat kerja secara berkala dan/atau sesuai dengan kebutuhan dalam melaksanakan pelayanan Informasi Publik.",
  "Meminta klarifikasi kepada PPID Pelaksana dan/atau Petugas Layanan Informasi dalam melaksanakan pelayanan Informasi Publik.",
  "Melakukan pengujian tentang konsekuensi yang timbul sebagaimana diatur dalam Pasal 19 Undang-Undang Nomor 14 Tahun 2008 tentang Keterbukaan Informasi Publik sebelum menyatakan Informasi Publik tertentu dikecualikan.",
  "Menyertakan alasan tertulis pengecualian Informasi secara jelas dan tegas dalam hal permohonan informasi ditolak.",
  "Mengkoordinasikan penghitaman atau pengaburan Informasi yang dikecualikan beserta alasannya kepada Petugas Layanan Informasi.",
  "Mengembangkan kapasitas pengelola layanan Informasi dalam rangka memberikan layanan secara prima (service excellent).",
  "Mengkoordinasikan dan memastikan agar pengajuan keberatan Informasi diproses berdasarkan prosedur yang berlaku.",
  "Melakukan koordinasi dengan kementerian/lembaga terkait dalam pelaksanaan layanan Informasi Publik yang efektif dan efisien.",
  "Memperhatikan pertimbangan yang disampaikan oleh Dewan Pertimbangan.",
  "Menetapkan laporan layanan Informasi Publik.",
  "PPID bertanggung jawab kepada Atasan PPID dalam melaksanakan tugas, tanggung jawab, dan wewenangnya."
];

export const VISI_PPID = "Terwujudnya keterbukaan informasi publik secara modern menuju peradilan yang agung";

export const MISI_PPID = [
  "Menyediakan informasi publik yang akurat dan dapat dipertanggungjawabkan",
  "Memberikan layanan informasi publik yang cepat, tepat, dan sederhana",
  "Memastikan pengelolaan layanan informasi publik didukung oleh sumber daya manusia yang profesional dan berintegritas",
  "Memanfaatkan teknologi informasi dan komunikasi yang mutakhir untuk mendukung pengelolaan keterbukaan informasi publik"
];

export const REGULATIONS: Regulation[] = [
  {
    id: "uu-14-2008",
    title: "Undang-Undang No. 14 Tahun 2008",
    subtitle: "Keterbukaan Informasi Publik",
    url: "https://www.dpr.go.id/dokjdih/document/uu/UU_2008_14.pdf",
    description: "Undang-undang yang menjamin hak warga negara untuk mengetahui rencana pembuatan kebijakan publik, program kebijakan publik, dan proses pengambilan keputusan publik, serta alasan pengambilan suatu keputusan publik."
  },
  {
    id: "uu-25-2009",
    title: "Undang-Undang No. 25 Tahun 2009",
    subtitle: "Pelayanan Publik",
    url: "https://peraturan.bpk.go.id/Details/38748/uu-no-25-tahun-2009",
    description: "Undang-undang yang mengatur prinsip-prinsip pemerintahan yang baik yang merupakan efektivitas fungsi-fungsi pemerintahan itu sendiri. Pelayanan publik yang dilakukan oleh pemerintahan negara merupakan bagian integral dari pelayanan publik."
  },
  {
    id: "pp-61-2010",
    title: "Peraturan Pemerintah No. 61 Tahun 2010",
    subtitle: "Pelaksanaan Undang-Undang Keterbukaan Informasi Publik",
    url: "https://jdih.setkab.go.id/PUUdoc/17154/PP0612010.pdf",
    description: "Peraturan pemerintah yang mengatur mekanisme pelaksanaan UU KIP, kewajiban Badan Publik, tata cara pengajuan keberatan, dan pembentukan Komisi Informasi."
  },
  {
    id: "perma-2-2011",
    title: "PERMA No. 2 Tahun 2011",
    subtitle: "Tata Cara Penyelesaian Sengketa Informasi Publik di Pengadilan",
    url: "https://mahkamahagung.go.id/media/1324",
    description: "Peraturan Mahkamah Agung yang menetapkan prosedur litigasi penyelesaian sengketa informasi publik di tingkat Pengadilan Agama atau Pengadilan Negeri setelah proses di Komisi Informasi."
  },
  {
    id: "perki-1-2013",
    title: "PERKI No. 1 Tahun 2013",
    subtitle: "Prosedur Penyelesaian Sengketa Informasi Publik",
    url: "https://komisiinformasi.go.id/regulasi/view/perki-no-1-tahun-2013",
    description: "Peraturan Komisi Informasi mengenai prosedur, administrasi, dan tata cara sidang penyelesaian sengketa informasi publik di Komisi Informasi."
  },
  {
    id: "perki-1-2021",
    title: "PERKI No. 1 Tahun 2021",
    subtitle: "Standar Layanan Informasi Publik",
    url: "https://komisiinformasi.go.id/regulasi/view/perki-no-1-tahun-2021",
    description: "Peraturan Komisi Informasi yang menggantikan standar lama untuk mengoptimalkan layanan informasi secara digital, klasifikasi informasi, serta akomodasi aksesibilitas bagi disabilitas."
  },
  {
    id: "sk-kma-2-144-2022",
    title: "SK KMA No. 2-144/KMA/SK/VIII/2022",
    subtitle: "Standar Pelayanan Informasi Publik di Pengadilan",
    url: "https://ppid.mahkamahagung.go.id/regulasi/sk-kma-2-144-2022",
    description: "Surat Keputusan Ketua Mahkamah Agung RI yang menjadi pedoman operasional utama bagi seluruh jajaran pengadilan dalam menyelenggarakan keterbukaan informasi di lingkungan Mahkamah Agung dan badan peradilan di bawahnya."
  }
];

export const INFORMASI_BERKALA: InfoItem[] = [
  // Profil pengadilan
  {
    id: "berkala-1",
    title: "Visi dan Misi Pengadilan Agama Blitar",
    category: "Profil Pengadilan",
    content: "Visi:\nTerwujudnya Pengadilan Agama Blitar yang Agung\n\nMisi:\n1. Menjaga kemandirian Pengadilan Agama Blitar\n2. Memberikan pelayanan hukum yang berkeadilan kepada pencari keadilan\n3. Meningkatkan kualitas kepemimpinan di Pengadilan Agama Blitar\n4. Meningkatkan kredibilitas dan transparansi di Pengadilan Agama Blitar"
  },
  {
    id: "berkala-2",
    title: "Wilayah Yuridiksi Pengadilan Agama Blitar",
    category: "Profil Pengadilan",
    content: "Wilayah Hukum (Yuridiksi) Pengadilan Agama Blitar meliputi seluruh daerah administratif Kabupaten Blitar dan Kota Blitar, terdiri atas 22 Kecamatan di Kabupaten dan 3 Kecamatan di Kota Blitar, melayani jutaan masyarakat pencari keadilan secara adil dan prima."
  },
  {
    id: "berkala-3",
    title: "Sejarah Pengadilan Agama Blitar",
    category: "Profil Pengadilan",
    content: "Pengadilan Agama Blitar dibentuk berdasarkan sejarah panjang peradilan agama di Indonesia. Sejak masa kolonial hingga dikeluarkannya UU No. 7 Tahun 1989 tentang Peradilan Agama, institusi ini terus bertransformasi menuju lembaga peradilan yang modern, kredibel, transparan, dan berorientasi pada pelayanan masyarakat secara prima."
  },
  {
    id: "berkala-4",
    title: "Struktur Organisasi Pengadilan Agama Blitar",
    category: "Profil Pengadilan",
    content: "Struktur organisasi Pengadilan Agama Blitar dipimpin oleh Ketua Pengadilan Agama Blitar, dibantu Wakil Ketua, Panitera (membawahi kelompok fungsional kepaniteraan: Jurusita, Panitera Muda Permohonan, Gugatan, Hukum), serta Sekretaris (membawahi Subbagian Perencanaan, TI, Pelaporan, Kepegawaian, Organisasi, Tatalaksana, Umum dan Keuangan)."
  },
  {
    id: "berkala-5",
    title: "Profil Pejabat Struktural Pengadilan Agama Blitar",
    category: "Profil Pengadilan",
    content: "Daftar Pejabat Struktural Pengadilan Agama Blitar saat ini dipimpin oleh Ketua, Wakil Ketua, Panitera, Sekretaris, jajaran Panitera Muda (Gugatan, Permohonan, Hukum) serta jajaran Kepala Subbagian (Umum Keuangan, Kepegawaian Ortala, Perencanaan TI Pelaporan). Seluruh pejabat memiliki rekam jejak profesional dan LHKPN yang dilaporkan secara berkala."
  },
  {
    id: "berkala-6",
    title: "Brosur Elektronik Layanan Beracara di Pengadilan Agama Blitar",
    category: "Profil Pengadilan",
    content: "Brosur elektronik memuat informasi lengkap tentang tata cara pendaftaran perkara, e-Court, syarat gugatan cerai, gugatan waris, permohonan dispensasi kawin, prosedur bantuan hukum (POSBAKUM), panjar biaya perkara, hingga tata cara pengambilan produk pengadilan (Akta Cerai dan Salinan Putusan)."
  },
  // Program strategis
  {
    id: "berkala-7",
    title: "Daftar Pejabat Struktural",
    category: "Ringkasan Informasi Program Strategis",
    content: "Daftar lengkap pejabat struktural penanggung jawab program strategis seperti peningkatan pelayanan peradilan (e-Court, Gugatan Mandiri, inovasi Jamu Seger, PTSP Keliling) beserta rincian indikator kinerja utama masing-masing bidang kerja."
  },
  // Kinerja
  {
    id: "berkala-8",
    title: "Informasi Tentang Kinerja di Pengadilan Agama Blitar",
    category: "Ringkasan Informasi Kinerja",
    content: "Laporan Akuntabilitas Kinerja Instansi Pemerintah (LKjIP) Pengadilan Agama Blitar secara berkala menyajikan capaian Indikator Kinerja Utama (IKU), penyelesaian perkara (di atas 95% per tahun), implementasi e-court, realisasi mediasi berhasil, pelaksanaan sidang di luar gedung, serta penyerapan anggaran operasional dan non-operasional."
  },
  // Laporan keuangan
  {
    id: "berkala-9",
    title: "Realisasi Anggaran Pengadilan Agama Blitar",
    category: "Laporan Keuangan",
    content: "Laporan Realisasi Anggaran (DIPA 01 dan DIPA 04) Pengadilan Agama Blitar diumumkan secara transparan setiap triwulan dan tahunan, mencakup realisasi Belanja Pegawai, Belanja Barang, Belanja Modal, serta anggaran layanan hukum kedinasan seperti Sidang Keliling, Posbakum, dan Pembebasan Biaya Perkara (Prodeo)."
  },
  // Ringkasan laporan akses informasi
  {
    id: "berkala-10",
    title: "Laporan Jumlah Permintaan Informasi Publik",
    category: "Ringkasan Laporan Akses Informasi Publik",
    content: "Menyajikan statistik akumulasi jumlah permohonan informasi publik yang diterima PPID Pengadilan Agama Blitar dalam setahun terakhir. Sebagian besar permohonan berkisar tentang jadwal persidangan, statistik perkara, tata cara e-Court, dan layanan bantuan hukum."
  },
  {
    id: "berkala-11",
    title: "Laporan Waktu Permintaan Informasi Publik",
    category: "Ringkasan Laporan Akses Informasi Publik",
    content: "Ringkasan rata-rata waktu yang dibutuhkan untuk merespons dan menyelesaikan permohonan informasi publik. Sesuai SK KMA 2-144 Tahun 2022, rata-rata penyelesaian dilakukan dalam waktu kurang dari 1-3 hari kerja, jauh di bawah batas maksimal regulasi (10+7 hari kerja)."
  },
  {
    id: "berkala-12",
    title: "Laporan Jumlah Permintaan Informasi Publik Dikabulkan",
    category: "Ringkasan Laporan Akses Informasi Publik",
    content: "Persentase permohonan informasi publik yang dikabulkan oleh PPID Pengadilan Agama Blitar mencapai 98%. Informasi diberikan secara gratis dalam bentuk cetak/salinan dokumen digital sesuai dengan ketentuan yang berlaku."
  },
  {
    id: "berkala-13",
    title: "Laporan Penolakan Informasi Publik",
    category: "Ringkasan Laporan Akses Informasi Publik",
    content: "Daftar permohonan informasi publik yang ditolak beserta alasannya. Penolakan umumnya dikarenakan informasi yang diminta masuk dalam kategori Informasi yang Dikecualikan (seperti rahasia proses musyawarah majelis hakim, identitas saksi perkara tertentu, atau dokumen internal yang belum menjadi keputusan akhir)."
  },
  {
    id: "berkala-14",
    title: "Daftar/Penetapan Informasi yang Dikecualikan",
    category: "Ringkasan Laporan Akses Informasi Publik",
    content: "Surat Keputusan PPID Pengadilan Agama Blitar tentang daftar informasi publik yang dikecualikan di lingkungan Pengadilan Agama Blitar berdasarkan Uji Konsekuensi yang ketat sesuai dengan Pasal 17 UU No. 14 Tahun 2008 tentang Keterbukaan Informasi Publik."
  },
  // Kebijakan
  {
    id: "berkala-15",
    title: "Informasi Tentang Peraturan, Keputusan, dan/ atau Kebijakan yang Mengikat dan/ atau Berdampak bagi Publik",
    category: "Peraturan & Kebijakan Mengikat",
    content: "Dokumen kompilasi SK Ketua PA Blitar, kebijakan jam operasional selama ramadhan, alur pelayanan prioritas bagi penyandang disabilitas dan lansia, tata tertib persidangan, serta syarat protokol kesehatan demi keamanan publik di lingkungan gedung pengadilan."
  },
  // Prosedur
  {
    id: "berkala-16",
    title: "Prosedur Memperoleh Informasi Publik",
    category: "Prosedur Layanan",
    content: "Tata cara lengkap bagi pemohon informasi untuk mengajukan permohonan informasi publik, baik secara langsung di meja informasi, tertulis melalui surat/email, maupun secara online melalui situs resmi e-PPID Pengadilan Agama Blitar."
  },
  // Pengaduan
  {
    id: "berkala-17",
    title: "Informasi tentang Tata Cara Pengaduan Penyalahgunaan Wewenang atau Pelanggaran oleh Pengadilan",
    category: "Tata Cara Pengaduan",
    content: "Prosedur pengaduan masyarakat atas adanya pelanggaran disiplin, kode etik hakim/aparatur, atau penyalahgunaan wewenang melalui aplikasi SIWAS (Sistem Informasi Pengawasan) Mahkamah Agung RI, meja pengaduan PA Blitar, atau secara tertulis kepada Badan Pengawasan MA RI."
  },
  // Profil singkat hakim & aparatur
  {
    id: "berkala-18",
    title: "Pejabat Struktural",
    category: "Profil Hakim dan Aparatur",
    content: "Profil singkat, riwayat pendidikan, kepangkatan, dan sertifikasi jajaran struktural kesekretariatan dan kepaniteraan Pengadilan Agama Blitar yang selalu siap melayani dengan profesionalisme tinggi."
  },
  {
    id: "berkala-19",
    title: "Profil Hakim",
    category: "Profil Hakim dan Aparatur",
    content: "Kompilasi profil, riwayat karir mutasi, latar belakang akademis, serta SK Kepangkatan Majelis Hakim yang bertugas memeriksa dan mengadili perkara di Pengadilan Agama Blitar."
  },
  {
    id: "berkala-20",
    title: "Profil Kepaniteraan",
    category: "Profil Hakim dan Aparatur",
    content: "Daftar profil Panitera, Panitera Muda, Panitera Pengganti, dan Jurusita/Jurusita Pengganti yang bertanggung jawab atas pengelolaan berkas perkara, administrasi persidangan, serta kejurusitaan di Pengadilan Agama Blitar."
  },
  {
    id: "berkala-21",
    title: "Profil Kesekretariatan",
    category: "Profil Hakim dan Aparatur",
    content: "Profil jajaran Sekretaris, Kepala Subbagian, staf pelaksana, dan pranata komputer yang mendukung keandalan operasional, manajemen keuangan negara, TI, dan sarana prasarana penunjang kenyamanan pengunjung sidang."
  },
  {
    id: "berkala-22",
    title: "Profil Pejabat Fungsional dan Pelaksana",
    category: "Profil Hakim dan Aparatur",
    content: "Daftar profil jabatan fungsional seperti Analis Pengelolaan Keuangan APBN, Arsiparis, Pranata Hubungan Masyarakat, serta staf pelaksana teknis operasional Pengadilan Agama Blitar."
  }
];

export const INFORMASI_SERTA_MERTA = [
  {
    id: "sertamerta-1",
    title: "Informasi rencana pemeliharaan dan/atau gangguan sarana dan prasarana utilitas publik",
    description: "Pengumuman pemeliharaan server lokal e-Court, gangguan pasokan listrik gedung, atau jadwal pembersihan berkala area sterilisasi ruang sidang."
  },
  {
    id: "sertamerta-2",
    title: "Informasi gangguan keamanan yang sedang terjadi",
    description: "Pengumuman darurat kebakaran, simulasi evakuasi gempa bumi, atau penanganan keamanan khusus demi ketertiban pengunjung sidang di area Pengadilan."
  },
  {
    id: "sertamerta-3",
    title: "Informasi tentang persebaran dan sumber penyakit yang berpotensi menular",
    description: "Protokol kesehatan darurat, sterilisasi fogging berkala pencegahan demam berdarah di area kantor, atau pembatasan kuota ruang tunggu demi kenyamanan bersama."
  }
];

export const INFORMASI_SETIAP_SAAT = [
  {
    id: "saat-1",
    title: "Daftar Informasi Publik (DIP)",
    description: "Daftar yang memuat ringkasan seluruh informasi yang berada di bawah penguasaan Pengadilan Agama Blitar, tidak termasuk informasi yang dikecualikan."
  },
  {
    id: "saat-2",
    title: "Rencana Strategis (RENSTRA) & Rencana Kerja (RENJA)",
    description: "Dokumen perencanaan jangka menengah (5 tahun) dan jangka pendek (1 tahun) berisi visi, misi, sasaran strategis, serta indikator pencapaian kinerja."
  },
  {
    id: "saat-3",
    title: "DIPA (Daftar Isian Pelaksanaan Anggaran)",
    description: "Rincian dokumen anggaran belanja yang disetujui oleh Kementerian Keuangan untuk menunjang seluruh fungsi peradilan dan operasional kantor."
  },
  {
    id: "saat-4",
    title: "Rencana Kerja & Anggaran Kementerian/Lembaga (RKA-KL)",
    description: "Dokumen usulan dan penjabaran anggaran program prioritas PA Blitar kepada Mahkamah Agung RI untuk diajukan dalam APBN."
  },
  {
    id: "saat-5",
    title: "Laporan Akuntabilitas Kinerja Instansi Pemerintah (LKjIP)",
    description: "Bentuk pertanggungjawaban tertulis atas pencapaian indikator kinerja utama target perkara, mediasi, kepuasan masyarakat, dan efisiensi birokrasi."
  },
  {
    id: "saat-6",
    title: "Perjanjian Kinerja Tahunan",
    description: "Lembar komitmen jajaran pimpinan dan kepala bagian untuk mencapai target kinerja yang telah ditetapkan dalam satu tahun anggaran."
  },
  {
    id: "saat-7",
    title: "Daftar Inventaris Sarana dan Prasarana (Aset Kantor)",
    description: "Kompilasi aset negara (BMN) berupa kendaraan dinas, komputer, ruang sidang, dan gedung kantor yang diatur secara transparan."
  },
  {
    id: "saat-8",
    title: "Laporan Tahunan Pelayanan Informasi Publik (PPID)",
    description: "Kompilasi tahunan yang merinci jumlah layanan informasi, kendala teknis, inovasi layanan, serta rencana pemutakhiran standar pelayanan di tahun berikutnya."
  }
];

export const YOUTUBE_VIDEO_IDS = [
  {
    id: "vid-1",
    title: "Profil Pengadilan Agama Blitar",
    youtubeId: "JMq2DfyzywY", // Updated to official PA Blitar video ID
    description: "Video pengenalan profil, fasilitas pelayanan terpadu satu pintu (PTSP), dan inovasi kemudahan pelayanan publik di PA Blitar."
  },
  {
    id: "vid-2",
    title: "Tutorial Layanan e-PPID Pengadilan Agama Blitar",
    youtubeId: "8gOclR7oV94",
    description: "Langkah-langkah mengajukan permohonan informasi publik secara daring melalui portal e-PPID yang cepat dan transparan."
  }
];

export const BIAYA_LAYANAN_NOTE = `Keterangan:
1. Biaya perolehan informasi dibebankan kepada Pemohon.
2. Biaya perolehan informasi sebagaimana dimaksud terdiri atas biaya penggandaan (misalnya fotokopi) informasi yang dimohonkan serta biaya transportasi untuk melakukan penggandaan tersebut.
3. Biaya penggandaan sebagaimana dimaksud adalah biaya riil yang ditetapkan oleh penyedia jasa pelayanan penggandaan.
4. Atasan PPID menetapkan biaya riil transportasi untuk melakukan penggandaan informasi sebagaimana dimaksud dengan memperhatikan kondisi wilayah, dalam hal biaya tersebut diperlukan (misalnya lokasi penyedia jasa pelayanan penggandaan jauh dari Pengadilan).
5. Terhadap permohonan informasi mengenai penggandaan putusan atau penetapan tidak dikenakan biaya leges karena yang dapat diberikan kepada pemohon bukan merupakan salinan resmi.`;

export const REPORT_STATISTICS: ReportItem[] = [
  { year: "2021", totalRequests: 84, approved: 81, rejected: 3, pending: 0, avgTimeDays: 2.1 },
  { year: "2022", totalRequests: 112, approved: 109, rejected: 3, pending: 0, avgTimeDays: 1.8 },
  { year: "2023", totalRequests: 145, approved: 142, rejected: 2, pending: 1, avgTimeDays: 1.4 },
  { year: "2024", totalRequests: 189, approved: 185, rejected: 4, pending: 0, avgTimeDays: 1.1 },
  { year: "2025", totalRequests: 232, approved: 228, rejected: 3, pending: 1, avgTimeDays: 0.9 },
];
