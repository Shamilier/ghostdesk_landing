"use client";

import { motion } from "framer-motion";
import {
  AudioLines,
  Ear,
  Mic,
  MonitorSmartphone,
  Sparkles,
  Workflow
} from "lucide-react";
import { GlassCard } from "./GlassCard";

const FEATURES = [
  {
    title: "Прослушивание системного звука",
    description: "Слышит то, что слышите вы — софта, браузера, звонков.",
    icon: Ear
  },
  {
    title: "Микрофон и речевые подсказки",
    description: "Понимает ваш голос и шепчет релевантные фразы на лету.",
    icon: Mic
  },
  {
    title: "Захват экрана",
    description: "Видит контекст окна и помогает решать задачи “с экрана”.",
    icon: MonitorSmartphone
  },
  {
    title: "Реал-тайм транскрибация",
    description: "Текст беседы с тайм-кодами и говорящими — сразу, без ожидания.",
    icon: AudioLines
  },
  {
    title: "AI-подсказки и шаблоны ответов",
    description: "Интервью, собеседования, продажи — уверенные формулировки в один клик.",
    icon: Sparkles
  },
  {
    title: "Пост-анализ и архив встреч",
    description: "Итоги, экшены, темы, поиск по людям и вопросам. Глубокий AI-разбор по запросу.",
    icon: Workflow
  }
];

export function FeaturesGrid() {
  return (
    <section id="features" className="relative mx-auto mt-24 w-full max-w-6xl px-4 sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <motion.span
          className="text-xs font-semibold uppercase tracking-[0.32em] text-white/60"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          Возможности
        </motion.span>
        <motion.h2
          className="mt-4 text-3xl font-semibold text-white sm:text-4xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          Все, что нужно для ясных разговоров
        </motion.h2>
        <motion.p
          className="mt-4 text-base text-white/70"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          GhostDesk объединяет звук, экран и AI-подсказки в один невидимый слой, который поддерживает вас в любой ситуации.
        </motion.p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {FEATURES.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <GlassCard key={feature.title} glow className="h-full">
              <motion.div
                className="flex h-full flex-col gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: index * 0.05, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="mt-3 text-sm text-white/70">{feature.description}</p>
                </div>
              </motion.div>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
}
