"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { LayoutDashboard, User, Settings, LogOut, Bell, Search } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    const handleSignOut = async () => {
        await authClient.signOut();
        router.push("/login");
    };

    if (isPending) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    if (!session) {
        router.push("/login");
        return null;
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col">
                <div className="p-6">
                    <h1 className="text-xl font-bold text-primary flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                            P
                        </div>
                        Path to Peace
                    </h1>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-slate-700 bg-slate-100 rounded-lg font-medium">
                        <LayoutDashboard size={20} />
                        Overview
                    </Link>
                    <Link href="/dashboard/profile" className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                        <User size={20} />
                        Profile
                    </Link>
                    <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                        <Settings size={20} />
                        Settings
                    </Link>
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <button 
                        onClick={handleSignOut}
                        className="flex items-center gap-3 w-full px-3 py-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <LogOut size={20} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
                    <div className="flex items-center gap-4 bg-slate-100 px-4 py-2 rounded-full w-96">
                        <Search size={18} className="text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Search sanctuary..." 
                            className="bg-transparent border-none focus:outline-none text-sm w-full"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                        </button>
                        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-semibold text-slate-900">{session.user.name}</p>
                                <p className="text-xs text-slate-500 capitalize">{session.user.role}</p>
                            </div>
                            <div className="w-10 h-10 bg-gradient-to-tr from-primary to-secondary rounded-full border-2 border-white shadow-sm overflow-hidden">
                                {session.user.image ? (
                                    <img src={session.user.image} alt={session.user.name} />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white font-bold">
                                        {session.user.name.charAt(0)}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-8 flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}
