"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText, LayoutDashboard, Settings, Clock, Activity, Target,
  Lightbulb, Newspaper, Users, BookOpen, Database, ScanText,
  ChevronLeft, ChevronRight, ExternalLink, Moon, Sun, CalendarDays
} from "lucide-react";
import { useState, useEffect } from "react";

const navGroups = [
  {
    label: "Overview",
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
      { href: "/admin/settings", label: "Global Settings", icon: Settings },
    ],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/timeline", label: "Timeline Events", icon: Clock },
      { href: "/admin/impact", label: "Impact Stats", icon: Activity },
      { href: "/admin/focus-areas", label: "Focus Areas", icon: Target },
      { href: "/admin/publications", label: "Publications", icon: BookOpen },
      { href: "/admin/insights", label: "Insights", icon: Lightbulb },
      { href: "/admin/media", label: "Media & Press", icon: Newspaper },
      { href: "/admin/memberships", label: "Memberships", icon: Users },
      { href: "/admin/events", label: "Events", icon: CalendarDays },
    ],
  },
  {
    label: "Tools",
    items: [
      { href: "/admin/ocr", label: "Scanner Tool", icon: ScanText },
      { href: "/admin/documents", label: "OCR Database", icon: Database },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("admin-dark");
    if (saved === "true") {
      setDark(true);
      document.documentElement.classList.add("admin-dark");
    }
    const savedCollapsed = localStorage.getItem("admin-collapsed");
    if (savedCollapsed === "true") setCollapsed(true);
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    localStorage.setItem("admin-dark", String(next));
    document.documentElement.classList.toggle("admin-dark", next);
  };

  const toggleCollapse = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem("admin-collapsed", String(next));
  };

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href) && href !== "/admin";
  };

  return (
    <aside
      className={`
        relative flex flex-col h-screen border-r transition-all duration-300 ease-in-out
        ${collapsed ? "w-[70px]" : "w-64"}
        ${dark ? "bg-gray-950 border-gray-800" : "bg-white border-gray-200"}
      `}
    >
      {/* Header */}
      <div className={`h-16 flex items-center border-b ${dark ? "border-gray-800" : "border-gray-200"} px-4 gap-3 shrink-0`}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center shrink-0">
          <span className="text-white font-black text-sm">N</span>
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="font-bold text-sm leading-none bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              NBRF Admin
            </p>
            <p className={`text-xs mt-0.5 ${dark ? "text-gray-500" : "text-gray-400"}`}>Content Manager</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-2">
            {!collapsed && (
              <p className={`px-3 mb-1 text-[10px] font-bold uppercase tracking-widest ${dark ? "text-gray-600" : "text-gray-400"}`}>
                {group.label}
              </p>
            )}
            {group.items.map(({ href, label, icon: Icon, exact }) => {
              const active = isActive(href, exact);
              return (
                <Link
                  key={href}
                  href={href}
                  title={collapsed ? label : undefined}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group relative
                    ${active
                      ? dark
                        ? "bg-indigo-600/20 text-indigo-400"
                        : "bg-indigo-50 text-indigo-700"
                      : dark
                        ? "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }
                  `}
                >
                  {active && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-indigo-600" />
                  )}
                  <Icon className={`w-[18px] h-[18px] shrink-0 ${active ? (dark ? "text-indigo-400" : "text-indigo-600") : ""}`} />
                  {!collapsed && <span className="truncate">{label}</span>}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className={`p-3 border-t ${dark ? "border-gray-800" : "border-gray-200"} space-y-1 shrink-0`}>
        <button
          onClick={toggleDark}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
            dark ? "text-gray-400 hover:bg-gray-800 hover:text-gray-100" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          {dark ? <Sun className="w-[18px] h-[18px] shrink-0" /> : <Moon className="w-[18px] h-[18px] shrink-0" />}
          {!collapsed && <span>{dark ? "Light Mode" : "Dark Mode"}</span>}
        </button>
        <Link
          href="/"
          target="_blank"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
            dark ? "text-gray-400 hover:bg-gray-800 hover:text-gray-100" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          <ExternalLink className="w-[18px] h-[18px] shrink-0" />
          {!collapsed && <span>View Website</span>}
        </Link>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={toggleCollapse}
        className={`absolute -right-3 top-20 w-6 h-6 rounded-full border flex items-center justify-center z-10 transition-colors
          ${dark
            ? "bg-gray-900 border-gray-700 text-gray-400 hover:text-gray-100"
            : "bg-white border-gray-200 text-gray-400 hover:text-gray-700 shadow-sm"
          }`}
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </aside>
  );
}
