"use client";

import { ProjectMediaGallery } from "@/app/components/ProjectMediaGallery";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

async function getData(projectId: string) {
  const data = await prisma.project.findUnique({
    where: { id: projectId },
  });
  if (!data) return notFound();
  return data;
}

const ProjectDetails = async ({ params }: { params: { id: string } }) => {
  const project = await getData(params.id);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Cover Image */}
      {project.images?.[0] && (
        <div className="overflow-hidden rounded-2xl shadow-lg">
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-72 object-cover"
          />
        </div>
      )}

      {/* Title & Description */}
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">{project.title}</h1>
        <p className="text-muted-foreground text-lg">{project.description}</p>
      </div>

      {/* Media Gallery (images + video) */}
      <ProjectMediaGallery
        images={project.images || []}
        videoUrl={project.video as string || ""}
        title={project.title}
      />

      


      {/* Links */}
      {(project.liveUrl || project.githubUrl) && (
        <div className="flex flex-wrap gap-4">
          {project.liveUrl && (
            <Button asChild>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <FaExternalLinkAlt className="mr-2" />
                Live Preview
              </a>
            </Button>
          )}
          {project.githubUrl && (
            <Button asChild variant="secondary">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <FaGithub className="mr-2" />
                GitHub Repo
              </a>
            </Button>
          )}
        </div>
      )}

      {/* Long Description */}
      {project.longDescription && (
        <Card className="shadow-md">
          <CardContent className="p-6 space-y-4 text-base leading-relaxed text-muted-foreground">
            {project.longDescription}
          </CardContent>
        </Card>
      )}

      {/* Features */}
      {project.features?.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-3">Key Features</h2>
          <ul className="list-disc list-inside space-y-2 text-base">
            {project.features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Tags */}
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

      {/* Technologies */}
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

      {/* Dates */}
      <p className="text-sm text-muted-foreground mt-8">
        Created: {new Date(project.createdAt).toLocaleDateString()} | Updated:{" "}
        {new Date(project.updatedAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default ProjectDetails;
