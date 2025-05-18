"use client"; // Add this directive at the top

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ProjectCardProps {
  title: string
  description: string
  imageUrl: string
  githubUrl: string
  liveUrl?: string
  tags?: string[]
  id: string
}

export function ProjectCard({
  title,
  description,
  imageUrl,
  githubUrl,
  liveUrl,
  tags = [],
  id,
}: ProjectCardProps) {
  return (
    <Card className=" mx-5 group overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/10 dark:hover:shadow-primary/20">
      <Link href={`/projects/${id}`} className="focus:outline-none">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-all duration-300 group-hover:scale-105"
            priority={false}
          />
        </div>
        
        <CardHeader>
          <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {description}
          </CardDescription>
        </CardHeader>
      </Link>
      
      {tags.length > 0 && (
        <CardContent className="flex flex-wrap gap-2 pb-4">
          {tags.map((tag) => (
            <span 
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </CardContent>
      )}
      
      <CardFooter className="flex justify-between gap-2">
        <Button asChild variant="outline" size="sm">
          <a 
            href={githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            <Github className="mr-2 h-4 w-4" />
            Code
          </a>
        </Button>
        
        {liveUrl && (
          <Button asChild size="sm">
            <a 
              href={liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              Live Demo
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}