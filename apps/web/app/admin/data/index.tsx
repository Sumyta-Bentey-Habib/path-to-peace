"use client";

import { useState } from "react";
import { 
  Database, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Plus,
  FileJson,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { styles } from "./style";

const dataModules = [
  { id: "duas", name: "Duas Collection", count: 48, lastUpdated: "2 hours ago", status: "Active" },
  { id: "feelings", name: "Feeling Tool Mapping", count: 112, lastUpdated: "3 days ago", status: "Review" },
  { id: "quran", name: "Quran Metadata", count: 114, lastUpdated: "Last month", status: "Active" },
  { id: "prayer", name: "Prayer Schedule", count: 365, lastUpdated: "Today", status: "Active" },
];

export default function DataExplorerUI() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredModules = dataModules.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.headerBox}>
        <div>
          <div className={styles.titleWrapper}>
            <div className={styles.iconBg}>
              <Database className="text-primary" size={24} />
            </div>
            <h1 className={styles.pageTitle}>Data Sanctuary</h1>
          </div>
          <p className={styles.pageDesc}>Manage and refine the core wisdom driving Path to Peace.</p>
        </div>
        
        <button className={styles.newModuleBtn}>
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          <span>New Module</span>
        </button>
      </div>

      <div className={styles.controlBar}>
        <div className={styles.searchBox}>
          <Search className={styles.searchIcon} size={18} />
          <input 
            type="text" 
            placeholder="Search collections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        
        <div className={styles.tabsWrapper}>
          {["All", "Active", "Review", "Recent"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={cn(
                styles.tabBtn,
                activeTab === tab.toLowerCase() ? styles.tabBtnActive : styles.tabBtnInactive
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

      <div className={styles.moduleGrid}>
        {filteredModules.map((module) => (
          <div key={module.id} className={styles.moduleCard}>
            <div className="flex items-start justify-between mb-4">
              <div className={styles.cardIconBox}>
                <FileJson className="text-primary" size={24} />
              </div>
              <button className={styles.cardMoreBtn}>
                <MoreVertical size={18} />
              </button>
            </div>
            
            <h3 className={styles.cardTitle}>{module.name}</h3>
            <p className={styles.cardStatus}>
              {module.status === "Active" ? (
                <CheckCircle2 size={14} className="text-emerald-600" />
              ) : (
                <AlertCircle size={14} className="text-amber-500" />
              )}
              {module.count} records • Updated {module.lastUpdated}
            </p>

            <div className={styles.cardFooter}>
              <div className="flex -space-x-2">
                {[1, 2].map((i) => (
                  <div key={i} className={styles.userBadge}>
                    U{i}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                  <Edit2 size={18} />
                </button>
                <button className={styles.manageBtn}>
                  Manage
                </button>
              </div>
            </div>
          </div>
        ))}
        
        <button className={styles.addCard}>
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
