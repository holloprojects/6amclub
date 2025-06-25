"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function LoadingCursorProvider() {
  const [loading, setLoading] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const pathname = usePathname();
  const cursorRef = useRef<HTMLDivElement>(null);

  // Loading logic
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timeout);
  }, [pathname]);

  // Track mouse movement
  useEffect(() => {
    if (!loading) return;
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [loading]);

  // Hide cursor when loading
  useEffect(() => {
    if (loading) {
      document.body.style.cursor = "none";
    } else {
      document.body.style.cursor = "auto";
    }
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [loading]);

  // Cursor div styles
  const cursorStyle: React.CSSProperties = {
    pointerEvents: "none",
    position: "fixed",
    left: pos.x,
    top: pos.y,
    width: 48,
    height: 48,
    zIndex: 9999,
    transform: "translate(-50%, -50%)",
    transition: "left 0.08s, top 0.08s",
    display: loading ? "block" : "none",
    mixBlendMode: "exclusion", // cool effect, optional
  };

  return (
    <>
      {loading && (
        <div ref={cursorRef} style={cursorStyle} className="spin-cursor">
          <img
            src="/Logo1.png"
            alt="Loading cursor"
            style={{
              width: "48px",
              height: "48px",
              animation: "spin 1.6s linear infinite",
              willChange: "transform",
            }}
            draggable={false}
          />
        </div>
      )}

      {/* Add keyframes via style tag */}
      <style>
        {`
          @keyframes spin {
            100% { transform: rotate(360deg); }
          }
          .spin-cursor img {
            pointer-events: none;
            user-select: none;
            // Optional: Add drop shadow or glow
            filter: drop-shadow(0 0 2px #fff);
          }
        `}
      </style>
    </>
  );
}
