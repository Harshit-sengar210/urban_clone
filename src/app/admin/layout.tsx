import { AdminLayout } from "@/components/admin/AdminLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Console | UrbanClone",
  description: "Operations dashboard for UrbanClone",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
