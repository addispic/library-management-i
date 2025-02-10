import { z } from "zod";

// form schema
export const FormFieldSchema = z.object({
  username: z
    .string()
    .regex(/^[a-zA-Z]/, { message: "Username must start with letter" })
    .trim(),
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(3, { message: "Password must be at least 3 characters" })
    .regex(/[a-zA-Z]/, { message: "Password must include at last 1 letter" })
    .regex(/[\d]/, { message: "Password must contain at least 1 digit" })
    .regex(/[^a-zA-Z\d]/, {
      message: "Password must contain at least 1 special character",
    })
    .trim(),
});

