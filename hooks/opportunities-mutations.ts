import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OpportunityEditSchema, OpportunitySchema } from "@/schemas";
import { z } from "zod";
import { updateOpportunity } from "@/actions/edit-opportunity";
import { postOpportunity } from "@/actions/add-opportunity";
import { deleteOpportunity } from "@/actions/delete-opportunity";

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

export const editOpportunity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: z.infer<typeof OpportunityEditSchema>) =>
      updateOpportunity(values).then((data) => data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["opportunities"] });
    },
  });
};

export const deletingOpportunity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteOpportunity(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["opportunities"] });
    },
  });
};
