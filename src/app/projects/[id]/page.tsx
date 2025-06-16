import { ProjectMediaGallery } from "@/app/components/ProjectMediaGallery"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Calendar, ExternalLink, Github, Star, Tag, Wrench } from "lucide-react"

async function getData(id: string) {
  const data = await prisma.project.findUnique({
    where: { id },
  })
  if (!data) notFound()
  return data
}

export default async function ProjectDetails({
  params: { id },
}: {
  params: { id: string }
}) {
  const project = await getData(id)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="relative mb-12">
          {project.images?.[0] && (
            <div className="relative overflow-hidden rounded-3xl shadow-2xl mb-8">
              <img
                src={project.images[0] || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-80 sm:h-96 object-cover"
              />
            </div>
          )}

          {/* Title and Description below image */}
          <div className=" mb-8">
            <h1 className="text-4xl sm:text-4xl font-bold mb-4 pb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {project.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{project.description}</p>
          </div>

          {/* Action Buttons */}
          {(project.liveUrl || project.githubUrl) && (
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              {project.liveUrl && (
                <Button size="lg" className="shadow-lg hover:shadow-xl transition-shadow" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-5 w-5" />
                    Live Preview
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button size="lg" variant="outline" className="shadow-lg hover:shadow-xl transition-shadow" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-5 w-5" />
                    View Code
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Media Gallery */}
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Project Gallery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ProjectMediaGallery
                  images={project.images || []}
                  videoUrl={(project.video as string) || ""}
                  title={project.title}
                />
              </CardContent>
            </Card>

            {/* Long Description */}
            {project.longDescription && (
              <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>About This Project</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-slate dark:prose-invert max-w-none">
                    <p className="text-base leading-relaxed whitespace-pre-line">{project.longDescription}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Key Features */}
            {project.features?.length > 0 && (
              <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-blue-500" />
                    Key Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {project.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                        <span className="text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Technologies */}
            {project.technologies?.length > 0 && (
              <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Wrench className="h-5 w-5 text-green-500" />
                    Technologies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <Badge
                        key={idx}
                        className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-100"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tags */}
            {project.tags?.length > 0 && (
              <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Tag className="h-5 w-5 text-purple-500" />
                    Tags
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-300"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Project Info */}
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  Project Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-muted-foreground">Created</span>
                  <span className="text-sm font-semibold">
                    {new Date(project.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-muted-foreground">Last Updated</span>
                  <span className="text-sm font-semibold">
                    {new Date(project.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
