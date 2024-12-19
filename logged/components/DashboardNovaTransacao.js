"use client";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import {
  createTransaction,
  fetchTransactionsFromStore,
} from "@/api/transactionService";
import { useAccountStore } from "@/store/accountStore";

export const DashboardNovaTransacao = () => {
  const [transactionType, setTransactionType] = useState("");
  const [valor, setValor] = useState("R$0,00");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const accountData = useAccountStore((state) => state.accountData);
  const token = useAccountStore((state) => state.token);

  const handleChangeTransactionType = (event) => {
    setTransactionType(event.target.value);
  };

  const handleValorChange = (event) => {
    const value = event.target.value;
    const numericValue = value.replace(/[^0-9]/g, "");
    const formattedValue = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(numericValue / 100);

    setValor(formattedValue);
  };

  const handleSubmit = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!transactionType) {
      setErrorMessage("Selecione o tipo de transação.");
      return;
    }

    const numericValue = Number(
      valor
        .replace(/\./g, "")
        .replace(/,/g, ".")
        .replace(/[^0-9.-]+/g, "")
    );

    if (isNaN(numericValue) || numericValue <= 0) {
      setErrorMessage("O valor deve ser maior que R$0,00.");
      return;
    }

    const accountId = accountData?.result?.account[0]?.id;

    if (!accountId || !token) {
      setErrorMessage("Conta ou token não disponível.");
      return;
    }

    setLoading(true);

    try {
      const newTransaction = {
        accountId,
        type: transactionType === 10 ? "Credit" : "Debit",
        value: numericValue,
        from: transactionType === 10 ? "Account A" : null,
        to: transactionType === 20 ? "Account B" : null,
        date: new Date().toISOString(),
      };

      await createTransaction(newTransaction, token);

      fetchTransactionsFromStore();

      setSuccessMessage("Transação criada com sucesso!");
      setTransactionType("");
      setValor("R$0,00");
    } catch (error) {
      console.error("Erro ao criar transação:", error);
      setErrorMessage("Erro ao criar transação.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full flex-grow mx-12 lg:mx-2.5 bg-[#778DA9] text-[#E0E1DD] rounded-xl">
      <div className="text-2xl lg:text-3xl mt-8 font-semibold ml-8">
        Nova Transação
      </div>

      <div className="flex w-3/5 ml-8 mt-2 lg:mt-4">
        <FormControl fullWidth>
          <Select
            id="transaction-type-filled"
            value={transactionType}
            onChange={handleChangeTransactionType}
            displayEmpty
            variant="filled"
            sx={{
              backgroundColor: "#E0E1DD",
              borderRadius: "8px",
              "& .MuiSelect-select": {
                backgroundColor: "#E0E1DD",
                padding: "10px",
                display: "flex",
                alignItems: "center",
                borderRadius: "8px",
              },
              "& fieldset": {
                borderRadius: "8px",
              },
            }}
          >
            <MenuItem value="">
              <em>Selecione o tipo de transação</em>
            </MenuItem>
            <MenuItem value={10}>Crédito</MenuItem>
            <MenuItem value={20}>Débito</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="text-xl lg:text-2xl mt-6 lg:mt-8 font-semibold ml-8">
        Valor
      </div>

      <div className="flex w-3/5 ml-8 mt-2 lg:mt-4">
        <TextField
          fullWidth
          id="valor-txtb"
          variant="filled"
          value={valor}
          onChange={handleValorChange}
          sx={{
            backgroundColor: "#E0E1DD",
            borderRadius: "8px",
            "& .MuiInputBase-input": {
              padding: "10px",
              display: "flex",
              alignItems: "center",
            },
          }}
        />
      </div>

      {errorMessage && (
        <div className="text-red-500 mt-2 ml-8 text-xl font-semibold">
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="text-green-700 mt-2 ml-8 text-xl font-semibold">
          {successMessage}
        </div>
      )}

      <div className="my-8 lg:mt-12 ml-8">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-[#1B263B] opacity-75 lg:text-xl text-[#E0E1DD] w-1/3 h-[48px] rounded-[8px] hover:bg-[#415A77] border-[#1B263B] border-2"
        >
          {loading ? "Enviando..." : "Confirmar"}
        </button>
      </div>
    </div>
  );
};
