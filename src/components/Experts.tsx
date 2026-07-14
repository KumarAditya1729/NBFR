"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";

export default function Experts({ experts: expertsProp }: { experts?: any[] } = {}) {
  // Real NBRF Board of Directors — displayed as static default when Sanity CMS has no experts
  const BOARD_OF_DIRECTORS = [
    {
      name: "Santosh Kumar",
      role: "Director | Social Entrepreneur, RTI Champion & Former World Bank Consultant",
      hash: "dir-01",
      image: "/directors/santosh-kumar.jpg",
      bio: "Santosh Kumar is a dynamic social entrepreneur and RTI champion who walked away from a promising IT and government career to transform rural India. An MCA alumnus from Delhi University, he first made waves by successfully fighting to mandate the public disclosure of government officials' assets under the RTI Act.\n\nToday, Santosh drives systemic change in Bihar through a powerful dual strategy: enforcing public accountability via PILs and pioneering award-winning, low-cost livelihood models like commercial goat farming to create mass rural employment. A former World Bank consultant, his innovative frameworks are officially endorsed by ICAR and recommended to the Ministry of MSME. As a trusted thought leader, he is a regular national newspaper columnist, a frequent TV debate panelist, and has been widely honored by State Governors and media outlets alike."
    },
    {
      name: "Arun Kumar Singh",
      role: "Former Deputy Comptroller & Auditor General of India | IA&AS",
      hash: "dir-02",
      image: "/directors/arun-kumar-singh.jpg",
      bio: "Arun Kumar Singh is a distinguished retired officer of the Indian Audit and Accounts Service (IA&AS) with an exceptional career in public finance, government auditing, and institutional governance. After graduating in Physics from Patna Science College in 1976, he successfully cleared the Civil Services Examination in 1977 and joined the IA&AS in 1978.\n\nDuring his distinguished career, he served as Accountant General and Principal Accountant General across multiple states, leading audits of state government departments and strengthening financial accountability. He also held senior positions in New Delhi, overseeing audits of Public Sector Undertakings (PSUs) and Central Government ministries.\n\nHis final assignment was as Deputy Comptroller & Auditor General of India, where he supervised the preparation and finalization of audit reports relating to several important national programmes, including archaeological conservation, museums, the National Rural Health Mission, Rashtriya Krishi Vikas Yojana, Indira Awaas Yojana, urban renewal initiatives, and rural electrification programmes. His decades of experience in public administration and financial oversight provide invaluable guidance to the Nav Bihar Renaissance Foundation."
    },
    {
      name: "Gyan Mohan",
      role: "Senior Banking & Financial Services Professional",
      hash: "dir-03",
      image: "/directors/gyan-mohan.jpg",
      bio: "Gyan Mohan is an accomplished banking and finance professional with more than four decades of leadership experience across commercial banking, investment banking, financial services, and microfinance. Throughout his career, he has served in senior management positions at the State Bank of India, SBI Capital Markets, IDBI Capital, Power Exchange India Limited, India Fortune Financial Services Limited, and SIS Limited.\n\nHe currently heads Adi Chitragupta Finance Limited (ACFL), the only RBI-registered NBFC-MFI headquartered in Bihar. Under his leadership, the institution has contributed significantly to expanding financial inclusion and access to credit.\n\nMr. Mohan also serves as a Director on the Governing Board of the Microfinance Institutions Network (MFIN), an RBI-accredited self-regulatory organisation. As Chairman of the Task Force on Small and Medium MFIs and an active member of the Credit Bureau Task Force and State Initiative Task Force, he continues to contribute to policy development and advocacy within India's microfinance sector."
    },
    {
      name: "Dr. Satyajit Kumar Singh",
      role: "Managing Director, Ruban Memorial Hospital | Senior Urologist",
      hash: "dir-04",
      image: "/directors/Dr.-Satyajit-Kumar-Singh.jpg",
      bio: "Dr. Satyajit Kumar Singh is a renowned urologist and healthcare leader with more than thirty years of professional experience in urology and andrology. He serves as the Managing Director of Ruban Memorial Hospital, Patna, one of Bihar's leading healthcare institutions.\n\nAn alumnus of Patna Medical College Hospital (PMCH), Dr. Singh completed his postgraduate medical education before pursuing advanced training in the United Kingdom, where he established a successful private medical practice. He later served as a Consultant Urologist at an American hospital in Saudi Arabia before returning to Bihar in 1996.\n\nFollowing seventeen years of international medical practice, Dr. Singh returned to his home state with the vision of strengthening healthcare services by establishing Ruban Memorial Hospital. Throughout his career, he has remained committed to improving healthcare access and applying his expertise for the welfare of underserved communities across Bihar."
    },
    {
      name: "Prof. Nirmal Kumar",
      role: "Former Principal | Civil Engineer | Academic Administrator",
      hash: "dir-05",
      image: "/directors/Prof.-Nirmal-Kumar.jpg",
      bio: "Prof. Nirmal Kumar is an eminent academician and engineering educator with extensive experience in higher education, institutional leadership, and civil engineering. A graduate of BIT Sindri with First Class Honours in Civil Engineering, he began his career by contributing to the establishment of Magadh Engineering College before joining the Muzaffarpur Institute of Technology through the Bihar Public Service Commission.\n\nHe later completed his M.Tech in Structural Engineering and earned a Ph.D. from IIT Delhi, where his research focused on rural housing and technology transfer in Bihar.\n\nDuring his thirty-one-year association with the Muzaffarpur Institute of Technology, Prof. Kumar held several important academic and administrative positions, including Principal of multiple engineering colleges across Bihar. He is a Chartered Engineer and Life Member of the Institution of Engineers (India), as well as a member of the Indian Society of Earthquake Technology and the Indian Building Congress. His academic contributions include numerous journal publications, conference papers, and consultancy assignments for government organisations."
    },
    {
      name: "A. M. Prasad",
      role: "Former IRS Officer | Former Special Secretary, Govt. of India",
      hash: "dir-06",
      image: "/directors/A.M-Prasad.jpg",
      bio: "A. M. Prasad is a distinguished retired officer of the Indian Revenue Service (IRS) who has served in several senior leadership positions within the Government of India. During his distinguished public service career, he held offices including Member of the National Tribunal on Forfeited Properties, Special Secretary in the Ministry of Finance, Director General of the Central Bureau of Economic Intelligence, Member of the Central Board of Excise and Customs, and Chief Commissioner of Central Excise and Customs, Mumbai.\n\nHis professional responsibilities also included leadership in economic intelligence, customs administration, and narcotics enforcement, with several deputations to United Nations agencies on international assignments.\n\nFollowing his retirement, Mr. Prasad continued his commitment to public service through leadership roles in professional and social organisations. He served as President of the Patna Chapter of the National Human Resources Development Network and the Bihar Human Rights Association. He has also served as an Independent Director in the pharmaceutical sector while actively promoting education and community welfare by establishing a public library and supporting a free school for children from underprivileged families in Patna."
    },
  ];

  // Use Sanity CMS data if available, otherwise display real static board data
  const displayExperts = (expertsProp && expertsProp.length > 0) ? expertsProp : BOARD_OF_DIRECTORS;


  const [expandedBio, setExpandedBio] = useState<string | null>(null);

  const toggleBio = (hash: string) => {
    if (expandedBio === hash) {
      setExpandedBio(null);
    } else {
      setExpandedBio(hash);
    }
  };

  return (
    <section id="experts" className="py-24 bg-background relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      
      {/* Decorative accent orb */}
      <div className="absolute top-1/3 -left-40 w-80 h-80 bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-40 w-80 h-80 bg-brand-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded border border-brand-primary/30 bg-brand-primary/10 text-brand-primary font-mono text-[10px] uppercase tracking-widest mb-4"
          >
            PEOPLE // LEADERSHIP
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-mono font-bold text-brand-primary mb-6"
          >
            BOARD OF DIRECTORS
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted text-lg font-sans max-w-3xl mx-auto"
          >
            Our directors are accomplished leaders from public administration, banking, healthcare, engineering, and social development — guiding NBRF&apos;s mission with decades of distinguished service.
          </motion.p>
        </div>

        {/* Directors Grid - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayExperts.length === 0 ? (
            <div className="col-span-3 flex flex-col items-center justify-center gap-4 py-20 text-center border border-dashed border-border rounded-2xl">
              <div className="w-16 h-16 rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center">
                <ChevronDown className="w-8 h-8 text-muted/40" />
              </div>
              <div>
                <p className="font-mono font-bold text-muted">No Director profiles yet</p>
                <p className="text-xs text-muted mt-1">Our Board of Directors profiles will be updated shortly.</p>
              </div>
            </div>
          ) : displayExperts.map((expert, i) => {
            const isExpanded = expandedBio === expert.hash;
            // Use local string path directly; only resolve Sanity refs through urlForImage
            const imgUrl = typeof expert.image === 'string'
              ? expert.image
              : (expert.image && expert.image.asset ? urlForImage(expert.image) : null);

            return (
              <motion.div
                key={expert.hash || i}
                id={expert.hash}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="tech-card flex flex-col group overflow-hidden border border-border hover:border-brand-primary/50 transition-all duration-500 hover:-translate-y-1 w-full max-w-xs mx-auto"
              >
                {/* Director Photo Container */}
                <div className="relative w-full h-64 shrink-0 bg-surface-alt/50 overflow-hidden border-b border-border/50">
                  {imgUrl ? (
                    <Image
                      key={imgUrl}
                      src={imgUrl}
                      alt={`Photo of ${expert.name}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={i < 3}
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
                <div className="p-5 flex flex-col flex-1">
                  <p className={`text-sm text-muted font-sans leading-relaxed whitespace-pre-line ${isExpanded ? '' : 'line-clamp-4'}`}>
                    {expert.bio}
                  </p>
                  <button 
                    onClick={() => toggleBio(expert.hash)}
                    className="text-brand-primary text-xs font-mono mt-3 self-start hover:underline"
                  >
                    {isExpanded ? 'Show Less' : 'Read More'}
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
              <div className="relative h-64 overflow-hidden shrink-0 bg-surface-alt/50">
                <Image
                  key="/directors/shashank-shrivastava.jpg"
                  src="/directors/shashank-shrivastava.jpg"
                  alt="Photo of Shashank Shrivastava"
                  fill
                  sizes="320px"
                  priority
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
