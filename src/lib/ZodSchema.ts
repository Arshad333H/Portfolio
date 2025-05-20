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
    .or(z.literal("")),
  liveUrl: z.string().url("Must be a valid URL").or(z.literal("")),
  tags: z.array(
    z.string().min(1).max(30).min(1, "At least one tag is required")
  ),
  features: z.array(
    z.string().min(1).max(100).min(1, "At least one feature is required")
  ),
  technologies: z.array(
    z.string().min(1).max(50).min(1, "At least one technology is required")
  ),
});
