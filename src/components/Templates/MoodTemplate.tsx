import React from 'react';
import { MoodContent, ThemeConfig, Language, MoodType } from '../../types/journal';
import { Heart, Sparkles, Smile, CloudRain, ShieldAlert, Coffee, Sun, Compass } from 'lucide-react';

interface MoodTemplateProps {
  content: MoodContent;
  theme: ThemeConfig;
  lang: Language;
  isEditable?: boolean;
  onChange: (field: string, value: any) => void;
  inkSaverMode?: boolean;
}

interface MoodOption {
  type: MoodType;
  labelId: string;
  labelEn: string;
  icon: any;
  color: string;
}

const MOOD_OPTIONS: MoodOption[] = [
  { type: 'peaceful', labelId: 'Damai & Hening', labelEn: 'Peaceful', icon: Heart, color: '#5E7A63' },
  { type: 'calm', labelId: 'Tenang & Santai', labelEn: 'Calm', icon: Compass, color: '#4A7280' },
  { type: 'joyful', labelId: 'Gembira & Ceria', labelEn: 'Joyful', icon: Smile, color: '#D9822B' },
  { type: 'grateful', labelId: 'Penuh Syukur', labelEn: 'Grateful', icon: Sparkles, color: '#B88E8D' },
  { type: 'focused', labelId: 'Fokus & Berenergi', labelEn: 'Focused', icon: Sun, color: '#7E6551' },
  { type: 'tired', labelId: 'Lelah / Butuh Rehat', labelEn: 'Tired', icon: Coffee, color: '#887B75' },
  { type: 'anxious', labelId: 'Gelisah / Cemas', labelEn: 'Anxious', icon: ShieldAlert, color: '#A36868' },
  { type: 'melancholy', labelId: 'Sendu / Renung', labelEn: 'Melancholy', icon: CloudRain, color: '#68778C' },
];

export const MoodTemplate: React.FC<MoodTemplateProps> = ({
  content,
  theme,
  lang,
  isEditable,
  onChange,
  inkSaverMode,
}) => {
  const isId = lang === 'id';

  return (
    <div className="w-full h-full p-4 sm:p-8 flex flex-col space-y-5 max-w-3xl mx-auto">
      {/* Header */}
      <div
        className="p-5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        style={{
          borderColor: theme.borderColor,
          backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
        }}
      >
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 font-sans-clean block mb-0.5">
            {isId ? 'Pemeriksaan Diri & Emosi' : 'Emotional Check-in'}
          </span>
          <h2 className="text-2xl font-serif-display font-bold" style={{ color: theme.primaryColor }}>
            {isId ? 'Jurnal Suasana Hati (Mood)' : 'Mood & Mind Journal'}
          </h2>
        </div>

        {/* Date */}
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

      {/* Mood Selector Buttons */}
      <div
        className="p-5 rounded-xl border"
        style={{
          borderColor: theme.borderColor,
          backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
        }}
      >
        <span className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-3 font-sans-clean">
          {isId ? 'Pilih Suasana Hati Dominan Saat Ini' : 'Select Current Dominant Mood'}
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {MOOD_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const isSelected = content.selectedMood === opt.type;
            return (
              <button
                key={opt.type}
                type="button"
                disabled={!isEditable}
                onClick={() => onChange('selectedMood', opt.type)}
                className={`p-3 rounded-lg border text-left flex items-center gap-2.5 transition-all ${
                  isSelected
                    ? 'border-stone-800 bg-white shadow-sm ring-1 ring-stone-800'
                    : 'border-stone-200 hover:border-stone-400 bg-stone-50/50'
                }`}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: isSelected ? opt.color : '#E5E7EB',
                    color: isSelected ? '#FFFFFF' : '#4B5563',
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-medium text-stone-800 truncate">
                  {isId ? opt.labelId : opt.labelEn}
                </span>
              </button>
            );
          })}
        </div>

        {/* Emotional Intensity Slider */}
        <div className="mt-5 pt-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3" style={{ borderColor: theme.borderColor }}>
          <div>
            <span className="text-xs font-semibold text-stone-700 block">
              {isId ? 'Tingkat Intensitas Emosi' : 'Emotional Intensity Scale'}
            </span>
            <span className="text-[11px] text-stone-400">
              {isId ? '1 = Sangat samar, 10 = Sangat kuat / intens' : '1 = Barely felt, 10 = Very intense'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="range"
              min={1}
              max={10}
              disabled={!isEditable}
              value={content.emotionalIntensity || 5}
              onChange={(e) => onChange('emotionalIntensity', parseInt(e.target.value, 10))}
              className="w-36 accent-stone-700 cursor-pointer"
            />
            <span className="text-sm font-bold font-mono px-2 py-0.5 rounded bg-stone-200/60 text-stone-800">
              {content.emotionalIntensity || 5} / 10
            </span>
          </div>
        </div>
      </div>

      {/* Triggers and Situation */}
      <div
        className="p-5 rounded-xl border"
        style={{
          borderColor: theme.borderColor,
          backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
        }}
      >
        <span className="text-xs uppercase tracking-wider font-bold text-stone-600 block mb-1 font-sans-clean">
          {isId ? 'Pemicu atau Situasi yang Memengaruhi' : 'Triggers or Situational Context'}
        </span>
        {isEditable ? (
          <input
            type="text"
            value={content.triggers || ''}
            onChange={(e) => onChange('triggers', e.target.value)}
            placeholder="Peristiwa, interaksi, atau pikiran yang memicu perasaan ini..."
            className="w-full text-xs sm:text-sm bg-transparent border-b border-stone-200 focus:border-stone-500 focus:outline-none py-1"
            style={{ color: theme.textColor }}
          />
        ) : (
          <p className="text-xs sm:text-sm" style={{ color: theme.textColor }}>
            {content.triggers}
          </p>
        )}
      </div>

      {/* Free feelings writing */}
      <div
        className="p-5 rounded-xl border flex-1"
        style={{
          borderColor: theme.borderColor,
          backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
        }}
      >
        <span className="text-xs uppercase tracking-wider font-bold text-stone-600 block mb-2 font-sans-clean">
          {isId ? 'Ceritakan Perasaan Anda Tanpa Dihakimi' : 'Express Your Feelings Without Judgment'}
        </span>
        {isEditable ? (
          <textarea
            value={content.feelingsText || ''}
            onChange={(e) => onChange('feelingsText', e.target.value)}
            placeholder="Keluarkan isi pikiranmu dengan jujur dan leluasa..."
            rows={4}
            className="w-full text-xs sm:text-sm font-serif-reading italic bg-transparent border border-transparent hover:border-stone-200 focus:outline-none rounded p-1.5 resize-none leading-relaxed"
            style={{ color: theme.textColor }}
          />
        ) : (
          <p className="text-xs sm:text-sm font-serif-reading italic whitespace-pre-wrap leading-relaxed" style={{ color: theme.textColor }}>
            {content.feelingsText}
          </p>
        )}
      </div>

      {/* What my heart needs & helpful soothing actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          className="p-4 rounded-xl border"
          style={{
            borderColor: theme.borderColor,
            backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
          }}
        >
          <span className="text-xs uppercase tracking-wider font-bold text-stone-600 block mb-1 font-sans-clean">
            {isId ? '✦ Kebutuhan Diri Saat Ini' : '✦ What My Heart Needs'}
          </span>
          {isEditable ? (
            <input
              type="text"
              value={content.currentNeeds || ''}
              onChange={(e) => onChange('currentNeeds', e.target.value)}
              placeholder="Pelukan hangat, tidur cukup, keheningan..."
              className="w-full text-xs sm:text-sm bg-transparent border-b border-stone-200 focus:outline-none py-1"
              style={{ color: theme.textColor }}
            />
          ) : (
            <p className="text-xs sm:text-sm" style={{ color: theme.textColor }}>
              {content.currentNeeds}
            </p>
          )}
        </div>

        <div
          className="p-4 rounded-xl border"
          style={{
            borderColor: theme.borderColor,
            backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
          }}
        >
          <span className="text-xs uppercase tracking-wider font-bold text-stone-600 block mb-1 font-sans-clean">
            {isId ? '✦ Hal yang Membantu Hari Ini' : '✦ Helpful Soothing Actions'}
          </span>
          {isEditable ? (
            <input
              type="text"
              value={content.helpfulActions || ''}
              onChange={(e) => onChange('helpfulActions', e.target.value)}
              placeholder="Teh hangat, jalan kaki santai, menarik napas..."
              className="w-full text-xs sm:text-sm bg-transparent border-b border-stone-200 focus:outline-none py-1"
              style={{ color: theme.textColor }}
            />
          ) : (
            <p className="text-xs sm:text-sm" style={{ color: theme.textColor }}>
              {content.helpfulActions}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
