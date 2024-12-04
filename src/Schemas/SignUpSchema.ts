 import { z } from "zod";

 export const usernameValidation = z
  .string()
  .min(2 , "usename numst be atleast 2 characters long")
  .max(20, "username should not exceed 20 characters")
  .regex(/^[a-zA-Z0-9]+$/, { message: "username should contain only alphanumeric characters" });

 export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(8, "Password should be at least 8 characters long").max(128, "Password should not exceed 128 characters"),
 });