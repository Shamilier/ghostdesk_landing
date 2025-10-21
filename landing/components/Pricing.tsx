"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";
import { GlassCard } from "./GlassCard";

const PLANS = [
  {
    name: "Starter",
    description: "Личные встречи, базовые подсказки и транскрибация",
    monthly: { price: "29", suffix: "$/мес" },
    yearly: { price: "24", suffix: "$/мес при оплате за год" },
    benefits: [
      "До 30 часов транскрибации в месяц",
      "Личные подсказки и заметки",
      "Экспорт в Markdown и PDF",
      "История встреч за 3 месяца",
      "Локальные фильтры конфиденциальности"
    ],
    highlighted: false
  },
  {
    name: "Pro",
    description: "Реал-тайм подсказки+, пост-аналитика, расширенный архив",
    monthly: { price: "59", suffix: "$/мес" },
    yearly: { price: "49", suffix: "$/мес при оплате за год" },
    benefits: [
      "Неограниченные часы распознавания",
      "Глубокая пост-аналитика и темы",
      "Готовые шаблоны ответов",
      "Расширенный архив и поиск по людям",
      "Интеграции Slack/Notion",
      "Экспорт итогов в CRM"
    ],
    highlighted: true
  },
  {
    name: "Team",
    description: "Совместный доступ, общие коллекции, роли и безопасность",
    monthly: { price: "89", suffix: "$/место/мес" },
    yearly: { price: "75", suffix: "$/место/мес при оплате за год" },
    benefits: [
      "Общие коллекции и роли",
      "SAML SSO и контроль доступа",
      "Голосовые подсказки под команды",
      "Общий архив и разрешения",
      "Приоритетная поддержка 24/7",
      "Собственный лимит хранения"
    ],
    highlighted: false
  }
];

export function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="pricing" className="relative mx-auto mt-32 w-full max-w-6xl px-4 sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <motion.span
          className="text-xs font-semibold uppercase tracking-[0.32em] text-foreground/60"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          Тарифы
        </motion.span>
        <motion.h2
          className="mt-4 text-3xl font-semibold text-foreground sm:text-4xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          Подберите ритм, который подходит вам
        </motion.h2>
        <motion.p
          className="mt-4 text-base text-muted"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          Переключайтесь между помесячной и годовой оплатой в один клик. В любой момент можно обновиться или понизить план.
        </motion.p>
      </div>
      <div className="mt-10 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--surface-border)] bg-[color-mix(in_srgb,var(--surface-glass)_70%,transparent)] p-1 text-xs font-medium text-foreground/70">
          <button
            type="button"
            onClick={() => setBilling("monthly")}
            className={`rounded-full px-4 py-2 transition ${
              billing === "monthly"
                ? "bg-[var(--accent-gradient)] text-white shadow-[0_12px_30px_-18px_rgba(91,140,255,0.65)]"
                : "hover:text-foreground"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBilling("yearly")}
            className={`rounded-full px-4 py-2 transition ${
              billing === "yearly"
                ? "bg-[var(--accent-gradient)] text-white shadow-[0_12px_30px_-18px_rgba(160,106,255,0.65)]"
                : "hover:text-foreground"
            }`}
          >
            Yearly
          </button>
        </div>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {PLANS.map((plan, index) => {
          const price = billing === "monthly" ? plan.monthly : plan.yearly;
          return (
            <GlassCard
              key={plan.name}
              glow={plan.highlighted}
              className={`flex h-full flex-col ${plan.highlighted ? "ring-1 ring-[var(--accent-1)]/35" : ""}`}
            >
              <motion.div
                className="flex h-full flex-col"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.08, duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                  {plan.highlighted && (
                    <span className="rounded-full border border-[var(--surface-border)] bg-[color-mix(in_srgb,var(--surface-elevated)_75%,transparent)] px-3 py-1 text-xs uppercase tracking-[0.2em] text-foreground/70">
                      Популярный
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm text-muted">{plan.description}</p>
                <div className="mt-6 flex items-baseline gap-2 text-foreground">
                  <span className="text-4xl font-semibold">{price.price}</span>
                  <span className="text-sm uppercase tracking-[0.28em] text-foreground/50">{price.suffix}</span>
                </div>
                <ul className="mt-6 space-y-3 text-sm text-muted">
                  {plan.benefits.map(benefit => (
                    <li key={benefit} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--surface-glass)_80%,transparent)] text-foreground">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <motion.a
                  href="#cta"
                  className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                    plan.highlighted
                      ? "bg-[var(--accent-gradient)] text-white shadow-[0_18px_40px_-22px_rgba(91,140,255,0.55)] hover:brightness-110"
                      : "border border-[var(--surface-border)] bg-[color-mix(in_srgb,var(--surface-elevated)_75%,transparent)] text-foreground hover:border-[var(--surface-border-strong)]"
                  }`}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                >
                  Начать
                </motion.a>
              </motion.div>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
}
