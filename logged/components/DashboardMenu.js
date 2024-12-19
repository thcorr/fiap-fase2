"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const DashboardMenu = () => {
  const pathname = usePathname();

  return (
    <div className="lg:bg-[#415A77] lg:w-[180px] text-[#1B263B] text-center lg:rounded-xl flex-grow h-full">
      <div>
        <ul className="flex lg:text-2xl text-xl ml-12 my-4 space-x-4 lg:space-x-0 lg:m-0 lg:block lg:p-4 lg:space-y-3">
          <Link href="/">
            <li
              className={`relative py-2 ${pathname === "/" ? "font-bold" : ""}`}
            >
              Início
              <span className="absolute left-1/2 bottom-0 transform -translate-x-1/2 w-3/4 h-[1px] bg-[#1B263B]"></span>
            </li>
          </Link>

          <Link href="/extrato">
            <li
              className={`relative py-2 ${
                pathname === "/extrato" ? "font-bold" : ""
              }`}
            >
              Extrato
              <span className="absolute left-1/2 bottom-0 transform -translate-x-1/2 w-3/4 h-[1px] bg-[#1B263B]"></span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};
