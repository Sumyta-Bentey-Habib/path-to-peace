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
  Database
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { layoutStyles as styles } from "./layout.style";

const sidebarItems = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Data Sanctuary", href: "/admin/data", icon: Database },
  { name: "Duas", href: "/admin/duas", icon: Heart },
  { name: "Quran Surahs", href: "/admin/quran", icon: BookOpen },
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
            <Link href="/" className="flex items-center space-x-3">
              <span className={styles.sidebarLogo}>Path to Peace</span>
            </Link>
            <button 
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          <nav className={styles.sidebarNav}>
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
                    isActive && "text-secondary-container"
                  )} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className={styles.sidebarFooter}>
            <Link
              href="/login"
              className={styles.logoutBtn}
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </Link>
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
          
          <div className={styles.userProfile}>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-primary">Admin User</p>
              <p className="text-xs text-on-surface-variant">System Administrator</p>
            </div>
            <div className={styles.userBadge}>
              <span className="text-primary font-bold">A</span>
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
