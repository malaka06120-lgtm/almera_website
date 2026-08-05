"use client";

import * as React from "react";
import { Eye } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import type { Order } from "@/types";

export function OrderDetailsDialog({ order }: { order: Order }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant="ghost" size="icon" onClick={() => setOpen(true)} aria-label="View order">
        <Eye className="size-4" />
      </Button>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Order #{order.order_number}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 text-sm">
          <div>
            <p className="text-muted-foreground text-xs uppercase">Customer</p>
            <p>{order.full_name}</p>
            <p>{order.phone}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs uppercase">Delivery Address</p>
            <p>{order.address}</p>
            <p>{order.city}, {order.delivery_area}</p>
          </div>
          {order.notes && (
            <div>
              <p className="text-muted-foreground text-xs uppercase">Notes</p>
              <p>{order.notes}</p>
            </div>
          )}

          <Separator />

          <div>
            <p className="text-muted-foreground mb-2 text-xs uppercase">Items</p>
            <ul className="flex flex-col gap-2">
              {order.items?.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>
                    {item.product_name} ({item.size_ml}ml) &times; {item.quantity}
                  </span>
                  <span>{formatPrice(item.line_total)}</span>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Delivery Fee ({order.delivery_area})</span>
            <span className="flex items-center gap-2">
              {order.delivery_fee === 0 && <Badge variant="gold">Free Shipping</Badge>}
              {formatPrice(order.delivery_fee)}
            </span>
          </div>
          <div className="flex justify-between font-heading text-base">
            <span>Total</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
