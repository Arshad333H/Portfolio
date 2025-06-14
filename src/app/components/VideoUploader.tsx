"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { AnimatePresence, motion } from "framer-motion";
import { XIcon, Upload } from "lucide-react";

export default function VideoUploadClient() {
  const [video, setVideo] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = () => {
    setVideo(null);
    setError(null);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Clear previous error
    setError(null);

    // Check file size (100MB max)
    if (file.size > 100 * 1024 * 1024) {
      setError("File size exceeds 100MB limit");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);
    setProgress(0);

    try {
      const xhr = new XMLHttpRequest();
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setProgress(percentComplete);
        }
      });

      const res = await new Promise((resolve, reject) => {
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(JSON.parse(xhr.responseText));
            } else {
              reject(new Error(xhr.statusText));
            }
          }
        };
        xhr.open("POST", "/api/upload-url", true);
        xhr.send(formData);
      });

      const data = res as { success: boolean; url: string; message?: string };
      if (data.success) {
        setVideo(data.url);
      } else {
        setError(data.message || "Upload failed");
      }
    } catch (err) {
      console.error("Unexpected error during upload:", err);
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Label>Project Video</Label>
      
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
              {video ? "Replace video" : "MP4, MOV, AVI (MAX. 100MB)"}
            </p>
          </div>
          <input
            id="video-upload"
            type="file"
            accept="video/*"
            onChange={handleUpload}
            className="hidden"
            disabled={uploading}
          />
        </label>
        
        {uploading && (
          <div className="mt-2">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-gray-500 mt-1">Uploading... {progress}%</p>
          </div>
        )}

        {error && (
          <p className="text-sm text-red-500 mt-2">{error}</p>
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
              onClick={handleDelete}
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
  );
}