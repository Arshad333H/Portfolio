"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import { Expand } from "lucide-react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ProjectMediaGalleryProps {
  images: string[];
  videoUrl?: string;
  title: string;
}

export const ProjectMediaGallery = ({ images, videoUrl, title }: ProjectMediaGalleryProps) => {
  const laptopAspectRatio = 16 / 9;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const getVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = videoUrl ? getVideoId(videoUrl) : null;

  return (
    <div className="space-y-8 mt-8">
      {/* Video Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Project Demo</h2>
        <div className="w-full">
          {videoUrl ? (
            <div className="relative mx-auto" style={{ maxWidth: '800px' }}>
              <div className="relative bg-gray-200 dark:bg-gray-700 rounded-xl p-4 pb-0 shadow-lg">
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-gray-300 dark:bg-gray-600 rounded-t-sm"></div>
                <div 
                  className="overflow-hidden rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-black"
                  style={{ aspectRatio: laptopAspectRatio }}
                >
                  {videoId ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1`}
                      title={`${title} - Demo Video`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="border-0"
                    />
                  ) : (
                    <iframe
                      width="100%"
                      height="100%"
                      src={videoUrl}
                      title={`${title} - Demo Video`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="border-0"
                    />
                  )}
                </div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-b-lg mt-1"></div>
              </div>
              <div className="mx-auto w-3/4 h-2 bg-gray-300 dark:bg-gray-600 rounded-b-xl"></div>
            </div>
          ) : (
            <div className="relative mx-auto" style={{ maxWidth: '800px' }}>
              <div className="relative bg-gray-200 dark:bg-gray-700 rounded-xl p-4 pb-0 shadow-lg">
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-gray-300 dark:bg-gray-600 rounded-t-sm"></div>
                <div 
                  className="flex items-center justify-center rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-muted"
                  style={{ aspectRatio: laptopAspectRatio }}
                >
                  <p className="text-muted-foreground">No video available</p>
                </div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-b-lg mt-1"></div>
              </div>
              <div className="mx-auto w-3/4 h-2 bg-gray-300 dark:bg-gray-600 rounded-b-xl"></div>
            </div>
          )}
        </div>
      </div>

      {/* Images Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Project Screenshots</h2>
        <div className="w-full">
          <div className="relative mx-auto" style={{ maxWidth: '800px' }}>
            <div className="relative bg-gray-200 dark:bg-gray-700 rounded-xl p-4 pb-0 shadow-lg">
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-gray-300 dark:bg-gray-600 rounded-t-sm"></div>
              <div className="overflow-hidden rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-black">
                <Carousel 
                  className="w-full"
                  opts={{
                    loop: true,
                  }}
                >
                  <CarouselContent>
                    {images.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="p-0 relative">
                          <div 
                            className="flex items-center justify-center"
                            style={{ aspectRatio: laptopAspectRatio }}
                          >
                            <img
                              src={image}
                              alt={`${title} - Screenshot ${index + 1}`}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <Dialog>
                            <DialogTrigger asChild>
                              <button
                                onClick={() => setSelectedImage(image)}
                                className="absolute bottom-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                                aria-label="Expand image"
                              >
                                <Expand className="h-5 w-5 text-white" />
                              </button>
                            </DialogTrigger>
                            <DialogTitle/>
                            <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-transparent border-none">
                              <img
                                src={selectedImage || image}
                                alt={`${title} - Screenshot ${index + 1} (Fullscreen)`}
                                className="w-full h-full object-contain"
                              />
                            </DialogContent>
                          </Dialog>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {images.length > 1 && (
                    <>
                      <CarouselPrevious className="left-2" />
                      <CarouselNext className="right-2" />
                    </>
                  )}
                </Carousel>
              </div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-b-lg mt-1"></div>
            </div>
            <div className="mx-auto w-3/4 h-2 bg-gray-300 dark:bg-gray-600 rounded-b-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};