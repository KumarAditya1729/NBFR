"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";

const stats = [
  { value: 38, label: "Districts", suffix: "", description: "Across the State" },
  { value: 110, label: "Million", suffix: "M+", description: "People of Bihar" },
  { value: 4, label: "Pillars", suffix: "", description: "Research, Policy, Impact, Action" },
  { value: 1, label: "Mission", suffix: "", description: "Bihar Renaissance" },
  { value: 2024, label: "Founded", suffix: "", description: "Year of Establishment" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate(v) {
        el.textContent = Math.round(v).toLocaleString() + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function ImpactCounter() {
  return (
    <section className="w-full bg-brand-secondary text-white py-14 px-4 overflow-hidden relative">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #EA580C 0%, transparent 50%), radial-gradient(circle at 80% 50%, #EA580C 0%, transparent 50%)" }} />

      <div className="max-w-[1400px] mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-[10px] font-mono uppercase tracking-[0.3em] text-brand-accent mb-10"
        >
          NBRF — By the Numbers
        </motion.p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center gap-1 group"
            >
              <div className="text-4xl sm:text-5xl font-serif font-bold text-white group-hover:text-brand-accent transition-colors duration-300">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs font-mono font-bold text-brand-accent uppercase tracking-widest mt-1">
                {stat.label}
              </div>
              <div className="text-[10px] text-white/50 font-sans mt-0.5">
                {stat.description}
              </div>
              {/* Divider dot */}
              {i < stats.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-10 bg-white/10" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
