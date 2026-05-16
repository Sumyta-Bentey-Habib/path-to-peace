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
import { cn } from "@/lib/utils";
import { styles } from "./style";

const stats = [
  { name: "Total Users", value: "0", icon: Users, trend: "---", color: "bg-blue-50 text-blue-600", gradient: "from-blue-500/10 to-transparent" },
  { name: "Course Students", value: "0", icon: BookOpen, trend: "---", color: "bg-indigo-50 text-indigo-600", gradient: "from-indigo-500/10 to-transparent" },
  { name: "Feeling Tool Logs", value: "0", icon: Heart, trend: "---", color: "bg-rose-50 text-rose-600", gradient: "from-rose-500/10 to-transparent" },
  { name: "Active Duas", value: "0", icon: FileText, trend: "---", color: "bg-emerald-50 text-emerald-600", gradient: "from-emerald-500/10 to-transparent" },
];

export default function AdminOverviewUI() {
  const activities: any[] = []; // Data will be from API later

  return (
    <div className={styles.container}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className={styles.header}>Spiritual Dashboard</h1>
          <p className={styles.subtitle}>Welcome back, Admin. Your sanctuary is thriving with peace.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-surface-container-low border border-outline-variant/30 rounded-xl flex items-center gap-2">
            <Clock size={16} className="text-primary" />
            <span className="text-sm font-bold text-primary">May 17, 2026</span>
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
                  <h3 className={styles.statValue}>{stat.value}</h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.contentSection}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Recent Activity</h2>
              <p className="text-xs text-on-surface-variant font-medium mt-1">Real-time updates from across the platform</p>
            </div>
            <Link href="/admin/data" className={styles.manageLink}>
              View All Logs <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="space-y-4">
            {activities.length > 0 ? activities.map((activity, i) => (
              <div key={i} className={styles.activityItem}>
                <div className="flex items-center gap-4">
                  <div className={cn(styles.itemIconBox, activity.bgColor)}>
                    <activity.icon size={20} className={activity.iconColor} />
                  </div>
                  <div>
                    <h4 className={styles.itemTitle}>{activity.title}</h4>
                    <p className={styles.itemDesc}>{activity.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-tighter">{activity.time}</span>
                  <div className={styles.itemActions}>
                    <button className={styles.iconBtn}>
                      <Eye size={18} />
                    </button>
                  </div>
                </div>
              </div>
            )) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mb-4">
                  <Activity size={32} className="text-primary/20" />
                </div>
                <p className="font-bold text-primary">No recent activity</p>
                <p className="text-sm text-on-surface-variant max-w-[200px]">Once users interact with the platform, updates will appear here.</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className={styles.quickActionsCard}>
            <div className={styles.ornamentSphere} />
            <h2 className="text-2xl font-serif font-bold mb-6 relative z-10">Administrative Actions</h2>
            <div className="space-y-3 relative z-10">
              <button className={styles.actionBtnSecondary}>
                Manage Courses <BookOpen size={18} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
              <button className={styles.actionBtnOutline}>
                Update Feeling Tool <Heart size={18} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
              <button className={styles.actionBtnOutline}>
                Review User Reports <Users size={18} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className={styles.prayerTimerPill}>
              <div className="flex items-center gap-3 mb-2">
                <Clock size={16} className="text-secondary-container" />
                <span className={styles.timerLabel}>Next Prayer In</span>
              </div>
              <p className={styles.timerValue}>01:42:05</p>
              <p className={styles.timerDesc}>Dhuhr Prayer - Dhaka, BD</p>
            </div>
          </div>

          <div className="bg-surface-container-low border border-outline-variant/30 rounded-3xl p-6 shadow-meditative">
            <h3 className="text-lg font-serif font-bold text-primary mb-4">System Health</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Server Load</span>
                  <span>24%</span>
                </div>
                <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[24%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Storage Used</span>
                  <span>68%</span>
                </div>
                <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 w-[68%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
