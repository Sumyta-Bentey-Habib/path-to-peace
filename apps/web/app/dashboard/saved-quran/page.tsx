"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Book, Search, ChevronRight, Bookmark, Trash2 } from "lucide-react";
import Link from "next/link";
import { useSavedItems } from "@/hooks/use-saved-items";
import { EmptySanctuaryState } from "@/components/dashboard/EmptySanctuaryState";

export default function SavedQuranPage() {
    const { data: session } = authClient.useSession();
    const { savedItems: savedSurahs, loading, deleteItemById } = useSavedItems("quran");
    const [searchQuery, setSearchQuery] = useState("");

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to remove this Surah from your sanctuary?")) return;
        await deleteItemById(id);
    };

    if (!session) return null;

    const filteredSurahs = savedSurahs.filter((item) => {
        const s = item.data;
        const q = searchQuery.toLowerCase();
        return (
            s.englishName?.toLowerCase().includes(q) ||
            s.revelationType?.toLowerCase().includes(q)
        );
    });

    return (
        <div className="space-y-8 text-left">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-primary flex items-center gap-3">
                        <Book className="text-blue-500" size={32} />
                        Saved Surahs
                    </h2>
                    <p className="text-on-surface-variant mt-1 font-medium">Your bookmarked Surahs and study checkpoints.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/quran" className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/10 hover:bg-primary-container transition-all hover:scale-105 active:scale-95">
                        <Bookmark size={16} />
                        Open Quran
                    </Link>
                </div>
            </header>

            {/* Search */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60 group-focus-within:text-primary transition-colors" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search your saved surahs..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                    />
                </div>
            </div>

            {loading ? (
                <div className="py-24 text-center text-primary font-medium flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    Loading saved Surahs...
                </div>
            ) : filteredSurahs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in duration-500">
                    {filteredSurahs.map((item) => (
                        <div key={item._id} className="bg-white p-6 rounded-3xl border border-border hover:shadow-meditative transition-all duration-300 group flex flex-col justify-between min-h-[180px]">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <span className="px-3 py-1 rounded-full bg-secondary-container/20 text-[9px] font-bold uppercase tracking-widest text-secondary">
                                        {item.data.revelationType}
                                    </span>
                                    <button 
                                        onClick={() => handleDelete(item._id)}
                                        className="p-1.5 hover:bg-red-50 text-on-surface-variant/40 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                                        title="Delete from Sanctuary"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                <h4 className="text-lg font-bold text-primary font-serif mb-1">
                                    Surah {item.data.englishName}
                                </h4>
                                <p className="text-xs text-on-surface-variant font-medium mb-4">{item.data.numberOfAyahs} Ayahs</p>
                            </div>
                            <Link 
                                href={`/quran?surah=${item.itemId}`}
                                className="inline-flex items-center justify-between w-full px-4 py-3 bg-surface-container-low rounded-xl text-xs font-bold text-primary hover:bg-primary hover:text-white transition-all duration-300"
                            >
                                <span>Read Surah</span>
                                <ChevronRight size={14} />
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <EmptySanctuaryState 
                    icon={<Book className="text-blue-500" size={32} />}
                    title={searchQuery ? "No matching Surahs" : "No saved Surahs yet"}
                    desc={searchQuery ? "No bookmarked Surahs match your search query." : "Uplift your spirit by studying the Noble Quran. Bookmark Surahs while reading to find them here."}
                    btnText="Browse Quran"
                    btnHref="/quran"
                />
            )}
        </div>
    );
}
