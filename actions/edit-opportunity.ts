"use server";
import { db } from "@/db/db";
import { OpportunityEditSchema } from "@/schemas";
import { OpportunityType } from "@prisma/client";
import { z } from "zod";

export const updateOpportunity = async (
  values: z.infer<typeof OpportunityEditSchema>
) => {
  const validatedFields = OpportunityEditSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }
  console.log(validatedFields.data);
  const { id, type, jobTitle, link, company, description, updatedAt } =
    validatedFields.data;
  try {
    await db.opportunity.update({
      where: { id: id },
      data: {
        type: type as OpportunityType,
        jobTitle: jobTitle,
        link: link,
        company: company,
        description: description,
        updatedAt: updatedAt,
      },
    });
  } catch (error) {
    console.log(error);
    return { error: "Failed updating opportunity! . . " };
  }
  return { success: "Updated!. . ." };
};
