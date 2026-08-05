import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Pencil, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdminSearch } from "@/components/admin/admin-search";
import { DeleteProductButton } from "@/components/admin/delete-product-button";
import { getAdminProducts } from "@/lib/data/admin";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = { title: "Manage Products" };

interface AdminProductsPageProps {
  searchParams: Promise<{ search?: string }>;
}

export default async function AdminProductsPage({
  searchParams,
}: AdminProductsPageProps) {
  const { search } = await searchParams;
  const products = await getAdminProducts(search);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl">Products</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {products.length} product{products.length !== 1 && "s"}
          </p>
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/admin/products/new">
            <Plus className="size-4" /> Add Product
          </Link>
        </Button>
      </div>

      <AdminSearch placeholder="Search products..." />

      <div className="shadow-luxury-sm overflow-x-auto rounded-2xl border border-border/70 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => {
              const totalStock = (product.variants ?? []).reduce(
                (sum, v) => sum + v.stock_quantity,
                0
              );
              const prices = (product.variants ?? []).map((v) => v.price);
              const minPrice = prices.length ? Math.min(...prices) : 0;

              return (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="bg-muted relative size-12 shrink-0 overflow-hidden">
                        {product.images?.[0] && (
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <div className="mt-1 flex flex-wrap items-center gap-1.5">
                          {product.is_featured && (
                            <Badge className="text-[10px]">Featured</Badge>
                          )}
                          {product.is_best_seller && (
                            <Badge variant="gold" className="text-[10px]">
                              Best Seller
                            </Badge>
                          )}
                          {product.is_original && (
                            <Badge variant="gold-outline" className="text-[10px]">
                              Original
                            </Badge>
                          )}
                          {product.is_tester && (
                            <span className="text-almera-gold text-[10px] font-medium tracking-wider uppercase">
                              Tester
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{product.category?.name ?? "—"}</TableCell>
                  <TableCell>{formatPrice(minPrice)}</TableCell>
                  <TableCell>
                    <span className={totalStock === 0 ? "text-destructive" : ""}>
                      {totalStock}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={product.is_active ? "secondary" : "outline"}>
                      {product.is_active ? "Active" : "Hidden"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/admin/products/${product.id}`}>
                          <Pencil className="size-4" />
                        </Link>
                      </Button>
                      <DeleteProductButton
                        productId={product.id}
                        productName={product.name}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
            {products.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-muted-foreground py-10 text-center">
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
