"use client";
import useCustomToast from "@/hooks/useToast";
import { cn, validateImageFileType } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CiTrash } from "react-icons/ci";
import { Label } from "../ui/label";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLElement>, "type" | "onChange"> {
  onChange: (file: File[]) => void;
  pdfUrl?: string;
  errorMessage?: string;
}
const DragDropMultipleImages = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, errorMessage, onChange, pdfUrl, ...props }, ref) => {
    const [pdfFiles, setPdfFiles] = useState<File[]>([]);
    const [isDragActive, setDragActive] = useState(false);

    const toast = useCustomToast();

    useEffect(() => {
      onChange(pdfFiles);
    }, [pdfFiles]);

    //It handles file from upload or drag
    const handleFile = (files: FileList) => {
      if (files) {
        if (files?.length > 0) {
          const obj = Object.values(files);

          //validate for every file
          for (let f of obj) {
            if (!validateImageFileType(f)) {
              toast.error("Please provide only images");
              return;
            }
          }
          setPdfFiles((prev) => {
            if (!prev) {
              return obj;
            } else {
              return [...prev, ...obj];
            }
          });
        }
      }
    };

    //handle remove action
    const handleRemove = (index: number) => {
      setPdfFiles((prev) => {
        if (prev) {
          return prev.filter((file, idex) => idex !== index);
        } else {
          return prev;
        }
      });
    };

    //handle file change
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files!;
      handleFile(files);
    };

    //handle drag
    const handleDrag = (
      e: React.DragEvent<HTMLLabelElement | HTMLDivElement | HTMLFormElement>
    ) => {
      e.preventDefault();
      e.stopPropagation();

      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      }
      if (e.type === "dragleave") {
        setDragActive(false);
      }
    };

    //handle drop
    const handleDrop = (
      e: React.DragEvent<HTMLLabelElement | HTMLDivElement>
    ) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.dataTransfer.files) {
        handleFile(e.dataTransfer.files);
      }
      setDragActive(false);
    };
    return (
      <div className="outer flex flex-col gap-2">
        <div>
          <Label
            htmlFor="dropzone-multiple-images"
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
            {pdfUrl ? (
              <Image
                src={pdfUrl}
                alt={"imput"}
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
              accept="image/jpeg, image/jpg, image/png"
              id="dropzone-multiple-images"
              type="file"
              hidden
              multiple
              ref={ref}
              {...props}
              onChange={onFileChange}
            />
          </Label>
        </div>

        {pdfFiles.length > 0 && (
          <div className="space-y-2 flex h-[100px]">
            {pdfFiles?.map((file, index) => {
              const url = URL.createObjectURL(file);
              return (
                <div
                  className="border border-gray-300 p-2 rounded-md flex items-center justify-between text-sm"
                  key={(index + 989) * 34}
                >
                  <Image
                    src={url}
                    alt="drop-images"
                    height={100}
                    width={100}
                    className=" object-cover"
                  />
                  <span
                    className="text-lg cursor-pointer"
                    onClick={() => handleRemove(index)}
                  >
                    <CiTrash />
                  </span>
                </div>
              );
            })}
          </div>
        )}
        {errorMessage && (
          <p className="text-[0.875rem] mt-2 font-medium text-red-500">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

DragDropMultipleImages.displayName = "DragAndDropMultipleImages";
export default DragDropMultipleImages;
