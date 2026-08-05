import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: admin } = await supabase
    .from("admins")
    .select("email, full_name")
    .eq("id", user.id)
    .maybeSingle();

  if (!admin) redirect("/admin/login");

  return (
    <div className="bg-almera-blush-soft flex min-h-screen flex-col md:flex-row">
      <AdminSidebar adminEmail={admin.email} />
      <main className="flex-1 overflow-x-hidden px-4 py-8 sm:px-8 lg:px-10">
        {children}
      </main>
    </div>
  );
}
