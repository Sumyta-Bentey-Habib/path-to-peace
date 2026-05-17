import React from "react";
import { Trash2, HelpCircle } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  description: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  isDanger?: boolean;
  isLoading?: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isDanger = true,
  isLoading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-surface-container-low border border-outline-variant/30 rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col items-center text-center">
        
        {/* Visual Glow */}
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-inner ${
          isDanger ? "bg-red-50 text-red-500" : "bg-primary/10 text-primary"
        }`}>
          {isDanger ? <Trash2 size={28} /> : <HelpCircle size={28} />}
        </div>

        {/* Modal Title */}
        <h3 className="text-2xl font-serif font-bold text-primary mb-2">{title}</h3>
        
        {/* Modal Description */}
        <div className="text-on-surface-variant font-medium mb-8 leading-relaxed">
          {description}
        </div>

        {/* Actions Button Group */}
        <div className="flex gap-4 w-full">
          <button
            disabled={isLoading}
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-surface-container-highest hover:bg-surface-container-highest/80 text-primary font-bold rounded-2xl transition-all cursor-pointer disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            disabled={isLoading}
            onClick={onConfirm}
            className={`flex-1 py-3 px-4 text-white font-bold rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 ${
              isDanger 
                ? "bg-red-600 hover:bg-red-700 shadow-red-600/20" 
                : "bg-primary hover:bg-primary/95 shadow-primary/20"
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              confirmLabel
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
