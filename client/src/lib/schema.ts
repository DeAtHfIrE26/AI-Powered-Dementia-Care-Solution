import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  role: z.string().min(1, "Please select your role"),
  message: z.string().optional(),
  joinWaitlist: z.boolean().default(false),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
