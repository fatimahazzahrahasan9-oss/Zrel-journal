import { JournalPage, TemplateType, HabitItem, FinanceTransaction, GoalItem } from '../types/journal';
import { createNewPage } from './starterData';

export function reorderPages(pages: JournalPage[], fromIndex: number, toIndex: number): JournalPage[] {
  if (fromIndex < 0 || fromIndex >= pages.length || toIndex < 0 || toIndex >= pages.length) {
    return pages;
  }
  const result = [...pages];
  const [removed] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, removed);
  return result;
}

export function duplicatePage(pages: JournalPage[], pageId: string): JournalPage[] {
  const index = pages.findIndex((p) => p.id === pageId);
  if (index === -1) return pages;

  const original = pages[index];
  const copy: JournalPage = {
    ...original,
    id: `page_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    title: `${original.title} (Salinan)`,
    content: JSON.parse(JSON.stringify(original.content)),
  };

  const next = [...pages];
  next.splice(index + 1, 0, copy);
  return next;
}

export function deletePage(pages: JournalPage[], pageId: string): JournalPage[] {
  if (pages.length <= 1) {
    return pages; // Keep at least one page
  }
  return pages.filter((p) => p.id !== pageId);
}

export function addPageToJournal(
  pages: JournalPage[],
  templateType: TemplateType,
  insertAfterIndex?: number
): { pages: JournalPage[]; newPageId: string } {
  const newPage = createNewPage(templateType);
  const result = [...pages];
  if (insertAfterIndex !== undefined && insertAfterIndex >= 0 && insertAfterIndex < result.length) {
    result.splice(insertAfterIndex + 1, 0, newPage);
  } else {
    result.push(newPage);
  }
  return { pages: result, newPageId: newPage.id };
}

// Pure calculations for Habit Tracker
export function calculateHabitCompletionRate(habits: HabitItem[]): {
  completedCount: number;
  totalChecks: number;
  percentage: number;
} {
  if (!habits || habits.length === 0) {
    return { completedCount: 0, totalChecks: 0, percentage: 0 };
  }

  let completedCount = 0;
  let totalChecks = 0;

  for (const h of habits) {
    for (const val of h.history) {
      totalChecks++;
      if (val) completedCount++;
    }
  }

  const percentage = totalChecks > 0 ? Math.round((completedCount / totalChecks) * 100) : 0;
  return { completedCount, totalChecks, percentage };
}

// Pure calculations for Finance Journal
export function calculateFinanceSummary(
  transactions: FinanceTransaction[],
  monthlyBudget: number = 0,
  savingsTarget: number = 0
): {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
  budgetRemaining: number;
  savingsRate: number;
} {
  let totalIncome = 0;
  let totalExpense = 0;

  for (const tx of transactions) {
    if (tx.type === 'income') {
      totalIncome += tx.amount || 0;
    } else {
      totalExpense += tx.amount || 0;
    }
  }

  const netBalance = totalIncome - totalExpense;
  const budgetRemaining = monthlyBudget - totalExpense;
  const savingsRate = totalIncome > 0 ? Math.round((netBalance / totalIncome) * 100) : 0;

  return {
    totalIncome,
    totalExpense,
    netBalance,
    budgetRemaining,
    savingsRate,
  };
}

// Pure calculations for Goals
export function calculateGoalsAverageProgress(goals: GoalItem[]): number {
  if (!goals || goals.length === 0) return 0;
  const total = goals.reduce((acc, g) => acc + (g.progressPercent || 0), 0);
  return Math.round(total / goals.length);
}
