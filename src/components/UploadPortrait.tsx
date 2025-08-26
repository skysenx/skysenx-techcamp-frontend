/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import { FaUserCircle } from "react-icons/fa";
import Button from "./ui/Button";
import useAxiosAuth from "../hooks/auth-hooks/useAxiosAuth";

interface Student {
  passportUrl?: string;
}

interface UploadPortraitProps {
  student?: Student;
  reg: string;
}

export default function UploadPortrait({ student, reg }: UploadPortraitProps) {
  const [image, setImage] = useState<File | null>(null);
  const { post } = useAxiosAuth();
  const [preview, setPreview] = useState<string | null>(
    student?.passportUrl || null
  );
  const [loading, setLoading] = useState(false);

  // Handle file select + preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Upload
  const handleSubmit = async () => {
    if (!image) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("regNo", reg);
      formData.append("passport", image);

      const response = await post("/student/upload/passport", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(response);
      toast.success("Photo uploaded successfully");
      window.location.reload();
    } catch (err) {
      console.error(err);
      toast.error("Photo upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Preview Box */}
      {!preview && student?.passportUrl ? (
        <div className="h-[300px] w-[350px] bg-black rounded-2xl overflow-hidden flex justify-center items-center">
          <img
            src={student?.passportUrl}
            alt="Preview"
            className="object-cover h-full w-full"
          />
        </div>
      ) : (
        <div className="h-[300px] w-[350px] bg-black rounded-2xl overflow-hidden flex justify-center items-center">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="object-cover h-full w-full"
            />
          ) : (
            <FaUserCircle className="w-full h-full text-[#5358627f]" />
          )}
        </div>
      )}

      {/* Hidden File Input */}
      {!preview && (
        <>
          <input
            id="passportUpload"
            name="passportUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          <label
            htmlFor="passportUpload"
            className="mt-6 cursor-pointer bg-primary text-white min-h-[38px] py-2 px-4 min-w-[151px] whitespace-nowrap block text-center rounded-[30px] no-underline border border-[#EFEFEF] hover:scale-102 duration-150 active:scale-100"
          >
            Select Portrait
          </label>
        </>
      )}
      {/* Submit Button */}
      {preview && (
        <Button
          size="sm"
          className="mt-6"
          onClick={handleSubmit}
          disabled={!image || loading}
        >
          {loading ? "Uploading..." : "Upload Portrait"}
        </Button>
      )}
    </div>
  );
}
