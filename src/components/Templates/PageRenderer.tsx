import React from 'react';
import {
  JournalPage,
  ThemeConfig,
  CoverContent,
  PersonalInfoContent,
  DailyContent,
  WeeklyContent,
  MonthlyContent,
  MoodContent,
  GratitudeContent,
  HabitContent,
  GoalContent,
  FinanceContent,
  StudyWorkContent,
  FreeWritingContent,
  ClosingContent,
  Language,
} from '../../types/journal';
import { CoverTemplate } from './CoverTemplate';
import { PersonalInfoTemplate } from './PersonalInfoTemplate';
import { DailyTemplate } from './DailyTemplate';
import { WeeklyTemplate } from './WeeklyTemplate';
import { MonthlyTemplate } from './MonthlyTemplate';
import { MoodTemplate } from './MoodTemplate';
import { GratitudeTemplate } from './GratitudeTemplate';
import { HabitTemplate } from './HabitTemplate';
import { GoalsTemplate } from './GoalsTemplate';
import { FinanceTemplate } from './FinanceTemplate';
import { StudyWorkTemplate } from './StudyWorkTemplate';
import { FreeWritingTemplate } from './FreeWritingTemplate';
import { ClosingTemplate } from './ClosingTemplate';

interface PageRendererProps {
  page: JournalPage;
  theme: ThemeConfig;
  lang: Language;
  isEditable?: boolean;
  onUpdateContent?: (updatedContent: any) => void;
  inkSaverMode?: boolean;
}

export const PageRenderer: React.FC<PageRendererProps> = ({
  page,
  theme,
  lang,
  isEditable = true,
  onUpdateContent,
  inkSaverMode = false,
}) => {
  const content = page.content;

  const handleFieldChange = (field: string, value: any) => {
    if (!onUpdateContent) return;
    onUpdateContent({
      ...content,
      [field]: value,
    });
  };

  switch (page.templateType) {
    case 'cover':
      return (
        <CoverTemplate
          content={content as CoverContent}
          theme={theme}
          lang={lang}
          isEditable={isEditable}
          onChange={handleFieldChange}
          inkSaverMode={inkSaverMode}
        />
      );

    case 'personal_info':
      return (
        <PersonalInfoTemplate
          content={content as PersonalInfoContent}
          theme={theme}
          lang={lang}
          isEditable={isEditable}
          onChange={handleFieldChange}
          inkSaverMode={inkSaverMode}
        />
      );

    case 'daily':
      return (
        <DailyTemplate
          content={content as DailyContent}
          theme={theme}
          lang={lang}
          isEditable={isEditable}
          onChange={handleFieldChange}
          inkSaverMode={inkSaverMode}
        />
      );

    case 'weekly':
      return (
        <WeeklyTemplate
          content={content as WeeklyContent}
          theme={theme}
          lang={lang}
          isEditable={isEditable}
          onChange={handleFieldChange}
          inkSaverMode={inkSaverMode}
        />
      );

    case 'monthly':
      return (
        <MonthlyTemplate
          content={content as MonthlyContent}
          theme={theme}
          lang={lang}
          isEditable={isEditable}
          onChange={handleFieldChange}
          inkSaverMode={inkSaverMode}
        />
      );

    case 'mood':
      return (
        <MoodTemplate
          content={content as MoodContent}
          theme={theme}
          lang={lang}
          isEditable={isEditable}
          onChange={handleFieldChange}
          inkSaverMode={inkSaverMode}
        />
      );

    case 'gratitude':
      return (
        <GratitudeTemplate
          content={content as GratitudeContent}
          theme={theme}
          lang={lang}
          isEditable={isEditable}
          onChange={handleFieldChange}
          inkSaverMode={inkSaverMode}
        />
      );

    case 'habit':
      return (
        <HabitTemplate
          content={content as HabitContent}
          theme={theme}
          lang={lang}
          isEditable={isEditable}
          onChange={handleFieldChange}
          inkSaverMode={inkSaverMode}
        />
      );

    case 'goals':
      return (
        <GoalsTemplate
          content={content as GoalContent}
          theme={theme}
          lang={lang}
          isEditable={isEditable}
          onChange={handleFieldChange}
          inkSaverMode={inkSaverMode}
        />
      );

    case 'finance':
      return (
        <FinanceTemplate
          content={content as FinanceContent}
          theme={theme}
          lang={lang}
          isEditable={isEditable}
          onChange={handleFieldChange}
          inkSaverMode={inkSaverMode}
        />
      );

    case 'study_work':
      return (
        <StudyWorkTemplate
          content={content as StudyWorkContent}
          theme={theme}
          lang={lang}
          isEditable={isEditable}
          onChange={handleFieldChange}
          inkSaverMode={inkSaverMode}
        />
      );

    case 'free_writing':
      return (
        <FreeWritingTemplate
          content={content as FreeWritingContent}
          theme={theme}
          lang={lang}
          isEditable={isEditable}
          onChange={handleFieldChange}
          inkSaverMode={inkSaverMode}
        />
      );

    case 'closing':
      return (
        <ClosingTemplate
          content={content as ClosingContent}
          theme={theme}
          lang={lang}
          isEditable={isEditable}
          onChange={handleFieldChange}
          inkSaverMode={inkSaverMode}
        />
      );

    default:
      return (
        <div className="p-8 text-center text-stone-500">
          Template format tidak dikenali.
        </div>
      );
  }
};
