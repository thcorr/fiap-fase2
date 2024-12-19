import { useTransactionStore } from "@/store/transactionStore";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchStatement = async (accountId, token) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/account/${accountId}/statement`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch transactions");
    }

    const data = await response.json();
    const transactions = data.result.transactions;

    const { setTransactions } = useTransactionStore.getState();
    setTransactions(transactions);

    return transactions;
  } catch (error) {
    console.error("Error fetching statement:", error);
    throw error;
  }
};

export const createTransaction = async (newTransaction, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/account/transaction`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    });

    if (!response.ok) {
      throw new Error("Failed to create transaction");
    }

    const data = await response.json();
    const transaction = data.result; // Extract the actual transaction object

    if (!transaction || typeof transaction.value !== "number") {
      throw new Error("Invalid transaction data received");
    }

    const { addTransaction } = useTransactionStore.getState();
    addTransaction(transaction);

    return transaction;
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error;
  }
};

export const updateTransaction = (updatedTransaction) => {
  try {
    const { updateTransaction } = useTransactionStore.getState();
    if (typeof updatedTransaction.value === "string") {
      updatedTransaction.value = parseFloat(updatedTransaction.value);
    }

    if (isNaN(updatedTransaction.value)) {
      console.error(
        "Invalid transaction value during update:",
        updatedTransaction
      );
      throw new Error("Invalid transaction value");
    }

    updateTransaction(updatedTransaction);
    console.log("Transaction updated in store:", updatedTransaction);
    return updatedTransaction;
  } catch (error) {
    console.error("Error updating transaction in store:", error);
    throw error;
  }
};

export const deleteTransactions = (transactionIds) => {
  try {
    const { removeTransactions } = useTransactionStore.getState();
    removeTransactions(transactionIds);
    console.log("Transactions deleted from store:", transactionIds);
    return true;
  } catch (error) {
    console.error("Error deleting transactions in store:", error);
    throw error;
  }
};

export const fetchTransactionsFromStore = () => {
  try {
    const { transactions } = useTransactionStore.getState();
    console.log("Fetched transactions from store:", transactions);
    return transactions;
  } catch (error) {
    console.error("Error fetching transactions from store:", error);
    throw error;
  }
};
