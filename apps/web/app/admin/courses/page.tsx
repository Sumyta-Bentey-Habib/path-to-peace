"use client";

import { useEffect, useState } from "react";
import { BookOpen, Plus, MoreVertical, Star, Users, Clock, Edit2, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    instructor: "Admin",
    status: "active",
    amount: ""
  });

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/admin/courses`, {
        credentials: "include"
      });
      const data = await response.json();
      if (Array.isArray(data)) setCourses(data);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingCourse 
      ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/admin/courses/${editingCourse._id}`
      : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/admin/courses`;
    
    const method = editingCourse ? "PATCH" : "POST";

    try {
      const response = await fetch(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setIsModalOpen(false);
        setEditingCourse(null);
        setFormData({ title: "", description: "", duration: "", instructor: "Admin", status: "active", amount: "" });
        fetchCourses();
      }
    } catch (error) {
      console.error("Failed to save course:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/admin/courses/${id}`, {
        method: "DELETE",
        credentials: "include"
      });
      if (response.ok) fetchCourses();
    } catch (error) {
      console.error("Failed to delete course:", error);
    }
  };

  const openEditModal = (course: any) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      duration: course.duration,
      instructor: course.instructor,
      status: course.status,
      amount: course.amount || ""
    });
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-serif font-bold text-primary mb-2">Course Management</h1>
          <p className="text-on-surface-variant font-medium">Create and refine educational paths for the soul.</p>
        </div>
        <button 
          onClick={() => { 
            setEditingCourse(null); 
            setFormData({
              title: "",
              description: "",
              duration: "",
              instructor: "Admin",
              status: "active",
              amount: ""
            });
            setIsModalOpen(true); 
          }}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-2xl font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20 group"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform" />
          Create New Course
        </button>
      </div>

      {loading ? (
        <div className="py-24 text-center text-primary font-medium">Loading courses...</div>
      ) : courses.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course._id} className="bg-surface-container-low border border-outline-variant/30 rounded-3xl p-6 shadow-meditative hover:shadow-lg transition-all group relative overflow-hidden">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                  <BookOpen size={24} />
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => openEditModal(course)}
                    className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(course._id)}
                    className="p-2 text-on-surface-variant hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-serif font-bold text-primary mb-2 group-hover:text-secondary-container transition-colors line-clamp-1">{course.title}</h3>
              <p className="text-sm text-on-surface-variant line-clamp-2 mb-4">{course.description}</p>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1.5 text-on-surface-variant">
                  <Clock size={14} className="text-primary/50" />
                  <span className="text-xs font-bold">{course.duration}</span>
                </div>
                <div className="flex items-center gap-1.5 text-on-surface-variant">
                  <Users size={14} className="text-primary/50" />
                  <span className="text-xs font-bold">{course.instructor}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                  course.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-on-surface-variant/10 text-on-surface-variant"
                )}>
                  {course.status}
                </span>
                <span className="text-lg font-bold text-primary">${course.amount || "0.00"}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-surface-container-low border border-outline-variant/30 rounded-3xl py-24 flex flex-col items-center justify-center text-center shadow-meditative">
          <div className="w-20 h-20 rounded-full bg-surface-container-highest flex items-center justify-center mb-6">
            <BookOpen size={40} className="text-primary/20" />
          </div>
          <h3 className="text-xl font-serif font-bold text-primary mb-2">No Courses Yet</h3>
          <p className="text-on-surface-variant max-w-sm mb-8">Begin your teaching journey by creating your first course modules.</p>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-[2rem] w-full max-w-lg p-8 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif font-bold text-primary">{editingCourse ? "Edit Course" : "New Course"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-surface-container-high rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-primary/60 mb-1 ml-1">Title</label>
                <input 
                  required
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-primary/60 mb-1 ml-1">Description</label>
                <textarea 
                  required
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all h-24"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-primary/60 mb-1 ml-1">Duration</label>
                  <input 
                    value={formData.duration}
                    onChange={e => setFormData({...formData, duration: e.target.value})}
                    placeholder="e.g. 4 Weeks"
                    className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-primary/60 mb-1 ml-1">Status</label>
                  <select 
                    value={formData.status}
                    onChange={e => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  >
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-primary/60 mb-1 ml-1">Amount ($)</label>
                  <input 
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={e => setFormData({...formData, amount: e.target.value})}
                    placeholder="0.00"
                    className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>
              <button type="submit" className="w-full py-4 mt-4 bg-primary text-on-primary rounded-2xl font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20">
                {editingCourse ? "Save Changes" : "Create Course"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

