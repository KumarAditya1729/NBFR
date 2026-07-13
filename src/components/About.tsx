"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Users, Target, Rocket, Eye, Info } from "lucide-react";
import Link from "next/link";

export default function About() {
  const [activeTab, setActiveTab] = useState("about");

  const tabs = [
    { id: "about", label: "ABOUT US", icon: Info },
    { id: "objective", label: "OBJECTIVE", icon: Target },
    { id: "mission", label: "MISSION", icon: Rocket },
    { id: "vision", label: "VISION", icon: Eye },
  ];

  const content = {
    about: (
      <div className="space-y-4 text-muted font-sans text-sm md:text-base leading-relaxed">
        <p>
          <strong className="text-brand-primary">The Nav Bihar Renaissance Foundation (NBRF)</strong> is Bihar&apos;s pioneering think tank, dedicated to addressing the state&apos;s developmental challenges. With data-driven insights and research, we provide strategic solutions across social, economic, cultural, and other sectors, enabling Bihar to realize its full potential.
        </p>
        <p>
          Bihar has a glorious past; it was the centre of political and spiritual power in India. Pataliputra was the capital of the Maurya Empire and later the Gupta Empire. Bihar was the land where Gautam Buddha obtained enlightenment when he began spreading the teachings of his new faith—Buddhism. Mahavir, the 24th Tirthankara of Jainism, was from Vaishali.
        </p>
        <p>
          Today, Bihar is visited by global travelers and pilgrims drawn to historical landmarks connected with the lives of these great religious leaders. Later, Patna became an important centre of Sikhism also as the tenth guru, Guru Govind Singh, was born in Patna City. In modern times, Patna developed as an important trade and administrative centre.
        </p>
        <p>
          After independence, until the late 1950s, the administration of Bihar was cited as excellent. However, challenges emerged during the mid-1960s and 1970s. Now, the Nav Bihar Renaissance Foundation has been set up to identify developmental gaps in various sectors and suggest actionable measures to bridge them. We submit our survey and research-based reports to stakeholders and collaborate closely to implement our recommendations.
        </p>
      </div>
    ),
    objective: (
      <div className="space-y-4 text-muted font-sans text-sm md:text-base leading-relaxed">
        <p>
          The Nav Bihar Renaissance Foundation (NBRF) aims to function as a premier think tank dedicated to addressing Bihar&apos;s developmental challenges. Through comprehensive research and analysis, NBRF will assess gaps across social, economic, cultural, and other sectors, and identify actionable solutions.
        </p>
        <p>
          The objective is to provide data-driven insights and recommendations to policymakers, institutions, and stakeholders that can be translated into sustainable development strategies, enabling Bihar to realize its full potential.
        </p>
      </div>
    ),
    mission: (
      <div className="space-y-4 text-muted font-sans text-sm md:text-base leading-relaxed">
        <p>
          The NBRF&apos;s mission is to spearhead the renaissance of Bihar by facilitating well-researched policy reforms, fostering innovation, and promoting best practices across sectors. We aim to be a catalyst for positive change by actively identifying the factors hindering Bihar&apos;s development and working closely with stakeholders to bridge these gaps.
        </p>
        <p>
          Through research, advocacy, and strategic partnerships, we seek to transform Bihar into a state of prosperity, growth, and inclusive development, ensuring that all citizens can partake in this resurgence.
        </p>
      </div>
    ),
    vision: (
      <div className="space-y-4 text-muted font-sans text-sm md:text-base leading-relaxed">
        <p>
          The Nav Bihar Renaissance Foundation envisions a Bihar that is a leading state in economic prosperity, cultural richness, and social development. We strive for a future where Bihar is recognized as a model for growth and development, with thriving industries, advanced infrastructure, equitable social systems, and a population that enjoys a high standard of living.
        </p>
        <p>
          Our long-term vision is to see Bihar&apos;s transformation into a state that harnesses its potential to the fullest, empowering its people and restoring its historical greatness on a global stage.
        </p>
      </div>
    )
  };

  return (
    <section id="about" className="py-24 bg-background border-t border-border relative overflow-hidden">
      {/* Decorative Grid Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-border"></div>

      {/* Bodhi Tree Background Watermark */}
      <div className="absolute right-[-40px] top-1/2 -translate-y-1/2 z-0 pointer-events-none opacity-[0.06] w-[420px]">
        <Image
          src="/bodhi-tree.svg"
          alt=""
          aria-hidden="true"
          fill
          className="object-contain"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded border border-brand-primary/30 bg-brand-primary/10 text-brand-primary font-mono text-[10px] uppercase tracking-widest mb-4"
          >
            ABOUT // NBRF
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-mono font-bold text-brand-primary mb-6 glow-text"
          >
            ABOUT NBRF
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Tab Navigation */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col gap-2 overflow-x-auto scroll-x pb-4 lg:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-6 py-4 rounded text-left font-mono text-sm transition-all whitespace-nowrap lg:whitespace-normal shrink-0 lg:shrink ${
                    isActive 
                      ? 'bg-brand-primary/10 border border-brand-primary text-brand-primary shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                      : 'bg-surface border border-border text-muted hover:border-brand-primary/50 hover:text-brand-primary'
                  }`}
                >
                  <tab.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-brand-primary' : 'text-muted'}`} />
                  {tab.label}
                </button>
              );
            })}
            
            <div className="hidden lg:flex flex-col gap-4 mt-8">
              <Link href="#experts" className="tech-button flex items-center justify-center gap-2">
                Leadership <Users className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Tab Content */}
          <div className="lg:col-span-8">
            <div className="tech-card p-5 sm:p-8 md:p-10 min-h-[280px] sm:min-h-[400px] relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-[50px] pointer-events-none"></div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-mono font-bold text-brand-primary mb-6 uppercase tracking-tight">
                    {tabs.find(t => t.id === activeTab)?.label}
                  </h3>
                  {content[activeTab as keyof typeof content]}
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="lg:hidden flex gap-4 mt-8">
              <Link href="#experts" className="tech-button w-full flex items-center justify-center gap-2">
                Leadership <Users className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
