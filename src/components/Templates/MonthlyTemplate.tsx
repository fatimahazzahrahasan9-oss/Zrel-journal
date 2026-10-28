import React from 'react';
import { MonthlyContent, ThemeConfig, Language, MonthlyGoal, MonthlyAgendaItem } from '../../types/journal';
import { Calendar, CheckSquare, Square, Plus, Trash2, Milestone } from 'lucide-react';

interface MonthlyTemplateProps {
  content: MonthlyContent;
  theme: ThemeConfig;
  lang: Language;
  isEditable?: boolean;
  onChange: (field: string, value: any) => void;
  inkSaverMode?: boolean;
}

export const MonthlyTemplate: React.FC<MonthlyTemplateProps> = ({
  content,
  theme,
  lang,
  isEditable,
  onChange,
  inkSaverMode,
}) => {
  const isId = lang === 'id';

  const handleToggleGoal = (id: string) => {
    const next = (content.goals || []).map((g) => (g.id === id ? { ...g, done: !g.done } : g));
    onChange('goals', next);
  };

  const handleAddGoal = () => {
    const newGoal: MonthlyGoal = {
      id: `mgoal_${Date.now()}`,
      goal: '',
      done: false,
    };
    onChange('goals', [...(content.goals || []), newGoal]);
  };

  const handleGoalText = (id: string, text: string) => {
    const next = (content.goals || []).map((g) => (g.id === id ? { ...g, goal: text } : g));
    onChange('goals', next);
  };

  const handleDeleteGoal = (id: string) => {
    const next = (content.goals || []).filter((g) => g.id !== id);
    onChange('goals', next);
  };

  const handleAddAgenda = () => {
    const item: MonthlyAgendaItem = {
      id: `magenda_${Date.now()}`,
      date: '15 Okt',
      event: '',
    };
    onChange('agenda', [...(content.agenda || []), item]);
  };

  const handleAgendaChange = (id: string, field: 'date' | 'event', val: string) => {
    const next = (content.agenda || []).map((a) => (a.id === id ? { ...a, [field]: val } : a));
    onChange('agenda', next);
  };

  const handleDeleteAgenda = (id: string) => {
    const next = (content.agenda || []).filter((a) => a.id !== id);
    onChange('agenda', next);
  };

  return (
    <div className="w-full h-full p-4 sm:p-8 flex flex-col space-y-5 max-w-4xl mx-auto">
      {/* Month Header Banner */}
      <div
        className="p-5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        style={{
          borderColor: theme.borderColor,
          backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
        }}
      >
        <div className="flex items-center gap-3">
          <Calendar className="w-6 h-6" style={{ color: theme.accentColor }} />
          <div>
            <div className="flex items-center gap-2">
              {isEditable ? (
                <input
                  type="text"
                  value={content.monthName || ''}
                  onChange={(e) => onChange('monthName', e.target.value)}
                  placeholder="Bulan..."
                  className="text-2xl font-serif-display font-bold bg-transparent border-b border-transparent hover:border-stone-300 focus:outline-none"
                  style={{ color: theme.primaryColor }}
                />
              ) : (
                <span className="text-2xl font-serif-display font-bold" style={{ color: theme.primaryColor }}>
                  {content.monthName}
                </span>
              )}

              {isEditable ? (
                <input
                  type="text"
                  value={content.year || ''}
                  onChange={(e) => onChange('year', e.target.value)}
                  placeholder="2026"
                  className="text-lg font-serif-display font-medium text-stone-500 bg-transparent border-b border-transparent hover:border-stone-300 focus:outline-none w-16"
                />
              ) : (
                <span className="text-lg font-serif-display font-medium text-stone-500">{content.year}</span>
              )}
            </div>
            <p className="text-xs text-stone-500 font-sans-clean">
              {isId ? 'Perencanaan & Refleksi Bulanan' : 'Monthly Overview & Planning'}
            </p>
          </div>
        </div>

        {/* Habits Summary */}
        <div className="text-xs max-w-xs font-sans-clean text-stone-600 italic">
          {content.habitsSummary}
        </div>
      </div>

      {/* Grid: Goals & Agenda */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Goals Checklist */}
        <div
          className="p-4 rounded-xl border flex flex-col"
          style={{
            borderColor: theme.borderColor,
            backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
          }}
        >
          <div className="flex items-center justify-between mb-3 border-b pb-2" style={{ borderColor: theme.borderColor }}>
            <h3 className="font-serif-classic font-bold text-sm" style={{ color: theme.primaryColor }}>
              {isId ? 'Target & Sasaran Bulan Ini' : 'Monthly Targets & Goals'}
            </h3>
            {isEditable && (
              <button
                type="button"
                onClick={handleAddGoal}
                className="text-xs flex items-center gap-1 text-stone-500 hover:text-stone-800"
              >
                <Plus className="w-3.5 h-3.5" /> {isId ? 'Tambah' : 'Add'}
              </button>
            )}
          </div>

          <div className="space-y-2 flex-1">
            {(content.goals || []).map((goal) => (
              <div key={goal.id} className="flex items-center gap-2 group text-xs sm:text-sm">
                <button
                  type="button"
                  onClick={() => handleToggleGoal(goal.id)}
                  className="text-stone-400 hover:text-stone-700 shrink-0"
                >
                  {goal.done ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Square className="w-4 h-4" />
                  )}
                </button>
                {isEditable ? (
                  <input
                    type="text"
                    value={goal.goal}
                    onChange={(e) => handleGoalText(goal.id, e.target.value)}
                    placeholder="Sasaran bulanan..."
                    className={`w-full bg-transparent border-b border-transparent focus:border-stone-300 focus:outline-none py-0.5 ${
                      goal.done ? 'line-through text-stone-400' : 'text-stone-700'
                    }`}
                  />
                ) : (
                  <span
                    className={`w-full ${goal.done ? 'line-through text-stone-400' : 'text-stone-700'}`}
                  >
                    {goal.goal}
                  </span>
                )}
                {isEditable && (
                  <button
                    type="button"
                    onClick={() => handleDeleteGoal(goal.id)}
                    className="opacity-0 group-hover:opacity-100 text-stone-400 hover:text-rose-500 shrink-0"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Important Agenda Dates */}
        <div
          className="p-4 rounded-xl border flex flex-col"
          style={{
            borderColor: theme.borderColor,
            backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
          }}
        >
          <div className="flex items-center justify-between mb-3 border-b pb-2" style={{ borderColor: theme.borderColor }}>
            <h3 className="font-serif-classic font-bold text-sm" style={{ color: theme.primaryColor }}>
              {isId ? 'Agenda & Tanggal Penting' : 'Important Dates & Agenda'}
            </h3>
            {isEditable && (
              <button
                type="button"
                onClick={handleAddAgenda}
                className="text-xs flex items-center gap-1 text-stone-500 hover:text-stone-800"
              >
                <Plus className="w-3.5 h-3.5" /> {isId ? 'Tambah' : 'Add'}
              </button>
            )}
          </div>

          <div className="space-y-2 flex-1">
            {(content.agenda || []).map((ag) => (
              <div key={ag.id} className="flex items-center gap-2 group text-xs sm:text-sm">
                {isEditable ? (
                  <input
                    type="text"
                    value={ag.date}
                    onChange={(e) => handleAgendaChange(ag.id, 'date', e.target.value)}
                    placeholder="15 Okt"
                    className="w-16 font-mono text-xs font-semibold bg-transparent border-b border-stone-200 focus:outline-none shrink-0"
                    style={{ color: theme.accentColor }}
                  />
                ) : (
                  <span className="w-16 font-mono text-xs font-semibold shrink-0" style={{ color: theme.accentColor }}>
                    {ag.date}
                  </span>
                )}

                {isEditable ? (
                  <input
                    type="text"
                    value={ag.event}
                    onChange={(e) => handleAgendaChange(ag.id, 'event', e.target.value)}
                    placeholder="Acara atau tenggat waktu..."
                    className="w-full bg-transparent border-b border-transparent focus:border-stone-300 focus:outline-none py-0.5 text-stone-700"
                  />
                ) : (
                  <span className="w-full text-stone-700">{ag.event}</span>
                )}

                {isEditable && (
                  <button
                    type="button"
                    onClick={() => handleDeleteAgenda(ag.id)}
                    className="opacity-0 group-hover:opacity-100 text-stone-400 hover:text-rose-500 shrink-0"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Reflection & Lessons */}
      <div
        className="p-4 rounded-xl border grid grid-cols-1 md:grid-cols-2 gap-4"
        style={{
          borderColor: theme.borderColor,
          backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
        }}
      >
        <div>
          <span className="text-xs uppercase tracking-wider font-bold text-stone-600 mb-1 block">
            {isId ? '✦ Refleksi & Pencapaian Bulan Ini' : '✦ Monthly Reflection & Wins'}
          </span>
          {isEditable ? (
            <textarea
              value={content.reflection || ''}
              onChange={(e) => onChange('reflection', e.target.value)}
              placeholder="Renungan perjalanan selama satu bulan penuh..."
              rows={3}
              className="w-full text-xs sm:text-sm font-serif-reading italic bg-transparent border border-transparent hover:border-stone-200 focus:outline-none rounded p-1 resize-none"
              style={{ color: theme.textColor }}
            />
          ) : (
            <p className="text-xs sm:text-sm font-serif-reading italic whitespace-pre-wrap" style={{ color: theme.textColor }}>
              {content.reflection}
            </p>
          )}
        </div>

        <div>
          <span className="text-xs uppercase tracking-wider font-bold text-stone-600 mb-1 block">
            {isId ? '✦ Pelajaran Berharga yang Didapatkan' : '✦ Key Lessons Learned'}
          </span>
          {isEditable ? (
            <textarea
              value={content.lessonsLearned || ''}
              onChange={(e) => onChange('lessonsLearned', e.target.value)}
              placeholder="Hikmah dan pembelajaran penting..."
              rows={3}
              className="w-full text-xs sm:text-sm font-serif-reading italic bg-transparent border border-transparent hover:border-stone-200 focus:outline-none rounded p-1 resize-none"
              style={{ color: theme.textColor }}
            />
          ) : (
            <p className="text-xs sm:text-sm font-serif-reading italic whitespace-pre-wrap" style={{ color: theme.textColor }}>
              {content.lessonsLearned}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
