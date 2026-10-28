import {
  JournalProject,
  JournalPage,
  TemplateType,
  PageContent,
  CoverContent,
  PersonalInfoContent,
  DailyContent,
  WeeklyContent,
  MonthlyContent,
  MoodContent,
  GratitudeContent,
  HabitContent,
  GoalContent,
  FinanceContent,
  StudyWorkContent,
  FreeWritingContent,
  ClosingContent,
} from '../types/journal';
import { THEME_PRESETS } from './themePresets';

export function createDefaultPageContent(type: TemplateType, title?: string): { title: string; content: PageContent } {
  switch (type) {
    case 'cover': {
      const content: CoverContent = {
        title: title && title !== 'Sampul Depan' ? title : 'JURNAL KESEHARIAN 2026',
        subtitle: 'Ruang Refleksi, Rencana, & Pertumbuhan Diri',
        ownerName: 'Fatimah Az-Zahra',
        yearRange: '2026 — 2027',
        frameStyle: 'botanical-crest',
        dedication: 'Ditulis dengan kesadaran penuh, kehangatan hati, dan harapan baik.',
      };
      return { title: 'Sampul Depan', content };
    }

    case 'personal_info': {
      const content: PersonalInfoContent = {
        ownerName: 'Fatimah Az-Zahra',
        emailPhone: 'fatimah.journal@example.com',
        purpose: 'Mencatat perjalanan belajar, merawat ketenangan batin, dan mewujudkan impian.',
        openingNote: 'Jurnal ini adalah cerminan pikiran, ruang aman untuk menuangkan asa, dan saksi dari setiap langkah kecil yang bermakna.',
        contactEmergency: 'Hubungi jika jurnal ini tertinggal: +62 812-3456-7890',
        favoriteQuote: '“Ketenangan bukanlah ketiadaan badai, melainkan kedamaian di tengah badai.”',
      };
      return { title: 'Informasi Pribadi', content };
    }

    case 'daily': {
      const content: DailyContent = {
        date: '2026-10-28',
        dayOfWeek: 'Rabu',
        todayFocus: 'Fokus mendalam pada desain produk dan menjaga ritme kerja yang tenang.',
        priorities: [
          'Selesaikan arsitektur fitur Pattern Journal Studio',
          'Sesi mindful reading 30 menit di sore hari',
          'Jalan santai dan istirahat mata tanpa layar',
        ],
        todos: [
          { id: 'd1', text: 'Tinjau palette warna sage dan lavender', completed: true },
          { id: 'd2', text: 'Uji responsivitas layout mobile dan desktop', completed: true },
          { id: 'd3', text: 'Periksa ekspor PDF dan format margin cetak', completed: false },
          { id: 'd4', text: 'Minum 2 liter air mineral hangat', completed: true },
        ],
        schedule: [
          { time: '07:00 - 08:30', activity: 'Sarapan hangat, teh melati & journaling pagi' },
          { time: '09:00 - 12:00', activity: 'Deep work: Desain UI komponen & template jurnal' },
          { time: '13:00 - 14:00', activity: 'Makan siang bergizi & istirahat peregangan' },
          { time: '14:30 - 17:00', activity: 'Pengembangan fitur kustomisasi pattern upload' },
          { time: '19:30 - 21:00', activity: 'Refleksi harian & membaca buku inspirasi' },
        ],
        freeNotes:
          'Hari ini terasa sangat produktif namun tetap tenang. Menikmati proses merancang setiap detail pola dan tipografi jurnal.',
        gratitude: [
          'Secangkir teh hangat yang menenangkan di pagi hari',
          'Dukungan dan apresiasi dari orang-orang terdekat',
          'Kesehatan dan energi jernih untuk berkarya hari ini',
        ],
        eveningReflection:
          'Semua target utama berjalan lancar. Besok ingin mempertahankan batasan waktu layar di malam hari.',
        energyRating: 4,
        productivityRating: 5,
      };
      return { title: 'Catatan Harian', content };
    }

    case 'weekly': {
      const content: WeeklyContent = {
        weekRange: '26 Okt - 01 Nov 2026 (Minggu ke-44)',
        weeklyPriority: 'Keseimbangan antara ritme kerja intensif dan pemulihan energi batin',
        targets: [
          'Merampungkan prototipe digital planner',
          'Olahraga ringan 4x seminggu minimal 25 menit',
          'Membaca 2 bab buku non-fiksi',
          'Mengatur kembali meja kerja agar bersih dan nyaman',
        ],
        days: [
          { dayName: 'Senin', dateStr: '26 Okt', tasks: ['Perencanaan mingguan', 'Tinjau backlog fitur'] },
          { dayName: 'Selasa', dateStr: '27 Okt', tasks: ['Desain komponen kartu', 'Studi palet warna'] },
          { dayName: 'Rabu', dateStr: '28 Okt', tasks: ['Implementasi pattern engine', 'Testing interaktif'] },
          { dayName: 'Kamis', dateStr: '29 Okt', tasks: ['Pengujian ekspor PDF', 'Verifikasi print preview'] },
          { dayName: 'Jumat', dateStr: '30 Okt', tasks: ['Refleksi akhir pekan kerja', 'Backup data proyek'] },
          { dayName: 'Sabtu', dateStr: '31 Okt', tasks: ['Piknik santai & belanja bahan segar', 'Seni sketsa'] },
          { dayName: 'Minggu', dateStr: '01 Nov', tasks: ['Istirahat penuh', 'Persiapan agenda pekan depan'] },
        ],
        reflection: {
          whatWorked: 'Metode time-blocking terbukti membantu menyelesaikan tugas tanpa rasa terburu-buru.',
          whatToImprove: 'Jangan menunda peregangan fisik setelah dua jam mengetik di depan laptop.',
        },
      };
      return { title: 'Rencana Mingguan', content };
    }

    case 'monthly': {
      const content: MonthlyContent = {
        monthName: 'Oktober',
        year: '2026',
        goals: [
          { id: 'mg1', goal: 'Meluncurkan koleksi template jurnal pertama', done: true },
          { id: 'mg2', goal: 'Membangun rutinitas tidur teratur sebelum pukul 23:00', done: true },
          { id: 'mg3', goal: 'Menabung 25% dari pendapatan proyek bulanan', done: false },
          { id: 'mg4', goal: 'Menyelesaikan 1 buku bacaan pengembangan diri', done: true },
        ],
        agenda: [
          { id: 'ma1', date: '05 Okt', event: 'Perencanaan konsep desain stationery' },
          { id: 'ma2', date: '15 Okt', event: 'Tinjau kebutuhan pengguna & feedback' },
          { id: 'ma3', date: '28 Okt', event: 'Uji coba build Pattern Journal Studio' },
          { id: 'ma4', date: '31 Okt', event: 'Refleksi bulanan & penutupan anggaran' },
        ],
        keyProjects: ['Pattern Journal Studio App', 'Koleksi Seni Digital Botanical', 'Dekorasi Meja Kerja Cozy'],
        habitsSummary: 'Tingkat konsistensi kebiasaan bulan ini mencapai 84% dengan peningkatan pada waktu istirahat.',
        reflection:
          'Bulan Oktober adalah bulan yang dipenuhi rasa syukur dan pencapaian. Banyak ide yang akhirnya berhasil diwujudkan.',
        lessonsLearned: 'Kecepatan bukanlah segalanya; konsistensi dalam langkah-langkah kecil menghasilkan karya yang jauh lebih abadi.',
      };
      return { title: 'Perencana Bulanan', content };
    }

    case 'mood': {
      const content: MoodContent = {
        date: '2026-10-28',
        selectedMood: 'peaceful',
        emotionalIntensity: 8,
        triggers: 'Suasana ruangan yang sejuk, wangi lilin aromaterapi, dan aliran musik klasik yang menenangkan.',
        feelingsText:
          'Merasa sangat damai dan selaras dengan diri sendiri. Tidak ada kecemasan berlebih mengenai hari esok.',
        currentNeeds: 'Menjaga ruang hening sejenak sebelum tidur dan menikmati minuman hangat.',
        helpfulActions: 'Menulis jurnal, menyalakan diffuser minyak lavender, dan mematikan notifikasi media sosial.',
      };
      return { title: 'Jurnal Suasana Hati', content };
    }

    case 'gratitude': {
      const content: GratitudeContent = {
        date: '2026-10-28',
        threeGratefulThings: [
          'Pagi hari yang cerah dengan hembusan angin segar dari jendela kamar.',
          'Kemampuan untuk terus belajar teknologi baru dan merancang aplikasi yang bermanfaat.',
          'Keluarga yang selalu memberikan dukungan hangat tanpa syarat.',
        ],
        tinyJoyfulMoment: 'Melihat tanaman sukulen di sudut meja tumbuh tunas hijau kecil yang baru.',
        meaningfulPerson: 'Ibu — yang selalu mengingatkan pentingnya bersyukur dan tidak lupa beristirahat.',
        deepReflection:
          'Ketika kita melatih pikiran untuk menyadari kebaikan-kebaikan kecil, hidup seketika terasa begitu berkelimpahan.',
      };
      return { title: 'Jurnal Rasa Syukur', content };
    }

    case 'habit': {
      const content: HabitContent = {
        period: 'weekly',
        monthYear: 'Oktober 2026',
        habits: [
          {
            id: 'h1',
            name: 'Minum 2 Liter Air Putih',
            category: 'Kesehatan',
            targetPerWeek: 7,
            history: [true, true, true, true, true, false, false],
          },
          {
            id: 'h2',
            name: 'Membaca Buku 20 Menit',
            category: 'Mindset',
            targetPerWeek: 5,
            history: [true, true, false, true, true, false, false],
          },
          {
            id: 'h3',
            name: 'Journaling & Refleksi Harian',
            category: 'Kesehatan Mental',
            targetPerWeek: 7,
            history: [true, true, true, true, false, false, false],
          },
          {
            id: 'h4',
            name: 'Peregangan Tubuh / Yoga Ringan',
            category: 'Kebugaran',
            targetPerWeek: 4,
            history: [true, false, true, true, false, false, false],
          },
          {
            id: 'h5',
            name: 'Tidur Sebelum Pukul 23:00',
            category: 'Pemulihan',
            targetPerWeek: 5,
            history: [false, true, true, true, false, false, false],
          },
        ],
        notes:
          'Fokus pada progres bertahap yang ramah pada diri sendiri, bukan kesempurnaan tanpa cela. Setiap centang adalah hadiah untuk tubuh.',
      };
      return { title: 'Pelacak Kebiasaan', content };
    }

    case 'goals': {
      const content: GoalContent = {
        theme: 'Tujuan Berkarya & Pertumbuhan Pribadi',
        goals: [
          {
            id: 'g1',
            title: 'Membangun Koleksi Produk Digital Jurnal Berkualitas Tinggi',
            type: 'short-term',
            whyItMatters: 'Memberikan alat bantu yang indah bagi banyak orang untuk menemukan ketenangan dan keteraturan.',
            targetDate: '15 Desember 2026',
            progressPercent: 75,
            actionSteps: [
              { id: 'as1', step: 'Rancang 10 pattern motif khas digital stationery', deadline: '30 Okt', completed: true },
              { id: 'as2', step: 'Sediakan 13 template halaman fungsional', deadline: '05 Nov', completed: true },
              { id: 'as3', step: 'Uji kemampuan ekspor PDF resolusi tinggi', deadline: '15 Nov', completed: false },
              { id: 'as4', step: 'Siapkan panduan onboarding pengguna baru', deadline: '20 Nov', completed: false },
            ],
            obstacles: 'Keterbatasan waktu membagi jadwal antara proyek utama dan pengembangan fitur.',
            adjustments: 'Fokus pada penyelesaian fitur inti yang solid sebelum menambahkan fitur sekunder.',
          },
          {
            id: 'g2',
            title: 'Meningkatkan Kesejahteraan Mental Melalui Rutinitas Hening',
            type: 'long-term',
            whyItMatters: 'Menjaga energi agar tetap jernih dan terhindar dari kelelahan mental (burnout).',
            targetDate: '31 Maret 2027',
            progressPercent: 60,
            actionSteps: [
              { id: 'as5', step: 'Dedikasikan 1 hari di akhir pekan tanpa laptop', deadline: 'Mingguan', completed: true },
              { id: 'as6', step: 'Lakukan jalan santai di taman kota seminggu sekali', deadline: 'Mingguan', completed: false },
            ],
            obstacles: 'Tergoda membuka pesan dan email pekerjaan di akhir pekan.',
            adjustments: 'Matikan notifikasi email otomatis mulai Jumat sore.',
          },
        ],
      };
      return { title: 'Penetapan Tujuan', content };
    }

    case 'finance': {
      const content: FinanceContent = {
        period: 'Oktober 2026',
        monthlyBudget: 8500000,
        savingsTarget: 2500000,
        transactions: [
          { id: 'f1', date: '01 Okt', description: 'Gaji & Hasil Proyek Kreatif', category: 'income', amount: 12500000, type: 'income' },
          { id: 'f2', date: '03 Okt', description: 'Belanja Bahan Makanan Sehat', category: 'food', amount: 1250000, type: 'expense' },
          { id: 'f3', date: '05 Okt', description: 'Langganan Software & Cloud Tools', category: 'bills', amount: 350000, type: 'expense' },
          { id: 'f4', date: '10 Okt', description: 'Buku Desain & Referensi Typografi', category: 'study', amount: 280000, type: 'expense' },
          { id: 'f5', date: '15 Okt', description: 'Alokasi Tabungan Darurat & Investasi', category: 'savings', amount: 3000000, type: 'expense' },
          { id: 'f6', date: '20 Okt', description: 'Ngopi di Kafe Cozy & Teh Herbal', category: 'leisure', amount: 175000, type: 'expense' },
        ],
        notes: 'Keuangan bulan ini terkontrol dengan baik. Alokasi tabungan sudah melampaui target minimum sebesar 500.000.',
      };
      return { title: 'Jurnal Keuangan', content };
    }

    case 'study_work': {
      const content: StudyWorkContent = {
        date: '2026-10-28',
        projectOrSubject: 'Desain Pengalaman Pengguna (UX) Digital Stationery',
        tasks: [
          { id: 'sw1', task: 'Riset komposisi grid dua kolom untuk jurnal cetak A4 dan A5', priority: 'high', done: true },
          { id: 'sw2', task: 'Implementasi kontrol penyesuaian skala motif pola (pattern tiling)', priority: 'high', done: true },
          { id: 'sw3', task: 'Uji tingkat kontras teks terhadap latar motif dengan kartu pelindung', priority: 'medium', done: true },
          { id: 'sw4', task: 'Dokumentasikan panduan integrasi JSON backup', priority: 'low', done: false },
        ],
        deadlines: 'Fitur Utama Siap: 31 Oktober 2026',
        pomodoroHours: 4.5,
        meetingNotes:
          'Catatan Diskusi Desain: Pastikan teks tetap 100% terbaca dengan memberikan opsi panel latar solid atau semi-transparan di belakang teks.',
        evaluation:
          'Aliran kerja sangat terfokus. Modul komponen terpisah membuat kode mudah dirawat dan diperluas.',
      };
      return { title: 'Studi & Pekerjaan', content };
    }

    case 'free_writing': {
      const content: FreeWritingContent = {
        title: 'Menciptakan Ruang Tenang di Tengah Hiruk-Pikuk',
        subtitle: 'Sebuah refleksi tentang ritme hidup, kesederhanaan, dan keindahan detail',
        body: `Di era di mana segala sesuatu bergerak dengan kecepatan kilat, menyisihkan waktu untuk menulis di atas jurnal adalah bentuk keberanian tersendiri. Ini adalah tindakan memperlambat ritme, menarik napas panjang, dan mendengarkan apa yang sebenarnya sedang berkecamuk di dalam batin.

Ketika kita memilih motif pola yang menenangkan—seperti helaian daun sage atau kehangatan kain gingham—secara tak sadar kita sedang menciptakan atmosfer tempat perlindungan (sanctuary). Tempat di mana tidak ada penilaian, tidak ada tenggat waktu yang menghakimi, melainkan hanya hubungan jujur antara pena, kertas, dan pikiran.

Setiap lembaran baru bukanlah beban untuk dipenuhi, melainkan undangan ramah untuk beristirahat. Melalui tulisan-tulisan ini, kita belajar bahwa kebahagiaan sejati sering kali bersembunyi dalam kesederhanaan hari-hari biasa.`,
        quote: '“Tersenyumlah pada hal-hal kecil yang sering luput dari perhatian; di sanalah ketenangan sejati bersarang.”',
        quoteAuthor: 'Catatan Penulis',
        bullets: [
          'Kurangi distraksi digital setidaknya satu jam sebelum tidur',
          'Sediakan sudut khusus di rumah yang hanya digunakan untuk membaca dan merenung',
          'Tuliskan hal-hal yang membuat hati terasa hangat setiap malam',
        ],
        checklist: [
          { id: 'fw1', text: 'Menyeduh chamomile tea tanpa gula', done: true },
          { id: 'fw2', text: 'Memutar musik lofi atau suara hujan rintik-rintik', done: true },
          { id: 'fw3', text: 'Menikmati sepuluh menit hening tanpa layar gawai', done: false },
        ],
      };
      return { title: 'Tulisan Bebas', content };
    }

    case 'closing': {
      const content: ClosingContent = {
        period: 'Refleksi Akhir Tahun & Penutup Jurnal',
        biggestWins: [
          'Berhasil menjaga kebiasaan journaling secara konsisten sepanjang musim',
          'Merampungkan proyek digital stationery dengan estetika editorial yang matang',
          'Mampu mengenali batasan diri dan lebih berani mengatakan tidak pada hal yang membebani',
        ],
        lessonsLearned: [
          'Proses yang dilakukan dengan ketulusan selalu membuahkan kepuasan batin yang mendalam',
          'Kerapian ruang fisik berpengaruh langsung pada kejernihan pikiran',
          'Tidak apa-apa jika ada hari-hari di mana kita hanya mampu melakukan hal minimum',
        ],
        letterToSelf:
          'Kepada diriku di masa depan: Terima kasih telah berjuang dengan anggun. Ingatlah selalu bahwa langkahmu tidak perlu terburu-buru untuk menjadi berarti. Tetaplah lembut, tetaplah penasaran, dan rawatlah rasa syukur di setiap detik nafasmu.',
        growthIntentions:
          'Di musim berikutnya, aku ingin lebih banyak menghabiskan waktu di alam terbuka, membaca lebih banyak buku klasik, dan terus melahirkan karya-karya yang membawa kedamaian bagi orang lain.',
        extraNotes: 'Simpan jurnal ini di tempat yang aman sebagai rekaman jejak perjalanan jiwamu yang berharga.',
      };
      return { title: 'Halaman Penutup', content };
    }
  }
}

export function createNewPage(type: TemplateType, customTitle?: string): JournalPage {
  const { title, content } = createDefaultPageContent(type, customTitle);
  return {
    id: `page_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    title: customTitle || title,
    templateType: type,
    date: new Date().toISOString().split('T')[0],
    content,
  };
}

export function createStarterJournal(): JournalProject {
  const defaultTheme = THEME_PRESETS[0]; // Sage Sanctuary
  const pages: JournalPage[] = [
    createNewPage('cover', 'Sampul Depan'),
    createNewPage('personal_info', 'Tentang Pemilik'),
    createNewPage('daily', 'Catatan Hari Ini'),
    createNewPage('weekly', 'Perencana Pekanan'),
    createNewPage('monthly', 'Agenda Bulanan'),
    createNewPage('mood', 'Kondisi Hati'),
    createNewPage('gratitude', 'Ungkapan Syukur'),
    createNewPage('habit', 'Pelacak Kebiasaan'),
    createNewPage('goals', 'Target & Impian'),
    createNewPage('finance', 'Arsip Keuangan'),
    createNewPage('study_work', 'Studi & Karya'),
    createNewPage('free_writing', 'Ruang Renung'),
    createNewPage('closing', 'Refleksi Penutup'),
  ];

  return {
    id: 'journal_starter_2026',
    title: 'Jurnal Keseharian & Refleksi 2026',
    subtitle: 'Koleksi Perencana Pribadi, Catatan Reflektif, & Desain Motif Sage',
    author: 'Fatimah Az-Zahra',
    yearRange: '2026 — 2027',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    paperSize: 'a4',
    orientation: 'portrait',
    theme: defaultTheme,
    globalPattern: {
      id: 'botanical-leaves',
      name: 'Botanical Leaves',
      type: 'svg',
      category: 'botanical',
      scale: 100,
      repeat: 'repeat',
      displayMode: 'tiling',
      opacity: 0.35,
      companionBgColor: '#F3F6F2',
      applyTo: 'all-pages',
      orientation: 0,
      overlayOpacity: 0.95,
      solidBackdrop: true,
    },
    pages,
  };
}

export function createWriterStarterJournal(): JournalProject {
  const vintageTheme = THEME_PRESETS[1]; // Vintage Rosewater
  const pages: JournalPage[] = [
    createNewPage('cover', 'Arsip Cerita & Gagasan'),
    createNewPage('personal_info', 'Manifesto Penulis'),
    createNewPage('free_writing', 'Gagasan Bab Pertama'),
    createNewPage('gratitude', 'Inspirasi & Syukur'),
    createNewPage('closing', 'Epilog Tahun Ini'),
  ];

  return {
    id: 'journal_writer_rose',
    title: 'Arsip Cerita & Esai Pilihan',
    subtitle: 'Catatan Kreatif, Aliran Pikiran Bebas, & Eksplorasi Bahasa',
    author: 'Fatimah Az-Zahra',
    yearRange: '2026',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    paperSize: 'a5',
    orientation: 'portrait',
    theme: vintageTheme,
    globalPattern: {
      id: 'tiny-floral',
      name: 'Tiny Floral',
      type: 'svg',
      category: 'floral',
      scale: 110,
      repeat: 'repeat',
      displayMode: 'tiling',
      opacity: 0.4,
      companionBgColor: '#FAF5F3',
      applyTo: 'all-pages',
      orientation: 0,
      overlayOpacity: 0.94,
      solidBackdrop: true,
    },
    pages,
  };
}
