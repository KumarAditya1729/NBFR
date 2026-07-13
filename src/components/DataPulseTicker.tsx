"use client";

export default function DataPulseTicker() {
  const stats = [
    "🏛️ Magadh Empire (6th Century BC) & Mauryan Dynasty (321 BC)",
    "👥 Population Density: 1106 / km² (Highest in India)",
    "📚 Literacy Rate: 61.8% (2011 Census)",
    "🗺️ 38 Districts Across the State",
    "🌾 ~89% Rural Population",
    "🎓 Home to Ancient Nalanda University",
    "🌊 Ganges, Gandak, Kosi — Major Rivers",
    "🏭 14th Largest State by GDP",
    "🌱 Major Producer of Makhana, Maize & Litchi",
    "📊 GDP Growth: ~10% (2022-23)",
    "🏆 Birthplace of Buddhism & Jainism",
    "🏙️ Patna — Capital & Largest City",
  ];

  // Duplicate for seamless loop
  const tickerItems = [...stats, ...stats];

  return (
    <div
      className="fixed top-16 left-0 right-0 z-40 overflow-hidden border-b border-brand-primary/20 bg-background/80 backdrop-blur-sm"
      aria-hidden="true"
    >
      <div className="flex items-center h-8 gap-0">
        {/* Label badge */}
        <div className="shrink-0 flex items-center gap-1.5 px-3 h-full bg-brand-primary text-white text-[10px] font-mono font-bold uppercase tracking-widest z-10 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse inline-block" />
          Bihar Pulse
        </div>

        {/* Scrolling ticker */}
        <div className="relative flex-1 overflow-hidden h-full">
          <div className="ticker-track flex items-center gap-0 absolute top-0 left-0 h-full whitespace-nowrap">
            {tickerItems.map((stat, i) => (
              <span key={i} className="inline-flex items-center gap-2 px-6 text-[11px] font-mono text-muted border-r border-border/60 h-full">
                {stat}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .ticker-track {
          animation: ticker-scroll 60s linear infinite;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ticker-track { animation: none; }
        }
      `}</style>
    </div>
  );
}
