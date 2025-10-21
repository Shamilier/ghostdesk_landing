"use client";

import clsx from "clsx";
import { motion, useReducedMotion } from "framer-motion";

const LIVE_TRANSCRIPT = [
  {
    speaker: "Собеседник",
    text: "Мы хотим понять, как быстро команда адаптирует решение. Какие сроки внедрения вы закладываете?",
    accent: "from-[#5B8CFF] to-[#A06AFF]"
  },
  {
    speaker: "GhostDesk",
    text: "Напомните про пилот на 2 недели и уточните, кто принимает финальное решение.",
    accent: "from-[#5BE5FF] to-[#8E8CFF]"
  },
  {
    speaker: "Вы",
    text: "Мы запускаем пилот за 14 дней. После согласования с вашей стороны мы подключим команду успеха клиента.",
    accent: "from-[#FFD66B] to-[#FF9F6B]"
  }
];

const SUGGESTIONS = [
  "Уточнить KPI внедрения",
  "Согласовать следующий созвон",
  "Сохранить заметку в CRM"
];

export function HeroShowcase() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative mt-16 w-full max-w-4xl">
      <motion.div
        className="glass relative mx-auto rounded-[2.2rem] border border-white/10 bg-white/5 p-6 sm:p-8"
        initial={{ opacity: 0, y: 32, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-white/40">Live transcript</p>
              <h3 className="mt-2 text-xl font-semibold text-white">GhostDesk слышит и подсказывает</h3>
            </div>
            <motion.span
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <span className="h-2 w-2 animate-ping-slow rounded-full bg-[#5BE5FF]" aria-hidden="true" />
              Реал-тайм режим
            </motion.span>
          </div>
          <div className="relative space-y-4">
            {LIVE_TRANSCRIPT.map((entry, index) => (
              <motion.div
                key={entry.text}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.07] p-4 sm:p-5"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              >
                {!shouldReduceMotion && (
                  <motion.div
                    aria-hidden
                    className={clsx(
                      "absolute inset-0 opacity-0 bg-gradient-to-r transition-opacity duration-500",
                      entry.accent,
                      "group-hover:opacity-80"
                    )}
                    style={{ backgroundImage: "linear-gradient(120deg, var(--tw-gradient-stops))" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.25, 0.6, 0.25] }}
                    transition={{
                      delay: 1.2 + index * 0.6,
                      duration: 2.4,
                      repeat: Infinity,
                      repeatDelay: 4,
                      ease: "easeInOut"
                    }}
                  />
                )}
                <div className="relative z-10 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-white/60">
                  <span
                    className={`inline-flex h-2.5 w-2.5 rounded-full bg-gradient-to-r ${entry.accent}`}
                    aria-hidden="true"
                  />
                  {entry.speaker}
                </div>
                <p className="relative z-10 mt-3 text-base text-white/80 sm:text-lg">{entry.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
        {!shouldReduceMotion && (
          <motion.div
            aria-hidden
            className="absolute inset-x-8 bottom-6 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
            animate={{ opacity: [0.25, 0.6, 0.25] }}
            transition={{ duration: 4.6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          />
        )}
      </motion.div>
      <motion.div
        className="glass absolute -right-8 -top-12 w-64 rounded-3xl border border-white/10 bg-white/10 p-4 shadow-glow sm:-right-14"
        initial={{ opacity: 0, y: -12, scale: 0.92 }}
        animate={{ opacity: 1, y: shouldReduceMotion ? 0 : [-6, -12, -6], scale: 1 }}
        transition={{
          duration: shouldReduceMotion ? 0.6 : 8,
          delay: 0.6,
          ease: shouldReduceMotion ? [0.4, 0, 0.2, 1] : "easeInOut",
          repeat: shouldReduceMotion ? 0 : Infinity,
          repeatType: "mirror"
        }}
      >
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">AI подсказки</p>
        <ul className="mt-3 space-y-2 text-sm text-white/80">
          {SUGGESTIONS.map(suggestion => (
            <li key={suggestion} className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-[#5BE5FF]" aria-hidden="true" />
              {suggestion}
            </li>
          ))}
        </ul>
      </motion.div>
      <motion.div
        className="glass absolute -left-6 bottom-[-3.5rem] w-56 rounded-[1.9rem] border border-white/10 bg-[#0E1022]/85 p-4"
        initial={{ opacity: 0, y: 16, scale: 0.94 }}
        animate={{ opacity: 1, y: shouldReduceMotion ? 0 : [6, -4, 6], scale: 1 }}
        transition={{
          duration: shouldReduceMotion ? 0.6 : 10,
          delay: 0.8,
          ease: shouldReduceMotion ? [0.4, 0, 0.2, 1] : "easeInOut",
          repeat: shouldReduceMotion ? 0 : Infinity,
          repeatType: "mirror"
        }}
      >
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/45">
          <span>Пост-анализ</span>
          <span>00:42</span>
        </div>
        <div className="mt-4 space-y-3 text-sm text-white/75">
          <div>
            <p className="text-white/60">Сильные сигналы</p>
            <p className="font-medium text-white">Клиент готов к пилоту, ожидает ROI через 1 квартал.</p>
          </div>
          <div>
            <p className="text-white/60">Следующие шаги</p>
            <p className="font-medium text-white">Отправить сводку и забронировать демо с техкомандой.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
