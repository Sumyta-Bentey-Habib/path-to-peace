"use client";

import { useEffect, useState } from "react";
import { authClient, getAuthHeaders } from "@/lib/auth-client";
import { Smile, Search, Bookmark, Trash2, Heart, BookOpen, Quote } from "lucide-react";
import Link from "next/link";
import * as LucideIcons from "lucide-react";

// Dynamic Lucide Icon Mapper
const FeelingIcon = ({ name, size = 20 }: { name: string; size?: number }) => {
    const IconComponent = (LucideIcons as any)[name];
    if (!IconComponent) return <Smile size={size} />;
    return <IconComponent size={size} />;
};

export default function SavedFeelingsPage() {
    const { data: session } = authClient.useSession();
    const [savedFeelings, setSavedFeelings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchSavedFeelings = async () => {
        if (!session) return;
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/saved-items?type=feeling`, {
                credentials: "include",
                headers: await getAuthHeaders()
            });
            if (response.ok) {
                const data = await response.json();
                setSavedFeelings(data);
            }
        } catch (error) {
            console.error("Failed to fetch saved Feelings:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSavedFeelings();
    }, [session]);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to remove this emotional comfort state from your sanctuary?")) return;
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/saved-items/${id}`, {
                method: "DELETE",
                credentials: "include",
                headers: await getAuthHeaders()
            });
            if (response.ok) {
                setSavedFeelings(prev => prev.filter(item => item._id !== id));
            }
        } catch (error) {
            console.error("Failed to delete saved Feeling state:", error);
        }
    };

    if (!session) return null;

    const filteredFeelings = savedFeelings.filter((item) => {
        const f = item.data;
        const q = searchQuery.toLowerCase();
        return (
            f.label?.toLowerCase().includes(q) ||
            f.quran?.translation?.toLowerCase().includes(q) ||
            f.dua?.translation?.toLowerCase().includes(q)
        );
    });

    return (
        <div className="space-y-8 text-left">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-primary flex items-center gap-3">
                        <Smile className="text-amber-500" size={32} />
                        Saved Reflections
                    </h2>
                    <p className="text-on-surface-variant mt-1 font-medium">Your sanctuary of emotional state reflections and comforting remedies.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/feeling-tool" className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/10 hover:bg-primary-container transition-all hover:scale-105 active:scale-95">
                        <Bookmark size={16} />
                        Check Feeling
                    </Link>
                </div>
            </header>

            {/* Search */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60 group-focus-within:text-primary transition-colors" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search comforted verses or supplications..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                    />
                </div>
            </div>

            {loading ? (
                <div className="py-24 text-center text-primary font-medium flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    Loading saved reflections...
                </div>
            ) : filteredFeelings.length > 0 ? (
                <div className="space-y-6 animate-in fade-in duration-500">
                    {filteredFeelings.map((item) => (
                        <div key={item._id} className="bg-white p-8 rounded-[2rem] border border-border hover:shadow-meditative transition-all duration-300 relative group">
                            {/* Card Header */}
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                                        <FeelingIcon name={item.data.icon} size={24} />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60 block">Feeling Comfort</span>
                                        <h4 className="text-xl font-bold text-primary font-serif">{item.data.label}</h4>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => handleDelete(item._id)}
                                    className="p-2 hover:bg-rose-50 text-rose-400 hover:text-rose-500 rounded-full transition-colors cursor-pointer"
                                    title="Delete from Sanctuary"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            {/* Comfort Remedy Sections */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* comfort Quran */}
                                {item.data.quran && (
                                    <div className="p-6 bg-surface-container-low rounded-2xl border border-border flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 mb-3 text-primary/80 font-bold text-xs uppercase tracking-wider">
                                                <BookOpen size={14} />
                                                Comforting Verse
                                            </div>
                                            <p className="text-xl text-right font-arabic leading-loose mb-3 text-primary/95" dir="rtl">
                                                {item.data.quran.arabic}
                                            </p>
                                            <p className="text-xs text-on-surface-variant italic leading-relaxed mb-4">
                                                "{item.data.quran.translation || item.data.quran.meaning}"
                                            </p>
                                        </div>
                                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest block self-end">
                                            {item.data.quran.reference}
                                        </span>
                                    </div>
                                )}

                                {/* comfort Dua */}
                                {item.data.dua && (
                                    <div className="p-6 bg-surface-container-low rounded-2xl border border-border flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 mb-3 text-rose-500 font-bold text-xs uppercase tracking-wider">
                                                <Heart size={14} className="fill-rose-500/10" />
                                                Remedy Supplication
                                            </div>
                                            <p className="text-xl text-right font-arabic leading-loose mb-3 text-primary/95" dir="rtl">
                                                {item.data.dua.arabic}
                                            </p>
                                            <p className="text-xs text-on-surface-variant italic leading-relaxed mb-4">
                                                "{item.data.dua.translation || item.data.dua.meaning}"
                                            </p>
                                        </div>
                                        <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest block self-end">
                                            {item.data.dua.reference}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center max-w-md mx-auto animate-in fade-in duration-500">
                    <div className="w-16 h-16 rounded-3xl bg-surface-container flex items-center justify-center mb-5">
                        <Smile className="text-amber-500" size={32} />
                    </div>
                    <h4 className="text-xl font-bold text-primary mb-2 font-serif">No saved reflections yet</h4>
                    <p className="text-sm text-on-surface-variant/80 leading-relaxed mb-6 font-medium">
                        {searchQuery ? "No comforting reflections match your query." : "Save emotional remedy states from your feeling helper to quickly retrieve calm and reassuring reminders."}
                    </p>
                    <Link 
                        href="/feeling-tool" 
                        className="px-5 py-2.5 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md hover:bg-primary-container transition-all hover:scale-105 active:scale-95"
                    >
                        Reflect Now
                    </Link>
                </div>
            )}
        </div>
    );
}
