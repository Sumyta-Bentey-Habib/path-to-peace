"use client";

import { authClient } from "@/lib/auth-client";
import { 
    Sparkles, 
    Heart, 
    Star, 
    Book, 
    GraduationCap, 
    Smile, 
    ChevronRight,
    Compass,
    Clock,
    CheckCircle2
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
    const { data: session } = authClient.useSession();

    if (!session) return null;

    const firstName = session.user.name.split(" ")[0];

    return (
        <div className="space-y-10 pb-12">
            {/* Peaceful Header */}
            <header className="relative py-12 px-10 rounded-[2.5rem] overflow-hidden bg-primary text-white">
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 star-pattern scale-150 rotate-12" />
                <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-widest mb-6">
                        <Sparkles size={12} className="text-secondary-container" />
                        Daily Inspiration
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif leading-tight">
                        Peace be with you, <span className="text-secondary-container">{firstName}</span>.
                    </h2>
                    <p className="text-lg text-white/80 font-medium italic leading-relaxed">
                        "Verily, in the remembrance of Allah do hearts find rest." 
                        <span className="block mt-1 text-sm font-bold not-italic opacity-60">— Surah Ar-Ra'd 13:28</span>
                    </p>
                </div>
                
                <div className="absolute bottom-[-20%] right-[-5%] w-64 h-64 bg-secondary-container/20 blur-[100px] rounded-full" />
            </header>

            {/* Core Sanctuary Tools */}
            <div>
                <div className="flex items-center justify-between mb-6 px-2">
                    <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                        <Compass size={22} />
                        Your Sanctuary
                    </h3>
                    <button className="text-sm font-bold text-secondary hover:underline flex items-center gap-1">
                        View All <ChevronRight size={16} />
                    </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <SanctuaryCard 
                        title="Saved Duas" 
                        desc="12 Supplications" 
                        icon={<Heart className="text-rose-500" />} 
                        href="/dashboard/saved-duas"
                        progress={65}
                        progressColor="bg-rose-500"
                    />
                    <SanctuaryCard 
                        title="Quran Study" 
                        desc="Juz 3, Surah Al-Baqarah" 
                        icon={<Book className="text-blue-500" />} 
                        href="/quran"
                        progress={28}
                        progressColor="bg-blue-500"
                    />
                    <SanctuaryCard 
                        title="Active Course" 
                        desc="Foundations of Faith" 
                        icon={<GraduationCap className="text-emerald-500" />} 
                        href="/courses"
                        progress={84}
                        progressColor="bg-emerald-500"
                    />
                    <SanctuaryCard 
                        title="Emotional State" 
                        desc="Peaceful & Grateful" 
                        icon={<Smile className="text-amber-500" />} 
                        href="/feeling-tool"
                        progress={100}
                        progressColor="bg-amber-500"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Recent Journey */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-[2rem] border border-border shadow-meditative relative overflow-hidden">
                        <h3 className="text-xl font-bold text-primary mb-8 flex items-center gap-2">
                            <Clock size={20} />
                            Recent Journey
                        </h3>
                        
                        <div className="space-y-8 relative">
                            <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-surface-container" />
                            
                            <JourneyItem 
                                title="Evening Reflection" 
                                time="2 hours ago" 
                                desc="You completed your daily gratitude journal entry." 
                                status="completed"
                            />
                            <JourneyItem 
                                title="Quran Reading" 
                                time="5 hours ago" 
                                desc="Read 10 verses of Surah Ar-Rahman." 
                                status="completed"
                            />
                            <JourneyItem 
                                title="Course Milestone" 
                                time="Yesterday" 
                                desc="Finished Module 3: The Power of Prayer." 
                                status="completed"
                            />
                        </div>
                    </div>
                </div>

                {/* Growth Stats */}
                <div className="space-y-6">
                    <div className="bg-surface-container-low p-8 rounded-[2rem] border border-border flex flex-col justify-between min-h-[300px] group hover:bg-white transition-all duration-300 shadow-sm hover:shadow-meditative">
                        <div>
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                                <Star className="text-secondary" size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-2">Spiritual Growth</h3>
                            <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                                You've maintained a 7-day streak! Consistency is the key to inner peace.
                            </p>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <span className="text-3xl font-bold text-primary font-serif">Level 4</span>
                                <span className="text-xs font-bold text-secondary uppercase tracking-widest">1,240 XP</span>
                            </div>
                            <div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden">
                                <div className="h-full bg-secondary w-3/4 rounded-full" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-secondary-container to-secondary/20 p-8 rounded-[2rem] border border-secondary/10 relative overflow-hidden group cursor-pointer">
                        <div className="relative z-10">
                            <h4 className="font-bold text-secondary mb-2 uppercase tracking-tighter text-xs">Recommended for you</h4>
                            <h3 className="text-lg font-bold text-primary mb-4 leading-tight">Mastering Mindfulness in Daily Life</h3>
                            <button className="text-sm font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                                Start Session <ChevronRight size={16} />
                            </button>
                        </div>
                        <Sparkles className="absolute right-[-10px] bottom-[-10px] text-primary/5 w-32 h-32" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function SanctuaryCard({ title, desc, icon, href, progress, progressColor }: any) {
    return (
        <Link href={href} className="group">
            <div className="bg-white p-6 rounded-[2rem] border border-border shadow-sm hover:shadow-meditative transition-all duration-300 relative overflow-hidden h-full flex flex-col">
                <div className="w-12 h-12 bg-surface-container rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>
                <div className="flex-1">
                    <h4 className="text-lg font-bold text-primary mb-1">{title}</h4>
                    <p className="text-xs text-on-surface-variant mb-6 font-medium">{desc}</p>
                </div>
                
                <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/60">
                        <span>Progress</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                        <div className={`h-full ${progressColor} rounded-full`} style={{ width: `${progress}%` }} />
                    </div>
                </div>
                
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 bg-surface-container rounded-full flex items-center justify-center text-primary">
                        <ChevronRight size={16} />
                    </div>
                </div>
            </div>
        </Link>
    );
}

function JourneyItem({ title, time, desc, status }: any) {
    return (
        <div className="flex gap-6 group">
            <div className="relative z-10">
                <div className="w-10 h-10 bg-white border-2 border-surface-container rounded-full flex items-center justify-center group-hover:border-primary transition-colors duration-300">
                    <CheckCircle2 size={18} className="text-primary opacity-20 group-hover:opacity-100 transition-opacity" />
                </div>
            </div>
            <div className="flex-1 pt-0.5">
                <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-bold text-primary group-hover:text-secondary transition-colors">{title}</h4>
                    <span className="text-[10px] text-on-surface-variant/60 uppercase font-bold tracking-widest">{time}</span>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}

