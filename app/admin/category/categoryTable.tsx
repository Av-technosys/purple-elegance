"use client";

import { useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteCategory } from "@/helper/category/action";

export type CategoryRow = {
  id: string;
  parentId?: string | null;
  parentName?: string | null;
  name: string;
  slug: string;
  description: string | null;
};

type CategoryTableProps = {
  page: number;
  categories: CategoryRow[];
};

const pageSize = 10;
const descriptionPreviewWords = 3;

function getDescriptionPreview(description: string | null) {
  if (!description?.trim()) return "-";

  const words = description.trim().split(/\s+/);

  if (words.length <= descriptionPreviewWords) {
    return description.trim();
  }

  return `${words.slice(0, descriptionPreviewWords).join(" ")}...`;
}

export default function CategoryTable({ page, categories }: CategoryTableProps) {
  const startIndex = (page - 1) * pageSize;
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  function handleDelete(id: string) {
    startTransition(async () => {
      const result = await deleteCategory(id);

      if (result.success) {
        toast.success(result.message);
        router.refresh();
        return;
      }

      toast.error(result.message);
    });
  }

  return (
    <Table>
      <TableHeader className="bg-slate-50/75 border-b border-slate-100">
        <TableRow>
          <TableHead className="px-4 py-2.5 font-semibold text-slate-700 text-xs uppercase tracking-wider">S.No</TableHead>
          <TableHead className="px-4 py-2.5 font-semibold text-slate-700 text-xs uppercase tracking-wider">Category Name</TableHead>
          <TableHead className="px-4 py-2.5 font-semibold text-slate-700 text-xs uppercase tracking-wider">Parent Category</TableHead>
          <TableHead className="px-4 py-2.5 font-semibold text-slate-700 text-xs uppercase tracking-wider">Slug</TableHead>
          <TableHead className="px-4 py-2.5 font-semibold text-slate-700 text-xs uppercase tracking-wider">Description</TableHead>
          <TableHead className="px-4 py-2.5 font-semibold text-slate-700 text-xs uppercase tracking-wider text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category, index) => {
          const hasParent = category.parentId && category.parentId !== category.id;
          return (
            <TableRow key={category.id} className="hover:bg-slate-50/50 transition-colors border-b border-slate-100 last:border-none">
              <TableCell className="px-4 py-2.5 text-slate-500 font-medium">{startIndex + index + 1}</TableCell>
              <TableCell className="px-4 py-2.5 font-semibold text-slate-800">{category.name}</TableCell>
              <TableCell className="px-4 py-2.5">
                {hasParent ? (
                  <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-700 border border-slate-200/60 px-2.5 py-0.5 text-xs font-medium">
                    {category.parentName}
                  </span>
                ) : (
                  <span className="text-slate-400 text-xs">No parent</span>
                )}
              </TableCell>
              <TableCell className="px-4 py-2.5 font-mono text-xs text-slate-500">{category.slug}</TableCell>
              <TableCell className="px-4 py-2.5 text-slate-600 text-sm">{getDescriptionPreview(category.description)}</TableCell>
              <TableCell className="px-4 py-2.5 text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => router.push(`${pathname}/${category.id}`)}
                    className="size-8 p-0 rounded-lg border-slate-200 text-slate-500 hover:text-violet-600 hover:bg-violet-50 hover:border-violet-200 transition-all flex items-center justify-center shrink-0"
                    title="Edit Category"
                  >
                    <Pencil className="size-3.5" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        disabled={isPending}
                        className="size-9 p-0 rounded-lg border-slate-200 text-slate-500 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-all flex items-center justify-center shrink-0"
                        title="Delete Category"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="rounded-xl">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-base font-bold text-slate-900">Delete category permanently?</AlertDialogTitle>
                        <AlertDialogDescription className="text-sm text-slate-500 mt-1">
                          This action will permanently delete this category. Products belonging to this category will not be deleted but will have their category unlinked. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="mt-4">
                        <AlertDialogCancel disabled={isPending} className="rounded-lg">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          disabled={isPending}
                          onClick={() => handleDelete(category.id)}
                          className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-4"
                        >
                          {isPending ? <Loader2 className="size-4 animate-spin text-white" /> : "Delete"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
        {categories.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="h-32 text-center text-slate-400 font-medium">
              No categories found.
            </TableCell>
          </TableRow>
        ) : null}
      </TableBody>
    </Table>
  );
}
