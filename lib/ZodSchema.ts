import { z } from "zod";

export const formSchema = z.object({
  fullname: z.string().min(2).max(50),
  email: z.string().email(),
  subject: z.string().min(5).max(100),
  message: z.string().min(5).max(2000),
});
