import { z } from "zod";

export const signupSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email(),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{5,}$/,
      "Password must be at least 5 characters long and contain at least one letter and one number",
    ),
});

export const signinSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{5,}$/,
      "Password must be at least 5 characters long and contain at least one letter and one number",
    ),
});
