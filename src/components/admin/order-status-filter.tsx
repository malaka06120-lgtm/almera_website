"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ORDER_STATUS_FLOW, ORDER_STATUS_LABELS } from "@/lib/constants";

const ALL = "all";

export function OrderStatusFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const status = searchParams.get("status") ?? ALL;

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === ALL) {
      params.delete("status");
    } else {
      params.set("status", value);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <Select value={status} onValueChange={handleChange}>
      <SelectTrigger size="sm" className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL}>All Statuses</SelectItem>
        {ORDER_STATUS_FLOW.map((s) => (
          <SelectItem key={s} value={s}>
            {ORDER_STATUS_LABELS[s]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
