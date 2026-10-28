/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { JournalProject, Language, PatternConfig, ThemeConfig } from './types/journal';
import {
  getAllJournals,
  saveJournal,
  deleteJournal,
  getAllCustomPatterns,
  saveCustomPattern,
  deleteCustomPattern,
  exportAllToJson,
  importAllFromJson,
} from './utils/indexedDb';
import { createStarterJournal, createWriterStarterJournal } from './utils/starterData';
import { Dashboard } from './components/Dashboard/Dashboard';
import { JournalEditor } from './components/Editor/JournalEditor';
import { JournalPreview } from './components/Preview/JournalPreview';
import { PatternStudioModal } from './components/PatternStudio/PatternStudioModal';
import { ExportModal } from './components/Export/ExportModal';
import { NewJournalModal } from './components/NewJournalModal';
import { QuickGuideModal } from './components/QuickGuideModal';

type AppView = 'dashboard' | 'editor' | 'preview';

export default function App() {
  const [journals, setJournals] = useState<JournalProject[]>([]);
  const [activeJournalId, setActiveJournalId] = useState<string | null>(null);
  const [activePageIndex, setActivePageIndex] = useState<number>(0);
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [lang, setLang] = useState<Language>('id');
  const [customPatterns, setCustomPatterns] = useState<PatternConfig[]>([]);

  // Modals
  const [isNewJournalOpen, setIsNewJournalOpen] = useState<boolean>(false);
  const [isPatternStudioOpen, setIsPatternStudioOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isQuickGuideOpen, setIsQuickGuideOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load language preference and journals on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('pjs_lang') as Language;
    if (savedLang === 'id' || savedLang === 'en') {
      setLang(savedLang);
    }

    async function initData() {
      try {
        let loaded = await getAllJournals();
        // If empty on first launch, seed with 2 rich journals
        if (loaded.length === 0) {
          const seed1 = createStarterJournal();
          const seed2 = createWriterStarterJournal();
          await saveJournal(seed1);
          await saveJournal(seed2);
          loaded = [seed1, seed2];
        }
        setJournals(loaded);
        if (loaded.length > 0) {
          setActiveJournalId(loaded[0].id);
        }

        const patterns = await getAllCustomPatterns();
        setCustomPatterns(patterns);
      } catch (err) {
        console.error('Failed to initialize journal data:', err);
      } finally {
        setIsLoading(false);
      }
    }

    initData();
  }, []);

  const handleToggleLang = () => {
    const nextLang: Language = lang === 'id' ? 'en' : 'id';
    setLang(nextLang);
    localStorage.setItem('pjs_lang', nextLang);
  };

  const activeJournal = journals.find((j) => j.id === activeJournalId) || journals[0];

  const handleSelectJournal = (id: string) => {
    setActiveJournalId(id);
    setCurrentView('editor');
  };

  const handleUpdateJournal = async (updated: JournalProject) => {
    setJournals((prev) => prev.map((j) => (j.id === updated.id ? updated : j)));
    try {
      await saveJournal(updated);
    } catch (err) {
      console.error('Failed to save journal to IndexedDB:', err);
    }
  };

  const handleCreateNewJournal = async (newProject: JournalProject) => {
    try {
      await saveJournal(newProject);
      setJournals((prev) => [newProject, ...prev]);
      setActiveJournalId(newProject.id);
      setCurrentView('editor');
    } catch (err) {
      console.error('Failed to create new journal:', err);
    }
  };

  const handleDuplicateJournal = async (id: string) => {
    const target = journals.find((j) => j.id === id);
    if (!target) return;

    const copy: JournalProject = {
      ...JSON.parse(JSON.stringify(target)),
      id: `journal_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      title: `${target.title} (${lang === 'id' ? 'Salinan' : 'Copy'})`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await saveJournal(copy);
    setJournals((prev) => [copy, ...prev]);
  };

  const handleDeleteJournal = async (id: string) => {
    const target = journals.find((j) => j.id === id);
    if (!target) return;

    const confirmMsg =
      lang === 'id'
        ? `Apakah Anda yakin ingin menghapus jurnal "${target.title}"?`
        : `Are you sure you want to delete journal "${target.title}"?`;

    if (window.confirm(confirmMsg)) {
      await deleteJournal(id);
      const remaining = journals.filter((j) => j.id !== id);
      setJournals(remaining);
      if (activeJournalId === id) {
        setActiveJournalId(remaining.length > 0 ? remaining[0].id : null);
        setCurrentView('dashboard');
      }
    }
  };

  // Pattern Studio atomic design callback
  const handleApplyDesign = (
    pattern: PatternConfig,
    applyTo: PatternConfig['applyTo'],
    theme: ThemeConfig
  ) => {
    if (!activeJournal) return;

    let updatedPages = [...activeJournal.pages];
    let globalPattern = activeJournal.globalPattern;

    if (applyTo === 'all-pages') {
      globalPattern = pattern;
      // Clear per-page overrides so global pattern applies everywhere cleanly
      updatedPages = updatedPages.map((p) => ({ ...p, patternOverride: undefined }));
    } else if (applyTo === 'cover') {
      if (updatedPages[0]) {
        updatedPages[0] = {
          ...updatedPages[0],
          patternOverride: pattern,
        };
      }
    } else {
      if (updatedPages[activePageIndex]) {
        updatedPages[activePageIndex] = {
          ...updatedPages[activePageIndex],
          patternOverride: pattern,
        };
      }
    }

    const updated: JournalProject = {
      ...activeJournal,
      theme,
      globalPattern,
      pages: updatedPages,
    };
    handleUpdateJournal(updated);
  };

  const handleSaveCustomPattern = async (pattern: PatternConfig) => {
    try {
      await saveCustomPattern(pattern);
      setCustomPatterns((prev) => [...prev.filter((p) => p.id !== pattern.id), pattern]);
    } catch (err) {
      console.error('Failed to save custom pattern:', err);
    }
  };

  const handleDeleteCustomPattern = async (id: string) => {
    try {
      await deleteCustomPattern(id);
      setCustomPatterns((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Failed to delete custom pattern:', err);
    }
  };

  // JSON Export & Import
  const handleExportAllJson = async () => {
    try {
      const jsonStr = await exportAllToJson();
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `PatternJournalStudio_Backup_${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to export JSON:', err);
    }
  };

  const handleExportSingleJournalJson = () => {
    if (!activeJournal) return;
    const jsonStr = JSON.stringify(activeJournal, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const cleanTitle = activeJournal.title.replace(/[^a-zA-Z0-9_-]/g, '_');
    link.download = `${cleanTitle}_project.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = async (jsonContent: string) => {
    try {
      // First check if it's a single journal or a full backup
      const parsed = JSON.parse(jsonContent);
      if (parsed.journals && Array.isArray(parsed.journals)) {
        const res = await importAllFromJson(jsonContent);
        if (res.success) {
          const freshJournals = await getAllJournals();
          setJournals(freshJournals);
          alert(
            lang === 'id'
              ? `Berhasil memulihkan ${res.count} jurnal!`
              : `Successfully restored ${res.count} journals!`
          );
        } else {
          alert(res.error || 'Impor gagal.');
        }
      } else if (parsed.id && parsed.title && parsed.pages) {
        // Single journal
        await saveJournal(parsed);
        const freshJournals = await getAllJournals();
        setJournals(freshJournals);
        setActiveJournalId(parsed.id);
        alert(
          lang === 'id'
            ? `Berhasil mengimpor jurnal "${parsed.title}"!`
            : `Successfully imported journal "${parsed.title}"!`
        );
      } else {
        alert(
          lang === 'id'
            ? 'Format berkas JSON tidak sesuai struktur proyek jurnal.'
            : 'JSON file does not match journal project structure.'
        );
      }
    } catch (err: any) {
      alert(lang === 'id' ? 'Gagal membaca berkas JSON.' : 'Failed to parse JSON file.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 rounded-full border-2 border-[#3C4F3F] border-t-transparent animate-spin mx-auto" />
          <p className="text-xs font-serif-reading text-stone-600">
            {lang === 'id' ? 'Memuat Pattern Journal Studio...' : 'Loading Pattern Journal Studio...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans-clean">
      {/* 1. Dashboard View */}
      {currentView === 'dashboard' && (
        <Dashboard
          journals={journals}
          lang={lang}
          onSelectJournal={handleSelectJournal}
          onOpenNewJournalModal={() => setIsNewJournalOpen(true)}
          onOpenPatternStudio={() => setIsPatternStudioOpen(true)}
          onDuplicateJournal={handleDuplicateJournal}
          onDeleteJournal={handleDeleteJournal}
          onExportAllJson={handleExportAllJson}
          onImportJson={handleImportJson}
          onToggleLang={handleToggleLang}
          onOpenQuickGuide={() => setIsQuickGuideOpen(true)}
        />
      )}

      {/* 2. Editor View */}
      {currentView === 'editor' && activeJournal && (
        <JournalEditor
          journal={activeJournal}
          lang={lang}
          activePageIndex={activePageIndex}
          setActivePageIndex={setActivePageIndex}
          onUpdateJournal={handleUpdateJournal}
          onBackToDashboard={() => setCurrentView('dashboard')}
          onOpenPatternStudio={() => setIsPatternStudioOpen(true)}
          onOpenPreview={() => setCurrentView('preview')}
          onOpenExport={() => setIsExportOpen(true)}
        />
      )}

      {/* 3. Preview Mode */}
      {currentView === 'preview' && activeJournal && (
        <JournalPreview
          journal={activeJournal}
          lang={lang}
          onBackToEditor={() => setCurrentView('editor')}
          onOpenExport={() => setIsExportOpen(true)}
        />
      )}

      {/* Modals */}
      {activeJournal && (
        <>
          <PatternStudioModal
            isOpen={isPatternStudioOpen}
            onClose={() => setIsPatternStudioOpen(false)}
            currentPattern={activeJournal.globalPattern}
            currentTheme={activeJournal.theme}
            lang={lang}
            onApplyDesign={handleApplyDesign}
            savedCustomPatterns={customPatterns}
            onSaveCustomPattern={handleSaveCustomPattern}
            onDeleteCustomPattern={handleDeleteCustomPattern}
          />

          <ExportModal
            isOpen={isExportOpen}
            onClose={() => setIsExportOpen(false)}
            journal={activeJournal}
            lang={lang}
            onExportJson={handleExportSingleJournalJson}
          />
        </>
      )}

      <NewJournalModal
        isOpen={isNewJournalOpen}
        onClose={() => setIsNewJournalOpen(false)}
        lang={lang}
        onCreate={handleCreateNewJournal}
      />

      <QuickGuideModal
        isOpen={isQuickGuideOpen}
        onClose={() => setIsQuickGuideOpen(false)}
        lang={lang}
      />
    </div>
  );
}
