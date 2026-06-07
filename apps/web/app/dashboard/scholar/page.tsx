"use client";

import { authClient } from "@/lib/auth-client";
import { useScholarChat } from "@/hooks/use-scholar-chat";
import { ScholarSelection } from "./components/ScholarSelection";
import { ChatModal } from "./components/ChatModal";

export default function ScholarChatPage() {
    const { data: session } = authClient.useSession();
    const firstName = session?.user?.name ? session.user.name.split(" ")[0] : "user";
    
    const {
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
    } = useScholarChat(firstName);

    if (!session) return null;

    return (
        <div className="space-y-6 pb-12 max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="text-left">
                    <h2 className="text-3xl font-bold text-primary font-serif">Consult a Scholar</h2>
                    <p className="text-xs text-on-surface-variant font-medium mt-1">
                        Find comfort, clarify doubts, and receive spiritual counsel in a safe, private setting.
                    </p>
                </div>
            </div>

            {/* SELECTION SCREEN */}
            <ScholarSelection
                selectedScholar={selectedScholar}
                setSelectedScholar={setSelectedScholar}
                startConsultation={startConsultation}
            />

            {/* CHAT MODAL OVERLAY */}
            <ChatModal
                isOpen={isConsultationActive}
                scholar={selectedScholar}
                messages={messages}
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                isTyping={isTyping}
                onSendMessage={handleSendMessage}
                onClose={handleBack}
            />
        </div>
    );
}
