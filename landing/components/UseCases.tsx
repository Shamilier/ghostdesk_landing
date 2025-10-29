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
import { useState } from "react";
import { GlassCard } from "./GlassCard";
import { SectionHeading } from "./SectionHeading";

const USE_CASES = [
  {
    title: "Собеседования",
    description: "Ответы, уточняющие вопросы, самопрезентация.",
    icon: Handshake,
    headline: "Уверенное общение на интервью",
    summary:
      "Ghost AI слушает диалог и в реальном времени подсказывает, как сформулировать мысль чётко, без пауз и лишней воды. Это помогает звучать сильнее на технических и продуктовых интервью.",
    bullets: [
      "Типовые вопросы по роли: разработчик, аналитик, продукт",
      "Мягкие формулировки, когда не знаешь ответ полностью",
      "Подсказки, какие уточнения задать интервьюеру"
    ],
    cta: "Подготовиться к интервью"
  },
  {
    title: "Лекции и пары",
    description: "Конспект, термины, важные моменты.",
    icon: GraduationCap,
    headline: "Понятный конспект без ручной записи",
    summary:
      "Ghost AI фиксирует ключевые тезисы лекции и переводит сложный жаргон в нормальный язык. В итоге остаётся не просто запись, а структура: тема, определения, примеры.",
    bullets: [
      "Термины типа Docker, CI/CD, OAuth — человеческим языком",
      "Выделение того, на чём делает акцент преподаватель",
      "Материал по занятию можно пересмотреть без переслушивания записи"
    ],
    cta: "Сохранить лекцию"
  },
  {
    title: "Подготовка к зачёту / экзамену",
    description: "Ключевые темы, формулировки, повторение.",
    icon: FileText,
    headline: "Собранный материал по предмету",
    summary:
      "По обсуждению темы Ghost AI фиксирует, что важно знать, как это объяснить и какие вопросы обычно задают. Это можно использовать как план повторения.",
    bullets: [
      "Краткие определения и формулы в одном месте",
      "Перечень типовых вопросов по теме",
      "Список «нужно разобрать отдельно»"
    ],
    cta: "Повторить тему"
  },
  {
    title: "Проекты и командные созвоны",
    description: "Кто делает что и к какому сроку.",
    icon: UsersRound,
    headline: "Чёткие договорённости без хаоса",
    summary:
      "Во время созвона по курсовой или рабочей задаче Ghost AI фиксирует решения, ответственных и дедлайны. После разговора не нужно собирать это вручную из памяти.",
    bullets: [
      "Кто отвечает за код, слайды, демонстрацию",
      "Следующие шаги по задаче в явном виде",
      "Прозрачные дедлайны для команды"
    ],
    cta: "Зафиксировать созвон"
  },
  {
    title: "Разбор экрана",
    description: "Код, слайды, задачи, документация.",
    icon: BriefcaseBusiness,
    headline: "Контекст разговора без переключений",
    summary:
      "Ghost AI видит экран: код, формулы, слайды, документ. Это позволяет получить подсказку по текущему шагу прямо в момент разговора — не лезть в поиск и не сбивать темп.",
    bullets: [
      "Объяснение непонятного фрагмента кода или термина",
      "Уточнение, что от тебя сейчас хотят",
      "Совет, какой следующий шаг предложить"
    ],
    cta: "Использовать во время звонка"
  },
  {
    title: "1:1 с наставником / ревью сеньора",
    description: "Фидбек, план роста, зоны улучшения.",
    icon: LifeBuoy,
    headline: "Чёткий следующий шаг по развитию",
    summary:
      "Ghost AI фиксирует, что тебе рекомендуют подтянуть — стек, софт-скиллы, слабые места в ответах — и формулирует это в понятные задачи, а не в абстрактное «надо расти».",
    bullets: [
      "Конкретные пробелы, которые замечают в речи",
      "Формулировки сильных сторон для резюме/профиля",
      "Список действий вместо общих советов"
    ],
    cta: "Получить план улучшений"
  }
];


export function UseCases() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCase = USE_CASES[activeIndex];

  return (
    <section id="use-cases" className="relative mx-auto mt-32 w-full max-w-6xl px-4 sm:px-6">
      <SectionHeading
        eyebrow="Сценарии"
        title="Ghost AI усиливает каждую встречу"
        description="Выбирайте сценарий, и вы увидите, как Ghost AI структурирует разговор."
      />
      <div className="mt-16 grid gap-12 lg:grid-cols-[1.2fr,0.9fr]">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {USE_CASES.map((useCase, index) => {
            const Icon = useCase.icon;
            const isActive = index === activeIndex;
            return (
              <motion.button
                key={useCase.title}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`glass relative overflow-hidden rounded-3xl p-6 text-left transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:p-7 ${
                  isActive ? "border-white/30 bg-white/10" : "border border-white/10 bg-white/5 hover:border-white/20"
                }`}
                whileHover={{ scale: isActive ? 1.02 : 1.03 }}
                whileTap={{ scale: 0.98 }}
                aria-pressed={isActive}
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">{useCase.title}</h3>
                <p className="mt-2 text-sm text-white/70">{useCase.description}</p>
                {isActive && (
                  <span className="mt-4 inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-white/80">
                    Активно
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
        <GlassCard className="h-full">
          <motion.div
            key={activeCase.title}
            className="flex h-full flex-col gap-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.3em] text-white/40">Выбранный сценарий</span>
              <h3 className="text-2xl font-semibold text-white">{activeCase.headline}</h3>
              <p className="text-sm leading-relaxed text-white/70 sm:text-base">{activeCase.summary}</p>
            </div>
            <motion.ul
              className="space-y-3 text-sm text-white/70 sm:text-base"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              {activeCase.bullets.map(point => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-2 w-2 flex-none rounded-full bg-white/60" />
                  <span>{point}</span>
                </li>
              ))}
            </motion.ul>
            <motion.a
              href="#cta"
              className="self-start rounded-full border border-white/20 bg-white/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white transition hover:border-white/40"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              {activeCase.cta}
            </motion.a>
          </motion.div>
        </GlassCard>
      </div>
    </section>
  );
}
