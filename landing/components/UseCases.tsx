"use client";

import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  FileText,
  GraduationCap,
  Handshake,
  LifeBuoy,
  UsersRound
} from "lucide-react";
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
  return (
    <section id="use-cases" className="relative mx-auto mt-28 w-full max-w-6xl px-4 sm:px-6">
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
