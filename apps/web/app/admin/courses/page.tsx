"use client";

import { BookOpen, Plus, MoreVertical, Star, Users, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CoursesPage() {
  const courses: any[] = []; // Data will be from API later

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-serif font-bold text-primary mb-2">Course Management</h1>
          <p className="text-on-surface-variant font-medium">Create and refine educational paths for the soul.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-2xl font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20 group">
          <Plus size={20} className="group-hover:rotate-90 transition-transform" />
          Create New Course
        </button>
      </div>

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-surface-container-low border border-outline-variant/30 rounded-3xl p-6 shadow-meditative hover:shadow-lg transition-all group relative overflow-hidden">
              <div className="flex justify-between items-start mb-6">
                <div className={cn("p-3 rounded-2xl transition-transform group-hover:scale-110", course.color)}>
                  <BookOpen size={24} />
                </div>
                <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-lg transition-all">
                  <MoreVertical size={18} />
                </button>
              </div>

              <h3 className="text-xl font-serif font-bold text-primary mb-2 group-hover:text-secondary-container transition-colors line-clamp-1">{course.title}</h3>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1.5 text-on-surface-variant">
                  <Users size={14} className="text-primary/50" />
                  <span className="text-xs font-bold">{course.students}</span>
                </div>
                <div className="flex items-center gap-1.5 text-on-surface-variant">
                  <Clock size={14} className="text-primary/50" />
                  <span className="text-xs font-bold">{course.lessons} Lessons</span>
                </div>
                <div className="flex items-center gap-1.5 text-on-surface-variant">
                  <Star size={14} className="text-amber-500 fill-amber-500" />
                  <span className="text-xs font-bold">{course.rating}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                  course.status === "Published" ? "bg-emerald-100 text-emerald-700" : "bg-on-surface-variant/10 text-on-surface-variant"
                )}>
                  {course.status}
                </span>
                <button className="text-sm font-bold text-primary hover:underline transition-all">
                  Edit Content
                </button>
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
          <button className="px-6 py-2 border-2 border-primary text-primary rounded-xl font-bold hover:bg-primary hover:text-on-primary transition-all">
            Start Designing
          </button>
        </div>
      )}
    </div>
  );
}
