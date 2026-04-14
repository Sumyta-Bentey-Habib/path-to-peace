import Link from "next/link";
import { ArrowLeft, Sparkles, Wind } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface relative overflow-hidden font-sans">
      {/* Meditative Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-secondary-container/10 rounded-full blur-3xl animate-bounce duration-[10000ms]" />
      
      <div className="absolute inset-0 star-pattern opacity-5 pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-2xl animate-in fade-in zoom-in duration-1000">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/5 border border-primary/10 mb-8 relative">
          <Wind className="text-primary w-10 h-10 animate-bounce duration-[3000ms]" />
          <Sparkles className="absolute top-0 right-0 text-secondary-container w-6 h-6 animate-pulse" />
        </div>

        <h1 className="text-8xl font-serif font-bold text-primary mb-4 opacity-10">404</h1>
        <h2 className="text-4xl font-serif font-bold text-primary mb-6 -mt-12">The Path Faded</h2>
        
        <p className="text-xl text-on-surface-variant font-medium mb-12 leading-relaxed italic">
          &ldquo;Do not be troubled by the road being invisible; keep your heart clear and the right path will reveal itself.&rdquo;
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/" 
            className="w-full sm:w-auto bg-primary text-on-primary px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-primary-container transition-all shadow-lg hover:shadow-primary/20 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Return to Sanctuary</span>
          </Link>
          <Link 
            href="/login" 
            className="w-full sm:w-auto bg-surface border border-outline-variant/30 text-primary px-8 py-4 rounded-2xl font-bold hover:bg-surface-container-low transition-all"
          >
            Guardian Portal
          </Link>
        </div>

        <div className="mt-20 flex items-center justify-center gap-3 text-primary/30">
          <div className="w-12 h-[1px] bg-current" />
          <span className="text-xs font-bold uppercase tracking-[0.3em]">Path to Peace</span>
          <div className="w-12 h-[1px] bg-current" />
        </div>
      </div>
    </div>
  );
}
