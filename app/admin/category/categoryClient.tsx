"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Loader2, Plus, Search } from "lucide-react";
import ProductPagination from "@/components/pagination";
import { Select } from "@/components/select";
import { useDebounce } from "@/components/debouceSearch";
import { useUpdateQuery } from "@/components/filter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { getCategories } from "@/helper/category/action";
import CategoryTable, { type CategoryRow } from "./categoryTable";

type CategoryClientProps = {
  categories: CategoryRow[];
  total: number;
  currentPage: number;
};

type CategoryOption = {
  id: string;
  name: string;
  slug: string;
};

export default function CategoryClient({
  categories,
  total,
  currentPage,
}: CategoryClientProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const updateQuery = useUpdateQuery();
  const [isPending, startTransition] = useTransition();
  const [searchText, setSearchText] = useState("");
  const [categoryOptions, setCategoryOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const debouncedSearch = useDebounce(searchText, 800);
  const selectedCategory = searchParams.get("category") ?? undefined;

  const currentSearch = searchParams.get("search") ?? "";

  useEffect(() => {
    if (debouncedSearch !== currentSearch) {
      startTransition(() => updateQuery("search", debouncedSearch));
    }
  }, [debouncedSearch, currentSearch, updateQuery]);

  useEffect(() => {
    getCategories().then((data: CategoryOption[]) => {
      setCategoryOptions(
        data.map((category) => ({
          value: category.slug,
          label: category.name,
        })),
      );
    });
  }, []);

  return (
    <div className="w-full p-1 max-w-7xl mx-auto">
      <Card className="border border-slate-200/80 shadow-xs rounded-xl overflow-hidden bg-white">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-bold text-slate-900">Category Management</CardTitle>
            <CardDescription className="text-slate-500 mt-1">Manage product category hierarchy and relationships</CardDescription>
          </div>
          <Button 
            asChild
            className="h-10 px-5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium shadow-sm transition-all active:scale-[0.98] shrink-0 flex items-center gap-1.5"
          >
            <Link href={`${pathname}/add`}>
              <Plus className="size-4" />
              Add Category
            </Link>
          </Button>
        </CardHeader>

        <CardContent className="p-4">
          {/* Filters Row */}
          <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-end">
            <div className="relative flex-1">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Search Categories</span>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input
                  type="text"
                  onChange={(event) => setSearchText(event.target.value)}
                  value={searchText}
                  placeholder="Search by category name..."
                  className="h-10 w-full pl-10 pr-4 rounded-lg border border-slate-200 bg-white text-sm outline-hidden focus:border-violet-600 focus:ring-3 focus:ring-violet-600/15 transition-all placeholder:text-slate-400 text-slate-800"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 shrink-0">
              <Select
                placeholder="Select Category"
                label="Category Filter"
                selectItems={categoryOptions}
                value={selectedCategory}
                onValueChange={(value) => startTransition(() => updateQuery("category", value === "__all__" ? "" : value))}
              />
            </div>
          </div>

          <div className="relative border border-slate-100 rounded-xl overflow-hidden">
            {isPending ? (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-[1px]">
                <Loader2 className="size-6 animate-spin text-violet-600" />
              </div>
            ) : null}
            <CategoryTable page={currentPage} categories={categories} />
          </div>

          <div className="mt-5">
            <ProductPagination currentPage={currentPage} totalPages={total} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
