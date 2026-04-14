"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  BookOpen, 
  Heart, 
  Clock, 
  FileText,
  LogOut,
  Menu,
  X,
  Database
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Data Sanctuary", href: "/admin/data", icon: Database },
  { name: "Duas", href: "/admin/duas", icon: Heart },
  { name: "Blog Posts", href: "/admin/blog", icon: FileText },
  { name: "Quran Surahs", href: "/admin/quran", icon: BookOpen },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Mobile Backdrop */}
      {!isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-on-surface/20 backdrop-blur-sm lg:hidden" 
          onClick={() => setIsSidebarOpen(true)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-primary text-on-primary transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
          !isSidebarOpen && "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col p-6">
          <div className="flex items-center justify-between mb-10">
            <Link href="/" className="flex items-center space-x-3">
              <span className="text-2xl font-serif font-bold tracking-tight">Path to Peace</span>
            </Link>
            <button 
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 space-y-1">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group text-on-primary/70 hover:text-on-primary hover:bg-primary-container",
                    isActive && "bg-primary-container text-on-primary shadow-lg ring-1 ring-white/10"
                  )}
                >
                  <Icon size={20} className={cn(
                    "transition-transform group-hover:scale-110",
                    isActive && "text-secondary-container"
                  )} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 pt-8 border-t border-white/10">
            <Link
              href="/login"
              className="flex items-center space-x-3 px-4 py-3 rounded-xl text-on-primary/70 hover:text-on-primary hover:bg-destructive/10 transition-colors"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-20 bg-surface flex items-center justify-between px-8 border-b border-outline-variant/30">
          <button 
            className="lg:hidden p-2 hover:bg-surface-container rounded-lg"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} className="text-primary" />
          </button>
          
          <div className="flex items-center space-x-4 ml-auto">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-primary">Admin User</p>
              <p className="text-xs text-on-surface-variant">System Administrator</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center border-2 border-primary/10">
              <span className="text-primary font-bold">A</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
