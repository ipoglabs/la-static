"use client";

import { useEffect, useState } from "react";

export default function UnderConstructionPage() {
  const [dots, setDots] = useState(".");
  const [progress, setProgress] = useState(0);

  // Animated dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "." : d + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Fake progress bar that slowly fills
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 87) return 87; // stops at 87% — not done yet!
        return p + Math.random() * 1.2;
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.root}>
      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@400;500&display=swap');

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50%       { transform: translateY(-18px) rotate(2deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes stripe-scroll {
          from { background-position: 0 0; }
          to   { background-position: 40px 0; }
        }

        .float    { animation: float 4s ease-in-out infinite; }
        .spin-slow { animation: spin-slow 12s linear infinite; }

        .fade-1 { animation: fade-up 0.6s ease both; animation-delay: 0.1s; }
        .fade-2 { animation: fade-up 0.6s ease both; animation-delay: 0.3s; }
        .fade-3 { animation: fade-up 0.6s ease both; animation-delay: 0.5s; }
        .fade-4 { animation: fade-up 0.6s ease both; animation-delay: 0.7s; }
        .fade-5 { animation: fade-up 0.6s ease both; animation-delay: 0.9s; }

        .cursor { animation: blink 1s step-end infinite; }

        .stripe-bar {
          background-image: repeating-linear-gradient(
            90deg,
            transparent,
            transparent 10px,
            rgba(255,255,255,0.15) 10px,
            rgba(255,255,255,0.15) 20px
          );
          animation: stripe-scroll 1s linear infinite;
        }

        input.notify-input::placeholder { color: #64748b; }
        input.notify-input:focus { outline: none; border-color: #f97316; }
      `}</style>

      {/* Background grid */}
      <div style={styles.grid} />

      {/* Floating gear — top right */}
      <div style={styles.gearWrap} className="spin-slow">
        <svg width="180" height="180" viewBox="0 0 24 24" fill="none" stroke="#f9731622" strokeWidth="1">
          <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
          <path d="M19.622 10.395l-1.097-2.65L20 6l-2-2-1.735 1.483-2.707-1.113L12.935 2h-1.954l-.632 2.401-2.645 1.115L6 4 4 6l1.453 1.789-1.08 2.657L2 11v2l2.401.655L5.516 16.3 4 18l2 2 1.791-1.46 2.606 1.072L11 22h2l.604-2.387 2.651-1.098C16.697 19.48 18 20 18 20l2-2-1.484-1.75 1.106-2.648L22 13v-2l-2.378-.605Z"/>
        </svg>
      </div>

      {/* Floating wrench — bottom left */}
      <div style={styles.wrenchWrap} className="float">
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#f9731630" strokeWidth="1.2">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
      </div>

      {/* Main content */}
      <main style={styles.main}>

        {/* Badge */}
        <div style={styles.badge} className="fade-1">
          <span style={styles.badgeDot} />
          Work in Progress
        </div>

        {/* Headline */}
        <h1 style={styles.headline} className="fade-2">
          Something
          <br />
          <span style={styles.headlineAccent}>awesome</span>
          <br />
          is brewing
          <span style={styles.cursor}>_</span>
        </h1>

        {/* Subtext */}
        <p style={styles.subtext} className="fade-3">
          We&apos;re hammering the final nails. This page is under
          construction and will be live soon.
        </p>

        {/* Progress */}
        <div style={styles.progressWrap} className="fade-4">
          <div style={styles.progressHeader}>
            <span style={styles.progressLabel}>Build progress</span>
            <span style={styles.progressPct}>{Math.floor(progress)}%</span>
          </div>
          <div style={styles.progressTrack}>
            <div
              style={{ ...styles.progressFill, width: `${progress}%` }}
              className="stripe-bar"
            />
          </div>
        </div>

        {/* Notify form */}
        <div style={styles.notifyWrap} className="fade-5">
          <p style={styles.notifyLabel}>Get notified when we launch</p>
          <div style={styles.notifyRow}>
            <input
              type="email"
              placeholder="your@email.com"
              style={styles.notifyInput}
              className="notify-input"
            />
            <button style={styles.notifyBtn}>
              Notify me
            </button>
          </div>
        </div>

        {/* Back link */}
        <a href="/" style={styles.backLink} className="fade-5">
          ← Back to home
        </a>
      </main>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles: Record<string, React.CSSProperties> = {
  root: {
    minHeight: "100vh",
    backgroundColor: "#0a0f1a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'DM Mono', monospace",
  },
  grid: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
    backgroundSize: "48px 48px",
    pointerEvents: "none",
  },
  gearWrap: {
    position: "absolute",
    top: "-40px",
    right: "-40px",
    opacity: 0.6,
    pointerEvents: "none",
  },
  wrenchWrap: {
    position: "absolute",
    bottom: "40px",
    left: "20px",
    opacity: 0.5,
    pointerEvents: "none",
  },
  main: {
    position: "relative",
    zIndex: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    maxWidth: "560px",
    width: "100%",
    padding: "2rem",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#f9731615",
    border: "1px solid #f9731640",
    borderRadius: "999px",
    padding: "4px 14px",
    fontSize: "11px",
    fontWeight: 500,
    color: "#fb923c",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: "24px",
  },
  badgeDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: "#f97316",
    boxShadow: "0 0 6px #f97316",
  },
  headline: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "clamp(3rem, 10vw, 5.5rem)",
    fontWeight: 800,
    lineHeight: 1.0,
    color: "#f1f5f9",
    margin: "0 0 20px 0",
    letterSpacing: "-0.03em",
  },
  headlineAccent: {
    color: "#f97316",
    fontStyle: "italic",
  },
  subtext: {
    fontSize: "14px",
    color: "#64748b",
    lineHeight: 1.7,
    margin: "0 0 36px 0",
    maxWidth: "380px",
  },
  progressWrap: {
    width: "100%",
    marginBottom: "32px",
  },
  progressHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
  },
  progressLabel: {
    fontSize: "11px",
    color: "#475569",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  progressPct: {
    fontSize: "11px",
    color: "#f97316",
    fontWeight: 500,
  },
  progressTrack: {
    height: "6px",
    backgroundColor: "#1e293b",
    borderRadius: "99px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#f97316",
    borderRadius: "99px",
    transition: "width 0.3s ease",
  },
  notifyWrap: {
    width: "100%",
    marginBottom: "28px",
  },
  notifyLabel: {
    fontSize: "12px",
    color: "#475569",
    marginBottom: "10px",
    letterSpacing: "0.04em",
  },
  notifyRow: {
    display: "flex",
    gap: "8px",
    width: "100%",
  },
  notifyInput: {
    flex: 1,
    backgroundColor: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: "8px",
    padding: "10px 14px",
    fontSize: "13px",
    color: "#f1f5f9",
    fontFamily: "'DM Mono', monospace",
    transition: "border-color 0.2s",
  },
  notifyBtn: {
    backgroundColor: "#f97316",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 18px",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "'DM Mono', monospace",
    whiteSpace: "nowrap",
  },
  backLink: {
    fontSize: "12px",
    color: "#334155",
    textDecoration: "none",
    letterSpacing: "0.04em",
    transition: "color 0.2s",
  },
};