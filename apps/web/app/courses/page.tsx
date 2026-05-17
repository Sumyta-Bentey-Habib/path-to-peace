"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Clock, User, ChevronRight, Sparkles, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { authClient, getAuthHeaders } from "@/lib/auth-client";

export default function CoursesPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [courses, setCourses] = useState<any[]>([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrollingId, setEnrollingId] = useState<string | null>(null);

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/courses`);
      const data = await response.json();
      if (Array.isArray(data)) setCourses(data);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEnrolledCourses = async () => {
    if (!session) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/courses/enrolled`, {
        credentials: "include",
        headers: await getAuthHeaders()
      });
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setEnrolledCourseIds(data.map((c: any) => c._id));
        }
      }
    } catch (error) {
      console.error("Failed to fetch enrolled courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (session) {
      fetchEnrolledCourses();
    } else {
      setEnrolledCourseIds([]);
    }
  }, [session]);

  const handleEnroll = async (course: any) => {
    if (!session) {
      // Redirect to login if user is not authenticated
      router.push("/login?redirect=/courses");
      return;
    }

    const isEnrolled = enrolledCourseIds.includes(course._id);
    if (isEnrolled) {
      // Redirect directly to dashboard to study the course
      router.push("/dashboard");
      return;
    }

    try {
      setEnrollingId(course._id);
      const isPaid = Number(course.amount) > 0;

      if (isPaid) {
        console.log(`[Checkout] Initiating SSLCommerz checkout session for Course: ${course._id}`);
        // Call backend API to initiate SSLCommerz session
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/payment/initiate`, {
          method: "POST",
          credentials: "include",
          headers: await getAuthHeaders(true),
          body: JSON.stringify({ courseId: course._id })
        });

        const data = await response.json();

        if (response.ok && data.url) {
          // Redirect the browser window to SSLCommerz Sandbox payment page
          window.location.href = data.url;
        } else {
          alert(data.message || "Failed to initiate transaction with payment gateway. Please try again.");
        }
      } else {
        console.log(`[Enrollment] Enrolling user in free course: ${course._id}`);
        // Call backend free enrollment API
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/courses/enroll-free`, {
          method: "POST",
          credentials: "include",
          headers: await getAuthHeaders(true),
          body: JSON.stringify({ courseId: course._id })
        });

        const data = await response.json();

        if (response.ok) {
          setEnrolledCourseIds(prev => [...prev, course._id]);
          router.push("/dashboard");
        } else {
          alert(data.message || "Failed to enroll in course. Please try again.");
        }
      }
    } catch (error) {
      console.error("[CoursesPage] Enrollment Action Error:", error);
      alert("An unexpected error occurred during course checkout. Please try again later.");
    } finally {
      setEnrollingId(null);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-surface py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest">
                <Sparkles size={14} />
                <span>Divine Knowledge</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary">
                Our <span className="italic text-primary/60">Courses</span>
              </h1>
              <p className="text-lg text-on-surface-variant max-w-2xl font-medium">
                Embark on a journey of spiritual growth and enlightenment through our curated selection of courses designed to bring tranquility to your heart.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[400px] bg-surface-container-low rounded-[2.5rem] animate-pulse" />
              ))}
            </div>
          ) : courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => {
                const isEnrolled = enrolledCourseIds.includes(course._id);
                const isEnrolling = enrollingId === course._id;
                const isPaid = Number(course.amount) > 0;

                return (
                  <div key={course._id} className="group bg-surface-container-low border border-outline-variant/30 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2">
                    <div className="p-8 space-y-6">
                      <div className="flex justify-between items-start">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors duration-500">
                          <BookOpen size={28} />
                        </div>
                        <div className="text-2xl font-bold text-primary">
                          {isPaid ? `৳${course.amount}` : "Free"}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-2xl font-serif font-bold text-primary mb-3 group-hover:text-primary/80 transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-on-surface-variant line-clamp-3 font-medium">
                          {course.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-6 pt-4 border-t border-outline-variant/10">
                        <div className="flex items-center gap-2 text-on-surface-variant/70">
                          <Clock size={16} />
                          <span className="text-xs font-bold">{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-on-surface-variant/70">
                          <User size={16} />
                          <span className="text-xs font-bold">{course.instructor}</span>
                        </div>
                      </div>

                      <Button 
                        onClick={() => handleEnroll(course)}
                        disabled={isEnrolling}
                        className={cn(
                          "w-full rounded-2xl py-6 font-bold flex items-center justify-between group/btn cursor-pointer transition-colors duration-300",
                          isEnrolled
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                            : "bg-primary text-on-primary hover:bg-primary/90"
                        )}
                      >
                        {isEnrolling ? (
                          <>
                            <span>Connecting gateway...</span>
                            <Loader2 className="animate-spin" size={18} />
                          </>
                        ) : isEnrolled ? (
                          <>
                            <span>Access Course</span>
                            <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                          </>
                        ) : (
                          <>
                            <span>{isPaid ? "Buy Course" : "Enroll Free"}</span>
                            <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-24 bg-surface-container-low rounded-[3rem] border border-dashed border-outline-variant/50">
              <BookOpen className="w-16 h-16 text-primary/20 mx-auto mb-4" />
              <h3 className="text-2xl font-serif font-bold text-primary mb-2">No Courses Available</h3>
              <p className="text-on-surface-variant font-medium">Check back soon for new paths to peace.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
