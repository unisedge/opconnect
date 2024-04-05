"use server";

import { db } from "@/db/db";

export const getOpportunites = async () => {
  try {
    const data = await db.opportunity.findMany();
    return data;
  } catch (err) {
    console.log(err);
  }
  return [];
};
