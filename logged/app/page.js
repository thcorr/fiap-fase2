"use client";

import { useState, useEffect } from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAccountStore } from "@/store/accountStore";
import { fetchAccountData } from "@/api/fetchAccountData";
import { fetchStatement } from "@/api/transactionService";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardMenu } from "@/components/DashboardMenu";
import DashboardBody from "@/components/DashboardBody";

function DashboardContent() {
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const setZustandToken = useAccountStore((state) => state.setToken);
  const setZustandAccountData = useAccountStore(
    (state) => state.setAccountData
  );
  const accountData = useAccountStore((state) => state.accountData);
  const token = useAccountStore((state) => state.token);

  useEffect(() => {
    const fetchInitialData = async () => {
      const queryToken = searchParams.get("token");

      if (!queryToken && !token) {
        setError("No token found. Please log in.");
        return;
      }

      const authToken = queryToken || token;

      if (!token) {
        setZustandToken(authToken);
      }

      if (!accountData) {
        try {
          const fetchedAccountData = await fetchAccountData(authToken);
          setZustandAccountData(fetchedAccountData);

          const accountId = fetchedAccountData?.result?.account[0]?.id;
          if (accountId) {
            await fetchStatement(accountId, authToken);
          } else {
            setError("Account ID is missing.");
          }
        } catch (err) {
          console.error("Error fetching initial data:", err);
          setError(err.message);
        }
      }
    };

    fetchInitialData();
  }, [
    searchParams,
    accountData,
    token,
    setZustandAccountData,
    setZustandToken,
  ]);

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

export default function DashboardHome() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
