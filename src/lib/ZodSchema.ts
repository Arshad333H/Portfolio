import { z } from "zod";

export const ProjectSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().min(1, "Description is required").max(200),
  longDescription: z.string().min(1, "Long description is required").max(2000),
  images: z
    .array(
      z
        .string()
        .url("Image must be a valid URL")
        .or(z.string().startsWith("/", "Image path must start with /"))
    )
    .min(1, "At least one image is required"),
  githubUrl: z
    .string()
    .url("Must be a valid URL")
    .startsWith("https://github.com/", "Must be a GitHub URL")
    .optional()
    .or(z.literal("")),
  liveUrl: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
  tags: z.union([z.string(), z.array(z.string())]),
  technologies: z.union([z.string(), z.array(z.string())]),
  features: z.array(
    z.string().min(1).max(100).min(1, "At least one feature is required")
  ),

  domain: z.enum(["WEB", "ML", "AI_ML", "DS"]).default("WEB"),
  video: z.string().url().nullable().optional(),
});

