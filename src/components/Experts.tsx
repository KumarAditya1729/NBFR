"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";

export default function Experts() {
  const experts = [
    {
      name: "Arun Kumar Singh",
      role: "Director",
      hash: "dir-01",
      image: "/directors/arun-kumar-singh.jpg",
      bio: "Having completed his graduation from Patna Science College in 1976 with a major in physics, he cracked Civil Services Examination in the year 1977 & joined the Indian Audit and Accounts Service in 1978. Though selected also for I. P. S., he chose to place it aside and join the Audit Service. He later served in many states as Accountant General and Principal Accountant General. Finally, he served as Deputy CAG of India finalizing Union government reports on various civil ministries and departments."
    },
    {
      name: "Gyan Mohan",
      role: "Director",
      hash: "dir-02",
      image: "/directors/gyan-mohan.jpg",
      bio: "A seasoned banking professional with over three decades of comprehensive experience across all domains of banking and finance, including investment and international banking. His distinguished career includes senior leadership roles at SBI, IDBI Capital, Power Exchange, and FSIL. At SBI Capital Markets, he served as Senior VP & Group Head of Mergers, Acquisitions & Advisory, leading high-profile privatization and strategic advisory assignments. His international exposure includes a five-year stint as VP (Forex and Money Control) at SBI's Frankfurt branch. Currently Director & CEO at Adi Chitragupta Finance Limited (ACFL), he also chairs the Task Force on Small & Medium MFIs at MFIN and contributes to key policy formulation in the microfinance sector. | Mobile: +91 99200 42390"
    },
    {
      name: "Dr. Satyajit Kumar Singh",
      role: "Director",
      hash: "dir-03",
      image: "/directors/satyajit-kumar-singh.jpg",
      bio: "He is the managing director and a guiding force behind the establishment of the famous Ruban Memorial Hospital, Patna, and is a well-renowned and highly experienced Urologist of Bihar. An alumnus of the prestigious Patna Medical & College Hospital (PMCH), Dr. Satyajit has always been doing his bit for the society. After working for 17 years in an international ambience, he left a thriving overseas career to establish Ruban Memorial Hospital in Bihar."
    },
    {
      name: "Prof. Nirmal Kumar",
      role: "Director",
      hash: "dir-04",
      image: "/directors/nirmal-kumar.jpg",
      bio: "He is an academic leader with extensive experience in engineering education. A graduate of BIT Sindri (1979), he began his career establishing Magadh Engineering College. Nirmal Kumar enhanced his expertise by completing an M.Tech and Ph.D. at IIT Delhi. Throughout his 31-year tenure at MIT Muzaffarpur, Prof. Kumar held various leadership roles, including Principal of several engineering colleges across Bihar. He has made significant contributions to rural housing and technology transfer."
    },
    {
      name: "A.M Prasad",
      role: "Director",
      hash: "dir-05",
      image: "/directors/am-prasad.jpg",
      bio: "A.M. Prasad is a distinguished retired officer of the Indian Revenue Service (IRS). He held prestigious positions, including Member of the National Tribunal on Forfeited Properties and Special Secretary in the Ministry of Finance, where he was Director General of the Central Bureau of Economic Intelligence. Post-retirement, Prasad served as President of the National Human Resources Development Network's Patna Chapter and established a public library and free school in Patna."
    },
  ];

  const [expandedBio, setExpandedBio] = useState<string | null>(null);

  const toggleBio = (hash: string) => {
    if (expandedBio === hash) {
      setExpandedBio(null);
    } else {
      setExpandedBio(hash);
    }
  };

  return (
    <section id="experts" className="py-24 bg-surface border-t border-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded border border-brand-secondary/30 bg-brand-secondary/10 text-brand-secondary font-mono text-[10px] uppercase tracking-widest mb-4"
          >
            LEADERSHIP // DIRECTORS
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-mono font-bold text-brand-primary mb-6 glow-text-blue"
          >
            BOARD OF DIRECTORS
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted text-lg font-sans max-w-2xl mx-auto"
          >
            The founding board of Nav Bihar Renaissance Foundation — seasoned leaders from public service, banking, medicine, academia, and administration.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experts.map((expert, i) => {
            const isExpanded = expandedBio === expert.hash;
            return (
              <motion.div
                key={expert.hash}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`tech-card group overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 ${isExpanded ? 'ring-1 ring-brand-secondary' : ''}`}
              >
                {/* Photo area */}
                <div className="relative h-64 overflow-hidden shrink-0">
                  {expert.image ? (
                    <Image
                      src={expert.image}
                      alt={expert.name}
                      fill
                      className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-background flex flex-col items-center justify-center gap-3">
                      <div className="w-24 h-24 rounded-full bg-brand-primary/10 border-2 border-brand-primary/30 flex items-center justify-center">
                        <span className="text-4xl font-mono font-bold text-brand-primary">
                          {expert.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-muted">PHOTO COMING SOON</span>
                    </div>
                  )}
                  {/* Gradient overlay at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
                  {/* Director badge */}
                  <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur px-2 py-1 rounded border border-white/10">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
                    <span className="text-[10px] font-mono text-white">DIRECTOR</span>
                  </div>
                  {/* Name overlaid at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 z-20 p-5">
                    <h3 className="text-xl font-mono font-bold text-white leading-tight">
                      {expert.name}
                    </h3>
                    <p className="text-brand-primary font-mono text-xs uppercase tracking-widest mt-1">
                      {expert.role}
                    </p>
                  </div>
                </div>

                {/* Bio section */}
                <div className="p-5 flex flex-col flex-grow">
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden mb-4"
                      >
                        <p className="text-sm text-muted font-sans leading-relaxed border-t border-border pt-4">
                          {expert.bio}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    onClick={() => toggleBio(expert.hash)}
                    className="mt-auto w-full tech-button py-2.5 px-4 flex items-center justify-center gap-2 text-xs text-brand-secondary border-brand-secondary/30 hover:bg-brand-secondary/10 hover:border-brand-secondary"
                  >
                    {isExpanded ? (
                      <>CLOSE PROFILE <ChevronUp className="w-4 h-4" /></>
                    ) : (
                      <>VIEW PROFILE <ChevronDown className="w-4 h-4" /></>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Management Team */}
        <div className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs font-mono text-muted uppercase tracking-widest px-4">Management Team</span>
            <div className="h-px flex-1 bg-border" />
          </motion.div>

          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="tech-card group overflow-hidden flex flex-col w-full max-w-xs hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden shrink-0">
                <Image
                  src="/directors/shashank-shrivastava.jpg"
                  alt="Shashank Shrivastava"
                  fill
                  className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
                <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur px-2 py-1 rounded border border-white/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                  <span className="text-[10px] font-mono text-white">MANAGEMENT</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 z-20 p-5">
                  <h3 className="text-xl font-mono font-bold text-white leading-tight">Shashank Shrivastava</h3>
                  <p className="text-brand-accent font-mono text-xs uppercase tracking-widest mt-1">Manager, NBRF Think Tank</p>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-muted font-sans leading-relaxed">
                  Managing day-to-day operations and strategic coordination at Nav Bihar Renaissance Foundation, driving research initiatives and institutional partnerships.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
