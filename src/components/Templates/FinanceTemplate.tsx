import React from 'react';
import { FinanceContent, ThemeConfig, Language, FinanceTransaction } from '../../types/journal';
import { Wallet, Plus, Trash2, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';
import { calculateFinanceSummary } from '../../utils/journalLogic';

interface FinanceTemplateProps {
  content: FinanceContent;
  theme: ThemeConfig;
  lang: Language;
  isEditable?: boolean;
  onChange: (field: string, value: any) => void;
  inkSaverMode?: boolean;
}

export const FinanceTemplate: React.FC<FinanceTemplateProps> = ({
  content,
  theme,
  lang,
  isEditable,
  onChange,
  inkSaverMode,
}) => {
  const isId = lang === 'id';
  const transactions = content.transactions || [];
  const summary = calculateFinanceSummary(transactions, content.monthlyBudget, content.savingsTarget);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleAddTransaction = (type: 'income' | 'expense') => {
    const newTx: FinanceTransaction = {
      id: `tx_${Date.now()}`,
      date: '28 Okt',
      description: '',
      category: type === 'income' ? 'income' : 'food',
      amount: 0,
      type,
    };
    onChange('transactions', [...transactions, newTx]);
  };

  const handleTxChange = (id: string, field: keyof FinanceTransaction, val: any) => {
    const next = transactions.map((t) => (t.id === id ? { ...t, [field]: val } : t));
    onChange('transactions', next);
  };

  const handleDeleteTx = (id: string) => {
    const next = transactions.filter((t) => t.id !== id);
    onChange('transactions', next);
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
          <Wallet className="w-6 h-6" style={{ color: theme.accentColor }} />
          <div>
            <div className="flex items-center gap-2 mb-1">
              {isEditable ? (
                <input
                  type="text"
                  value={content.period || ''}
                  onChange={(e) => onChange('period', e.target.value)}
                  placeholder="Oktober 2026..."
                  className="text-xs font-semibold uppercase tracking-wider text-stone-500 bg-transparent border-b border-transparent hover:border-stone-300 focus:outline-none"
                />
              ) : (
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  {content.period}
                </span>
              )}
            </div>
            <h2 className="text-2xl font-serif-display font-bold" style={{ color: theme.primaryColor }}>
              {isId ? 'Jurnal Keuangan Pribadi' : 'Personal Finance Journal'}
            </h2>
          </div>
        </div>

        {/* Budget & Target inputs */}
        <div className="flex items-center gap-3 text-xs">
          <div className="p-2.5 rounded-lg bg-stone-100/70 border border-stone-200">
            <span className="text-[10px] uppercase font-bold text-stone-500 block">
              {isId ? 'Anggaran Bulanan' : 'Monthly Budget'}
            </span>
            {isEditable ? (
              <input
                type="number"
                value={content.monthlyBudget || 0}
                onChange={(e) => onChange('monthlyBudget', parseFloat(e.target.value) || 0)}
                className="font-mono font-bold text-stone-800 bg-transparent border-b border-stone-300 focus:outline-none w-24 text-sm"
              />
            ) : (
              <span className="font-mono font-bold text-stone-800 text-sm">
                {formatCurrency(content.monthlyBudget || 0)}
              </span>
            )}
          </div>

          <div className="p-2.5 rounded-lg bg-stone-100/70 border border-stone-200">
            <span className="text-[10px] uppercase font-bold text-stone-500 block">
              {isId ? 'Target Tabungan' : 'Savings Target'}
            </span>
            {isEditable ? (
              <input
                type="number"
                value={content.savingsTarget || 0}
                onChange={(e) => onChange('savingsTarget', parseFloat(e.target.value) || 0)}
                className="font-mono font-bold text-stone-800 bg-transparent border-b border-stone-300 focus:outline-none w-24 text-sm"
              />
            ) : (
              <span className="font-mono font-bold text-stone-800 text-sm">
                {formatCurrency(content.savingsTarget || 0)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 4 Financial Stat KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-sans-clean">
        <div className="p-3.5 rounded-xl border bg-white border-stone-200">
          <div className="flex items-center gap-1.5 text-stone-500 mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isId ? 'Total Pemasukan' : 'Total Income'}</span>
          </div>
          <span className="text-sm sm:text-base font-bold font-mono text-emerald-700">
            {formatCurrency(summary.totalIncome)}
          </span>
        </div>

        <div className="p-3.5 rounded-xl border bg-white border-stone-200">
          <div className="flex items-center gap-1.5 text-stone-500 mb-1">
            <TrendingDown className="w-3.5 h-3.5 text-rose-500" />
            <span>{isId ? 'Total Pengeluaran' : 'Total Expense'}</span>
          </div>
          <span className="text-sm sm:text-base font-bold font-mono text-rose-600">
            {formatCurrency(summary.totalExpense)}
          </span>
        </div>

        <div className="p-3.5 rounded-xl border bg-white border-stone-200">
          <div className="flex items-center gap-1.5 text-stone-500 mb-1">
            <PiggyBank className="w-3.5 h-3.5 text-indigo-500" />
            <span>{isId ? 'Saldo Bersih' : 'Net Balance'}</span>
          </div>
          <span className="text-sm sm:text-base font-bold font-mono text-stone-800">
            {formatCurrency(summary.netBalance)}
          </span>
        </div>

        <div className="p-3.5 rounded-xl border bg-white border-stone-200">
          <div className="flex items-center gap-1.5 text-stone-500 mb-1">
            <span className="font-bold text-xs">%</span>
            <span>{isId ? 'Rasio Tabungan' : 'Savings Rate'}</span>
          </div>
          <span className="text-sm sm:text-base font-bold font-mono text-stone-800">
            {summary.savingsRate}%
          </span>
        </div>
      </div>

      {/* Transactions Table */}
      <div
        className="p-5 rounded-xl border overflow-x-auto"
        style={{
          borderColor: theme.borderColor,
          backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
        }}
      >
        <div className="flex items-center justify-between mb-3 border-b pb-2" style={{ borderColor: theme.borderColor }}>
          <h3 className="font-serif-classic font-bold text-sm" style={{ color: theme.primaryColor }}>
            {isId ? 'Daftar Catatan Transaksi' : 'Transactions Record'}
          </h3>
          {isEditable && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleAddTransaction('income')}
                className="text-xs flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-medium"
              >
                <Plus className="w-3 h-3" /> {isId ? '+ Pemasukan' : '+ Income'}
              </button>
              <button
                type="button"
                onClick={() => handleAddTransaction('expense')}
                className="text-xs flex items-center gap-1 px-2.5 py-1 rounded bg-rose-50 text-rose-700 hover:bg-rose-100 font-medium"
              >
                <Plus className="w-3 h-3" /> {isId ? '+ Pengeluaran' : '+ Expense'}
              </button>
            </div>
          )}
        </div>

        <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[500px]">
          <thead>
            <tr className="border-b text-stone-500 text-xs font-sans-clean" style={{ borderColor: theme.borderColor }}>
              <th className="py-2 px-2 w-20">{isId ? 'Tanggal' : 'Date'}</th>
              <th className="py-2 px-2">{isId ? 'Deskripsi Transaksi' : 'Description'}</th>
              <th className="py-2 px-2 w-28">{isId ? 'Kategori' : 'Category'}</th>
              <th className="py-2 px-2 text-right w-32">{isId ? 'Jumlah' : 'Amount'}</th>
              {isEditable && <th className="py-2 px-1 w-8"></th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200/60">
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-stone-50/50 transition-colors">
                <td className="py-2 px-2">
                  {isEditable ? (
                    <input
                      type="text"
                      value={tx.date}
                      onChange={(e) => handleTxChange(tx.id, 'date', e.target.value)}
                      placeholder="Tgl"
                      className="w-16 font-mono text-xs bg-transparent border-b border-transparent focus:outline-none"
                    />
                  ) : (
                    <span className="font-mono text-xs text-stone-500">{tx.date}</span>
                  )}
                </td>

                <td className="py-2 px-2">
                  {isEditable ? (
                    <input
                      type="text"
                      value={tx.description}
                      onChange={(e) => handleTxChange(tx.id, 'description', e.target.value)}
                      placeholder="Keterangan..."
                      className="w-full bg-transparent border-b border-transparent focus:outline-none text-stone-700 font-medium"
                    />
                  ) : (
                    <span className="text-stone-700 font-medium">{tx.description}</span>
                  )}
                </td>

                <td className="py-2 px-2">
                  {isEditable ? (
                    <select
                      value={tx.category}
                      onChange={(e) => handleTxChange(tx.id, 'category', e.target.value)}
                      className="text-xs rounded border border-stone-200 bg-white px-1.5 py-0.5 text-stone-600 focus:outline-none"
                    >
                      <option value="income">{isId ? 'Pemasukan' : 'Income'}</option>
                      <option value="food">{isId ? 'Makanan' : 'Food'}</option>
                      <option value="bills">{isId ? 'Tagihan' : 'Bills'}</option>
                      <option value="study">{isId ? 'Edukasi' : 'Study'}</option>
                      <option value="leisure">{isId ? 'Hiburan' : 'Leisure'}</option>
                      <option value="health">{isId ? 'Kesehatan' : 'Health'}</option>
                      <option value="savings">{isId ? 'Tabungan' : 'Savings'}</option>
                      <option value="other">{isId ? 'Lainnya' : 'Other'}</option>
                    </select>
                  ) : (
                    <span className="text-xs text-stone-500 capitalize">{tx.category}</span>
                  )}
                </td>

                <td className="py-2 px-2 text-right">
                  {isEditable ? (
                    <input
                      type="number"
                      value={tx.amount || 0}
                      onChange={(e) => handleTxChange(tx.id, 'amount', parseFloat(e.target.value) || 0)}
                      className={`w-28 text-right font-mono font-semibold bg-transparent border-b border-transparent focus:outline-none ${
                        tx.type === 'income' ? 'text-emerald-700' : 'text-stone-800'
                      }`}
                    />
                  ) : (
                    <span
                      className={`font-mono font-semibold ${
                        tx.type === 'income' ? 'text-emerald-700' : 'text-stone-800'
                      }`}
                    >
                      {tx.type === 'income' ? '+' : '-'} {formatCurrency(tx.amount || 0)}
                    </span>
                  )}
                </td>

                {isEditable && (
                  <td className="py-2 px-1 text-center">
                    <button
                      type="button"
                      onClick={() => handleDeleteTx(tx.id)}
                      className="text-stone-300 hover:text-rose-500 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Financial Notes */}
      <div
        className="p-4 rounded-xl border"
        style={{
          borderColor: theme.borderColor,
          backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
        }}
      >
        <span className="text-xs uppercase tracking-wider font-bold text-stone-600 block mb-1 font-sans-clean">
          {isId ? 'Catatan & Evaluasi Finansial' : 'Financial Notes & Reflection'}
        </span>
        {isEditable ? (
          <textarea
            value={content.notes || ''}
            onChange={(e) => onChange('notes', e.target.value)}
            placeholder="Catatan anggaran, evaluasi pengeluaran impulsif, atau rencana keuangan..."
            rows={2}
            className="w-full text-xs sm:text-sm font-serif-reading italic bg-transparent border border-transparent hover:border-stone-200 focus:outline-none rounded p-1 resize-none"
            style={{ color: theme.textColor }}
          />
        ) : (
          <p className="text-xs sm:text-sm font-serif-reading italic" style={{ color: theme.textColor }}>
            {content.notes}
          </p>
        )}
      </div>
    </div>
  );
};
