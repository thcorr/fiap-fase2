"use client";

import React, { useState } from "react";
import { setCookie } from "nookies";

const UserLoginModal = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { email, password };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/auth`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();
      if (data.result && data.result.token) {
        const token = data.result.token;
        const user = { email, username: data.result.username };

        setCookie(null, "authToken", token, {
          path: "/",
          maxAge: 60 * 60 * 24,
        });
        setCookie(null, "userData", JSON.stringify(user), {
          path: "/",
          maxAge: 60 * 60 * 24,
        });

        setMessage("Login com sucess!");
        closeModal();

        const redirectUrl = `${process.env.NEXT_PUBLIC_LOGGED_URL}/logged`;
        console.log("Redirecionando para:", redirectUrl);

        window.location.href = redirectUrl;
      } else {
        setMessage(data.message || "Falha de login");
      }

      console.log("Response from backend:", response);
      console.log("Response Data:", data);
    } catch (error) {
      setMessage("Erro: " + error.message);
      console.log("Error during request:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Entrar na Conta</h2>

        {message && <p>{message}</p>}

        <form onSubmit={handleSubmit}>
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
          <button type="submit">Entrar</button>
        </form>

        <button className="cancel-btn" onClick={closeModal}>
          Fechar
        </button>
      </div>
    </div>
  );
};

export default UserLoginModal;
