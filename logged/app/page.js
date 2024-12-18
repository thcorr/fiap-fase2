"use client";

import { useState, useEffect } from "react";
import { fetchAccountData } from "@/api/fetchAccountData";
import { DashboardHeader } from "@/components/DashboardHeader";
import { parseCookies } from "nookies";
import { useAccountStore } from "@/store/accountStore";

export default function DashboardHome() {
  const [accountData, setAccountData] = useState(null);
  const [error, setError] = useState(null);
  const setZustandAccountData = useAccountStore(
    (state) => state.setAccountData
  );
  const setZustandToken = useAccountStore((state) => state.setToken);

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.authToken;

    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    const getAccountData = async () => {
      try {
        const data = await fetchAccountData(token);
        setAccountData(data);
        setZustandAccountData(data);
        setZustandToken(token);
      } catch (err) {
        setError(err.message);
      }
    };

    getAccountData();
  }, [setZustandAccountData, setZustandToken]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="w-full h-[96px] fixed top-0 z-10 bg-white">
        <DashboardHeader />
      </div>
      <div className="pt-20">
        {accountData ? (
          <>
            <h1>Account ID: {accountData.result.account[0]?.id}</h1>
            <p>Account Type: {accountData.result.account[0]?.type}</p>

            <h2>Transactions</h2>
            <ul>
              {accountData.result.transactions?.map((transaction) => (
                <li key={transaction.id}>
                  {transaction.type} - ${transaction.value} on{" "}
                  {transaction.date}
                </li>
              ))}
            </ul>

            <h2>Cards</h2>
            <ul>
              {accountData.result.cards?.map((card) => (
                <li key={card.id}>
                  Card Number: {card.number} - Due Date: {card.dueDate}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>Loading account data...</p>
        )}
      </div>
    </div>
  );
}
