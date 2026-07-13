"use client";

import * as React from "react";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateOrderStatus } from "@/lib/actions/order-status";
import { ORDER_STATUS_FLOW, ORDER_STATUS_LABELS } from "@/lib/constants";
import type { OrderStatus } from "@/types";

export function OrderStatusSelect({
  orderId,
  status,
}: {
  orderId: string;
  status: OrderStatus;
}) {
  const [isPending, startTransition] = React.useTransition();
  const [value, setValue] = React.useState(status);

  function handleChange(next: string) {
    const previous = value;
    setValue(next as OrderStatus);
    startTransition(async () => {
      const result = await updateOrderStatus(orderId, next as OrderStatus);
      if (result.success) {
        toast.success(`Order marked as ${ORDER_STATUS_LABELS[next]}`);
      } else {
        setValue(previous);
        toast.error(result.error);
      }
    });
  }

  return (
    <Select value={value} onValueChange={handleChange} disabled={isPending}>
      <SelectTrigger size="sm" className="w-[160px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {ORDER_STATUS_FLOW.map((s) => (
          <SelectItem key={s} value={s}>
            {ORDER_STATUS_LABELS[s]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
