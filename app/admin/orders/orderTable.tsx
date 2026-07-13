"use client";

import { useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Eye } from "lucide-react";
import { Select } from "@/components/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { updateOrderStatus } from "@/helper/index";

export type OrderRow = {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  total: string;              // numeric string from DB
  createdAt: Date;
  userFirstName: string | null;
  userLastName: string | null;
  userEmail: string | null;
  addressLine1: string | null;
  addressLine2: string | null;
};

type OrderTableProps = {
  page: number;
  orders: OrderRow[];
  pageSize: number;
};

const orderStatusOptions = [
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
  { value: "refunded", label: "Refunded" },
];

function formatCurrency(value: string | null) {
  if (!value) return "—";
  return `₹${Number(value).toLocaleString("en-IN")}`;
}

export default function OrderTable({ page, orders, pageSize }: OrderTableProps) {
  const startIndex = (page - 1) * pageSize;
  const [isPending, startTransition] = useTransition();
  const [orderRows, setOrderRows] = useState(orders);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Table>
      <TableHeader className="bg-slate-50/75 border-b border-slate-100">
        <TableRow>
          <TableHead className="px-4 py-2.5 font-semibold text-slate-700 text-xs uppercase tracking-wider">S.No</TableHead>
          <TableHead className="px-4 py-2.5 font-semibold text-slate-700 text-xs uppercase tracking-wider">Order #</TableHead>
          <TableHead className="px-4 py-2.5 font-semibold text-slate-700 text-xs uppercase tracking-wider">Customer</TableHead>
          <TableHead className="px-4 py-2.5 font-semibold text-slate-700 text-xs uppercase tracking-wider">Status</TableHead>
          <TableHead className="px-4 py-2.5 font-semibold text-slate-700 text-xs uppercase tracking-wider">Payment</TableHead>
          <TableHead className="px-4 py-2.5 font-semibold text-slate-700 text-xs uppercase tracking-wider">Total</TableHead>
          <TableHead className="px-4 py-2.5 font-semibold text-slate-700 text-xs uppercase tracking-wider">Address</TableHead>
          <TableHead className="px-4 py-2.5 font-semibold text-slate-700 text-xs uppercase tracking-wider text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orderRows.length ? (
          orderRows.map((order, index) => {
            const pStatus = order.paymentStatus.toLowerCase();
            return (
              <TableRow key={order.id} className={`hover:bg-slate-50/50 transition-colors border-b border-slate-100 last:border-none ${isPending ? "opacity-60" : ""}`}>
                <TableCell className="px-4 py-2.5 text-slate-500 font-medium">{startIndex + index + 1}</TableCell>
                <TableCell className="px-4 py-2.5 font-mono text-xs font-semibold text-slate-800">{order.orderNumber}</TableCell>
                <TableCell className="px-4 py-2.5">
                  <div className="font-semibold text-slate-800 text-sm">
                    {order.userFirstName || order.userLastName
                      ? `${order.userFirstName ?? ""} ${order.userLastName ?? ""}`.trim()
                      : "—"}
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">{order.userEmail ?? ""}</div>
                </TableCell>
                <TableCell className="px-4 py-2.5">
                  <div className="min-w-[9.5rem] max-w-[10rem]">
                    <Select
                      placeholder="Status"
                      label=""
                      value={order.status}
                      selectItems={orderStatusOptions}
                      onValueChange={(value) => {
                        if (value === "__all__") return;
                        startTransition(async () => {
                          const result = await updateOrderStatus(order.id, value);
                          if (!result.success) return;
                          setOrderRows((currentRows) =>
                            currentRows.map((row) =>
                              row.id === order.id ? { ...row, status: value } : row,
                            ),
                          );
                          router.refresh();
                        });
                      }}
                    />
                  </div>
                </TableCell>
                <TableCell className="px-4 py-2.5">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border ${
                      pStatus === "paid"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                        : pStatus === "failed"
                          ? "bg-red-50 text-red-700 border-red-100"
                          : pStatus === "refunded"
                            ? "bg-orange-50 text-orange-700 border-orange-100"
                            : "bg-amber-50 text-amber-700 border-amber-100"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-2.5 font-bold text-slate-900">
                  {formatCurrency(order.total)}
                </TableCell>
                <TableCell className="px-4 py-2.5 max-w-[12rem] truncate text-slate-600 text-sm">
                  {order.addressLine1 ?? "—"}
                  {order.addressLine2 ? `, ${order.addressLine2}` : ""}
                </TableCell>
                <TableCell className="px-4 py-2.5 text-right">
                  <Button
                    variant="outline"
                    onClick={() => router.push(`${pathname}/${order.id}`)}
                    className="size-8 p-0 rounded-lg border-slate-200 text-slate-500 hover:text-violet-600 hover:bg-violet-50 hover:border-violet-200 transition-all flex items-center justify-center shrink-0"
                    title="View details"
                  >
                    <Eye className="size-3.5" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={8} className="h-32 text-center text-slate-400 font-medium">
              No orders found matching filters.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
