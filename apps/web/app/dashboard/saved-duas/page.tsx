"use client";

import { authClient } from "@/lib/auth-client";
import { Heart, Search, Filter, ChevronRight, Bookmark, Share2 } from "lucide-react";
import Link from "next/link";

export default function SavedDuasPage() {
    const { data: session } = authClient.useSession();

    if (!session) return null;

    const savedDuas = [
        {
            id: 1,
            title: "Dua for Anxiety and Sorrow",
            arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ",
            translation: "O Allah, I seek refuge in You from anxiety and sorrow...",
            category: "Protection",
            isFavorite: true
        },
        {
            id: 2,
            title: "Dua for Seeking Forgiveness",
            arabic: "رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا",
            translation: "Our Lord, forgive us our sins...",
            category: "Forgiveness",
            isFavorite: true
        },
        {
            id: 3,
            title: "Dua for Ease in Affairs",
            arabic: "اللَّهُمَّ لاَ سَهْلَ إِلاَّ مَا جَعَلْتَهُ سَهْلاً",
            translation: "O Allah, there is no ease except in what You make easy...",
            category: "Success",
            isFavorite: true
        }
    ];

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-primary flex items-center gap-3">
                        <Heart className="text-rose-500 fill-rose-500" size={32} />
                        Saved Duas
                    </h2>
                    <p className="text-on-surface-variant mt-1 font-medium">Your collection of personal supplications and reminders.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary-container transition-all">
                        <Bookmark size={18} />
                        Add New Dua
                    </button>
                </div>
            </header>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search your saved duas..." 
                        className="w-full pl-12 pr-4 py-3 bg-white border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-3 bg-white border border-border rounded-2xl text-on-surface-variant font-bold text-sm hover:bg-surface-container transition-all">
                    <Filter size={18} />
                    Filter
                </button>
            </div>

            {/* Dua Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {savedDuas.map((dua) => (
                    <div key={dua.id} className="bg-white p-8 rounded-[2rem] border border-border shadow-sm hover:shadow-meditative transition-all duration-300 group">
                        <div className="flex justify-between items-start mb-6">
                            <span className="px-3 py-1 rounded-full bg-surface-container text-[10px] font-bold uppercase tracking-widest text-primary">
                                {dua.category}
                            </span>
                            <div className="flex gap-2">
                                <button className="p-2 hover:bg-surface-container rounded-full transition-colors text-on-surface-variant">
                                    <Share2 size={16} />
                                </button>
                                <button className="p-2 hover:bg-rose-50 rounded-full transition-colors text-rose-500">
                                    <Heart size={16} className="fill-rose-500" />
                                </button>
                            </div>
                        </div>
                        
                        <h3 className="text-xl font-bold text-primary mb-4">{dua.title}</h3>
                        <p className="text-2xl text-right font-serif leading-loose mb-6 text-primary/80" dir="rtl">
                            {dua.arabic}
                        </p>
                        <p className="text-sm text-on-surface-variant italic leading-relaxed mb-8 line-clamp-2">
                            "{dua.translation}"
                        </p>
                        
                        <Link href={`/duas/${dua.id}`} className="flex items-center justify-between w-full p-4 bg-surface-container-low rounded-2xl group-hover:bg-primary group-hover:text-white transition-all duration-300">
                            <span className="text-xs font-bold uppercase tracking-widest">Read Full Dua</span>
                            <ChevronRight size={18} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
