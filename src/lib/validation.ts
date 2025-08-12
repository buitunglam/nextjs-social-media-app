import { z } from "zod";

const requiredString = z.string().min(1, "Required");

export const signupSchema = z.object({
  email: requiredString.email("Invalid email"),
  userName: requiredString.regex(
    /^[a-zA-Z0-9_-]+$/,
    "Only Letters, numbers, - and _ allowed",
  ),
  password: requiredString.min(
    8,
    "Password must be at least 8 characters long",
  ),
});

export const loginSchema = z.object({
  userName: requiredString.min(1, "Invalid username"),
  password: requiredString.min(
    8,
    "Password must be at least 8 characters long",
  ),
});

export type SignUpValues = z.infer<typeof signupSchema>;
export type LoginValues = z.infer<typeof loginSchema>;

export const createPostsSchema = z.object({
  content: requiredString,
});
