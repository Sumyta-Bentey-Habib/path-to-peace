"use client";

import React from "react";
import { BookOpen, Edit2, Trash2, Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { CourseData } from "@/hooks/use-admin-courses";

interface CourseCardProps {
    course: CourseData;
    onEdit: (course: CourseData) => void;
    onDelete: (id: string) => void;
}

export function CourseCard({ course, onEdit, onDelete }: CourseCardProps) {
    return (
        <div className="bg-surface-container-low border border-outline-variant/30 rounded-3xl p-6 shadow-meditative hover:shadow-lg transition-all group relative overflow-hidden text-left">
            <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                    <BookOpen size={24} />
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={() => onEdit(course)}
                        className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-lg transition-all cursor-pointer"
                        title="Edit Course"
                    >
                        <Edit2 size={18} />
                    </button>
                    <button 
                        onClick={() => course._id && onDelete(course._id)}
                        className="p-2 text-on-surface-variant hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                        title="Delete Course"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            <h3 className="text-xl font-serif font-bold text-primary mb-2 group-hover:text-secondary-container transition-colors line-clamp-1">
                {course.title}
            </h3>
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
                <span className="text-lg font-bold text-primary">৳{course.amount || "0"}</span>
            </div>
        </div>
    );
}
