"use client";

import React, { useState } from "react";

const UserRegisterModal = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { username, email, password };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();
      if (data.message) {
        setMessage(data.message);
        console.log("Response from backend:", response);
        console.log("Response Data:", data);
      }
    } catch (error) {
      setMessage("Erro: " + error.message);
      console.log("Error during request:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Criar Novo Usuário</h2>

        {message && <p>{message}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome de usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Criar Conta</button>
        </form>

        <button className="cancel-btn" onClick={closeModal}>
          Fechar
        </button>
      </div>
    </div>
  );
};

export default UserRegisterModal;
