import React from 'react';
import { FreeWritingContent, ThemeConfig, Language } from '../../types/journal';
import { Feather, Quote, Plus, Trash2, CheckSquare, Square } from 'lucide-react';

interface FreeWritingTemplateProps {
  content: FreeWritingContent;
  theme: ThemeConfig;
  lang: Language;
  isEditable?: boolean;
  onChange: (field: string, value: any) => void;
  inkSaverMode?: boolean;
}

export const FreeWritingTemplate: React.FC<FreeWritingTemplateProps> = ({
  content,
  theme,
  lang,
  isEditable,
  onChange,
  inkSaverMode,
}) => {
  const isId = lang === 'id';

  const handleAddBullet = () => {
    onChange('bullets', [...(content.bullets || []), '']);
  };

  const handleBulletChange = (index: number, val: string) => {
    const next = [...(content.bullets || [])];
    next[index] = val;
    onChange('bullets', next);
  };

  const handleDeleteBullet = (index: number) => {
    const next = (content.bullets || []).filter((_, i) => i !== index);
    onChange('bullets', next);
  };

  const handleAddChecklist = () => {
    const next = [
      ...(content.checklist || []),
      { id: `chk_${Date.now()}`, text: '', done: false },
    ];
    onChange('checklist', next);
  };

  const handleToggleChecklist = (id: string) => {
    const next = (content.checklist || []).map((c) => (c.id === id ? { ...c, done: !c.done } : c));
    onChange('checklist', next);
  };

  const handleChecklistText = (id: string, text: string) => {
    const next = (content.checklist || []).map((c) => (c.id === id ? { ...c, text } : c));
    onChange('checklist', next);
  };

  const handleDeleteChecklist = (id: string) => {
    const next = (content.checklist || []).filter((c) => c.id !== id);
    onChange('checklist', next);
  };

  return (
    <div className="w-full h-full p-4 sm:p-10 flex flex-col space-y-6 max-w-3xl mx-auto">
      {/* Title & Subtitle */}
      <div className="border-b pb-4" style={{ borderColor: theme.borderColor }}>
        {isEditable ? (
          <input
            type="text"
            value={content.title || ''}
            onChange={(e) => onChange('title', e.target.value)}
            placeholder="Judul Esai atau Pemikiran..."
            className="w-full font-serif-display font-bold text-2xl sm:text-3xl bg-transparent border-b border-transparent hover:border-stone-300 focus:outline-none py-1"
            style={{ color: theme.primaryColor }}
          />
        ) : (
          <h2 className="font-serif-display font-bold text-2xl sm:text-3xl" style={{ color: theme.primaryColor }}>
            {content.title}
          </h2>
        )}

        {isEditable ? (
          <input
            type="text"
            value={content.subtitle || ''}
            onChange={(e) => onChange('subtitle', e.target.value)}
            placeholder="Subjudul atau konteks catatan..."
            className="w-full font-serif-reading italic text-sm text-stone-500 bg-transparent border-b border-transparent hover:border-stone-200 focus:outline-none py-0.5 mt-1"
          />
        ) : (
          <p className="font-serif-reading italic text-sm text-stone-500 mt-1">{content.subtitle}</p>
        )}
      </div>

      {/* Main Longform Prose Textarea */}
      <div
        className="p-6 rounded-xl border flex-1"
        style={{
          borderColor: theme.borderColor,
          backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
        }}
      >
        {isEditable ? (
          <textarea
            value={content.body || ''}
            onChange={(e) => onChange('body', e.target.value)}
            placeholder="Mulai tuangkan tulisan bebas Anda di sini. Biarkan ide mengalir tanpa hambatan..."
            rows={10}
            className="w-full text-sm sm:text-base font-serif-reading leading-relaxed bg-transparent border-none focus:outline-none resize-none"
            style={{ color: theme.textColor }}
          />
        ) : (
          <div className="text-sm sm:text-base font-serif-reading leading-relaxed whitespace-pre-wrap" style={{ color: theme.textColor }}>
            {content.body}
          </div>
        )}
      </div>

      {/* Elegant Centered Pull Quote */}
      <div
        className="p-6 rounded-xl border text-center relative flex flex-col items-center"
        style={{
          borderColor: theme.borderColor,
          backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
        }}
      >
        <Quote className="w-5 h-5 opacity-40 mb-2" style={{ color: theme.accentColor }} />
        {isEditable ? (
          <textarea
            value={content.quote || ''}
            onChange={(e) => onChange('quote', e.target.value)}
            placeholder="Kutipan berkesan atau kalimat mutiara..."
            rows={2}
            className="w-full text-center text-sm sm:text-base font-serif-reading italic bg-transparent border-none focus:outline-none resize-none"
            style={{ color: theme.primaryColor }}
          />
        ) : (
          <blockquote className="text-sm sm:text-base font-serif-reading italic" style={{ color: theme.primaryColor }}>
            {content.quote}
          </blockquote>
        )}

        {isEditable ? (
          <input
            type="text"
            value={content.quoteAuthor || ''}
            onChange={(e) => onChange('quoteAuthor', e.target.value)}
            placeholder="— Sumber / Penulis"
            className="text-xs uppercase tracking-widest text-stone-400 font-sans-clean text-center bg-transparent border-b border-transparent focus:outline-none mt-2"
          />
        ) : (
          <cite className="text-xs uppercase tracking-widest text-stone-400 font-sans-clean not-italic mt-2">
            — {content.quoteAuthor}
          </cite>
        )}
      </div>

      {/* Split: Key Takeaway Bullets & Action Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Bullets */}
        <div
          className="p-4 rounded-xl border"
          style={{
            borderColor: theme.borderColor,
            backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
          }}
        >
          <div className="flex items-center justify-between mb-2 border-b pb-1.5" style={{ borderColor: theme.borderColor }}>
            <span className="text-xs uppercase tracking-wider font-bold text-stone-600 font-sans-clean">
              {isId ? 'Poin-Poin Utama' : 'Key Takeaways'}
            </span>
            {isEditable && (
              <button
                type="button"
                onClick={handleAddBullet}
                className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> {isId ? 'Tambah' : 'Add'}
              </button>
            )}
          </div>

          <div className="space-y-1.5">
            {(content.bullets || []).map((b, idx) => (
              <div key={idx} className="flex items-center gap-2 group text-xs sm:text-sm">
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: theme.accentColor }} />
                {isEditable ? (
                  <input
                    type="text"
                    value={b}
                    onChange={(e) => handleBulletChange(idx, e.target.value)}
                    placeholder="Poin penting..."
                    className="w-full bg-transparent border-b border-transparent focus:outline-none py-0.5 text-stone-700"
                  />
                ) : (
                  <span className="w-full text-stone-700">{b}</span>
                )}
                {isEditable && (
                  <button
                    type="button"
                    onClick={() => handleDeleteBullet(idx)}
                    className="opacity-0 group-hover:opacity-100 text-stone-300 hover:text-rose-500 shrink-0"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Checklist */}
        <div
          className="p-4 rounded-xl border"
          style={{
            borderColor: theme.borderColor,
            backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
          }}
        >
          <div className="flex items-center justify-between mb-2 border-b pb-1.5" style={{ borderColor: theme.borderColor }}>
            <span className="text-xs uppercase tracking-wider font-bold text-stone-600 font-sans-clean">
              {isId ? 'Daftar Periksa Terkait' : 'Related Checklist'}
            </span>
            {isEditable && (
              <button
                type="button"
                onClick={handleAddChecklist}
                className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> {isId ? 'Tambah' : 'Add'}
              </button>
            )}
          </div>

          <div className="space-y-1.5">
            {(content.checklist || []).map((item) => (
              <div key={item.id} className="flex items-center gap-2 group text-xs sm:text-sm">
                <button
                  type="button"
                  onClick={() => handleToggleChecklist(item.id)}
                  className="text-stone-400 hover:text-stone-700 shrink-0"
                >
                  {item.done ? (
                    <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Square className="w-3.5 h-3.5" />
                  )}
                </button>
                {isEditable ? (
                  <input
                    type="text"
                    value={item.text}
                    onChange={(e) => handleChecklistText(item.id, e.target.value)}
                    placeholder="Centang..."
                    className={`w-full bg-transparent border-b border-transparent focus:outline-none py-0.5 ${
                      item.done ? 'line-through text-stone-400' : 'text-stone-700'
                    }`}
                  />
                ) : (
                  <span className={`w-full ${item.done ? 'line-through text-stone-400' : 'text-stone-700'}`}>
                    {item.text}
                  </span>
                )}
                {isEditable && (
                  <button
                    type="button"
                    onClick={() => handleDeleteChecklist(item.id)}
                    className="opacity-0 group-hover:opacity-100 text-stone-300 hover:text-rose-500 shrink-0"
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
  );
};
