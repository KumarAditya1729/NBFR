"use client";

import { motion } from "framer-motion";
import { 
  MapPin, TreeDeciduous, Wheat, BookOpen, Clock, 
  Users, Target, Leaf, Fish, Bird, Building2
} from "lucide-react";
import Image from "next/image";

export default function DiscoverBihar() {
  return (
    <main className="min-h-screen bg-background">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-brand-primary/30 bg-brand-primary/10 text-brand-primary font-mono text-[10px] uppercase tracking-widest mb-6">
              <MapPin className="w-3 h-3" /> State Profile
            </div>
            <h1 className="text-4xl md:text-5xl font-mono font-bold text-white mb-6 tracking-tight">
              Discover <span className="text-brand-primary glow-text">Bihar</span>
            </h1>
            <p className="text-muted text-lg font-sans leading-relaxed">
              A comprehensive multi-dimensional analysis of Bihar&apos;s rich history, profound biodiversity, agricultural supremacy, and emerging socio-economic landscape.
            </p>
          </motion.div>

          {/* Quick Facts Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {[
              { label: "Established", value: "22 March 1912", icon: Clock },
              { label: "Capital", value: "Patna", icon: Building2 },
              { label: "Area", value: "94,163 sq km", icon: MapPin },
              { label: "Population <25", value: "58%", icon: Users },
            ].map((fact, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-surface/50 backdrop-blur-sm border border-border rounded-xl p-6 text-center hover:border-brand-primary/50 transition-colors"
              >
                <fact.icon className="w-6 h-6 text-brand-primary mx-auto mb-3" />
                <div className="text-2xl font-mono font-bold text-white mb-1">{fact.value}</div>
                <div className="text-xs text-muted font-sans uppercase tracking-widest">{fact.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AGRICULTURE SECTION */}
      <section className="py-24 bg-surface border-y border-border relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl font-mono font-bold text-white mb-4 flex items-center gap-3">
              <Wheat className="w-8 h-8 text-brand-primary" /> Agricultural Powerhouse
            </h2>
            <p className="text-muted max-w-2xl">
              Bihar is an agrarian state where 80% of the population depends on agriculture. It leads the nation in several key crops.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Top Achievements */}
            <div className="md:col-span-1 space-y-4">
              <div className="bg-background border border-border p-6 rounded-xl border-l-4 border-l-brand-primary">
                <h3 className="text-xl font-mono font-bold text-white mb-2">🥇 Litchi</h3>
                <p className="text-muted text-sm">Produces 71% of India&apos;s total Litchi output.</p>
              </div>
              <div className="bg-background border border-border p-6 rounded-xl border-l-4 border-l-brand-primary">
                <h3 className="text-xl font-mono font-bold text-white mb-2">🥇 Makhana (Fox Nut)</h3>
                <p className="text-muted text-sm">Produces 85% of India&apos;s and 90% of the World&apos;s Makhana.</p>
              </div>
              <div className="bg-background border border-border p-6 rounded-xl border-l-4 border-l-brand-accent">
                <h3 className="text-xl font-mono font-bold text-white mb-2">🥉 Tobacco & Maize</h3>
                <p className="text-muted text-sm">3rd largest tobacco producer and 10% of national maize output.</p>
              </div>
            </div>

            {/* Green Revolution & Organic Farming */}
            <div className="md:col-span-2 bg-gradient-to-br from-background to-surface border border-brand-primary/20 rounded-xl p-8">
              <h3 className="text-2xl font-mono font-bold text-white mb-6 flex items-center gap-2">
                <Leaf className="w-6 h-6 text-brand-primary" /> The Green Revolution & Organic Future
              </h3>
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-white mb-3 border-b border-border pb-2">Organic Corridor (2026)</h4>
                  <ul className="space-y-3 text-sm text-muted">
                    <li className="flex items-start gap-2"><Target className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" /> 13 districts implementing dedicated organic farming.</li>
                    <li className="flex items-start gap-2"><Target className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" /> Goal of 5,700 hectares under natural farming.</li>
                    <li className="flex items-start gap-2"><Target className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" /> 50% subsidy on biogas plants and vermicompost units.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-3 border-b border-border pb-2">Crop Diversity</h4>
                  <ul className="space-y-3 text-sm text-muted">
                    <li><strong className="text-white">Kharif:</strong> Rice, Maize, Pigeon Pea, Jute</li>
                    <li><strong className="text-white">Rabi:</strong> Wheat, Gram, Lentils, Mustard</li>
                    <li><strong className="text-white">Horticulture:</strong> Mango (13% national), Guava, Banana</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BIODIVERSITY SECTION */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Subtle Bodhi tree watermark */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
          <Image src="/bodhi-tree.svg" alt="" width={600} height={600} className="filter drop-shadow-[0_0_50px_#10b981]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-16">
            <h2 className="text-3xl font-mono font-bold text-white mb-4 flex items-center gap-3">
              <TreeDeciduous className="w-8 h-8 text-brand-primary" /> Flora & Fauna
            </h2>
            <p className="text-muted max-w-2xl">
              From the Himalayan foothills of Valmiki Tiger Reserve to the Gangetic plains, Bihar hosts a rich and vital ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { title: "State Animal", name: "Gaur (Indian Bison)", desc: "Bos gaurus", icon: Target },
              { title: "State Bird", name: "House Sparrow", desc: "Passer domesticus", icon: Bird },
              { title: "State Aquatic", name: "Gangetic Dolphin", desc: "Platanista gangetica", icon: Fish },
              { title: "State Tree", name: "Peepal", desc: "Ficus religiosa", icon: Leaf },
            ].map((symbol, idx) => (
              <div key={idx} className="bg-surface border border-border rounded-xl p-6 text-center hover:-translate-y-1 transition-transform">
                <symbol.icon className="w-8 h-8 text-brand-accent mx-auto mb-4" />
                <div className="text-xs text-brand-primary font-mono uppercase tracking-widest mb-2">{symbol.title}</div>
                <div className="font-bold text-white mb-1">{symbol.name}</div>
                <div className="text-xs text-muted italic">{symbol.desc}</div>
              </div>
            ))}
          </div>

          <div className="bg-surface/50 border border-border rounded-xl p-8">
            <h3 className="text-xl font-mono font-bold text-white mb-6">Protected Areas & Reserves</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-primary"></div>
                  <strong className="text-white">Valmiki Tiger Reserve (West Champaran)</strong>
                </div>
                <p className="text-sm text-muted pl-5">Shelters Bengal Tigers, Indian Leopards, Sloth Bears, and over 250 bird species.</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-accent"></div>
                  <strong className="text-white">Vikramshila Gangetic Dolphin Sanctuary</strong>
                </div>
                <p className="text-sm text-muted pl-5">A 60km stretch of the Ganges protecting the endangered Gangetic Dolphin (50% of India&apos;s population).</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                  <strong className="text-white">Kaimur Wildlife Sanctuary</strong>
                </div>
                <p className="text-sm text-muted pl-5">The largest sanctuary in Bihar (1,342 sq km), home to diverse flora including Sal and Mahua forests.</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                  <strong className="text-white">Kanwar Lake Bird Sanctuary</strong>
                </div>
                <p className="text-sm text-muted pl-5">Asia's largest freshwater oxbow lake, hosting migratory birds and rich wetland biodiversity.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MULTI-DIMENSIONAL ANALYSIS */}
      <section className="py-24 bg-surface border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-mono font-bold text-white mb-4">
              Multi-Dimensional Analysis
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              A holistic look at Bihar&apos;s historical legacy, cultural ecosystem, and future trajectory.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background border border-border rounded-xl p-8">
              <h3 className="text-xl font-mono font-bold text-white mb-4 border-b border-border pb-4">Historical Legacy</h3>
              <ul className="space-y-4 text-sm text-muted">
                <li><strong className="text-brand-primary">Ancient Era:</strong> Magadha kingdom, Maurya & Gupta Empires (Golden Age). First residential universities at Nalanda & Vikramshila.</li>
                <li><strong className="text-brand-primary">Medieval Era:</strong> Sher Shah Suri&apos;s administrative reforms, Grand Trunk Road.</li>
                <li><strong className="text-brand-primary">Colonial & Modern:</strong> Champaran Satyagraha (1917), JP Movement (1974).</li>
              </ul>
            </div>

            <div className="bg-background border border-border rounded-xl p-8">
              <h3 className="text-xl font-mono font-bold text-white mb-4 border-b border-border pb-4">Cultural Ecosystem</h3>
              <ul className="space-y-4 text-sm text-muted">
                <li><strong className="text-white">Languages:</strong> Hindi, Urdu, Maithili, Bhojpuri, Magahi, Angika.</li>
                <li><strong className="text-white">Visual Arts:</strong> Madhubani/Mithila Painting (GI Tagged), Patna Qalam.</li>
                <li><strong className="text-white">Cuisine:</strong> Litti Chokha, Sattu, Khaja (Silao), Thekua, Makhana.</li>
              </ul>
            </div>

            <div className="bg-background border border-border rounded-xl p-8">
              <h3 className="text-xl font-mono font-bold text-white mb-4 border-b border-border pb-4">Future Trajectory (2030)</h3>
              <ul className="space-y-4 text-sm text-muted">
                <li><strong className="text-brand-accent">Infrastructure:</strong> Bihta IT City, Ganga Expressway, NW-1 Inland Waterways.</li>
                <li><strong className="text-brand-accent">Demographics:</strong> 10 million youth to be skilled by 2025. Highest demographic dividend in India.</li>
                <li><strong className="text-brand-accent">Vision:</strong> Double GSDP to $100 billion, driven by IT, food processing, and eco-tourism.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* GLOBAL RESEARCH */}
      <section className="py-24 bg-background border-t border-border text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <BookOpen className="w-12 h-12 text-brand-primary mx-auto mb-6" />
          <h2 className="text-3xl font-mono font-bold text-white mb-6">Global Research & Publications</h2>
          <p className="text-muted text-lg leading-relaxed mb-8">
            Bihar serves as a critical focal point for global academic research. Key areas of study include 
            <strong> Epidemiology & Public Health</strong> (Kala-azar elimination strategies published in The Lancet), 
            <strong> Archaeology</strong> (Excavations at Nalanda & Rajgir by the Royal Asiatic Society), and 
            <strong> Economics</strong> (World Bank policy research on agricultural growth and poverty dynamics).
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 rounded-full bg-surface border border-border text-xs font-mono text-white">World Bank</span>
            <span className="px-4 py-2 rounded-full bg-surface border border-border text-xs font-mono text-white">The Lancet</span>
            <span className="px-4 py-2 rounded-full bg-surface border border-border text-xs font-mono text-white">WHO / TDR</span>
            <span className="px-4 py-2 rounded-full bg-surface border border-border text-xs font-mono text-white">ICMR</span>
            <span className="px-4 py-2 rounded-full bg-surface border border-border text-xs font-mono text-white">Oxford University Press</span>
          </div>
        </div>
      </section>
    </main>
  );
}
