import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}

export function compressImage(
  base64: string,
  maxWidth: number = 400,
  maxHeight: number = 500,
  quality: number = 0.85
): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = (maxWidth / width) * height;
        width = maxWidth;
      }
      if (height > maxHeight) {
        width = (maxHeight / height) * width;
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    img.src = base64;
  });
}

export function cropImageToFace(
  base64: string,
  aspectRatio: number = 3 / 4
): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const targetWidth = 300;
      const targetHeight = targetWidth / aspectRatio;

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const ctx = canvas.getContext("2d")!;

      // Center crop
      const srcAspect = img.width / img.height;
      const tgtAspect = targetWidth / targetHeight;

      let sx = 0, sy = 0, sw = img.width, sh = img.height;

      if (srcAspect > tgtAspect) {
        sw = img.height * tgtAspect;
        sx = (img.width - sw) / 2;
      } else {
        sh = img.width / tgtAspect;
        sy = (img.height - sh) / 5; // Slightly top-aligned for faces
      }

      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, targetWidth, targetHeight);
      resolve(canvas.toDataURL("image/jpeg", 0.9));
    };
    img.src = base64;
  });
}

export function heightConvert(value: string, unit: "ft" | "cm"): string {
  if (unit === "cm") {
    const cm = parseFloat(value);
    if (isNaN(cm)) return value;
    const totalInches = cm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return `${feet}' ${inches}" (${cm} cm)`;
  }
  return value;
}

export function readTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.ceil(words / 200);
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
}

export function formatCurrency(amount: number, currency = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}
