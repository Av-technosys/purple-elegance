"use client";

import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <Table>
      <TableHeader className="bg-slate-50/75 border-b border-slate-100">
        <TableRow>
          <TableHead className="px-4 py-2.5 font-semibold text-slate-700 text-xs uppercase tracking-wider">S.No</TableHead>
          <TableHead className="px-4 py-2.5 font-semibold text-slate-700 text-xs uppercase tracking-wider">Date</TableHead>
          <TableHead className="px-4 py-2.5 font-semibold text-slate-700 text-xs uppercase tracking-wider">Customer</TableHead>
          <TableHead className="px-4 py-2.5 font-semibold text-slate-700 text-xs uppercase tracking-wider">Email</TableHead>
          <TableHead className="px-4 py-2.5 font-semibold text-slate-700 text-xs uppercase tracking-wider">Order #</TableHead>
          <TableHead className="px-4 py-2.5 font-semibold text-slate-700 text-xs uppercase tracking-wider">Amount</TableHead>
          <TableHead className="px-4 py-2.5 font-semibold text-slate-700 text-xs uppercase tracking-wider">Method</TableHead>
          <TableHead className="px-4 py-2.5 font-semibold text-slate-700 text-xs uppercase tracking-wider">Status</TableHead>
          <TableHead className="px-4 py-2.5 font-semibold text-slate-700 text-xs uppercase tracking-wider">Gateway Txn ID</TableHead>
          <TableHead className="px-4 py-2.5 font-semibold text-slate-700 text-xs uppercase tracking-wider text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.length ? (
          rows.map((row, index) => {
            const pStatus = row.payment.paymentStatus.toLowerCase();
            return (
              <TableRow key={row.payment.id} className="hover:bg-slate-50/50 transition-colors border-b border-slate-100 last:border-none">
                <TableCell className="px-4 py-2.5 text-slate-500 font-medium">{startIndex + index + 1}</TableCell>
                <TableCell className="px-4 py-2.5 text-slate-600 text-sm whitespace-nowrap">
                  {formatDate(row.payment.createdAt)}
                </TableCell>
                <TableCell className="px-4 py-2.5 font-semibold text-slate-800">{row.user?.name ?? "—"}</TableCell>
                <TableCell
                  className="px-4 py-2.5 max-w-52 truncate text-slate-600"
                  title={row.user?.email ?? ""}
                >
                  {row.user?.email ?? "—"}
                </TableCell>
                <TableCell
                  className="px-4 py-2.5 max-w-32 truncate font-mono text-xs font-semibold text-slate-700"
                  title={row.payment.paymentOrderId ?? ""}
                >
                  {row.payment.paymentOrderId ?? "—"}
                </TableCell>
                <TableCell className="px-4 py-2.5 font-bold text-slate-900">{formatCurrency(row.payment.paymentAmount)}</TableCell>
                <TableCell className="px-4 py-2.5 capitalize text-slate-600 font-medium">
                  {row.payment.paymentMethod ?? "—"}
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
                            : "bg-yellow-50 text-yellow-700 border-yellow-100"
                    }`}
                  >
                    {row.payment.paymentStatus}
                  </span>
                </TableCell>
                <TableCell
                  className="px-4 py-2.5 max-w-36 truncate font-mono text-xs text-slate-500"
                  title={row.payment.paymentId ?? ""}
                >
                  {row.payment.paymentId ?? "—"}
                </TableCell>
                <TableCell className="px-4 py-2.5 text-right">
                  <Button
                    variant="outline"
                    onClick={() => router.push(`/admin/orders/${row.order.id}`)}
                    className="size-8 p-0 rounded-lg border-slate-200 text-slate-500 hover:text-violet-600 hover:bg-violet-50 hover:border-violet-200 transition-all flex items-center justify-center shrink-0 ml-auto"
                    title="View order"
                  >
                    <Eye className="size-3.5" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={10} className="h-32 text-center text-slate-400 font-medium">
              No payment records found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
