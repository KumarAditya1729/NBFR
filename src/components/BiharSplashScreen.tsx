"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function BiharSplashScreen() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("nbrf_splash_seen");
    if (!seen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShow(true);
      sessionStorage.setItem("nbrf_splash_seen", "1");
      const timer = setTimeout(() => setShow(false), 2800);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
          aria-hidden="true"
        >
          {/* Decorative ambient glows */}
          <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-brand-primary/10 blur-[80px] pointer-events-none" />
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-brand-accent/20 blur-[80px] pointer-events-none" />

          {/* Logo draw-in */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative w-24 h-24 mb-6"
          >
            <div className="w-full h-full rounded-full border-2 border-brand-primary/30 flex items-center justify-center bg-white shadow-xl overflow-hidden p-2">
              <Image
                src="/logo.png"
                alt="NBRF Logo"
                width={80}
                height={80}
                className="w-full h-full object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center"
          >
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              Nav Bihar{" "}
              <span className="text-brand-primary">Renaissance</span>{" "}
              Foundation
            </h1>
            <p className="text-xs font-mono text-muted uppercase tracking-[0.3em] mt-2">
              Think Tank · Bihar
            </p>
          </motion.div>

          {/* Animated loading line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2.2, delay: 0.6, ease: "linear" }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 w-40 h-[2px] bg-brand-primary origin-left rounded-full"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
