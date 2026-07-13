"use client";

import { motion } from "framer-motion";

const facts = [
  {
    value: "₹7.46L Cr",
    label: "State GDP",
    description: "Nominal GDP (2022-23)",
    icon: "📈",
    color: "var(--color-cat-economy)",
  },
  {
    value: "61.8%",
    label: "Literacy Rate",
    description: "Census 2011 data",
    icon: "📚",
    color: "var(--color-cat-social)",
  },
  {
    value: "1,106 / km²",
    label: "Population Density",
    description: "Per sq. km — highest in India (Census 2011)",
    icon: "👥",
    color: "var(--color-cat-policy)",
  },
  {
    value: "60%",
    label: "Agricultural Land",
    description: "Of total geographic area",
    icon: "🌾",
    color: "var(--color-cat-infra)",
  },
  {
    value: "38",
    label: "Districts",
    description: "Each with unique development needs",
    icon: "🗺️",
    color: "var(--color-brand-primary)",
  },
  {
    value: "10+",
    label: "Major Rivers",
    description: "Ganga, Kosi, Son, Gandak, Bagmati & more",
    icon: "🌊",
    color: "var(--color-info)",
  },
];

export default function BiharInNumbers() {
  return (
    <section className="w-full py-10 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-6 px-1"
      >
        <span className="text-[10px] font-mono text-muted uppercase tracking-[0.25em]">Bihar in Numbers</span>
        <div className="flex-1 h-px bg-border" />
      </motion.div>

      {/* Horizontally scrollable on mobile, grid on desktop */}
      <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide sm:grid sm:grid-cols-3 lg:grid-cols-6 sm:overflow-visible">
        {facts.map((fact, i) => (
          <motion.div
            key={fact.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="tech-card p-4 flex flex-col gap-2 min-w-[160px] snap-start flex-shrink-0 sm:min-w-0 group hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="flex items-center justify-between">
              <span className="text-xl">{fact.icon}</span>
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: fact.color }}
              />
            </div>
            <div
              className="text-2xl font-serif font-bold leading-none"
              style={{ color: fact.color }}
            >
              {fact.value}
            </div>
            <div className="text-xs font-mono font-bold text-foreground">
              {fact.label}
            </div>
            <div className="text-[10px] text-muted leading-relaxed">
              {fact.description}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
