import React from 'react';
import { ClosingContent, ThemeConfig, Language } from '../../types/journal';
import { Sparkles, Award, Heart, Compass, Plus, Trash2 } from 'lucide-react';

interface ClosingTemplateProps {
  content: ClosingContent;
  theme: ThemeConfig;
  lang: Language;
  isEditable?: boolean;
  onChange: (field: string, value: any) => void;
  inkSaverMode?: boolean;
}

export const ClosingTemplate: React.FC<ClosingTemplateProps> = ({
  content,
  theme,
  lang,
  isEditable,
  onChange,
  inkSaverMode,
}) => {
  const isId = lang === 'id';

  const handleAddWin = () => {
    onChange('biggestWins', [...(content.biggestWins || []), '']);
  };

  const handleWinChange = (idx: number, val: string) => {
    const next = [...(content.biggestWins || [])];
    next[idx] = val;
    onChange('biggestWins', next);
  };

  const handleDeleteWin = (idx: number) => {
    const next = (content.biggestWins || []).filter((_, i) => i !== idx);
    onChange('biggestWins', next);
  };

  const handleAddLesson = () => {
    onChange('lessonsLearned', [...(content.lessonsLearned || []), '']);
  };

  const handleLessonChange = (idx: number, val: string) => {
    const next = [...(content.lessonsLearned || [])];
    next[idx] = val;
    onChange('lessonsLearned', next);
  };

  const handleDeleteLesson = (idx: number) => {
    const next = (content.lessonsLearned || []).filter((_, i) => i !== idx);
    onChange('lessonsLearned', next);
  };

  return (
    <div className="w-full h-full p-4 sm:p-10 flex flex-col space-y-6 max-w-3xl mx-auto">
      {/* Header Banner */}
      <div
        className="p-5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        style={{
          borderColor: theme.borderColor,
          backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
        }}
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-amber-500" />
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 font-sans-clean block">
              {isId ? 'Penutupan & Rekapitulasi' : 'Closing & Season Recap'}
            </span>
            <h2 className="text-2xl font-serif-display font-bold" style={{ color: theme.primaryColor }}>
              {isId ? 'Halaman Penutup Jurnal' : 'Journal Closing Pages'}
            </h2>
          </div>
        </div>

        {isEditable ? (
          <input
            type="text"
            value={content.period || ''}
            onChange={(e) => onChange('period', e.target.value)}
            placeholder="Periode Penutupan..."
            className="text-xs font-serif-reading italic text-stone-600 bg-transparent border-b border-stone-200 focus:outline-none"
          />
        ) : (
          <span className="text-xs font-serif-reading italic text-stone-600">{content.period}</span>
        )}
      </div>

      {/* Grid: Biggest Wins & Lessons Learned */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Biggest Wins */}
        <div
          className="p-5 rounded-xl border flex flex-col justify-between"
          style={{
            borderColor: theme.borderColor,
            backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
          }}
        >
          <div>
            <div className="flex items-center justify-between border-b pb-2 mb-3" style={{ borderColor: theme.borderColor }}>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                <h3 className="font-serif-classic font-bold text-sm" style={{ color: theme.primaryColor }}>
                  {isId ? 'Pencapaian Terbesar' : 'Celebrated Achievements'}
                </h3>
              </div>
              {isEditable && (
                <button
                  type="button"
                  onClick={handleAddWin}
                  className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> {isId ? 'Tambah' : 'Add'}
                </button>
              )}
            </div>

            <div className="space-y-2">
              {(content.biggestWins || []).map((win, idx) => (
                <div key={idx} className="flex items-start gap-2 group text-xs sm:text-sm">
                  <span className="text-amber-500 mt-0.5">✦</span>
                  {isEditable ? (
                    <textarea
                      value={win}
                      onChange={(e) => handleWinChange(idx, e.target.value)}
                      placeholder="Pencapaian yang membanggakan..."
                      rows={2}
                      className="w-full bg-transparent border-b border-transparent focus:border-stone-300 focus:outline-none py-0.5 text-stone-700 resize-none font-serif-reading"
                    />
                  ) : (
                    <p className="w-full text-stone-700 font-serif-reading">{win}</p>
                  )}
                  {isEditable && (
                    <button
                      type="button"
                      onClick={() => handleDeleteWin(idx)}
                      className="opacity-0 group-hover:opacity-100 text-stone-300 hover:text-rose-500"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lessons Learned */}
        <div
          className="p-5 rounded-xl border flex flex-col justify-between"
          style={{
            borderColor: theme.borderColor,
            backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
          }}
        >
          <div>
            <div className="flex items-center justify-between border-b pb-2 mb-3" style={{ borderColor: theme.borderColor }}>
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-600" />
                <h3 className="font-serif-classic font-bold text-sm" style={{ color: theme.primaryColor }}>
                  {isId ? 'Pelajaran & Hikmah Berharga' : 'Key Lessons Learned'}
                </h3>
              </div>
              {isEditable && (
                <button
                  type="button"
                  onClick={handleAddLesson}
                  className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> {isId ? 'Tambah' : 'Add'}
                </button>
              )}
            </div>

            <div className="space-y-2">
              {(content.lessonsLearned || []).map((lesson, idx) => (
                <div key={idx} className="flex items-start gap-2 group text-xs sm:text-sm">
                  <span className="text-emerald-600 mt-0.5">✦</span>
                  {isEditable ? (
                    <textarea
                      value={lesson}
                      onChange={(e) => handleLessonChange(idx, e.target.value)}
                      placeholder="Hikmah hidup yang dipelajari..."
                      rows={2}
                      className="w-full bg-transparent border-b border-transparent focus:border-stone-300 focus:outline-none py-0.5 text-stone-700 resize-none font-serif-reading"
                    />
                  ) : (
                    <p className="w-full text-stone-700 font-serif-reading">{lesson}</p>
                  )}
                  {isEditable && (
                    <button
                      type="button"
                      onClick={() => handleDeleteLesson(idx)}
                      className="opacity-0 group-hover:opacity-100 text-stone-300 hover:text-rose-500"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Heartfelt Letter to Future Self */}
      <div
        className="p-6 rounded-xl border flex-1"
        style={{
          borderColor: theme.borderColor,
          backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Heart className="w-4 h-4 text-rose-500" />
          <h3 className="text-xs uppercase tracking-wider font-bold text-stone-600 font-sans-clean">
            {isId ? 'Surat Tulus untuk Diri Sendiri di Masa Depan' : 'Heartfelt Letter to Future Self'}
          </h3>
        </div>
        {isEditable ? (
          <textarea
            value={content.letterToSelf || ''}
            onChange={(e) => onChange('letterToSelf', e.target.value)}
            placeholder="Tuliskan pesan kasih sayang, pengingat ketenangan, dan harapan untuk dirimu di hari esok..."
            rows={5}
            className="w-full text-xs sm:text-sm font-serif-reading italic leading-relaxed bg-transparent border border-transparent hover:border-stone-200 focus:outline-none rounded p-1.5 resize-none"
            style={{ color: theme.textColor }}
          />
        ) : (
          <p className="text-xs sm:text-sm font-serif-reading italic leading-relaxed whitespace-pre-wrap" style={{ color: theme.textColor }}>
            {content.letterToSelf}
          </p>
        )}
      </div>

      {/* Growth Intentions */}
      <div
        className="p-4 rounded-xl border"
        style={{
          borderColor: theme.borderColor,
          backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
        }}
      >
        <span className="text-xs uppercase tracking-wider font-bold text-stone-600 block mb-1 font-sans-clean">
          {isId ? '✦ Niat & Arah Pertumbuhan untuk Musim Berikutnya' : '✦ Growth Intentions for the Next Season'}
        </span>
        {isEditable ? (
          <input
            type="text"
            value={content.growthIntentions || ''}
            onChange={(e) => onChange('growthIntentions', e.target.value)}
            placeholder="Hal apa yang ingin kamu rawat lebih banyak ke depannya?"
            className="w-full text-xs sm:text-sm font-serif-reading italic bg-transparent border-b border-stone-200 focus:outline-none py-1"
            style={{ color: theme.textColor }}
          />
        ) : (
          <p className="text-xs sm:text-sm font-serif-reading italic" style={{ color: theme.textColor }}>
            {content.growthIntentions}
          </p>
        )}
      </div>
    </div>
  );
};
