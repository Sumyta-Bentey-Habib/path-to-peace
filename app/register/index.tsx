"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, User, ShieldCheck } from "lucide-react";
import { styles } from "./style";

export default function Register() {
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
    <div className={styles.container}>
      <div 
        className={styles.bgImage}
        style={{ backgroundImage: `url('/images/login-bg.png')` }}
      />
      <div className={styles.bgOverlay} />

      <div className={styles.contentWrapper}>
        <div className={styles.glassCard}>
          <div className={styles.starOverlay} />

          <div className="relative z-10">
            <div className={styles.header}>
              <div className={styles.iconBox}>
                <ShieldCheck size={32} />
              </div>
              <h1 className={styles.title}>Join the Stewardship</h1>
              <p className={styles.subtitle}>Become a guardian of digital peace</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div className={styles.formGroup}>
                  <label className={styles.inputLabel}>Guardian Name</label>
                  <div className={styles.inputWrapper}>
                    <User className={styles.inputIcon} size={20} />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className={styles.formInput}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.inputLabel}>Sanctuary Email</label>
                  <div className={styles.inputWrapper}>
                    <Mail className={styles.inputIcon} size={20} />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@pathtopeace.com"
                      className={styles.formInput}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.inputLabel}>Sanctuary Key</label>
                  <div className={styles.inputWrapper}>
                    <Lock className={styles.inputIcon} size={20} />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a strong key"
                      className={styles.formInput}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.checkboxGroup}>
                <input type="checkbox" required className={styles.checkboxInput} />
                <p className={styles.checkboxLabel}>
                  I agree to uphold the sanctuary's values of peace, patience, and stewardship in all my actions.
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={styles.submitButton}
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
              <div className={styles.footerDivider} />
              <p className={styles.footerText}>
                Already a guardian? <Link href="/login" className="text-primary font-bold hover:text-secondary-container transition-colors">Enter the Portal</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
