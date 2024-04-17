import { useQuery } from "@tanstack/react-query";
import { fetchOpportunites } from "@/actions/get-opportunities";

export const getOpportunities = () => {
  return useQuery({
    queryKey: ["opportunities"],
    queryFn: () => fetchOpportunites().then((data) => data),
  });
};

