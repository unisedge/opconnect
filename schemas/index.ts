import * as z from "zod";

export const OpportunitySchema = z.object({
  type: z.string().min(8, { message: "Type is required!" }),
  jobTitle: z.string(),
  link: z.string(),
  company: z.string(),
  description: z.string(),
});

export const OpportunityEditSchema = z.object({
  id: z
    .number()
    .positive({ message: "ID does not exist, try editing again!." }),
  type: z.string().min(8, { message: "Type is required!" }),
  jobTitle: z.string(),
  link: z.string(),
  company: z.string(),
  description: z.string(),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "minimum 6 characters is required",
  }),
});

export const PasswordResetSchema = z.object({
  email: z.string().email({
    message: "email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "email is required",
  }),
  password: z.string().min(6, {
    message: "minimum 6 characters is required",
  }),
  name: z.string().min(4, { message: "name is required!" }),
  role: z.string().min(5, { message: "this field is required!" }),
});
