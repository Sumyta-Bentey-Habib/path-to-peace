"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      router.push("/admin");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-surface">
      {/* Background with Generated Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 scale-105"
        style={{ backgroundImage: `url('/images/login-bg.png')` }}
      />
      <div className="absolute inset-0 z-1 bg-gradient-to-tr from-primary/40 via-surface/40 to-transparent backdrop-blur-[2px]" />

      {/* Ornament Details */}
      <div className="absolute top-10 left-10 z-10 hidden lg:block">
        <Link href="/" className="flex items-center space-x-2 text-primary group">
          <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-all">
            <ArrowRight className="rotate-180" size={18} />
          </div>
          <span className="font-serif font-bold text-xl tracking-tight">Path to Peace</span>
        </Link>
      </div>

      <div className="relative z-10 w-full max-w-md px-6 animate-in fade-in zoom-in-95 duration-700">
        <div className="glassmorphism ghost-border rounded-[2.5rem] p-10 shadow-meditative overflow-hidden relative">
          {/* Subtle star pattern overlay */}
          <div className="absolute inset-0 star-pattern opacity-10 pointer-events-none" />

          <div className="relative z-10">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-serif font-bold text-primary mb-3">Admin Sanctuary</h1>
              <p className="text-on-surface-variant font-medium">Continue your journey of stewardship</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary/70 ml-1">Email Sanctuary</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors" size={20} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="guardian@pathtopeace.com"
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl py-4 pl-12 pr-4 text-primary placeholder:text-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-bold text-primary/70">Secret Key</label>
                  <button type="button" className="text-xs font-bold text-primary hover:text-secondary-container transition-colors">Forgotten?</button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors" size={20} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl py-4 pl-12 pr-4 text-primary placeholder:text-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-on-primary py-5 rounded-2xl font-bold flex items-center justify-center space-x-3 hover:bg-primary-container shadow-lg shadow-primary/10 transform active:scale-95 transition-all disabled:opacity-70 group"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Enter Sanctuary</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] flex-1 bg-outline-variant/30" />
                <span className="text-xs font-bold text-primary/30 uppercase tracking-widest">Divine Auth</span>
                <div className="h-[1px] flex-1 bg-outline-variant/30" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-3 bg-surface-container-low border border-outline-variant/30 py-4 rounded-xl hover:bg-surface transition-colors">
                  <div className="w-5 h-5 bg-[#4285F4] rounded-full" />
                  <span className="text-sm font-bold text-primary">Google</span>
                </button>
                <button className="flex items-center justify-center gap-3 bg-surface-container-low border border-outline-variant/30 py-4 rounded-xl hover:bg-surface transition-colors">
                  <div className="w-5 h-5 bg-primary rounded-full" />
                  <span className="text-sm font-bold text-primary">GitHub</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center mt-8 text-sm font-medium text-primary/60">
          Not a guardian? <Link href="/contact" className="text-primary font-bold hover:text-secondary-container transition-colors">Apply for stewardship</Link>
        </p>
      </div>
    </div>
  );
}
