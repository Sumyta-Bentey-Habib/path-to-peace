"use client";

import { useEffect, useState } from "react";
import { Heart, Plus, Search, Edit2, Trash2, X, Book } from "lucide-react";
import { cn } from "@/lib/utils";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";

export default function DuasManagement() {
  const [duas, setDuas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDua, setEditingDua] = useState<any>(null);

  // Custom Modal States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteDuaId, setDeleteDuaId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchDuas = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/admin/duas`, {
        credentials: "include"
      });
      const data = await response.json();
      if (Array.isArray(data)) setDuas(data);
    } catch (error) {
      console.error("Failed to fetch duas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDuas();
  }, []);

  const handleDeleteRequest = (id: string) => {
    setDeleteDuaId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteDuaId) return;
    setIsDeleting(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/admin/duas/${deleteDuaId}`, {
        method: "DELETE",
        credentials: "include"
      });
      if (response.ok) {
        fetchDuas();
        setIsDeleteModalOpen(false);
        setDeleteDuaId(null);
      }
    } catch (error) {
      console.error("Failed to delete dua:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredDuas = duas.filter(dua => 
    (dua.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (dua.category || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-serif font-bold text-primary mb-2">Duas Repository</h1>
          <p className="text-on-surface-variant font-medium">Curate the prayers that heal the heart.</p>
        </div>
        <button 
          onClick={() => { setEditingDua(null); setIsModalOpen(true); }}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-2xl font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20 group"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform" />
          Add New Dua
        </button>
      </div>

      <div className="relative group max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 group-focus-within:text-primary transition-colors" size={18} />
        <input 
          type="text" 
          placeholder="Filter by title or category..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>

      <div className="bg-surface-container-low border border-outline-variant/30 rounded-[2.5rem] overflow-hidden shadow-meditative">
        {loading ? (
          <div className="py-24 text-center text-primary font-medium">Seeking Duas...</div>
        ) : filteredDuas.length > 0 ? (
          <div className="divide-y divide-outline-variant/10">
            {filteredDuas.map((dua) => (
              <div key={dua._id} className="p-6 flex items-center justify-between hover:bg-primary/5 transition-colors group">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-secondary-container/30 flex items-center justify-center text-primary">
                    <Book size={24} />
                  </div>
                  <div className="max-w-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-lg font-serif font-bold text-primary">{dua.title}</h4>
                      <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest">{dua.category}</span>
                    </div>
                    <p className="text-sm text-on-surface-variant font-medium line-clamp-1 italic">{dua.arabic}</p>
                    <p className="text-xs text-on-surface-variant/70 mt-1 line-clamp-1">{dua.meaning}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => { setEditingDua(dua); setIsModalOpen(true); }}
                    className="p-3 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-xl transition-all"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => handleDeleteRequest(dua._id)}
                    className="p-3 text-on-surface-variant hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="text-on-surface-variant font-medium">No Duas found matching your search.</p>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeleteDuaId(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Supplication?"
        description={
          <>
            Are you sure you want to delete this supplication (Dua)? This action is permanent and cannot be undone.
          </>
        }
        confirmLabel="Delete Dua"
        isDanger={true}
        isLoading={isDeleting}
      />

      {/* Modal for Creating/Editing */}
      {isModalOpen && (
        <DuaModal 
          editingDua={editingDua} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={() => { setIsModalOpen(false); fetchDuas(); }} 
        />
      )}
    </div>
  );
}

function DuaModal({ editingDua, onClose, onSuccess }: any) {
  const [formData, setFormData] = useState<any>(editingDua || {
    category: "General",
    title: "",
    description: "",
    arabic: "",
    transliteration: "",
    meaning: "",
    reference: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingDua 
      ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/admin/duas/${editingDua._id}`
      : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/admin/duas`;
    
    const method = editingDua ? "PATCH" : "POST";

    try {
      const response = await fetch(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (response.ok) onSuccess();
    } catch (error) {
      console.error("Failed to save:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-[2.5rem] w-full max-w-2xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif font-bold text-primary">
            {editingDua ? "Edit Dua" : "New Dua"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-surface-container-high rounded-full">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-primary/60 mb-1 ml-1">Category</label>
              <input required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="block text-sm font-bold text-primary/60 mb-1 ml-1">Title</label>
              <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-primary/60 mb-1 ml-1">Description</label>
            <input required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="block text-sm font-bold text-primary/60 mb-1 ml-1">Arabic</label>
            <textarea required dir="rtl" value={formData.arabic} onChange={e => setFormData({...formData, arabic: e.target.value})} className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 font-serif text-xl h-32" />
          </div>
          <div>
            <label className="block text-sm font-bold text-primary/60 mb-1 ml-1">Meaning</label>
            <textarea required value={formData.meaning} onChange={e => setFormData({...formData, meaning: e.target.value})} className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 h-24" />
          </div>
          <div>
            <label className="block text-sm font-bold text-primary/60 mb-1 ml-1">Reference</label>
            <input value={formData.reference} onChange={e => setFormData({...formData, reference: e.target.value})} className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <button type="submit" className="w-full py-4 mt-4 bg-primary text-on-primary rounded-2xl font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20">
            {editingDua ? "Save Changes" : "Create Dua"}
          </button>
        </form>
      </div>
    </div>
  );
}

