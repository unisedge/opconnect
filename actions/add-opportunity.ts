"use server";
import { db } from "@/db/db";
import { OpportunitySchema } from "@/schemas";
import { z } from "zod";

export const addOpportunity = async (
  values: z.infer<typeof OpportunitySchema>
) => {
  const validatedFields = OpportunitySchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }
  const { type, jobTitle, link, company, description } =
    validatedFields.data;
  try {
    await db.opportunity.create({
      data: {
        type,
        jobTitle,
        link,
        company,
        description,
      },
    });
  } catch (error) {
    console.log(error);
    return { error: "Failed creating new opportunity! . . " };
  }
  return { success: "Created new opportunity!. . ." };
};
