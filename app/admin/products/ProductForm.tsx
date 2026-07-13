"use client";

import { FormEvent, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, Trash2, X, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createProduct, updateProduct } from "@/helper/product/action";
import { useFileUpload } from "@/helper/upload/client";
import { cn } from "@/lib/utils";

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
    const finalImages: string[] = [];
    if (primaryImage) finalImages.push(primaryImage);
    if (mediaImages.length > 0) finalImages.push(...mediaImages);

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/60">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {isEdit ? "Edit Product" : "Add Product"}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Complete the form fields below to manage the product details.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/products")}
            className="h-10 px-4 rounded-lg border-slate-200 hover:bg-slate-50 text-slate-700 font-medium transition-all"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isPending || uploading}
            className="h-10 px-5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium shadow-sm transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
          >
            {isPending ? "Saving…" : "Save Product"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
        {/* Left column */}
        <div className="grid gap-6">
          {/* Basic info */}
          <Card className="border border-slate-200/80 shadow-xs rounded-xl overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-6 py-4">
              <CardTitle className="text-base font-semibold text-slate-900">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="p-6 grid gap-5 md:grid-cols-2">
              <Field label="Name" required>
                <Input
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  required
                  className="h-10 rounded-lg border-slate-200 focus-visible:border-violet-600 focus-visible:ring-violet-600/15 transition-all placeholder:text-slate-400"
                  placeholder="e.g. Traditional Cotton Kurta"
                />
              </Field>

              <Field label="Slug" required>
                <Input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                  className="h-10 rounded-lg border-slate-200 focus-visible:border-violet-600 focus-visible:ring-violet-600/15 transition-all placeholder:text-slate-400"
                  placeholder="auto-generated-from-name"
                />
              </Field>

              <Field label="SKU">
                <Input
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  className="h-10 rounded-lg border-slate-200 focus-visible:border-violet-600 focus-visible:ring-violet-600/15 transition-all placeholder:text-slate-400"
                  placeholder="e.g. PE-KURTA-001"
                />
              </Field>

              <Field label="Stock">
                <Input
                  type="number"
                  min="0"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="h-10 rounded-lg border-slate-200 focus-visible:border-violet-600 focus-visible:ring-violet-600/15 transition-all"
                />
              </Field>

              <Field label="Description" className="md:col-span-2">
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-32 rounded-lg border-slate-200 focus-visible:border-violet-600 focus-visible:ring-violet-600/15 transition-all placeholder:text-slate-400 resize-y"
                  placeholder="Describe the product details, fit, material, and care instructions..."
                />
              </Field>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card className="border border-slate-200/80 shadow-xs rounded-xl overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-6 py-4">
              <CardTitle className="text-base font-semibold text-slate-900">Pricing</CardTitle>
            </CardHeader>
            <CardContent className="p-6 grid gap-5 md:grid-cols-2">
              <Field label="Price" required>
                <div className="relative flex h-10 w-full min-w-0 items-stretch rounded-lg border border-slate-200 bg-background shadow-xs focus-within:border-violet-600 focus-within:ring-3 focus-within:ring-violet-600/15 transition-all">
                  <div className="flex items-center justify-center border-r border-slate-200 bg-slate-50/80 px-3 text-slate-500 font-medium text-sm select-none rounded-l-lg shrink-0">
                    ₹
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-slate-400 text-slate-900"
                    placeholder="e.g. 1299.00"
                  />
                </div>
              </Field>

              <Field label="Compare Price">
                <div className="relative flex h-10 w-full min-w-0 items-stretch rounded-lg border border-slate-200 bg-background shadow-xs focus-within:border-violet-600 focus-within:ring-3 focus-within:ring-violet-600/15 transition-all">
                  <div className="flex items-center justify-center border-r border-slate-200 bg-slate-50/80 px-3 text-slate-500 font-medium text-sm select-none rounded-l-lg shrink-0">
                    ₹
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={comparePrice}
                    onChange={(e) => setComparePrice(e.target.value)}
                    className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-slate-400 text-slate-900"
                    placeholder="MRP / strike-through price"
                  />
                </div>
              </Field>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="border border-slate-200/80 shadow-xs rounded-xl overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-6 py-4">
              <CardTitle className="text-base font-semibold text-slate-900">Tags</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex gap-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="e.g. kurta, cotton, summer"
                  className="h-10 rounded-lg border-slate-200 focus-visible:border-violet-600 focus-visible:ring-violet-600/15 transition-all"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={addTag}
                  className="h-10 px-4 rounded-lg border-slate-200 hover:bg-slate-50 flex items-center gap-1.5 transition-all text-slate-700 font-medium shrink-0"
                >
                  <Plus className="size-4" />
                  Add
                </Button>
              </div>
              {tags.length > 0 ? (
                <div className="flex flex-wrap gap-2 pt-1">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 rounded-full bg-violet-50/60 border border-violet-100 px-3 py-1 text-sm font-medium text-violet-700 transition-colors hover:bg-violet-100/50"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-violet-400 hover:text-violet-700 transition-colors rounded-full focus:outline-hidden"
                      >
                        <X className="size-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400">No tags added yet. Enter a tag name and click Add or press Enter.</p>
              )}
            </CardContent>
          </Card>

          {/* Primary Image */}
          <Card className="border border-slate-200/80 shadow-xs rounded-xl overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-6 py-4">
              <CardTitle className="text-base font-semibold text-slate-900">Primary Cover Image</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {primaryImage ? (
                <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/30">
                  <div className="relative size-24 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xs">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={primaryImage}
                      alt="Primary product cover"
                      className="size-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setPrimaryImage("")}
                      className="absolute right-1 top-1 flex size-6 items-center justify-center rounded-full bg-black/60 text-white hover:bg-red-500 transition-colors shadow-xs"
                      title="Remove image"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <p className="text-sm font-semibold text-slate-800 truncate">
                      {primaryImage.split("/").pop() || "Primary Cover Image"}
                    </p>
                    <p className="text-xs text-emerald-600 font-medium">Cover image selected successfully</p>
                  </div>
                  <label className="inline-flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-xs transition hover:bg-slate-50 active:scale-[0.98]">
                    <Plus className="size-4" />
                    Change Cover
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) => handlePrimaryImageUpload(e.target.files?.[0])}
                    />
                  </label>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200/80 rounded-xl p-8 cursor-pointer hover:border-violet-500 hover:bg-violet-50/10 transition-all bg-slate-50/40 group">
                  <UploadCloud className="w-10 h-10 text-slate-400 mb-2 group-hover:text-violet-500 transition-colors" />
                  <span className="text-sm font-semibold text-slate-700 group-hover:text-violet-600 transition-colors">
                    {uploading ? "Uploading cover image..." : "Upload Primary Cover Image"}
                  </span>
                  <span className="text-xs text-slate-400 mt-1">PNG, JPG or WEBP up to 5MB</span>
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => handlePrimaryImageUpload(e.target.files?.[0])}
                  />
                </label>
              )}
            </CardContent>
          </Card>

          {/* Additional Media */}
          <Card className="border border-slate-200/80 shadow-xs rounded-xl overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-6 py-4">
              <CardTitle className="text-base font-semibold text-slate-900">Additional Gallery Media</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Media Previews */}
              {mediaImages.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                  {mediaImages.map((mediaUrl, idx) => (
                    <div key={idx} className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-xs transition hover:shadow-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={mediaUrl}
                        alt={`Media ${idx + 1}`}
                        className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <button
                        type="button"
                        onClick={() => removeMediaImage(idx)}
                        className="absolute right-2 top-2 flex size-6 items-center justify-center rounded-full bg-black/60 text-white hover:bg-red-500 transition-all opacity-0 group-hover:opacity-100 shadow-xs"
                        title="Remove image"
                      >
                        <X className="size-3.5" />
                      </button>
                      <div className="absolute bottom-2 left-2 rounded-md bg-black/55 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-xs">
                        #{idx + 1}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200/80 rounded-xl p-8 cursor-pointer hover:border-violet-500 hover:bg-violet-50/10 transition-all bg-slate-50/40 group">
                <Plus className="w-8 h-8 text-slate-400 mb-2 group-hover:text-violet-500 transition-colors" />
                <span className="text-sm font-semibold text-slate-700 group-hover:text-violet-600 transition-colors">
                  {uploading ? "Uploading media files..." : "Add Gallery Images"}
                </span>
                <span className="text-xs text-slate-400 mt-1">Select one or multiple images for details gallery</span>
                <input
                  type="file"
                  hidden
                  multiple
                  accept="image/*"
                  onChange={(e) => handleMediaUpload(e.target.files)}
                />
              </label>
            </CardContent>
          </Card>
        </div>

        {/* Right column — toggles */}
        <div className="grid content-start gap-6">
          {/* Status */}
          <Card className="border border-slate-200/80 shadow-xs rounded-xl overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-6 py-4">
              <CardTitle className="text-base font-semibold text-slate-900">Visibility Status</CardTitle>
            </CardHeader>
            <CardContent className="p-4 grid gap-3">
              <Toggle
                id="isActive"
                checked={isActive}
                onChange={setIsActive}
                label="Active Status"
                description="Show this product publicly in store catalog."
              />
            </CardContent>
          </Card>

          {/* Badges */}
          <Card className="border border-slate-200/80 shadow-xs rounded-xl overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-6 py-4">
              <CardTitle className="text-base font-semibold text-slate-900">Product Badges</CardTitle>
            </CardHeader>
            <CardContent className="p-4 grid gap-4">
              <Toggle
                id="isFeatured"
                checked={isFeatured}
                onChange={setIsFeatured}
                label="Featured Product"
                description="Highlight on home page featured collection."
              />
              <Toggle
                id="isBestSeller"
                checked={isBestSeller}
                onChange={setIsBestSeller}
                label="Best Seller"
                description="Display a best-seller badge to increase sales."
              />
              <Toggle
                id="isNewArrival"
                checked={isNewArrival}
                onChange={setIsNewArrival}
                label="New Arrival"
                description="Show new badge for freshly stocked products."
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
  description,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-5 items-center">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 accent-violet-600 focus:ring-violet-600 focus:ring-offset-0 cursor-pointer"
        />
      </div>
      <label htmlFor={id} className="cursor-pointer select-none">
        <span className="block text-sm font-semibold text-slate-800">{label}</span>
        {description && (
          <span className="block text-xs text-slate-400 mt-0.5">{description}</span>
        )}
      </label>
    </div>
  );
}
