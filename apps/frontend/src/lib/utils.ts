import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const validateImageFileType = (file: File): boolean => {
  const type = file.type.split("/")[0];
  if (type === "image") {
    return true;
  }
  return false;
}

export const validateFileType = (file: File, acceptedFile: string[]): boolean => {
  const type = file.type;
  return acceptedFile.includes(type);
}