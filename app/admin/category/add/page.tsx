"use client";

import { FormEvent, useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createCategory, getAllCategoriesMeta } from "@/helper/category/action";
import { useFileUpload } from "@/helper/upload/client";
import { ChevronDown, UploadCloud } from "lucide-react";

type CategoryOption = {
  id: string;
  name: string;
};

export default function AddCategoryForm() {
  const router = useRouter();
  const { upload, uploading } = useFileUpload();
  const fileRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [bannerPreview, setBannerPreview] = useState("");

  useEffect(() => {
    getAllCategoriesMeta().then(setCategories);
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    startTransition(async () => {
      // Auto-generate slug from name
      const slug = name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");

      const response = await createCategory({
        name,
        slug,
        parentId: parentId || undefined,
        description: description || undefined,
        imageUrl: imageUrl || undefined,
        isActive: true,
      });

      if (response.success) {
        toast.success(response.message);
        router.push("/admin/category");
        router.refresh();
        return;
      }

      toast.error(response.message);
    });
  }

  async function handleBanner(file?: File) {
    if (!file) return;

    const localPreviewUrl = URL.createObjectURL(file);
    setBannerPreview(localPreviewUrl);

    try {
      const { fileUrl } = await upload(file, "category");
      setImageUrl(fileUrl);
      toast.success("Image uploaded");
    } catch (error) {
      URL.revokeObjectURL(localPreviewUrl);
      setBannerPreview("");
      toast.error(error instanceof Error ? error.message : "Image upload failed");
    }
  }

  return (
    <div className="w-full p-1 max-w-5xl mx-auto">
      <form onSubmit={submit} className="grid gap-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/60">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Add Category
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Create a new category in your store taxonomy.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/category")}
              className="h-10 px-4 rounded-lg border-slate-200 hover:bg-slate-50 text-slate-700 font-medium transition-all"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isPending || uploading}
              className="h-10 px-5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium shadow-sm transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
            >
              {isPending ? "Saving..." : "Add Category"}
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
          {/* Left Column: Form Details */}
          <Card className="border border-slate-200/80 shadow-xs rounded-xl overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-6 py-4">
              <CardTitle className="text-base font-semibold text-slate-900">Category Details</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <Field label="Category Name" required>
                <Input 
                  value={name} 
                  onChange={(event) => setName(event.target.value)} 
                  required 
                  className="h-10 rounded-lg border-slate-200 focus-visible:border-violet-600 focus-visible:ring-violet-600/15 transition-all placeholder:text-slate-400"
                  placeholder="e.g. Menswear"
                />
              </Field>

              <Field label="Parent Category">
                <div className="relative">
                  <select
                    value={parentId}
                    onChange={(event) => setParentId(event.target.value)}
                    className="h-10 w-full rounded-lg border border-slate-200 bg-background pl-3 pr-10 py-2 text-sm shadow-xs outline-hidden focus:border-violet-600 focus:ring-3 focus:ring-violet-600/15 transition-all appearance-none cursor-pointer text-slate-700"
                  >
                    <option value="">No parent (Top-level Category)</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500">
                    <ChevronDown className="size-4" />
                  </div>
                </div>
              </Field>

              <Field label="Description">
                <Textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  className="min-h-36 rounded-lg border-slate-200 focus-visible:border-violet-600 focus-visible:ring-violet-600/15 transition-all placeholder:text-slate-400 resize-y"
                  placeholder="Provide a brief description of the products that belong in this category..."
                />
              </Field>
            </CardContent>
          </Card>

          {/* Right Column: Image Banner */}
          <div className="space-y-6">
            <Card className="border border-slate-200/80 shadow-xs rounded-xl overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-6 py-4">
                <CardTitle className="text-base font-semibold text-slate-900">Category Image</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Field label="Image Banner">
                  {bannerPreview ? (
                    <div className="relative h-48 w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-xs group">
                      <Image 
                        src={bannerPreview} 
                        alt="Category preview" 
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-300 group-hover:scale-102" 
                      />
                      <div className="absolute inset-0 bg-black/45 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={() => fileRef.current?.click()}
                          className="bg-white text-slate-800 font-semibold px-4 py-2 rounded-lg text-xs shadow-xs hover:bg-slate-50 active:scale-95 transition-all"
                        >
                          Replace Image
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="flex flex-col items-center justify-center h-48 w-full border-2 border-dashed border-slate-200/80 hover:border-violet-500 hover:bg-violet-50/10 rounded-xl bg-slate-50/40 cursor-pointer transition-all p-6 group"
                    >
                      <UploadCloud className="w-10 h-10 text-slate-400 mb-2 group-hover:text-violet-500 transition-colors" />
                      <span className="text-sm font-semibold text-slate-700 group-hover:text-violet-600 transition-colors">
                        {uploading ? "Uploading banner image..." : "Upload Category Image"}
                      </span>
                      <span className="text-xs text-slate-400 mt-1">Recommended size: 800 x 400 pixels</span>
                    </button>
                  )}
                  <input
                    ref={fileRef}
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(event) => handleBanner(event.target.files?.[0])}
                  />
                </Field>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  children,
  required,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-sm font-medium text-slate-700">
        {label}
        {required && <span className="ml-1 text-red-500 font-bold">*</span>}
      </Label>
      {children}
    </div>
  );
}
