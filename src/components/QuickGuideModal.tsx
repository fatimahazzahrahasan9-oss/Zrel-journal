import React from 'react';
import { Language } from '../types/journal';
import { BookOpen, Sparkles, Sliders, CheckSquare, Printer, X, Feather } from 'lucide-react';

interface QuickGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const QuickGuideModal: React.FC<QuickGuideModalProps> = ({ isOpen, onClose, lang }) => {
  const isId = lang === 'id';
  if (!isOpen) return null;

  const steps = [
    {
      step: '01',
      title: isId ? 'Buat Jurnal Baru' : 'Create New Journal',
      desc: isId
        ? 'Beri nama jurnal Anda, pilih penulis, dan tentukan paket template awal (Koleksi Lengkap, Minimalis, atau Halaman Bebas).'
        : 'Name your journal, specify author, and choose a starter template bundle.',
      icon: BookOpen,
    },
    {
      step: '02',
      title: isId ? 'Kustomisasi Motif Pola (Pattern)' : 'Customize Pattern Design',
      desc: isId
        ? 'Pilih salah satu dari 10 motif vektor SVG (Botanical, Gingham, Stars, dsb.) atau unggah gambar pola Anda sendiri (PNG/JPG/WebP).'
        : 'Choose from 10 crisp SVG vector motifs or upload your own pattern image seamlessly.',
      icon: Sparkles,
    },
    {
      step: '03',
      title: isId ? 'Atur Skala & Transparansi' : 'Adjust Scale & Opacity',
      desc: isId
        ? 'Sesuaikan perulangan (tiling), rotasi, dan opasitas. Panel latar belakang terang memastikan tulisan Anda selalu mudah dibaca.'
        : 'Tweak repeat tiling, rotation, and opacity. The opaque paper card ensures text is always 100% legible.',
      icon: Sliders,
    },
    {
      step: '04',
      title: isId ? 'Tulis & Sunting Isi Jurnal' : 'Write & Edit Mindfully',
      desc: isId
        ? 'Tersedia 13 jenis template: Harian, Mingguan, Bulanan, Mood, Gratitude, Habit Tracker, Keuangan, Studi, hingga Esai Bebas.'
        : 'Write across 13 dedicated templates: Daily, Weekly, Monthly, Mood, Gratitude, Habits, Finance, and Free Writing.',
      icon: Feather,
    },
    {
      step: '05',
      title: isId ? 'Pratinjau & Ekspor Siap Cetak' : 'Preview & Print-Ready Export',
      desc: isId
        ? 'Buka mode Pratinjau untuk sensasi membaca buku digital, lalu ekspor ke PDF (A4, A5, Letter) atau cetak langsung dari browser.'
        : 'Enter Preview mode for digital reading experience, then export to A4/A5/Letter PDF or browser print.',
      icon: Printer,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] rounded-2xl shadow-2xl border border-stone-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-stone-800" />
            <h2 className="text-base font-serif-display font-bold text-stone-900">
              {isId ? 'Panduan Memulai Pattern Journal Studio' : 'Getting Started Guide'}
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          <p className="text-xs sm:text-sm text-stone-600 font-serif-reading leading-relaxed">
            {isId
              ? 'Selamat datang di Pattern Journal Studio! Ikuti lima langkah mudah berikut untuk merancang dan menulis jurnal digital pertama Anda:'
              : 'Welcome to Pattern Journal Studio! Follow these simple steps to design and write your digital journal:'}
          </p>

          <div className="space-y-3">
            {steps.map((st) => {
              const Icon = st.icon;
              return (
                <div
                  key={st.step}
                  className="p-3.5 rounded-xl border border-stone-200 bg-white flex items-start gap-3.5"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#3C4F3F] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {st.step}
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-stone-900 mb-0.5">
                      {st.title}
                    </h3>
                    <p className="text-xs text-stone-600 font-sans-clean leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 rounded-lg bg-[#3C4F3F] text-white text-xs font-bold hover:opacity-90 transition-opacity"
            >
              {isId ? 'Saya Mengerti, Mulai Journaling' : 'Got It, Start Journaling'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
