"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const FAQ_ITEMS = [
  {
    question: "Как GhostDesk работает поверх любых приложений?",
    answer:
      "GhostDesk — это лёгкий оверлей, который закрепляется поверх окон и вкладок. Он слушает системный звук, микрофон и считывает активное окно, не вмешиваясь в само приложение."
  },
  {
    question: "Какие данные обрабатываются локально, а какие — в облаке?",
    answer:
      "Вы контролируете источники. Часть фильтрации и распознавания проходит локально, а для глубокого анализа используется зашифрованная обработка в облаке. Чувствительные фрагменты можно исключать."
  },
  {
    question: "Поддерживается ли мой язык?",
    answer:
      "GhostDesk работает с десятками языков, включая русский и английский. Для редких языков доступны fallback-модели и возможность обучить словари."
  },
  {
    question: "Можно ли отключить экран/звук и оставить только микрофон?",
    answer:
      "Да. В настройках можно быстро выключить любой канал — GhostDesk продолжит слушать только выбранный источник."
  },
  {
    question: "Как экспортировать заметки и итоги встречи?",
    answer:
      "Итоги можно выгрузить в Markdown, PDF или напрямую отправить в Notion, Slack, CRM. Также доступен API для собственных интеграций."
  },
  {
    question: "Чем планы Pro и Team отличаются от Starter?",
    answer:
      "Starter рассчитан на личное использование. Pro добавляет пост-аналитику, шаблоны и расширенный архив. Team расширяет совместную работу: роли, коллекции, безопасность, приоритетную поддержку."
  }
];

export function FAQ() {
  const [query, setQuery] = useState("");
  const [openQuestion, setOpenQuestion] = useState<string | null>(FAQ_ITEMS[0]?.question ?? null);

  const filteredFaq = useMemo(
    () =>
      FAQ_ITEMS.filter(item => {
        if (!query) return true;
        const normalized = query.trim().toLowerCase();
        return (
          item.question.toLowerCase().includes(normalized) ||
          item.answer.toLowerCase().includes(normalized)
        );
      }),
    [query]
  );

  useEffect(() => {
    if (openQuestion && !filteredFaq.some(item => item.question === openQuestion)) {
      setOpenQuestion(filteredFaq[0]?.question ?? null);
    }
  }, [filteredFaq, openQuestion]);

  return (
    <section id="faq" className="relative mx-auto mt-32 w-full max-w-5xl px-4 sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <motion.span
          className="text-xs font-semibold uppercase tracking-[0.32em] text-foreground/60"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          FAQ
        </motion.span>
        <motion.h2
          className="mt-4 text-3xl font-semibold text-foreground sm:text-4xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          Остались вопросы? Ответим заранее
        </motion.h2>
      </div>
      <div className="mx-auto mt-8 max-w-2xl">
        <label className="relative flex items-center">
          <Search className="pointer-events-none absolute left-4 h-4 w-4 text-foreground/40" />
          <input
            type="search"
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Поиск по вопросам"
            className="w-full rounded-full border border-[var(--surface-border)] bg-[color-mix(in_srgb,var(--surface-elevated)_75%,transparent)] py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-foreground/40 focus:border-[var(--surface-border-strong)] focus:outline-none focus:ring-2 focus:ring-[rgba(91,140,255,0.3)]"
          />
        </label>
      </div>
      <div className="mt-12 space-y-4">
        {filteredFaq.map(item => {
          const isOpen = openQuestion === item.question;
          return (
            <div
              key={item.question}
              className="overflow-hidden rounded-3xl border border-[var(--surface-border)] bg-[color-mix(in_srgb,var(--surface-glass)_75%,transparent)]"
            >
              <button
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base text-foreground/80 transition hover:text-foreground"
                onClick={() => setOpenQuestion(isOpen ? null : item.question)}
                aria-expanded={isOpen}
              >
                <span className="text-lg font-medium text-foreground">{item.question}</span>
                <motion.span animate={{ rotate: isOpen ? 180 : 0 }}>
                  <ChevronDown className="h-5 w-5 text-foreground/50" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { height: "auto", opacity: 1 },
                      collapsed: { height: 0, opacity: 0 }
                    }}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <div className="px-6 pb-6 text-sm text-muted">{item.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
        {filteredFaq.length === 0 && (
          <div className="rounded-3xl border border-dashed border-[var(--surface-border)] bg-[color-mix(in_srgb,var(--surface-glass)_60%,transparent)] px-6 py-10 text-center text-sm text-muted">
            Не нашли ответ? Попробуйте изменить запрос или напишите нам в поддержку.
          </div>
        )}
      </div>
    </section>
  );
}
