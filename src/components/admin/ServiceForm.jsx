'use client';

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function ToolbarButton({ label, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-9 items-center justify-center rounded-md border border-[#0E172B]/10 bg-white px-3 text-sm font-semibold text-[#0E172B] transition hover:border-[#FACC14] hover:text-[#FACC14]"
      aria-label={label}
      title={label}
    >
      {children}
    </button>
  );
}

function RichTextEditor({ value, onChange, placeholder }) {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const handleInput = () => {
    if (!editorRef.current) return;
    onChange(editorRef.current.innerHTML);
  };

  const applyCommand = (command, args) => {
    editorRef.current?.focus();
    document.execCommand(command, false, args ?? null);
    handleInput();
  };

  const handleLink = () => {
    const url = prompt("Enter URL");
    if (!url) return;
    applyCommand("createLink", url);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <ToolbarButton label="Bold" onClick={() => applyCommand("bold")}>
          <span className="font-semibold">B</span>
        </ToolbarButton>
        <ToolbarButton label="Italic" onClick={() => applyCommand("italic")}>
          <span className="italic">I</span>
        </ToolbarButton>
        <ToolbarButton label="Heading" onClick={() => applyCommand("formatBlock", "<h3>")}>
          H3
        </ToolbarButton>
        <ToolbarButton label="Bullet list" onClick={() => applyCommand("insertUnorderedList")}>
          ••
        </ToolbarButton>
        <ToolbarButton label="Add link" onClick={handleLink}>
          ↗
        </ToolbarButton>
        <ToolbarButton label="Clear formatting" onClick={() => applyCommand("removeFormat")}>
          ⌫
        </ToolbarButton>
      </div>
      <div className="relative">
        {!value && (
          <span className="pointer-events-none absolute left-4 top-4 text-sm text-[#0E172B]/40">
            {placeholder}
          </span>
        )}
        <div
          ref={editorRef}
          className="min-h-[260px] rounded-xl border border-[#0E172B]/10 bg-white px-4 py-3 text-sm leading-7 text-[#0E172B] shadow-inner outline-none focus-within:border-[#FACC14]"
          contentEditable
          onInput={handleInput}
          suppressContentEditableWarning
        />
      </div>
      <p className="text-xs text-[#0E172B]/50">Tip: Use the toolbar to format key information for the service.</p>
    </div>
  );
}

const defaultData = Object.freeze({
  title: "",
  slug: "",
  excerpt: "",
  description: "",
  metaTitle: "",
  metaDescription: "",
  featuredImage: "",
});

const countChars = (text) => (text ? text.length : 0);

export default function ServiceForm({
  action,
  initialData,
  submitLabel,
  serviceId,
  headline,
  subheading,
  backHref,
}) {
  const data = useMemo(() => ({ ...defaultData, ...(initialData || {}) }), [initialData]);

  const [title, setTitle] = useState(data.title);
  const [slug, setSlug] = useState(data.slug);
  const [autoSlug, setAutoSlug] = useState(!data.slug);
  const [excerpt, setExcerpt] = useState(data.excerpt);
  const [metaTitle, setMetaTitle] = useState(data.metaTitle);
  const [metaDescription, setMetaDescription] = useState(data.metaDescription);
  const [description, setDescription] = useState(data.description);
  const [imagePreview, setImagePreview] = useState(data.featuredImage || "");
  const fileInputRef = useRef(null);
  const objectUrlRef = useRef(null);

  useEffect(() => {
    if (autoSlug) {
      setSlug(slugify(title));
    }
  }, [title, autoSlug]);

  const handleSlugBlur = () => {
    setSlug((current) => slugify(current));
  };

  const handleSlugChange = (event) => {
    setSlug(slugify(event.target.value));
    setAutoSlug(false);
  };

  const handleTitleChange = (event) => {
    const next = event.target.value;
    setTitle(next);
    if (autoSlug) {
      setSlug(slugify(next));
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      setImagePreview(data.featuredImage || "");
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
      return;
    }
    const url = URL.createObjectURL(file);
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }
    objectUrlRef.current = url;
    setImagePreview(url);
  };

  const clearSelectedImage = () => {
    setImagePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  };

  useEffect(
    () => () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    },
    []
  );

  const metaTitleCharCount = countChars(metaTitle);
  const metaDescriptionCharCount = countChars(metaDescription);

  return (
    <div className="grid gap-8">
      {(headline || subheading || backHref) && (
        <div className="flex flex-col gap-3 rounded-2xl border border-[#0E172B]/10 bg-white p-6 shadow-lg sm:flex-row sm:items-center sm:justify-between">
          <div>
            {headline && <h1 className="text-3xl font-semibold text-[#0E172B]">{headline}</h1>}
            {subheading && <p className="text-sm text-[#0E172B]/60">{subheading}</p>}
          </div>
          {backHref && (
            <Link
              href={backHref}
              className="inline-flex items-center justify-center rounded-full border border-[#0E172B]/15 bg-white px-4 py-2 text-sm font-semibold text-[#0E172B] transition hover:border-[#FACC14]"
            >
              ← Back to services
            </Link>
          )}
        </div>
      )}

      <form
        action={action}
        method="post"
        encType="multipart/form-data"
        className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1.05fr)]"
      >
        {serviceId && <input type="hidden" name="id" value={serviceId} />}
        <input type="hidden" name="description" value={description} />
        <input type="hidden" name="existingImage" value={data.featuredImage || ""} />

        <div className="grid gap-6">
          <div className="grid gap-6 rounded-2xl border border-[#0E172B]/10 bg-white p-6 shadow-lg">
            <div className="grid gap-6 md:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-[#0E172B]">Title</span>
                <input
                  name="title"
                  value={title}
                  onChange={handleTitleChange}
                  required
                  className="input bg-white"
                  placeholder="Vehicle Recovery"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="flex items-center justify-between text-sm font-semibold text-[#0E172B]">
                  Slug
                  {autoSlug ? (
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#0E172B]/40">auto</span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setSlug(slugify(title));
                        setAutoSlug(true);
                      }}
                      className="text-xs font-semibold text-[#0E172B]/60 hover:text-[#0E172B]"
                    >
                      Reset
                    </button>
                  )}
                </span>
                <input
                  name="slug"
                  value={slug}
                  onChange={handleSlugChange}
                  onBlur={handleSlugBlur}
                  className="input bg-white font-mono text-sm tracking-wide"
                  placeholder="vehicle-recovery"
                />
                <span className="text-xs text-[#0E172B]/50">Used in URLs and filenames.</span>
              </label>
            </div>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-[#0E172B]">Excerpt</span>
              <textarea
                name="excerpt"
                rows={3}
                className="input bg-white"
                value={excerpt}
                onChange={(event) => setExcerpt(event.target.value)}
                placeholder="Short summary shown on listing cards."
              />
              <span className="text-xs text-[#0E172B]/50">Keep this under 160 characters.</span>
            </label>
          </div>

          <div className="rounded-2xl border border-[#0E172B]/10 bg-white p-6 shadow-lg">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-[#0E172B]">Detailed description</span>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#0E172B]/40">
                wysiwyg
              </span>
            </div>
            <RichTextEditor
              value={description}
              onChange={setDescription}
              placeholder="Write the full breakdown of this service..."
            />
          </div>

          <div className="grid gap-4 rounded-2xl border border-[#0E172B]/10 bg-white p-6 shadow-lg md:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="flex items-center justify-between text-sm font-semibold text-[#0E172B]">
                Meta title
                <span className="text-xs font-semibold text-[#0E172B]/50">
                  {metaTitleCharCount} {metaTitleCharCount === 1 ? "character" : "characters"}
                </span>
              </span>
              <input
                name="metaTitle"
                className="input bg-white"
                value={metaTitle}
                onChange={(event) => setMetaTitle(event.target.value)}
                placeholder="Vehicle Recovery | Next Towing"
              />
            </label>
            <label className="flex flex-col gap-2 md:col-span-2">
              <span className="flex items-center justify-between text-sm font-semibold text-[#0E172B]">
                Meta description
                <span className="text-xs font-semibold text-[#0E172B]/50">
                  {metaDescriptionCharCount} {metaDescriptionCharCount === 1 ? "character" : "characters"}
                </span>
              </span>
              <textarea
                name="metaDescription"
                rows={3}
                className="input bg-white"
                value={metaDescription}
                onChange={(event) => setMetaDescription(event.target.value)}
                placeholder="SEO friendly description shown in search results."
              />
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 rounded-2xl border border-transparent bg-transparent p-2">
            <Link
              href={backHref || "/dashboard/services"}
              className="inline-flex items-center justify-center rounded-full border border-[#0E172B]/15 bg-white px-4 py-2 text-sm font-semibold text-[#0E172B] transition hover:border-[#FACC14]"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-[#FACC14] px-6 py-2 text-sm font-semibold text-black shadow-[0_12px_30px_rgba(250,204,20,0.45)] transition hover:bg-[#ffe05a]"
            >
              {submitLabel}
            </button>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="rounded-2xl border border-[#0E172B]/10 bg-white p-6 shadow-lg">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[#0E172B]">Featured image</p>
                <p className="text-xs text-[#0E172B]/50">Upload up to one image. Landscape works best.</p>
              </div>
              {imagePreview && (
                <button
                  type="button"
                  onClick={clearSelectedImage}
                  className="text-xs font-semibold text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              )}
            </div>

            <label className="mt-4 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-[#0E172B]/20 bg-[#F8FAFC] p-6 text-center transition hover:border-[#FACC14] hover:bg-white">
              <input
                ref={fileInputRef}
                type="file"
                name="featuredImage"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <span className="text-sm font-semibold text-[#0E172B]">
                {imagePreview ? "Change featured image" : "Upload featured image"}
              </span>
              <span className="text-xs text-[#0E172B]/50">Max 1 image • JPG or PNG • 2MB recommended</span>
            </label>

            {imagePreview && (
              <div className="mt-4 overflow-hidden rounded-xl border border-[#0E172B]/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imagePreview} alt="Featured preview" className="h-48 w-full object-cover" />
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-[#0E172B]/10 bg-white p-6 shadow-lg">
            <p className="text-sm font-semibold text-[#0E172B]">Publishing checklist</p>
            <ul className="mt-3 space-y-2 text-sm text-[#0E172B]/70">
              <li>• Keep the meta description between 140–160 characters.</li>
              <li>• Include compelling keywords in the WYSIWYG body.</li>
              <li>• Use a unique featured image for each service.</li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
}
