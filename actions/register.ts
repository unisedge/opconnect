"use server";

import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcryptjs from "bcryptjs";
import { getUserByEmail } from "@/utils/user";
import { db } from "@/db/db";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail.ts";
import { UserRole } from "@prisma/client";
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name, role } = validatedFields.data;
  const hashedPassword = await bcryptjs.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email is already in use!" };
  }
  // inserting to database
  try {
    await db.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        role: role as UserRole,
      },
    });
  } catch (error) {
    console.log(error);
  }
  //inserting ends here.

  // send verification email
  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Verification email sent!..." };
};
