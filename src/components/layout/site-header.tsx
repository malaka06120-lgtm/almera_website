"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, ShoppingBag } from "lucide-react";

import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/components/layout/nav-links";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SearchBar } from "@/components/layout/search-bar";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { CartSheet } from "@/components/layout/cart-sheet";
import { AlmeraLogo } from "@/components/shared/almera-logo";

export function SiteHeader() {
  const pathname = usePathname();
  const cartHydrated = useCartStore((s) => s.hasHydrated);
  const totalItems = useCartStore((s) => s.totalItems());
  const wishlistHydrated = useWishlistStore((s) => s.hasHydrated);
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const setCartOpen = useCartStore((s) => s.setOpen);

  const isHome = pathname === "/";
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isTransparent = isHome && !scrolled;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-500",
        isTransparent
          ? "bg-transparent"
          : "glass border-b border-border/60 shadow-luxury-sm"
      )}
    >
      <div className="bg-almera-black text-center text-[10px] tracking-luxury text-white/90 uppercase py-2">
        Cash on Delivery across Egypt &middot; Free shipping over EGP {3000}
      </div>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <MobileNav />
          <Link href="/" className="flex items-center">
            <AlmeraLogo />
          </Link>
        </div>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative text-sm tracking-wide transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "bg-almera-gold absolute -bottom-1.5 left-0 h-px w-0 transition-all duration-300 ease-out group-hover:w-full",
                    isActive && "w-full"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <SearchBar />
          <ThemeToggle />
          <Button variant="ghost" size="icon" aria-label="Wishlist" asChild>
            <Link href="/wishlist" className="relative">
              <Heart className="size-4.5" />
              {wishlistHydrated && wishlistCount > 0 && (
                <span className="bg-almera-gold text-almera-black absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full text-[10px] font-medium">
                  {wishlistCount}
                </span>
              )}
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open cart"
            className="relative"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingBag className="size-4.5" />
            {cartHydrated && totalItems > 0 && (
              <span className="bg-almera-gold text-almera-black absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full text-[10px] font-medium">
                {totalItems}
              </span>
            )}
          </Button>
          <CartSheet />
        </div>
      </div>
    </header>
  );
}
