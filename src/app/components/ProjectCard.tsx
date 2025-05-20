import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLinkIcon, GithubIcon } from "lucide-react";

type Project = {
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
};

type Props = {
  project: Project;
};

const ProjectCard: React.FC<Props> = ({ project }) => {
  const hasLinks = project.githubUrl || project.liveUrl;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 flex flex-col h-[500px]">
      {/* Responsive Image with proper height */}
      {project.images?.[0] && (
        <div className="relative w-full h-60 md:h-64 lg:h-72">
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-800">{project.title}</h2>
          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
            {project.domain}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="bg-gray-100 text-xs px-2 py-1 rounded text-gray-700"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-auto">
          {hasLinks ? (
            <div className="flex gap-3">
              {project.liveUrl && (
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-1/2"
                >
                  <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    <ExternalLinkIcon className="w-4 h-4" />
                    View Live
                  </button>
                </Link>
              )}
              {project.githubUrl && (
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-1/2"
                >
                  <button className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
                    <GithubIcon className="w-4 h-4" />
                    View Code
                  </button>
                </Link>
              )}
            </div>
          ) : (
            <Link href={`/projects/${project.id}`}>
              <button className="w-full h-10 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200 text-center">
                Explore More
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
