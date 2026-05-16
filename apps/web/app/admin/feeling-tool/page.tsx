"use client";

import { useEffect, useState } from "react";
import { Heart, Plus, Trash2, Edit2, X, Search, Book } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FeelingToolPage() {
  const [activeTab, setActiveTab] = useState<"duas" | "feelings">("duas");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/admin/${activeTab}`, {
        credentials: "include"
      });
      const result = await response.json();
      if (Array.isArray(result)) setData(result);
    } catch (error) {
      console.error(`Failed to fetch ${activeTab}:`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleDelete = async (id: string) => {
    if (!confirm(`Are you sure you want to delete this ${activeTab.slice(0, -1)}?`)) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/admin/${activeTab}/${id}`, {
        method: "DELETE",
        credentials: "include"
      });
      if (response.ok) fetchData();
    } catch (error) {
      console.error(`Failed to delete ${activeTab.slice(0, -1)}:`, error);
    }
  };

  const filteredData = data.filter(item => 
    (item.title || item.label || item.name || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-serif font-bold text-primary mb-2">Feeling & Dua Sanctuary</h1>
          <p className="text-on-surface-variant font-medium">Curate the spiritual and emotional resources of Path to Peace.</p>
        </div>
        <button 
          onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-2xl font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20 group"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform" />
          Add {activeTab === "duas" ? "New Dua" : "New Feeling"}
        </button>
      </div>

      {/* Tab Switcher */}
      <div className="flex p-1.5 bg-surface-container-low border border-outline-variant/30 rounded-2xl w-fit">
        <button 
          onClick={() => setActiveTab("duas")}
          className={cn(
            "px-6 py-2 rounded-xl text-sm font-bold transition-all",
            activeTab === "duas" ? "bg-primary text-on-primary shadow-md" : "text-on-surface-variant hover:bg-surface-container-high"
          )}
        >
          Duas
        </button>
        <button 
          onClick={() => setActiveTab("feelings")}
          className={cn(
            "px-6 py-2 rounded-xl text-sm font-bold transition-all",
            activeTab === "feelings" ? "bg-primary text-on-primary shadow-md" : "text-on-surface-variant hover:bg-surface-container-high"
          )}
        >
          Feelings
        </button>
      </div>

      <div className="relative group max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 group-focus-within:text-primary transition-colors" size={18} />
        <input 
          type="text" 
          placeholder={`Search ${activeTab}...`} 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>

      <div className="bg-surface-container-low border border-outline-variant/30 rounded-[2.5rem] overflow-hidden shadow-meditative">
        {loading ? (
          <div className="py-24 text-center text-primary font-medium">Seeking content...</div>
        ) : filteredData.length > 0 ? (
          <div className="divide-y divide-outline-variant/10">
            {filteredData.map((item) => (
              <div key={item._id} className="p-6 flex items-center justify-between hover:bg-primary/5 transition-colors group">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-secondary-container/30 flex items-center justify-center text-primary">
                    {activeTab === "duas" ? <Book size={24} /> : <Heart size={24} />}
                  </div>
                  <div>
                    <h4 className="text-lg font-serif font-bold text-primary">{item.title || item.label}</h4>
                    <p className="text-sm text-on-surface-variant font-medium line-clamp-1 max-w-xl">
                      {activeTab === "duas" ? item.description : `Icon: ${item.icon} • Reference: ${item.quran?.reference}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => { setEditingItem(item); setIsModalOpen(true); }}
                    className="p-3 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-xl transition-all"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(item._id)}
                    className="p-3 text-on-surface-variant hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="text-on-surface-variant font-medium">No {activeTab} found matching your search.</p>
          </div>
        )}
      </div>

      {/* Modal for Creating/Editing */}
      {isModalOpen && (
        <DuaFeelingModal 
          activeTab={activeTab} 
          editingItem={editingItem} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={() => { setIsModalOpen(false); fetchData(); }} 
        />
      )}
    </div>
  );
}

function DuaFeelingModal({ activeTab, editingItem, onClose, onSuccess }: any) {
  const [formData, setFormData] = useState<any>(editingItem || {
    // Default for Dua
    category: "General",
    title: "",
    description: "",
    arabic: "",
    transliteration: "",
    meaning: "",
    reference: "",
    // Default for Feeling
    id: "",
    label: "",
    icon: "Heart",
    quran: { arabic: "", translation: "", reference: "" },
    dua: { arabic: "", translation: "", reference: "" }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingItem 
      ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/admin/${activeTab}/${editingItem._id}`
      : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/admin/${activeTab}`;
    
    const method = editingItem ? "PATCH" : "POST";

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
            {editingItem ? `Edit ${activeTab.slice(0, -1)}` : `New ${activeTab.slice(0, -1)}`}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-surface-container-high rounded-full">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === "duas" ? (
            <>
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
                <label className="block text-sm font-bold text-primary/60 mb-1 ml-1">Arabic</label>
                <textarea required dir="rtl" value={formData.arabic} onChange={e => setFormData({...formData, arabic: e.target.value})} className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 font-serif text-xl" />
              </div>
              <div>
                <label className="block text-sm font-bold text-primary/60 mb-1 ml-1">Meaning</label>
                <textarea required value={formData.meaning} onChange={e => setFormData({...formData, meaning: e.target.value})} className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div>
                <label className="block text-sm font-bold text-primary/60 mb-1 ml-1">Reference</label>
                <input value={formData.reference} onChange={e => setFormData({...formData, reference: e.target.value})} className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-primary/60 mb-1 ml-1">ID (e.g., sad, lonely)</label>
                  <input required value={formData.id} onChange={e => setFormData({...formData, id: e.target.value})} className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-primary/60 mb-1 ml-1">Label</label>
                  <input required value={formData.label} onChange={e => setFormData({...formData, label: e.target.value})} className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
              </div>
              <div className="p-4 bg-primary/5 rounded-[2rem] space-y-4 border border-primary/10">
                <h3 className="font-bold text-primary text-sm flex items-center gap-2"><Book size={16}/> Quranic Context</h3>
                <textarea placeholder="Arabic Content" dir="rtl" value={formData.quran.arabic} onChange={e => setFormData({...formData, quran: {...formData.quran, arabic: e.target.value}})} className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 font-serif text-lg" />
                <textarea placeholder="Translation" value={formData.quran.translation} onChange={e => setFormData({...formData, quran: {...formData.quran, translation: e.target.value}})} className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
                <input placeholder="Reference" value={formData.quran.reference} onChange={e => setFormData({...formData, quran: {...formData.quran, reference: e.target.value}})} className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
            </>
          )}
          <button type="submit" className="w-full py-4 mt-4 bg-primary text-on-primary rounded-2xl font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20">
            {editingItem ? "Save Changes" : `Create ${activeTab.slice(0, -1)}`}
          </button>
        </form>
      </div>
    </div>
  );
}

