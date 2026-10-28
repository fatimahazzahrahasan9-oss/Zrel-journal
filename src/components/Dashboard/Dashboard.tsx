import React, { useState } from 'react';
import { JournalProject, Language, TemplateType } from '../../types/journal';
import { BUILT_IN_PATTERNS } from '../../utils/builtInPatterns';
import { generatePatternCss } from '../../utils/builtInPatterns';
import {
  BookPlus,
  BookOpen,
  Edit,
  Sparkles,
  Search,
  Filter,
  Trash2,
  Copy,
  Download,
  Upload,
  Calendar,
  Layers,
  CheckCircle2,
  Clock,
  ArrowRight,
  Globe,
  Flame,
  Printer,
  Heart,
} from 'lucide-react';

interface DashboardProps {
  journals: JournalProject[];
  lang: Language;
  onSelectJournal: (id: string) => void;
  onOpenNewJournalModal: () => void;
  onOpenPatternStudio: () => void;
  onDuplicateJournal: (id: string) => void;
  onDeleteJournal: (id: string) => void;
  onExportAllJson: () => void;
  onImportJson: (jsonStr: string) => void;
  onToggleLang: () => void;
  onOpenQuickGuide: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  journals,
  lang,
  onSelectJournal,
  onOpenNewJournalModal,
  onOpenPatternStudio,
  onDuplicateJournal,
  onDeleteJournal,
  onExportAllJson,
  onImportJson,
  onToggleLang,
  onOpenQuickGuide,
}) => {
  const isId = lang === 'id';
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<'all' | 'recent'>('all');

  // Time-aware greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 11) return isId ? 'Selamat Pagi' : 'Good Morning';
    if (hour < 15) return isId ? 'Selamat Siang' : 'Good Afternoon';
    if (hour < 18) return isId ? 'Selamat Sore' : 'Good Evening';
    return isId ? 'Selamat Malam' : 'Good Night';
  };

  // Filter journals
  const filteredJournals = journals.filter((j) => {
    const matchesSearch =
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (j.author && j.author.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (j.subtitle && j.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  const mostRecentJournal = journals[0];

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        onImportJson(content);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C2926] flex flex-col justify-between">
      {/* Top Bar Header adhering strictly to Top Bar Contract */}
      <header className="h-16 bg-white border-b border-stone-200/80 px-3 sm:px-8 flex items-center justify-between gap-2 sm:gap-8 sticky top-0 z-20">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[#3C4F3F] text-white flex items-center justify-center font-serif-display font-bold text-sm shadow-xs">
            P
          </div>
          <span className="text-sm sm:text-lg font-serif-display font-bold tracking-tight text-stone-900 whitespace-nowrap">
            Pattern Journal<span className="hidden sm:inline"> Studio</span>
          </span>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-stone-600">
          <a
            href="#journals"
            className="hover:text-stone-900 transition-colors whitespace-nowrap"
          >
            {isId ? 'Koleksi Jurnal' : 'Journals'}
          </a>
          <button
            type="button"
            onClick={onOpenPatternStudio}
            className="hover:text-stone-900 transition-colors whitespace-nowrap flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{isId ? 'Studio Pola' : 'Pattern Studio'}</span>
          </button>
          <a
            href="#templates"
            className="hover:text-stone-900 transition-colors whitespace-nowrap"
          >
            {isId ? 'Katalog Template' : 'Templates'}
          </a>
          <button
            type="button"
            onClick={onOpenQuickGuide}
            className="hover:text-stone-900 transition-colors whitespace-nowrap"
          >
            {isId ? 'Panduan Pengguna' : 'Quick Guide'}
          </button>
        </nav>

        {/* Zone 3: Language & Primary CTA */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleLang}
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
            title="Ganti Bahasa / Toggle Language"
          >
            <Globe className="w-3.5 h-3.5 text-stone-500" />
            <span className="uppercase font-mono">{lang}</span>
          </button>

          <button
            type="button"
            onClick={onOpenNewJournalModal}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-xs font-bold text-white shadow-sm hover:opacity-95 transition-opacity whitespace-nowrap"
            style={{ backgroundColor: '#3C4F3F' }}
          >
            <BookPlus className="w-4 h-4" />
            <span>{isId ? 'Buat Jurnal' : 'New Journal'}</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-10">
        {/* Hero Section: Greeting & Spotlight on Continue Editing */}
        <section className="relative overflow-hidden rounded-2xl border border-stone-200 bg-white p-6 sm:p-10 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
            <div className="max-w-xl space-y-2">
              <span className="text-xs uppercase tracking-widest font-semibold text-stone-500 font-sans-clean block">
                {getGreeting()}, Fatimah
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif-display font-bold text-stone-900 tracking-tight">
                {isId
                  ? 'Ruang Kreatif Desain & Journaling Digital Anda'
                  : 'Your Bespoke Digital Journal & Pattern Design Studio'}
              </h1>
              <p className="text-sm font-serif-reading text-stone-600 leading-relaxed">
                {isId
                  ? 'Ciptakan jurnal bertema motif pola kustom, tulis catatan reflektif tanpa hambatan, dan ekspor ke format siap cetak berkualitas tinggi.'
                  : 'Design bespoke pattern-themed stationery journals, write mindful reflections, and export print-ready editions.'}
              </p>

              {/* Journaling Activity Summary Badges */}
              <div className="flex flex-wrap items-center gap-4 pt-3 text-xs text-stone-600 font-sans-clean">
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#3C4F3F]" />
                  <span>
                    <strong>{journals.length}</strong> {isId ? 'Jurnal Tersimpan' : 'Saved Journals'}
                  </span>
                </div>
                <span className="text-stone-300">·</span>
                <div className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[#5E7A63]" />
                  <span>
                    <strong>
                      {journals.reduce((acc, j) => acc + (j.pages?.length || 0), 0)}
                    </strong>{' '}
                    {isId ? 'Total Lembaran Halaman' : 'Total Pages'}
                  </span>
                </div>
                <span className="text-stone-300">·</span>
                <div className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-600" />
                  <span>
                    <strong>10</strong> {isId ? 'Motif Pola Bawaan' : 'Vector Motifs'}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action: Continue Editing Hero Card */}
            {mostRecentJournal && (
              <div className="w-full lg:max-w-sm rounded-xl border border-stone-200 bg-[#FAF7F2] p-5 flex flex-col justify-between space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b pb-2 border-stone-200/80">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 font-sans-clean">
                    {isId ? 'Lanjutkan Menulis' : 'Continue Writing'}
                  </span>
                  <span className="text-[10px] text-stone-400 font-mono">
                    {new Date(mostRecentJournal.updatedAt).toLocaleDateString()}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif-display font-bold text-lg text-stone-900 truncate">
                    {mostRecentJournal.title}
                  </h3>
                  <p className="text-xs font-serif-reading italic text-stone-500 line-clamp-1 mt-0.5">
                    {mostRecentJournal.subtitle || (isId ? 'Koleksi jurnal aktif' : 'Active journal')}
                  </p>
                  <span className="text-[11px] text-stone-500 block mt-2">
                    {mostRecentJournal.pages.length} {isId ? 'halaman terstruktur' : 'pages'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectJournal(mostRecentJournal.id)}
                    className="flex-1 py-2 px-3 rounded-lg text-xs font-bold text-white shadow-xs flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: mostRecentJournal.theme?.primaryColor || '#3C4F3F' }}
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>{isId ? 'Buka Editor' : 'Open Editor'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={onOpenPatternStudio}
                    className="p-2 rounded-lg border border-stone-300 bg-white text-stone-700 hover:bg-stone-50"
                    title={isId ? 'Buka Studio Pola' : 'Open Pattern Studio'}
                  >
                    <Sparkles className="w-4 h-4 text-amber-600" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Section: Journals Collection */}
        <section id="journals" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-3 border-stone-200">
            <div>
              <h2 className="text-xl font-serif-display font-bold text-stone-900">
                {isId ? 'Koleksi Jurnal Saya' : 'My Journal Collection'}
              </h2>
              <p className="text-xs text-stone-500 font-sans-clean">
                {isId
                  ? 'Buka kembali, duplikasi, atau kelola jurnal digital yang telah dibuat'
                  : 'Revisit, duplicate, or customize your digital journal editions'}
              </p>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isId ? 'Cari judul jurnal...' : 'Search journal title...'}
                  className="pl-8 pr-3 py-1.5 rounded-lg border border-stone-200 bg-white text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-600 w-44 sm:w-56"
                />
              </div>

              {/* JSON Backup tools */}
              <button
                type="button"
                onClick={onExportAllJson}
                className="p-2 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 text-xs flex items-center gap-1"
                title={isId ? 'Cadangkan Semua Jurnal (JSON)' : 'Backup All Journals (JSON)'}
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isId ? 'Cadangkan' : 'Backup'}</span>
              </button>

              <label
                className="p-2 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 text-xs flex items-center gap-1 cursor-pointer"
                title={isId ? 'Pulihkan dari Berkas JSON' : 'Restore from JSON file'}
              >
                <Upload className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isId ? 'Pulihkan' : 'Restore'}</span>
                <input
                  type="file"
                  accept=".json,application/json"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Journals Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJournals.map((journal) => {
              const coverPattern = journal.globalPattern;
              const coverPatternCss = generatePatternCss(
                coverPattern,
                journal.theme.accentColor,
                coverPattern.companionBgColor
              );

              return (
                <div
                  key={journal.id}
                  className="rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between group"
                >
                  {/* Visual Journal Cover Mockup */}
                  <div
                    onClick={() => onSelectJournal(journal.id)}
                    className="aspect-[16/10] w-full p-6 flex flex-col justify-between relative cursor-pointer overflow-hidden border-b border-stone-100"
                    style={coverPatternCss}
                  >
                    {/* Inner Paper Plaque */}
                    <div
                      className="w-full h-full rounded-lg border p-4 flex flex-col justify-between text-center shadow-xs"
                      style={{
                        backgroundColor: journal.theme.paperBgColor,
                        borderColor: journal.theme.borderColor,
                      }}
                    >
                      <span
                        className="text-[10px] tracking-widest uppercase font-semibold block"
                        style={{ color: journal.theme.accentColor }}
                      >
                        {journal.yearRange || '2026'}
                      </span>

                      <h3
                        className="text-base sm:text-lg font-serif-display font-bold tracking-tight line-clamp-2 px-1"
                        style={{ color: journal.theme.primaryColor }}
                      >
                        {journal.title}
                      </h3>

                      <span className="text-[11px] font-serif-reading italic text-stone-500">
                        {journal.author}
                      </span>
                    </div>
                  </div>

                  {/* Card Bottom Metadata & Actions */}
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs text-stone-500 font-sans-clean">
                      <span>
                        {journal.pages.length} {isId ? 'halaman' : 'pages'}
                      </span>
                      <span>{new Date(journal.updatedAt).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-stone-100">
                      <button
                        type="button"
                        onClick={() => onSelectJournal(journal.id)}
                        className="flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 transition-colors text-center"
                      >
                        {isId ? 'Buka Editor' : 'Open Editor'}
                      </button>

                      <button
                        type="button"
                        onClick={() => onDuplicateJournal(journal.id)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-50"
                        title={isId ? 'Duplikasi Jurnal' : 'Duplicate Journal'}
                      >
                        <Copy className="w-4 h-4" />
                      </button>

                      {journals.length > 1 && (
                        <button
                          type="button"
                          onClick={() => onDeleteJournal(journal.id)}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50"
                          title={isId ? 'Hapus Jurnal' : 'Delete Journal'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section: Pattern Collection Showcase */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b pb-3 border-stone-200">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <h2 className="text-xl font-serif-display font-bold text-stone-900">
                  {isId ? 'Koleksi Motif Desain Pola' : 'Pattern Motif Collection'}
                </h2>
              </div>
              <p className="text-xs text-stone-500 font-sans-clean">
                {isId
                  ? 'Sepuluh motif vektor SVG berkualitas tinggi yang siap diterapkan pada jurnal Anda'
                  : 'Ten high-fidelity SVG motifs crafted specifically for digital stationery'}
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenPatternStudio}
              className="text-xs font-semibold text-stone-700 hover:text-stone-900 flex items-center gap-1 underline"
            >
              <span>{isId ? 'Buka Studio Lengkap' : 'Open Full Studio'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {BUILT_IN_PATTERNS.map((p) => {
              const previewCss = generatePatternCss(
                {
                  id: p.id,
                  name: p.name,
                  type: 'svg',
                  category: p.category,
                  scale: 100,
                  repeat: 'repeat',
                  displayMode: 'tiling',
                  opacity: 0.6,
                  companionBgColor: p.defaultCompanionBg,
                  applyTo: 'all-pages',
                  orientation: 0,
                  overlayOpacity: 0.95,
                  solidBackdrop: true,
                },
                p.accentColor,
                p.defaultCompanionBg
              );

              return (
                <div
                  key={p.id}
                  onClick={onOpenPatternStudio}
                  className="rounded-xl border border-stone-200 bg-white p-2.5 flex flex-col gap-2 cursor-pointer hover:shadow-xs transition-shadow"
                >
                  <div
                    className="w-full h-20 rounded-lg border border-stone-200/60 shadow-inner"
                    style={previewCss}
                  />
                  <div>
                    <span className="text-xs font-bold text-stone-900 block truncate">
                      {isId ? p.name : p.nameEn}
                    </span>
                    <span className="text-[10px] text-stone-500 line-clamp-1">
                      {isId ? p.description : p.descriptionEn}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section: 13 Templates Catalog */}
        <section id="templates" className="space-y-4">
          <div className="border-b pb-3 border-stone-200">
            <h2 className="text-xl font-serif-display font-bold text-stone-900">
              {isId ? 'Katalog 13 Template Halaman Jurnal' : '13 Journal Page Templates Catalog'}
            </h2>
            <p className="text-xs text-stone-500 font-sans-clean">
              {isId
                ? 'Semua template dirancang ergonomis untuk kebutuhan personal, produktivitas, maupun produk komersial siap cetak'
                : 'Every template is meticulously built for mindfulness, productivity, and commercial stationery'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            {[
              { title: 'Cover Page', sub: 'Sampul eksklusif dengan monogram tahun, nama pemilik, dan bingkai' },
              { title: 'Personal Information', sub: 'Halaman identitas, kontak darurat, dan tujuan menulis' },
              { title: 'Daily Journal', sub: 'Prioritas 1-2-3, to-do list, timeline jam, rasa syukur, dan refleksi' },
              { title: 'Weekly Planner', sub: 'Target pekanan, jadwal 7 hari, dan evaluasi hasil' },
              { title: 'Monthly Planner', sub: 'Kalender bulanan, target sasaran, agenda penting, dan pelajaran' },
              { title: 'Mood & Emotions', sub: 'Pemilih 8 suasana hati, slider intensitas 1-10, dan tindakan penenang' },
              { title: 'Gratitude Journal', sub: '3 rasa syukur hari ini, momen kecil manis, dan koneksi bermakna' },
              { title: 'Habit Tracker', sub: 'Grid kebiasaan harian/pekanan dengan persentase progres ramah' },
              { title: 'Goal Setting', sub: 'Roadmap jangka pendek & panjang, langkah aksi, dan antisipasi kendala' },
              { title: 'Finance Journal', sub: 'Anggaran, catatan pemasukan/pengeluaran, dan rasio tabungan' },
              { title: 'Study & Projects', sub: 'Matriks prioritas tugas, jam fokus belajar, dan evaluasi' },
              { title: 'Free Writing', sub: 'Ruang tulisan bebas, kutipan tengah, checklist, dan catatan luas' },
              { title: 'Closing Pages', sub: 'Rekapitulasi pencapaian, hikmah perjalanan, dan surat untuk diri sendiri' },
            ].map((tmpl, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-stone-200 bg-white flex flex-col justify-between space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center font-mono font-bold text-[11px] text-stone-600">
                    {idx + 1}
                  </span>
                  <span className="font-bold text-stone-900">{tmpl.title}</span>
                </div>
                <p className="text-stone-500 text-[11px] leading-relaxed">{tmpl.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Local Storage Notice adhering to requirement 6 */}
        <section className="p-4 rounded-xl border border-stone-200 bg-stone-50 text-xs text-stone-600 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-bold block text-stone-800">
              {isId ? 'Penyimpanan Data Lokal Aman' : 'Safe Local Device Storage'}
            </span>
            <p className="text-[11px] text-stone-500">
              {isId
                ? 'Jurnal dan gambar pola Anda tersimpan di peramban ini (IndexedDB). Gunakan tombol "Cadangkan" untuk mengekspor berkas JSON sewaktu-waktu.'
                : 'Your journal data is stored locally in your browser storage (IndexedDB). Use the Backup button to download JSON backups.'}
            </p>
          </div>

          <button
            type="button"
            onClick={onExportAllJson}
            className="px-3 py-1.5 rounded-lg border border-stone-300 bg-white text-stone-700 text-xs font-semibold hover:bg-stone-100 shrink-0"
          >
            {isId ? 'Unduh Cadangan JSON' : 'Download JSON Backup'}
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-6 px-4 sm:px-8 text-center text-xs text-stone-500 font-sans-clean">
        <p>
          Pattern Journal Studio · {isId ? 'Didesain untuk keanggunan digital & cetak' : 'Designed for digital & print stationery excellence'} · 2026
        </p>
      </footer>
    </div>
  );
};
