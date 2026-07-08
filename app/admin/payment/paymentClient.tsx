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
import PaymentTable, { type PaymentRow } from "./paymentTable";

// Matches paymentStatusEnum in schema
const paymentStatusOptions = [
  { value: "pending", label: "Pending" },
  { value: "paid", label: "Paid" },
  { value: "failed", label: "Failed" },
  { value: "refunded", label: "Refunded" },
];

type PaymentClientProps = {
  rows: PaymentRow[];
  total: number;
  currentPage: number;
  pageSize: number;
  paymentStatus: string;
};

export default function PaymentClient({
  rows,
  total,
  currentPage,
  pageSize,
  paymentStatus,
}: PaymentClientProps) {
  const [isPending, startTransition] = useTransition();
  const updateQuery = useUpdateQuery();
  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText, 800);
  const selectedStatus = paymentStatus || undefined;

  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("search") ?? "";

  useEffect(() => {
    if (debouncedSearch !== currentSearch) {
      startTransition(() => updateQuery("search", debouncedSearch));
    }
  }, [debouncedSearch, currentSearch, updateQuery]);

  return (
    <div className="w-full p-1">
      <Card>
        <CardHeader>
          <CardTitle>Payments</CardTitle>
          <CardDescription>
            Payment records from orders — filtered from the orders table.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="w-full max-w-xl">
              <InputGroup className="flex items-center rounded-full bg-white py-2 shadow-none">
                <InputGroupAddon>
                  <Search className="text-gray-500" />
                </InputGroupAddon>
                <InputGroupInput
                  onChange={(event) => setSearchText(event.target.value)}
                  value={searchText}
                  type="text"
                  placeholder="Search by order #, email, or gateway ID"
                  className="w-full bg-transparent transition-all duration-200 focus:outline-none"
                />
              </InputGroup>
            </div>
            <Select
              placeholder="Payment status"
              label="Payment Status"
              selectItems={paymentStatusOptions}
              value={selectedStatus}
              onValueChange={(value) =>
                startTransition(() =>
                  updateQuery("payment_status", value === "__all__" ? "" : value),
                )
              }
            />
          </div>

          <div className="relative overflow-x-auto">
            {isPending ? (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-[1px]">
                <Loader2 className="size-6 animate-spin text-primary" />
              </div>
            ) : null}
            <PaymentTable page={currentPage} rows={rows} pageSize={pageSize} />
          </div>
          <ProductPagination currentPage={currentPage} totalPages={total} />
        </CardContent>
      </Card>
    </div>
  );
}
