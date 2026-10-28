import React, { useState } from 'react';
import { JournalProject, Language } from '../../types/journal';
import { PageRenderer } from '../Templates/PageRenderer';
import { generatePatternCss } from '../../utils/builtInPatterns';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  BookOpen,
  Printer,
  Edit3,
  Columns,
  Square,
  Sparkles,
} from 'lucide-react';

interface JournalPreviewProps {
  journal: JournalProject;
  lang: Language;
  onBackToEditor: () => void;
  onOpenExport: () => void;
}

export const JournalPreview: React.FC<JournalPreviewProps> = ({
  journal,
  lang,
  onBackToEditor,
  onOpenExport,
}) => {
  const isId = lang === 'id';
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'single' | 'spread'>('single');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const totalPages = journal.pages.length;
  const activePage = journal.pages[currentPageIndex] || journal.pages[0];
  const activePattern = activePage.patternOverride || journal.globalPattern;

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  const patternCss = generatePatternCss(
    activePattern,
    journal.theme.accentColor,
    activePattern.companionBgColor
  );

  return (
    <div className="min-h-screen bg-[#EFECE6] flex flex-col justify-between selection:bg-stone-300">
      {/* Top Reading Toolbar */}
      <header className="h-14 bg-white/90 backdrop-blur-md border-b border-stone-200/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shrink-0">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToEditor}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-xs font-semibold text-stone-700 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isId ? 'Kembali ke Editor' : 'Back to Editor'}</span>
          </button>

          <span className="hidden sm:inline-block w-px h-4 bg-stone-200" />

          <div className="hidden sm:block">
            <h1 className="text-xs font-bold text-stone-900 truncate max-w-xs">{journal.title}</h1>
            <span className="text-[11px] text-stone-500 font-serif-reading italic truncate block">
              {activePage.title}
            </span>
          </div>
        </div>

        {/* Center Page Pagination */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={currentPageIndex === 0}
            onClick={() => setCurrentPageIndex((p) => Math.max(0, p - 1))}
            className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 disabled:opacity-30 transition-colors"
            title="Halaman Sebelumnya"
          >
            <ChevronLeft className="w-4 h-4 text-stone-700" />
          </button>

          <span className="text-xs font-mono font-bold text-stone-800 px-2">
            {currentPageIndex + 1} / {totalPages}
          </span>

          <button
            type="button"
            disabled={currentPageIndex === totalPages - 1}
            onClick={() => setCurrentPageIndex((p) => Math.min(totalPages - 1, p + 1))}
            className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 disabled:opacity-30 transition-colors"
            title="Halaman Berikutnya"
          >
            <ChevronRight className="w-4 h-4 text-stone-700" />
          </button>
        </div>

        {/* Right Tools */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenExport}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white shadow-sm hover:opacity-90 transition-opacity"
            style={{ backgroundColor: journal.theme.primaryColor }}
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isId ? 'Cetak / PDF' : 'Print / PDF'}</span>
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-100"
            title={isFullscreen ? 'Keluar Layar Penuh' : 'Layar Penuh'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main Journal Presentation Surface */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8 overflow-auto">
        <div className="w-full max-w-4xl flex items-center justify-center">
          {/* Individual Sheet with book shadow and pattern */}
          <div
            className="w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-300/80 overflow-hidden relative p-6 sm:p-12 transition-all duration-300"
            style={patternCss}
          >
            {/* Paper card backdrop */}
            <div
              className="w-full h-full rounded-xl p-6 sm:p-8 border shadow-sm relative"
              style={{
                backgroundColor: activePattern.solidBackdrop
                  ? journal.theme.paperBgColor
                  : 'rgba(255, 255, 255, 0.90)',
                borderColor: journal.theme.borderColor,
              }}
            >
              {/* Top small pagination indicator */}
              <div
                className="flex items-center justify-between border-b pb-2 mb-4 text-[11px] font-sans-clean text-stone-400"
                style={{ borderColor: journal.theme.borderColor }}
              >
                <span className="tracking-widest uppercase">{journal.title}</span>
                <span className="font-mono">{isId ? 'HALAMAN' : 'PAGE'} {String(currentPageIndex + 1).padStart(2, '0')}</span>
              </div>

              {/* Render Template Body (Read-only) */}
              <PageRenderer
                page={activePage}
                theme={journal.theme}
                lang={lang}
                isEditable={false}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Page Thumbnails Strip */}
      <footer className="h-16 bg-white/80 backdrop-blur-md border-t border-stone-200 px-4 flex items-center justify-center gap-2 overflow-x-auto shrink-0">
        {journal.pages.map((p, idx) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setCurrentPageIndex(idx)}
            className={`h-10 px-3 rounded-lg border text-xs font-sans-clean transition-all flex items-center gap-1.5 shrink-0 ${
              currentPageIndex === idx
                ? 'border-stone-900 bg-stone-900 text-white font-bold shadow-sm'
                : 'border-stone-200 hover:border-stone-400 bg-white text-stone-700'
            }`}
          >
            <span className="font-mono text-[11px] opacity-60">{idx + 1}.</span>
            <span className="truncate max-w-[100px]">{p.title}</span>
          </button>
        ))}
      </footer>
    </div>
  );
};
