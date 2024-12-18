"use client";

import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import UserRegisterModal from "./UserRegisterModal";
import UserLoginModal from "./UserLoginModal";

export const MainHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const openRegisterModal = () => {
    setIsLogin(false);
    setModalOpen(true);
  };

  const openLoginModal = () => {
    setIsLogin(true);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex justify-between col-span-full bg-[#E0E1DD] text-[#1B263B] h-24 items-center">
      <MenuIcon
        style={{ color: "#1B263B", fontSize: 36 }}
        className="ml-4 cursor-pointer hide-md"
        onClick={toggleMenu}
      />

      <div className="italic text-3xl mr-4 ml-auto md:mr-10 lg:ml-56 md:ml-36">
        SafeBank
      </div>

      <div className="ml-24 text-2xl mr-10 hidden md:flex">
        <ul className="flex space-x-12 font-semibold">
          <li>Sobre</li>
          <li>Serviços</li>
        </ul>
      </div>

      <div className="ml-auto mr-24 space-x-2 hidden md:flex">
        <button
          className="bg-[#0D1B2A] text-sm flex justify-center items-center md:text-base text-[#E0E1DD] md:w-[120px] lg:w-[150px] h-[48px] rounded-[8px] hover:bg-[#778DA9] hover:text-[#1B263B]"
          onClick={openRegisterModal}
        >
          Criar conta
        </button>
        <button
          className="bg-[#1B263B] text-sm flex justify-center items-center opacity-75 md:text-base text-[#E0E1DD] md:w-[120px] lg:w-[150px] h-[48px] rounded-[8px] hover:bg-[#778DA9] hover:text-[#1B263B]"
          onClick={openLoginModal}
        >
          Já tenho conta
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-[96px] left-0 bg-[#E0E1DD] w-[200px] text-[#1B263B] text-xl font-semibold z-20 rounded-lg shadow-lg">
          <ul className="flex flex-col space-y-2 p-3">
            <li
              className="hover:bg-[#415A77] p-2 rounded"
              onClick={openLoginModal}
            >
              Já tenho conta
            </li>

            <li
              className="hover:bg-[#415A77] p-2 rounded"
              onClick={openRegisterModal}
            >
              Criar Conta
            </li>
          </ul>
        </div>
      )}

      {modalOpen &&
        (isLogin ? (
          <UserLoginModal closeModal={closeModal} />
        ) : (
          <UserRegisterModal closeModal={closeModal} />
        ))}
    </div>
  );
};
