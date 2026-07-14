"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Mail, Clock, ChevronRight, ImageIcon } from "lucide-react";
import Link from "next/link";

export default function Events({ events: eventsProp }: { events?: any[] } = {}) {
  const defaultEvents = [
    {
      title: "NBRF Inaugural Conference",
      description: "A founding convening bringing together researchers, administrators, and civil society to launch NBRF's research agenda for Bihar.",
      eventType: "CONFERENCE",
      location: "Patna, Bihar",
      eventDate: "TBD",
      icon: Calendar,
      color: "text-brand-primary",
      border: "group-hover:border-brand-primary",
    },
    {
      title: "Bihar Development Policy Dialogue",
      description: "An open roundtable for policymakers, academics, and development professionals to discuss Bihar's most pressing challenges.",
      eventType: "ROUNDTABLE",
      location: "Patna / Virtual",
      eventDate: "TBD",
      icon: MapPin,
      color: "text-brand-accent",
      border: "group-hover:border-brand-accent",
    },
    {
      title: "District-Level Field Research Drive",
      description: "NBRF's first field data collection initiative across all 38 districts — gathering ground-level evidence for our research verticals.",
      eventType: "FIELD PROGRAM",
      location: "All 38 Districts",
      eventDate: "TBD",
      icon: Clock,
      color: "text-brand-primary",
      border: "group-hover:border-brand-primary",
    },
  ];

  const iconsList = [Calendar, MapPin, Clock];
  const displayEvents = (eventsProp && eventsProp.length > 0)
    ? eventsProp.map((e, idx) => ({
        title: e.title || "NBRF Research Symposium",
        description: e.description || e.desc || "",
        eventType: e.eventType || e.type || "CONFERENCE",
        location: e.location || "Patna, Bihar",
        eventDate: e.eventDate || e.date || "Upcoming",
        icon: iconsList[idx % iconsList.length],
        color: idx % 2 === 0 ? "text-brand-primary" : "text-brand-accent",
        border: idx % 2 === 0 ? "group-hover:border-brand-primary" : "group-hover:border-brand-accent",
      }))
    : defaultEvents;

  return (
    <section id="events" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative grid */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded border border-brand-primary/30 bg-brand-primary/10 text-brand-primary font-mono text-[10px] uppercase tracking-widest mb-4"
          >
            CONNECT // CONVENINGS
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-mono font-bold text-brand-primary mb-6"
          >
            UPCOMING SUMMITS & EVENTS
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted text-lg font-sans max-w-2xl mx-auto"
          >
            Policy dialogues, district-level roundtable convenings, and academic conferences bridging research with governance.
          </motion.p>
        </div>

        {/* Planned Events */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {displayEvents.map((event, i) => {
            const IconComp = event.icon || Calendar;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`tech-card p-7 flex flex-col gap-5 group border border-border transition-all duration-300 ${event.border} hover:-translate-y-1`}
              >
                <div className="flex items-start justify-between">
                  <div className="w-11 h-11 rounded bg-background border border-border flex items-center justify-center">
                    <IconComp className={`w-5 h-5 ${event.color}`} />
                  </div>
                  <span className={`text-[10px] font-mono ${event.color} bg-background px-2 py-1 rounded border border-border uppercase`}>
                    {event.eventType}
                  </span>
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-mono font-bold text-foreground mb-3 group-hover:text-brand-primary transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-muted text-sm font-sans leading-relaxed">{event.description}</p>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-4 mt-auto">
                  <div className="flex items-center gap-2 text-xs font-mono text-muted">
                    <MapPin className="w-3 h-3 text-brand-primary" /> {event.location}
                  </div>
                  <span className="text-[10px] font-mono text-brand-primary font-semibold border border-brand-primary/30 px-2 py-0.5 rounded bg-brand-primary/5">
                    {event.eventDate}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Register Interest CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="tech-card p-8 border-brand-primary/30 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="font-mono font-bold text-brand-primary text-lg mb-1">Get Notified When Events Are Announced</h3>
            <p className="text-muted text-sm font-sans">Register your interest and we&apos;ll reach out with event details, venue, and registration links.</p>
          </div>
          <Link href="#contact" className="tech-button-primary shrink-0 inline-flex items-center gap-2">
            <Mail className="w-4 h-4" /> Register Interest
          </Link>
        </motion.div>

        {/* Archived Events */}
        <div className="border-t border-border pt-16 mt-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-mono font-bold text-brand-primary flex items-center gap-3">
              <ImageIcon className="w-6 h-6 text-brand-secondary" />
              ARCHIVED EVENTS
            </h3>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="tech-card p-10 text-center border-brand-secondary/20"
          >
            <div className="w-14 h-14 rounded-full bg-brand-secondary/10 border border-brand-secondary/30 flex items-center justify-center mx-auto mb-5">
              <ImageIcon className="w-7 h-7 text-brand-secondary" />
            </div>
            <h4 className="font-mono font-bold text-brand-primary text-lg mb-3">No Archived Events Yet</h4>
            <p className="text-muted font-sans text-sm max-w-lg mx-auto mb-6 leading-relaxed">
              NBRF is at its founding stage. Our first events are being planned. Once held, photos, recordings, and summaries will be archived here for public access.
            </p>
            <Link href="#contact" className="tech-button inline-flex items-center gap-2 border-brand-secondary/30 text-brand-secondary hover:bg-brand-secondary/10 hover:border-brand-secondary">
              Propose an Event <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
