"use client";
import { useState } from "react";
import { useActionState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ProjectSchema } from "@/lib/ZodSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { XIcon, Rocket, Sparkles, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadButton } from "@/lib/uploadthing";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { createProjectAction } from "@/../action";
import { FiAlertCircle } from "react-icons/fi";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const UploadProject = () => {
  const [video, setVideo] = useState<string | null>(null);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [lastResult, action] = useActionState(createProjectAction, undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: ProjectSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const handleDeleteImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleDeleteVideo = () => {
    setVideo(null);
    setVideoError(null);
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setVideoError(null);
    setUploadingVideo(true);
    setVideoProgress(0);

    // Validate file type
    const ALLOWED_TYPES = ["video/mp4", "video/quicktime", "video/x-msvideo"];
    if (!ALLOWED_TYPES.includes(file.type)) {
      setVideoError("Only MP4, MOV, AVI videos allowed");
      setUploadingVideo(false);
      return;
    }

    // Validate size (consistent message)
    if (file.size > 200 * 1024 * 1024) {
      setVideoError("File size exceeds 200MB limit");
      setUploadingVideo(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          setVideoProgress(Math.round((event.loaded / event.total) * 100));
        }
      });

      const data = await new Promise((resolve, reject) => {
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              try {
                resolve(JSON.parse(xhr.responseText));
              } catch (e) {
                reject(new Error("Invalid server response"));
              }
            } else {
              reject(new Error(`Upload failed: ${xhr.statusText}`));
            }
          }
        };
        xhr.open("POST", "/api/upload", true);
        xhr.send(formData);
      });

      const { success, url, message } = data as {
        success: boolean;
        url: string;
        message?: string;
      };

      if (success) {
        setVideo(url);
      } else {
        throw new Error(message || "Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setVideoError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploadingVideo(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen p-4 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-purple-200 rounded-full filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-1/3 right-20 w-40 h-40 bg-indigo-200 rounded-full filter blur-3xl opacity-20 animate-float-delay"></div>
      </div>

      {/* Floating character */}
      <div className="fixed bottom-8 right-8 z-10">
        <motion.div
          initial={{ y: 20, rotate: -5 }}
          animate={{ y: 0, rotate: 5 }}
          transition={{
            y: {
              duration: 2.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
            rotate: {
              duration: 3.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-purple-300 rounded-full blur-xl opacity-10 animate-pulse"></div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-40 h-40 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center shadow-lg border border-white/20">
              <Rocket className="w-16 h-16 text-indigo-600 animate-float" />
            </div>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 0, x: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: [0, -40],
                  x: Math.random() > 0.5 ? [0, 20] : [0, -20],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeOut",
                }}
                className="absolute text-yellow-400"
                style={{
                  top: `${Math.random() * 60 + 20}%`,
                  left: `${Math.random() * 60 + 20}%`,
                }}
              >
                <Sparkles size={16} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Main form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "backOut" }}
        className="w-full max-w-2xl relative z-10"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20 transform transition-all hover:shadow-3xl">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white overflow-hidden">
            <div className="absolute inset-0 bg-noise opacity-10"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 via-purple-500/20 to-pink-500/10"></div>
            <div className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold tracking-tight"
              >
                Create New Project
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-indigo-100/90 mt-2 font-light"
              >
                Launch your next big idea
              </motion.p>
            </div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/5 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/5 rounded-full -ml-16 -mb-16"></div>
          </div>

          <form
            id={form.id}
            onSubmit={form.onSubmit}
            action={action}
            className="p-8 space-y-8"
          >
            <div className="space-y-8">
              {/* Basic Info Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/80 backdrop-blur-sm p-7 rounded-2xl border border-white/20 shadow-sm hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-xl mb-6 text-gray-800 flex items-center">
                  <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full mr-3 shadow-sm"></span>
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Basic Information
                  </span>
                </h3>

                <div className="space-y-6">
                  <div>
                    <Label
                      htmlFor={fields.title.id}
                      className="block text-sm font-medium text-gray-700/90 mb-2.5"
                    >
                      Title <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id={fields.title.id}
                      name={fields.title.name}
                      key={fields.title.key}
                      defaultValue={fields.title.initialValue}
                      placeholder="My Awesome Project"
                      className="focus:ring-2 focus:ring-indigo-400 border-gray-200 hover:border-indigo-300 transition-all shadow-sm"
                    />
                    <AnimatePresence>
                      {fields.title.errors && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="mt-2 text-sm text-red-500 flex items-center"
                        >
                          {fields.title.errors}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <Label
                      htmlFor={fields.description.id}
                      className="block text-sm font-medium text-gray-700/90 mb-2.5"
                    >
                      Short Description <span className="text-red-400">*</span>
                    </Label>
                    <Textarea
                      id={fields.description.id}
                      name={fields.description.name}
                      key={fields.description.key}
                      defaultValue={fields.description.initialValue}
                      placeholder="Brief project summary"
                      rows={3}
                      className="focus:ring-2 focus:ring-indigo-400 border-gray-200 hover:border-indigo-300 transition-all shadow-sm"
                    />
                    <AnimatePresence>
                      {fields.description.errors && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="mt-2 text-sm text-red-500 flex items-center"
                        >
                          {fields.description.errors}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <Label
                      htmlFor={fields.longDescription.id}
                      className="block text-sm font-medium text-gray-700/90 mb-2.5"
                    >
                      Detailed Description{" "}
                      <span className="text-red-400">*</span>
                    </Label>
                    <Textarea
                      id={fields.longDescription.id}
                      name={fields.longDescription.name}
                      key={fields.longDescription.key}
                      defaultValue={fields.longDescription.initialValue}
                      placeholder="Full project details"
                      rows={6}
                      className="focus:ring-2 focus:ring-indigo-400 border-gray-200 hover:border-indigo-300 transition-all shadow-sm"
                    />
                    <AnimatePresence>
                      {fields.longDescription.errors && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="mt-2 text-sm text-red-500 flex items-center"
                        >
                          {fields.longDescription.errors}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>

              {/* Links Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/80 backdrop-blur-sm p-7 rounded-2xl border border-white/20 shadow-sm hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-xl mb-6 text-gray-800 flex items-center">
                  <span className="w-2.5 h-2.5 bg-purple-500 rounded-full mr-3 shadow-sm"></span>
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Project Links
                  </span>
                </h3>

                <div className="space-y-6">
                  <div>
                    <Label
                      htmlFor={fields.githubUrl.id}
                      className="block text-sm font-medium text-gray-700/90 mb-2.5"
                    >
                      GitHub URL
                    </Label>
                    <Input
                      id={fields.githubUrl.id}
                      name={fields.githubUrl.name}
                      key={fields.githubUrl.key}
                      defaultValue={fields.githubUrl.initialValue}
                      placeholder="https://github.com/yourname/repo"
                      className="focus:ring-2 focus:ring-purple-400 border-gray-200 hover:border-purple-300 transition-all shadow-sm"
                    />
                    <AnimatePresence>
                      {fields.githubUrl.errors && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="mt-2 text-sm text-red-500 flex items-center"
                        >
                          {fields.githubUrl.errors}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <Label
                      htmlFor={fields.liveUrl.id}
                      className="block text-sm font-medium text-gray-700/90 mb-2.5"
                    >
                      Live Demo URL
                    </Label>
                    <Input
                      id={fields.liveUrl.id}
                      name={fields.liveUrl.name}
                      key={fields.liveUrl.key}
                      defaultValue={fields.liveUrl.initialValue}
                      placeholder="https://your-project.com"
                      className="focus:ring-2 focus:ring-purple-400 border-gray-200 hover:border-purple-300 transition-all shadow-sm"
                    />
                    <AnimatePresence>
                      {fields.liveUrl.errors && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="mt-2 text-sm text-red-500 flex items-center"
                        >
                          {fields.liveUrl.errors}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>

              {/* Metadata Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/80 backdrop-blur-sm p-7 rounded-2xl border border-white/20 shadow-sm hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-xl mb-6 text-gray-800 flex items-center">
                  <span className="w-2.5 h-2.5 bg-pink-500 rounded-full mr-3 shadow-sm"></span>
                  <span className="bg-gradient-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent">
                    Project Metadata
                  </span>
                </h3>

                <div className="space-y-6">
                  <div>
                    <Label
                      htmlFor="domain"
                      className="block text-sm font-medium text-gray-700/90 dark:text-gray-300 mb-2.5"
                    >
                      Domain <span className="text-red-400">*</span>
                    </Label>
                    <div className="relative">
                      <select
                        id="domain"
                        name="domain"
                        className="block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-400 focus:border-pink-300 shadow-sm transition-all hover:border-pink-300 appearance-none"
                      >
                        <option value="">Select a domain</option>
                        <option value="WEB">Web Development</option>
                        <option value="ML">Machine Learning</option>
                        <option value="AI_ML">AI/ML</option>
                        <option value="DS">Data Science</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                        <svg
                          className="h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <AnimatePresence>
                      {fields.domain?.errors && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="mt-2 text-sm text-red-500 dark:text-red-400 flex items-center gap-1"
                        >
                          <FiAlertCircle className="h-4 w-4" />
                          {fields.domain.errors}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <Label
                      htmlFor={fields.tags.id}
                      className="block text-sm font-medium text-gray-700/90 dark:text-gray-300 mb-2.5"
                    >
                      Tags <span className="text-red-400">*</span> (comma
                      separated)
                    </Label>
                    <Input
                      id={fields.tags.id}
                      name={fields.tags.name}
                      key={fields.tags.key}
                      defaultValue={fields.tags.initialValue as string[]}
                      placeholder="Frontend, Fullstack, UI/UX, Web App"
                      className="focus:ring-2 focus:ring-pink-400 border-gray-200 dark:border-gray-600 hover:border-pink-300 transition-all shadow-sm dark:bg-gray-700 dark:text-white"
                    />
                    <AnimatePresence>
                      {fields.tags.errors && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="mt-2 text-sm text-red-500 dark:text-red-400 flex items-center gap-1"
                        >
                          <FiAlertCircle className="h-4 w-4" />
                          {fields.tags.errors}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <Label
                      htmlFor={fields.technologies.id}
                      className="block text-sm font-medium text-gray-700/90 dark:text-gray-300 mb-2.5"
                    >
                      Technologies <span className="text-red-400">*</span>{" "}
                      (comma separated)
                    </Label>
                    <Input
                      id={fields.technologies.id}
                      name={fields.technologies.name}
                      key={fields.technologies.key}
                      defaultValue={
                        fields.technologies.initialValue as string[]
                      }
                      placeholder="React, TypeScript, Next.js, Tailwind CSS"
                      className="focus:ring-2 focus:ring-pink-400 border-gray-200 dark:border-gray-600 hover:border-pink-300 transition-all shadow-sm dark:bg-gray-700 dark:text-white"
                    />
                    <AnimatePresence>
                      {fields.technologies.errors && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="mt-2 text-sm text-red-500 dark:text-red-400 flex items-center gap-1"
                        >
                          <FiAlertCircle className="h-4 w-4" />
                          {fields.technologies.errors}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>

              {/* Media Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/80 backdrop-blur-sm p-7 rounded-2xl border border-white/20 shadow-sm hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-xl mb-6 text-gray-800 flex items-center">
                  <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full mr-3 shadow-sm"></span>
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Project Media
                  </span>
                </h3>

                <div className="space-y-8">
                  {/* Images Upload */}
                  <div>
                    <Label>Project Images</Label>
                    <input
                      type="hidden"
                      value={images}
                      key={fields.images.key}
                      name={fields.images.name}
                      defaultValue={fields.images.initialValue as any}
                    />

                    <AnimatePresence mode="wait">
                      {images.length > 0 ? (
                        <motion.div
                          key="image-grid"
                          className="flex gap-5 flex-wrap mt-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {images.map((image, index) => (
                            <motion.div
                              key={index}
                              className="relative w-[100px] h-[100px]"
                              initial={{ scale: 0.9, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.8, opacity: 0 }}
                              transition={{ duration: 0.15 }}
                              layout
                            >
                              <Image
                                height={100}
                                width={100}
                                src={image}
                                alt="Project Image"
                                className="w-full h-full object-cover rounded-lg border"
                              />
                              <motion.button
                                onClick={() => handleDeleteImage(index)}
                                type="button"
                                className="absolute -top-3 -right-3 bg-red-500 p-2 rounded-lg text-white shadow-sm"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <XIcon className="w-3 h-3" />
                              </motion.button>
                            </motion.div>
                          ))}
                        </motion.div>
                      ) : (
                        <motion.div
                          key="upload-button"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-4"
                        >
                          <UploadButton
                            className="ut-button:bg-gradient-to-r ut-button:from-indigo-600 ut-button:to-purple-600 ut-button:ut-readying:bg-gradient-to-r ut-button:ut-readying:from-indigo-500 ut-button:ut-readying:to-purple-500 ut-button:ut-uploading:bg-gradient-to-r ut-button:ut-uploading:from-indigo-500 ut-button:ut-uploading:to-purple-500 ut-button:hover:bg-gradient-to-r ut-button:hover:from-indigo-700 ut-button:hover:to-purple-700 ut-button:transition-all ut-button:duration-200 ut-button:rounded-lg ut-button:px-5 ut-button:py-2.5 ut-button:text-sm ut-button:font-medium ut-button:text-white ut-button:shadow-md ut-allowed-content:hidden ut-button:hover:shadow-lg ut-button:focus:ring-2 ut-button:focus:ring-indigo-400 ut-button:focus:ring-offset-2 ut-button:border-0"
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                              setImages(res.map((r) => r.ufsUrl));
                            }}
                            onUploadError={(error) => {
                              console.error("Upload error:", error);
                              alert(`Upload failed: ${error.message}`);
                            }}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {fields.images.errors && (
                      <motion.p
                        className="text-red-500 text-sm mt-1"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.15 }}
                      >
                        {fields.images.errors}
                      </motion.p>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200 dark:border-gray-600"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-2 bg-white/80 dark:bg-gray-800 text-sm text-gray-500 dark:text-gray-400">
                        AND
                      </span>
                    </div>
                  </div>

                  {/* Video Upload */}
                  <div className="flex flex-col gap-3">
                    <Label>Project Video</Label>

                    <input
                      type="hidden"
                      value={video || ""}
                      key={fields.video.key}
                      name={fields.video.name}
                      defaultValue={
                        fields.video.initialValue as string | undefined
                      }
                    />

                    <div className="relative">
                      <label
                        htmlFor="video-upload"
                        className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                          video
                            ? "border-green-500 bg-green-50 hover:bg-green-100"
                            : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-3 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500">
                            {video ? "Video uploaded" : "Click to upload"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {video
                              ? "Replace video"
                              : "MP4, MOV, AVI (MAX. 100MB)"}
                          </p>
                        </div>
                        <input
                          id="video-upload"
                          type="file"
                          accept="video/mp4,video/quicktime,video/x-msvideo"
                          onChange={handleVideoUpload}
                          className="hidden"
                          disabled={uploadingVideo}
                        />
                      </label>

                      {uploadingVideo && (
                        <div className="mt-2">
                          <Progress value={videoProgress} className="h-2" />
                          <p className="text-xs text-gray-500 mt-1">
                            Uploading... {videoProgress}%
                          </p>
                        </div>
                      )}

                      {fields.video.errors && (
                        <p className="text-sm text-red-500 mt-2">
                          {fields.video.errors}
                        </p>
                      )}
                      {videoError && (
                        <p className="text-sm text-red-500 mt-2">
                          {videoError}
                        </p>
                      )}
                    </div>

                    <AnimatePresence>
                      {video && (
                        <motion.div
                          key="video-preview"
                          className="relative w-full max-w-[400px]"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Card className="w-full overflow-hidden">
                            <CardContent className="p-0">
                              <video
                                src={video}
                                controls
                                className="w-full h-auto max-h-[300px] object-contain"
                              />
                            </CardContent>
                          </Card>
                          <motion.button
                            onClick={handleDeleteVideo}
                            type="button"
                            className="absolute -top-3 -right-3 bg-red-500 p-2 rounded-lg text-white shadow-sm"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <XIcon className="w-3 h-3" />
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Submit Button */}
            <motion.div
              className="flex justify-end pt-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                disabled={isSubmitting}
                className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg group transition-all"
              >
                <span className="relative z-10 flex items-center">
                  {isSubmitting ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="mr-2"
                    >
                      <Rocket className="h-4 w-4" />
                    </motion.span>
                  ) : (
                    <Rocket className="mr-2 h-4 w-4" />
                  )}
                  {isSubmitting ? "Launching..." : "Create Project"}
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            </motion.div>
          </form>
        </div>
      </motion.div>

      {/* Global styles */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes float-delay {
          0%,
          100% {
            transform: translateY(5px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float-delay 7s ease-in-out infinite;
        }
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)' opacity='0.2'/%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
};

export default UploadProject;
