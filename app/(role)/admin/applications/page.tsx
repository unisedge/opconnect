"use client";

import { useEffect, useState } from "react";
import { getOpportunites } from "@/actions/get-opportunities";
import { OpportunityStatus, OpportunityType } from "@prisma/client";
import OpportunityTable from "@/components/view-opportunities";
import { columns } from "./columns";

interface Opportunity {
  id: string;
  type: OpportunityType;
  jobTitle: string | null;
  link: string | null;
  company: string | null;
  status: OpportunityStatus;
  description: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}

const initialOpportunities: Opportunity[] = [];

export default function Applicaitons() {
  const [opportunities, setOpportunities] = useState(initialOpportunities);
  useEffect(() => {
    getOpportunites().then((data) => setOpportunities(data));
  }, [opportunities]);

  return (
    <section className="flex flex-col justify-center   w-full font-semibold text-2xl p-16 gap-2">
      <OpportunityTable data={opportunities} columns={columns} />
    </section>
  );
}
