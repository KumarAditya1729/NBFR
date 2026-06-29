"use client";

import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { useEffect, useState } from "react";

function Leaf({ cx, cy, delay, smoothProgress }: { cx: number, cy: number, delay: number, smoothProgress: MotionValue<number> }) {
  const scale = useTransform(smoothProgress, [delay, delay + 0.05], [0, 1]);
  return (
    <motion.path
      d={`M ${cx} ${cy} Q ${cx + 20} ${cy - 20} ${cx} ${cy - 40} Q ${cx - 20} ${cy - 20} ${cx} ${cy}`}
      fill="currentColor"
      style={{ scale, transformOrigin: `${cx}px ${cy}px` }}
    />
  );
}

export default function GrowingVines() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Use a spring to make the growth feel smooth and organic
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // We draw a tall path that represents the vine. 
  // We'll use a large viewBox so it can cover a lot of vertical scrolling.
  // Using percentages or a very tall viewBox (0 0 100 2000) helps maintain aspect ratio better than none.
  
  const pathD = "M 50 0 C 80 200, 20 400, 50 600 C 80 800, 20 1000, 50 1200 C 80 1400, 20 1600, 50 1800 C 80 2000, 20 2200, 50 2400 C 80 2600, 20 2800, 50 3000";
  
  // We can place leaves along the path. 
  // We will simply render them and scale them up based on the scroll progress hitting their Y coordinate.
  const leaves = [
    { cx: 72, cy: 150, delay: 0.05 },
    { cx: 28, cy: 350, delay: 0.12 },
    { cx: 72, cy: 550, delay: 0.18 },
    { cx: 28, cy: 750, delay: 0.25 },
    { cx: 72, cy: 950, delay: 0.31 },
    { cx: 28, cy: 1150, delay: 0.38 },
    { cx: 72, cy: 1350, delay: 0.45 },
    { cx: 28, cy: 1550, delay: 0.51 },
    { cx: 72, cy: 1750, delay: 0.58 },
    { cx: 28, cy: 1950, delay: 0.65 },
    { cx: 72, cy: 2150, delay: 0.71 },
    { cx: 28, cy: 2350, delay: 0.78 },
    { cx: 72, cy: 2550, delay: 0.85 },
    { cx: 28, cy: 2750, delay: 0.91 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden flex justify-between">
      
      {/* Left Vine */}
      <div className="w-12 sm:w-20 lg:w-32 h-full opacity-30">
        <svg 
          viewBox="0 0 100 3000" 
          preserveAspectRatio="xMidYMax slice" 
          className="w-full h-full text-brand-success drop-shadow-sm"
        >
          {/* Main Stem */}
          <motion.path
            d={pathD}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="3"
            style={{ pathLength: smoothProgress }}
            strokeLinecap="round"
          />
          {/* Leaves */}
          {leaves.map((leaf, i) => (
            <Leaf 
              key={`left-leaf-${i}`} 
              cx={leaf.cx} 
              cy={leaf.cy} 
              delay={leaf.delay} 
              smoothProgress={smoothProgress} 
            />
          ))}
        </svg>
      </div>

      {/* Right Vine (Flipped) */}
      <div className="w-12 sm:w-20 lg:w-32 h-full opacity-30 scale-x-[-1]">
        <svg 
          viewBox="0 0 100 3000" 
          preserveAspectRatio="xMidYMax slice" 
          className="w-full h-full text-brand-success drop-shadow-sm"
        >
          {/* Main Stem */}
          <motion.path
            d={pathD}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="3"
            style={{ pathLength: smoothProgress }}
            strokeLinecap="round"
          />
          {/* Leaves */}
          {leaves.map((leaf, i) => (
            <Leaf 
              key={`right-leaf-${i}`} 
              cx={leaf.cx} 
              cy={leaf.cy} 
              delay={leaf.delay} 
              smoothProgress={smoothProgress} 
            />
          ))}
        </svg>
      </div>

    </div>
  );
}
