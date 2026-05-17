"use client";

import { useEffect, useState } from "react";
import { Users, Search, MoreVertical, Shield, Trash2, UserCog } from "lucide-react";
import { cn } from "@/lib/utils";
import { authClient, getAuthHeaders } from "@/lib/auth-client";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Custom Modal States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/admin/users`, {
        credentials: "include",
        headers: await getAuthHeaders()
      });

      const data = await response.json();
      if (Array.isArray(data)) {
        setUsers(data);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openDeleteModal = (user: any) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    setIsDeleting(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/admin/users/${userToDelete.id}`, {
        method: "DELETE",
        credentials: "include",
        headers: await getAuthHeaders()
      });
      if (response.ok) {
        setUsers(users.filter(u => u.id !== userToDelete.id));
        closeDeleteModal();
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-serif font-bold text-primary mb-2">User Management</h1>
          <p className="text-on-surface-variant font-medium">Monitor and manage your community members.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search users..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 w-64 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="bg-surface-container-low border border-outline-variant/30 rounded-3xl overflow-hidden shadow-meditative">
        {loading ? (
          <div className="py-24 text-center text-primary font-medium flex items-center justify-center gap-3">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            Loading user directory...
          </div>
        ) : filteredUsers.length > 0 ? (

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/30 bg-surface-container-lowest/50">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary/50">User</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary/50">Role</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary/50">Joined</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary/50">Verification</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary/50 text-right">Actions</th>
              </tr>

            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="group hover:bg-primary/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-primary font-bold overflow-hidden">
                        {user.image ? <img src={user.image} alt={user.name} className="w-full h-full object-cover" /> : user.name?.[0] || "?"}
                      </div>
                      <div>
                        <p className="font-bold text-primary group-hover:text-secondary-container transition-colors">{user.name || "Anonymous"}</p>
                        <p className="text-xs text-on-surface-variant">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold",
                      user.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                    )}>
                      {user.role === "admin" && <Shield size={12} />}
                      {user.role || "user"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-primary">
                      {user.createdAt ? new Intl.DateTimeFormat('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      }).format(new Date(user.createdAt)) : "N/A"}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "w-2 h-2 rounded-full",
                        user.emailVerified ? "bg-emerald-500" : "bg-on-surface-variant/30"
                      )} />
                      <span className="text-xs font-bold uppercase tracking-tight text-on-surface-variant">
                        {user.emailVerified ? "Verified" : "Pending"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => openDeleteModal(user)}
                        className="p-2 text-on-surface-variant hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                        title="Delete User"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
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
            <p className="text-on-surface-variant max-w-sm">The user repository is currently empty or no users match your search.</p>
          </div>
        )}
      </div>

      {/* Reusable Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title="Delete Account?"
        description={
          <>
            Are you sure you want to delete <span className="font-bold text-primary">{userToDelete?.name || userToDelete?.email}</span>? This action is permanent and will cascade delete all their active sessions, course enrollments, and progress.
          </>
        }
        confirmLabel="Delete User"
        isDanger={true}
        isLoading={isDeleting}
      />
    </div>
  );
}

