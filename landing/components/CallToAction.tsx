"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function CallToAction() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const floatX = useTransform(scrollYProgress, [0, 1], ["-8%", "10%"]);
  const floatY = useTransform(scrollYProgress, [0, 1], ["6%", "-4%"]);

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative mx-auto mt-32 w-full max-w-5xl overflow-hidden px-4 sm:px-6"
    >
      <motion.div
        className="glass relative overflow-hidden rounded-[2.5rem] px-6 py-12 sm:px-12"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.div
          className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent-gradient blur-3xl opacity-60"
          aria-hidden
          animate={{ scale: [1, 1.1, 0.96] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-[#a06aff] blur-3xl opacity-50"
          aria-hidden
          style={{ x: floatX, y: floatY }}
        />
        <motion.div
          className="absolute inset-0 opacity-20"
          aria-hidden
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(91,140,255,0.35), transparent 60%), radial-gradient(circle at 80% 20%, rgba(160,106,255,0.35), transparent 60%), radial-gradient(circle at 50% 80%, rgba(91,229,255,0.3), transparent 65%)",
            backgroundSize: "140% 140%"
          }}
        />
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr,auto] lg:items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Готовы говорить уверенно?</h2>
            <p className="text-base text-white/70">
              Запустите GhostDesk бесплатно, подключите любимые сервисы и почувствуйте, как AI держит весь контекст разговора.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <motion.a
              href="https://ghostdesk.app/signup"
              className="btn-primary justify-center text-xs uppercase tracking-[0.2em]"
              whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
            >
              Попробовать бесплатно
            </motion.a>
            <motion.a
              href="#how"
              className="btn-secondary justify-center text-xs uppercase tracking-[0.2em]"
              whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
            >
              Смотреть демо
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
