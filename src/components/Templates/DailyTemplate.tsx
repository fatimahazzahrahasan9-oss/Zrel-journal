import React from 'react';
import { DailyContent, ThemeConfig, Language, DailyTodo, DailyScheduleSlot } from '../../types/journal';
import { CheckSquare, Square, Plus, Trash2, Sun, Moon, BatteryCharging, Zap } from 'lucide-react';

interface DailyTemplateProps {
  content: DailyContent;
  theme: ThemeConfig;
  lang: Language;
  isEditable?: boolean;
  onChange: (field: string, value: any) => void;
  inkSaverMode?: boolean;
}

export const DailyTemplate: React.FC<DailyTemplateProps> = ({
  content,
  theme,
  lang,
  isEditable,
  onChange,
  inkSaverMode,
}) => {
  const isId = lang === 'id';

  const handlePriorityChange = (index: number, val: string) => {
    const nextPriorities = [...(content.priorities || ['', '', ''])] as [string, string, string];
    nextPriorities[index] = val;
    onChange('priorities', nextPriorities);
  };

  const handleGratitudeChange = (index: number, val: string) => {
    const nextGratitude = [...(content.gratitude || ['', '', ''])] as [string, string, string];
    nextGratitude[index] = val;
    onChange('gratitude', nextGratitude);
  };

  const handleToggleTodo = (id: string) => {
    const next = (content.todos || []).map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
    onChange('todos', next);
  };

  const handleAddTodo = () => {
    const newTodo: DailyTodo = {
      id: `todo_${Date.now()}`,
      text: '',
      completed: false,
    };
    onChange('todos', [...(content.todos || []), newTodo]);
  };

  const handleTodoText = (id: string, text: string) => {
    const next = (content.todos || []).map((t) => (t.id === id ? { ...t, text } : t));
    onChange('todos', next);
  };

  const handleDeleteTodo = (id: string) => {
    const next = (content.todos || []).filter((t) => t.id !== id);
    onChange('todos', next);
  };

  const handleAddScheduleSlot = () => {
    const newSlot: DailyScheduleSlot = {
      time: '12:00',
      activity: '',
    };
    onChange('schedule', [...(content.schedule || []), newSlot]);
  };

  const handleScheduleChange = (index: number, field: 'time' | 'activity', val: string) => {
    const next = [...(content.schedule || [])];
    next[index] = { ...next[index], [field]: val };
    onChange('schedule', next);
  };

  const handleDeleteScheduleSlot = (index: number) => {
    const next = [...(content.schedule || [])];
    next.splice(index, 1);
    onChange('schedule', next);
  };

  return (
    <div className="w-full h-full p-4 sm:p-8 flex flex-col space-y-5 max-w-4xl mx-auto">
      {/* Top Banner: Date, Day, Focus */}
      <div
        className="p-4 sm:p-5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        style={{
          borderColor: theme.borderColor,
          backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg font-serif-display border"
            style={{ borderColor: theme.accentColor, color: theme.primaryColor }}
          >
            {content.date ? content.date.split('-')[2] : '28'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              {isEditable ? (
                <input
                  type="date"
                  value={content.date || ''}
                  onChange={(e) => onChange('date', e.target.value)}
                  className="text-xs font-semibold uppercase tracking-wider text-stone-500 bg-transparent border-b border-transparent hover:border-stone-300 focus:outline-none"
                />
              ) : (
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  {content.date}
                </span>
              )}
              <span className="text-stone-300">·</span>
              {isEditable ? (
                <input
                  type="text"
                  value={content.dayOfWeek || ''}
                  onChange={(e) => onChange('dayOfWeek', e.target.value)}
                  placeholder="Hari..."
                  className="text-xs font-semibold text-stone-600 bg-transparent border-b border-transparent hover:border-stone-300 focus:outline-none"
                />
              ) : (
                <span className="text-xs font-semibold text-stone-600">{content.dayOfWeek}</span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-serif-display font-bold" style={{ color: theme.primaryColor }}>
              {isId ? 'Jurnal Keseharian' : 'Daily Journal'}
            </h2>
          </div>
        </div>

        {/* Energy & Productivity Rating */}
        <div className="flex items-center gap-4 text-xs font-sans-clean">
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-stone-500">{isId ? 'Energi' : 'Energy'}:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  type="button"
                  disabled={!isEditable}
                  onClick={() => onChange('energyRating', val)}
                  className={`w-5 h-5 rounded-full text-[11px] font-bold transition-colors ${
                    (content.energyRating || 0) >= val
                      ? 'bg-amber-400 text-stone-900'
                      : 'bg-stone-200 text-stone-400 hover:bg-stone-300'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <BatteryCharging className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-stone-500">{isId ? 'Fokus' : 'Focus'}:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  type="button"
                  disabled={!isEditable}
                  onClick={() => onChange('productivityRating', val)}
                  className={`w-5 h-5 rounded-full text-[11px] font-bold transition-colors ${
                    (content.productivityRating || 0) >= val
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-200 text-stone-400 hover:bg-stone-300'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Focus Strip */}
      <div
        className="p-3.5 rounded-lg border flex items-center gap-3"
        style={{
          borderColor: theme.borderColor,
          backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
        }}
      >
        <span
          className="text-xs uppercase tracking-wider font-semibold px-2 py-0.5 rounded font-sans-clean shrink-0"
          style={{ backgroundColor: theme.accentColor + '20', color: theme.primaryColor }}
        >
          {isId ? 'Fokus Utama Hari Ini' : "Today's Core Focus"}
        </span>
        {isEditable ? (
          <input
            type="text"
            value={content.todayFocus || ''}
            onChange={(e) => onChange('todayFocus', e.target.value)}
            placeholder="Niat atau tujuan terpenting hari ini..."
            className="w-full text-sm font-serif-reading italic bg-transparent border-b border-transparent hover:border-stone-300 focus:outline-none"
            style={{ color: theme.textColor }}
          />
        ) : (
          <span className="text-sm font-serif-reading italic" style={{ color: theme.textColor }}>
            {content.todayFocus}
          </span>
        )}
      </div>

      {/* Grid: 3 Priorities + Schedule (Left), To-Do List + Gratitude (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Top 3 Priorities */}
          <div
            className="p-4 rounded-xl border"
            style={{
              borderColor: theme.borderColor,
              backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
            }}
          >
            <h3 className="text-xs uppercase tracking-wider font-bold text-stone-600 mb-2 font-sans-clean">
              {isId ? '3 Prioritas Paling Utama' : 'Top 3 Priorities'}
            </h3>
            <div className="space-y-2">
              {[0, 1, 2].map((idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span
                    className="w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold shrink-0"
                    style={{ backgroundColor: theme.accentColor + '30', color: theme.primaryColor }}
                  >
                    {idx + 1}
                  </span>
                  {isEditable ? (
                    <input
                      type="text"
                      value={(content.priorities && content.priorities[idx]) || ''}
                      onChange={(e) => handlePriorityChange(idx, e.target.value)}
                      placeholder={`Prioritas ${idx + 1}...`}
                      className="w-full text-xs sm:text-sm bg-transparent border-b border-stone-200 focus:border-stone-400 focus:outline-none py-0.5"
                      style={{ color: theme.textColor }}
                    />
                  ) : (
                    <span className="text-xs sm:text-sm" style={{ color: theme.textColor }}>
                      {content.priorities && content.priorities[idx]}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Daily Schedule Timeline */}
          <div
            className="p-4 rounded-xl border"
            style={{
              borderColor: theme.borderColor,
              backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs uppercase tracking-wider font-bold text-stone-600 font-sans-clean">
                {isId ? 'Jadwal & Agenda' : 'Daily Schedule'}
              </h3>
              {isEditable && (
                <button
                  type="button"
                  onClick={handleAddScheduleSlot}
                  className="text-xs flex items-center gap-1 text-stone-500 hover:text-stone-800"
                >
                  <Plus className="w-3 h-3" /> {isId ? 'Tambah' : 'Add'}
                </button>
              )}
            </div>
            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {(content.schedule || []).map((slot, sIdx) => (
                <div key={sIdx} className="flex items-center gap-2 text-xs">
                  {isEditable ? (
                    <input
                      type="text"
                      value={slot.time}
                      onChange={(e) => handleScheduleChange(sIdx, 'time', e.target.value)}
                      placeholder="09:00"
                      className="w-20 font-mono text-[11px] bg-transparent border-b border-stone-200 focus:outline-none shrink-0"
                    />
                  ) : (
                    <span className="w-20 font-mono text-[11px] text-stone-500 shrink-0">{slot.time}</span>
                  )}
                  {isEditable ? (
                    <input
                      type="text"
                      value={slot.activity}
                      onChange={(e) => handleScheduleChange(sIdx, 'activity', e.target.value)}
                      placeholder="Kegiatan..."
                      className="w-full bg-transparent border-b border-stone-200 focus:outline-none py-0.5"
                      style={{ color: theme.textColor }}
                    />
                  ) : (
                    <span className="w-full text-stone-700">{slot.activity}</span>
                  )}
                  {isEditable && (
                    <button
                      type="button"
                      onClick={() => handleDeleteScheduleSlot(sIdx)}
                      className="text-stone-400 hover:text-rose-500 shrink-0"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: To-Do Checklist + Gratitude */}
        <div className="space-y-4">
          {/* Interactive To-Do List */}
          <div
            className="p-4 rounded-xl border"
            style={{
              borderColor: theme.borderColor,
              backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs uppercase tracking-wider font-bold text-stone-600 font-sans-clean">
                {isId ? 'Daftar Tugas (To-Do List)' : 'To-Do List'}
              </h3>
              {isEditable && (
                <button
                  type="button"
                  onClick={handleAddTodo}
                  className="text-xs flex items-center gap-1 text-stone-500 hover:text-stone-800"
                >
                  <Plus className="w-3 h-3" /> {isId ? 'Tambah Tugas' : 'Add Task'}
                </button>
              )}
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {(content.todos || []).map((todo) => (
                <div key={todo.id} className="flex items-center gap-2 group">
                  <button
                    type="button"
                    onClick={() => handleToggleTodo(todo.id)}
                    className="shrink-0 text-stone-400 hover:text-stone-700"
                  >
                    {todo.completed ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                  {isEditable ? (
                    <input
                      type="text"
                      value={todo.text}
                      onChange={(e) => handleTodoText(todo.id, e.target.value)}
                      placeholder="Tugas..."
                      className={`w-full text-xs sm:text-sm bg-transparent border-b border-transparent focus:border-stone-300 focus:outline-none py-0.5 ${
                        todo.completed ? 'line-through text-stone-400' : 'text-stone-700'
                      }`}
                    />
                  ) : (
                    <span
                      className={`text-xs sm:text-sm ${
                        todo.completed ? 'line-through text-stone-400' : 'text-stone-700'
                      }`}
                    >
                      {todo.text}
                    </span>
                  )}
                  {isEditable && (
                    <button
                      type="button"
                      onClick={() => handleDeleteTodo(todo.id)}
                      className="opacity-0 group-hover:opacity-100 text-stone-400 hover:text-rose-500 transition-opacity shrink-0"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 3 Gratitudes */}
          <div
            className="p-4 rounded-xl border"
            style={{
              borderColor: theme.borderColor,
              backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
            }}
          >
            <div className="flex items-center gap-1.5 mb-2">
              <Sun className="w-4 h-4 text-amber-500" />
              <h3 className="text-xs uppercase tracking-wider font-bold text-stone-600 font-sans-clean">
                {isId ? '3 Hal yang Disyukuri Hari Ini' : '3 Things I am Grateful For'}
              </h3>
            </div>
            <div className="space-y-1.5">
              {[0, 1, 2].map((idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-amber-500 text-xs">✦</span>
                  {isEditable ? (
                    <input
                      type="text"
                      value={(content.gratitude && content.gratitude[idx]) || ''}
                      onChange={(e) => handleGratitudeChange(idx, e.target.value)}
                      placeholder={`Rasa syukur ${idx + 1}...`}
                      className="w-full text-xs font-serif-reading italic bg-transparent border-b border-stone-200 focus:border-stone-400 focus:outline-none py-0.5"
                      style={{ color: theme.textColor }}
                    />
                  ) : (
                    <span className="text-xs font-serif-reading italic" style={{ color: theme.textColor }}>
                      {content.gratitude && content.gratitude[idx]}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Notes & Evening Reflection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Free Notes */}
        <div
          className="p-4 rounded-xl border flex flex-col"
          style={{
            borderColor: theme.borderColor,
            backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
          }}
        >
          <span className="text-xs uppercase tracking-wider font-bold text-stone-600 mb-2 font-sans-clean">
            {isId ? 'Catatan & Inspirasi Spontan' : 'Notes & Thoughts'}
          </span>
          {isEditable ? (
            <textarea
              value={content.freeNotes || ''}
              onChange={(e) => onChange('freeNotes', e.target.value)}
              placeholder="Catatan bebas hari ini..."
              rows={3}
              className="w-full text-xs sm:text-sm font-sans-clean bg-transparent border border-transparent hover:border-stone-200 focus:outline-none rounded p-1 resize-none"
              style={{ color: theme.textColor }}
            />
          ) : (
            <p className="text-xs sm:text-sm font-sans-clean whitespace-pre-wrap" style={{ color: theme.textColor }}>
              {content.freeNotes}
            </p>
          )}
        </div>

        {/* Evening Reflection */}
        <div
          className="p-4 rounded-xl border flex flex-col"
          style={{
            borderColor: theme.borderColor,
            backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
          }}
        >
          <div className="flex items-center gap-1.5 mb-2">
            <Moon className="w-4 h-4 text-indigo-400" />
            <span className="text-xs uppercase tracking-wider font-bold text-stone-600 font-sans-clean">
              {isId ? 'Refleksi Akhir Hari' : 'Evening Reflection'}
            </span>
          </div>
          {isEditable ? (
            <textarea
              value={content.eveningReflection || ''}
              onChange={(e) => onChange('eveningReflection', e.target.value)}
              placeholder="Apa yang telah berjalan baik hari ini? Apa yang ingin diperbaiki esok?"
              rows={3}
              className="w-full text-xs sm:text-sm font-serif-reading italic bg-transparent border border-transparent hover:border-stone-200 focus:outline-none rounded p-1 resize-none"
              style={{ color: theme.textColor }}
            />
          ) : (
            <p className="text-xs sm:text-sm font-serif-reading italic whitespace-pre-wrap" style={{ color: theme.textColor }}>
              {content.eveningReflection}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
