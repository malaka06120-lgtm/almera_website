"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  LogOut,
  Store,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { logout } from "@/lib/actions/auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AlmeraLogo } from "@/components/shared/almera-logo";

const LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
];

export function AdminSidebar({ adminEmail }: { adminEmail: string }) {
  const pathname = usePathname();

  return (
    <aside className="bg-almera-black flex w-64 shrink-0 flex-col justify-between px-5 py-8 text-white">
      <div>
        <Link href="/admin" className="block px-2">
          <AlmeraLogo tone="light" />
        </Link>
        <p className="text-almera-gold px-2 pt-2 text-[11px] tracking-luxury uppercase">
          Admin Dashboard
        </p>

        <nav className="mt-10 flex flex-col gap-1">
          {LINKS.map((link) => {
            const isActive =
              link.href === "/admin"
                ? pathname === "/admin"
                : pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                  isActive
                    ? "bg-white/10 text-almera-gold"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                )}
              >
                <link.icon className="size-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-3">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-white/60 hover:bg-white/5 hover:text-white"
        >
          <Store className="size-4" /> View Store
        </Link>
        <div className="border-t border-white/10 px-3 pt-4">
          <div className="flex items-center gap-2.5">
            <Avatar className="size-7 shrink-0">
              <AvatarFallback className="bg-almera-gold text-almera-black text-xs font-medium">
                A
              </AvatarFallback>
            </Avatar>
            <p className="truncate text-xs text-white/40">{adminEmail}</p>
          </div>
          <form action={logout}>
            <button className="mt-2 flex items-center gap-2 text-sm text-white/60 hover:text-white">
              <LogOut className="size-4" /> Log Out
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
