"use client";

import { getOpportunites } from "@/actions/get-opportunities";
import OpportunityTable from "@/components/view-opportunities";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { HashLoader } from "react-spinners";

export default function Applicaitons() {
  const {
    isPending,
    error,
    data: opportunities,
  } = useQuery({
    queryKey: ["opportunities"],
    queryFn: () => getOpportunites().then((data) => data),
  });

  if (isPending)
    return (
      <section className="flex justify-center items-center h-full">
        <HashLoader size={120} className="dark:invert" />
      </section>
    );

  if (error) return "An error has occurred: " + error.message;
  return (
    <section className="flex flex-col justify-center   w-full font-semibold text-2xl p-16 gap-2">
      <OpportunityTable data={opportunities} columns={columns} />
    </section>
  );
}
