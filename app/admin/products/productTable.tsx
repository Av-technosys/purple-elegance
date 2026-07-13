"use client";

import Image from "next/image";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Edit, Loader2, Trash2 } from "lucide-react";
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
import { deleteProduct } from "@/helper/product/action";

/**
 * ProductRow matches the shape returned by productRepository.findPaginated()
 * which is based on the actual products + productImages schema.
 */
export type ProductRow = {
  id: string;
  name: string;
  sku: string | null;
  price: string;              // numeric string from DB (e.g. "1299.00")
  comparePrice: string | null;// nullable compare/strike price
  stock: number;
  isFeatured: boolean;
  isActive: boolean;
  image?: string | null;
  createdAt: Date;
};

function formatPrice(value: string | null | undefined) {
  if (!value) return "—";
  return `₹${Number(value).toLocaleString("en-IN")}`;
}

export default function ProductTable({ products }: { products: ProductRow[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleDelete(id: string) {
    startTransition(async () => {
      const result = await deleteProduct(id);

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
          <TableHead className="px-4 py-2.5 font-semibold text-slate-700 text-xs uppercase tracking-wider">Product</TableHead>
          <TableHead className="px-4 py-2.5 font-semibold text-slate-700 text-xs uppercase tracking-wider">SKU</TableHead>
          <TableHead className="px-4 py-2.5 font-semibold text-slate-700 text-xs uppercase tracking-wider">Price</TableHead>
          <TableHead className="px-4 py-2.5 font-semibold text-slate-700 text-xs uppercase tracking-wider">Compare Price</TableHead>
          <TableHead className="px-4 py-2.5 font-semibold text-slate-700 text-xs uppercase tracking-wider">Stock</TableHead>
          <TableHead className="px-4 py-2.5 font-semibold text-slate-700 text-xs uppercase tracking-wider">Status</TableHead>
          <TableHead className="px-4 py-2.5 font-semibold text-slate-700 text-xs uppercase tracking-wider">Featured</TableHead>
          <TableHead className="px-4 py-2.5 font-semibold text-slate-700 text-xs uppercase tracking-wider text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.length ? (
          products.map((product) => (
            <TableRow key={product.id} className="hover:bg-slate-50/50 transition-colors border-b border-slate-100 last:border-none">
              <TableCell className="px-4 py-2.5">
                <div className="flex items-center gap-3">
                  <div className="relative size-9 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xs">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="36px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="size-full bg-slate-50 flex items-center justify-center text-[10px] text-slate-400 font-bold uppercase">
                        {product.name.slice(0, 2)}
                      </div>
                    )}
                  </div>
                  <span className="font-semibold text-slate-800 text-sm hover:text-violet-600 transition-colors cursor-pointer" onClick={() => router.push(`/admin/products/${product.id}`)}>
                    {product.name}
                  </span>
                </div>
              </TableCell>
              <TableCell className="px-4 py-2.5 font-mono text-xs text-slate-500">
                {product.sku ?? "—"}
              </TableCell>
              <TableCell className="px-4 py-2.5 font-semibold text-slate-800">
                {formatPrice(product.price)}
              </TableCell>
              <TableCell className="px-4 py-2.5 text-slate-400 line-through text-xs">
                {formatPrice(product.comparePrice)}
              </TableCell>
              <TableCell className="px-4 py-2.5 text-slate-600 font-medium">
                {product.stock}
              </TableCell>
              <TableCell className="px-4 py-2.5">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border ${
                    product.isActive
                      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                      : "bg-slate-50 text-slate-500 border-slate-200"
                  }`}
                >
                  {product.isActive ? "Active" : "Inactive"}
                </span>
              </TableCell>
              <TableCell className="px-4 py-2.5">
                {product.isFeatured ? (
                  <span className="inline-flex items-center rounded-full bg-violet-50 text-violet-700 border border-violet-100 px-2.5 py-0.5 text-xs font-semibold">
                    Featured
                  </span>
                ) : (
                  <span className="text-slate-400 text-xs">No</span>
                )}
              </TableCell>
              <TableCell className="px-4 py-2.5 text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => router.push(`/admin/products/${product.id}`)}
                    className="size-8 p-0 rounded-lg border-slate-200 text-slate-500 hover:text-violet-600 hover:bg-violet-50 hover:border-violet-200 transition-all flex items-center justify-center shrink-0"
                    title="Edit Product"
                  >
                    <Edit className="size-3.5" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        disabled={isPending}
                        className="size-8 p-0 rounded-lg border-slate-200 text-slate-500 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-all flex items-center justify-center shrink-0"
                        title="Delete Product"
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="rounded-xl">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-base font-bold text-slate-900">Delete product permanently?</AlertDialogTitle>
                        <AlertDialogDescription className="text-sm text-slate-500 mt-1">
                          This removes the product and its images from the database. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="mt-4">
                        <AlertDialogCancel disabled={isPending} className="rounded-lg">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          disabled={isPending}
                          onClick={() => handleDelete(product.id)}
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
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={8} className="h-32 text-center text-slate-400 font-medium">
              No products found matching filters.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
