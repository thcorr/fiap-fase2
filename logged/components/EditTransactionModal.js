"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Box,
  MenuItem,
  Select,
  FormControl,
  Typography,
  Pagination,
} from "@mui/material";

export const EditTransactionModal = ({
  open,
  onClose,
  transactions = [],
  onUpdateTransaction,
}) => {
  const [editableTransactions, setEditableTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    if (transactions.length > 0) {
      setEditableTransactions(transactions);
      setFilteredTransactions(transactions);
    }
  }, [transactions]);

  const handleUpdateTransaction = (id, updatedField, value) => {
    setEditableTransactions((prevTransactions) =>
      prevTransactions.map((transaction) =>
        transaction.id === id
          ? { ...transaction, [updatedField]: value }
          : transaction
      )
    );
    setFilteredTransactions((prevTransactions) =>
      prevTransactions.map((transaction) =>
        transaction.id === id
          ? { ...transaction, [updatedField]: value }
          : transaction
      )
    );
  };

  const applyFilters = () => {
    let filtered = [...editableTransactions];

    if (startDate) {
      const start = new Date(startDate.split("/").reverse().join("-"));
      filtered = filtered.filter(
        (transaction) => new Date(transaction.date) >= start
      );
    }
    if (endDate) {
      const end = new Date(endDate.split("/").reverse().join("-"));
      filtered = filtered.filter(
        (transaction) => new Date(transaction.date) <= end
      );
    }

    if (typeFilter) {
      filtered = filtered.filter(
        (transaction) => transaction.type === typeFilter
      );
    }

    setFilteredTransactions(filtered);
    setCurrentPage(1);
  };

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const handleSubmit = async () => {
    if (typeof onUpdateTransaction === "function") {
      for (const transaction of editableTransactions) {
        await onUpdateTransaction(transaction);
      }
      onClose();
    } else {
      console.error("onUpdateTransaction is not a function");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle style={{ backgroundColor: "#E0E1DD" }}>
        Editar Transações
      </DialogTitle>

      <DialogContent style={{ backgroundColor: "#E0E1DD" }}>
        <Box mb={3} display="flex" justifyContent="space-between">
          <Box width="20%">
            <Typography variant="subtitle1">Data Inicial</Typography>
            <TextField
              type="text"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="dd/mm/yyyy"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Box>
          <Box width="20%">
            <Typography variant="subtitle1">Data Final</Typography>
            <TextField
              type="text"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="dd/mm/yyyy"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Box>
          <Box width="20%">
            <Typography variant="subtitle1">Tipo</Typography>
            <FormControl fullWidth>
              <Select
                displayEmpty
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <MenuItem value="">
                  <em>Todos Tipos</em>
                </MenuItem>
                <MenuItem value="Credit">Crédito</MenuItem>
                <MenuItem value="Debit">Débito</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button onClick={applyFilters} variant="contained" color="primary">
            Filtrar
          </Button>
        </Box>

        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="subtitle1" style={{ width: "30%" }}>
            Data
          </Typography>
          <Typography variant="subtitle1" style={{ width: "30%" }}>
            Tipo
          </Typography>
          <Typography variant="subtitle1" style={{ width: "30%" }}>
            Valor
          </Typography>
        </Box>

        {currentTransactions.map((transaction, index) => (
          <Box
            key={transaction.id || index} // Ensure a unique key
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
            width="100%"
          >
            <TextField
              type="text"
              value={
                transaction.date
                  ? new Date(transaction.date).toLocaleDateString("pt-BR")
                  : ""
              }
              onChange={(e) =>
                handleUpdateTransaction(
                  transaction.id,
                  "date",
                  e.target.value.split("/").reverse().join("-")
                )
              }
              style={{ width: "30%" }}
              inputProps={{ style: { padding: "12px" } }}
            />
            <FormControl style={{ width: "30%" }}>
              <Select
                value={transaction.type || ""}
                onChange={(e) =>
                  handleUpdateTransaction(
                    transaction.id,
                    "type",
                    e.target.value
                  )
                }
                inputProps={{ style: { padding: "12px", minHeight: "56px" } }}
              >
                <MenuItem value="Credit">Crédito</MenuItem>
                <MenuItem value="Debit">Débito</MenuItem>
              </Select>
            </FormControl>
            <TextField
              type="text"
              value={
                transaction.value !== undefined
                  ? transaction.value.toString().replace(".", ",")
                  : ""
              }
              onChange={(e) => {
                const value = e.target.value.replace(",", ".");
                handleUpdateTransaction(transaction.id, "value", value);
              }}
              style={{ width: "30%" }}
              inputProps={{ style: { padding: "12px" } }}
            />
          </Box>
        ))}

        <Box mt={2} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(filteredTransactions.length / transactionsPerPage)}
            page={currentPage}
            onChange={(e, value) => setCurrentPage(value)}
            color="primary"
          />
        </Box>
      </DialogContent>

      <DialogActions style={{ backgroundColor: "#E0E1DD" }}>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Atualizar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
