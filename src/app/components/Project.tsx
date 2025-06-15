"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Image from "next/image";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  images: string[];
  githubUrl?: string | null;
  liveUrl?: string | null;
  features: string[];
  tags: string[];
  domain: "WEB" | "ML" | "AI_ML" | "DS";
  technologies: string[];
}

type Props = {
  project: Project;
};

export function ThreeDCardDemo({ project }: Props) {
  const truncatedDescription =
    project.description.length > 100
      ? project.description.slice(0, 100) + "..."
      : project.description;

  const displayedTech = project.technologies.slice(0, 5);

  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-[500px] rounded-xl p-6 border flex flex-col justify-between">
        <div>
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            {project.title}
          </CardItem>

          <CardItem translateZ="100" className="w-full mt-4">
            <Image
              src={project.images[0]}
              height={1000}
              width={1000}
              className="h-52 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt={project.title || "Project Thumbnail"}
            />
          </CardItem>

          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-3 dark:text-neutral-300"
          >
            {truncatedDescription}
          </CardItem>

          <CardItem
            as="div"
            translateZ="60"
            className="flex flex-wrap gap-2 mt-2"
          >
            <span className="font-bold text-neutral-600 dark:text-white">
              Tech:
            </span>
            {displayedTech.map((tech) => (
              <span
                key={tech}
                className="bg-gray-100 dark:bg-neutral-800 text-xs px-3 py-1 rounded text-gray-700 dark:text-white"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="text-xs text-gray-500">
                +{project.technologies.length - 5} more
              </span>
            )}
          </CardItem>
        </div>

        <div className="flex justify-between items-center mt-6">
          <CardItem
            translateZ={20}
            as="a"
            href={`/projects/${project.id}`}
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            Explore More →
          </CardItem>

          {project.liveUrl ? (
            <CardItem
              translateZ={20}
              as="a"
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
            >
              <FaExternalLinkAlt /> Live Preview
            </CardItem>
          ) : project.githubUrl ? (
            <CardItem
              translateZ={20}
              as="a"
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
            >
              <FaGithub /> GitHub Repo
            </CardItem>
          ) : null}
        </div>
      </CardBody>
    </CardContainer>
  );
}
