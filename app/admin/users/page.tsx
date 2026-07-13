import { db } from "@/server/db"
import { users } from "@/server/modules/user/user.schema"
import { desc } from "drizzle-orm"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default async function Page() {
  const allUsers = await db
    .select({
      id: users.id,
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
      phone: users.phone,
      role: users.role,
      isActive: users.isActive,
      createdAt: users.createdAt,
    })
    .from(users)
    .orderBy(desc(users.createdAt))

  return (
    <div className="w-full p-1 max-w-7xl mx-auto">
      <Card className="border border-slate-200/80 shadow-xs rounded-xl overflow-hidden bg-white">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-bold text-slate-900">User Management</CardTitle>
            <CardDescription className="text-slate-500 mt-1">Review all registered accounts, roles, and status flags</CardDescription>
          </div>
          <span className="inline-flex items-center rounded-full bg-violet-50 text-violet-700 border border-violet-100 px-3 py-1 text-xs font-semibold shrink-0">
            Total Users: {allUsers.length}
          </span>
        </CardHeader>

        <CardContent className="p-4">
          {allUsers.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200/80 p-8 text-center text-sm text-slate-400 font-medium">
              No registered users found in database.
            </div>
          ) : (
            <div className="border border-slate-100 rounded-xl overflow-hidden">
              <Table>
                <TableHeader className="bg-slate-50/75 border-b border-slate-100">
                  <TableRow>
                    <TableHead className="px-4 py-2.5 font-semibold text-slate-700 text-xs uppercase tracking-wider">Name</TableHead>
                    <TableHead className="px-4 py-2.5 font-semibold text-slate-700 text-xs uppercase tracking-wider">Email</TableHead>
                    <TableHead className="px-4 py-2.5 font-semibold text-slate-700 text-xs uppercase tracking-wider">Phone</TableHead>
                    <TableHead className="px-4 py-2.5 font-semibold text-slate-700 text-xs uppercase tracking-wider">Role</TableHead>
                    <TableHead className="px-4 py-2.5 font-semibold text-slate-700 text-xs uppercase tracking-wider">Status</TableHead>
                    <TableHead className="px-4 py-2.5 font-semibold text-slate-700 text-xs uppercase tracking-wider">Joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allUsers.map((u) => {
                    const isRoleAdmin = u.role?.toLowerCase() === "admin";
                    return (
                      <TableRow key={u.id} className="hover:bg-slate-50/50 transition-colors border-b border-slate-100 last:border-none">
                        <TableCell className="px-4 py-2.5 font-semibold text-slate-800 text-sm">
                          {u.firstName} {u.lastName}
                        </TableCell>
                        <TableCell className="px-4 py-2.5 text-slate-600 text-sm">{u.email}</TableCell>
                        <TableCell className="px-4 py-2.5 font-mono text-xs text-slate-500">{u.phone ?? "—"}</TableCell>
                        <TableCell className="px-4 py-2.5">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border ${
                              isRoleAdmin
                                ? "bg-violet-50 text-violet-700 border-violet-100"
                                : "bg-slate-50 text-slate-600 border-slate-200"
                            }`}
                          >
                            {u.role}
                          </span>
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border ${
                              u.isActive
                                ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                                : "bg-red-50 text-red-700 border-red-100"
                            }`}
                          >
                            {u.isActive ? "Active" : "Inactive"}
                          </span>
                        </TableCell>
                        <TableCell className="px-6 py-4 text-slate-500 text-sm whitespace-nowrap">
                          {u.createdAt ? new Date(u.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }) : "—"}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
