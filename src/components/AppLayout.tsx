"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  LayoutDashboard,
  BookOpen,
  HelpCircle,
  MessageSquare,
  TrendingUp,
  User,
  LogOut,
  Menu,
  X,
  Sparkles,
  Zap,
} from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Learn Plan", href: "/plan", icon: BookOpen },
    { name: "Practice", href: "/practice", icon: HelpCircle },
    { name: "AI Tutor", href: "/tutor", icon: MessageSquare },
    { name: "Progress", href: "/progress", icon: TrendingUp },
    { name: "Learning Profile", href: "/profile", icon: User },
  ];

  return (
    <div className="min-h-screen bg-transparent flex text-cyan-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-[#050b18]/95 backdrop-blur-2xl border-r border-cyan-500/15 fixed inset-y-0 z-30 shadow-2xl shadow-black/80">
        {/* Brand */}
        <div className="h-16 flex items-center px-6 border-b border-cyan-500/15 gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-sky-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div>
            <span className="font-bold text-lg text-white tracking-tight flex items-center gap-1.5">
              SkillSync{" "}
              <span className="text-[10px] bg-cyan-500/15 text-cyan-400 font-semibold px-2 py-0.5 rounded-full border border-cyan-500/30">
                AI
              </span>
            </span>
          </div>
        </div>

        {/* Adaptive Loop Indicator */}
        <div className="px-4 py-3 m-3 rounded-2xl bg-gradient-to-b from-cyan-950/40 via-blue-950/20 to-black/40 border border-cyan-500/25 shadow-inner">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Adaptive Loop Active</span>
          </div>
          <p className="text-[11px] text-cyan-200/70 leading-tight">
            Personalized to your assessment & recent quiz mistakes.
          </p>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 space-y-1.5 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30 font-semibold scale-[1.02]"
                    : "text-slate-300 hover:text-white hover:bg-cyan-500/10 hover:border-cyan-500/20"
                }`}
              >
                <item.icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? "text-white" : "text-cyan-400/80 group-hover:text-cyan-300"
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="p-3 border-t border-cyan-500/15">
          <div className="flex items-center justify-between p-2 rounded-xl bg-[#0a1226]/80 border border-cyan-500/20 shadow-inner">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-700 to-blue-600 text-white flex items-center justify-center font-bold text-xs uppercase flex-shrink-0 shadow-sm shadow-cyan-500/30">
                {session?.user?.name ? session.user.name.charAt(0) : "S"}
              </div>
              <div className="truncate">
                <p className="text-xs font-semibold text-slate-100 truncate">
                  {session?.user?.name || "Student"}
                </p>
                <p className="text-[10px] text-cyan-300/60 truncate">
                  {session?.user?.email || "student@skillsync.ai"}
                </p>
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              title="Sign out"
              className="p-1.5 text-cyan-300/70 hover:text-rose-400 hover:bg-rose-500/15 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Top Navigation */}
      <div className="lg:hidden fixed top-0 inset-x-0 h-16 bg-[#050b18]/95 backdrop-blur-xl border-b border-cyan-500/15 z-40 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-sm shadow-cyan-500/30">
            <Zap className="w-4 h-4 fill-current" />
          </div>
          <span className="font-bold text-white tracking-tight">SkillSync AI</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-cyan-300 hover:bg-cyan-500/15 rounded-lg transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black/70 backdrop-blur-md pt-16">
          <div className="bg-[#091124] p-4 space-y-1.5 border-b border-cyan-500/20 shadow-2xl">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold"
                      : "text-slate-300 hover:bg-cyan-500/10"
                  }`}
                >
                  <item.icon className="w-4 h-4 text-cyan-400" />
                  {item.name}
                </Link>
              );
            })}
            <div className="pt-3 border-t border-cyan-500/15 mt-2 flex justify-between items-center px-2">
              <span className="text-xs text-cyan-300">{session?.user?.name || "Student"}</span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-xs text-rose-400 font-semibold"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 lg:pl-64 pt-16 lg:pt-0 min-h-screen">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
