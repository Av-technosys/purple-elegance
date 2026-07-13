"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Plus, Search } from "lucide-react";
import ProductPagination from "@/components/pagination";
import { Select } from "@/components/select";
import { useDebounce } from "@/components/debouceSearch";
import { useUpdateQuery } from "@/components/filter";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCategories } from "@/helper/category/action";
import ProductTable, { type ProductRow } from "./productTable";

type CategoryOption = {
  id: string;
  name: string;
  slug: string;
};

type ProductClientProps = {
  products: ProductRow[];
  total: number;
  currentPage: number;
};

// Status filter maps to isActive boolean in DB
const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export default function ProductClient({
  products,
  total,
  currentPage,
}: ProductClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const updateQuery = useUpdateQuery();
  const [isPending, startTransition] = useTransition();
  const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);
  const debouncedSearch = useDebounce(searchText, 800);
  const selectedCategory = searchParams.get("category") ?? undefined;
  const selectedStatus = searchParams.get("status") ?? undefined;

  const currentSearch = searchParams.get("search") ?? "";

  useEffect(() => {
    if (debouncedSearch !== currentSearch) {
      startTransition(() => updateQuery("search", debouncedSearch));
    }
  }, [debouncedSearch, currentSearch, updateQuery]);

  useEffect(() => {
    getCategories().then((data: CategoryOption[]) => {
      setCategories(data.map((c) => ({ value: c.slug, label: c.name })));
    });
  }, []);

  return (
    <div className="w-full p-1 max-w-7xl mx-auto">
      <Card className="border border-slate-200/80 shadow-xs rounded-xl overflow-hidden bg-white">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-bold text-slate-900">Product Management</CardTitle>
            <CardDescription className="text-slate-500 mt-1">Manage, filter, and modify your store products</CardDescription>
          </div>
          <Button 
            onClick={() => router.push("/admin/products/add")}
            className="h-10 px-5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium shadow-sm transition-all active:scale-[0.98] shrink-0 flex items-center gap-1.5"
          >
            <Plus className="size-4" />
            Add Product
          </Button>
        </CardHeader>

        <CardContent className="p-4">
          {/* Filters Row */}
          <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-end">
            <div className="relative flex-1">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Search Products</span>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input
                  type="text"
                  onChange={(event) => setSearchText(event.target.value)}
                  value={searchText}
                  placeholder="Search by product name or SKU..."
                  className="h-10 w-full pl-10 pr-4 rounded-lg border border-slate-200 bg-white text-sm outline-hidden focus:border-violet-600 focus:ring-3 focus:ring-violet-600/15 transition-all placeholder:text-slate-400 text-slate-800"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 shrink-0">
              <Select
                placeholder="Select Category"
                label="Category"
                selectItems={categories}
                value={selectedCategory}
                onValueChange={(value) =>
                  startTransition(() =>
                    updateQuery("category", value === "__all__" ? "" : value),
                  )
                }
              />
              <Select
                placeholder="Select Status"
                label="Status"
                selectItems={statusOptions}
                value={selectedStatus}
                onValueChange={(value) =>
                  startTransition(() =>
                    updateQuery("status", value === "__all__" ? "" : value),
                  )
                }
              />
            </div>
          </div>

          <div className="relative border border-slate-100 rounded-xl overflow-hidden">
            {isPending ? (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-[1px]">
                <Loader2 className="size-6 animate-spin text-violet-600" />
              </div>
            ) : null}
            <ProductTable products={products} />
          </div>

          <div className="mt-5">
            <ProductPagination currentPage={currentPage} totalPages={total} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
