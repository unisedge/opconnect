import { postOpportunity } from "@/actions/add-opportunity";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OpportunitySchema } from "@/schemas";
import { z } from "zod";

export const addOpportunity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: z.infer<typeof OpportunitySchema>) =>
      postOpportunity(values).then((data) => data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["opportunities"] });
    },
  });
};
