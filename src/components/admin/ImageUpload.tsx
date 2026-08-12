"use client";

import { toast } from "@/components/admin/AdminToast";
import { useState, useRef } from "react";
import { UploadCloud, X, Loader2 } from "lucide-react";

interface ImageUploadProps {
  value?: string | null;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = "Featured Image" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large. Max size is 5MB.");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (res.ok && result.url) {
        onChange(result.url);
        toast.success("Image uploaded!");
      } else {
        toast.error(result.error || "Failed to upload image");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network error during upload.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-gray-200 group bg-gray-50 flex items-center justify-center max-h-64">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Uploaded" className="max-w-full max-h-64 object-contain" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              type="button"
              onClick={() => onChange("")}
              className="bg-white text-red-500 p-2 rounded-full hover:scale-110 transition-transform shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-colors cursor-pointer
            ${isUploading ? "border-gray-200 bg-gray-50" : "border-blue-200 bg-blue-50/50 hover:bg-blue-50"}
          `}
        >
          {isUploading ? (
            <div className="flex flex-col items-center text-blue-600">
              <Loader2 className="w-8 h-8 animate-spin mb-3" />
              <span className="font-medium">Uploading...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center text-blue-600">
              <div className="p-3 bg-blue-100 rounded-full mb-3">
                <UploadCloud className="w-6 h-6" />
              </div>
              <span className="font-medium text-blue-900">Click to upload an image</span>
              <span className="text-sm text-blue-600/70 mt-1">PNG, JPG, WEBP up to 5MB</span>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>
      )}
    </div>
  );
}
