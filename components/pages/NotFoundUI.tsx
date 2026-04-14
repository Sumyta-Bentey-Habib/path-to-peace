import Link from "next/link";
import { ArrowLeft, Sparkles, Wind } from "lucide-react";
import { styles } from "./style";

export function NotFoundUI() {
  return (
    <div className={styles.notFoundPage}>
      <div className={styles.bgOrnament1} />
      <div className={styles.bgOrnament2} />
      <div className={styles.starOverlay} />

      <div className={styles.contentWrapper}>
        <div className={styles.iconBox}>
          <Wind className={styles.windIcon} />
          <Sparkles className={styles.sparkleIcon} />
        </div>

        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.errorTitle}>The Path Faded</h2>
        
        <p className={styles.errorMsg}>
          &ldquo;Do not be troubled by the road being invisible; keep your heart clear and the right path will reveal itself.&rdquo;
        </p>

        <div className={styles.btnContainer}>
          <Link href="/" className={styles.primaryBtn}>
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Return to Sanctuary</span>
          </Link>
          <Link href="/login" className={styles.secondaryBtn}>
            Guardian Portal
          </Link>
        </div>

        <div className={styles.footerOrnament}>
          <div className="w-12 h-[1px] bg-current" />
          <span className="text-xs font-bold uppercase tracking-[0.3em]">Path to Peace</span>
          <div className="w-12 h-[1px] bg-current" />
        </div>
      </div>
    </div>
  );
}
