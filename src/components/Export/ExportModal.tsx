import React, { useState } from 'react';
import { JournalProject, Language, PaperSize, PageOrientation } from '../../types/journal';
import { PageRenderer } from '../Templates/PageRenderer';
import { generatePatternCss } from '../../utils/builtInPatterns';
import {
  Printer,
  Download,
  FileText,
  X,
  Check,
  Sparkles,
  Droplet,
  Settings,
  ChevronLeft,
  ChevronRight,
  Layers,
  FileCode,
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  journal: JournalProject;
  lang: Language;
  onExportJson: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  journal,
  lang,
  onExportJson,
}) => {
  const isId = lang === 'id';

  const [paperSize, setPaperSize] = useState<PaperSize>(journal.paperSize || 'a4');
  const [orientation, setOrientation] = useState<PageOrientation>(journal.orientation || 'portrait');
  const [inkSaverMode, setInkSaverMode] = useState<boolean>(false);
  const [selectedPageIndices, setSelectedPageIndices] = useState<number[]>(
    journal.pages.map((_, i) => i)
  );
  const [previewPageIdx, setPreviewPageIdx] = useState<number>(0);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [pdfProgress, setPdfProgress] = useState<string>('');

  if (!isOpen) return null;

  const handleTogglePage = (idx: number) => {
    if (selectedPageIndices.includes(idx)) {
      if (selectedPageIndices.length > 1) {
        setSelectedPageIndices(selectedPageIndices.filter((i) => i !== idx));
      }
    } else {
      setSelectedPageIndices([...selectedPageIndices, idx].sort((a, b) => a - b));
    }
  };

  const handleSelectAllPages = () => {
    setSelectedPageIndices(journal.pages.map((_, i) => i));
  };

  const handlePrint = () => {
    // Open system print dialog
    window.print();
  };

  const handleDirectPdfDownload = async () => {
    setIsGeneratingPdf(true);
    setPdfProgress(isId ? 'Mempersiapkan dokumen PDF...' : 'Preparing PDF document...');

    try {
      const pdf = new jsPDF({
        orientation: orientation === 'portrait' ? 'p' : 'l',
        unit: 'mm',
        format: paperSize,
      });

      const pagesToExport = selectedPageIndices;
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      for (let i = 0; i < pagesToExport.length; i++) {
        const pageIdx = pagesToExport[i];
        setPdfProgress(
          isId
            ? `Merender halaman ${i + 1} dari ${pagesToExport.length}...`
            : `Rendering page ${i + 1} of ${pagesToExport.length}...`
        );

        // Find printable element
        const pageElem = document.getElementById(`print-page-${pageIdx}`);
        if (pageElem) {
          const canvas = await html2canvas(pageElem, {
            scale: 2, // High resolution
            useCORS: true,
            logging: false,
            backgroundColor: inkSaverMode ? '#FFFFFF' : '#FAF8F5',
          });

          const imgData = canvas.toDataURL('image/jpeg', 0.95);
          if (i > 0) {
            pdf.addPage(paperSize, orientation === 'portrait' ? 'p' : 'l');
          }
          pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        }
      }

      setPdfProgress(isId ? 'Menyimpan berkas...' : 'Saving file...');
      const cleanTitle = journal.title.replace(/[^a-zA-Z0-9_-]/g, '_');
      pdf.save(`${cleanTitle}_printable_${paperSize}.pdf`);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
      alert(
        isId
          ? 'Terjadi kendala saat merender PDF langsung. Anda juga dapat menggunakan tombol Cetak / Save as PDF dari browser.'
          : 'Encountered issue generating direct PDF. You can also use the Browser Print / Save as PDF option.'
      );
    } finally {
      setIsGeneratingPdf(false);
      setPdfProgress('');
    }
  };

  const activePreviewPage = journal.pages[previewPageIdx] || journal.pages[0];
  const activePattern = activePreviewPage.patternOverride || journal.globalPattern;

  const sheetPatternCss = inkSaverMode
    ? { backgroundColor: '#FFFFFF' }
    : generatePatternCss(activePattern, journal.theme.accentColor, activePattern.companionBgColor);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] rounded-2xl shadow-2xl border border-stone-200 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
              style={{ backgroundColor: journal.theme.primaryColor }}
            >
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-serif-display font-bold text-stone-900">
                {isId ? 'Ekspor & Cetak Jurnal Digital' : 'Export & Print Digital Journal'}
              </h2>
              <p className="text-xs text-stone-500 font-sans-clean">
                {isId
                  ? 'Format siap cetak A4, A5, Letter dengan tata letak editorial presisi'
                  : 'Print-ready formats for A4, A5, and Letter with precise stationery margins'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-stone-200">
          {/* Left Column: Settings (5 cols) */}
          <div className="lg:col-span-5 p-5 sm:p-6 space-y-6">
            {/* Paper Size Selection */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-2 font-sans-clean">
                {isId ? 'Ukuran Kertas Standar' : 'Standard Paper Size'}
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'a4', label: 'A4', sub: '210 × 297 mm' },
                  { id: 'a5', label: 'A5', sub: '148 × 210 mm' },
                  { id: 'letter', label: 'US Letter', sub: '8.5 × 11 in' },
                ].map((size) => (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() => setPaperSize(size.id as PaperSize)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      paperSize === size.id
                        ? 'border-stone-900 bg-white shadow-sm ring-1 ring-stone-900'
                        : 'border-stone-200 hover:border-stone-400 bg-stone-50'
                    }`}
                  >
                    <span className="text-xs font-bold block text-stone-900">{size.label}</span>
                    <span className="text-[10px] text-stone-400">{size.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Orientation */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-2 font-sans-clean">
                {isId ? 'Orientasi Halaman' : 'Page Orientation'}
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setOrientation('portrait')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    orientation === 'portrait'
                      ? 'border-stone-900 bg-white shadow-sm ring-1 ring-stone-900'
                      : 'border-stone-200 hover:border-stone-400 bg-stone-50'
                  }`}
                >
                  <span className="text-xs font-bold block text-stone-900">{isId ? 'Potret (Tegak)' : 'Portrait'}</span>
                  <span className="text-[10px] text-stone-400">{isId ? 'Ideal untuk binder' : 'Best for binders'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setOrientation('landscape')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    orientation === 'landscape'
                      ? 'border-stone-900 bg-white shadow-sm ring-1 ring-stone-900'
                      : 'border-stone-200 hover:border-stone-400 bg-stone-50'
                  }`}
                >
                  <span className="text-xs font-bold block text-stone-900">{isId ? 'Lanskap (Mendatar)' : 'Landscape'}</span>
                  <span className="text-[10px] text-stone-400">{isId ? 'Meja & kalender' : 'Desk & calendar'}</span>
                </button>
              </div>
            </div>

            {/* Ink Saver Mode Toggle */}
            <div className="p-3.5 rounded-xl border border-stone-200 bg-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Droplet className="w-4 h-4 text-emerald-600" />
                <div>
                  <span className="text-xs font-bold text-stone-800 block">
                    {isId ? 'Mode Hemat Tinta (Ink-Saver)' : 'Ink-Saver Print Mode'}
                  </span>
                  <span className="text-[11px] text-stone-500">
                    {isId ? 'Latar belakang putih bersih tanpa pola penuh' : 'Clean white paper, no full background pattern'}
                  </span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={inkSaverMode}
                onChange={(e) => setInkSaverMode(e.target.checked)}
                className="w-4 h-4 accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Page Selection Checklist */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-600 font-sans-clean">
                  {isId ? 'Pilih Halaman yang Diekspor' : 'Select Pages to Export'}
                </span>
                <button
                  type="button"
                  onClick={handleSelectAllPages}
                  className="text-xs text-stone-500 hover:text-stone-800 underline"
                >
                  {isId ? 'Pilih Semua' : 'Select All'} ({journal.pages.length})
                </button>
              </div>

              <div className="max-h-40 overflow-y-auto space-y-1.5 p-2 rounded-xl border border-stone-200 bg-white">
                {journal.pages.map((p, idx) => {
                  const isChecked = selectedPageIndices.includes(idx);
                  return (
                    <label
                      key={p.id}
                      className="flex items-center gap-2.5 text-xs text-stone-700 hover:bg-stone-50 p-1.5 rounded cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleTogglePage(idx)}
                        className="w-3.5 h-3.5 accent-stone-800"
                      />
                      <span className="font-mono text-stone-400 w-5">{idx + 1}.</span>
                      <span className="font-medium truncate">{p.title}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* JSON Export Button */}
            <div className="pt-2 border-t border-stone-200">
              <button
                type="button"
                onClick={onExportJson}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold transition-colors"
              >
                <FileCode className="w-4 h-4" />
                <span>{isId ? 'Ekspor Konfigurasi Proyek (.JSON)' : 'Export Project Backup (.JSON)'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Sheet Preview & Action Buttons (7 cols) */}
          <div className="lg:col-span-7 p-5 sm:p-6 bg-[#F2EFE9] flex flex-col justify-between items-center">
            {/* Page preview switcher */}
            <div className="w-full flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-stone-600">
                {isId ? 'Pratinjau Halaman Cetak' : 'Print Page Preview'}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={previewPageIdx === 0}
                  onClick={() => setPreviewPageIdx((p) => Math.max(0, p - 1))}
                  className="p-1 rounded bg-white border border-stone-300 disabled:opacity-40"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono font-bold text-stone-700">
                  {previewPageIdx + 1} / {journal.pages.length}
                </span>
                <button
                  type="button"
                  disabled={previewPageIdx === journal.pages.length - 1}
                  onClick={() => setPreviewPageIdx((p) => Math.min(journal.pages.length - 1, p + 1))}
                  className="p-1 rounded bg-white border border-stone-300 disabled:opacity-40"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scaled preview sheet container */}
            <div className="w-full max-h-[500px] overflow-auto flex items-center justify-center p-2">
              <div
                id={`print-page-${previewPageIdx}`}
                className="w-full max-w-md aspect-[1/1.414] rounded shadow-xl border border-stone-300 overflow-hidden relative flex flex-col justify-between p-4 sm:p-6 transition-all"
                style={sheetPatternCss}
              >
                <div
                  className="w-full h-full rounded p-4 flex flex-col justify-between overflow-hidden"
                  style={{
                    backgroundColor: inkSaverMode
                      ? '#FFFFFF'
                      : activePattern.solidBackdrop
                      ? journal.theme.paperBgColor
                      : 'rgba(255, 255, 255, 0.85)',
                  }}
                >
                  <PageRenderer
                    page={activePreviewPage}
                    theme={journal.theme}
                    lang={lang}
                    isEditable={false}
                    inkSaverMode={inkSaverMode}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Primary Actions */}
            <div className="w-full mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[11px] text-stone-500">
                {selectedPageIndices.length} {isId ? 'halaman siap diekspor' : 'pages selected for export'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-4 py-2 text-xs font-semibold text-stone-700 bg-white border border-stone-300 hover:bg-stone-50 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>{isId ? 'Cetak Peramban' : 'Browser Print'}</span>
                </button>

                <button
                  type="button"
                  disabled={isGeneratingPdf}
                  onClick={handleDirectPdfDownload}
                  className="px-5 py-2 text-xs font-bold text-white rounded-lg shadow-sm hover:opacity-90 transition-opacity flex items-center gap-1.5 disabled:opacity-50"
                  style={{ backgroundColor: journal.theme.primaryColor }}
                >
                  <Download className="w-4 h-4" />
                  <span>
                    {isGeneratingPdf
                      ? pdfProgress || (isId ? 'Memproses PDF...' : 'Processing...')
                      : isId
                      ? 'Unduh PDF Siap Cetak'
                      : 'Download Print-Ready PDF'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
