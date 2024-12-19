"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Checkbox,
  Box,
  Typography,
  Pagination,
} from "@mui/material";

export const DeleteTransactionModal = ({
  open,
  onClose,
  transactions = [],
  onDeleteTransactions,
}) => {
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  const groupByMonthYear = (transactions) => {
    return transactions.reduce((groups, transaction) => {
      if (!transaction || !transaction.date) {
        console.warn("Skipping invalid transaction:", transaction);
        return groups;
      }

      const date = new Date(transaction.date);
      if (isNaN(date.getTime())) {
        console.warn("Skipping transaction with invalid date:", transaction);
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

  const formatFriendlyDateTime = (date) => {
    if (!date) return "Data não disponível";
    const dateTimeFormatter = new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    return dateTimeFormatter.format(new Date(date));
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const validTransactions = transactions.filter(
    (transaction) => transaction && transaction.date
  );
  const groupedTransactions = groupByMonthYear(validTransactions);

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = Object.values(groupedTransactions)
    .flat()
    .slice(indexOfFirstTransaction, indexOfLastTransaction);

  const handleToggleTransaction = (transactionId) => {
    if (selectedTransactions.includes(transactionId)) {
      setSelectedTransactions((prevSelected) =>
        prevSelected.filter((id) => id !== transactionId)
      );
    } else {
      setSelectedTransactions((prevSelected) => [
        ...prevSelected,
        transactionId,
      ]);
    }
  };

  const handleDelete = () => {
    onDeleteTransactions(selectedTransactions);
    setSelectedTransactions([]);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ style: { backgroundColor: "#E0E1DD" } }}
    >
      <DialogTitle>Excluir Transações</DialogTitle>
      <DialogContent dividers>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="subtitle1" style={{ width: "30%" }}>
            Data
          </Typography>
          <Typography variant="subtitle1" style={{ width: "40%" }}>
            Tipo
          </Typography>
          <Typography variant="subtitle1" style={{ width: "30%" }}>
            Valor
          </Typography>
        </Box>

        {currentTransactions.map((transaction) => (
          <Box
            key={transaction.id || `${transaction.date}-${transaction.value}`}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
            width="100%"
          >
            <Checkbox
              checked={selectedTransactions.includes(transaction.id)}
              onChange={() => handleToggleTransaction(transaction.id)}
            />
            <Box display="flex" justifyContent="space-between" flex="1">
              <Typography
                variant="body2"
                style={{
                  width: "30%",
                  whiteSpace: "nowrap",
                }}
              >
                {formatFriendlyDateTime(transaction.date)}
              </Typography>
              <Typography
                variant="body2"
                style={{
                  width: "40%",
                  whiteSpace: "nowrap",
                  textAlign: "left",
                }}
              >
                {transaction.type === "Credit" ? "Crédito" : "Débito"}
              </Typography>
              <Typography
                variant="body2"
                style={{
                  width: "30%",
                  whiteSpace: "nowrap",
                  textAlign: "right",
                }}
              >
                {formatCurrency(transaction.value)}
              </Typography>
            </Box>
          </Box>
        ))}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary" variant="outlined">
          Fechar
        </Button>
        <Button
          onClick={handleDelete}
          color="error"
          variant="contained"
          disabled={selectedTransactions.length === 0}
        >
          Deletar Selecionadas
        </Button>
      </DialogActions>
    </Dialog>
  );
};
