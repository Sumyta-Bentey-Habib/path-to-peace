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

const stats = [
  { name: "Total Duas", value: "48", icon: Heart, trend: "+3 this week", color: "bg-emerald-50 text-emerald-600" },
  { name: "Blog Posts", value: "24", icon: FileText, trend: "+1 today", color: "bg-blue-50 text-blue-600" },
  { name: "Monthly Readers", value: "1,280", icon: Users, trend: "+12.4%", color: "bg-amber-50 text-amber-600" },
  { name: "Avg. Peace Score", value: "8.4", icon: TrendingUp, trend: "+0.2", color: "bg-purple-50 text-purple-600" },
];

export default function AdminOverview() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-4xl font-serif font-bold text-primary mb-2">Welcome Back, Admin</h1>
        <p className="text-on-surface-variant font-medium">Here's a serene look at your spiritual sanctuary today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div 
              key={stat.name} 
              className="bg-surface-container-low border border-outline-variant/30 p-6 rounded-2xl shadow-meditative hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-start justify-between">
                <div className={stat.color + " p-3 rounded-xl transition-transform group-hover:scale-110"}>
                  <Icon size={24} />
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-100/50 px-2 py-1 rounded-full">{stat.trend}</span>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-on-surface-variant">{stat.name}</p>
                <h3 className="text-2xl font-bold text-primary mt-1">{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="xl:col-span-2 bg-surface-container-low border border-outline-variant/30 rounded-3xl p-8 shadow-meditative">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-serif font-bold text-primary">Content Control</h2>
            <Link href="/admin/duas" className="text-sm font-bold text-primary flex items-center hover:opacity-70 transition-opacity">
              Manage Data <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between group p-4 rounded-2xl hover:bg-surface transition-colors border border-transparent hover:border-outline-variant/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container-highest flex items-center justify-center">
                    <Heart size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary group-hover:text-secondary-container transition-colors">Morning Remembrance {i}</h4>
                    <p className="text-sm text-on-surface-variant">Update the content of this dua</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 text-sm font-bold text-primary hover:bg-primary/5 rounded-full transition-colors">Edit</button>
                  <button className="p-2 text-on-surface-variant hover:text-destructive hover:bg-destructive/5 rounded-full transition-colors">
                    <Eye size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-primary text-on-primary rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-white/10 transition-colors" />
          <h2 className="text-2xl font-serif font-bold mb-6">Quick Actions</h2>
          <div className="space-y-4">
            <button className="w-full bg-secondary-container text-primary p-4 rounded-xl font-bold flex items-center justify-between group/btn hover:brightness-105 transition-all">
              Add New Dua <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
            <button className="w-full bg-white/10 text-on-primary p-4 rounded-xl font-bold flex items-center justify-between group/btn hover:bg-white/20 transition-all">
              Write Blog Post <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
            <button className="w-full bg-white/10 text-on-primary p-4 rounded-xl font-bold flex items-center justify-between group/btn hover:bg-white/20 transition-all">
              Update Quran Metadata <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <Clock size={16} className="text-secondary-container" />
              <span className="text-xs font-bold uppercase tracking-wider text-white/50">Next Prayer In</span>
            </div>
            <p className="text-3xl font-serif font-bold text-secondary-container">01:42:05</p>
            <p className="text-sm text-white/70 mt-1">Dhuhr Prayer - Dhaka, BD</p>
          </div>
        </div>
      </div>
    </div>
  );
}
