"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import { 
    LayoutDashboard, 
    User, 
    Settings, 
    LogOut, 
    Bell, 
    Search,
    BookOpen,
    Book,
    GraduationCap,
    Smile,
    Heart
} from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const { data: session, isPending } = authClient.useSession();

    const handleSignOut = async () => {
        await authClient.signOut();
        router.push("/login");
    };

    if (isPending) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-surface">
                <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    if (!session) {
        router.push("/login");
        return null;
    }

    const navItems = [
        { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
        { href: "/dashboard/saved-duas", label: "Saved Duas", icon: Heart },
        { href: "/quran", label: "Quran", icon: Book },
        { href: "/courses", label: "Courses", icon: GraduationCap },
        { href: "/feeling-tool", label: "Feeling Tool", icon: Smile },
    ];

    const secondaryNavItems = [
        { href: "/dashboard/profile", label: "Profile", icon: User },
        { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-surface flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-border hidden lg:flex flex-col sticky top-0 h-screen">
                <div className="p-6">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                            <BookOpen size={24} />
                        </div>
                        <h1 className="text-xl font-bold text-primary font-serif">Path to Peace</h1>
                    </Link>
                </div>

                <div className="flex-1 px-4 py-4 space-y-8 overflow-y-auto">
                    <div>
                        <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Main Menu</p>
                        <nav className="space-y-1">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href;
                                return (
                                    <Link 
                                        key={item.href}
                                        href={item.href} 
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                                            isActive 
                                                ? "bg-primary text-white shadow-md shadow-primary/20" 
                                                : "text-on-surface-variant hover:bg-surface-container hover:text-primary"
                                        }`}
                                    >
                                        <Icon size={20} className={isActive ? "text-white" : "text-on-surface-variant group-hover:text-primary"} />
                                        <span className="font-medium">{item.label}</span>
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    <div>
                        <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Account</p>
                        <nav className="space-y-1">
                            {secondaryNavItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href;
                                return (
                                    <Link 
                                        key={item.href}
                                        href={item.href} 
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                                            isActive 
                                                ? "bg-primary text-white shadow-md shadow-primary/20" 
                                                : "text-on-surface-variant hover:bg-surface-container hover:text-primary"
                                        }`}
                                    >
                                        <Icon size={20} className={isActive ? "text-white" : "text-on-surface-variant group-hover:text-primary"} />
                                        <span className="font-medium">{item.label}</span>
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </div>

                <div className="p-4 border-t border-border bg-surface-container-low/50">
                    <button 
                        onClick={handleSignOut}
                        className="flex items-center gap-3 w-full px-3 py-3 text-on-surface-variant hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all duration-200"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-border flex items-center justify-between px-8 sticky top-0 z-20">
                    <div className="flex items-center gap-4 bg-surface-container px-4 py-2.5 rounded-2xl w-full max-w-md focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                        <Search size={18} className="text-on-surface-variant" />
                        <input 
                            type="text" 
                            placeholder="Search your sanctuary..." 
                            className="bg-transparent border-none focus:outline-none text-sm w-full placeholder:text-on-surface-variant/60"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative p-2.5 text-on-surface-variant hover:bg-surface-container rounded-full transition-all">
                            <Bell size={20} />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-secondary rounded-full border-2 border-white" />
                        </button>
                        
                        <div className="flex items-center gap-4 pl-6 border-l border-border">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-primary leading-none mb-1">{session.user.name}</p>
                                <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">{session.user.role}</p>
                            </div>
                            <div className="w-11 h-11 bg-primary-container rounded-2xl border border-border shadow-sm overflow-hidden flex-shrink-0 relative group cursor-pointer">
                                {session.user.image ? (
                                    <img src={session.user.image} alt={session.user.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white font-serif text-lg">
                                        {session.user.name.charAt(0)}
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <User size={16} className="text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-8 flex-1 star-pattern">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

