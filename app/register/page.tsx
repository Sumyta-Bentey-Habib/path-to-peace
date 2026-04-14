"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, User, ShieldCheck } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate registration
    setTimeout(() => {
      setIsLoading(false);
      router.push("/login");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-surface">
      {/* Background Shared with Login */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 scale-105"
        style={{ backgroundImage: `url('/images/login-bg.png')` }}
      />
      <div className="absolute inset-0 z-1 bg-gradient-to-br from-primary/60 via-surface/30 to-secondary-container/20 backdrop-blur-[2px]" />

      <div className="relative z-10 w-full max-w-lg px-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="glassmorphism ghost-border rounded-[3rem] p-12 shadow-meditative overflow-hidden relative">
          <div className="absolute inset-0 star-pattern opacity-10 pointer-events-none" />

          <div className="relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-primary text-secondary-container mb-6 shadow-xl ring-8 ring-primary/5">
                <ShieldCheck size={32} />
              </div>
              <h1 className="text-4xl font-serif font-bold text-primary mb-3">Join the Stewardship</h1>
              <p className="text-on-surface-variant font-medium">Become a guardian of digital peace</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary/70 ml-1">Guardian Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors" size={20} />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl py-4 pl-12 pr-4 text-primary placeholder:text-primary/20 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary/70 ml-1">Sanctuary Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors" size={20} />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@pathtopeace.com"
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl py-4 pl-12 pr-4 text-primary placeholder:text-primary/20 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary/70 ml-1">Sanctuary Key</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors" size={20} />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a strong key"
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl py-4 pl-12 pr-4 text-primary placeholder:text-primary/20 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 px-1 py-2">
                <input type="checkbox" required className="mt-1 accent-primary rounded" />
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  I agree to uphold the sanctuary's values of peace, patience, and stewardship in all my actions.
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-on-primary py-5 rounded-2xl font-bold flex items-center justify-center space-x-3 hover:bg-primary-container shadow-xl shadow-primary/20 transform active:scale-95 transition-all disabled:opacity-70 group"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Apply for Stewardship</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-10 text-center">
              <div className="h-[1px] w-full bg-outline-variant/20 mb-8" />
              <p className="text-sm font-medium text-on-surface-variant">
                Already a guardian? <Link href="/login" className="text-primary font-bold hover:text-secondary-container transition-colors">Enter the Portal</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
