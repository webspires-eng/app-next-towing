import { mkdir, writeFile } from "fs/promises";
import { extname, join } from "path";
import { randomUUID } from "crypto";

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export async function saveUploadedImage(file, slug = "", folder = "services") {
  if (
    !file ||
    typeof file !== "object" ||
    typeof file.arrayBuffer !== "function" ||
    !("size" in file) ||
    file.size === 0
  ) {
    return null;
  }

  const safeSlug = slugify(slug || randomUUID());
  const originalName = typeof file.name === "string" ? file.name : "";
  const extension = extname(originalName) || ".jpg";
  const fileName = `${safeSlug}-${Date.now()}${extension}`;

  const uploadDir = join(process.cwd(), "public", "uploads", folder);
  await mkdir(uploadDir, { recursive: true });

  const fileBuffer = Buffer.from(await file.arrayBuffer());
  const filePath = join(uploadDir, fileName);

  await writeFile(filePath, fileBuffer);

  return `/uploads/${folder}/${fileName}`;
}
