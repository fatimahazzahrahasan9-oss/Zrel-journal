import React from 'react';
import { HabitContent, ThemeConfig, Language, HabitItem } from '../../types/journal';
import { Check, Plus, Trash2, CheckCircle, Flame, Sparkles } from 'lucide-react';
import { calculateHabitCompletionRate } from '../../utils/journalLogic';

interface HabitTemplateProps {
  content: HabitContent;
  theme: ThemeConfig;
  lang: Language;
  isEditable?: boolean;
  onChange: (field: string, value: any) => void;
  inkSaverMode?: boolean;
}

export const HabitTemplate: React.FC<HabitTemplateProps> = ({
  content,
  theme,
  lang,
  isEditable,
  onChange,
  inkSaverMode,
}) => {
  const isId = lang === 'id';
  const habits = content.habits || [];
  const stats = calculateHabitCompletionRate(habits);

  const daysHeader = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
  const daysHeaderEn = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const handleToggleDay = (habitId: string, dayIndex: number) => {
    const next = habits.map((h) => {
      if (h.id === habitId) {
        const nextHist = [...h.history];
        nextHist[dayIndex] = !nextHist[dayIndex];
        return { ...h, history: nextHist };
      }
      return h;
    });
    onChange('habits', next);
  };

  const handleAddHabit = () => {
    const newHabit: HabitItem = {
      id: `h_${Date.now()}`,
      name: '',
      category: isId ? 'Kesehatan' : 'Wellness',
      targetPerWeek: 5,
      history: [false, false, false, false, false, false, false],
    };
    onChange('habits', [...habits, newHabit]);
  };

  const handleHabitName = (id: string, name: string) => {
    const next = habits.map((h) => (h.id === id ? { ...h, name } : h));
    onChange('habits', next);
  };

  const handleHabitCategory = (id: string, category: string) => {
    const next = habits.map((h) => (h.id === id ? { ...h, category } : h));
    onChange('habits', next);
  };

  const handleDeleteHabit = (id: string) => {
    const next = habits.filter((h) => h.id !== id);
    onChange('habits', next);
  };

  return (
    <div className="w-full h-full p-4 sm:p-8 flex flex-col space-y-5 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div
        className="p-5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        style={{
          borderColor: theme.borderColor,
          backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
        }}
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            {isEditable ? (
              <input
                type="text"
                value={content.monthYear || ''}
                onChange={(e) => onChange('monthYear', e.target.value)}
                placeholder="Oktober 2026..."
                className="text-xs font-semibold uppercase tracking-wider text-stone-500 bg-transparent border-b border-transparent hover:border-stone-300 focus:outline-none"
              />
            ) : (
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                {content.monthYear}
              </span>
            )}
          </div>
          <h2 className="text-2xl font-serif-display font-bold" style={{ color: theme.primaryColor }}>
            {isId ? 'Pelacak Kebiasaan Lembut' : 'Gentle Habit Tracker'}
          </h2>
        </div>

        {/* Completion Progress Indicator */}
        <div className="flex items-center gap-4 bg-stone-100/70 px-4 py-2.5 rounded-lg border border-stone-200">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 block">
              {isId ? 'Konsistensi Pekanan' : 'Weekly Consistency'}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold font-mono text-stone-800">{stats.percentage}%</span>
              <span className="text-xs text-stone-500">({stats.completedCount}/{stats.totalChecks})</span>
            </div>
          </div>
          <div className="w-20 bg-stone-200 h-2.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full transition-all duration-300"
              style={{ width: `${stats.percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Habits Table / Grid */}
      <div
        className="p-5 rounded-xl border overflow-x-auto"
        style={{
          borderColor: theme.borderColor,
          backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
        }}
      >
        <div className="flex items-center justify-between mb-4 border-b pb-2" style={{ borderColor: theme.borderColor }}>
          <span className="text-xs font-bold uppercase tracking-wider text-stone-600 font-sans-clean">
            {isId ? 'Daftar Kebiasaan Positif' : 'Positive Daily Habits'}
          </span>
          {isEditable && (
            <button
              type="button"
              onClick={handleAddHabit}
              className="text-xs flex items-center gap-1.5 px-3 py-1 rounded-md text-white font-medium shadow-sm transition-colors"
              style={{ backgroundColor: theme.primaryColor }}
            >
              <Plus className="w-3.5 h-3.5" /> {isId ? 'Tambah Kebiasaan' : 'Add Habit'}
            </button>
          )}
        </div>

        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="border-b text-xs text-stone-500 font-sans-clean" style={{ borderColor: theme.borderColor }}>
              <th className="py-2 px-3 font-semibold w-1/2">{isId ? 'Kebiasaan & Kategori' : 'Habit & Category'}</th>
              {(isId ? daysHeader : daysHeaderEn).map((day, idx) => (
                <th key={idx} className="py-2 px-1 text-center font-semibold w-10">
                  {day}
                </th>
              ))}
              <th className="py-2 px-2 text-center font-semibold w-14">{isId ? 'Progres' : 'Rate'}</th>
              {isEditable && <th className="py-2 px-1 w-8"></th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200/60 text-xs sm:text-sm">
            {habits.map((habit) => {
              const checkedDays = habit.history.filter(Boolean).length;
              const rate = Math.round((checkedDays / habit.history.length) * 100);

              return (
                <tr key={habit.id} className="hover:bg-stone-50/50 transition-colors">
                  <td className="py-2.5 px-3">
                    <div className="flex flex-col">
                      {isEditable ? (
                        <input
                          type="text"
                          value={habit.name}
                          onChange={(e) => handleHabitName(habit.id, e.target.value)}
                          placeholder="Nama kebiasaan..."
                          className="font-medium bg-transparent border-b border-transparent hover:border-stone-300 focus:outline-none py-0.5"
                          style={{ color: theme.primaryColor }}
                        />
                      ) : (
                        <span className="font-medium" style={{ color: theme.primaryColor }}>
                          {habit.name}
                        </span>
                      )}

                      {isEditable ? (
                        <input
                          type="text"
                          value={habit.category}
                          onChange={(e) => handleHabitCategory(habit.id, e.target.value)}
                          placeholder="Kategori..."
                          className="text-[11px] text-stone-400 bg-transparent border-b border-transparent focus:outline-none"
                        />
                      ) : (
                        <span className="text-[11px] text-stone-400">{habit.category}</span>
                      )}
                    </div>
                  </td>

                  {/* 7 Checkbox Pills */}
                  {habit.history.map((done, dayIdx) => (
                    <td key={dayIdx} className="py-2.5 px-1 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggleDay(habit.id, dayIdx)}
                        className={`w-7 h-7 mx-auto rounded-md flex items-center justify-center transition-all ${
                          done
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'border border-stone-300 bg-white hover:bg-stone-100 text-transparent'
                        }`}
                        title={`Tandai hari ke-${dayIdx + 1}`}
                      >
                        <Check className="w-4 h-4 stroke-[2.5]" />
                      </button>
                    </td>
                  ))}

                  <td className="py-2.5 px-2 text-center font-mono text-xs font-semibold text-stone-600">
                    {rate}%
                  </td>

                  {isEditable && (
                    <td className="py-2.5 px-1 text-center">
                      <button
                        type="button"
                        onClick={() => handleDeleteHabit(habit.id)}
                        className="text-stone-300 hover:text-rose-500 p-1 transition-colors"
                        title="Hapus baris"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Encouragement Notes (Non-judgmental) */}
      <div
        className="p-4 rounded-xl border flex items-start gap-3"
        style={{
          borderColor: theme.borderColor,
          backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
        }}
      >
        <span className="text-lg">🌿</span>
        <div className="w-full">
          <span className="text-xs uppercase tracking-wider font-bold text-stone-600 block mb-0.5 font-sans-clean">
            {isId ? 'Prinsip Kebaikan Diri' : 'Gentle Compassion Principle'}
          </span>
          {isEditable ? (
            <textarea
              value={content.notes || ''}
              onChange={(e) => onChange('notes', e.target.value)}
              placeholder="Catatan motivasi yang ramah..."
              rows={2}
              className="w-full text-xs font-serif-reading italic bg-transparent border border-transparent hover:border-stone-200 focus:outline-none rounded p-1 resize-none"
              style={{ color: theme.textColor }}
            />
          ) : (
            <p className="text-xs font-serif-reading italic" style={{ color: theme.textColor }}>
              {content.notes}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
