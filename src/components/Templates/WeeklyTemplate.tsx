import React from 'react';
import { WeeklyContent, ThemeConfig, Language, WeeklyDayPlan } from '../../types/journal';
import { Calendar, CheckCircle2, Plus, Trash2, ArrowUpRight } from 'lucide-react';

interface WeeklyTemplateProps {
  content: WeeklyContent;
  theme: ThemeConfig;
  lang: Language;
  isEditable?: boolean;
  onChange: (field: string, value: any) => void;
  inkSaverMode?: boolean;
}

export const WeeklyTemplate: React.FC<WeeklyTemplateProps> = ({
  content,
  theme,
  lang,
  isEditable,
  onChange,
  inkSaverMode,
}) => {
  const isId = lang === 'id';

  const handleDayTaskChange = (dayIndex: number, taskIndex: number, val: string) => {
    const nextDays = [...(content.days || [])];
    const targetDay = { ...nextDays[dayIndex] };
    const tasks = [...targetDay.tasks];
    tasks[taskIndex] = val;
    targetDay.tasks = tasks;
    nextDays[dayIndex] = targetDay;
    onChange('days', nextDays);
  };

  const handleAddDayTask = (dayIndex: number) => {
    const nextDays = [...(content.days || [])];
    const targetDay = { ...nextDays[dayIndex] };
    targetDay.tasks = [...targetDay.tasks, ''];
    nextDays[dayIndex] = targetDay;
    onChange('days', nextDays);
  };

  const handleDeleteDayTask = (dayIndex: number, taskIndex: number) => {
    const nextDays = [...(content.days || [])];
    const targetDay = { ...nextDays[dayIndex] };
    targetDay.tasks = targetDay.tasks.filter((_, idx) => idx !== taskIndex);
    nextDays[dayIndex] = targetDay;
    onChange('days', nextDays);
  };

  const handleAddTarget = () => {
    onChange('targets', [...(content.targets || []), '']);
  };

  const handleTargetChange = (idx: number, val: string) => {
    const next = [...(content.targets || [])];
    next[idx] = val;
    onChange('targets', next);
  };

  const handleDeleteTarget = (idx: number) => {
    const next = (content.targets || []).filter((_, i) => i !== idx);
    onChange('targets', next);
  };

  return (
    <div className="w-full h-full p-4 sm:p-8 flex flex-col space-y-5 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div
        className="p-5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        style={{
          borderColor: theme.borderColor,
          backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
        }}
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-4 h-4" style={{ color: theme.accentColor }} />
            {isEditable ? (
              <input
                type="text"
                value={content.weekRange || ''}
                onChange={(e) => onChange('weekRange', e.target.value)}
                placeholder="26 Okt - 01 Nov 2026..."
                className="text-xs font-semibold uppercase tracking-wider text-stone-500 bg-transparent border-b border-transparent hover:border-stone-300 focus:outline-none"
              />
            ) : (
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                {content.weekRange}
              </span>
            )}
          </div>
          <h2 className="text-2xl font-serif-display font-bold" style={{ color: theme.primaryColor }}>
            {isId ? 'Perencana Mingguan' : 'Weekly Planner'}
          </h2>
        </div>

        {/* Weekly Priority Banner */}
        <div className="max-w-md w-full">
          <span className="text-[11px] uppercase tracking-wider font-bold text-stone-500 block mb-0.5">
            {isId ? 'Prioritas Pekan Ini' : 'Weekly Focal Priority'}
          </span>
          {isEditable ? (
            <input
              type="text"
              value={content.weeklyPriority || ''}
              onChange={(e) => onChange('weeklyPriority', e.target.value)}
              placeholder="Fokus terbesar pekan ini..."
              className="w-full text-xs sm:text-sm font-serif-reading italic bg-transparent border-b border-stone-200 focus:border-stone-500 focus:outline-none py-1"
              style={{ color: theme.primaryColor }}
            />
          ) : (
            <p className="text-xs sm:text-sm font-serif-reading italic" style={{ color: theme.primaryColor }}>
              {content.weeklyPriority}
            </p>
          )}
        </div>
      </div>

      {/* 7 Days Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {(content.days || []).map((day, dIdx) => (
          <div
            key={dIdx}
            className={`p-3.5 rounded-xl border flex flex-col justify-between ${
              dIdx === 6 ? 'sm:col-span-2 lg:col-span-1' : ''
            }`}
            style={{
              borderColor: theme.borderColor,
              backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
            }}
          >
            <div>
              <div className="flex items-center justify-between border-b pb-2 mb-2" style={{ borderColor: theme.borderColor }}>
                <div>
                  <h3 className="font-serif-classic font-bold text-sm" style={{ color: theme.primaryColor }}>
                    {day.dayName}
                  </h3>
                  <span className="text-[11px] text-stone-400">{day.dateStr}</span>
                </div>
                {isEditable && (
                  <button
                    type="button"
                    onClick={() => handleAddDayTask(dIdx)}
                    className="text-stone-400 hover:text-stone-700 p-0.5"
                    title="Tambah agenda"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="space-y-1.5 min-h-24">
                {(day.tasks || []).map((t, tIdx) => (
                  <div key={tIdx} className="flex items-center gap-1.5 group text-xs">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: theme.accentColor }} />
                    {isEditable ? (
                      <input
                        type="text"
                        value={t}
                        onChange={(e) => handleDayTaskChange(dIdx, tIdx, e.target.value)}
                        placeholder="Agenda..."
                        className="w-full bg-transparent border-b border-transparent hover:border-stone-200 focus:outline-none py-0.5"
                        style={{ color: theme.textColor }}
                      />
                    ) : (
                      <span className="w-full" style={{ color: theme.textColor }}>
                        {t}
                      </span>
                    )}
                    {isEditable && (
                      <button
                        type="button"
                        onClick={() => handleDeleteDayTask(dIdx, tIdx)}
                        className="opacity-0 group-hover:opacity-100 text-stone-400 hover:text-rose-500"
                      >
                        <Trash2 className="w-2.5 h-2.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Weekly Targets Box in the 8th slot */}
        <div
          className="p-3.5 rounded-xl border flex flex-col justify-between"
          style={{
            borderColor: theme.borderColor,
            backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
          }}
        >
          <div>
            <div className="flex items-center justify-between border-b pb-2 mb-2" style={{ borderColor: theme.borderColor }}>
              <h3 className="font-serif-classic font-bold text-sm" style={{ color: theme.primaryColor }}>
                {isId ? 'Target Mingguan' : 'Weekly Targets'}
              </h3>
              {isEditable && (
                <button
                  type="button"
                  onClick={handleAddTarget}
                  className="text-stone-400 hover:text-stone-700 p-0.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="space-y-1.5 min-h-24">
              {(content.targets || []).map((tg, tgIdx) => (
                <div key={tgIdx} className="flex items-center gap-1.5 group text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  {isEditable ? (
                    <input
                      type="text"
                      value={tg}
                      onChange={(e) => handleTargetChange(tgIdx, e.target.value)}
                      placeholder="Target..."
                      className="w-full bg-transparent border-b border-transparent hover:border-stone-200 focus:outline-none py-0.5"
                    />
                  ) : (
                    <span className="w-full text-stone-700">{tg}</span>
                  )}
                  {isEditable && (
                    <button
                      type="button"
                      onClick={() => handleDeleteTarget(tgIdx)}
                      className="opacity-0 group-hover:opacity-100 text-stone-400 hover:text-rose-500"
                    >
                      <Trash2 className="w-2.5 h-2.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Reflection: What Worked and What to Improve */}
      <div
        className="p-4 rounded-xl border grid grid-cols-1 md:grid-cols-2 gap-4"
        style={{
          borderColor: theme.borderColor,
          backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
        }}
      >
        <div>
          <span className="text-xs uppercase tracking-wider font-bold text-emerald-700 mb-1 block">
            {isId ? '✦ Hal yang Berhasil / Berjalan Lancar' : '✦ What Worked Well'}
          </span>
          {isEditable ? (
            <textarea
              value={content.reflection?.whatWorked || ''}
              onChange={(e) =>
                onChange('reflection', { ...(content.reflection || {}), whatWorked: e.target.value })
              }
              placeholder="Keberhasilan kecil yang patut dirayakan pekan ini..."
              rows={2}
              className="w-full text-xs sm:text-sm font-serif-reading italic bg-transparent border border-transparent hover:border-stone-200 focus:outline-none rounded p-1 resize-none"
              style={{ color: theme.textColor }}
            />
          ) : (
            <p className="text-xs sm:text-sm font-serif-reading italic" style={{ color: theme.textColor }}>
              {content.reflection?.whatWorked}
            </p>
          )}
        </div>

        <div>
          <span className="text-xs uppercase tracking-wider font-bold text-stone-600 mb-1 block">
            {isId ? '✦ Pelajaran & Hal yang Perlu Diperbaiki' : '✦ Lessons & Areas to Improve'}
          </span>
          {isEditable ? (
            <textarea
              value={content.reflection?.whatToImprove || ''}
              onChange={(e) =>
                onChange('reflection', { ...(content.reflection || {}), whatToImprove: e.target.value })
              }
              placeholder="Penyesuaian untuk pekan mendatang..."
              rows={2}
              className="w-full text-xs sm:text-sm font-serif-reading italic bg-transparent border border-transparent hover:border-stone-200 focus:outline-none rounded p-1 resize-none"
              style={{ color: theme.textColor }}
            />
          ) : (
            <p className="text-xs sm:text-sm font-serif-reading italic" style={{ color: theme.textColor }}>
              {content.reflection?.whatToImprove}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
