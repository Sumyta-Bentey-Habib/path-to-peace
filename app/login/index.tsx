"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { styles } from "./style";

export default function Login() {
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
    <div className={styles.container}>
      <div 
        className={styles.bgImage}
        style={{ backgroundImage: `url('/images/login-bg.png')` }}
      />
      <div className={styles.bgOverlay} />

      <div className={styles.ornamentNav}>
        <Link href="/" className={styles.navLink}>
          <div className={styles.navIcon}>
            <ArrowRight className="rotate-180" size={18} />
          </div>
          <span className={styles.navTitle}>Path to Peace</span>
        </Link>
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.glassCard}>
          <div className={styles.starOverlay} />

          <div className="relative z-10">
            <div className={styles.header}>
              <h1 className={styles.title}>Admin Sanctuary</h1>
              <p className={styles.subtitle}>Continue your journey of stewardship</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className={styles.formGroup}>
                <label className={styles.inputLabel}>Email Sanctuary</label>
                <div className={styles.inputWrapper}>
                  <Mail className={styles.inputIcon} size={20} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="guardian@pathtopeace.com"
                    className={styles.formInput}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <div className="flex justify-between items-center ml-1">
                  <label className={styles.inputLabel}>Secret Key</label>
                  <button type="button" className={styles.forgotPassword}>Forgotten?</button>
                </div>
                <div className={styles.inputWrapper}>
                  <Lock className={styles.inputIcon} size={20} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={styles.formInput}
                  />
                </div>
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
                    <span>Enter Sanctuary</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className={styles.dividerSection}>
              <div className={styles.dividerWrapper}>
                <div className={styles.dividerLine} />
                <span className={styles.dividerText}>Divine Auth</span>
                <div className={styles.dividerLine} />
              </div>

              <div className={styles.socialGrid}>
                <button className={styles.socialButton}>
                  <div className={styles.socialIconGoogle} />
                  <span className="text-sm font-bold text-primary">Google</span>
                </button>
                <button className={styles.socialButton}>
                  <div className={styles.socialIconGithub} />
                  <span className="text-sm font-bold text-primary">GitHub</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <p className={styles.applyText}>
          Not a guardian? <Link href="/contact" className="text-primary font-bold hover:text-secondary-container transition-colors">Apply for stewardship</Link>
        </p>
      </div>
    </div>
  );
}
