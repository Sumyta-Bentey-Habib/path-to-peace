import { 
  Users, 
  Heart, 
  FileText, 
  Eye, 
  TrendingUp, 
  Clock,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { styles } from "./style";

const stats = [
  { name: "Total Duas", value: "48", icon: Heart, trend: "+3 this week", color: "bg-emerald-50 text-emerald-600" },
  { name: "Blog Posts", value: "24", icon: FileText, trend: "+1 today", color: "bg-blue-50 text-blue-600" },
  { name: "Monthly Readers", value: "1,280", icon: Users, trend: "+12.4%", color: "bg-amber-50 text-amber-600" },
  { name: "Avg. Peace Score", value: "8.4", icon: TrendingUp, trend: "+0.2", color: "bg-purple-50 text-purple-600" },
];

export default function AdminOverviewUI() {
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.header}>Welcome Back, Admin</h1>
        <p className={styles.subtitle}>Here's a serene look at your spiritual sanctuary today.</p>
      </div>

      <div className={styles.statsGrid}>
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className={styles.statCard}>
              <div className="flex items-start justify-between">
                <div className={`${stat.color} ${styles.statIconBox}`}>
                  <Icon size={24} />
                </div>
                <span className={styles.statTrend}>{stat.trend}</span>
              </div>
              <div className="mt-4">
                <p className={styles.statName}>{stat.name}</p>
                <h3 className={styles.statValue}>{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.contentSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Content Control</h2>
            <Link href="/admin/duas" className={styles.manageLink}>
              Manage Data <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className={styles.activityItem}>
                <div className="flex items-center gap-4">
                  <div className={styles.itemIconBox}>
                    <Heart size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className={styles.itemTitle}>Morning Remembrance {i}</h4>
                    <p className={styles.itemDesc}>Update the content of this dua</p>
                  </div>
                </div>
                <div className={styles.itemActions}>
                  <button className={styles.btnPill}>Edit</button>
                  <button className={styles.iconBtn}>
                    <Eye size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.quickActionsCard}>
          <div className={styles.ornamentSphere} />
          <h2 className="text-2xl font-serif font-bold mb-6">Quick Actions</h2>
          <div className="space-y-4">
            <button className={styles.actionBtnSecondary}>
              Add New Dua <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
            <button className={styles.actionBtnOutline}>
              Write Blog Post <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
            <button className={styles.actionBtnOutline}>
              Update Quran Metadata <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
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
      </div>
    </div>
  );
}
