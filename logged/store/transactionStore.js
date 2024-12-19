import { create } from "zustand";

export const useTransactionStore = create((set) => ({
  transactions: [],
  setTransactions: (transactions) => set({ transactions }),
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [...state.transactions, transaction],
    })),
  updateTransaction: (updatedTransaction) =>
    set((state) => ({
      transactions: state.transactions.map((transaction) =>
        transaction.id === updatedTransaction.id
          ? updatedTransaction
          : transaction
      ),
    })),
  removeTransactions: (transactionIds) =>
    set((state) => ({
      transactions: state.transactions.filter(
        (transaction) => !transactionIds.includes(transaction.id)
      ),
    })),
  getAllTransactions: () => get().transactions,
}));
