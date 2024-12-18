"use client";
import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";

export const DashboardHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative">
      <div className="flex h-[96px] text-[#E0E1DD] items-center bg-[#1B263B] px-6">
        <MenuIcon
          style={{ color: "#E0E1DD", fontSize: 36 }}
          className="ml-4 cursor-pointer hide-md"
          onClick={toggleMenu}
        />

        <div className="hidden md:block ml-auto mr-5 lg:mr-10 text-xl font-semibold">
          Thomas Melachos
        </div>

        <div className="ml-auto md:ml-0 mr-10 md:mr-32 lg:mr-52">
          <AccountCircleIcon style={{ fontSize: 36 }} />
        </div>
      </div>

      {menuOpen && (
        <div className="absolute top-[96px] left-0 bg-[#E0E1DD] w-[200px] text-[#1B263B] text-xl font-semibold z-20 rounded-lg shadow-lg">
          <ul className="flex flex-col space-y-2 p-3">
            {/* 
            <Link href="/dashboard">
              <li className="hover:bg-[#415A77] p-2 rounded">Início</li>
            </Link>
            <Link href="/extrato">
              <li className=" hover:bg-[#415A77] p-2 rounded">Extrato</li>
            </Link>*/}
          </ul>
        </div>
      )}
    </div>
  );
};
