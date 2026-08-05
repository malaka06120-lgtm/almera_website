import type { Metadata } from "next";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdminSearch } from "@/components/admin/admin-search";
import { OrderStatusFilter } from "@/components/admin/order-status-filter";
import { OrderStatusSelect } from "@/components/admin/order-status-select";
import { OrderDetailsDialog } from "@/components/admin/order-details-dialog";
import { getAdminOrders } from "@/lib/data/admin";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = { title: "Manage Orders" };

interface AdminOrdersPageProps {
  searchParams: Promise<{ search?: string; status?: string }>;
}

export default async function AdminOrdersPage({
  searchParams,
}: AdminOrdersPageProps) {
  const { search, status } = await searchParams;
  const orders = await getAdminOrders({ search, status });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-3xl">Orders</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          {orders.length} order{orders.length !== 1 && "s"}
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <AdminSearch placeholder="Search by order #, name, or phone..." />
        <OrderStatusFilter />
      </div>

      <div className="shadow-luxury-sm overflow-x-auto rounded-2xl border border-border/70 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.order_number}</TableCell>
                <TableCell>
                  <div>{order.full_name}</div>
                  <div className="text-muted-foreground text-xs">{order.phone}</div>
                </TableCell>
                <TableCell>
                  {order.city}, {order.delivery_area}
                </TableCell>
                <TableCell>
                  {new Date(order.created_at).toLocaleDateString("en-GB")}
                </TableCell>
                <TableCell>
                  <OrderStatusSelect orderId={order.id} status={order.status} />
                </TableCell>
                <TableCell className="text-right">{formatPrice(order.total)}</TableCell>
                <TableCell className="text-right">
                  <OrderDetailsDialog order={order} />
                </TableCell>
              </TableRow>
            ))}
            {orders.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-muted-foreground py-10 text-center">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
