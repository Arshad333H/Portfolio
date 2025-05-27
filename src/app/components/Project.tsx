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
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {project.title}
        </CardItem>

        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={project.images[0]}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {project.description}
        </CardItem>

        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          <span className="font-bold text-neutral-600 dark:text-white">
            Tech:
          </span>{" "}
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="bg-gray-100 text-xs px-2 py-1 rounded text-gray-700"
            >
              {tech}
            </span>
          ))}
        </CardItem>

        <div className="flex justify-between items-center mt-20">
          {/* Left side button (Explore More) */}
          <CardItem
            translateZ={20}
            as="a"
            href="https://your-site.com/explore"
            target="_blank"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            Explore More →
          </CardItem>

          {/* Right side buttons (GitHub & Live Preview) */}
          <div className="flex gap-4">
            <CardItem
              translateZ={20}
              as="a"
              href="https://github.com/your-username/your-repo"
              target="_blank"
              className=" flex items-center gap-2 px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
            >
                
              <FaGithub /> GitHub Repo
            </CardItem>

            <CardItem
              translateZ={20}
              as="a"
              href="https://your-live-url.com"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
            >
              <FaExternalLinkAlt /> Live Preview
            </CardItem>
          </div>
        </div>
      </CardBody>
    </CardContainer>
  );
}
