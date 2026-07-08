"use client";

import { FormEvent, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createProduct, updateProduct } from "@/helper/product/action";
import { useFileUpload } from "@/helper/upload/client";

// ── Types ─────────────────────────────────────────────────────────────────────

type ProductFormProps = {
  product?: {
    id?: string;
    name?: string;
    slug?: string;
    description?: string | null;
    price?: string | null;
    comparePrice?: string | null;
    stock?: number;
    sku?: string | null;
    tags?: string[] | null;
    isFeatured?: boolean;
    isBestSeller?: boolean;
    isNewArrival?: boolean;
    isActive?: boolean;
    categoryId?: string | null;
    images?: { url: string; isPrimary: boolean }[];
  };
};

// ── Helpers ────────────────────────────────────────────────────────────────────

function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const { upload, uploading } = useFileUpload();
  const [isPending, startTransition] = useTransition();
  const isEdit = Boolean(product?.id);

  // ── Field state (mirrors the actual schema) ────────────────────────────────
  const [name, setName] = useState(product?.name ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [price, setPrice] = useState(product?.price ?? "");
  const [comparePrice, setComparePrice] = useState(product?.comparePrice ?? "");
  const [stock, setStock] = useState(String(product?.stock ?? 0));
  const [sku, setSku] = useState(product?.sku ?? "");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(product?.tags ?? []);
  const [isFeatured, setIsFeatured] = useState(Boolean(product?.isFeatured));
  const [isBestSeller, setIsBestSeller] = useState(Boolean(product?.isBestSeller));
  const [isNewArrival, setIsNewArrival] = useState(Boolean(product?.isNewArrival));
  const [isActive, setIsActive] = useState(product?.isActive ?? true);
  // Initialize with existing image URLs
  // Initialize with existing image URLs (first is primary, rest are media)
  const initialImages = product?.images?.map((i) => i.url) ?? [];
  const [primaryImage, setPrimaryImage] = useState<string>(initialImages[0] ?? "");
  const [mediaImages, setMediaImages] = useState<string[]>(initialImages.slice(1));

  // ── Auto-slug from name (only when creating) ─────────────────────────────
  function handleNameChange(value: string) {
    setName(value);
    if (!isEdit) {
      setSlug(slugify(value));
    }
  }

  // ── Tag management ────────────────────────────────────────────────────────
  function addTag() {
    const t = tagInput.trim().toLowerCase();
    if (t && !tags.includes(t)) {
      setTags([...tags, t]);
    }
    setTagInput("");
  }

  function removeTag(tag: string) {
    setTags(tags.filter((t) => t !== tag));
  }

  // ── Image upload ──────────────────────────────────────────────────────────
  async function handlePrimaryImageUpload(file?: File) {
    if (!file) return;
    const localPreview = URL.createObjectURL(file);
    // Optimistic preview
    setPrimaryImage(localPreview);
    try {
      const { fileUrl } = await upload(file, "products");
      setPrimaryImage(fileUrl);
      toast.success("Primary image uploaded");
    } catch (error) {
      URL.revokeObjectURL(localPreview);
      setPrimaryImage(primaryImage === localPreview ? "" : primaryImage);
      toast.error(error instanceof Error ? error.message : "Upload failed");
    }
  }

  async function handleMediaUpload(files?: FileList | null) {
    if (!files || files.length === 0) return;
    
    const newFiles = Array.from(files);
    const newPreviews = newFiles.map(file => URL.createObjectURL(file));
    
    // Add temporary previews immediately
    setMediaImages(prev => [...prev, ...newPreviews]);
    
    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i];
      try {
        const { fileUrl } = await upload(file, "products");
        // Replace preview with actual URL
        setMediaImages(prev => prev.map(p => p === newPreviews[i] ? fileUrl : p));
        toast.success(`Media image ${i + 1} uploaded`);
      } catch (error) {
        URL.revokeObjectURL(newPreviews[i]);
        setMediaImages(prev => prev.filter(p => p !== newPreviews[i]));
        toast.error(error instanceof Error ? error.message : "Upload failed");
      }
    }
  }

  function removeMediaImage(index: number) {
    setMediaImages(prev => prev.filter((_, i) => i !== index));
  }

  // ── Submit ────────────────────────────────────────────────────────────────
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Combine primary image and media images
    let finalImages: string[] | undefined = undefined;
    if (primaryImage || mediaImages.length > 0) {
      finalImages = [];
      if (primaryImage) finalImages.push(primaryImage);
      if (mediaImages.length > 0) finalImages.push(...mediaImages);
    }

    const payload = {
      name,
      slug,
      description: description || undefined,
      price,
      comparePrice: comparePrice || undefined,
      stock: Number(stock),
      sku: sku || undefined,
      tags: tags.length > 0 ? tags : undefined,
      isFeatured,
      isBestSeller,
      isNewArrival,
      isActive,
      images: finalImages,
    };

    startTransition(async () => {
      const result = product?.id
        ? await updateProduct(product.id, payload)
        : await createProduct(payload);

      if (result.success) {
        toast.success(result.message);
        router.push("/admin/products");
        router.refresh();
        return;
      }

      toast.error(result.message);
    });
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <form onSubmit={submit} className="grid gap-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">
            {isEdit ? "Edit Product" : "Add Product"}
          </h1>
          <p className="text-sm text-muted-foreground">
            All fields match the current products schema.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/products")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending || uploading}>
            {isPending ? "Saving…" : "Save Product"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        {/* Left column */}
        <div className="grid gap-6">
          {/* Basic info */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Info</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <Field label="Name" required>
                <Input
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  required
                />
              </Field>

              <Field label="Slug" required>
                <Input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                  placeholder="auto-generated from name"
                />
              </Field>

              <Field label="SKU">
                <Input
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  placeholder="e.g. PE-KURTA-001"
                />
              </Field>

              <Field label="Stock">
                <Input
                  type="number"
                  min="0"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </Field>

              <Field label="Description" className="md:col-span-2">
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-28"
                />
              </Field>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <Field label="Price (₹)" required>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  placeholder="e.g. 1299"
                />
              </Field>

              <Field label="Compare Price (₹)">
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={comparePrice}
                  onChange={(e) => setComparePrice(e.target.value)}
                  placeholder="MRP / strike-through price"
                />
              </Field>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <div className="flex gap-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="e.g. kurta, cotton, summer"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                />
                <Button type="button" variant="outline" onClick={addTag}>
                  <Plus />
                  Add
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-slate-400 hover:text-slate-700"
                      >
                        <X className="size-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Primary Image */}
          <Card>
            <CardHeader>
              <CardTitle>Primary Image</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-[6rem_1fr_auto] md:items-center">
              <div className="size-24 overflow-hidden rounded-md border bg-muted">
                {primaryImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={primaryImage}
                    alt="Primary product cover"
                    className="size-full object-cover"
                  />
                ) : null}
              </div>
              <span className="min-w-0 truncate rounded-md border border-input px-3 py-2 text-sm text-muted-foreground">
                {primaryImage || "No primary image uploaded"}
              </span>
              <label className="inline-flex h-9 cursor-pointer items-center justify-center gap-1 rounded-md border border-border bg-background px-2.5 text-sm font-medium shadow-xs transition hover:bg-muted">
                <Plus />
                {uploading ? "Uploading…" : "Upload"}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => handlePrimaryImageUpload(e.target.files?.[0])}
                />
              </label>
            </CardContent>
          </Card>

          {/* Additional Media */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Media</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {/* Media Previews */}
              {mediaImages.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {mediaImages.map((mediaUrl, idx) => (
                    <div key={idx} className="relative size-24 overflow-hidden rounded-md border bg-muted">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={mediaUrl}
                        alt={`Media ${idx + 1}`}
                        className="size-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeMediaImage(idx)}
                        className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-black/50 text-white hover:bg-red-500"
                        title="Remove image"
                      >
                        <X className="size-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex items-center gap-4">
                <label className="inline-flex h-9 cursor-pointer items-center justify-center gap-1 rounded-md border border-border bg-background px-4 text-sm font-medium shadow-xs transition hover:bg-muted">
                  <Plus className="size-4" />
                  {uploading ? "Uploading…" : "Add Media"}
                  <input
                    type="file"
                    hidden
                    multiple
                    accept="image/*"
                    onChange={(e) => handleMediaUpload(e.target.files)}
                  />
                </label>
                <span className="text-sm text-muted-foreground">
                  Upload additional gallery images for this product.
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column — toggles */}
        <div className="grid content-start gap-6">
          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle>Visibility</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <Toggle
                id="isActive"
                checked={isActive}
                onChange={setIsActive}
                label="Active (visible in store)"
              />
            </CardContent>
          </Card>

          {/* Badges */}
          <Card>
            <CardHeader>
              <CardTitle>Badges</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <Toggle
                id="isFeatured"
                checked={isFeatured}
                onChange={setIsFeatured}
                label="Featured"
              />
              <Toggle
                id="isBestSeller"
                checked={isBestSeller}
                onChange={setIsBestSeller}
                label="Best Seller"
              />
              <Toggle
                id="isNewArrival"
                checked={isNewArrival}
                onChange={setIsNewArrival}
                label="New Arrival"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Field({
  label,
  className,
  children,
  required,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div className={className}>
      <Label className="mb-2 block">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </Label>
      {children}
    </div>
  );
}

function Toggle({
  id,
  checked,
  onChange,
  label,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center gap-3">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-gray-300 accent-violet-600"
      />
      <span className="text-sm">{label}</span>
    </label>
  );
}
