"use server";

import { db } from "@/db/db";

export const fetchOpportunites = async () => {
  try {
    const data = await db.opportunity.findMany();
    return data;
  } catch (err) {
    console.log(err);
  }
  return [];
};

export const fetchOpportunitesById = async (id: any) => {
  try {
    const data = await db.opportunity.findUnique({
      where: {
        id: id,
      },
    });
  } catch (err) {
    console.log(err);
  }
  return null;
};
