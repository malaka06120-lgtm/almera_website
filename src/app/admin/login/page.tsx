import type { Metadata } from "next";
import { Suspense } from "react";

import { LoginForm } from "@/components/admin/login-form";
import { AlmeraMonogram } from "@/components/shared/almera-logo";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="bg-almera-black flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <AlmeraMonogram tone="light" className="text-5xl" />
          <h1 className="mt-2 font-heading text-3xl tracking-[0.3em] text-white">
            ALMERA
          </h1>
          <p className="text-almera-gold mt-2 text-xs tracking-luxury uppercase">
            Admin Dashboard
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white p-8 shadow-luxury">
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
