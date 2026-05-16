"use client";

import {
  Users,
  Heart,
  FileText,
  Eye,
  TrendingUp,
  Clock,
  ArrowRight,
  BookOpen,
  Activity
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { styles } from "./style";

export default function AdminOverviewUI() {
  const [counts, setCounts] = useState({
    users: 0,
    courses: 0,
    duas: 0,
    feelings: 0
  });
  const [loading, setLoading] = useState(true);
  const activities: any[] = []; 

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/admin/stats`, {
          credentials: "include"
        });
        const data = await response.json();
        if (data && !data.error) {
          setCounts(data);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    { name: "Total Users", value: counts.users.toString(), icon: Users, trend: "+12%", color: "bg-blue-50 text-blue-600", gradient: "from-blue-500/10 to-transparent" },
    { name: "Course Students", value: counts.courses.toString(), icon: BookOpen, trend: "+5%", color: "bg-indigo-50 text-indigo-600", gradient: "from-indigo-500/10 to-transparent" },
    { name: "Feeling Tool Logs", value: counts.feelings.toString(), icon: Heart, trend: "+18%", color: "bg-rose-50 text-rose-600", gradient: "from-rose-500/10 to-transparent" },
    { name: "Active Duas", value: counts.duas.toString(), icon: FileText, trend: "+3%", color: "bg-emerald-50 text-emerald-600", gradient: "from-emerald-500/10 to-transparent" },
  ];

  return (
    <div className={styles.container}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className={styles.header}>Admin Overview</h1>
          <p className={styles.subtitle}>Manage and monitor your application's data and users.</p>

        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-surface-container-low border border-outline-variant/30 rounded-xl flex items-center gap-2">
            <Clock size={16} className="text-primary" />
            <span className="text-sm font-bold text-primary">
              {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <button className="p-2 bg-primary text-on-primary rounded-xl hover:brightness-110 transition-all shadow-lg shadow-primary/20">
            <TrendingUp size={20} />
          </button>
        </div>
      </div>

      <div className={styles.statsGrid}>
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className={cn(styles.statCard, "relative overflow-hidden")}>
              <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50", stat.gradient)} />
              <div className="relative z-10">
                <div className="flex items-start justify-between">
                  <div className={`${stat.color} ${styles.statIconBox}`}>
                    <Icon size={24} />
                  </div>
                  <span className={styles.statTrend}>{stat.trend}</span>
                </div>
                <div className="mt-6">
                  <p className={styles.statName}>{stat.name}</p>
                  <h3 className={styles.statValue}>
                    {loading ? "..." : stat.value}
                  </h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-surface-container-low border border-outline-variant/30 rounded-3xl p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center mb-6">
          <Activity size={40} className="text-primary/30" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-primary mb-2">No Recent Activity</h2>
        <p className="text-on-surface-variant max-w-sm">
          System logs and user interactions will appear here once the platform is active.
        </p>
      </div>

    </div>
  );
}
