"use client";

import { useEffect, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, Search } from "lucide-react";
import ProductPagination from "@/components/pagination";
import { Select } from "@/components/select";
import { useDebounce } from "@/components/debouceSearch";
import { useUpdateQuery } from "@/components/filter";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import OrderTable, { type OrderRow } from "./orderTable";

type OrderClientProps = {
  order: OrderRow[];
  total: number;
  currentPage: number;
  pageSize: number;
  status: string;
};

// Matches the orderStatusEnum in the schema
const orderStatusOptions = [
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
  { value: "refunded", label: "Refunded" },
];

export default function OrderClient({
  order,
  total,
  currentPage,
  pageSize,
  status,
}: OrderClientProps) {
  const [isPending, startTransition] = useTransition();
  const updateQuery = useUpdateQuery();
  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText, 800);
  const selectedOrderStatus = status || undefined;

  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("search") ?? "";

  useEffect(() => {
    if (debouncedSearch !== currentSearch) {
      startTransition(() => updateQuery("search", debouncedSearch));
    }
  }, [debouncedSearch, currentSearch, updateQuery]);

  return (
    <div className="w-full p-1 max-w-7xl mx-auto">
      <Card className="border border-slate-200/80 shadow-xs rounded-xl overflow-hidden bg-white">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-6 py-5">
          <CardTitle className="text-xl font-bold text-slate-900">Order Management</CardTitle>
          <CardDescription className="text-slate-500 mt-1">Review, track, and manage all customer order records and fulfillment statuses</CardDescription>
        </CardHeader>

        <CardContent className="p-4">
          {/* Filters Row */}
          <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-end">
            <div className="relative flex-1">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Search Orders</span>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input
                  type="text"
                  onChange={(event) => setSearchText(event.target.value)}
                  value={searchText}
                  placeholder="Search by order number or ID..."
                  className="h-10 w-full pl-10 pr-4 rounded-lg border border-slate-200 bg-white text-sm outline-hidden focus:border-violet-600 focus:ring-3 focus:ring-violet-600/15 transition-all placeholder:text-slate-400 text-slate-800"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 shrink-0">
              <Select
                placeholder="Filter by status"
                label="Order Status"
                selectItems={orderStatusOptions}
                value={selectedOrderStatus}
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
            <OrderTable page={currentPage} orders={order} pageSize={pageSize} />
          </div>

          <div className="mt-5">
            <ProductPagination currentPage={currentPage} totalPages={total} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
