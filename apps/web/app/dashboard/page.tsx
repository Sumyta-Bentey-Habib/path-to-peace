"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { 
    Sparkles, 
    Heart, 
    Star, 
    Book, 
    GraduationCap, 
    Smile, 
    ChevronRight,
    Compass,
    Clock,
    Trash2,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import { useSavedItems } from "@/hooks/use-saved-items";
import { useEnrolledCourses } from "@/hooks/use-enrolled-courses";
import { SanctuaryCard } from "@/components/dashboard/SanctuaryCard";
import { EmptySanctuaryState } from "@/components/dashboard/EmptySanctuaryState";
import { JourneyItem } from "@/components/dashboard/JourneyItem";
import { FeelingIcon } from "@/components/dashboard/FeelingIcon";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";

export default function DashboardPage() {
    const { data: session } = authClient.useSession();
    const { savedItems, loading: loadingSaved, deleteItemById } = useSavedItems();
    const { enrolledCourses, loading: loadingCourses } = useEnrolledCourses();
    const [activeTab, setActiveTab] = useState<"quran" | "dua" | "feeling">("quran");

    // Custom Modal States
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const loading = loadingSaved || loadingCourses;

    const handleDeleteRequest = (id: string) => {
        setDeleteItemId(id);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!deleteItemId) return;
        setIsDeleting(true);
        try {
            await deleteItemById(deleteItemId);
            setIsDeleteModalOpen(false);
            setDeleteItemId(null);
        } catch (error) {
            console.error("Failed to delete item:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    if (!session) return null;

    const firstName = session.user.name.split(" ")[0];

    // Filter items
    const savedDuas = savedItems.filter(item => item.type === "dua");
    const savedSurahs = savedItems.filter(item => item.type === "quran");
    const savedFeelings = savedItems.filter(item => item.type === "feeling");

    return (
        <div className="space-y-10 pb-12">
            {/* Peaceful Header */}
            <header className="relative py-12 px-10 rounded-[2.5rem] overflow-hidden bg-primary text-white">
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 star-pattern scale-150 rotate-12" />
                <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-widest mb-6">
                        <Sparkles size={12} className="text-secondary-container" />
                        Daily Inspiration
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif leading-tight">
                        Peace be with you, <span className="text-secondary-container">{firstName}</span>.
                    </h2>
                    <p className="text-lg text-white/80 font-medium italic leading-relaxed">
                        "Verily, in the remembrance of Allah do hearts find rest." 
                        <span className="block mt-1 text-sm font-bold not-italic opacity-60">— Surah Ar-Ra'd 13:28</span>
                    </p>
                </div>
                
                <div className="absolute bottom-[-20%] right-[-5%] w-64 h-64 bg-secondary-container/20 blur-[100px] rounded-full" />
            </header>

            {/* Core Sanctuary Tools */}
            <div>
                <div className="flex items-center justify-between mb-6 px-2">
                    <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                        <Compass size={22} />
                        Your Sanctuary
                    </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <SanctuaryCard 
                        title="Saved Duas" 
                        desc={`${savedDuas.length} Supplications`} 
                        icon={<Heart className="text-rose-500" />} 
                        href="/dashboard/saved-duas"
                        progress={Math.min(100, Math.round((savedDuas.length / 10) * 100))}
                        progressColor="bg-rose-500"
                    />
                    <SanctuaryCard 
                        title="Quran Study" 
                        desc={`${savedSurahs.length} Surahs Saved`} 
                        icon={<Book className="text-blue-500" />} 
                        href="/dashboard/saved-quran"
                        progress={Math.min(100, Math.round((savedSurahs.length / 5) * 100))}
                        progressColor="bg-blue-500"
                    />
                    <SanctuaryCard 
                        title="Enrolled Courses" 
                        desc={enrolledCourses.length > 0 ? `${enrolledCourses.length} Active Courses` : "No courses enrolled"} 
                        icon={<GraduationCap className="text-emerald-500" />} 
                        href="/dashboard/courses"
                        progress={enrolledCourses.length > 0 ? 100 : 0}
                        progressColor="bg-emerald-500"
                    />
                    <SanctuaryCard 
                        title="Emotional State" 
                        desc={savedFeelings.length > 0 ? `Reflecting: ${savedFeelings[0].data.label}` : "Reflections"} 
                        icon={<Smile className="text-amber-500" />} 
                        href="/dashboard/saved-feelings"
                        progress={savedFeelings.length > 0 ? 100 : 0}
                        progressColor="bg-amber-500"
                    />
                </div>
            </div>

            {/* Enrolled Courses */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-border shadow-meditative mt-6 text-left">
                <div className="flex items-center justify-between mb-6 px-2">
                    <div>
                        <h3 className="text-2xl font-bold text-primary flex items-center gap-2">
                            <GraduationCap size={24} className="text-emerald-500" />
                            My Enrolled Courses
                        </h3>
                        <p className="text-xs text-on-surface-variant font-medium mt-1">Access your courses, materials, and track your progress.</p>
                    </div>
                </div>
                
                {enrolledCourses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {enrolledCourses.map((course) => (
                            <div key={course._id} className="bg-emerald-50/20 border border-emerald-500/10 p-6 rounded-3xl relative hover:shadow-meditative transition-all duration-300 group flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-[9px] font-bold uppercase tracking-widest text-emerald-700">
                                            Active Student
                                        </span>
                                    </div>
                                    <h4 className="text-xl font-bold text-primary font-serif mb-2">{course.title}</h4>
                                    <p className="text-xs text-on-surface-variant line-clamp-2 font-medium mb-4">{course.description}</p>
                                </div>
                                <Link 
                                    href="/courses" 
                                    className="inline-flex items-center justify-between w-full px-4 py-3 bg-white border border-emerald-500/20 rounded-xl text-xs font-bold text-emerald-700 hover:bg-emerald-600 hover:text-white transition-all group-hover:border-emerald-500 duration-300"
                                >
                                    <span>Continue Course</span>
                                    <ArrowRight size={14} />
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <EmptySanctuaryState 
                        icon={<GraduationCap className="text-emerald-500" size={32} />}
                        title="No Enrolled Courses"
                        desc="Start your journey of divine knowledge. Explore our curated selection of spiritual courses designed to bring tranquility to your heart."
                        btnText="Explore Courses"
                        btnHref="/courses"
                    />
                )}
            </div>

            {/* My Saved Sanctuary */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-border shadow-meditative mt-12 text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h3 className="text-2xl font-bold text-primary flex items-center gap-2">
                            <Compass size={24} className="text-secondary" />
                            My Saved Sanctuary
                        </h3>
                        <p className="text-xs text-on-surface-variant font-medium mt-1">Your bookmarks, supplications, and comforting reflections.</p>
                    </div>

                    {/* Tab Switchers */}
                    <div className="flex bg-surface-container rounded-2xl p-1 gap-1">
                        <button
                            onClick={() => setActiveTab("quran")}
                            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${activeTab === "quran" ? "bg-primary text-white shadow-sm" : "text-on-surface-variant hover:bg-surface-container-highest"}`}
                        >
                            Surahs ({savedSurahs.length})
                        </button>
                        <button
                            onClick={() => setActiveTab("dua")}
                            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${activeTab === "dua" ? "bg-primary text-white shadow-sm" : "text-on-surface-variant hover:bg-surface-container-highest"}`}
                        >
                            Duas ({savedDuas.length})
                        </button>
                        <button
                            onClick={() => setActiveTab("feeling")}
                            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${activeTab === "feeling" ? "bg-primary text-white shadow-sm" : "text-on-surface-variant hover:bg-surface-container-highest"}`}
                        >
                            Feelings ({savedFeelings.length})
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="py-16 text-center text-primary font-medium flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        Retrieving your sanctuary...
                    </div>
                ) : (
                    <div className="animate-in fade-in duration-500">
                        {/* Tab: Quran Surahs */}
                        {activeTab === "quran" && (
                            savedSurahs.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {savedSurahs.map((item) => (
                                        <div key={item._id} className="bg-surface-container-low/40 border border-outline-variant/10 p-6 rounded-3xl relative hover:shadow-meditative transition-all duration-300 group flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start mb-4">
                                                    <span className="px-3 py-1 rounded-full bg-secondary-container/20 text-[9px] font-bold uppercase tracking-widest text-secondary">
                                                        {item.data.revelationType}
                                                    </span>
                                                    <button
                                                        onClick={() => handleDeleteRequest(item._id)}
                                                        className="p-1.5 hover:bg-red-50 text-on-surface-variant/40 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                                                        title="Delete from Sanctuary"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                                <h4 className="text-lg font-bold text-primary font-serif mb-1">
                                                    Surah {item.data.englishName}
                                                </h4>
                                                <p className="text-xs text-on-surface-variant font-medium mb-4">{item.data.numberOfAyahs} Ayahs</p>
                                            </div>
                                            <Link 
                                                href={`/quran?surah=${item.itemId}`}
                                                className="inline-flex items-center justify-between w-full px-4 py-3 bg-white border border-outline-variant/20 rounded-xl text-xs font-bold text-primary hover:bg-primary hover:text-white transition-all group-hover:border-primary duration-300"
                                            >
                                                <span>Read Surah</span>
                                                <ChevronRight size={14} />
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <EmptySanctuaryState 
                                    icon={<Book className="text-blue-500" size={32} />}
                                    title="No Saved Surahs"
                                    desc="Start reading the Quran and bookmark your active study Surahs to track your spiritual journey here."
                                    btnText="Explore Quran"
                                    btnHref="/quran"
                                />
                            )
                        )}

                        {/* Tab: Duas */}
                        {activeTab === "dua" && (
                            savedDuas.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {savedDuas.map((item) => (
                                        <div key={item._id} className="bg-surface-container-low/40 border border-outline-variant/10 p-6 rounded-3xl relative hover:shadow-meditative transition-all duration-300 group flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start mb-4">
                                                    <span className="px-3 py-1 rounded-full bg-primary/5 text-[9px] font-bold uppercase tracking-widest text-primary">
                                                        {item.data.category}
                                                    </span>
                                                    <button
                                                        onClick={() => handleDeleteRequest(item._id)}
                                                        className="p-1.5 hover:bg-red-50 text-on-surface-variant/40 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                                                        title="Delete from Sanctuary"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                                <h4 className="text-lg font-bold text-primary font-serif mb-2 line-clamp-1">{item.data.title}</h4>
                                                <p className="text-xl text-right font-arabic text-primary/85 mb-3 line-clamp-1" dir="rtl">{item.data.arabic}</p>
                                                <p className="text-xs italic text-on-surface-variant/80 mb-4 line-clamp-2">"{item.data.meaning}"</p>
                                            </div>
                                            <Link 
                                                href="/duas"
                                                className="inline-flex items-center justify-between w-full px-4 py-3 bg-white border border-outline-variant/20 rounded-xl text-xs font-bold text-primary hover:bg-primary hover:text-white transition-all group-hover:border-primary duration-300"
                                            >
                                                <span>View in Library</span>
                                                <ChevronRight size={14} />
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <EmptySanctuaryState 
                                    icon={<Heart className="text-rose-500" size={32} />}
                                    title="No Saved Supplications"
                                    desc="Explore the Library of Duas to find comforting prayers and save them here for quick reflection."
                                    btnText="Browse Duas"
                                    btnHref="/duas"
                                />
                            )
                        )}

                        {/* Tab: Feelings */}
                        {activeTab === "feeling" && (
                            savedFeelings.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {savedFeelings.map((item) => (
                                        <div key={item._id} className="bg-surface-container-low/40 border border-outline-variant/10 p-6 rounded-3xl relative hover:shadow-meditative transition-all duration-300 group flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-8 h-8 rounded-xl bg-secondary-container/20 flex items-center justify-center text-secondary">
                                                            <FeelingIcon name={item.data.icon} size={16} />
                                                        </div>
                                                        <span className="text-xs font-bold text-primary uppercase tracking-wider">{item.data.label}</span>
                                                    </div>
                                                    <button
                                                        onClick={() => handleDeleteRequest(item._id)}
                                                        className="p-1.5 hover:bg-red-50 text-on-surface-variant/40 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                                                        title="Delete from Sanctuary"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                                
                                                <div className="border-l-[3px] border-secondary/20 pl-4 mb-4 text-left">
                                                    <span className="text-[8px] font-bold uppercase tracking-widest text-secondary/50">Comforting Quranic Verse</span>
                                                    <p className="text-sm font-serif text-primary mb-1 mt-0.5 leading-relaxed">"{item.data.quran.translation}"</p>
                                                    <span className="text-[9px] text-on-surface-variant font-bold">{item.data.quran.reference}</span>
                                                </div>

                                                <div className="border-l-[3px] border-primary/20 pl-4 mb-4 text-left">
                                                    <span className="text-[8px] font-bold uppercase tracking-widest text-primary/40">Comforting Supplication</span>
                                                    <p className="text-sm font-serif text-primary/80 mb-1 mt-0.5 leading-relaxed">"{item.data.dua.translation}"</p>
                                                </div>
                                            </div>
                                            
                                            <Link 
                                                href="/feeling-tool"
                                                className="inline-flex items-center justify-between w-full px-4 py-3 bg-white border border-outline-variant/20 rounded-xl text-xs font-bold text-primary hover:bg-primary hover:text-white transition-all group-hover:border-primary duration-300 mt-2"
                                            >
                                                <span>Open Feeling Tool</span>
                                                <ChevronRight size={14} />
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <EmptySanctuaryState 
                                    icon={<Smile className="text-amber-500" size={32} />}
                                    title="No Saved States"
                                    desc="Use our Emotional Comfort tool to identify how you feel and save tailored verses/duas here."
                                    btnText="Open Feeling Tool"
                                    btnHref="/feeling-tool"
                                />
                            )
                        )}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Recent Journey */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-[2rem] border border-border shadow-meditative relative overflow-hidden text-left">
                        <h3 className="text-xl font-bold text-primary mb-8 flex items-center gap-2">
                            <Clock size={20} />
                            Recent Journey
                        </h3>
                        
                        <div className="space-y-8 relative">
                            <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-surface-container" />
                            
                            <JourneyItem 
                                title="Evening Reflection" 
                                time="2 hours ago" 
                                desc="You completed your daily gratitude journal entry." 
                                status="completed"
                            />
                            <JourneyItem 
                                title="Quran Reading" 
                                time="5 hours ago" 
                                desc="Read 10 verses of Surah Ar-Rahman." 
                                status="completed"
                            />
                            <JourneyItem 
                                title="Course Milestone" 
                                time="Yesterday" 
                                desc="Finished Module 3: The Power of Prayer." 
                                status="completed"
                            />
                        </div>
                    </div>
                </div>

                {/* Growth Stats */}
                <div className="space-y-6">
                    <div className="bg-surface-container-low p-8 rounded-[2rem] border border-border flex flex-col justify-between min-h-[300px] group hover:bg-white transition-all duration-300 shadow-sm hover:shadow-meditative text-left">
                        <div>
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                                <Star className="text-secondary" size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-2">Spiritual Growth</h3>
                            <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                                You've maintained a 7-day streak! Consistency is the key to inner peace.
                            </p>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <span className="text-3xl font-bold text-primary font-serif">Level 4</span>
                                <span className="text-xs font-bold text-secondary uppercase tracking-widest">1,240 XP</span>
                            </div>
                            <div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden">
                                <div className="h-full bg-secondary w-3/4 rounded-full" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-secondary-container to-secondary/20 p-8 rounded-[2rem] border border-secondary/10 relative overflow-hidden group cursor-pointer text-left">
                        <div className="relative z-10">
                            <h4 className="font-bold text-secondary mb-2 uppercase tracking-tighter text-xs">Recommended for you</h4>
                            <h3 className="text-lg font-bold text-primary mb-4 leading-tight">Mastering Mindfulness in Daily Life</h3>
                            <button className="text-sm font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                                Start Session <ChevronRight size={16} />
                            </button>
                        </div>
                        <Sparkles className="absolute right-[-10px] bottom-[-10px] text-primary/5 w-32 h-32" />
                    </div>
                </div>
            </div>

            {/* Reusable Sanctuary Deletion Confirmation Modal */}
            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setDeleteItemId(null);
                }}
                onConfirm={handleConfirmDelete}
                title="Remove from Sanctuary?"
                description={
                    <>
                        Are you sure you want to remove this item from your sanctuary?
                    </>
                }
                confirmLabel="Remove Item"
                isDanger={true}
                isLoading={isDeleting}
            />
        </div>
    );
}
