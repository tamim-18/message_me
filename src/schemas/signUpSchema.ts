import { z } from "zod";
export const userNameValidation = z
  .string()
  .min(3, "Username must be at least 20 character")
  .max(20, "Username must be at most 20 character")
  .regex(/^[a-zA-Z0-9_]*$/, "Username must be alphanumeric");
// ceate a schema validation for the singup
export const signUpSchema = z.object({
  name: userNameValidation,
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 character"),
});
