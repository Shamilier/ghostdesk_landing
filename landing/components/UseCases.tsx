"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  BriefcaseBusiness,
  FileText,
  GraduationCap,
  Handshake,
  LifeBuoy,
  UsersRound
} from "lucide-react";
import { useRef } from "react";
import { GlassCard } from "./GlassCard";

const USE_CASES = [
  {
    title: "Собеседования",
    description: "Вопросы, проверочные сценарии, оценка ответов.",
    icon: Handshake
  },
  {
    title: "Продажи/CS",
    description: "Обработка возражений, next steps, CRM-конспект.",
    icon: BriefcaseBusiness
  },
  {
    title: "Исследования/UX",
    description: "Маркировка инсайтов, темы и цитаты.",
    icon: FileText
  },
  {
    title: "Лекции/курсы",
    description: "Шпаргалки, термины, конспекты, тайм-коды.",
    icon: GraduationCap
  },
  {
    title: "Командные созвоны",
    description: "Роли, action items, follow-ups.",
    icon: UsersRound
  },
  {
    title: "Техподдержка",
    description: "Пошаговые инструкции и автосаммари.",
    icon: LifeBuoy
  }
];

export function UseCases() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const stripeX = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const stripeOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.15, 0.5, 0.3]);

  return (
    <section
      ref={sectionRef}
      id="use-cases"
      className="relative mx-auto mt-28 w-full max-w-6xl overflow-hidden px-4 sm:px-6"
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ opacity: stripeOpacity }}>
        <motion.div
          className="absolute -left-1/4 top-1/4 h-[520px] w-[150%] skew-y-6 bg-[linear-gradient(120deg,rgba(91,140,255,0.1)_0%,rgba(160,106,255,0.16)_35%,rgba(91,229,255,0.12)_70%,transparent_95%)] blur-[120px]"
          style={{ x: stripeX }}
        />
      </motion.div>
      <div className="mx-auto max-w-3xl text-center">
        <motion.span
          className="text-xs font-semibold uppercase tracking-[0.32em] text-white/60"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          Сценарии
        </motion.span>
        <motion.h2
          className="mt-4 text-3xl font-semibold text-white sm:text-4xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          GhostDesk усиливает каждую встречу
        </motion.h2>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {USE_CASES.map((useCase, index) => {
          const Icon = useCase.icon;
          return (
            <GlassCard key={useCase.title} className="h-full">
              <motion.div
                className="flex h-full flex-col gap-4"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: index * 0.05, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                whileHover={{ y: -6 }}
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-white">{useCase.title}</h3>
                  <p className="mt-2 text-sm text-white/70">{useCase.description}</p>
                </div>
              </motion.div>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
}
