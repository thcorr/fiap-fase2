"use client";
import { useEffect, useState } from "react";
import { DashboardMainCard } from "./DashboardMainCard";
import { DashboardExtrato } from "./DashboardExtrato";
import { DashboardNovaTransacao } from "./DashboardNovaTransacao";
import { useTransactionStore } from "@/store/transactionStore";
import {
  deleteTransactions,
  fetchTransactionsFromStore,
  updateTransaction,
} from "@/api/transactionService";

export default function DashboardBody() {
  const transactions = useTransactionStore((state) => state.transactions);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const fetchedTransactions = fetchTransactionsFromStore();
        console.log("Fetched Transactions from Store:", fetchedTransactions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching transactions from store:", error);
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  const onAddTransaction = async (newTransaction) => {
    try {
      await onAddTransaction(newTransaction);
      console.log("Transaction added:", newTransaction);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const onUpdateTransaction = async (updatedTransaction) => {
    try {
      await updateTransaction(updatedTransaction);
      console.log("Transaction updated:", updatedTransaction);
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  };

  const onDeleteTransactions = async (transactionIds) => {
    try {
      await deleteTransactions(transactionIds);
      console.log("Transactions deleted:", transactionIds);
    } catch (error) {
      console.error("Error deleting transactions:", error);
    }
  };

  return (
    <div className="bg-[#E0E1DD] h-screen overflow-y-auto">
      <div className="flex bg-[#E0E1DD] h-screen">
        <div className="flex flex-col w-full min-w-[600px]">
          <div className="w-full mt-2.5 h-1/2 lg:h-1/2">
            <DashboardMainCard transactions={transactions} />
          </div>
          <div className="w-full mt-2.5 h-1/3 lg:h-1/2 mb-2">
            <DashboardNovaTransacao onAddTransaction={onAddTransaction} />
          </div>
          <div className="lg:hidden mx-12 h-1/3 mb-8">
            <DashboardExtrato
              transactions={transactions}
              loading={loading}
              onDeleteTransactions={onDeleteTransactions}
              onUpdateTransaction={onUpdateTransaction}
            />
          </div>
        </div>
        <div className="hidden lg:block mt-2.5 mr-32 mb-2.5">
          <DashboardExtrato
            transactions={transactions}
            loading={loading}
            onDeleteTransactions={onDeleteTransactions}
            onUpdateTransaction={onUpdateTransaction}
          />
        </div>
      </div>
    </div>
  );
}
