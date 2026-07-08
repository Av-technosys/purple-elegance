"use client";

import { useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Eye } from "lucide-react";
import { Select } from "@/components/select";
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
    <div className="mt-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S.No</TableHead>
            <TableHead>Order #</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Address</TableHead>
            <TableHead className="text-end">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderRows.length ? (
            orderRows.map((order, index) => (
              <TableRow key={order.id} className={isPending ? "opacity-60" : ""}>
                <TableCell>{startIndex + index + 1}</TableCell>
                <TableCell className="font-mono text-xs">{order.orderNumber}</TableCell>
                <TableCell>
                  {order.userFirstName || order.userLastName
                    ? `${order.userFirstName ?? ""} ${order.userLastName ?? ""}`.trim()
                    : order.userEmail ?? "—"}
                </TableCell>
                <TableCell>
                  <div className="min-w-36">
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
                <TableCell className="capitalize">{order.paymentStatus}</TableCell>
                <TableCell>{formatCurrency(order.total)}</TableCell>
                <TableCell className="max-w-40 truncate">
                  {order.addressLine1 ?? "—"}
                  {order.addressLine2 ? `, ${order.addressLine2}` : ""}
                </TableCell>
                <TableCell className="text-right">
                  <button
                    type="button"
                    onClick={() => router.push(`${pathname}/${order.id}`)}
                    className="inline-flex items-center justify-center rounded-md p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                    aria-label="View details"
                  >
                    <Eye className="size-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center text-gray-600">
                No orders found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
