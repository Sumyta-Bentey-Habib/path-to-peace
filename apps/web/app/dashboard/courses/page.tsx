"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { GraduationCap, Search, ChevronRight, BookOpen, Clock, Users } from "lucide-react";
import Link from "next/link";
import { useEnrolledCourses } from "@/hooks/use-enrolled-courses";
import { EmptySanctuaryState } from "@/components/dashboard/EmptySanctuaryState";

export default function PurchasedCoursesPage() {
    const { data: session } = authClient.useSession();
    const { enrolledCourses, loading } = useEnrolledCourses();
    const [searchQuery, setSearchQuery] = useState("");

    if (!session) return null;

    const filteredCourses = enrolledCourses.filter((course) => {
        const title = course.title || "";
        const desc = course.description || "";
        const q = searchQuery.toLowerCase();
        return (
            title.toLowerCase().includes(q) ||
            desc.toLowerCase().includes(q)
        );
    });

    return (
        <div className="space-y-8 text-left animate-in fade-in duration-500">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-primary flex items-center gap-3">
                        <GraduationCap className="text-emerald-500" size={32} />
                        My Courses
                    </h2>
                    <p className="text-on-surface-variant mt-1 font-medium">Access your purchased courses, study guides, and lesson checkpoints.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/courses" className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/10 hover:bg-primary-container transition-all hover:scale-105 active:scale-95">
                        <BookOpen size={16} />
                        Browse All Courses
                    </Link>
                </div>
            </header>

            {/* Search */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60 group-focus-within:text-primary transition-colors" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search your purchased courses..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                    />
                </div>
            </div>

            {loading ? (
                <div className="py-24 text-center text-primary font-medium flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    Loading your courses...
                </div>
            ) : filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => (
                        <div key={course._id} className="bg-white p-6 rounded-3xl border border-border hover:shadow-meditative transition-all duration-300 group flex flex-col justify-between min-h-[220px]">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-[9px] font-bold uppercase tracking-widest text-emerald-700">
                                        Active Student
                                    </span>
                                </div>
                                <h4 className="text-lg font-bold text-primary font-serif mb-2 line-clamp-1">
                                    {course.title}
                                </h4>
                                <p className="text-xs text-on-surface-variant line-clamp-2 font-medium mb-4">
                                    {course.description}
                                </p>
                                
                                <div className="flex items-center gap-4 mb-4 text-xs font-bold text-on-surface-variant/80">
                                    {course.duration && (
                                        <div className="flex items-center gap-1">
                                            <Clock size={12} className="text-emerald-500" />
                                            <span>{course.duration}</span>
                                        </div>
                                    )}
                                    {course.instructor && (
                                        <div className="flex items-center gap-1">
                                            <Users size={12} className="text-emerald-500" />
                                            <span>{course.instructor}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <Link 
                                href="/courses"
                                className="inline-flex items-center justify-between w-full px-4 py-3 bg-emerald-50/30 border border-emerald-500/15 rounded-xl text-xs font-bold text-emerald-700 hover:bg-emerald-600 hover:text-white transition-all duration-300"
                            >
                                <span>Continue Course</span>
                                <ChevronRight size={14} />
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <EmptySanctuaryState 
                    icon={<GraduationCap className="text-emerald-500" size={32} />}
                    title={searchQuery ? "No matching courses" : "No purchased courses yet"}
                    desc={searchQuery ? "No purchased courses match your search query." : "Uplift your understanding and learning. Explore our catalog of spiritual courses and start learning today."}
                    btnText="Browse Courses"
                    btnHref="/courses"
                />
            )}
        </div>
    );
}
