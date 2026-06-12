"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType, duration?: number) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message: string, type: ToastType = "info", duration = 4000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type, duration }]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, [removeToast]);

  const success = useCallback((msg: string, dur?: number) => addToast(msg, "success", dur), [addToast]);
  const error = useCallback((msg: string, dur?: number) => addToast(msg, "error", dur), [addToast]);
  const info = useCallback((msg: string, dur?: number) => addToast(msg, "info", dur), [addToast]);
  const warning = useCallback((msg: string, dur?: number) => addToast(msg, "warning", dur), [addToast]);

  return (
    <ToastContext.Provider value={{ toast: addToast, success, error, info, warning }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onClose={() => removeToast(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

const ToastItem: React.FC<{ toast: Toast; onClose: () => void }> = ({ toast, onClose }) => {
  const { message, type } = toast;

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-600" />,
    error: <AlertCircle className="w-5 h-5 text-rose-600" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-600" />,
    info: <Info className="w-5 h-5 text-blue-600" />,
  };

  const bgStyles = {
    success: "bg-emerald-50/95 border-emerald-100/40 text-emerald-950 shadow-emerald-900/5",
    error: "bg-rose-50/95 border-rose-100/40 text-rose-950 shadow-rose-900/5",
    warning: "bg-amber-50/95 border-amber-100/40 text-amber-950 shadow-amber-900/5",
    info: "bg-blue-50/95 border-blue-100/40 text-blue-950 shadow-blue-900/5",
  };

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-2xl border backdrop-blur-md shadow-xl pointer-events-auto transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 ${bgStyles[type]}`}
      role="alert"
    >
      <div className="flex-shrink-0 mt-0.5">{icons[type]}</div>
      <div className="flex-1 text-sm font-semibold leading-relaxed text-left">{message}</div>
      <button
        onClick={onClose}
        className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors rounded-lg p-0.5 cursor-pointer"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
