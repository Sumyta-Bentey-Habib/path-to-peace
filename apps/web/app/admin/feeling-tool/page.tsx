"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit2, X, Search, Book, ArrowLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";

const PREDEFINED_CATEGORIES = [
  "Ease in Hardship",
  "Morning & Evening",
  "Protection & Safety",
  "Gratitude",
  "Knowledge & Success",
  "Forgiveness & Mercy",
  "Family & Parents",
  "Daily Life",
  "Travel & Journey",
  "Health & Healing"
];

export default function FeelingToolPage() {
  const [duas, setDuas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  
  // Search Queries
  const [categoryQuery, setCategoryQuery] = useState("");
  const [duaQuery, setDuaQuery] = useState("");

  // Dua Category Sub-section state
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Custom Modal States (Main Items Delete)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/admin/duas`, {
        credentials: "include"
      });
      const result = await response.json();
      if (Array.isArray(result)) setDuas(result);
    } catch (error) {
      console.error("Failed to fetch duas sanctuary data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteRequest = (id: string) => {
    setDeleteItemId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteItemId) return;
    setIsDeleting(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/admin/duas/${deleteItemId}`, {
        method: "DELETE",
        credentials: "include"
      });
      if (response.ok) {
        fetchData();
        setIsDeleteModalOpen(false);
        setDeleteItemId(null);
      }
    } catch (error) {
      console.error(`Failed to delete dua:`, error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteAllInCategory = async () => {
    if (!selectedCategory) return;
    if (confirm(`Are you sure you want to delete ALL supplications in the "${selectedCategory}" category? This cannot be undone.`)) {
      const categoryDuas = duas.filter(d => d.category === selectedCategory);
      try {
        setLoading(true);
        for (const d of categoryDuas) {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/admin/duas/${d._id}`, {
            method: "DELETE",
            credentials: "include"
          });
        }
        await fetchData();
      } catch (error) {
        console.error("Failed to delete all in category:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Compile categories dynamically to ensure any newly added custom categories also appear
  const categoriesList = Array.from(
    new Set([...PREDEFINED_CATEGORIES, ...duas.map(d => d.category).filter(Boolean)])
  );

  const filteredCategories = categoriesList.filter(cat =>
    cat.toLowerCase().includes(categoryQuery.toLowerCase())
  );

  const categoryDuas = selectedCategory
    ? duas.filter(d => d.category === selectedCategory && (d.title || "").toLowerCase().includes(duaQuery.toLowerCase()))
    : [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-serif font-bold text-primary mb-2">Dua & Supplication Sanctuary</h1>
          <p className="text-on-surface-variant font-medium">Curate the spiritual and remedial prayers of Path to Peace.</p>
        </div>
      </div>

      <div className="bg-surface-container-low border border-outline-variant/30 rounded-[2.5rem] p-8 shadow-sm">
        {selectedCategory === null ? (
          // ================= CATEGORIES LIST VIEW =================
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-serif font-bold text-primary flex items-center gap-2">
                <Book className="text-emerald-600 fill-emerald-600/10" size={24} /> Supplication Categories
              </h2>
              <button 
                onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-primary text-on-primary rounded-xl text-xs font-bold hover:brightness-110 transition-all shadow-md shadow-primary/10 cursor-pointer"
              >
                <Plus size={16} /> Add Supplication
              </button>
            </div>

            <div className="relative group max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 group-focus-within:text-primary transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search categories..." 
                value={categoryQuery}
                onChange={(e) => setCategoryQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-surface-container-lowest border border-outline-variant/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((cat) => {
                const count = duas.filter(d => d.category === cat).length;
                return (
                  <div 
                    key={cat} 
                    onClick={() => {
                      setSelectedCategory(cat);
                      setDuaQuery("");
                    }}
                    className="p-6 bg-surface-container-lowest hover:bg-primary/5 border border-outline-variant/20 rounded-[2rem] flex items-center justify-between cursor-pointer group shadow-sm hover:shadow-md transition-all hover:scale-[1.02] active:scale-95 duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                        <Book size={22} />
                      </div>
                      <div>
                        <h4 className="text-base font-serif font-bold text-primary">{cat}</h4>
                        <p className="text-[10px] text-on-surface-variant/70 font-sans font-bold uppercase tracking-wider">{count} Supplication{count !== 1 ? "s" : ""}</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-on-surface-variant/40 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          // ================= CATEGORY DETAIL VIEW =================
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-primary/5 p-4 rounded-[1.5rem] border border-primary/10">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="flex items-center justify-center w-8 h-8 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-primary transition-all cursor-pointer"
                >
                  <ArrowLeft size={16} />
                </button>
                <div>
                  <h3 className="text-base font-serif font-bold text-primary">{selectedCategory}</h3>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => { setEditingItem({ category: selectedCategory }); setIsModalOpen(true); }}
                  className="flex items-center gap-1.5 px-4 py-2 bg-primary text-on-primary rounded-xl text-xs font-bold hover:brightness-110 transition-all cursor-pointer"
                >
                  <Plus size={12} /> Add Dua
                </button>
                <button 
                  onClick={handleDeleteAllInCategory}
                  className="flex items-center gap-1.5 px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-xl text-xs font-bold hover:bg-red-100 transition-all cursor-pointer"
                >
                  <Trash2 size={12} /> Delete All
                </button>
              </div>
            </div>

            <div className="relative group max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 group-focus-within:text-primary transition-colors" size={18} />
              <input 
                type="text" 
                placeholder={`Search in ${selectedCategory}...`} 
                value={duaQuery}
                onChange={(e) => setDuaQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-surface-container-lowest border border-outline-variant/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
              />
            </div>

            <div className="space-y-4">
              {loading ? (
                <div className="py-12 text-center text-primary font-medium text-sm">Seeking supplications...</div>
              ) : categoryDuas.length > 0 ? (
                categoryDuas.map((item) => (
                  <div key={item._id} className="p-6 bg-surface-container-lowest border border-outline-variant/30 rounded-[1.5rem] space-y-4 relative hover:shadow-md transition-all">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-base font-serif font-bold text-primary">{item.title}</h4>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button 
                          onClick={() => { setEditingItem(item); setIsModalOpen(true); }}
                          className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-lg transition-all cursor-pointer"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button 
                          onClick={() => handleDeleteRequest(item._id)}
                          className="p-1.5 text-on-surface-variant hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs">
                      <p className="font-serif text-right text-lg md:text-xl leading-loose text-primary/80" dir="rtl">{item.arabic}</p>
                      <p className="text-on-surface-variant italic leading-relaxed">"{item.meaning || item.translation}"</p>
                      {item.reference && <p className="text-[10px] text-primary/60 font-bold text-right">— {item.reference}</p>}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center border border-dashed border-outline-variant/30 rounded-[1.5rem] bg-surface-container-low">
                  <p className="text-sm text-on-surface-variant font-medium">No supplications found in this category.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeleteItemId(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Supplication?"
        description={
          <>
            Are you sure you want to delete this supplication (Dua)? This action is permanent and will completely remove this spiritual resource from Path to Peace.
          </>
        }
        confirmLabel="Delete Dua"
        isDanger={true}
        isLoading={isDeleting}
      />

      {/* Modal for Creating/Editing Dua */}
      {isModalOpen && (
        <DuaModal 
          editingItem={editingItem} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={() => { setIsModalOpen(false); fetchData(); }} 
        />
      )}
    </div>
  );
}

function DuaModal({ editingItem, onClose, onSuccess }: any) {
  const [formData, setFormData] = useState<any>(() => {
    if (editingItem) {
      return {
        category: "General",
        title: "",
        description: "",
        arabic: "",
        transliteration: "",
        meaning: "",
        reference: "",
        ...editingItem
      };
    }
    return {
      category: "General",
      title: "",
      description: "",
      arabic: "",
      transliteration: "",
      meaning: "",
      reference: ""
    };
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingItem && editingItem._id
      ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/admin/duas/${editingItem._id}`
      : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/admin/duas`;
    
    const method = editingItem && editingItem._id ? "PATCH" : "POST";

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
            {editingItem && editingItem._id ? "Edit Supplication" : "New Supplication"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-surface-container-high rounded-full cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
            <input value={formData.description || ""} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>

          <div>
            <label className="block text-sm font-bold text-primary/60 mb-1 ml-1">Arabic</label>
            <textarea required dir="rtl" value={formData.arabic} onChange={e => setFormData({...formData, arabic: e.target.value})} className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 font-serif text-xl h-24" />
          </div>
          <div>
            <label className="block text-sm font-bold text-primary/60 mb-1 ml-1">Meaning</label>
            <textarea required value={formData.meaning || formData.translation || ""} onChange={e => setFormData({...formData, meaning: e.target.value})} className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 h-24" />
          </div>
          <div>
            <label className="block text-sm font-bold text-primary/60 mb-1 ml-1">Reference</label>
            <input value={formData.reference || ""} onChange={e => setFormData({...formData, reference: e.target.value})} className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          
          <button type="submit" className="w-full py-4 mt-4 bg-primary text-on-primary rounded-2xl font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20 cursor-pointer">
            {editingItem && editingItem._id ? "Save Changes" : "Create Supplication"}
          </button>
        </form>
      </div>
    </div>
  );
}
