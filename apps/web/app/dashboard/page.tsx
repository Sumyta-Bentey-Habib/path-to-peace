"use client";

import { authClient } from "@/lib/auth-client";
import { Sparkles, Heart, Star, Users } from "lucide-react";

export default function DashboardPage() {
    const { data: session } = authClient.useSession();

    if (!session) return null;

    return (
        <div className="space-y-8">
            <header>
                <h2 className="text-3xl font-bold text-slate-900">Peace be with you, {session.user.name}</h2>
                <p className="text-slate-500 mt-2">Welcome back to your digital sanctuary. Here is what is happening today.</p>
            </header>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={<Sparkles />} label="Daily Progress" value="84%" color="bg-blue-500" />
                <StatCard icon={<Heart />} label="Quiet Moments" value="12" color="bg-rose-500" />
                <StatCard icon={<Star />} label="Personal Growth" value="Level 4" color="bg-amber-500" />
                <StatCard icon={<Users />} label="Community" value="2.4k" color="bg-emerald-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Activity</h3>
                    <div className="space-y-6">
                        <ActivityItem 
                            title="Evening Reflection" 
                            time="2 hours ago" 
                            desc="You completed your daily gratitude journal entry." 
                        />
                        <ActivityItem 
                            title="Community Milestone" 
                            time="5 hours ago" 
                            desc="You reached a 7-day streak of mindful stewardship." 
                        />
                        <ActivityItem 
                            title="New Content Available" 
                            time="Yesterday" 
                            desc="A new collection of peaceful stories has been added to your sanctuary." 
                        />
                    </div>
                </div>

                {/* Daily Tip */}
                <div className="bg-gradient-to-br from-primary to-primary/80 p-8 rounded-2xl text-white shadow-lg shadow-primary/20 flex flex-col justify-between">
                    <div>
                        <Sparkles className="mb-6 opacity-80" size={32} />
                        <h3 className="text-xl font-bold mb-4">Mindful Tip of the Day</h3>
                        <p className="text-white/80 leading-relaxed italic">
                            "Peace is not the absence of conflict, but the ability to cope with it."
                        </p>
                    </div>
                    <button className="mt-8 bg-white/20 hover:bg-white/30 transition-colors py-3 rounded-xl font-semibold text-sm backdrop-blur-sm">
                        Read More
                    </button>
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon, label, value, color }: any) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className={`${color} p-3 rounded-xl text-white`}>
                {icon}
            </div>
            <div>
                <p className="text-sm font-medium text-slate-500">{label}</p>
                <p className="text-xl font-bold text-slate-900">{value}</p>
            </div>
        </div>
    );
}

function ActivityItem({ title, time, desc }: any) {
    return (
        <div className="flex gap-4">
            <div className="w-10 h-10 bg-slate-100 rounded-full flex-shrink-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-primary rounded-full" />
            </div>
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-bold text-slate-900">{title}</h4>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{time}</span>
                </div>
                <p className="text-sm text-slate-500">{desc}</p>
            </div>
        </div>
    );
}
