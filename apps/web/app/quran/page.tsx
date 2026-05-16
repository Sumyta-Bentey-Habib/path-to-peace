import { Suspense } from "react";
import QuranReaderUI from "./index";

export default function QuranReaderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-surface-container-lowest flex items-center justify-center text-primary font-medium">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mr-3" />
        Opening Quran Reader...
      </div>
    }>
      <QuranReaderUI />
    </Suspense>
  );
}
