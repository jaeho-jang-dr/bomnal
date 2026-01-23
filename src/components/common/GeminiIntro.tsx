"use client";

import { useEffect, useState } from "react";

export default function GeminiIntro() {
    const [show, setShow] = useState(true);
    const [fading, setFading] = useState(false);

    useEffect(() => {
        // Start fade out after animation (adjust timing to match CSS animation)
        const timer = setTimeout(() => {
            setFading(true);
        }, 2500); // 2.5s for writing

        const removeTimer = setTimeout(() => {
            setShow(false);
        }, 3500); // 1s for fade out

        return () => {
            clearTimeout(timer);
            clearTimeout(removeTimer);
        };
    }, []);

    if (!show) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-1000 ${fading ? "opacity-0" : "opacity-100"
                }`}
        >
            <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Nanum+Brush+Script&display=swap');
        
        .gemini-text {
          font-family: 'Nanum Brush Script', cursive;
          font-size: 10rem; /* Increased size for Korean font */
          fill: transparent;
          stroke: white; /* Fallback */
          stroke-width: 1.5px; /* Slightly thinner for clarity */
          stroke-dasharray: 3000; /* Increased for complex characters */
          stroke-dashoffset: 3000;
          animation: write 2.5s ease-out forwards, fill 1s ease-out 2.5s forwards;
        }

        /* Gradient stroke effect */
        .gemini-svg text {
            stroke: url(#gemini-gradient);
        }

        @keyframes write {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes fill {
          from {
            fill-opacity: 0;
            stroke-width: 1.5px;
          }
          to {
            fill-opacity: 1;
            fill: url(#gemini-gradient); 
            stroke-width: 0;
          }
        }
      `}</style>

            <svg
                viewBox="0 0 800 300"
                className="w-full max-w-4xl gemini-svg px-4"
                style={{ overflow: 'visible' }}
            >
                <defs>
                    <linearGradient id="gemini-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#4facfe" />
                        <stop offset="50%" stopColor="#00f2fe" />
                        <stop offset="100%" stopColor="#4facfe" />
                    </linearGradient>
                </defs>
                <text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    className="gemini-text"
                >
                    제미나이
                </text>
            </svg>
        </div>
    );
}
