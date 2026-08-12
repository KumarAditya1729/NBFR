"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const images = [
  {
    src: "/gallery-1.jpg",
    alt: "NBRF Meeting",
    caption: "NBRF Team Meeting",
  },
  // Add more images here in the future
];

export default function Glimpses() {
  return (
    <section id="gallery" className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div className="flex flex-col items-center justify-center text-center gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded border border-brand-primary/30 bg-brand-primary/10 text-brand-primary font-mono text-[10px] uppercase tracking-widest"
        >
          GLIMPSES // NBRF
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-mono font-bold text-brand-primary glow-text"
        >
          GALLERY
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="group relative rounded overflow-hidden aspect-[4/3] tech-card p-2"
          >
            <div className="relative w-full h-full rounded overflow-hidden bg-surface">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white font-mono text-sm tracking-wider translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {img.caption}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
