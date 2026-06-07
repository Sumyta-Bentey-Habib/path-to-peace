"use client";

import { User, Sparkles, AlertCircle, MessageSquare } from "lucide-react";
import { Scholar, ScholarQuestion, SCHOLARS } from "../data";

interface ScholarSelectionProps {
    selectedScholar: Scholar | null;
    setSelectedScholar: (scholar: Scholar) => void;
    startConsultation: (scholar: Scholar, question?: ScholarQuestion) => void;
}

export function ScholarSelection({
    selectedScholar,
    setSelectedScholar,
    startConsultation
}: ScholarSelectionProps) {
    return (
        <div className="max-w-6xl mx-auto text-left">
            <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-border shadow-sm">
                <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                    <User size={22} className="text-primary" />
                    Select a Scholar & Ask a Question
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {SCHOLARS.map((scholar) => {
                        const isSelected = selectedScholar?.id === scholar.id;
                        return (
                            <div
                                key={scholar.id}
                                className={`p-6 rounded-3xl border transition-all text-left flex flex-col justify-between gap-5 relative hover:shadow-md ${
                                    isSelected 
                                        ? "border-primary bg-primary/5 ring-1 ring-primary shadow-sm" 
                                        : "border-border bg-white hover:border-primary/30"
                                }`}
                            >
                                {/* Top: Scholar Info */}
                                <div 
                                    onClick={() => startConsultation(scholar)}
                                    className="space-y-3 cursor-pointer group"
                                    title={`Consult with ${scholar.title} ${scholar.name}`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`w-12 h-12 rounded-2xl ${scholar.avatarBg} flex items-center justify-center text-white font-bold text-base shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform`}>
                                            {scholar.avatarText}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-primary text-base leading-tight group-hover:text-primary-dark transition-colors">
                                                {scholar.title} {scholar.name}
                                            </h4>
                                            <p className="text-xs text-on-surface-variant font-medium mt-1">{scholar.specialization}</p>
                                            <div className="flex items-center gap-1.5 mt-2">
                                                <span className={`w-2 h-2 rounded-full ${
                                                    scholar.status === "online" ? "bg-emerald-500" : scholar.status === "away" ? "bg-amber-400" : "bg-gray-400"
                                                }`} />
                                                <span className="text-[9px] uppercase tracking-wider font-bold text-on-surface-variant/60">
                                                    {scholar.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-on-surface-variant/80 font-medium leading-relaxed line-clamp-3">
                                        {scholar.bio}
                                    </p>
                                </div>

                                {/* Bottom: Predefined Questions */}
                                <div className="border-t border-border/60 pt-4 flex flex-col gap-2">
                                    <span className="text-[10px] font-bold text-primary/60 uppercase tracking-wider block mb-1">
                                        Quick Consultation Questions:
                                    </span>
                                    {scholar.questions.map((q) => (
                                        <button
                                            key={q.id}
                                            onClick={() => startConsultation(scholar, q)}
                                            className="w-full text-left px-4 py-2.5 bg-surface hover:bg-primary/5 border border-border/80 hover:border-primary/40 rounded-xl text-[11px] font-bold text-primary transition-all flex items-center justify-between gap-3 cursor-pointer group/btn"
                                        >
                                            <span className="line-clamp-2">{q.question}</span>
                                            <MessageSquare size={14} className="text-on-surface-variant/40 group-hover/btn:text-primary flex-shrink-0 transition-colors" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
