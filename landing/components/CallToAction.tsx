"use client";

import { motion, useReducedMotion } from "framer-motion";

export function CallToAction() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="cta" className="relative mx-auto mt-32 w-full max-w-5xl px-4 sm:px-6">
      <motion.div
        className="glass relative overflow-hidden rounded-[2.5rem] px-6 py-12 sm:px-12"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent-gradient blur-3xl opacity-60" aria-hidden />
        <div className="absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-[#a06aff] blur-3xl opacity-50" aria-hidden />
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
