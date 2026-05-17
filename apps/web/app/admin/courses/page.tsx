"use client";

import { useState } from "react";
import { BookOpen, Plus } from "lucide-react";
import { useAdminCourses, CourseData } from "@/hooks/use-admin-courses";
import { CourseCard } from "@/components/admin/CourseCard";
import { CourseModal } from "@/components/admin/CourseModal";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";

export default function CoursesPage() {
  const { 
    courses, 
    loading, 
    createCourse, 
    updateCourse, 
    deleteCourse 
  } = useAdminCourses();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<CourseData | null>(null);

  // Custom Modal States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteCourseId, setDeleteCourseId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleOpenCreateModal = () => {
    setEditingCourse(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (course: CourseData) => {
    setEditingCourse(course);
    setIsModalOpen(true);
  };

  const handleDeleteRequest = (id: string) => {
    setDeleteCourseId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteCourseId) return;
    setIsDeleting(true);
    try {
      await deleteCourse(deleteCourseId);
      setIsDeleteModalOpen(false);
      setDeleteCourseId(null);
    } catch (error) {
      console.error("Failed to delete course:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleFormSubmit = async (formData: Omit<CourseData, "_id">) => {
    let success = false;
    if (editingCourse && editingCourse._id) {
      success = await updateCourse(editingCourse._id, formData);
    } else {
      success = await createCourse(formData);
    }
    if (success) {
      setIsModalOpen(false);
      setEditingCourse(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-serif font-bold text-primary mb-2">Course Management</h1>
          <p className="text-on-surface-variant font-medium">Create and refine educational paths for the soul.</p>
        </div>
        <button 
          onClick={handleOpenCreateModal}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-2xl font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20 group cursor-pointer"
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
            <CourseCard 
              key={course._id}
              course={course}
              onEdit={handleOpenEditModal}
              onDelete={handleDeleteRequest}
            />
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

      <CourseModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        course={editingCourse}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeleteCourseId(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Course?"
        description={
          <>
            Are you sure you want to delete this course? This action is permanent and cannot be undone. All user enrollments and progress for this course will be lost.
          </>
        }
        confirmLabel="Delete Course"
        isDanger={true}
        isLoading={isDeleting}
      />
    </div>
  );
}
