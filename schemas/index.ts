import * as z from "zod";

export const ProfileSchema = z.object({
  firstName: z.string().min(1, {
    message: "required",
  }),
  lastName: z.string().min(1, {
    message: "required",
  }),
  rollNumber: z.string().min(1, {
    message: "required",
  }),
  phone: z
    .string()
    .min(10, {
      message: "min 10 charaters required",
    })
    .max(13, { message: "max 13 characters only" }),
  dateOfBirth: z.string().min(1, { message: "required" }),
  currentSemester: z.string().min(1, { message: "required" }),
  gender: z.string().min(1, { message: "required" }),
  sscCertificate: z.string().url().min(1, { message: "required" }),
  sscSchoolName: z.string().min(1, { message: "required" }),
  sscAcademicYear: z.string(),
  sscYearOfPass: z.string().min(1, { message: "required" }),
  sscGrades: z.string().min(1, { message: "required" }),
  intermediateCertificate: z.string().url().min(1, { message: "required" }),
  intermediateCollegeName: z.string().min(1, { message: "required" }),
  intermediateAcademicYear: z.string(),
  intermediateYearOfPass: z.string().min(1, { message: "required" }),
  intermediateGrades: z.string().min(1, { message: "required" }),
  graduationCertificate: z.string().url(),
  graduationCollegeName: z.string().min(1, { message: "required" }),
  graduationAcademicYear: z.string().min(1, { message: "required" }),
  graduationYearOfPass: z.string(),
  graduationCgpa: z.string().min(1, { message: "required" }),
  postGraduationCertificate: z.string().url(),
  postGraduationCollegeName: z.string(),
  postGraduationAcademicYear: z.string(),
  postGraduationYearOfPass: z.string(),
  postGraduationCgpa: z.string(),

  academicYear: z.string().min(1, { message: "required" }),
  branch: z.string().min(1, { message: "required" }),
  course: z.string().min(1, { message: "required" }),
  section: z.string(),
  personalEmail: z.string().min(1, { message: "required" }),
  email: z.string().min(1, { message: "required" }),
  resume: z.string(),
  profilePicture: z.string(),
  addressCountry: z.string().min(1, { message: "required" }),
  addressState: z.string().min(1, { message: "required" }),
  addressCity: z.string(),
  addressPincode: z.string().min(1, { message: "required" }),
  addressLandmark: z.string(),
  addressHouseNumber: z.string().min(1, { message: "required" }),
});

export const OpportunitySchema = z.object({
  type: z.string().min(8, { message: "Type is required!" }),
  jobTitle: z.string(),
  link: z.string().url(),
  company: z.string(),
  description: z.string(),
});

export const OpportunityEditSchema = z.object({
  id: z
    .number()
    .positive({ message: "ID does not exist, try editing again!." }),
  type: z.string().min(8, { message: "Type is required!" }),
  jobTitle: z.string(),
  link: z.string().url(),
  company: z.string(),
  description: z.string(),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "minimum 6 character required",
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
