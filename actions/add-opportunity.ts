"use server";
import { db } from "@/db/db";
import { OpportunitySchema } from "@/schemas";
import { OpportunityType } from "@prisma/client";
import { z } from "zod";

export const postOpportunity = async (
  values: z.infer<typeof OpportunitySchema>
) => {
  const validatedFields = OpportunitySchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }
  const { type, jobTitle, link, company, description } = validatedFields.data;
  try {
    await db.opportunity.create({
      data: {
        type: type as OpportunityType,
        jobTitle: jobTitle,
        link: link,
        company: company,
        description: description,
      },
    });
  } catch (error) {
    console.log(error);
    return { error: "Failed creating new opportunity! . . " };
  }
  return { success: "Created new opportunity!. . ." };
};
