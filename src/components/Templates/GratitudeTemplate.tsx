import React from 'react';
import { GratitudeContent, ThemeConfig, Language } from '../../types/journal';
import { Sun, Sparkles, Smile, Users, Heart } from 'lucide-react';

interface GratitudeTemplateProps {
  content: GratitudeContent;
  theme: ThemeConfig;
  lang: Language;
  isEditable?: boolean;
  onChange: (field: string, value: any) => void;
  inkSaverMode?: boolean;
}

export const GratitudeTemplate: React.FC<GratitudeTemplateProps> = ({
  content,
  theme,
  lang,
  isEditable,
  onChange,
  inkSaverMode,
}) => {
  const isId = lang === 'id';

  const handleItemChange = (index: number, val: string) => {
    const next = [...(content.threeGratefulThings || ['', '', ''])] as [string, string, string];
    next[index] = val;
    onChange('threeGratefulThings', next);
  };

  return (
    <div className="w-full h-full p-4 sm:p-8 flex flex-col space-y-5 max-w-3xl mx-auto">
      {/* Top Banner */}
      <div
        className="p-5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-center sm:text-left"
        style={{
          borderColor: theme.borderColor,
          backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center border"
            style={{ borderColor: theme.accentColor, color: theme.primaryColor }}
          >
            <Sun className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 font-sans-clean block">
              {isId ? 'Latihan Kesadaran Positif' : 'Mindful Appreciation'}
            </span>
            <h2 className="text-2xl font-serif-display font-bold" style={{ color: theme.primaryColor }}>
              {isId ? 'Jurnal Rasa Syukur (Gratitude)' : 'Gratitude Journal'}
            </h2>
          </div>
        </div>

        {isEditable ? (
          <input
            type="date"
            value={content.date || ''}
            onChange={(e) => onChange('date', e.target.value)}
            className="text-xs font-semibold text-stone-600 bg-transparent border-b border-stone-200 focus:outline-none"
          />
        ) : (
          <span className="text-xs font-semibold text-stone-600">{content.date}</span>
        )}
      </div>

      {/* 3 Things I am Grateful For */}
      <div
        className="p-5 rounded-xl border space-y-4"
        style={{
          borderColor: theme.borderColor,
          backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
        }}
      >
        <div className="flex items-center gap-2 border-b pb-2" style={{ borderColor: theme.borderColor }}>
          <Sparkles className="w-4 h-4 text-amber-500" />
          <h3 className="font-serif-classic font-bold text-base" style={{ color: theme.primaryColor }}>
            {isId ? 'Tiga Hal yang Sangat Disyukuri Hari Ini' : 'Three Things I am Deeply Grateful For Today'}
          </h3>
        </div>

        {[0, 1, 2].map((idx) => (
          <div key={idx} className="flex items-start gap-3">
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5"
              style={{ backgroundColor: theme.accentColor + '25', color: theme.primaryColor }}
            >
              {idx + 1}
            </span>
            {isEditable ? (
              <textarea
                value={(content.threeGratefulThings && content.threeGratefulThings[idx]) || ''}
                onChange={(e) => handleItemChange(idx, e.target.value)}
                placeholder={`Hal yang disyukuri #${idx + 1}...`}
                rows={2}
                className="w-full text-xs sm:text-sm font-serif-reading italic bg-transparent border-b border-stone-200 focus:border-stone-500 focus:outline-none py-1 resize-none"
                style={{ color: theme.textColor }}
              />
            ) : (
              <p className="text-xs sm:text-sm font-serif-reading italic py-1" style={{ color: theme.textColor }}>
                {content.threeGratefulThings && content.threeGratefulThings[idx]}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Two columns: Tiny Joyful Moment & Meaningful Person */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Tiny joyful moment */}
        <div
          className="p-5 rounded-xl border flex flex-col justify-between"
          style={{
            borderColor: theme.borderColor,
            backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
          }}
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Smile className="w-4 h-4 text-emerald-600" />
              <h3 className="text-xs uppercase tracking-wider font-bold text-stone-600 font-sans-clean">
                {isId ? 'Momen Kecil yang Menyenangkan' : 'A Tiny Joyful Moment'}
              </h3>
            </div>
            {isEditable ? (
              <textarea
                value={content.tinyJoyfulMoment || ''}
                onChange={(e) => onChange('tinyJoyfulMoment', e.target.value)}
                placeholder="Hal kecil yang membuat tersenyum..."
                rows={3}
                className="w-full text-xs sm:text-sm font-serif-reading italic bg-transparent border border-transparent hover:border-stone-200 focus:outline-none rounded p-1 resize-none"
                style={{ color: theme.textColor }}
              />
            ) : (
              <p className="text-xs sm:text-sm font-serif-reading italic" style={{ color: theme.textColor }}>
                {content.tinyJoyfulMoment}
              </p>
            )}
          </div>
        </div>

        {/* Meaningful Person */}
        <div
          className="p-5 rounded-xl border flex flex-col justify-between"
          style={{
            borderColor: theme.borderColor,
            backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
          }}
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-indigo-500" />
              <h3 className="text-xs uppercase tracking-wider font-bold text-stone-600 font-sans-clean">
                {isId ? 'Orang atau Interaksi Bermakna' : 'A Meaningful Person / Connection'}
              </h3>
            </div>
            {isEditable ? (
              <textarea
                value={content.meaningfulPerson || ''}
                onChange={(e) => onChange('meaningfulPerson', e.target.value)}
                placeholder="Seseorang yang membawa kebaikan atau senyuman hari ini..."
                rows={3}
                className="w-full text-xs sm:text-sm font-serif-reading italic bg-transparent border border-transparent hover:border-stone-200 focus:outline-none rounded p-1 resize-none"
                style={{ color: theme.textColor }}
              />
            ) : (
              <p className="text-xs sm:text-sm font-serif-reading italic" style={{ color: theme.textColor }}>
                {content.meaningfulPerson}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Deep Reflection */}
      <div
        className="p-5 rounded-xl border flex-1"
        style={{
          borderColor: theme.borderColor,
          backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Heart className="w-4 h-4 text-rose-500" />
          <h3 className="text-xs uppercase tracking-wider font-bold text-stone-600 font-sans-clean">
            {isId ? 'Refleksi Pribadi Tentang Berkah Hidup' : 'Personal Reflection on Blessings'}
          </h3>
        </div>
        {isEditable ? (
          <textarea
            value={content.deepReflection || ''}
            onChange={(e) => onChange('deepReflection', e.target.value)}
            placeholder="Bagaimana rasa syukur ini mengubah cara pandangmu terhadap harimu?"
            rows={3}
            className="w-full text-xs sm:text-sm font-serif-reading italic bg-transparent border border-transparent hover:border-stone-200 focus:outline-none rounded p-1 resize-none leading-relaxed"
            style={{ color: theme.textColor }}
          />
        ) : (
          <p className="text-xs sm:text-sm font-serif-reading italic leading-relaxed" style={{ color: theme.textColor }}>
            {content.deepReflection}
          </p>
        )}
      </div>
    </div>
  );
};
