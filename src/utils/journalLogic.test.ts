import test from 'node:test';
import assert from 'node:assert/strict';
import {
  reorderPages,
  duplicatePage,
  deletePage,
  calculateHabitCompletionRate,
  calculateFinanceSummary,
  calculateGoalsAverageProgress,
} from './journalLogic';
import { JournalPage, HabitItem, FinanceTransaction, GoalItem } from '../types/journal';

test('reorderPages correctly moves an item', () => {
  const pages: JournalPage[] = [
    { id: '1', title: 'Page 1', templateType: 'cover', content: {} as any },
    { id: '2', title: 'Page 2', templateType: 'daily', content: {} as any },
    { id: '3', title: 'Page 3', templateType: 'weekly', content: {} as any },
  ];

  const reordered = reorderPages(pages, 0, 2);
  assert.equal(reordered[0].id, '2');
  assert.equal(reordered[1].id, '3');
  assert.equal(reordered[2].id, '1');
});

test('duplicatePage clones page content and inserts right after', () => {
  const pages: JournalPage[] = [
    { id: 'p1', title: 'Original', templateType: 'daily', content: { date: '2026-10-28' } as any },
    { id: 'p2', title: 'Next Page', templateType: 'weekly', content: {} as any },
  ];

  const duplicated = duplicatePage(pages, 'p1');
  assert.equal(duplicated.length, 3);
  assert.equal(duplicated[0].id, 'p1');
  assert.equal(duplicated[1].title, 'Original (Salinan)');
  assert.notEqual(duplicated[1].id, 'p1');
  assert.equal(duplicated[2].id, 'p2');
});

test('deletePage prevents deleting the only remaining page', () => {
  const pages: JournalPage[] = [
    { id: 'only', title: 'Sole Page', templateType: 'cover', content: {} as any },
  ];
  const result = deletePage(pages, 'only');
  assert.equal(result.length, 1);
  assert.equal(result[0].id, 'only');
});

test('calculateHabitCompletionRate handles habits correctly', () => {
  const habits: HabitItem[] = [
    { id: '1', name: 'Air Putih', category: 'Health', targetPerWeek: 7, history: [true, true, true, false] },
    { id: '2', name: 'Membaca', category: 'Mind', targetPerWeek: 5, history: [true, false, false, false] },
  ];

  const stats = calculateHabitCompletionRate(habits);
  assert.equal(stats.completedCount, 4);
  assert.equal(stats.totalChecks, 8);
  assert.equal(stats.percentage, 50);
});

test('calculateFinanceSummary computes income, expenses, and savings', () => {
  const transactions: FinanceTransaction[] = [
    { id: '1', date: '2026-10-01', description: 'Gaji', category: 'income', amount: 10000000, type: 'income' },
    { id: '2', date: '2026-10-02', description: 'Makan', category: 'food', amount: 2000000, type: 'expense' },
    { id: '3', date: '2026-10-05', description: 'Sewa', category: 'bills', amount: 3000000, type: 'expense' },
  ];

  const summary = calculateFinanceSummary(transactions, 6000000);
  assert.equal(summary.totalIncome, 10000000);
  assert.equal(summary.totalExpense, 5000000);
  assert.equal(summary.netBalance, 5000000);
  assert.equal(summary.budgetRemaining, 1000000);
  assert.equal(summary.savingsRate, 50);
});

test('calculateGoalsAverageProgress calculates accurate average percentage', () => {
  const goals: GoalItem[] = [
    { id: '1', title: 'Goal 1', type: 'short-term', whyItMatters: '', actionSteps: [], targetDate: '', progressPercent: 80, obstacles: '', adjustments: '' },
    { id: '2', title: 'Goal 2', type: 'short-term', whyItMatters: '', actionSteps: [], targetDate: '', progressPercent: 40, obstacles: '', adjustments: '' },
  ];

  const avg = calculateGoalsAverageProgress(goals);
  assert.equal(avg, 60);
});
