import React from 'react';
import { GoalContent, ThemeConfig, Language, GoalItem, ActionStep } from '../../types/journal';
import { Target, Plus, Trash2, CheckCircle2, Circle, AlertCircle } from 'lucide-react';

interface GoalsTemplateProps {
  content: GoalContent;
  theme: ThemeConfig;
  lang: Language;
  isEditable?: boolean;
  onChange: (field: string, value: any) => void;
  inkSaverMode?: boolean;
}

export const GoalsTemplate: React.FC<GoalsTemplateProps> = ({
  content,
  theme,
  lang,
  isEditable,
  onChange,
  inkSaverMode,
}) => {
  const isId = lang === 'id';
  const goals = content.goals || [];

  const handleAddGoal = () => {
    const newGoal: GoalItem = {
      id: `goal_${Date.now()}`,
      title: '',
      type: 'short-term',
      whyItMatters: '',
      targetDate: '',
      progressPercent: 0,
      actionSteps: [
        { id: `as_${Date.now()}_1`, step: '', deadline: '', completed: false },
      ],
      obstacles: '',
      adjustments: '',
    };
    onChange('goals', [...goals, newGoal]);
  };

  const handleGoalField = (id: string, field: keyof GoalItem, val: any) => {
    const next = goals.map((g) => (g.id === id ? { ...g, [field]: val } : g));
    onChange('goals', next);
  };

  const handleDeleteGoal = (id: string) => {
    const next = goals.filter((g) => g.id !== id);
    onChange('goals', next);
  };

  const handleAddActionStep = (goalId: string) => {
    const next = goals.map((g) => {
      if (g.id === goalId) {
        const steps = [...(g.actionSteps || [])];
        steps.push({
          id: `as_${Date.now()}`,
          step: '',
          deadline: '',
          completed: false,
        });
        return { ...g, actionSteps: steps };
      }
      return g;
    });
    onChange('goals', next);
  };

  const handleToggleStep = (goalId: string, stepId: string) => {
    const next = goals.map((g) => {
      if (g.id === goalId) {
        const steps = (g.actionSteps || []).map((s) => (s.id === stepId ? { ...s, completed: !s.completed } : s));
        const doneCount = steps.filter((s) => s.completed).length;
        const autoProgress = steps.length > 0 ? Math.round((doneCount / steps.length) * 100) : 0;
        return { ...g, actionSteps: steps, progressPercent: autoProgress };
      }
      return g;
    });
    onChange('goals', next);
  };

  const handleStepText = (goalId: string, stepId: string, text: string) => {
    const next = goals.map((g) => {
      if (g.id === goalId) {
        const steps = (g.actionSteps || []).map((s) => (s.id === stepId ? { ...s, step: text } : s));
        return { ...g, actionSteps: steps };
      }
      return g;
    });
    onChange('goals', next);
  };

  const handleDeleteStep = (goalId: string, stepId: string) => {
    const next = goals.map((g) => {
      if (g.id === goalId) {
        const steps = (g.actionSteps || []).filter((s) => s.id !== stepId);
        return { ...g, actionSteps: steps };
      }
      return g;
    });
    onChange('goals', next);
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
        <div className="flex items-center gap-3">
          <Target className="w-6 h-6" style={{ color: theme.accentColor }} />
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 font-sans-clean block">
              {isId ? 'Peta Jalan & Visi Masa Depan' : 'Roadmap & Future Vision'}
            </span>
            <h2 className="text-2xl font-serif-display font-bold" style={{ color: theme.primaryColor }}>
              {isId ? 'Penetapan Sasaran & Impian' : 'Goal Setting & Milestones'}
            </h2>
          </div>
        </div>

        {isEditable && (
          <button
            type="button"
            onClick={handleAddGoal}
            className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-md text-white font-medium shadow-sm transition-colors shrink-0"
            style={{ backgroundColor: theme.primaryColor }}
          >
            <Plus className="w-3.5 h-3.5" /> {isId ? 'Tambah Tujuan Baru' : 'Add New Goal'}
          </button>
        )}
      </div>

      {/* Goal Cards */}
      <div className="space-y-5">
        {goals.map((goal, idx) => (
          <div
            key={goal.id}
            className="p-5 rounded-xl border space-y-4"
            style={{
              borderColor: theme.borderColor,
              backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
            }}
          >
            {/* Top row: Title, Type badge, Target Date, Delete */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3" style={{ borderColor: theme.borderColor }}>
              <div className="flex items-center gap-2 flex-1">
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0"
                  style={{ backgroundColor: theme.accentColor + '20', color: theme.primaryColor }}
                >
                  {idx + 1}
                </span>

                {isEditable ? (
                  <input
                    type="text"
                    value={goal.title}
                    onChange={(e) => handleGoalField(goal.id, 'title', e.target.value)}
                    placeholder="Judul sasaran/impian..."
                    className="font-serif-classic font-bold text-base sm:text-lg bg-transparent border-b border-transparent hover:border-stone-300 focus:outline-none w-full"
                    style={{ color: theme.primaryColor }}
                  />
                ) : (
                  <h3 className="font-serif-classic font-bold text-base sm:text-lg" style={{ color: theme.primaryColor }}>
                    {goal.title}
                  </h3>
                )}
              </div>

              <div className="flex items-center gap-3">
                {isEditable ? (
                  <select
                    value={goal.type}
                    onChange={(e) => handleGoalField(goal.id, 'type', e.target.value)}
                    className="text-xs rounded border border-stone-200 bg-white px-2 py-0.5 text-stone-600 focus:outline-none"
                  >
                    <option value="short-term">{isId ? 'Jangka Pendek' : 'Short-Term'}</option>
                    <option value="long-term">{isId ? 'Jangka Panjang' : 'Long-Term'}</option>
                  </select>
                ) : (
                  <span className="text-xs px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                    {goal.type === 'short-term' ? (isId ? 'Jangka Pendek' : 'Short-Term') : (isId ? 'Jangka Panjang' : 'Long-Term')}
                  </span>
                )}

                {isEditable ? (
                  <input
                    type="text"
                    value={goal.targetDate || ''}
                    onChange={(e) => handleGoalField(goal.id, 'targetDate', e.target.value)}
                    placeholder="Tenggat target..."
                    className="text-xs font-mono text-stone-500 bg-transparent border-b border-stone-200 focus:outline-none w-28"
                  />
                ) : (
                  <span className="text-xs font-mono text-stone-500">{goal.targetDate}</span>
                )}

                {isEditable && (
                  <button
                    type="button"
                    onClick={() => handleDeleteGoal(goal.id)}
                    className="text-stone-300 hover:text-rose-500 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Why It Matters */}
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-stone-500 block mb-0.5">
                {isId ? '✦ Mengapa Tujuan Ini Sangat Berarti?' : '✦ Why This Goal Truly Matters'}
              </span>
              {isEditable ? (
                <textarea
                  value={goal.whyItMatters || ''}
                  onChange={(e) => handleGoalField(goal.id, 'whyItMatters', e.target.value)}
                  placeholder="Alasan mendalam di balik impian ini..."
                  rows={2}
                  className="w-full text-xs sm:text-sm font-serif-reading italic bg-transparent border border-transparent hover:border-stone-200 focus:outline-none rounded p-1 resize-none"
                  style={{ color: theme.textColor }}
                />
              ) : (
                <p className="text-xs sm:text-sm font-serif-reading italic" style={{ color: theme.textColor }}>
                  {goal.whyItMatters}
                </p>
              )}
            </div>

            {/* Action Steps */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] uppercase tracking-wider font-bold text-stone-500">
                  {isId ? 'Langkah Tindakan Nyata (Action Steps)' : 'Realistic Action Steps'}
                </span>
                {isEditable && (
                  <button
                    type="button"
                    onClick={() => handleAddActionStep(goal.id)}
                    className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> {isId ? 'Tambah Langkah' : 'Add Step'}
                  </button>
                )}
              </div>

              <div className="space-y-1.5">
                {(goal.actionSteps || []).map((step) => (
                  <div key={step.id} className="flex items-center gap-2 group text-xs sm:text-sm">
                    <button
                      type="button"
                      onClick={() => handleToggleStep(goal.id, step.id)}
                      className="text-stone-400 hover:text-stone-700 shrink-0"
                    >
                      {step.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Circle className="w-4 h-4" />
                      )}
                    </button>
                    {isEditable ? (
                      <input
                        type="text"
                        value={step.step}
                        onChange={(e) => handleStepText(goal.id, step.id, e.target.value)}
                        placeholder="Langkah spesifik..."
                        className={`w-full bg-transparent border-b border-transparent focus:border-stone-300 focus:outline-none py-0.5 ${
                          step.completed ? 'line-through text-stone-400' : 'text-stone-700'
                        }`}
                      />
                    ) : (
                      <span className={`w-full ${step.completed ? 'line-through text-stone-400' : 'text-stone-700'}`}>
                        {step.step}
                      </span>
                    )}
                    {isEditable && (
                      <button
                        type="button"
                        onClick={() => handleDeleteStep(goal.id, step.id)}
                        className="opacity-0 group-hover:opacity-100 text-stone-300 hover:text-rose-500 shrink-0"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Progress bar and Obstacles */}
            <div className="pt-2 border-t grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ borderColor: theme.borderColor }}>
              {/* Progress Slider */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-stone-600">{isId ? 'Progres Keseluruhan' : 'Overall Progress'}</span>
                  <span className="font-mono font-bold text-stone-800">{goal.progressPercent || 0}%</span>
                </div>
                <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full transition-all"
                    style={{ width: `${goal.progressPercent || 0}%` }}
                  />
                </div>
              </div>

              {/* Obstacles / Adjustment */}
              <div>
                <span className="text-[11px] font-semibold text-stone-500 block mb-0.5">
                  {isId ? 'Antisipasi Hambatan & Penyesuaian' : 'Obstacles & Adjustments'}
                </span>
                {isEditable ? (
                  <input
                    type="text"
                    value={goal.obstacles || ''}
                    onChange={(e) => handleGoalField(goal.id, 'obstacles', e.target.value)}
                    placeholder="Strategi jika menghadapi kendala..."
                    className="w-full text-xs bg-transparent border-b border-stone-200 focus:outline-none py-0.5"
                    style={{ color: theme.textColor }}
                  />
                ) : (
                  <p className="text-xs" style={{ color: theme.textColor }}>
                    {goal.obstacles}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
