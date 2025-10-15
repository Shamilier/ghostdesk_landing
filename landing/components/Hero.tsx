"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useCallback, useMemo } from "react";

const HERO_BENEFITS = [
  "Реал-тайм: транскрибация и подсказки без задержек",
  "Невидимый слой: поверх любых приложений и вкладок",
  "Пост-аналитика: итоги, тезисы, задачи, инсайты",
  "Архив: поиск по встречам, темам, людям",
  "Конфиденциальность: локальные фильтры, контроль источников"
];

const heroVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 }
};

type MagneticButtonProps = {
  href: string;
  variant: "primary" | "secondary";
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
};

function MagneticButton({ href, variant, children, icon, className }: MagneticButtonProps) {
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 180, damping: 18, mass: 0.4 });

  const handleMove = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (shouldReduceMotion) return;
      const rect = event.currentTarget.getBoundingClientRect();
      const distanceX = event.clientX - (rect.left + rect.width / 2);
      const distanceY = event.clientY - (rect.top + rect.height / 2);
      x.set(distanceX * 0.25);
      y.set(distanceY * 0.25);
    },
    [shouldReduceMotion, x, y]
  );

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const baseClasses = useMemo(
    () =>
      variant === "primary"
        ? "btn-primary group text-[0.7rem] sm:text-xs"
        : "btn-secondary group text-[0.7rem] sm:text-xs",
    [variant]
  );

  return (
    <motion.a
      href={href}
      className={`${baseClasses} ${className ?? ""}`.trim()}
      style={{
        x: shouldReduceMotion ? 0 : springX,
        y: shouldReduceMotion ? 0 : springY
      }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onBlur={reset}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon}
      </span>
    </motion.a>
  );
}

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="hero" className="relative isolate overflow-hidden pt-32 sm:pt-40">
      <div className="absolute inset-x-0 top-0 -z-10 flex justify-center">
        <motion.svg
          viewBox="0 0 800 600"
          className="h-[540px] w-[720px] max-w-[95vw]"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          aria-hidden="true"
        >
          <defs>
            <filter id="hero-goo" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="28" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 32 -14"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
            <linearGradient id="blobGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#5B8CFF" />
              <stop offset="100%" stopColor="#A06AFF" />
            </linearGradient>
          </defs>
          <g filter="url(#hero-goo)">
            <motion.circle
              cx="240"
              cy="210"
              r="130"
              fill="url(#blobGradient)"
              animate={shouldReduceMotion ? undefined : { cx: [240, 260, 240], cy: [210, 180, 210] }}
              transition={{ duration: 14, repeat: shouldReduceMotion ? 0 : Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              cx="520"
              cy="220"
              r="160"
              fill="#A06AFF"
              fillOpacity={0.85}
              animate={shouldReduceMotion ? undefined : { cx: [520, 500, 520], cy: [220, 260, 220] }}
              transition={{ duration: 18, repeat: shouldReduceMotion ? 0 : Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              cx="380"
              cy="380"
              r="150"
              fill="#5BE5FF"
              fillOpacity={0.45}
              animate={shouldReduceMotion ? undefined : { cx: [380, 360, 380], cy: [380, 410, 380] }}
              transition={{ duration: 16, repeat: shouldReduceMotion ? 0 : Infinity, ease: "easeInOut" }}
            />
          </g>
        </motion.svg>
      </div>
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 text-center sm:px-6">
        <motion.span
          className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.3em] text-white/70"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1, duration: 0.6, ease: [0.45, 0, 0.2, 1] }}
        >
          Невидимый слой для разговоров
        </motion.span>
        <motion.h1
          className="mt-8 max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          Говорите свободно. Остальное — сделает AI
        </motion.h1>
        <motion.p
          className="mt-6 max-w-3xl text-base text-white/70 sm:text-lg"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.35, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          GhostDesk в реальном времени слышит звук и вас, понимает контекст, шепчет подсказки и сохраняет встречу в умный архив.
        </motion.p>
        <motion.div
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.45, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <MagneticButton
            href="#cta"
            variant="primary"
            icon={<ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />}
          >
            Попробовать бесплатно
          </MagneticButton>
          <MagneticButton
            href="#how"
            variant="secondary"
            className="backdrop-blur-xl"
            icon={<Play className="h-3.5 w-3.5" />}
          >
            Смотреть демо
          </MagneticButton>
        </motion.div>
        <motion.ul
          className="mt-12 grid w-full max-w-4xl grid-cols-1 gap-3 text-left text-sm text-white/60 sm:grid-cols-2"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {HERO_BENEFITS.map(benefit => (
            <motion.li
              key={benefit}
              variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
              className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl"
            >
              <span className="mt-1 inline-flex h-2.5 w-2.5 flex-none rounded-full bg-gradient-to-r from-[#5b8cff] to-[#a06aff]" />
              <span>{benefit}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
