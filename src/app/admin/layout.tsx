// src/app/admin/layout.tsx
import AdminNavbar from "@/components/admin/navbar/navbar";
import SessionWrapper from "@/lib/session-wrapper";
import { Toaster } from "react-hot-toast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionWrapper>
        <Toaster position="top-center" />
        <div>
            <AdminNavbar />
            <main>{children}</main>
        </div>
    </SessionWrapper>
  );
}
