import React, { useState, useRef } from 'react';
import { PatternConfig, ThemeConfig, Language } from '../../types/journal';
import { BUILT_IN_PATTERNS, generatePatternCss } from '../../utils/builtInPatterns';
import { THEME_PRESETS } from '../../utils/themePresets';
import {
  Upload,
  RotateCw,
  Sliders,
  Layers,
  Palette,
  Eye,
  Check,
  X,
  RefreshCw,
  Save,
  Trash2,
  FileImage,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

interface PatternStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPattern: PatternConfig;
  currentTheme: ThemeConfig;
  lang: Language;
  onApplyDesign: (pattern: PatternConfig, applyTo: PatternConfig['applyTo'], theme: ThemeConfig) => void;
  savedCustomPatterns?: PatternConfig[];
  onSaveCustomPattern?: (pattern: PatternConfig) => void;
  onDeleteCustomPattern?: (id: string) => void;
}

export const PatternStudioModal: React.FC<PatternStudioModalProps> = ({
  isOpen,
  onClose,
  currentPattern,
  currentTheme,
  lang,
  onApplyDesign,
  savedCustomPatterns = [],
  onSaveCustomPattern,
  onDeleteCustomPattern,
}) => {
  const isId = lang === 'id';
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Local working copy of pattern
  const [patternState, setPatternState] = useState<PatternConfig>({ ...currentPattern });
  const [selectedTheme, setSelectedTheme] = useState<ThemeConfig>({ ...currentTheme });
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'builtIn' | 'upload' | 'saved' | 'themes'>('builtIn');
  const [presetSavedNotice, setPresetSavedNotice] = useState<boolean>(false);

  React.useEffect(() => {
    if (isOpen) {
      setPatternState({ ...currentPattern });
      setSelectedTheme({ ...currentTheme });
      setUploadError(null);
    }
  }, [isOpen, currentPattern, currentTheme]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate mime type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setUploadError(
        isId
          ? 'Format berkas tidak didukung. Mohon unggah format PNG, JPG, JPEG, atau WebP.'
          : 'Unsupported file format. Please upload PNG, JPG, JPEG, or WebP.'
      );
      return;
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError(
        isId
          ? 'Ukuran berkas terlalu besar (Maksimal 5MB untuk kinerja optimal).'
          : 'File size exceeds limit (Max 5MB for optimal performance).'
      );
      return;
    }

    // Read file as Data URL
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setPatternState((prev) => ({
          ...prev,
          id: `custom_${Date.now()}`,
          name: file.name.replace(/\.[^/.]+$/, ''),
          type: 'custom',
          category: 'custom',
          customDataUrl: result,
          displayMode: 'tiling',
          repeat: 'repeat',
        }));
      }
    };
    reader.onerror = () => {
      setUploadError(isId ? 'Gagal membaca berkas gambar.' : 'Failed to read image file.');
    };
    reader.readAsDataURL(file);
  };

  const handleSelectBuiltIn = (builtInId: string) => {
    const item = BUILT_IN_PATTERNS.find((p) => p.id === builtInId);
    if (!item) return;

    setPatternState((prev) => ({
      ...prev,
      id: item.id,
      name: item.name,
      type: 'svg',
      category: item.category,
      companionBgColor: item.defaultCompanionBg,
      customDataUrl: undefined,
    }));
  };

  const handleRotate = () => {
    setPatternState((prev) => ({
      ...prev,
      orientation: ((prev.orientation || 0) + 90) % 360,
    }));
  };

  const handleSaveToLibrary = () => {
    if (onSaveCustomPattern) {
      onSaveCustomPattern(patternState);
      setPresetSavedNotice(true);
      setTimeout(() => setPresetSavedNotice(false), 2500);
    }
  };

  const handleApply = () => {
    onApplyDesign(patternState, patternState.applyTo, selectedTheme);
    onClose();
  };

  const previewCss = generatePatternCss(
    patternState,
    selectedTheme.accentColor,
    patternState.companionBgColor
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] rounded-2xl shadow-2xl border border-stone-200 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
              style={{ backgroundColor: selectedTheme.primaryColor }}
            >
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-serif-display font-bold text-stone-900">
                {isId ? 'Custom Pattern Design Studio' : 'Custom Pattern Design Studio'}
              </h2>
              <p className="text-xs text-stone-500 font-sans-clean">
                {isId
                  ? 'Atur motif pola, tekstur kertas, transparansi, dan palet warna editorial'
                  : 'Customize pattern tiling, paper texture, overlay opacity, and color palette'}
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

        {/* Modal Body: Split 2 Columns (Controls on Left, Live Preview on Right) */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-stone-200">
          {/* Left Column: Pattern & Theme Controls (7 cols) */}
          <div className="lg:col-span-7 p-5 sm:p-6 space-y-6">
            {/* Top Sub-tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-stone-200/60 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveTab('builtIn')}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'builtIn'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {isId ? 'Motif Bawaan (10)' : 'Built-In (10)'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('upload')}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'upload'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {isId ? 'Unggah Pola' : 'Upload Custom'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('themes')}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'themes'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {isId ? 'Tema Warna' : 'Theme Palettes'}
              </button>
              {savedCustomPatterns.length > 0 && (
                <button
                  type="button"
                  onClick={() => setActiveTab('saved')}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'saved'
                      ? 'bg-white text-stone-900 shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {isId ? `Tersimpan (${savedCustomPatterns.length})` : `Saved (${savedCustomPatterns.length})`}
                </button>
              )}
            </div>

            {/* TAB 1: Built-in Motifs Grid */}
            {activeTab === 'builtIn' && (
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-wider font-bold text-stone-500 font-sans-clean block">
                  {isId ? 'Pilih Motif Vektor Beresolusi Tinggi' : 'Select High-Resolution Vector Pattern'}
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto pr-1">
                  {BUILT_IN_PATTERNS.map((p) => {
                    const isSelected = patternState.id === p.id && patternState.type === 'svg';
                    const sampleCss = generatePatternCss(
                      {
                        ...patternState,
                        id: p.id,
                        type: 'svg',
                        category: p.category,
                        scale: 100,
                        opacity: 0.6,
                        repeat: 'repeat',
                        displayMode: 'tiling',
                        companionBgColor: p.defaultCompanionBg,
                      },
                      p.accentColor,
                      p.defaultCompanionBg
                    );

                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => handleSelectBuiltIn(p.id)}
                        className={`p-2.5 rounded-xl border text-left flex flex-col gap-2 transition-all group ${
                          isSelected
                            ? 'border-stone-900 ring-2 ring-stone-800 bg-white shadow-sm'
                            : 'border-stone-200 hover:border-stone-400 bg-stone-50'
                        }`}
                      >
                        <div
                          className="w-full h-16 rounded-lg border border-stone-200/60 shadow-inner"
                          style={sampleCss}
                        />
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-stone-900 truncate">
                              {isId ? p.name : p.nameEn}
                            </span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                          </div>
                          <span className="text-[10px] text-stone-500 line-clamp-1">
                            {isId ? p.description : p.descriptionEn}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: Upload Custom Image */}
            {activeTab === 'upload' && (
              <div className="space-y-4">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-stone-300 hover:border-stone-500 rounded-2xl p-6 text-center cursor-pointer bg-stone-50/70 hover:bg-stone-50 transition-colors flex flex-col items-center justify-center gap-2"
                >
                  <div className="w-12 h-12 rounded-full bg-stone-200 flex items-center justify-center text-stone-600">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-800 block">
                      {isId ? 'Klik untuk memilih file pola dari perangkat' : 'Click to select pattern from device'}
                    </span>
                    <span className="text-[11px] text-stone-500">
                      PNG, JPG, JPEG, WebP. Maks 5MB.
                    </span>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>

                {uploadError && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{uploadError}</span>
                  </div>
                )}

                {patternState.type === 'custom' && patternState.customDataUrl && (
                  <div className="p-3.5 rounded-xl border border-stone-200 bg-white flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={patternState.customDataUrl}
                        alt="Pattern preview"
                        className="w-12 h-12 rounded-lg object-cover border border-stone-200"
                      />
                      <div>
                        <span className="text-xs font-bold text-stone-900 block truncate max-w-xs">
                          {patternState.name || 'Pola Kustom'}
                        </span>
                        <span className="text-[11px] text-emerald-600 font-medium">
                          {isId ? 'Pola kustom aktif' : 'Active custom pattern'}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSelectBuiltIn('botanical-leaves')}
                      className="text-xs text-rose-600 hover:text-rose-800 p-1"
                    >
                      {isId ? 'Hapus' : 'Remove'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: Theme Palettes */}
            {activeTab === 'themes' && (
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-wider font-bold text-stone-500 font-sans-clean block">
                  {isId ? 'Pilihan Presets Estetika Stationery' : 'Stationery Aesthetic Presets'}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {THEME_PRESETS.map((t) => {
                    const isSelected = selectedTheme.id === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setSelectedTheme(t)}
                        className={`p-3 rounded-xl border text-left flex flex-col gap-2 transition-all ${
                          isSelected
                            ? 'border-stone-900 ring-2 ring-stone-800 bg-white shadow-sm'
                            : 'border-stone-200 hover:border-stone-400 bg-stone-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-stone-900">{t.name}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                        </div>

                        {/* Swatches */}
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-6 h-6 rounded-full border border-stone-300"
                            style={{ backgroundColor: t.primaryColor }}
                            title="Primary Color"
                          />
                          <span
                            className="w-6 h-6 rounded-full border border-stone-300"
                            style={{ backgroundColor: t.accentColor }}
                            title="Accent Color"
                          />
                          <span
                            className="w-6 h-6 rounded-full border border-stone-300"
                            style={{ backgroundColor: t.paperBgColor }}
                            title="Paper Color"
                          />
                          <span
                            className="w-6 h-6 rounded-full border border-stone-300"
                            style={{ backgroundColor: t.textColor }}
                            title="Text Color"
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 4: Saved Custom Library */}
            {activeTab === 'saved' && (
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-wider font-bold text-stone-500 font-sans-clean block">
                  {isId ? 'Koleksi Pola Tersimpan Anda' : 'Your Saved Pattern Presets'}
                </span>
                <div className="space-y-2">
                  {savedCustomPatterns.map((sp) => (
                    <div
                      key={sp.id}
                      className="p-3 rounded-xl border border-stone-200 bg-white flex items-center justify-between"
                    >
                      <button
                        type="button"
                        onClick={() => setPatternState(sp)}
                        className="flex items-center gap-3 text-left flex-1"
                      >
                        {sp.customDataUrl ? (
                          <img
                            src={sp.customDataUrl}
                            alt={sp.name}
                            className="w-10 h-10 rounded-lg object-cover border"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-stone-200 flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-stone-600" />
                          </div>
                        )}
                        <div>
                          <span className="text-xs font-bold text-stone-900 block">{sp.name}</span>
                          <span className="text-[10px] text-stone-400 capitalize">
                            Skala: {sp.scale}% · Opasitas: {Math.round((sp.opacity || 1) * 100)}%
                          </span>
                        </div>
                      </button>

                      {onDeleteCustomPattern && (
                        <button
                          type="button"
                          onClick={() => onDeleteCustomPattern(sp.id)}
                          className="text-stone-300 hover:text-rose-500 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pattern Tuning Sliders & Knobs */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-4">
              <div className="flex items-center justify-between border-b pb-2 border-stone-100">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-700 font-sans-clean">
                  {isId ? 'Parameter Motif Pola' : 'Pattern Parameters'}
                </span>
                <button
                  type="button"
                  onClick={handleRotate}
                  className="text-xs flex items-center gap-1 text-stone-600 hover:text-stone-900 bg-stone-100 px-2 py-1 rounded"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>{patternState.orientation || 0}°</span>
                </button>
              </div>

              {/* Scale Slider */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-stone-600">{isId ? 'Skala Pola (Ukuran Motif)' : 'Pattern Scale'}</span>
                  <span className="font-mono font-bold text-stone-800">{patternState.scale}%</span>
                </div>
                <input
                  type="range"
                  min={30}
                  max={250}
                  step={5}
                  value={patternState.scale || 100}
                  onChange={(e) =>
                    setPatternState((prev) => ({ ...prev, scale: parseInt(e.target.value, 10) }))
                  }
                  className="w-full accent-stone-700 cursor-pointer"
                />
              </div>

              {/* Opacity Slider */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-stone-600">{isId ? 'Transparansi Motif' : 'Pattern Opacity'}</span>
                  <span className="font-mono font-bold text-stone-800">
                    {Math.round((patternState.opacity ?? 0.35) * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={100}
                  step={5}
                  value={Math.round((patternState.opacity ?? 0.35) * 100)}
                  onChange={(e) =>
                    setPatternState((prev) => ({
                      ...prev,
                      opacity: parseInt(e.target.value, 10) / 100,
                    }))
                  }
                  className="w-full accent-stone-700 cursor-pointer"
                />
              </div>

              {/* Tiling Mode */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-stone-600 block mb-1 font-medium">
                    {isId ? 'Mode Perulangan (Tiling)' : 'Tiling Mode'}
                  </span>
                  <select
                    value={patternState.displayMode}
                    onChange={(e) =>
                      setPatternState((prev) => ({
                        ...prev,
                        displayMode: e.target.value as any,
                      }))
                    }
                    className="w-full text-xs rounded-lg border border-stone-200 bg-white p-2 text-stone-800 focus:outline-none"
                  >
                    <option value="tiling">{isId ? 'Ulang Penuh (Tiling Grid)' : 'Full Tiling Grid'}</option>
                    <option value="cover">{isId ? 'Rentang Layar (Cover)' : 'Full Span (Cover)'}</option>
                    <option value="contain">{isId ? 'Muat Proporsional (Contain)' : 'Proportional (Contain)'}</option>
                    <option value="center">{isId ? 'Tengah Saja (Center Emblem)' : 'Center Emblem'}</option>
                  </select>
                </div>

                <div>
                  <span className="text-stone-600 block mb-1 font-medium">
                    {isId ? 'Terapkan Pola Ke' : 'Apply Pattern Destination'}
                  </span>
                  <select
                    value={patternState.applyTo}
                    onChange={(e) =>
                      setPatternState((prev) => ({
                        ...prev,
                        applyTo: e.target.value as any,
                      }))
                    }
                    className="w-full text-xs rounded-lg border border-stone-200 bg-white p-2 text-stone-800 focus:outline-none"
                  >
                    <option value="all-pages">{isId ? 'Seluruh Jurnal (Semua Halaman)' : 'Whole Journal'}</option>
                    <option value="cover">{isId ? 'Halaman Sampul Saja' : 'Cover Page Only'}</option>
                    <option value="specific">{isId ? 'Halaman Aktif Saat Ini' : 'Current Active Page Only'}</option>
                  </select>
                </div>
              </div>

              {/* Companion Background Color Picker */}
              <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                <span className="text-xs text-stone-600 font-medium">
                  {isId ? 'Warna Latar Belakang Pendamping' : 'Companion Background Color'}
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={patternState.companionBgColor || '#FAF8F5'}
                    onChange={(e) =>
                      setPatternState((prev) => ({ ...prev, companionBgColor: e.target.value }))
                    }
                    className="w-8 h-8 rounded-lg cursor-pointer border border-stone-300"
                  />
                  <span className="text-xs font-mono text-stone-600">{patternState.companionBgColor}</span>
                </div>
              </div>

              {/* Readability Switch: Solid/Translucent Paper Card */}
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-stone-800 block">
                    {isId ? 'Panel Kertas Terang (Anti Teks Buram)' : 'Opaque Paper Backdrop (High Legibility)'}
                  </span>
                  <span className="text-[11px] text-stone-500">
                    {isId ? 'Menjaga tulisan tetap 100% jernih dan nyaman dibaca' : 'Guarantees text is always crystal-clear'}
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={patternState.solidBackdrop ?? true}
                  onChange={(e) =>
                    setPatternState((prev) => ({ ...prev, solidBackdrop: e.target.checked }))
                  }
                  className="w-4 h-4 accent-emerald-600 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Journal Sheet Simulation (5 cols) */}
          <div className="lg:col-span-5 p-5 sm:p-6 bg-[#F2EFE9] flex flex-col justify-between items-center">
            <div className="w-full text-center mb-3">
              <span className="text-[11px] uppercase tracking-wider font-bold text-stone-500 font-sans-clean">
                {isId ? 'Pratinjau Langsung Lembaran Jurnal' : 'Live Journal Sheet Preview'}
              </span>
            </div>

            {/* Simulated Sheet Frame */}
            <div
              className="w-full max-w-sm aspect-[1/1.38] rounded-xl shadow-xl border border-stone-300 overflow-hidden relative flex flex-col justify-between p-6 transition-all"
              style={previewCss}
            >
              {/* Opaque / Translucent Paper Card to test readability */}
              <div
                className={`w-full h-full rounded-lg p-5 flex flex-col justify-between border ${
                  patternState.solidBackdrop ? 'shadow-sm' : ''
                }`}
                style={{
                  backgroundColor: patternState.solidBackdrop
                    ? selectedTheme.paperBgColor
                    : 'rgba(255, 255, 255, 0.75)',
                  borderColor: selectedTheme.borderColor,
                }}
              >
                <div>
                  <div className="flex items-center justify-between border-b pb-2 mb-3" style={{ borderColor: selectedTheme.borderColor }}>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 font-sans-clean">
                      OCTOBER 28 · 2026
                    </span>
                    <span className="text-[10px] font-mono text-stone-400">PAGE 03</span>
                  </div>

                  <h3
                    className="text-lg font-serif-display font-bold mb-1"
                    style={{ color: selectedTheme.primaryColor }}
                  >
                    Ketenangan Pagi Hari
                  </h3>

                  <p
                    className="text-xs font-serif-reading leading-relaxed"
                    style={{ color: selectedTheme.textColor }}
                  >
                    Motif dedaunan yang lembut menghadirkan nuansa damai di setiap lembaran tulisan. Teks tetap sangat mudah dibaca.
                  </p>
                </div>

                {/* Simulated Checklist */}
                <div className="space-y-1.5 pt-2 border-t" style={{ borderColor: selectedTheme.borderColor }}>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="w-3 h-3 rounded bg-emerald-600 flex items-center justify-center text-[9px] text-white">✓</span>
                    <span className="text-stone-700 text-[11px]">Menulis refleksi syukur harian</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="w-3 h-3 rounded border border-stone-300" />
                    <span className="text-stone-500 text-[11px]">Sesi mindful walking 20 menit</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="w-full mt-4 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={handleSaveToLibrary}
                className="text-xs flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 font-medium transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{presetSavedNotice ? (isId ? 'Tersimpan!' : 'Saved!') : (isId ? 'Simpan Preset' : 'Save Preset')}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 rounded-lg"
                >
                  {isId ? 'Batal' : 'Cancel'}
                </button>
                <button
                  type="button"
                  onClick={handleApply}
                  className="px-5 py-2 text-xs font-bold text-white rounded-lg shadow-sm hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: selectedTheme.primaryColor }}
                >
                  {isId ? 'Terapkan Desain' : 'Apply Design'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
