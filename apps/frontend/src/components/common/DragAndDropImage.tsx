"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { validateImageFileType } from "@/lib/utils";
import { useToast } from "../ui/use-toast";

export interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "onChange"
  > {
  onChange: (file: File | undefined) => void;
  imageUrl?: string;
  errorMessage?: string;
}

const DragAndDropImage = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, imageUrl, onChange, onBlur, errorMessage, ...props }, ref) => {
    const [image, setImage] = useState<string | null>(imageUrl ?? null);
    const [isDragActive, setDragActive] = useState(false);

    const { toast } = useToast();

    const handleFile = (file: File | undefined) => {
      if (file) {
        if (!validateImageFileType(file)) {
          toast({
            variant: "default",
            title: "Invalid file type",
            description: "Please provide only image file",
            // className:"font-bold",
            duration: 2000,
          });
          return;
        }

        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result as string);
        };
        reader.readAsDataURL(file);
        onChange(file);
      } else {
        console.warn("File is not found");
      }
    };

    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      handleFile(file);
    };

    const handleDrag = (
      e: React.DragEvent<HTMLLabelElement | HTMLDivElement | HTMLFormElement>
    ) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };

    const handleDrop = (
      e: React.DragEvent<HTMLLabelElement | HTMLDivElement>
    ) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.dataTransfer.files) {
        handleFile(e.dataTransfer.files?.[0]);
      }
      setDragActive(false);
    };

    return (
      <>
        <Label
          htmlFor="dropzone-file"
          className={cn(
            `flex justify-center items-center flex-col inset-0 cursor-pointer h-full
          border-2 border-dotted text-gray-400 rounded-md aspect-auto overflow-hidden transition-all delay-100`,
            { " border-slate-600 shadow-md": isDragActive },
            { "border-red-500": errorMessage },
            className
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {image ? (
            <Image
              src={image}
              alt={"imput-image"}
              height={300}
              width={300}
              className="object-contain"
            />
          ) : (
            <>
              <svg
                aria-hidden="true"
                className="w-10 h-10 mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>

              <p className="mb-2 text-sm">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
            </>
          )}

          <input
            {...props}
            ref={ref}
            onChange={onImageChange}
            onBlur={onBlur}
            size={100}
            accept="image/jpeg, image/jpg, image/png"
            id="dropzone-file"
            type="file"
            className="hidden"
          />
        </Label>
        {errorMessage && (
          <p className="text-[0.875rem] mt-2 font-medium text-red-500">{errorMessage}</p>
        )}
      </>
    );
  }
);

DragAndDropImage.displayName = "DragAndDropImageUpload";
export default DragAndDropImage;
