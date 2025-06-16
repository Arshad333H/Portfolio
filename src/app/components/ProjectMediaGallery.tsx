"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useState } from "react"
import { Expand, Play, ImageIcon } from "lucide-react"
import { Dialog, DialogTitle, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface ProjectMediaGalleryProps {
  images: string[]
  videoUrl?: string
  title: string
}

export const ProjectMediaGallery = ({ images, videoUrl, title }: ProjectMediaGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"video" | "images">(videoUrl ? "video" : "images")

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-2">
        {videoUrl && (
          <button
            onClick={() => setActiveTab("video")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === "video"
                ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
            }`}
          >
            <Play className="h-4 w-4" />
            Demo Video
          </button>
        )}
        {images.length > 0 && (
          <button
            onClick={() => setActiveTab("images")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === "images"
                ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
            }`}
          >
            <ImageIcon className="h-4 w-4" />
            Screenshots ({images.length})
          </button>
        )}
      </div>

      {/* Video Section */}
      {activeTab === "video" && videoUrl && (
        <div className="space-y-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Play className="h-5 w-5 text-blue-500" />
                  Project Demo
                </h3>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                  Video
                </Badge>
              </div>
              <div className="relative rounded-xl overflow-hidden bg-black shadow-lg">
                <video
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full aspect-video object-contain"
                  poster="/placeholder.svg?height=400&width=800"
                >
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Images Section */}
      {activeTab === "images" && images.length > 0 && (
        <div className="space-y-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-purple-500" />
                  Project Screenshots
                </h3>
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                >
                  {images.length} {images.length === 1 ? "Image" : "Images"}
                </Badge>
              </div>

              <div className="relative">
                <Carousel
                  className="w-full"
                  opts={{
                    loop: true,
                  }}
                >
                  <CarouselContent>
                    {images.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="relative">
                          <div className="relative rounded-xl overflow-hidden bg-black shadow-lg">
                            <img
                              src={image || "/placeholder.svg?height=400&width=800"}
                              alt={`${title} - Screenshot ${index + 1}`}
                              className="w-full aspect-video object-contain"
                            />

                            {/* Expand Button */}
                            <Dialog>
                              <DialogTrigger asChild>
                                <button
                                  onClick={() => setSelectedImage(image)}
                                  className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-900/90 rounded-full hover:bg-white dark:hover:bg-gray-900 transition-all duration-200 shadow-lg"
                                  aria-label="Expand image"
                                >
                                  <Expand className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                                </button>
                              </DialogTrigger>
                              <DialogTitle className="sr-only">
                                {title} - Screenshot {index + 1}
                              </DialogTitle>
                              <DialogContent className="max-w-[95vw] max-h-[95vh] p-2 bg-black/95 border-none">
                                <div className="relative w-full h-full flex items-center justify-center">
                                  <img
                                    src={selectedImage || image}
                                    alt={`${title} - Screenshot ${index + 1} (Fullscreen)`}
                                    className="max-w-full max-h-full object-contain rounded-lg"
                                  />
                                </div>
                              </DialogContent>
                            </Dialog>

                            {/* Image Counter */}
                            <div className="absolute bottom-4 left-4">
                              <Badge variant="secondary" className="bg-white/90 dark:bg-gray-900/90">
                                {index + 1} / {images.length}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  {images.length > 1 && (
                    <>
                      <CarouselPrevious className="left-4 bg-white/90 dark:bg-gray-900/90 hover:bg-white dark:hover:bg-gray-900 border-gray-200 dark:border-gray-700" />
                      <CarouselNext className="right-4 bg-white/90 dark:bg-gray-900/90 hover:bg-white dark:hover:bg-gray-900 border-gray-200 dark:border-gray-700" />
                    </>
                  )}
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!videoUrl && images.length === 0 && (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600">
          <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No media available</h3>
          <p className="text-gray-500 dark:text-gray-400">No images or videos have been added to this project yet.</p>
        </div>
      )}
    </div>
  )
}
