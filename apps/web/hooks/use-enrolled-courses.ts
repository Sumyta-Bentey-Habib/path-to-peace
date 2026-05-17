"use client";

import { useEffect, useState, useCallback } from "react";
import { authClient, getAuthHeaders } from "@/lib/auth-client";

export interface EnrolledCourse {
    _id: string;
    title: string;
    description: string;
    duration?: string;
    instructor?: string;
    price?: number;
    lessonsCount?: number;
    enrolledAt?: string;
}

export function useEnrolledCourses() {
    const { data: session } = authClient.useSession();
    const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchEnrolledCourses = useCallback(async () => {
        if (!session) {
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/courses/enrolled`,
                {
                    credentials: "include",
                    headers: await getAuthHeaders()
                }
            );
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data)) {
                    setEnrolledCourses(data);
                } else {
                    setEnrolledCourses([]);
                }
                setError(null);
            } else {
                setError("Failed to fetch enrolled courses");
            }
        } catch (err: any) {
            console.error("Failed to fetch enrolled courses:", err);
            setError(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    }, [session]);

    useEffect(() => {
        if (session) {
            fetchEnrolledCourses();
        } else {
            setEnrolledCourses([]);
            setLoading(false);
        }
    }, [session, fetchEnrolledCourses]);

    return {
        enrolledCourses,
        loading,
        error,
        refetch: fetchEnrolledCourses
    };
}
