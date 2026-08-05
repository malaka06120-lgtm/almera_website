"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  LogOut,
  Store,
  Menu,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { logout } from "@/lib/actions/auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlmeraLogo } from "@/components/shared/almera-logo";

const LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
];

function AdminNavContent({
  adminEmail,
  onNavigate,
}: {
  adminEmail: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col justify-between px-5 py-8 text-white">
      <div>
        <Link href="/admin" className="block px-2" onClick={onNavigate}>
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
                onClick={onNavigate}
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
          onClick={onNavigate}
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
    </div>
  );
}

export function AdminSidebar({ adminEmail }: { adminEmail: string }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="bg-almera-black flex items-center justify-between px-4 py-3 md:hidden">
        <Link href="/admin" className="block">
          <AlmeraLogo tone="light" />
        </Link>
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 hover:text-white"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="bg-almera-black w-3/4 max-w-xs border-white/10 p-0 sm:max-w-xs"
          >
            <SheetHeader className="sr-only">
              <SheetTitle>Admin Navigation</SheetTitle>
            </SheetHeader>
            <AdminNavContent
              adminEmail={adminEmail}
              onNavigate={() => setMobileOpen(false)}
            />
          </SheetContent>
        </Sheet>
      </div>

      <aside className="bg-almera-black hidden shrink-0 md:flex md:w-56 lg:w-64">
        <AdminNavContent adminEmail={adminEmail} />
      </aside>
    </>
  );
}
