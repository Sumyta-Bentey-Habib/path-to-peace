"use client";

import { useEffect, useRef } from "react";
import { X, Clock, HelpCircle, CheckCheck, Send } from "lucide-react";
import { Scholar } from "../data";
import { Message } from "@/hooks/use-scholar-chat";

interface ChatModalProps {
    isOpen: boolean;
    scholar: Scholar | null;
    messages: Message[];
    inputMessage: string;
    setInputMessage: (msg: string) => void;
    isTyping: boolean;
    onSendMessage: (text: string) => void;
    onClose: () => void;
}

export function ChatModal({
    isOpen,
    scholar,
    messages,
    inputMessage,
    setInputMessage,
    isTyping,
    onSendMessage,
    onClose
}: ChatModalProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll chat to bottom
    useEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isTyping, isOpen]);

    if (!isOpen || !scholar) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl border border-border shadow-2xl overflow-hidden w-full max-w-4xl h-[620px] animate-in zoom-in-95 duration-300 grid grid-cols-1 lg:grid-cols-4 relative">
                {/* Close Modal Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-on-surface-variant/70 hover:bg-surface-container hover:text-primary rounded-full transition-all cursor-pointer z-30"
                    title="Close Consultation"
                >
                    <X size={20} />
                </button>

                {/* Chat Info Panel (Left side on desktop) */}
                <div className="lg:col-span-1 border-r border-border bg-surface-container-low/30 p-6 flex flex-col justify-between text-left">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-xl ${scholar.avatarBg} flex items-center justify-center text-white font-bold text-base shadow-sm`}>
                                {scholar.avatarText}
                            </div>
                            <div>
                                <h4 className="font-bold text-primary leading-tight text-sm">
                                    {scholar.title} {scholar.name}
                                </h4>
                                <p className="text-[10px] text-on-surface-variant font-medium mt-0.5">{scholar.specialization}</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <span className="text-[10px] font-bold text-primary/60 uppercase tracking-wider block">Bio</span>
                            <p className="text-[11px] text-on-surface-variant/80 font-medium leading-relaxed">
                                {scholar.bio}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <span className="text-[10px] font-bold text-primary/60 uppercase tracking-wider block">Specialization</span>
                            <div className="p-3 bg-white rounded-xl border border-border flex items-center gap-2.5">
                                <span className="text-xs font-bold text-primary leading-tight">{scholar.specialization}</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-border/60">
                        <div className="flex items-center gap-2 text-on-surface-variant/60">
                            <Clock size={14} />
                            <span className="text-[10px] font-medium">Session started just now</span>
                        </div>
                    </div>
                </div>

                {/* Chat Area (Right side on desktop) */}
                <div className="lg:col-span-3 flex flex-col justify-between h-full bg-white relative">
                    {/* Messages List */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4 max-h-[440px]">
                        {messages.map((msg) => {
                            const isUser = msg.sender === "user";
                            return (
                                <div
                                    key={msg.id}
                                    className={`flex ${isUser ? "justify-end" : "justify-start"} items-start gap-2.5 text-left`}
                                >
                                    {!isUser && (
                                        <div className={`w-8 h-8 rounded-lg ${scholar.avatarBg} flex items-center justify-center text-white text-xs font-bold shadow-sm flex-shrink-0`}>
                                            {scholar.avatarText}
                                        </div>
                                    )}
                                    <div className={`max-w-[75%] rounded-2xl p-4 text-xs font-medium leading-relaxed ${
                                        isUser 
                                            ? "bg-primary text-white rounded-tr-none shadow-sm" 
                                            : "bg-surface-container text-primary rounded-tl-none border border-border"
                                    }`}>
                                        <p className="whitespace-pre-line">{msg.text}</p>
                                        <div className={`flex items-center justify-end gap-1 mt-1 text-[8px] ${isUser ? "text-white/70" : "text-on-surface-variant/50"}`}>
                                            <span>
                                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                            {isUser && <CheckCheck size={10} />}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {isTyping && (
                            <div className="flex justify-start items-center gap-2.5">
                                <div className={`w-8 h-8 rounded-lg ${scholar.avatarBg} flex items-center justify-center text-white text-xs font-bold shadow-sm flex-shrink-0`}>
                                    {scholar.avatarText}
                                </div>
                                <div className="bg-surface-container rounded-2xl p-4 border border-border flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" />
                                    <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                                    <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Suggested Questions & Input Area */}
                    <div className="p-4 border-t border-border bg-surface-container-low/20 space-y-4">
                        {/* Suggested Questions */}
                        {messages.length <= 2 && (
                            <div className="flex flex-col gap-2 items-start">
                                <span className="text-[9px] font-bold text-on-surface-variant/60 uppercase tracking-wider">Suggested Questions</span>
                                <div className="flex flex-wrap gap-2">
                                    {scholar.questions.map((q) => (
                                        <button
                                            key={q.id}
                                            onClick={() => onSendMessage(q.question)}
                                            className="px-3 py-1.5 bg-white border border-border hover:border-primary hover:bg-primary/5 text-primary text-[11px] font-bold rounded-lg transition-all text-left cursor-pointer"
                                        >
                                            {q.question}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Message input */}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                onSendMessage(inputMessage);
                            }}
                            className="flex gap-2 items-center"
                        >
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder={`Type your message or question for ${scholar.title} ${scholar.name}...`}
                                className="flex-1 bg-white border border-border rounded-xl px-4 py-3 text-xs font-medium placeholder-on-surface-variant/40 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-primary"
                            />
                            <button
                                type="submit"
                                disabled={!inputMessage.trim()}
                                className="p-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all disabled:opacity-55 disabled:cursor-not-allowed cursor-pointer shadow-sm"
                            >
                                <Send size={16} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
