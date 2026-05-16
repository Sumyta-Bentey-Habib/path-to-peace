"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Settings, 
  BookOpen, 
  Heart, 
  FileText,
  LogOut,
  Menu,
  X,
  Database,
  Users,
  ArrowRight
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { layoutStyles as styles } from "./layout.style";
import { authClient } from "@/lib/auth-client";

const sidebarItems = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "All Users", href: "/admin/users", icon: Users },
  { name: "Courses", href: "/admin/courses", icon: BookOpen },
  { name: "Feeling Tool", href: "/admin/feeling-tool", icon: Heart },
  { name: "Duas", href: "/admin/duas", icon: FileText },
  { name: "System Logs", href: "/admin/data", icon: Database },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className={styles.adminLayout}>
      {!isSidebarOpen && (
        <div 
          className={styles.mobileBackdrop} 
          onClick={() => setIsSidebarOpen(true)}
        />
      )}

      <aside 
        className={cn(
          styles.adminSidebar,
          !isSidebarOpen && "-translate-x-full"
        )}
      >
        <div className={styles.sidebarContent}>
          <div className={styles.sidebarHeader}>
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <Heart className="text-white fill-white/20" size={24} />
              </div>
              <span className={styles.sidebarLogo}>Path to Peace</span>
            </Link>
            <button 
              className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          <nav className={styles.sidebarNav}>
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold mb-4 px-4">
              Main Menu
            </div>
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    styles.navItem,
                    isActive && styles.navItemActive
                  )}
                >
                  <Icon size={20} className={cn(
                    "transition-transform group-hover:scale-110",
                    isActive ? "text-primary" : "text-white/70"
                  )} />
                  <span className={cn(
                    "font-medium transition-colors",
                    isActive ? "text-primary" : "group-hover:text-white"
                  )}>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className={styles.sidebarFooter}>
            <Link
              href="/"
              className="flex items-center space-x-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all mb-2 group"
            >
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              <span className="font-medium">Back to Site</span>
            </Link>
            <button
              onClick={async () => {
                await authClient.signOut();
                window.location.href = "/";
              }}
              className={styles.logoutBtn}
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      <main className={styles.adminMain}>
        <header className={styles.adminHeader}>
          <button 
            className={styles.mobileMenuBtn}
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} className="text-primary" />
          </button>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-[10px] font-bold text-primary/50 uppercase tracking-widest">System Status</span>
              <span className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live & Secure
              </span>
            </div>
            <div className={styles.userProfile}>
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-primary">Admin User</p>
                <p className="text-xs text-on-surface-variant">System Administrator</p>
              </div>
              <div className={styles.userBadge}>
                <span className="text-primary font-bold">A</span>
              </div>
            </div>
          </div>
        </header>

        <div className={styles.pageContainer}>
          {children}
        </div>
      </main>
    </div>
  );
}
