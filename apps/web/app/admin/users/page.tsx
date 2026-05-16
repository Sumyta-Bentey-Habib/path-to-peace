"use client";

import { Users, Search, MoreVertical, Shield, Mail, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export default function UsersPage() {
  const users: any[] = []; // Data will be from API later

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-serif font-bold text-primary mb-2">User Sanctuary</h1>
          <p className="text-on-surface-variant font-medium">Manage and nurture your growing community.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search users..." 
              className="pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 w-64 transition-all"
            />
          </div>
          <button className="px-6 py-2 bg-primary text-on-primary rounded-xl font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20">
            Export Data
          </button>
        </div>
      </div>

      <div className="bg-surface-container-low border border-outline-variant/30 rounded-3xl overflow-hidden shadow-meditative">
        {users.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/30 bg-surface-container-lowest/50">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary/50">User</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary/50">Role</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary/50">Joined</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary/50">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary/50">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {users.map((user) => (
                <tr key={user.id} className="group hover:bg-primary/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-primary font-bold">
                        {user.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-primary group-hover:text-secondary-container transition-colors">{user.name}</p>
                        <p className="text-xs text-on-surface-variant">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold",
                      user.role === "Moderator" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                    )}>
                      {user.role === "Moderator" && <Shield size={12} />}
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant font-medium">
                    {user.joined}
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "w-2 h-2 rounded-full inline-block mr-2",
                      user.status === "Active" ? "bg-emerald-500 animate-pulse" : "bg-on-surface-variant/30"
                    )} />
                    <span className="text-sm font-bold">{user.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-lg transition-all">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-full bg-surface-container-highest flex items-center justify-center mb-6">
              <Users size={40} className="text-primary/20" />
            </div>
            <h3 className="text-xl font-serif font-bold text-primary mb-2">No Users Found</h3>
            <p className="text-on-surface-variant max-w-sm">The user repository is currently empty. Once users register, they will appear here for management.</p>
          </div>
        )}
      </div>
    </div>
  );
}
