import React, { useState } from 'react';
import {
  JournalProject,
  JournalPage,
  Language,
  TemplateType,
  PatternConfig,
  ThemeConfig,
} from '../../types/journal';
import { PageRenderer } from '../Templates/PageRenderer';
import { generatePatternCss } from '../../utils/builtInPatterns';
import {
  reorderPages,
  duplicatePage,
  deletePage,
  addPageToJournal,
} from '../../utils/journalLogic';
import {
  ArrowLeft,
  Eye,
  Printer,
  Sparkles,
  Plus,
  Trash2,
  Copy,
  ChevronUp,
  ChevronDown,
  Check,
  Undo2,
  Redo2,
  SlidersHorizontal,
  Layers,
  Palette,
  Type,
  FileText,
  Calendar,
  Settings2,
} from 'lucide-react';

interface JournalEditorProps {
  journal: JournalProject;
  lang: Language;
  activePageIndex: number;
  setActivePageIndex: (idx: number) => void;
  onUpdateJournal: (updated: JournalProject) => void;
  onBackToDashboard: () => void;
  onOpenPatternStudio: () => void;
  onOpenPreview: () => void;
  onOpenExport: () => void;
}

const TEMPLATE_NAMES: Record<TemplateType, { id: string; en: string }> = {
  cover: { id: 'Sampul Depan', en: 'Cover Page' },
  personal_info: { id: 'Informasi Pribadi', en: 'Personal Info' },
  daily: { id: 'Jurnal Harian', en: 'Daily Journal' },
  weekly: { id: 'Perencana Mingguan', en: 'Weekly Planner' },
  monthly: { id: 'Perencana Bulanan', en: 'Monthly Planner' },
  mood: { id: 'Jurnal Suasana Hati', en: 'Mood Journal' },
  gratitude: { id: 'Jurnal Syukur', en: 'Gratitude Journal' },
  habit: { id: 'Pelacak Kebiasaan', en: 'Habit Tracker' },
  goals: { id: 'Target & Impian', en: 'Goals & Milestones' },
  finance: { id: 'Arsip Keuangan', en: 'Finance Journal' },
  study_work: { id: 'Studi & Proyek', en: 'Study & Projects' },
  free_writing: { id: 'Tulisan Bebas', en: 'Free Writing' },
  closing: { id: 'Halaman Penutup', en: 'Closing Pages' },
};

export const JournalEditor: React.FC<JournalEditorProps> = ({
  journal,
  lang,
  activePageIndex,
  setActivePageIndex,
  onUpdateJournal,
  onBackToDashboard,
  onOpenPatternStudio,
  onOpenPreview,
  onOpenExport,
}) => {
  const isId = lang === 'id';

  const [isStyleDrawerOpen, setIsStyleDrawerOpen] = useState<boolean>(true);
  const [isAddTemplateMenuOpen, setIsAddTemplateMenuOpen] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<string>(isId ? 'Tersimpan otomatis' : 'Autosaved');

  // Simple Undo/Redo history stack
  const [history, setHistory] = useState<JournalProject[]>([journal]);
  const [historyIdx, setHistoryIdx] = useState<number>(0);

  const activePage = journal.pages[activePageIndex] || journal.pages[0];

  const updateJournalWithHistory = (updated: JournalProject) => {
    onUpdateJournal(updated);
    setSaveStatus(isId ? 'Menyimpan...' : 'Saving...');
    setTimeout(() => {
      setSaveStatus(isId ? 'Tersimpan otomatis' : 'Autosaved');
    }, 400);

    // Push history
    const nextHistory = history.slice(0, historyIdx + 1);
    nextHistory.push(updated);
    if (nextHistory.length > 20) nextHistory.shift();
    setHistory(nextHistory);
    setHistoryIdx(nextHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIdx > 0) {
      const prev = history[historyIdx - 1];
      setHistoryIdx(historyIdx - 1);
      onUpdateJournal(prev);
    }
  };

  const handleRedo = () => {
    if (historyIdx < history.length - 1) {
      const next = history[historyIdx + 1];
      setHistoryIdx(historyIdx + 1);
      onUpdateJournal(next);
    }
  };

  const handleUpdatePageContent = (newContent: any) => {
    const updatedPages = [...journal.pages];
    updatedPages[activePageIndex] = {
      ...activePage,
      content: newContent,
    };
    updateJournalWithHistory({ ...journal, pages: updatedPages });
  };

  const handlePageTitleChange = (newTitle: string) => {
    const updatedPages = [...journal.pages];
    updatedPages[activePageIndex] = {
      ...activePage,
      title: newTitle,
    };
    updateJournalWithHistory({ ...journal, pages: updatedPages });
  };

  const handleAddPage = (type: TemplateType) => {
    const { pages, newPageId } = addPageToJournal(journal.pages, type, activePageIndex);
    const newIdx = pages.findIndex((p) => p.id === newPageId);
    updateJournalWithHistory({ ...journal, pages });
    setActivePageIndex(newIdx >= 0 ? newIdx : pages.length - 1);
    setIsAddTemplateMenuOpen(false);
  };

  const handleDuplicatePage = (pageId: string) => {
    const updatedPages = duplicatePage(journal.pages, pageId);
    updateJournalWithHistory({ ...journal, pages: updatedPages });
    setActivePageIndex(activePageIndex + 1);
  };

  const handleDeletePage = (pageId: string) => {
    if (journal.pages.length <= 1) {
      alert(isId ? 'Jurnal harus memiliki minimal satu halaman.' : 'Journal must have at least one page.');
      return;
    }
    const confirmMsg = isId
      ? `Hapus halaman "${activePage.title}"?`
      : `Delete page "${activePage.title}"?`;
    if (window.confirm(confirmMsg)) {
      const updatedPages = deletePage(journal.pages, pageId);
      updateJournalWithHistory({ ...journal, pages: updatedPages });
      setActivePageIndex(Math.max(0, activePageIndex - 1));
    }
  };

  const handleMovePage = (direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? activePageIndex - 1 : activePageIndex + 1;
    if (targetIdx < 0 || targetIdx >= journal.pages.length) return;
    const reordered = reorderPages(journal.pages, activePageIndex, targetIdx);
    updateJournalWithHistory({ ...journal, pages: reordered });
    setActivePageIndex(targetIdx);
  };

  // Pattern and Theme styling for the page
  const activePattern = activePage.patternOverride || journal.globalPattern;
  const patternCss = generatePatternCss(
    activePattern,
    journal.theme.accentColor,
    activePattern.companionBgColor
  );

  return (
    <div className="min-h-screen bg-[#F0EDE6] flex flex-col justify-between selection:bg-stone-300">
      {/* Top Navigation & Action Toolbar */}
      <header className="h-14 bg-white/95 backdrop-blur-md border-b border-stone-200/90 px-3 sm:px-6 flex items-center justify-between sticky top-0 z-30 shrink-0">
        {/* Left: Back & Journal Title */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToDashboard}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-xs font-semibold text-stone-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isId ? 'Dasbor' : 'Dashboard'}</span>
          </button>

          <span className="hidden sm:inline-block w-px h-4 bg-stone-200" />

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xs sm:text-sm font-bold text-stone-900 truncate max-w-[140px] sm:max-w-xs">
                {journal.title}
              </h1>
              {/* Autosave Pill */}
              <span className="text-[11px] text-stone-400 font-sans-clean flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-600" />
                <span className="hidden md:inline">{saveStatus}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Center: Undo / Redo */}
        <div className="hidden md:flex items-center gap-1 bg-stone-100 p-1 rounded-lg">
          <button
            type="button"
            disabled={historyIdx <= 0}
            onClick={handleUndo}
            className="p-1.5 rounded text-stone-600 hover:text-stone-900 disabled:opacity-30"
            title="Urungkan (Undo)"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            disabled={historyIdx >= history.length - 1}
            onClick={handleRedo}
            className="p-1.5 rounded text-stone-600 hover:text-stone-900 disabled:opacity-30"
            title="Ulangi (Redo)"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Custom Pattern Studio Trigger */}
          <button
            type="button"
            onClick={onOpenPatternStudio}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-xs font-semibold text-stone-800 transition-colors bg-white shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">{isId ? 'Studio Pola' : 'Pattern Studio'}</span>
          </button>

          {/* Preview Mode */}
          <button
            type="button"
            onClick={onOpenPreview}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-xs font-semibold text-stone-700 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isId ? 'Pratinjau' : 'Preview'}</span>
          </button>

          {/* Export PDF */}
          <button
            type="button"
            onClick={onOpenExport}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white shadow-sm hover:opacity-90 transition-opacity"
            style={{ backgroundColor: journal.theme.primaryColor }}
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{isId ? 'Cetak / PDF' : 'Print / PDF'}</span>
          </button>

          {/* Style Drawer Toggle */}
          <button
            type="button"
            onClick={() => setIsStyleDrawerOpen(!isStyleDrawerOpen)}
            className={`p-1.5 rounded-lg border text-stone-600 hover:text-stone-900 ${
              isStyleDrawerOpen ? 'bg-stone-200/80 border-stone-300' : 'bg-white border-stone-200'
            }`}
            title="Buka / Tutup Panel Desain"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Work Area (3 Columns: Pages Navigator, Sheet Editor, Quick Style Drawer) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar: Pages Thumbnails & Management (260px) */}
        <aside className="w-64 bg-white border-r border-stone-200/90 flex flex-col justify-between shrink-0 overflow-hidden hidden md:flex">
          {/* Header */}
          <div className="p-3 border-b border-stone-100 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-600 font-sans-clean">
              {isId ? 'Halaman Jurnal' : 'Pages'} ({journal.pages.length})
            </span>

            {/* Add Page Dropdown Trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsAddTemplateMenuOpen(!isAddTemplateMenuOpen)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold text-white transition-opacity shadow-xs"
                style={{ backgroundColor: journal.theme.primaryColor }}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isId ? 'Tambah' : 'Add'}</span>
              </button>

              {/* Template Picker Dropdown */}
              {isAddTemplateMenuOpen && (
                <div className="absolute left-0 mt-1.5 w-56 rounded-xl bg-white shadow-2xl border border-stone-200 py-1.5 z-40 max-h-72 overflow-y-auto">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 px-3 py-1 block">
                    {isId ? 'Pilih Jenis Template' : 'Select Template'}
                  </span>
                  {(Object.keys(TEMPLATE_NAMES) as TemplateType[]).map((tType) => (
                    <button
                      key={tType}
                      type="button"
                      onClick={() => handleAddPage(tType)}
                      className="w-full text-left px-3 py-1.5 text-xs text-stone-700 hover:bg-stone-50 hover:text-stone-900 flex items-center justify-between"
                    >
                      <span>{isId ? TEMPLATE_NAMES[tType].id : TEMPLATE_NAMES[tType].en}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Page List */}
          <div className="flex-1 overflow-y-auto p-2.5 space-y-1.5">
            {journal.pages.map((p, idx) => {
              const isActive = activePageIndex === idx;
              return (
                <div
                  key={p.id}
                  onClick={() => setActivePageIndex(idx)}
                  className={`p-2 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between group ${
                    isActive
                      ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900 shadow-2xs'
                      : 'border-stone-200/80 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="font-mono text-[11px] text-stone-400 w-4 shrink-0">
                      {idx + 1}
                    </span>
                    <div className="truncate">
                      <span className="text-xs font-semibold text-stone-800 block truncate">
                        {p.title}
                      </span>
                      <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
                        {isId ? TEMPLATE_NAMES[p.templateType]?.id : TEMPLATE_NAMES[p.templateType]?.en}
                      </span>
                    </div>
                  </div>

                  {/* Actions (Duplicate / Delete) on hover */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDuplicatePage(p.id);
                      }}
                      className="text-stone-400 hover:text-stone-700 p-0.5"
                      title="Duplikasi"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                    {journal.pages.length > 1 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeletePage(p.id);
                        }}
                        className="text-stone-400 hover:text-rose-500 p-0.5"
                        title="Hapus"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Page Navigation Buttons (Move Up / Down) */}
          <div className="p-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <span className="font-mono text-[11px]">
              {activePageIndex + 1} / {journal.pages.length}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={activePageIndex === 0}
                onClick={() => handleMovePage('up')}
                className="p-1 rounded hover:bg-stone-100 disabled:opacity-30"
                title="Geser halaman ke atas"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                type="button"
                disabled={activePageIndex === journal.pages.length - 1}
                onClick={() => handleMovePage('down')}
                className="p-1 rounded hover:bg-stone-100 disabled:opacity-30"
                title="Geser halaman ke bawah"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* Center Main Stage: Journal Canvas */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col items-center">
          {/* Active Page Header bar */}
          <div className="w-full max-w-4xl flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-stone-400">
                P.{String(activePageIndex + 1).padStart(2, '0')}
              </span>
              <input
                type="text"
                value={activePage.title}
                onChange={(e) => handlePageTitleChange(e.target.value)}
                placeholder="Judul Halaman..."
                className="text-sm sm:text-base font-bold text-stone-800 bg-transparent border-b border-transparent hover:border-stone-300 focus:outline-none focus:border-stone-500 px-1 py-0.5"
              />
            </div>

            {/* Mobile Page Controls */}
            <div className="flex md:hidden items-center gap-1">
              <button
                type="button"
                disabled={activePageIndex === 0}
                onClick={() => setActivePageIndex(activePageIndex - 1)}
                className="p-1 bg-white border rounded text-xs"
              >
                ←
              </button>
              <span className="text-xs font-mono">
                {activePageIndex + 1}/{journal.pages.length}
              </span>
              <button
                type="button"
                disabled={activePageIndex === journal.pages.length - 1}
                onClick={() => setActivePageIndex(activePageIndex + 1)}
                className="p-1 bg-white border rounded text-xs"
              >
                →
              </button>
            </div>
          </div>

          {/* The Physical Sheet Container */}
          <div
            className="w-full max-w-4xl rounded-2xl shadow-xl border border-stone-300/80 overflow-hidden relative p-4 sm:p-8 transition-all"
            style={patternCss}
          >
            {/* Opaque Paper card backing with custom styling */}
            <div
              className="w-full h-full rounded-xl p-4 sm:p-6 border shadow-sm relative transition-all"
              style={{
                backgroundColor: activePattern.solidBackdrop
                  ? journal.theme.paperBgColor
                  : 'rgba(255, 255, 255, 0.90)',
                borderColor: journal.theme.borderColor,
              }}
            >
              <PageRenderer
                page={activePage}
                theme={journal.theme}
                lang={lang}
                isEditable={true}
                onUpdateContent={handleUpdatePageContent}
              />
            </div>
          </div>
        </main>

        {/* Right Drawer: Quick Styling & Layout Inspector (280px) */}
        {isStyleDrawerOpen && (
          <aside className="w-72 bg-white border-l border-stone-200/90 flex flex-col justify-between shrink-0 overflow-y-auto p-4 space-y-6">
            <div className="space-y-5">
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b pb-2 border-stone-100">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-stone-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-800 font-sans-clean">
                    {isId ? 'Penyesuaian Desain' : 'Design Inspector'}
                  </span>
                </div>
              </div>

              {/* Pattern Info & Studio Launcher */}
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-stone-700 uppercase">
                    {isId ? 'Motif Pola Halaman' : 'Page Pattern'}
                  </span>
                  <span className="text-[10px] text-stone-500 font-mono">
                    {activePattern.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onOpenPatternStudio}
                  className="w-full py-2 px-3 rounded-lg text-xs font-bold text-white shadow-xs flex items-center justify-center gap-1.5 transition-opacity"
                  style={{ backgroundColor: journal.theme.primaryColor }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isId ? 'Buka Studio Pola' : 'Open Pattern Studio'}</span>
                </button>
              </div>

              {/* Typography / Font Pairings */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-2 font-sans-clean">
                  {isId ? 'Gaya Tipografi Judul' : 'Title Typography'}
                </span>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  {[
                    { id: 'serif-display', name: 'Playfair (Display)' },
                    { id: 'serif-classic', name: 'Cormorant (Classic)' },
                    { id: 'serif-reading', name: 'Lora (Editorial)' },
                    { id: 'sans-clean', name: 'Jakarta (Modern)' },
                  ].map((font) => {
                    const isSelected = journal.theme.primaryFont === font.id;
                    return (
                      <button
                        key={font.id}
                        type="button"
                        onClick={() => {
                          const updatedTheme: ThemeConfig = {
                            ...journal.theme,
                            primaryFont: font.id as any,
                          };
                          updateJournalWithHistory({ ...journal, theme: updatedTheme });
                        }}
                        className={`p-2 rounded-lg border text-left truncate transition-all ${
                          isSelected
                            ? 'border-stone-900 bg-stone-100 font-bold'
                            : 'border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        {font.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Paper Texture Selection */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-2 font-sans-clean">
                  {isId ? 'Tekstur Kertas' : 'Paper Texture'}
                </span>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  {[
                    { id: 'clean', name: isId ? 'Polos Bersih' : 'Clean' },
                    { id: 'grain', name: isId ? 'Serat Alami' : 'Paper Grain' },
                    { id: 'dot-grid', name: isId ? 'Dot Grid' : 'Dot Grid' },
                    { id: 'ruled', name: isId ? 'Garis Buku' : 'Ruled' },
                  ].map((texture) => {
                    const isSelected = journal.theme.paperTexture === texture.id;
                    return (
                      <button
                        key={texture.id}
                        type="button"
                        onClick={() => {
                          const updatedTheme: ThemeConfig = {
                            ...journal.theme,
                            paperTexture: texture.id as any,
                          };
                          updateJournalWithHistory({ ...journal, theme: updatedTheme });
                        }}
                        className={`p-2 rounded-lg border text-left truncate transition-all ${
                          isSelected
                            ? 'border-stone-900 bg-stone-100 font-bold'
                            : 'border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        {texture.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Solid Paper Backdrop Toggle */}
              <div className="p-3 rounded-xl border border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-stone-800 block">
                    {isId ? 'Panel Kertas Padat' : 'Opaque Paper Panel'}
                  </span>
                  <span className="text-[10px] text-stone-400">
                    {isId ? 'Tulisan selalu jernih' : 'High text legibility'}
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={activePattern.solidBackdrop ?? true}
                  onChange={(e) => {
                    const updatedPattern = { ...activePattern, solidBackdrop: e.target.checked };
                    updateJournalWithHistory({ ...journal, globalPattern: updatedPattern });
                  }}
                  className="w-4 h-4 accent-emerald-600 cursor-pointer"
                />
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};
