import React, { useState } from 'react';
import { JournalProject, Language, ThemeConfig, TemplateType, PatternConfig } from '../types/journal';
import { THEME_PRESETS } from '../utils/themePresets';
import { BUILT_IN_PATTERNS } from '../utils/builtInPatterns';
import { createNewPage } from '../utils/starterData';
import { BookPlus, X, Sparkles, Check } from 'lucide-react';

interface NewJournalModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onCreate: (project: JournalProject) => void;
}

interface TemplatePack {
  id: string;
  nameId: string;
  nameEn: string;
  descId: string;
  descEn: string;
  templates: TemplateType[];
}

const TEMPLATE_PACKS: TemplatePack[] = [
  {
    id: 'complete-life',
    nameId: 'Koleksi Lengkap (Complete Life Planner)',
    nameEn: 'Complete Life & Mindfulness',
    descId: 'Memuat 13 template lengkap: harian, mingguan, bulanan, mood, gratitude, habit, goals, finance, dan studi.',
    descEn: 'All 13 templates: daily, weekly, monthly, mood, gratitude, habit, goals, finance, and study.',
    templates: [
      'cover',
      'personal_info',
      'daily',
      'weekly',
      'monthly',
      'mood',
      'gratitude',
      'habit',
      'goals',
      'finance',
      'study_work',
      'free_writing',
      'closing',
    ],
  },
  {
    id: 'minimal-daily',
    nameId: 'Harian & Refleksi Minimalis',
    nameEn: 'Minimal Daily & Reflection',
    descId: 'Fokus pada catatan esensial: sampul, halaman harian, rasa syukur, dan tulisan bebas.',
    descEn: 'Essential daily journaling: cover, daily, gratitude, and free writing.',
    templates: ['cover', 'personal_info', 'daily', 'gratitude', 'free_writing'],
  },
  {
    id: 'student-work',
    nameId: 'Studi & Produktivitas Kerja',
    nameEn: 'Study & Work Planner',
    descId: 'Dioptimalkan untuk pelajar, mahasiswa, dan profesional: mingguan, bulanan, habit, goals, dan studi.',
    descEn: 'Designed for students and creators: weekly, monthly, habits, goals, and study log.',
    templates: ['cover', 'personal_info', 'weekly', 'monthly', 'habit', 'goals', 'study_work'],
  },
  {
    id: 'wellness-mood',
    nameId: 'Kesehatan Mental & Kebiasaan',
    nameEn: 'Mindful Wellness & Habits',
    descId: 'Fokus pada ketenangan batin, pelacak emosi (mood), apresiasi harian, dan kebiasaan sehat.',
    descEn: 'Focus on inner tranquility, emotion checking, gratitude, and gentle habit tracking.',
    templates: ['cover', 'personal_info', 'daily', 'mood', 'gratitude', 'habit', 'closing'],
  },
  {
    id: 'blank-canvas',
    nameId: 'Halaman Bebas (Blank Canvas)',
    nameEn: 'Free Writing Blank Canvas',
    descId: 'Buku catatan bersih untuk penulis bebas dan sketsa ide tanpa batasan struktur.',
    descEn: 'Clean archival notebook for creative freeform writers and thinkers.',
    templates: ['cover', 'personal_info', 'free_writing'],
  },
];

export const NewJournalModal: React.FC<NewJournalModalProps> = ({
  isOpen,
  onClose,
  lang,
  onCreate,
}) => {
  const isId = lang === 'id';

  const [title, setTitle] = useState<string>('Jurnal Keseharian 2026');
  const [subtitle, setSubtitle] = useState<string>('Ruang Refleksi, Rencana, & Pertumbuhan Diri');
  const [author, setAuthor] = useState<string>('Fatimah Az-Zahra');
  const [selectedPackId, setSelectedPackId] = useState<string>('complete-life');
  const [selectedTheme, setSelectedTheme] = useState<ThemeConfig>(THEME_PRESETS[0]);
  const [selectedPatternId, setSelectedPatternId] = useState<string>('botanical-leaves');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const pack = TEMPLATE_PACKS.find((p) => p.id === selectedPackId) || TEMPLATE_PACKS[0];
    const chosenPattern = BUILT_IN_PATTERNS.find((p) => p.id === selectedPatternId) || BUILT_IN_PATTERNS[0];

    const pages = pack.templates.map((type) => createNewPage(type));

    const globalPattern: PatternConfig = {
      id: chosenPattern.id,
      name: chosenPattern.name,
      type: 'svg',
      category: chosenPattern.category,
      scale: 100,
      repeat: 'repeat',
      displayMode: 'tiling',
      opacity: 0.35,
      companionBgColor: chosenPattern.defaultCompanionBg,
      applyTo: 'all-pages',
      orientation: 0,
      overlayOpacity: 0.95,
      solidBackdrop: true,
    };

    const newProject: JournalProject = {
      id: `journal_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      title: title.trim() || 'Jurnal Digital Baru',
      subtitle: subtitle.trim(),
      author: author.trim() || 'Pemilik Jurnal',
      yearRange: '2026 — 2027',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      paperSize: 'a4',
      orientation: 'portrait',
      theme: selectedTheme,
      globalPattern,
      pages,
    };

    onCreate(newProject);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] rounded-2xl shadow-2xl border border-stone-200 w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <BookPlus className="w-5 h-5 text-stone-800" />
            <h2 className="text-base font-serif-display font-bold text-stone-900">
              {isId ? 'Buat Jurnal Digital Baru' : 'Create New Digital Journal'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Title & Author */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-sans-clean">
                {isId ? 'Judul Jurnal' : 'Journal Title'} *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Jurnal Keseharian 2026"
                className="w-full text-sm rounded-lg border border-stone-300 bg-white p-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-sans-clean">
                {isId ? 'Nama Penulis / Pemilik' : 'Author / Owner Name'}
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Fatimah Az-Zahra"
                className="w-full text-sm rounded-lg border border-stone-300 bg-white p-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-sans-clean">
              {isId ? 'Subjudul / Deskripsi Singkat' : 'Subtitle / Theme'}
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="e.g. Ruang Refleksi, Rencana, & Pertumbuhan Diri"
              className="w-full text-sm rounded-lg border border-stone-300 bg-white p-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-800"
            />
          </div>

          {/* Starter Template Pack */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2 font-sans-clean">
              {isId ? 'Pilih Paket Template Halaman' : 'Select Template Starter Pack'}
            </label>
            <div className="space-y-2">
              {TEMPLATE_PACKS.map((pack) => {
                const isSelected = selectedPackId === pack.id;
                return (
                  <div
                    key={pack.id}
                    onClick={() => setSelectedPackId(pack.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-stone-900 bg-white ring-1 ring-stone-900 shadow-sm'
                        : 'border-stone-200 hover:border-stone-400 bg-stone-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-900">
                        {isId ? pack.nameId : pack.nameEn}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-emerald-600" />}
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      {isId ? pack.descId : pack.descEn}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Initial Pattern Choice */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2 font-sans-clean">
              {isId ? 'Pilih Pola Motif Awal' : 'Select Initial Pattern Motif'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {BUILT_IN_PATTERNS.slice(0, 4).map((p) => {
                const isSelected = selectedPatternId === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPatternId(p.id)}
                    className={`p-2 rounded-lg border text-left text-xs transition-all ${
                      isSelected
                        ? 'border-stone-900 bg-white font-bold ring-1 ring-stone-900'
                        : 'border-stone-200 hover:border-stone-400 bg-stone-50'
                    }`}
                  >
                    <span className="block truncate">{isId ? p.name : p.nameEn}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Theme Palette */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2 font-sans-clean">
              {isId ? 'Pilih Palet Warna Stationery' : 'Select Stationery Color Palette'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {THEME_PRESETS.map((t) => {
                const isSelected = selectedTheme.id === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTheme(t)}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'border-stone-900 bg-white font-bold ring-1 ring-stone-900'
                        : 'border-stone-200 hover:border-stone-400 bg-stone-50'
                    }`}
                  >
                    <span className="text-xs text-stone-800 block truncate">{t.name.split('(')[0]}</span>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: t.primaryColor }} />
                      <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: t.accentColor }} />
                      <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: t.paperBgColor }} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 rounded-lg"
            >
              {isId ? 'Batal' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white rounded-lg shadow-sm hover:opacity-90 transition-opacity"
              style={{ backgroundColor: selectedTheme.primaryColor }}
            >
              {isId ? 'Buat Jurnal Sekarang' : 'Create Journal Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
