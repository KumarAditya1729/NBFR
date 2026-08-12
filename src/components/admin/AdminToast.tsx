"use client";

import { Toaster, toast } from "react-hot-toast";

export function AdminToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 3500,
        style: {
          borderRadius: "12px",
          background: "#1e293b",
          color: "#f1f5f9",
          fontSize: "14px",
          fontWeight: 500,
          padding: "12px 16px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
        },
        success: {
          iconTheme: { primary: "#6366f1", secondary: "#fff" },
        },
        error: {
          iconTheme: { primary: "#ef4444", secondary: "#fff" },
        },
      }}
    />
  );
}

// Re-export toast so client components can import from here
export { toast };
