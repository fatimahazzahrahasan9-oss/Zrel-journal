import React from 'react';
import { CoverContent, ThemeConfig, Language } from '../../types/journal';
import { BookOpen, Sparkles, Feather } from 'lucide-react';

interface CoverTemplateProps {
  content: CoverContent;
  theme: ThemeConfig;
  lang: Language;
  isEditable?: boolean;
  onChange: (field: string, value: any) => void;
  inkSaverMode?: boolean;
}

export const CoverTemplate: React.FC<CoverTemplateProps> = ({
  content,
  theme,
  lang,
  isEditable,
  onChange,
  inkSaverMode,
}) => {
  const isId = lang === 'id';

  return (
    <div className="w-full h-full min-h-[720px] flex flex-col items-center justify-between p-8 sm:p-14 relative select-text">
      {/* Decorative Outer Border Box */}
      <div
        className="w-full h-full border-2 border-dashed rounded-xl p-6 sm:p-10 flex flex-col items-center justify-between text-center relative"
        style={{
          borderColor: inkSaverMode ? '#D1D5DB' : theme.accentColor + '88',
        }}
      >
        {/* Inner thin border */}
        <div
          className="absolute inset-3 sm:inset-4 border pointer-events-none rounded-lg"
          style={{ borderColor: inkSaverMode ? '#E5E7EB' : theme.accentColor + '44' }}
        />

        {/* Top Ornament / Year Range */}
        <div className="z-10 flex flex-col items-center gap-2 mt-4">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center border"
            style={{
              borderColor: theme.accentColor,
              color: theme.primaryColor,
              backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
            }}
          >
            <Feather className="w-5 h-5" />
          </div>

          {isEditable ? (
            <input
              type="text"
              value={content.yearRange || ''}
              onChange={(e) => onChange('yearRange', e.target.value)}
              placeholder="2026 — 2027"
              className="text-xs sm:text-sm tracking-widest uppercase font-sans-clean font-semibold text-center bg-transparent border-b border-transparent hover:border-stone-300 focus:border-stone-400 focus:outline-none px-2 py-0.5"
              style={{ color: theme.accentColor }}
            />
          ) : (
            <span
              className="text-xs sm:text-sm tracking-widest uppercase font-sans-clean font-semibold"
              style={{ color: theme.accentColor }}
            >
              {content.yearRange || '2026 — 2027'}
            </span>
          )}
        </div>

        {/* Main Title Centerpiece */}
        <div className="z-10 my-auto max-w-xl flex flex-col items-center gap-4 px-4">
          <div className="flex items-center gap-3">
            <span className="w-8 sm:w-16 h-px" style={{ backgroundColor: theme.accentColor }} />
            <span
              className="text-xs tracking-widest uppercase font-sans-clean font-medium"
              style={{ color: theme.accentColor }}
            >
              {isId ? 'Digital Stationery Edition' : 'Digital Stationery Edition'}
            </span>
            <span className="w-8 sm:w-16 h-px" style={{ backgroundColor: theme.accentColor }} />
          </div>

          {isEditable ? (
            <textarea
              value={content.title || ''}
              onChange={(e) => onChange('title', e.target.value)}
              placeholder="JUDUL JURNAL"
              rows={2}
              className="w-full text-3xl sm:text-5xl font-serif-display font-bold text-center tracking-tight bg-transparent border border-transparent hover:border-stone-300 focus:border-stone-400 focus:outline-none rounded p-2 resize-none"
              style={{ color: theme.primaryColor }}
            />
          ) : (
            <h1
              className="text-3xl sm:text-5xl font-serif-display font-bold tracking-tight text-center"
              style={{ color: theme.primaryColor }}
            >
              {content.title || 'JURNAL KESEHARIAN'}
            </h1>
          )}

          {isEditable ? (
            <input
              type="text"
              value={content.subtitle || ''}
              onChange={(e) => onChange('subtitle', e.target.value)}
              placeholder="Subjudul atau tema jurnal..."
              className="w-full text-sm sm:text-base font-serif-reading italic text-center bg-transparent border-b border-transparent hover:border-stone-300 focus:border-stone-400 focus:outline-none px-3 py-1"
              style={{ color: theme.textColor }}
            />
          ) : (
            <p className="text-sm sm:text-base font-serif-reading italic" style={{ color: theme.textColor }}>
              {content.subtitle}
            </p>
          )}

          {/* Dedication quote */}
          <div className="mt-4 pt-4 border-t border-stone-200/60 max-w-md">
            {isEditable ? (
              <input
                type="text"
                value={content.dedication || ''}
                onChange={(e) => onChange('dedication', e.target.value)}
                placeholder="Kata pengantar atau persembahan..."
                className="w-full text-xs sm:text-sm font-sans-clean text-center text-stone-500 bg-transparent border-b border-transparent hover:border-stone-300 focus:border-stone-400 focus:outline-none px-2 py-0.5"
              />
            ) : (
              <p className="text-xs sm:text-sm font-sans-clean text-stone-500 italic">
                {content.dedication}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Section: Owner Name */}
        <div className="z-10 flex flex-col items-center gap-1 mb-2">
          <span className="text-[11px] tracking-wider uppercase text-stone-400 font-sans-clean">
            {isId ? 'DIPERUNTUKKAN BAGI' : 'THIS JOURNAL BELONGS TO'}
          </span>

          {isEditable ? (
            <input
              type="text"
              value={content.ownerName || ''}
              onChange={(e) => onChange('ownerName', e.target.value)}
              placeholder="Nama Pemilik"
              className="text-base sm:text-lg font-serif-classic font-semibold text-center bg-transparent border-b border-stone-300 focus:border-stone-600 focus:outline-none px-4 py-1"
              style={{ color: theme.primaryColor }}
            />
          ) : (
            <span
              className="text-base sm:text-lg font-serif-classic font-semibold"
              style={{ color: theme.primaryColor }}
            >
              {content.ownerName || 'Nama Pemilik'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
