"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const events = [
  {
    year: "6th Century BC",
    era: "Ancient",
    title: "Magadh Empire",
    desc: "Emerging in the 6th century BC in ancient Bihar, the Magadh Empire became India's most powerful Mahajanapada under rulers like Bimbisara and Ajatashatru.",
    icon: "👑",
    color: "#B45309",
  },
  {
    year: "321 BC",
    era: "Ancient",
    title: "Mauryan Dynasty / Empire",
    desc: "Founded by Chandragupta Maurya with Pataliputra (Patna) as its capital, the Mauryan Dynasty united most of the Indian subcontinent into a vast ancient empire.",
    icon: "🏛️",
    color: "#D97706",
  },
  {
    year: "268 BC",
    era: "Ancient",
    title: "Emperor Ashoka",
    desc: "Ashoka the Great ruled from Pataliputra (Patna), spreading Buddhism and ethics across the known world through his edicts.",
    icon: "☸️",
    color: "#059669",
  },
  {
    year: "5th Century",
    era: "Classical",
    title: "Nalanda University",
    desc: "Nalanda, the ancient world's greatest seat of learning, attracted thousands of scholars from across Asia. It stood as a beacon of knowledge for over 700 years.",
    icon: "🏛️",
    color: "#1E3A8A",
  },
  {
    year: "1193 AD",
    era: "Medieval",
    title: "Nalanda Destroyed",
    desc: "Bakhtiyar Khilji's forces sacked and burned Nalanda University, ending one of humanity's greatest centers of learning.",
    icon: "🔥",
    color: "#DC2626",
  },
  {
    year: "1540 AD",
    era: "Medieval",
    title: "Sher Shah Suri",
    desc: "Born in Sasaram, Bihar, Sher Shah Suri built the Grand Trunk Road and reformed India's administration and currency system.",
    icon: "🛤️",
    color: "#6D28D9",
  },
  {
    year: "1912",
    era: "Modern",
    title: "Bihar State Formation",
    desc: "Bihar was carved out from Bengal Presidency on March 22, 1912, becoming a separate administrative province.",
    icon: "🗺️",
    color: "#EA580C",
  },
  {
    year: "1947",
    era: "Modern",
    title: "Independence Era",
    desc: "Bihar played a pivotal role in India's independence movement. Dr. Rajendra Prasad, from Bihar, became India's first President.",
    icon: "🇮🇳",
    color: "#059669",
  },
  {
    year: "2000",
    era: "Contemporary",
    title: "Jharkhand Separation",
    desc: "Jharkhand was carved out of Bihar, reshaping the state's geography and prompting new development imperatives.",
    icon: "🌿",
    color: "#475569",
  },
  {
    year: "2024",
    era: "Renaissance",
    title: "NBRF Founded",
    desc: "Nav Bihar Renaissance Foundation is established — a pioneering think tank committed to Bihar's holistic development through research, policy and action.",
    icon: "🌱",
    color: "#EA580C",
  },
];

const eraColors: Record<string, string> = {
  Ancient: "#B45309",
  Classical: "#1E3A8A",
  Medieval: "#6D28D9",
  Modern: "#059669",
  Contemporary: "#475569",
  Renaissance: "#EA580C",
};

export default function BiharTimeline() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.querySelector(".timeline-card") as HTMLElement;
    const cardW = card ? card.offsetWidth + 24 : 320;
    scrollRef.current.scrollBy({ left: dir === "right" ? cardW : -cardW, behavior: "smooth" });
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.querySelector(".timeline-card") as HTMLElement;
    const cardW = card ? card.offsetWidth + 24 : 320;
    const idx = Math.round(scrollRef.current.scrollLeft / cardW);
    setActiveIndex(Math.min(idx, events.length - 1));
  };

  return (
    <section ref={containerRef} className="w-full py-12 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 px-1"
      >
        <div>
          <p className="text-[10px] font-mono text-muted uppercase tracking-[0.25em] mb-1">A Journey Through Time</p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
            Bihar&apos;s <span className="text-brand-primary">Living History</span>
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted hover:text-brand-primary hover:border-brand-primary transition-colors"
            aria-label="Scroll timeline left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted hover:text-brand-primary hover:border-brand-primary transition-colors"
            aria-label="Scroll timeline right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Connecting line */}
      <div className="relative">
        <div className="absolute top-[56px] left-0 right-0 h-px bg-border pointer-events-none" />

        {/* Scrollable cards */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >
          {events.map((event, i) => (
            <motion.div
              key={event.year}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.05 * i }}
              className="timeline-card tech-card p-5 flex flex-col gap-3 min-w-[260px] sm:min-w-[300px] snap-start flex-shrink-0 cursor-pointer group relative"
              style={{
                borderTopColor: event.color,
                borderTopWidth: "3px",
                opacity: activeIndex === i ? 1 : 0.75,
              }}
            >
              {/* Dot on the connecting line */}
              <div
                className="absolute -top-[29px] left-6 w-4 h-4 rounded-full border-2 border-white shadow-sm z-10 transition-transform group-hover:scale-125"
                style={{ backgroundColor: event.color }}
              />

              {/* Era badge */}
              <div className="flex items-center justify-between">
                <span
                  className="text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border font-bold"
                  style={{ color: eraColors[event.era], borderColor: eraColors[event.era] + "40", backgroundColor: eraColors[event.era] + "10" }}
                >
                  {event.era}
                </span>
                <span className="text-2xl">{event.icon}</span>
              </div>

              {/* Year */}
              <div
                className="font-mono font-bold text-2xl"
                style={{ color: event.color }}
              >
                {event.year}
              </div>

              {/* Title */}
              <h3 className="font-serif font-bold text-foreground text-lg leading-snug">
                {event.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-muted leading-relaxed flex-1">
                {event.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-1.5 mt-6">
        {events.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to event ${i + 1}`}
            onClick={() => {
              if (!scrollRef.current) return;
              const card = scrollRef.current.querySelector(".timeline-card") as HTMLElement;
              const cardW = card ? card.offsetWidth + 24 : 320;
              scrollRef.current.scrollTo({ left: i * cardW, behavior: "smooth" });
              setActiveIndex(i);
            }}
            className="rounded-full transition-all duration-300"
            style={{
              width: activeIndex === i ? "24px" : "8px",
              height: "8px",
              backgroundColor: activeIndex === i ? "var(--color-brand-primary)" : "var(--color-border)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
