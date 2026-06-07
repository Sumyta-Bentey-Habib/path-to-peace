"use client";

import { useState } from "react";
import { Scholar, ScholarQuestion, DEFAULT_RESPONSES } from "@/app/dashboard/scholar/data";

export interface Message {
    id: string;
    sender: "user" | "scholar";
    text: string;
    timestamp: Date;
}

export function useScholarChat(userName: string) {
    const [selectedScholar, setSelectedScholar] = useState<Scholar | null>(null);
    const [isConsultationActive, setIsConsultationActive] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const startConsultation = (scholar: Scholar, initialQuestion?: ScholarQuestion) => {
        setSelectedScholar(scholar);
        setIsConsultationActive(true);
        
        // Initial scholar greeting
        const greeting: Message = {
            id: "greeting",
            sender: "scholar",
            text: `Assalamu Alaikum, ${userName}. I am ${scholar.title} ${scholar.name}. Please select one of the questions below, or ask me anything you have on your mind.`,
            timestamp: new Date()
        };
        
        if (initialQuestion) {
            setMessages([greeting]);
            setTimeout(() => {
                handleSendMessage(initialQuestion.question, scholar, initialQuestion);
            }, 300);
        } else {
            setMessages([greeting]);
        }
    };

    const handleSendMessage = (text: string, overrideScholar?: Scholar, preMatchedQuestion?: ScholarQuestion) => {
        const activeScholar = overrideScholar || selectedScholar;
        if (!activeScholar) return;

        const userMsg: Message = {
            id: `msg-${Date.now()}`,
            sender: "user",
            text,
            timestamp: new Date()
        };

        setMessages((prev) => [...prev, userMsg]);
        setInputMessage("");
        setIsTyping(true);

        // Simulate scholar response
        setTimeout(() => {
            setIsTyping(false);
            
            let responseText = "";
            const matched = preMatchedQuestion || activeScholar.questions.find(q => 
                q.question.toLowerCase().includes(text.toLowerCase().slice(0, 15)) ||
                text.toLowerCase().includes(q.question.toLowerCase().slice(0, 15))
            );
            
            if (matched) {
                responseText = matched.answer;
            } else {
                const randIndex = Math.floor(Math.random() * DEFAULT_RESPONSES.length);
                responseText = DEFAULT_RESPONSES[randIndex];
            }

            const scholarMsg: Message = {
                id: `msg-${Date.now() + 1}`,
                sender: "scholar",
                text: responseText,
                timestamp: new Date()
            };
            setMessages((prev) => [...prev, scholarMsg]);
        }, 1200 + Math.random() * 800);
    };

    const handleBack = () => {
        setIsConsultationActive(false);
        setMessages([]);
    };

    return {
        selectedScholar,
        setSelectedScholar,
        isConsultationActive,
        messages,
        inputMessage,
        setInputMessage,
        isTyping,
        startConsultation,
        handleSendMessage,
        handleBack
    };
}
