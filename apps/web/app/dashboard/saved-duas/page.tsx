"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Heart, Search, ChevronRight, Bookmark, Trash2 } from "lucide-react";
import Link from "next/link";
import { useSavedItems } from "@/hooks/use-saved-items";
import { EmptySanctuaryState } from "@/components/dashboard/EmptySanctuaryState";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";

export default function SavedDuasPage() {
    const { data: session } = authClient.useSession();
    const { savedItems: savedDuas, loading, deleteItemById } = useSavedItems("dua");
    const [searchQuery, setSearchQuery] = useState("");

    // Custom Modal States
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteRequest = (id: string) => {
        setDeleteItemId(id);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!deleteItemId) return;
        setIsDeleting(true);
        try {
            await deleteItemById(deleteItemId);
            setIsDeleteModalOpen(false);
            setDeleteItemId(null);
        } catch (error) {
            console.error("Failed to delete item:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    if (!session) return null;

    const filteredDuas = savedDuas.filter((item) => {
        const d = item.data;
        const q = searchQuery.toLowerCase();
        return (
            d.title?.toLowerCase().includes(q) ||
            d.category?.toLowerCase().includes(q) ||
            d.meaning?.toLowerCase().includes(q)
        );
    });

    return (
        <div className="space-y-8 text-left">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-primary flex items-center gap-3">
                        <Heart className="text-rose-500 fill-rose-500 animate-pulse duration-[3000ms]" size={32} />
                        Saved Duas
                    </h2>
                    <p className="text-on-surface-variant mt-1 font-medium">Your collection of personal supplications and reminders.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/duas" className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/10 hover:bg-primary-container transition-all hover:scale-105 active:scale-95">
                        <Bookmark size={16} />
                        Discover Duas
                    </Link>
                </div>
            </header>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60 group-focus-within:text-primary transition-colors" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search your saved supplications..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                    />
                </div>
            </div>

            {loading ? (
                <div className="py-24 text-center text-primary font-medium flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    Loading your saved supplications...
                </div>
            ) : filteredDuas.length > 0 ? (
                /* Dua Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in duration-500">
                    {filteredDuas.map((item) => (
                        <div key={item._id} className="bg-white p-8 rounded-[2rem] border border-border shadow-sm hover:shadow-meditative transition-all duration-300 group flex flex-col justify-between min-h-[320px]">
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <span className="px-3 py-1 rounded-full bg-primary/5 text-[10px] font-bold uppercase tracking-widest text-primary">
                                        {item.data.category}
                                    </span>
                                    <button 
                                        onClick={() => handleDeleteRequest(item._id)}
                                        className="p-2 hover:bg-rose-50 rounded-full transition-colors text-rose-400 hover:text-rose-500 cursor-pointer active:scale-90"
                                        title="Remove from Sanctuary"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                
                                <h3 className="text-xl font-bold text-primary mb-3 font-serif line-clamp-1">{item.data.title}</h3>
                                <p className="text-2xl text-right font-arabic leading-loose mb-4 text-primary/80 line-clamp-1" dir="rtl">
                                    {item.data.arabic}
                                </p>
                                <p className="text-sm text-on-surface-variant italic leading-relaxed mb-6 line-clamp-3">
                                    "{item.data.meaning}"
                                </p>
                            </div>
                            
                            <Link href="/duas" className="flex items-center justify-between w-full p-4 bg-surface-container-low rounded-2xl group-hover:bg-primary group-hover:text-white transition-all duration-300 mt-2">
                                <span className="text-xs font-bold uppercase tracking-widest">View Library</span>
                                <ChevronRight size={18} />
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <EmptySanctuaryState 
                    icon={<Heart className="text-rose-400" size={32} />}
                    title={searchQuery ? "No matching supplications" : "Your supplications list is empty"}
                    desc={searchQuery ? "No saved supplications match your search query." : "You haven't bookmarked any duas yet. Browse our selection and save those that touch your heart."}
                    btnText="Browse Supplications"
                    btnHref="/duas"
                />
            )}

            {/* Reusable Sanctuary Confirmation Modal */}
            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setDeleteItemId(null);
                }}
                onConfirm={handleConfirmDelete}
                title="Remove from Sanctuary?"
                description={
                    <>
                        Are you sure you want to remove this supplication from your sanctuary?
                    </>
                }
                confirmLabel="Remove Dua"
                isDanger={true}
                isLoading={isDeleting}
            />
        </div>
    );
}
