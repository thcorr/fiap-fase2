import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import YouTubeIcon from "@mui/icons-material/YouTube";

export const MainFooter = () => {
  return (
    <div className="flex col-span-full bg-[#0D1B2A] text-[#E0E1DD] h-36">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 w-full text-center">
        <div className="mt-5">
          <ul className="space-y-3 italic">
            <li className="font-semibold">Serviços</li>
            <li>Investir</li>
            <li>Cartão de Crédito</li>
          </ul>
        </div>
        <div className="mt-5">
          <ul className="space-y-3 italic">
            <li className="font-semibold">Contato</li>
            <li>tmelachos@gmail.com</li>
            <li>0800 000 1910</li>
          </ul>
        </div>
        <div className="mt-5">
          <ul className="space-y-3 italic">
            <li className="font-semibold">Desenvolvido por Thomas Melachos</li>
            <li>SafeBank</li>
            <li className="space-x-3 flex justify-center items-center">
              <div className="w-[24px] h-[24px]">
                <InstagramIcon />
              </div>
              <div className="w-[24px] h-[24px]">
                <WhatsAppIcon />
              </div>
              <div className="w-[24px] h-[24px]">
                <YouTubeIcon />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
