"use server";
import { db } from "@/db/db";

export const deleteOpportunity = async (id: string) => {
  try {
    await db.opportunity.delete({
        where: {
            id: id
        }
    });
    
  } catch (error) {
    console.log(error);
    return { error: "Failed in deleting opportunity! . . " };
  }
  return { success: "Deleted!. . ." };
};
