"use client";

import OpportunityTable from "@/components/opportunities-table";
import { columns } from "./columns";
import { HashLoader } from "react-spinners";
import { getOpportunities } from "@/hooks/opportunitites-qureies";
import { EditOpportunity } from "@/components/opportunity-edit";

export default function Applicaitons() {
  const { data: opportunities, isPending, error } = getOpportunities();

  if (isPending)
    return (
      <section className="flex justify-center items-center h-full">
        <HashLoader size={120} className="dark:invert" />
      </section>
    );

  if (error) return "An error has occurred: " + error.message;
  return (
    <section className="flex flex-col justify-center   w-full font-semibold text-2xl p-16 gap-2">
      {/* <EditOpportunity /> */}
      <OpportunityTable data={opportunities} columns={columns} />
    </section>
  );
}
