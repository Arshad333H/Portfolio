"use server";

import { z } from "zod";
import { formSchema } from "./ZodSchema";
import { EmailTemplate } from "@/components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
export const send = async (EmailFormData: z.infer<typeof formSchema>) => {
    const emailContent = await EmailTemplate({
        firstName: EmailFormData.fullname,
        subject: EmailFormData.subject,
        message: EmailFormData.message,
    });
  try {
    const { data, error } = await resend.emails.send({
        from: 'skmohammedarshad333@gmail.com',
        to: [EmailFormData.email],
        subject: EmailFormData.subject,
        react: emailContent
      });
    if (error) {
      throw error;
    }
  } catch (error) {
    throw error;
  }
};
