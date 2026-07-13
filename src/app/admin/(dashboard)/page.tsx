import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, Package, Receipt, Wallet } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/admin/stat-card";
import { getDashboardStats } from "@/lib/data/admin";
import { ORDER_STATUS_LABELS } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = { title: "Admin Dashboard" };

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-heading text-3xl">Dashboard</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          An overview of Almera&apos;s store performance.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Revenue" value={formatPrice(stats.totalRevenue)} icon={Wallet} />
        <StatCard label="Total Orders" value={stats.totalOrders} icon={Receipt} />
        <StatCard label="Pending Orders" value={stats.pendingOrders} icon={AlertTriangle} />
        <StatCard label="Products" value={stats.totalProducts} icon={Package} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="shadow-luxury-sm rounded-2xl border border-border/70 bg-white p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-lg">Recent Orders</h2>
            <Link href="/admin/orders" className="text-muted-foreground text-xs hover:underline">
              View all
            </Link>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stats.recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <Link href="/admin/orders" className="hover:underline">
                      {order.order_number}
                    </Link>
                  </TableCell>
                  <TableCell>{order.full_name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {ORDER_STATUS_LABELS[order.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {formatPrice(order.total)}
                  </TableCell>
                </TableRow>
              ))}
              {stats.recentOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-muted-foreground text-center">
                    No orders yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="shadow-luxury-sm rounded-2xl border border-border/70 bg-white p-6">
          <h2 className="font-heading mb-4 text-lg">Low Stock</h2>
          <ul className="flex flex-col gap-3">
            {stats.lowStockVariants.map((variant) => {
              const product = Array.isArray(variant.product)
                ? variant.product[0]
                : variant.product;
              return (
                <li key={variant.id} className="flex items-center justify-between text-sm">
                  <span>
                    {product?.name} ({variant.size_ml}ml)
                  </span>
                  <Badge variant={variant.stock_quantity === 0 ? "destructive" : "outline"}>
                    {variant.stock_quantity} left
                  </Badge>
                </li>
              );
            })}
            {stats.lowStockVariants.length === 0 && (
              <p className="text-muted-foreground text-sm">
                All products are well stocked.
              </p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
