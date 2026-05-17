"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { CourseData } from "@/hooks/use-admin-courses";

interface CourseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: Omit<CourseData, "_id">) => Promise<void>;
    course: CourseData | null;
}

export function CourseModal({ isOpen, onClose, onSubmit, course }: CourseModalProps) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        duration: "",
        instructor: "Admin",
        status: "active",
        amount: ""
    });

    useEffect(() => {
        if (course) {
            setFormData({
                title: course.title,
                description: course.description,
                duration: course.duration,
                instructor: course.instructor,
                status: course.status,
                amount: course.amount ? String(course.amount) : ""
            });
        } else {
            setFormData({
                title: "",
                description: "",
                duration: "",
                instructor: "Admin",
                status: "active",
                amount: ""
            });
        }
    }, [course, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-[2rem] w-full max-w-lg p-8 shadow-2xl animate-in zoom-in-95 duration-300 text-left">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-serif font-bold text-primary">
                        {course ? "Edit Course" : "New Course"}
                    </h2>
                    <button 
                        onClick={onClose} 
                        className="p-2 hover:bg-surface-container-high rounded-full transition-colors cursor-pointer"
                    >
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
                            <label className="block text-sm font-bold text-primary/60 mb-1 ml-1">Amount (৳)</label>
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
                    <button 
                        type="submit" 
                        className="w-full py-4 mt-4 bg-primary text-on-primary rounded-2xl font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20 cursor-pointer"
                    >
                        {course ? "Save Changes" : "Create Course"}
                    </button>
                </form>
            </div>
        </div>
    );
}
