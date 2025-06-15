// src/app/projects/[id]/page.tsx

import { ProjectMediaGallery } from "@/app/components/ProjectMediaGallery";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

async function getData(id: string) {
  const data = await prisma.project.findUnique({
    where: { id },
  });
  if (!data) notFound();
  return data;
}

export default async function ProjectDetails({
  params: { id },
}: {
  params: { id: string };
}) {
  const project = await getData(id);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {project.images?.[0] && (
        <div className="overflow-hidden rounded-2xl shadow-lg">
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-72 object-cover"
          />
        </div>
      )}

      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">{project.title}</h1>
        <p className="text-muted-foreground text-lg">{project.description}</p>
      </div>

      <ProjectMediaGallery
        images={project.images || []}
        videoUrl={(project.video as string) || ""}
        title={project.title}
      />

      {(project.liveUrl || project.githubUrl) && (
        <div className="flex flex-col">
          <h1 className="font-bold text-3xl mb-2">URLs:</h1>
          <div className="flex flex-wrap gap-4">
            {project.liveUrl && (
              <Button asChild>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaExternalLinkAlt className="mr-2" />
                  Live Preview
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button asChild variant="secondary">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="mr-2" />
                  GitHub Repo
                </a>
              </Button>
            )}
          </div>
        </div>
      )}

      {project.longDescription && (
        <Card className="shadow-md">
          <CardContent className="p-6 space-y-4 text-base leading-relaxed text-black font-semibold whitespace-pre-line ">
            <h1 className="text-3xl font-bold tracking-tight text-black mb-4">
              Project Description
            </h1>
            {project.longDescription}
          </CardContent>
        </Card>
      )}

      {project.features?.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-3 mt-3">Key Features</h2>
          <ul className="list-disc list-inside space-y-2 text-base">
            {project.features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        </section>
      )}

      {project.tags?.length > 0 && (
        <section>
          <h2 className="text-xl font-medium mb-2">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, idx) => (
              <Badge key={idx} variant="outline" className="text-sm">
                {tag}
              </Badge>
            ))}
          </div>
        </section>
      )}

      {project.technologies?.length > 0 && (
        <section>
          <h2 className="text-xl font-medium mb-2">Technologies</h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <Badge key={idx} className="text-sm">
                {tech}
              </Badge>
            ))}
          </div>
        </section>
      )}

      <p className="text-sm text-muted-foreground mt-8">
        Created: {new Date(project.createdAt).toLocaleDateString()} | Updated:{" "}
        {new Date(project.updatedAt).toLocaleDateString()}
      </p>
    </div>
  );
}
