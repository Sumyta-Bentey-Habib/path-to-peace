"use client";

import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, User, LayoutGrid, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const navLinks = [
    { name: "Quran", href: "/quran" },
    { name: "Duas", href: "/duas" },
    { name: "Courses", href: "/courses" },
    { name: "Stories", href: "/stories" },
    { name: "Prayer Time", href: "/prayer-times" },
    ...(session ? [{ name: "Dashboard", href: session.user.role === "admin" ? "/admin" : "/dashboard" }] : []),
  ];

  const handleLogout = async () => {
    await authClient.signOut();
    router.refresh();
  };

  return (
    <nav className="sticky top-0 z-50 glassmorphism ghost-border border-x-0 border-t-0 px-8 py-5 flex items-center justify-between">
      <div className="flex items-center gap-12">
        <NextLink href="/" className="text-2xl font-serif font-bold text-primary tracking-tight">
          Path to <span className="text-primary/70 italic">Peace</span>
        </NextLink>

        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <NextLink
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-all duration-300 relative py-1",
                pathname === link.href
                  ? "text-primary font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary"
                  : "text-on-surface-variant/70 hover:text-primary"
              )}
            >
              {link.name}
            </NextLink>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div className="hidden md:flex items-center space-x-3 pr-4 border-r border-outline-variant/10">
          <NextLink href="/feeling-tool">
            <Button variant="outline" className="bg-secondary-container/20 text-on-secondary-container border-none hover:bg-secondary-container/40 rounded-xl space-x-2 text-xs font-bold px-4">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <span>Feeling Tool</span>
            </Button>
          </NextLink>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="rounded-full text-on-surface-variant hover:bg-surface-container-low">
            <Bell className="w-5 h-5" />
          </Button>
          
          <div className="hidden sm:flex items-center space-x-2 ml-2">
            {session ? (
              <div className="flex items-center gap-3">
                <NextLink href={session.user.role === "admin" ? "/admin" : "/dashboard"}>
                  <Button variant="outline" className="ghost-border text-xs font-bold rounded-xl px-4">
                    Dashboard
                  </Button>
                </NextLink>
                <Button 
                  onClick={handleLogout}
                  variant="ghost" 
                  className="text-rose-500 font-bold hover:bg-rose-50 rounded-xl px-5 transition-all flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <NextLink href="/login">
                  <Button variant="ghost" className="text-primary font-bold hover:bg-primary/5 rounded-xl px-5 transition-all">
                    Login
                  </Button>
                </NextLink>
                <NextLink href="/register">
                  <Button className="bg-primary text-on-primary hover:bg-primary/90 rounded-xl px-6 font-bold shadow-lg shadow-primary/10 transition-all">
                    Join Sanctuary
                  </Button>
                </NextLink>
              </>
            )}
          </div>

          {!session && (
            <NextLink href="/login" className="sm:hidden">
              <Button variant="ghost" size="icon" className="rounded-full text-on-surface-variant hover:bg-surface-container-low">
                <User className="w-5 h-5 bg-on-surface-variant/10 p-1.5 rounded-full" />
              </Button>
            </NextLink>
          )}
          
          <Button variant="ghost" size="icon" className="lg:hidden rounded-full text-on-surface-variant">
            <LayoutGrid className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}

