"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect } from "react";

export function InteractiveBackground() {
  const shouldReduceMotion = useReducedMotion();
  const pointerX = useMotionValue(typeof window === "undefined" ? 0 : window.innerWidth / 2);
  const pointerY = useMotionValue(typeof window === "undefined" ? 0 : window.innerHeight / 2);

  const smoothX = useSpring(pointerX, { stiffness: 120, damping: 35, mass: 0.5 });
  const smoothY = useSpring(pointerY, { stiffness: 120, damping: 35, mass: 0.5 });

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handlePointerMove = (event: PointerEvent) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [pointerX, pointerY, shouldReduceMotion]);

  const radialGlow = useMotionTemplate`radial-gradient(580px at ${smoothX}px ${smoothY}px, rgba(90, 139, 255, 0.28), rgba(160, 106, 255, 0.25) 28%, transparent 65%)`;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: shouldReduceMotion ? undefined : radialGlow,
          opacity: shouldReduceMotion ? 0.4 : 1
        }}
      />
      <motion.div
        aria-hidden
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.55 }}
        transition={{ duration: 1.2, ease: [0.45, 0, 0.2, 1] }}
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(91,140,255,0.22), transparent 62%), radial-gradient(circle at 80% 12%, rgba(160,106,255,0.25), transparent 60%), radial-gradient(circle at 50% 82%, rgba(67,97,255,0.18), transparent 68%)"
        }}
      />
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(circle at center, black 40%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 40%, transparent 75%)"
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25, backgroundPosition: ["0px 0px", "40px 40px"] }}
        transition={{
          duration: shouldReduceMotion ? 0 : 18,
          repeat: shouldReduceMotion ? 0 : Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        aria-hidden
        className="absolute -inset-[10%]"
        style={{
          background:
            "conic-gradient(from 130deg at 70% 30%, rgba(91,140,255,0.08), transparent 40%), conic-gradient(from 250deg at 30% 60%, rgba(160,106,255,0.08), transparent 45%)"
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35, rotate: shouldReduceMotion ? 0 : 8 }}
        transition={{
          duration: 18,
          ease: "easeInOut",
          repeat: shouldReduceMotion ? 0 : Infinity,
          repeatType: "mirror"
        }}
      />
    </div>
  );
}
