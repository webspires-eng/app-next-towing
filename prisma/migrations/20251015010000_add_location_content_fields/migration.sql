-- Add content and SEO fields to the Location table
ALTER TABLE "Location" ADD COLUMN "excerpt" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Location" ADD COLUMN "description" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Location" ADD COLUMN "metaTitle" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Location" ADD COLUMN "metaDescription" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Location" ADD COLUMN "featuredImage" TEXT NOT NULL DEFAULT '';
