"use server";
import prisma from "@/lib/prisma";
import { ProjectSchema } from "@/lib/ZodSchema";
import { parseWithZod } from "@conform-to/zod";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export async function createProjectAction(
  prevState: unknown,
  formData: FormData
) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || user.email !== "skmohammedarshad333@gmail.com") {
    return redirect("/");
  }
  const submission = parseWithZod(formData, { schema: ProjectSchema });
  if (submission.status !== "success") {
    return submission.reply();
  }

  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim())
  );
  const normalizeArray = (input: string | string[]): string[] => {
    if (typeof input === "string") {
      return input
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
    }

    if (Array.isArray(input)) {
      return input.flatMap((item) =>
        item
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t.length > 0)
      );
    }

    return [];
  };

  const flattenTags: string[] = normalizeArray(submission.value.tags);
  const flattenTechnologies: string[] = normalizeArray(
    submission.value.technologies
  );

  await prisma.project.create({
    data: {
      description: submission.value.description,
      longDescription: submission.value.longDescription,
      title: submission.value.title,
      features: submission.value.features,
      githubUrl: submission.value.githubUrl,
      images: flattenUrls,
      liveUrl: submission.value.liveUrl,
      tags: flattenTags,
      technologies: flattenTechnologies,
      domain: submission.value.domain,
      video:submission.value.video
    
      
    },
    
  });

  return redirect("/admin/projects");
}

export async function EditProjectAction(
  prevState: unknown,
  formData: FormData
) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || user.email !== "skmohammedarshad333@gmail.com") {
    return redirect("/");
  }
  const submission = parseWithZod(formData, { schema: ProjectSchema });
  if (submission.status !== "success") {
    return submission.reply();
  }

  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim())
  );
  const normalizeArray = (input: any): string[] => {
    if (typeof input === "string") {
      return input
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
    }

    if (Array.isArray(input)) {
      return input.flatMap((item) => {
        if (typeof item !== "string") return [];

        return item
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t.length > 0);
      });
    }

    return [];
  };

  const projectId = formData.get("projectId");
  if (typeof projectId !== "string") {
    throw new Error("Invalid project ID");
  }
  await prisma.project.update({
    where: { id: projectId as string },
    data: {
      description: submission.value.description,
      longDescription: submission.value.longDescription,
      title: submission.value.title,
      features: submission.value.features,
      githubUrl: submission.value.githubUrl,
      images: flattenUrls,
      liveUrl: submission.value.liveUrl,
      tags: normalizeArray(submission.value.tags),
      technologies: normalizeArray(submission.value.technologies),
      domain: submission.value.domain,
      video:submission.value.video
    },
  });
  return redirect("/admin/projects");
}

export async function deleteProjectAction(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "skmohammedarshad333@gmail.com") {
    return redirect("/");
  }

  const projectId = formData.get("projectId");
  console.log("Project ID:", projectId);

  if (typeof projectId !== "string") {
    throw new Error("Invalid project ID");
  }

  await prisma.project.delete({
    where: {
      id: projectId,
    },
  });

  return redirect("/admin/projects");
}
