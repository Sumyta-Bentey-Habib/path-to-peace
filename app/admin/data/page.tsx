"use client";

import { useState } from "react";
import { 
  Database, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Plus,
  ArrowUpDown,
  FileJson,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const dataModules = [
  { id: "duas", name: "Duas Collection", count: 48, lastUpdated: "2 hours ago", status: "Active" },
  { id: "blog", name: "Blog Articles", count: 24, lastUpdated: "Yesterday", status: "Active" },
  { id: "feelings", name: "Feeling Tool Mapping", count: 112, lastUpdated: "3 days ago", status: "Review" },
  { id: "quran", name: "Quran Metadata", count: 114, lastUpdated: "Last month", status: "Active" },
  { id: "prayer", name: "Prayer Schedule", count: 365, lastUpdated: "Today", status: "Active" },
];

export default function DataExplorer() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredModules = dataModules.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/5 rounded-lg">
              <Database className="text-primary" size={24} />
            </div>
            <h1 className="text-3xl font-serif font-bold text-primary">Data Sanctuary</h1>
          </div>
          <p className="text-on-surface-variant font-medium">Manage and refine the core wisdom driving Path to Peace.</p>
        </div>
        
        <button className="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-container transition-all shadow-lg shadow-primary/10 group">
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          <span>New Module</span>
        </button>
      </div>

      {/* Control Bar */}
      <div className="bg-surface-container-low border border-outline-variant/30 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
          <input 
            type="text" 
            placeholder="Search collections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface border border-outline-variant/20 rounded-xl py-3 pl-12 pr-4 text-primary focus:outline-none focus:ring-2 focus:ring-primary/5 focus:border-primary transition-all font-medium"
          />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          {["All", "Active", "Review", "Recent"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={cn(
                "px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
                activeTab === tab.toLowerCase() 
                  ? "bg-primary text-on-primary shadow-md" 
                  : "bg-surface hover:bg-surface-container-highest text-on-surface-variant"
              )}
            >
              {tab}
            </button>
          ))}
          <div className="w-[1px] h-8 bg-outline-variant/30 mx-2" />
          <button className="p-2.5 bg-surface border border-outline-variant/20 rounded-xl text-on-surface-variant hover:text-primary transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.map((module) => (
          <div 
            key={module.id}
            className="group bg-surface-container-low border border-outline-variant/30 rounded-2xl p-6 hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-surface rounded-xl border border-outline-variant/10 group-hover:scale-110 transition-transform">
                <FileJson className="text-primary" size={24} />
              </div>
              <button className="p-2 text-on-surface-variant hover:bg-surface rounded-lg">
                <MoreVertical size={18} />
              </button>
            </div>
            
            <h3 className="text-xl font-bold text-primary mb-1">{module.name}</h3>
            <p className="text-sm text-on-surface-variant mb-6 flex items-center gap-1.5">
              {module.status === "Active" ? (
                <CheckCircle2 size={14} className="text-emerald-600" />
              ) : (
                <AlertCircle size={14} className="text-amber-500" />
              )}
              {module.count} records • Updated {module.lastUpdated}
            </p>

            <div className="mt-auto flex items-center justify-between pt-4 border-t border-outline-variant/10">
              <div className="flex -space-x-2">
                {[1, 2].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-surface-container-low bg-secondary-container flex items-center justify-center text-[10px] font-bold text-primary">
                    U{i}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                  <Edit2 size={18} />
                </button>
                <button className="px-4 py-2 bg-primary/5 text-primary rounded-xl font-bold text-sm hover:bg-primary hover:text-on-primary transition-all">
                  Manage
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Placeholder for adding more */}
        <button className="border-2 border-dashed border-outline-variant/30 rounded-2xl p-6 flex flex-col items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary hover:bg-primary/5 transition-all group min-h-[220px]">
          <div className="p-3 rounded-full bg-surface mb-3 group-hover:scale-110 transition-transform">
            <Plus size={24} />
          </div>
          <p className="font-bold">Add New Collection</p>
          <p className="text-xs mt-1">Scale your peaceful empire</p>
        </button>
      </div>
    </div>
  );
}
