import AdminSidebar from "@/components/admin/AdminSidebar";
import { AdminToastProvider } from "@/components/admin/AdminToast";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans antialiased">
      <AdminSidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 lg:p-10">
          {children}
        </div>
      </main>
      <AdminToastProvider />
    </div>
  );
}
