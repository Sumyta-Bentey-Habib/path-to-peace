"use client";

import { useState } from "react";
import { 
  Heart, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ChevronRight,
  Sparkles
} from "lucide-react";

const initialDuas = [
  { id: 1, title: "Morning Remembrance", category: "Daily", content: "All praise is to Allah who gave us life after he had caused us to die...", status: "Published" },
  { id: 2, title: "Anxiety & Stress", category: "Mental Health", content: "O Allah, I seek refuge in You from anxiety and sorrow...", status: "Published" },
  { id: 3, title: "Seeking Forgiveness", category: "Repentance", content: "I seek forgiveness from Allah, the Great...", status: "Draft" },
];

export default function DuasManagement() {
  const [duas, setDuas] = useState(initialDuas);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary mb-2">Duas Repository</h1>
          <p className="text-on-surface-variant font-medium">Curate the prayers that heal the heart.</p>
        </div>
        <button className="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-container transition-all shadow-lg shadow-primary/10">
          <Plus size={20} />
          <span>Add New Dua</span>
        </button>
      </div>

      <div className="bg-surface-container-low border border-outline-variant/30 rounded-2xl overflow-hidden shadow-meditative">
        <div className="p-6 border-b border-outline-variant/20 flex items-center justify-between bg-surface/50">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={16} />
            <input 
              type="text" 
              placeholder="Filter by title or category..."
              className="w-full bg-surface border border-outline-variant/20 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary transition-all"
            />
          </div>
          <div className="flex gap-2">
            <button className="text-sm font-bold text-primary px-4 py-2 hover:bg-primary/5 rounded-lg transition-colors">Export CSV</button>
            <button className="text-sm font-bold text-primary px-4 py-2 hover:bg-primary/5 rounded-lg transition-colors">Bulk Actions</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container/50">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-primary/60">Title</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-primary/60">Category</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-primary/60">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-primary/60 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {duas.map((dua) => (
                <tr key={dua.id} className="hover:bg-surface/40 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/5 rounded-lg group-hover:bg-primary group-hover:text-on-primary transition-all">
                        <Heart size={16} />
                      </div>
                      <div>
                        <p className="font-bold text-primary">{dua.title}</p>
                        <p className="text-xs text-on-surface-variant truncate max-w-[200px]">{dua.content}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-medium text-on-surface-variant bg-surface px-3 py-1 rounded-full border border-outline-variant/20">
                      {dua.category}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-2 h-2 rounded-full ${dua.status === 'Published' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      <span className="text-sm font-bold text-primary">{dua.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                        <Edit size={18} />
                      </button>
                      <button className="p-2 text-on-surface-variant hover:text-destructive transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-on-surface-variant">Showing 3 of 48 results</p>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm font-bold text-primary hover:bg-primary/5 rounded-lg transition-colors border border-outline-variant/20">Previous</button>
          <button className="px-4 py-2 text-sm font-bold bg-primary text-on-primary rounded-lg transition-all shadow-md">Next</button>
        </div>
      </div>
    </div>
  );
}
