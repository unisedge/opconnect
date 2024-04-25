"use server";

import { signIn } from "@/auth";
// import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/utils/user";
import { AuthError } from "next-auth";
import type * as z from "zod";

export const login = async (
  values: z.infer<typeof LoginSchema>
  // callbackUrl?: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values);
  let directTo;
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email) {
    return { error: "Email does not exist!..." };
  }
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Please try with different provider!..." };
  }
  if (!existingUser.emailVerified) {
    return {
      error: "Please verify the email!...",
    };
  }
  if (existingUser && existingUser.emailVerified) {
    if (existingUser.role == "ADMIN") directTo = "/admin";
    else if (existingUser.role == "MENTOR") directTo = "/mentor";
    else if (existingUser.role == "STUDENT") directTo = "/student";
  }
  try {
    await signIn("credentials", {
      email,
      password,
      // redirectTo: DEFAULT_LOGIN_REDIRECT,
      // redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
      redirectTo: directTo,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!..." };
        default:
          return { error: "Something went wrong!...." };
      }
    }
    throw error;
  }
};
