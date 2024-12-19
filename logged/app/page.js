"use client";

import { useState, useEffect } from "react";
import { fetchAccountData } from "@/api/fetchAccountData";
import { DashboardHeader } from "@/components/DashboardHeader";
import { parseCookies } from "nookies";
import { useAccountStore } from "@/store/accountStore";
import { fetchStatement } from "@/api/transactionService";
import { DashboardMenu } from "@/components/DashboardMenu";
import DashboardBody from "@/components/DashboardBody";

export default function DashboardHome() {
  const [error, setError] = useState(null);
  const accountData = useAccountStore((state) => state.accountData);
  const token = useAccountStore((state) => state.token);
  const setZustandAccountData = useAccountStore(
    (state) => state.setAccountData
  );
  const setZustandToken = useAccountStore((state) => state.setToken);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const cookies = parseCookies();
        const authToken = cookies.authToken;

        if (!authToken) {
          setError("No token found. Please log in.");
          return;
        }

        if (!token) {
          setZustandToken(authToken);
        }

        if (!accountData) {
          const fetchedAccountData = await fetchAccountData(authToken);
          console.log("Fetched Account Data:", fetchedAccountData);
          setZustandAccountData(fetchedAccountData);

          const accountId = fetchedAccountData?.result?.account[0]?.id;
          if (accountId) {
            await fetchStatement(accountId, authToken);
            console.log("Transactions Fetched...");
          } else {
            setError("Account ID is missing.");
          }
        }
      } catch (err) {
        console.error("Error fetching initial data:", err);
        setError(err.message);
      }
    };

    fetchInitialData();
  }, [accountData, token, setZustandAccountData, setZustandToken]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="w-full h-[96px] fixed top-0 z-10 bg-white">
        <DashboardHeader />
      </div>

      <div className="flex flex-col lg:flex-row flex-grow pt-[96px] bg-[#E0E1DD]">
        <div className="hidden md:flex lg:w-[180px] lg:ml-32 mt-2.5 mb-2.5">
          <DashboardMenu />
        </div>

        <div className="flex-grow">
          <DashboardBody />
        </div>
      </div>
    </div>
  );
}
