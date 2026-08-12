import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import {
  BookOpen, Target, Activity, Lightbulb, Newspaper, Users,
  Clock, ScanText, ArrowRight, TrendingUp
} from "lucide-react";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

async function getStats() {
  const [publications, focusAreas, impactStats, insights, mediaMentions, memberships, timelineEvents] =
    await Promise.all([
      prisma.publication.count(),
      prisma.focusArea.count(),
      prisma.impactStat.count(),
      prisma.insight.count(),
      prisma.mediaMention.count(),
      prisma.membershipProgram.count(),
      prisma.timelineEvent.count(),
    ]);
  return { publications, focusAreas, impactStats, insights, mediaMentions, memberships, timelineEvents };
}

const sections = [
  { href: "/admin/publications", label: "Publications", icon: BookOpen, color: "indigo", stat: "publications" },
  { href: "/admin/focus-areas", label: "Focus Areas", icon: Target, color: "sky", stat: "focusAreas" },
  { href: "/admin/impact", label: "Impact Stats", icon: Activity, color: "emerald", stat: "impactStats" },
  { href: "/admin/insights", label: "Insights", icon: Lightbulb, color: "amber", stat: "insights" },
  { href: "/admin/media", label: "Media Mentions", icon: Newspaper, color: "rose", stat: "mediaMentions" },
  { href: "/admin/memberships", label: "Memberships", icon: Users, color: "violet", stat: "memberships" },
  { href: "/admin/timeline", label: "Timeline Events", icon: Clock, color: "teal", stat: "timelineEvents" },
];

const colorMap: Record<string, string> = {
  indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
  sky: "bg-sky-50 text-sky-600 border-sky-100",
  emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
  amber: "bg-amber-50 text-amber-600 border-amber-100",
  rose: "bg-rose-50 text-rose-600 border-rose-100",
  violet: "bg-violet-50 text-violet-600 border-violet-100",
  teal: "bg-teal-50 text-teal-600 border-teal-100",
};

export default async function AdminDashboard() {
  const stats = await getStats();

  const totalItems = Object.values(stats).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h2>
          <p className="mt-1.5 text-gray-500">
            Welcome back. You have{" "}
            <span className="text-indigo-600 font-semibold">{totalItems} total items</span> across all sections.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
          <TrendingUp className="w-4 h-4" />
          Live Database
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sections.map(({ href, label, icon: Icon, color, stat }) => {
          const count = stats[stat as keyof typeof stats];
          return (
            <Link
              key={href}
              href={href}
              className="group bg-white border border-gray-200 rounded-2xl p-5 flex flex-col gap-4 hover:shadow-md hover:border-gray-300 transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-xl border ${colorMap[color]}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{count}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">{label}</span>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-0.5 transition-all" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/admin/ocr"
            className="group flex items-center gap-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-2xl p-6 hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 shadow-lg shadow-indigo-200"
          >
            <div className="p-3 bg-white/20 rounded-xl">
              <ScanText className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-lg">Scan a Document</p>
              <p className="text-indigo-200 text-sm mt-0.5">Extract text from images using OCR</p>
            </div>
            <ArrowRight className="w-5 h-5 opacity-70 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/admin/publications"
            className="group flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md hover:border-gray-300 transition-all duration-200"
          >
            <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-lg text-gray-900">Add Publication</p>
              <p className="text-gray-500 text-sm mt-0.5">Upload a new research paper or article</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>
    </div>
  );
}
