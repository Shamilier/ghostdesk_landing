"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useMemo } from "react";

type Orb = {
  size: number;
  top: string;
  left: string;
  color: string;
  blur?: string;
  intensity: number;
};

const ORBS: Orb[] = [
  { size: 420, top: "12%", left: "8%", color: "rgba(91,140,255,0.35)", blur: "120px", intensity: 1 },
  { size: 360, top: "45%", left: "70%", color: "rgba(160,106,255,0.4)", blur: "160px", intensity: 1.2 },
  { size: 500, top: "78%", left: "20%", color: "rgba(91,229,255,0.28)", blur: "140px", intensity: 0.9 }
];

export function ScrollBackdrop() {
  const { scrollY } = useScroll();
  const parallaxA = useSpring(useTransform(scrollY, [0, 1200], [0, -120]), {
    stiffness: 90,
    damping: 30,
    mass: 0.4
  });
  const parallaxB = useSpring(useTransform(scrollY, [0, 1600], [0, 160]), {
    stiffness: 90,
    damping: 30,
    mass: 0.4
  });
  const parallaxC = useSpring(useTransform(scrollY, [0, 1400], [0, -200]), {
    stiffness: 90,
    damping: 30,
    mass: 0.4
  });

  const parallaxValues = useMemo(() => [parallaxA, parallaxB, parallaxC], [parallaxA, parallaxB, parallaxC]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(91,140,255,0.08),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(160,106,255,0.07),transparent_60%),radial-gradient(circle_at_50%_80%,rgba(67,97,255,0.05),transparent_65%)]" />
      {ORBS.map((orb, index) => (
        <motion.div
          key={`${orb.left}-${index}`}
          className="absolute rounded-full mix-blend-screen"
          style={{
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: `blur(${orb.blur ?? "120px"})`,
            y: parallaxValues[index % parallaxValues.length],
            opacity: orb.intensity
          }}
          animate={{
            scale: [0.95, 1.05, 0.98],
            rotate: [-2, 2, -1]
          }}
          transition={{ duration: 20 + index * 4, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
