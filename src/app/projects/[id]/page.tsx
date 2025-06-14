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
    where: {
      id: projectId,
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}

const ProjectDetails = async ({ params }: { params: { id: string } }) => {
  const project = await getData(params.id as string);
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Hero Image */}
      {project.images?.[0] && (
        <img
          src={project.images[0]}
          alt={project.title}
          className="w-full h-64 object-cover rounded-2xl shadow-md"
        />
      )}
      <ProjectMediaGallery 
        images={project.images || []} 
        videoUrl={project.video as string}
        title={project.title} 
      />

      {/* Title & Description */}
      <div>
        <h1 className="text-4xl font-bold">{project.title}</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          {project.description}
        </p>
      </div>

      {/* Links */}
      {(project.githubUrl || project.liveUrl) && (
        <div className="flex gap-4">
          {project.liveUrl ? (
            <Button asChild variant="default">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaExternalLinkAlt className="mr-2" /> Live Preview
              </a>
            </Button>
          ) : (
            project.githubUrl && (
              <Button asChild variant="secondary">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="mr-2" /> GitHub Repo
                </a>
              </Button>
            )
          )}
        </div>
      )}

      {/* Long Description */}
      <Card>
        <CardContent className="p-6 text-base leading-relaxed">
          {project.longDescription}
        </CardContent>
      </Card>

      {/* Features */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Key Features</h2>
        <ul className="list-disc list-inside space-y-1">
          {project.features.map((feature, idx) => (
            <li key={idx}>{feature}</li>
          ))}
        </ul>
      </div>

      {/* Tags */}
      <div>
        <h2 className="text-xl font-medium mb-2">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, idx) => (
            <Badge key={idx} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Technologies */}
      <div>
        <h2 className="text-xl font-medium mb-2">Technologies</h2>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, idx) => (
            <Badge key={idx}>{tech}</Badge>
          ))}
        </div>
      </div>

      {/* Dates */}
      <p className="text-sm text-muted-foreground">
        Created: {new Date(project.createdAt).toLocaleDateString()} | Updated:{" "}
        {new Date(project.updatedAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default ProjectDetails;
