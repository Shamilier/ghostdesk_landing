"use client";

import { motion } from "framer-motion";
import { Cable, Laptop2, MessagesSquare, PenTool } from "lucide-react";
import { GlassCard } from "./GlassCard";

const STEPS = [
  {
    title: "Подключите источники",
    description: "Системный звук, микрофон, экран — один клик, и GhostDesk в курсе контекста.",
    icon: Cable
  },
  {
    title: "В разговоре",
    description: "GhostDesk транскрибирует и подсказывает в реальном времени прямо поверх вашего экрана.",
    icon: MessagesSquare
  },
  {
    title: "После звонка",
    description: "Авто-итоги, заметки, задачи и тайм-коды без ручной рутины.",
    icon: PenTool
  },
  {
    title: "В архиве",
    description: "Умный поиск, темы, участники и AI-анализ по запросу.",
    icon: Laptop2
  }
];

export function HowItWorks() {
  return (
    <section id="how" className="relative mx-auto mt-28 w-full max-w-6xl px-4 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-[0.9fr,1.1fr] lg:items-center">
        <div>
          <motion.span
            className="text-xs font-semibold uppercase tracking-[0.32em] text-foreground/60"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            Как это работает
          </motion.span>
          <motion.h2
            className="mt-4 text-3xl font-semibold text-foreground sm:text-4xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            Включите GhostDesk один раз — и пусть он ведёт диалог вместе с вами
          </motion.h2>
          <motion.p
            className="mt-4 text-base text-muted"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            От подключения до архивирования — GhostDesk остаётся невидимым, но помогает на каждом шаге.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <GlassCard key={step.title} className="h-full">
                <motion.div
                  className="flex h-full flex-col gap-4"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ delay: index * 0.06, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--surface-glass)_70%,transparent)] text-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="text-sm uppercase tracking-[0.3em] text-foreground/40">Шаг {index + 1}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                    <p className="mt-3 text-sm text-muted">{step.description}</p>
                  </div>
                </motion.div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
