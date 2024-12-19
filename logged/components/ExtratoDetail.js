"use client";
import { useEffect, useState } from "react";
import { EditTransactionModal } from "./EditTransactionModal";
import { DeleteTransactionModal } from "./DeleteTransactionModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import {
  fetchTransactionsFromStore,
  createTransaction,
  updateTransaction,
  deleteTransactions,
} from "@/api/transactionService";
import { useTransactionStore } from "@/store/transactionStore";

export default function ExtratoDetail() {
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const transactions = useTransactionStore((state) => state.transactions);

  useEffect(() => {
    const loadTransactions = () => {
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
      await createTransaction(newTransaction);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const onUpdateTransaction = (updatedTransaction) => {
    try {
      updateTransaction(updatedTransaction);
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  };

  const onDeleteTransactions = (transactionIds) => {
    try {
      deleteTransactions(transactionIds);
    } catch (error) {
      console.error("Error deleting transactions:", error);
    }
  };

  const groupByMonthYear = (transactions) => {
    return transactions.reduce((groups, transaction) => {
      const date = new Date(transaction.date);
      const yearMonth = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;
      if (!groups[yearMonth]) {
        groups[yearMonth] = [];
      }
      groups[yearMonth].push(transaction);
      return groups;
    }, {});
  };

  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const formatMonthYear = (date) => {
    const monthFormatter = new Intl.DateTimeFormat("pt-BR", {
      month: "long",
    });
    const yearFormatter = new Intl.DateTimeFormat("pt-BR", {
      year: "numeric",
    });
    const month = capitalizeFirstLetter(monthFormatter.format(date));
    const year = yearFormatter.format(date);
    return `${month} / ${year}`;
  };

  const formatFriendlyDateTime = (date) => {
    const dateTimeFormatter = new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    return dateTimeFormatter.format(date);
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount);

  const groupedTransactions = groupByMonthYear(transactions);
  const sortedMonths = Object.keys(groupedTransactions).sort((a, b) => {
    return new Date(b) - new Date(a);
  });

  return (
    <div className="flex flex-col bg-[#1B263B] min-h-screen m-2.5 rounded-xl">
      <div className="flex mt-10 text-[#E0E1DD] ml-16 mb-10 text-5xl font-semibold space-x-20 mr-10">
        Extrato
        <EditIcon
          style={{ fontSize: 40 }}
          className="ml-auto rounded-full p-[3px] bg-[#778DA9] flex-shrink-0 cursor-pointer hover:bg-[#E0E1DD] hover:text-[#1B263B]"
          onClick={() => setEditModalOpen(true)}
        />
        <DeleteIcon
          style={{ fontSize: 40 }}
          className="rounded-full p-[3px] bg-[#778DA9] flex-shrink-0 cursor-pointer hover:bg-[#E0E1DD] hover:text-[#1B263B]"
          onClick={() => setDeleteModalOpen(true)}
        />
      </div>

      <div className="ml-16 space-y-6">
        {loading ? (
          <div className="text-2xl">
            <li>Carregando transações...</li>
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-2xl">
            <li>Nenhuma transação disponível.</li>
          </div>
        ) : (
          <div className="flex flex-col space-y-10">
            {sortedMonths.map((yearMonth) => {
              const dateParts = yearMonth.split("-");
              const formattedDate = formatMonthYear(
                new Date(dateParts[0], dateParts[1] - 1)
              );

              const sortedTransactions = groupedTransactions[yearMonth].sort(
                (a, b) => new Date(b.date) - new Date(a.date)
              );

              return (
                <div
                  key={yearMonth}
                  className="text-[#778DA9] text-2xl space-y-6 w-full"
                >
                  <div className="font-bold underline text-3xl mb-5">
                    {formattedDate}
                  </div>

                  <ul className="space-y-4 mr-14">
                    {sortedTransactions.map((transaction) => (
                      <li
                        key={transaction.id}
                        className="flex justify-between w-full py-2 border-b border-[#778DA9]"
                      >
                        <span className="flex-1 text-left">
                          {formatFriendlyDateTime(new Date(transaction.date))}
                        </span>

                        <span className="flex-1 text-center">
                          {transaction.type}
                        </span>

                        <span className="flex-1 text-right font-semibold">
                          {formatCurrency(transaction.value)}
                        </span>

                        <span className="flex-1 text-right font-semibold">
                          <DownloadIcon
                            style={{ fontSize: 40 }}
                            className="ml-auto rounded-full p-[3px] bg-[#778DA9] text-[#E0E1DD] flex-shrink-0 cursor-pointer hover:bg-[#E0E1DD] hover:text-[#1B263B]"
                          />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <EditTransactionModal
        open={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        transactions={transactions}
        onUpdateTransaction={onUpdateTransaction}
      />

      <DeleteTransactionModal
        open={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        transactions={transactions}
        onDeleteTransactions={onDeleteTransactions}
      />
    </div>
  );
}
