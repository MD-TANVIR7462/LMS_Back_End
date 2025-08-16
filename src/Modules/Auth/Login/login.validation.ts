import { z } from "zod";

export const loginValidation = z.object({
  email: z.string().min(1, "For Login You must provide a valid Email"),
  password: z.string().min(1, "For Login You must provide a valid Password"),
});

export const refreshTokenValidation = z
  .string()
  .min(1, "Refresh Token is Required !");
