"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function NalandaParallax() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Different parallax rates for each layer
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.5, 0.7]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[400px] sm:h-[520px] overflow-hidden rounded-2xl"
      aria-label="Nalanda — Ancient Seat of Learning"
    >
      {/* Background layer — moves slowest */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 will-change-transform scale-110"
      >
        <Image
          src="/nalanda-ruins.png"
          alt="Ancient Nalanda University ruins at golden hour"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </motion.div>

      {/* Gradient overlay — gets darker on scroll */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-t from-brand-secondary via-brand-secondary/60 to-transparent pointer-events-none"
      />

      {/* Foreground text — moves opposite direction */}
      <motion.div
        style={{ y: textY }}
        className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 flex flex-col gap-3 will-change-transform"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[10px] font-mono text-brand-accent uppercase tracking-[0.35em]"
        >
          5th Century CE — Present
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-2xl sm:text-4xl font-bold text-white max-w-2xl leading-tight"
        >
          A Land of Ancient{" "}
          <span className="text-brand-accent">Wisdom</span>,{" "}
          <br className="hidden sm:block" />
          Born for a Modern{" "}
          <span className="text-brand-primary">Renaissance</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm text-white/70 max-w-xl leading-relaxed"
        >
          Nalanda once attracted scholars from China, Korea, Japan, Tibet, Mongolia, Sri Lanka, and Southeast Asia. 
          NBRF continues that legacy — connecting Bihar&apos;s intellectual heritage to its development future.
        </motion.p>
      </motion.div>

      {/* Top subtle vignette */}
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-background/40 to-transparent pointer-events-none" />
    </section>
  );
}
