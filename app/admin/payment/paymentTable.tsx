"use client";

import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/**
 * PaymentRow shape — payments are stored on the orders table directly.
 * `payment.paymentAmount` is the order total (numeric string from DB).
 * `payment.paymentOrderId` is the orderNumber (human-readable order #).
 */
export type PaymentRow = {
  payment: {
    id: string;
    createdAt: Date;
    paymentAmount: string;        // orders.total (numeric string)
    paymentMethod: string | null; // orders.paymentMethod
    paymentStatus: string;        // orders.paymentStatus
    paymentId: string | null;     // orders.paymentId (gateway txn id)
    paymentOrderId: string | null;// orders.orderNumber
  };
  order: {
    id: string;
  };
  user: {
    name: string | null;
    email: string | null;
  } | null;
};

type PaymentTableProps = {
  page: number;
  rows: PaymentRow[];
  pageSize: number;
};

function formatCurrency(amount: string | null | undefined) {
  if (!amount) return "—";
  return `₹${Number(amount).toLocaleString("en-IN")}`;
}

function formatDate(date: string | Date | null | undefined) {
  if (!date) return "—";
  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function PaymentTable({ page, rows, pageSize }: PaymentTableProps) {
  const startIndex = (page - 1) * pageSize;
  const router = useRouter();

  return (
    <div className="mt-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S.No</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Order #</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Gateway Txn ID</TableHead>
            <TableHead className="text-end">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length ? (
            rows.map((row, index) => (
              <TableRow key={row.payment.id}>
                <TableCell>{startIndex + index + 1}</TableCell>
                <TableCell className="whitespace-nowrap">
                  {formatDate(row.payment.createdAt)}
                </TableCell>
                <TableCell>{row.user?.name ?? "—"}</TableCell>
                <TableCell
                  className="max-w-52 truncate"
                  title={row.user?.email ?? ""}
                >
                  {row.user?.email ?? "—"}
                </TableCell>
                <TableCell
                  className="max-w-32 truncate font-mono text-xs"
                  title={row.payment.paymentOrderId ?? ""}
                >
                  {row.payment.paymentOrderId ?? "—"}
                </TableCell>
                <TableCell>{formatCurrency(row.payment.paymentAmount)}</TableCell>
                <TableCell className="capitalize">
                  {row.payment.paymentMethod ?? "—"}
                </TableCell>
                <TableCell className="capitalize">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      row.payment.paymentStatus === "paid"
                        ? "bg-emerald-100 text-emerald-700"
                        : row.payment.paymentStatus === "failed"
                          ? "bg-red-100 text-red-700"
                          : row.payment.paymentStatus === "refunded"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {row.payment.paymentStatus}
                  </span>
                </TableCell>
                <TableCell
                  className="max-w-36 truncate font-mono text-xs"
                  title={row.payment.paymentId ?? ""}
                >
                  {row.payment.paymentId ?? "—"}
                </TableCell>
                <TableCell className="text-right">
                  <button
                    type="button"
                    onClick={() => router.push(`/admin/orders/${row.order.id}`)}
                    className="inline-flex items-center justify-center rounded-md p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                    aria-label="View order"
                  >
                    <Eye className="size-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={10} className="h-24 text-center text-gray-600">
                No payment records found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
