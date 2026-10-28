import React from 'react';
import { StudyWorkContent, ThemeConfig, Language } from '../../types/journal';
import { Briefcase, CheckSquare, Square, Plus, Trash2, Clock, BookOpen } from 'lucide-react';

interface StudyWorkTemplateProps {
  content: StudyWorkContent;
  theme: ThemeConfig;
  lang: Language;
  isEditable?: boolean;
  onChange: (field: string, value: any) => void;
  inkSaverMode?: boolean;
}

export const StudyWorkTemplate: React.FC<StudyWorkTemplateProps> = ({
  content,
  theme,
  lang,
  isEditable,
  onChange,
  inkSaverMode,
}) => {
  const isId = lang === 'id';

  const handleToggleTask = (id: string) => {
    const next = (content.tasks || []).map((t) => (t.id === id ? { ...t, done: !t.done } : t));
    onChange('tasks', next);
  };

  const handleAddTask = () => {
    const next = [
      ...(content.tasks || []),
      {
        id: `sw_${Date.now()}`,
        task: '',
        priority: 'medium' as const,
        done: false,
      },
    ];
    onChange('tasks', next);
  };

  const handleTaskText = (id: string, text: string) => {
    const next = (content.tasks || []).map((t) => (t.id === id ? { ...t, task: text } : t));
    onChange('tasks', next);
  };

  const handleTaskPriority = (id: string, priority: 'high' | 'medium' | 'low') => {
    const next = (content.tasks || []).map((t) => (t.id === id ? { ...t, priority } : t));
    onChange('tasks', next);
  };

  const handleDeleteTask = (id: string) => {
    const next = (content.tasks || []).filter((t) => t.id !== id);
    onChange('tasks', next);
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
        <div className="flex items-center gap-3">
          <Briefcase className="w-6 h-6" style={{ color: theme.accentColor }} />
          <div>
            <div className="flex items-center gap-2 mb-1">
              {isEditable ? (
                <input
                  type="date"
                  value={content.date || ''}
                  onChange={(e) => onChange('date', e.target.value)}
                  className="text-xs font-semibold uppercase tracking-wider text-stone-500 bg-transparent border-b border-stone-200 focus:outline-none"
                />
              ) : (
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">{content.date}</span>
              )}
            </div>
            <h2 className="text-2xl font-serif-display font-bold" style={{ color: theme.primaryColor }}>
              {isId ? 'Jurnal Studi & Proyek Kerja' : 'Study & Project Journal'}
            </h2>
          </div>
        </div>

        {/* Project/Subject input */}
        <div className="max-w-xs w-full">
          <span className="text-[11px] uppercase tracking-wider font-bold text-stone-500 block mb-0.5">
            {isId ? 'Subjek / Nama Proyek' : 'Subject / Project Name'}
          </span>
          {isEditable ? (
            <input
              type="text"
              value={content.projectOrSubject || ''}
              onChange={(e) => onChange('projectOrSubject', e.target.value)}
              placeholder="e.g. Riset Desain Interaksi..."
              className="w-full font-serif-classic font-bold text-sm bg-transparent border-b border-stone-300 focus:outline-none py-0.5"
              style={{ color: theme.primaryColor }}
            />
          ) : (
            <span className="font-serif-classic font-bold text-sm" style={{ color: theme.primaryColor }}>
              {content.projectOrSubject}
            </span>
          )}
        </div>
      </div>

      {/* Deadlines and Pomodoro Tracker */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          className="p-3.5 rounded-xl border flex items-center justify-between"
          style={{
            borderColor: theme.borderColor,
            backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
          }}
        >
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-stone-500" />
            <span className="text-xs font-semibold text-stone-600">{isId ? 'Tenggat Waktu Utama' : 'Key Deadline'}</span>
          </div>
          {isEditable ? (
            <input
              type="text"
              value={content.deadlines || ''}
              onChange={(e) => onChange('deadlines', e.target.value)}
              placeholder="31 Oktober 2026..."
              className="text-xs font-mono text-stone-700 bg-transparent border-b border-stone-200 focus:outline-none text-right"
            />
          ) : (
            <span className="text-xs font-mono text-stone-700">{content.deadlines}</span>
          )}
        </div>

        <div
          className="p-3.5 rounded-xl border flex items-center justify-between"
          style={{
            borderColor: theme.borderColor,
            backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
          }}
        >
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-semibold text-stone-600">{isId ? 'Durasi Fokus (Jam)' : 'Focus Hours'}</span>
          </div>
          {isEditable ? (
            <input
              type="number"
              step="0.5"
              value={content.pomodoroHours || 0}
              onChange={(e) => onChange('pomodoroHours', parseFloat(e.target.value) || 0)}
              className="text-xs font-mono font-bold text-stone-800 bg-transparent border-b border-stone-200 focus:outline-none w-16 text-right"
            />
          ) : (
            <span className="text-xs font-mono font-bold text-stone-800">{content.pomodoroHours} Jam</span>
          )}
        </div>
      </div>

      {/* Tasks Priority Matrix Checklist */}
      <div
        className="p-5 rounded-xl border"
        style={{
          borderColor: theme.borderColor,
          backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
        }}
      >
        <div className="flex items-center justify-between mb-3 border-b pb-2" style={{ borderColor: theme.borderColor }}>
          <h3 className="font-serif-classic font-bold text-sm" style={{ color: theme.primaryColor }}>
            {isId ? 'Daftar Tugas & Tingkat Prioritas' : 'Tasks & Priority Assignment'}
          </h3>
          {isEditable && (
            <button
              type="button"
              onClick={handleAddTask}
              className="text-xs flex items-center gap-1 text-stone-500 hover:text-stone-800"
            >
              <Plus className="w-3.5 h-3.5" /> {isId ? 'Tambah Tugas' : 'Add Task'}
            </button>
          )}
        </div>

        <div className="space-y-2">
          {(content.tasks || []).map((t) => (
            <div key={t.id} className="flex items-center gap-2.5 group text-xs sm:text-sm">
              <button
                type="button"
                onClick={() => handleToggleTask(t.id)}
                className="text-stone-400 hover:text-stone-700 shrink-0"
              >
                {t.done ? (
                  <CheckSquare className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Square className="w-4 h-4" />
                )}
              </button>

              {isEditable ? (
                <input
                  type="text"
                  value={t.task}
                  onChange={(e) => handleTaskText(t.id, e.target.value)}
                  placeholder="Deskripsi tugas..."
                  className={`w-full bg-transparent border-b border-transparent focus:border-stone-300 focus:outline-none py-0.5 ${
                    t.done ? 'line-through text-stone-400' : 'text-stone-700'
                  }`}
                />
              ) : (
                <span className={`w-full ${t.done ? 'line-through text-stone-400' : 'text-stone-700'}`}>
                  {t.task}
                </span>
              )}

              {isEditable ? (
                <select
                  value={t.priority}
                  onChange={(e) => handleTaskPriority(t.id, e.target.value as any)}
                  className="text-[11px] rounded border border-stone-200 bg-white px-1.5 py-0.5 text-stone-600 focus:outline-none shrink-0"
                >
                  <option value="high">{isId ? 'Tinggi' : 'High'}</option>
                  <option value="medium">{isId ? 'Sedang' : 'Medium'}</option>
                  <option value="low">{isId ? 'Rendah' : 'Low'}</option>
                </select>
              ) : (
                <span
                  className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded shrink-0 ${
                    t.priority === 'high'
                      ? 'bg-rose-50 text-rose-700'
                      : t.priority === 'medium'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  {t.priority}
                </span>
              )}

              {isEditable && (
                <button
                  type="button"
                  onClick={() => handleDeleteTask(t.id)}
                  className="opacity-0 group-hover:opacity-100 text-stone-300 hover:text-rose-500 shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Meeting Notes and Outcome Evaluation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className="p-4 rounded-xl border flex flex-col"
          style={{
            borderColor: theme.borderColor,
            backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
          }}
        >
          <span className="text-xs uppercase tracking-wider font-bold text-stone-600 mb-1 font-sans-clean">
            {isId ? 'Catatan Rapat / Kuliah / Riset' : 'Meeting / Lecture / Research Notes'}
          </span>
          {isEditable ? (
            <textarea
              value={content.meetingNotes || ''}
              onChange={(e) => onChange('meetingNotes', e.target.value)}
              placeholder="Poin-poin penting dari diskusi atau bacaan materi..."
              rows={3}
              className="w-full text-xs sm:text-sm font-sans-clean bg-transparent border border-transparent hover:border-stone-200 focus:outline-none rounded p-1 resize-none"
              style={{ color: theme.textColor }}
            />
          ) : (
            <p className="text-xs sm:text-sm font-sans-clean whitespace-pre-wrap" style={{ color: theme.textColor }}>
              {content.meetingNotes}
            </p>
          )}
        </div>

        <div
          className="p-4 rounded-xl border flex flex-col"
          style={{
            borderColor: theme.borderColor,
            backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
          }}
        >
          <span className="text-xs uppercase tracking-wider font-bold text-stone-600 mb-1 font-sans-clean">
            {isId ? 'Evaluasi Hasil Sesi Ini' : 'Session Evaluation'}
          </span>
          {isEditable ? (
            <textarea
              value={content.evaluation || ''}
              onChange={(e) => onChange('evaluation', e.target.value)}
              placeholder="Bagaimana efisiensi dan kualitas pemahaman pada sesi ini?"
              rows={3}
              className="w-full text-xs sm:text-sm font-serif-reading italic bg-transparent border border-transparent hover:border-stone-200 focus:outline-none rounded p-1 resize-none"
              style={{ color: theme.textColor }}
            />
          ) : (
            <p className="text-xs sm:text-sm font-serif-reading italic whitespace-pre-wrap" style={{ color: theme.textColor }}>
              {content.evaluation}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
