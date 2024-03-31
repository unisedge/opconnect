"use server";

import * as z from "zod";
import { PasswordResetSchema } from "@/schemas";
import { getUserByEmail } from "@/utils/user";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail.ts";

export const resetEmail = async (
  values: z.infer<typeof PasswordResetSchema>
) => {
  const validatedFields = PasswordResetSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid email!" };
  }

  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email) {
    return { error: "Email not found!..." };
  }
  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );
  return { success: "Reset email sent!..." };
};
