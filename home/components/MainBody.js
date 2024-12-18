import React from "react";
import Image from "next/image";

export const MainBody = () => {
  return (
    <div className="flex flex-col items-center h-[83vh] bg-[#778DA9] ">
      <div className="flex flex-col lg:flex-row w-full space-x-45 lg:items-center">
        <p className="mr-auto ml-10 mt-10 md:mt-20 font-semibold text-center lg:text-3xl md:text-2xl text-xl lg:w-1/2">
          Guarde seu dinheiro e aumente seu patrimônio de forma segura. Crie sua
          conta com a gente!
        </p>
        <div className="mx-auto lg:w-[600px] lg:h-[400px] md:w-[300px] md:h-[200px] w-[280px] h-[220px] relative md:mt-14 mt-6 rounded-3xl overflow-hidden">
          <Image
            src="/images/safeBankLogo.png"
            alt="SafeBank Logo"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
      <div className="font-bold lg:text-3xl md:text-2xl text-xl lg:mt-12 mt-6">
        Vantagens do nosso banco:
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full lg:mt-5 md:mt-2 px-10 text-center">
        <div className="md:p-5 p-2">
          <h3 className="font-bold md:text-xl">Conta e cartão gratuitos</h3>
          <p className="md:mt-2 text-[#E0E1DD]">
            Isso mesmo, nossa conta é digital, sem custo fixo e mais que isso:
            sem tarifa de manutenção.
          </p>
        </div>
        <div className="md:p-5 p-2">
          <h3 className="font-bold md:text-xl">Saques sem custo</h3>
          <p className="md:mt-2 text-[#E0E1DD]">
            Você pode sacar gratuitamente 4x por mês de qualquer Banco 24h.
          </p>
        </div>
        <div className="md:p-5 p-2">
          <h3 className="font-bold md:text-xl">Programa de pontos</h3>
          <p className="md:mt-2 text-[#E0E1DD]">
            Você pode acumular pontos com suas compras no crédito sem pagar
            mensalidade!
          </p>
        </div>
        <div className="md:p-5 p-2">
          <h3 className="font-bold md:text-xl">Seguro Dispositivos</h3>
          <p className="md:mt-2 text-[#E0E1DD]">
            Seus dispositivos móveis (computador e laptop) protegidos por uma
            mensalidade simbólica.
          </p>
        </div>
      </div>
    </div>
  );
};
