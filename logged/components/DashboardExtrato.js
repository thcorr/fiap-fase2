"use client";

import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { EditTransactionModal } from "./EditTransactionModal";
import { DeleteTransactionModal } from "./DeleteTransactionModal";
import { useTransactionStore } from "@/store/transactionStore";
import {
  deleteTransactions,
  updateTransaction,
} from "@/api/transactionService";

export const DashboardExtrato = () => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const transactions = useTransactionStore((state) => state.transactions);

  const groupByMonthYear = (transactions) => {
    return transactions.reduce((groups, transaction) => {
      if (!transaction.date) {
        console.warn("Transaction is missing a date:", transaction);
        return groups;
      }

      const date = new Date(transaction.date);
      if (isNaN(date.getTime())) {
        console.error("Invalid transaction date:", transaction.date);
        return groups;
      }

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

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const formatMonthYear = (date) => {
    const monthFormatter = new Intl.DateTimeFormat("pt-BR", { month: "long" });
    const yearFormatter = new Intl.DateTimeFormat("pt-BR", { year: "numeric" });
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount);
  };

  const groupedTransactions = groupByMonthYear(transactions);
  const sortedMonths = Object.keys(groupedTransactions).sort((a, b) => {
    return new Date(b) - new Date(a);
  });

  return (
    <div className="bg-[#415A77] w-full lg:w-[260px] flex-grow min-h-[200px] h-full overflow-y-auto text-[#1B263B] rounded-xl">
      <div className="flex items-center justify-center space-x-2 px-6 py-8">
        <div className="font-bold text-3xl mr-10">Extrato</div>
        <EditIcon
          style={{ fontSize: 32 }}
          className="rounded-full p-[3px] bg-[#778DA9] flex-shrink-0 cursor-pointer hover:bg-[#1B263B] hover:text-[#E0E1DD]"
          onClick={() => setEditModalOpen(true)}
        />
        <DeleteIcon
          style={{ fontSize: 32 }}
          className="rounded-full p-[3px] bg-[#778DA9] flex-shrink-0 cursor-pointer hover:bg-[#1B263B] hover:text-[#E0E1DD]"
          onClick={() => setDeleteModalOpen(true)}
        />
      </div>

      {transactions.length === 0 ? (
        <div className="mx-10 text-xl lg:mx-0 lg:px-6 space-y-2">
          <li>Nenhuma transação disponível.</li>
        </div>
      ) : (
        <ul className="mx-10 lg:mx-0 lg:px-6 space-y-2">
          {sortedMonths.map((yearMonth) => {
            const dateParts = yearMonth.split("-");
            const formattedDate = formatMonthYear(
              new Date(dateParts[0], dateParts[1] - 1)
            );

            const sortedTransactions = groupedTransactions[yearMonth].sort(
              (a, b) => new Date(b.date) - new Date(a.date)
            );

            return (
              <div key={yearMonth}>
                <li className="font-bold underline">{formattedDate}</li>
                {sortedTransactions.map((transaction) => (
                  <li
                    key={transaction.id || `${yearMonth}-${transaction.value}`}
                  >
                    {formatFriendlyDateTime(new Date(transaction.date))} <br />
                    {transaction.type} <br />
                    <span className="font-semibold">
                      {formatCurrency(transaction.value)}
                    </span>
                  </li>
                ))}
              </div>
            );
          })}
        </ul>
      )}

      <EditTransactionModal
        open={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        transactions={transactions}
        onUpdateTransaction={updateTransaction}
      />

      <DeleteTransactionModal
        open={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        transactions={transactions}
        onDeleteTransactions={deleteTransactions}
      />
    </div>
  );
};
