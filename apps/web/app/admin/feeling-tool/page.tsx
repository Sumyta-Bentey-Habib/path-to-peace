"use client";

import { Heart, Activity, TrendingUp, Settings, Trash2, Edit2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FeelingToolPage() {
  const moods: any[] = []; // Data will be from API later
  const sentiments: any[] = []; // Data will be from API later

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-serif font-bold text-primary mb-2">Feeling Tool Analytics</h1>
          <p className="text-on-surface-variant font-medium">Insights into the emotional well-being of the community.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-3 bg-surface-container-low border border-outline-variant/30 rounded-2xl hover:bg-surface transition-all">
            <Settings size={20} className="text-primary" />
          </button>
          <button className="px-6 py-3 bg-primary text-on-primary rounded-2xl font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20">
            Update Tool Logic
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {moods.length > 0 ? moods.map((mood) => (
          <div key={mood.name} className="bg-surface-container-low border border-outline-variant/30 rounded-3xl p-6 shadow-meditative group">
            <div className="flex justify-between items-start mb-4">
              <span className={cn("px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest", mood.color)}>
                {mood.name}
              </span>
              <span className={cn(
                "text-xs font-bold",
                mood.trend.startsWith("+") ? "text-emerald-600" : "text-rose-600"
              )}>
                {mood.trend}
              </span>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-serif font-bold text-primary">{mood.count}</p>
                <p className="text-xs text-on-surface-variant font-medium uppercase tracking-widest mt-1">Total Logs</p>
              </div>
              <Activity size={32} className="text-primary/10 group-hover:text-primary/20 transition-colors" />
            </div>
          </div>
        )) : [1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-surface-container-low border border-outline-variant/30 rounded-3xl p-6 shadow-meditative animate-pulse">
            <div className="w-16 h-4 bg-surface-container-highest rounded-full mb-4" />
            <div className="w-12 h-8 bg-surface-container-highest rounded mb-1" />
            <div className="w-20 h-3 bg-surface-container-highest rounded" />
          </div>
        ))}
      </div>

      <div className="bg-surface-container-low border border-outline-variant/30 rounded-3xl p-8 shadow-meditative">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-serif font-bold text-primary">Content Configuration</h2>
          <button className="text-sm font-bold text-primary hover:underline">Add New Sentiment</button>
        </div>

        <div className="space-y-4">
          {sentiments.length > 0 ? sentiments.map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-surface border border-outline-variant/10 group hover:border-primary/30 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center">
                  <Heart size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-primary">{item.name}</h4>
                  <p className="text-xs text-on-surface-variant font-medium">Trigger: {item.trigger} • {item.responses} Responses Linked</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-widest mr-4">Updated {item.lastUpdated}</span>
                <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
                  <Edit2 size={16} />
                </button>
                <button className="p-2 text-on-surface-variant hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          )) : (
            <div className="flex flex-col items-center justify-center py-12 text-center text-on-surface-variant">
              <Heart size={32} className="opacity-20 mb-3" />
              <p className="text-sm font-bold">No sentiments configured</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
