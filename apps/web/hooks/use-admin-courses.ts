"use client";

import { useEffect, useState, useCallback } from "react";
import { getAuthHeaders } from "@/lib/auth-client";

export interface CourseData {
    _id?: string;
    title: string;
    description: string;
    duration: string;
    instructor: string;
    status: string;
    amount?: string | number;
}

export function useAdminCourses() {
    const [courses, setCourses] = useState<CourseData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCourses = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/admin/courses`,
                {
                    credentials: "include",
                    headers: await getAuthHeaders()
                }
            );
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data)) {
                    setCourses(data);
                }
                setError(null);
            } else {
                setError("Failed to fetch courses");
            }
        } catch (err: any) {
            console.error("Failed to fetch courses:", err);
            setError(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    const createCourse = async (formData: Omit<CourseData, "_id">) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/admin/courses`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        ...(await getAuthHeaders())
                    },
                    body: JSON.stringify(formData)
                }
            );
            if (response.ok) {
                await fetchCourses();
                return true;
            }
            return false;
        } catch (err) {
            console.error("Failed to create course:", err);
            return false;
        }
    };

    const updateCourse = async (id: string, formData: Partial<CourseData>) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/admin/courses/${id}`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        ...(await getAuthHeaders())
                    },
                    body: JSON.stringify(formData)
                }
            );
            if (response.ok) {
                await fetchCourses();
                return true;
            }
            return false;
        } catch (err) {
            console.error("Failed to update course:", err);
            return false;
        }
    };

    const deleteCourse = async (id: string) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/admin/courses/${id}`,
                {
                    method: "DELETE",
                    credentials: "include",
                    headers: await getAuthHeaders()
                }
            );
            if (response.ok) {
                await fetchCourses();
                return true;
            }
            return false;
        } catch (err) {
            console.error("Failed to delete course:", err);
            return false;
        }
    };

    return {
        courses,
        loading,
        error,
        createCourse,
        updateCourse,
        deleteCourse,
        refetch: fetchCourses
    };
}
