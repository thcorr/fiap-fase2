import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardMenu } from "@/components/DashboardMenu";
import ExtratoDetail from "@/components/ExtratoDetail";

export default function ExtratoHome() {
  return (
    <div className="flex flex-col h-screen">
      <div className="w-full h-[96px] fixed top-0 z-10 bg-white">
        <DashboardHeader />
      </div>

      <div className="flex flex-col lg:flex-row flex-grow pt-[96px] bg-[#E0E1DD]">
        <div className="hidden md:flex lg:w-[180px] lg:ml-32 mt-2.5 mb-2.5">
          <DashboardMenu />
        </div>

        <div className="w-full">
          <ExtratoDetail />
        </div>
      </div>
    </div>
  );
}
