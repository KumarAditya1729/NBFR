"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, BookOpen } from "lucide-react";

type FormState = "idle" | "sending" | "success";

export default function AskThinkTank() {
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState({ name: "", affiliation: "", question: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    // Simulate submission — wire to formspree or API later
    await new Promise((r) => setTimeout(r, 1500));
    setState("success");
  };

  return (
    <section className="w-full">
      <div className="tech-card p-8 sm:p-10 relative overflow-hidden">
        {/* Decorative serif watermark */}
        <div className="absolute top-4 right-6 opacity-[0.04] pointer-events-none select-none">
          <span className="font-serif text-[120px] font-bold text-foreground leading-none">?</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left — Description */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-brand-primary" />
              </div>
              <div>
                <p className="text-[10px] font-mono text-muted uppercase tracking-[0.25em]">Open Inquiry</p>
                <h2 className="font-serif text-xl font-bold text-foreground">
                  Ask the <span className="text-brand-primary">Think Tank</span>
                </h2>
              </div>
            </div>

            <p className="text-sm text-muted leading-relaxed">
              Have a question about Bihar&apos;s development, governance, or social challenges? 
              We welcome intellectual inquiries from researchers, journalists, policymakers, and citizens.
            </p>

            <div className="flex flex-col gap-2">
              {[
                "Policy & Governance questions",
                "Economic development insights",
                "Social data interpretation",
                "Research collaboration proposals",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-xs text-muted">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-primary flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>

            <div className="text-[10px] font-mono text-muted border-t border-border pt-4 mt-2">
              Our team reviews all submissions and responds within 5–7 working days.
            </div>
          </div>

          {/* Right — Form */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {state === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center gap-4 py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-success/10 border border-success/30 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-success" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-foreground">Thank You for Your Inquiry</h3>
                  <p className="text-sm text-muted max-w-xs">
                    We&apos;ve received your question. Our research team will get back to you within 5–7 working days.
                  </p>
                  <button
                    onClick={() => { setState("idle"); setForm({ name: "", affiliation: "", question: "" }); }}
                    className="tech-button text-xs py-2 px-4 mt-2"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono text-muted uppercase tracking-wider">Your Name *</label>
                      <input
                        required
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Full Name"
                        className="bg-surface border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted/50 outline-none focus:border-brand-primary transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono text-muted uppercase tracking-wider">Affiliation</label>
                      <input
                        value={form.affiliation}
                        onChange={e => setForm(f => ({ ...f, affiliation: e.target.value }))}
                        placeholder="Organisation / University"
                        className="bg-surface border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted/50 outline-none focus:border-brand-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono text-muted uppercase tracking-wider">Your Inquiry *</label>
                    <textarea
                      required
                      rows={5}
                      value={form.question}
                      onChange={e => setForm(f => ({ ...f, question: e.target.value }))}
                      placeholder="Share your research question, policy concern, or inquiry about Bihar's development..."
                      className="bg-surface border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted/50 outline-none focus:border-brand-primary transition-colors resize-none"
                    />
                    <div className="text-right text-[10px] font-mono text-muted">
                      {form.question.length} characters
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={state === "sending"}
                    className="tech-button-primary flex items-center justify-center gap-2 py-3 w-full sm:w-auto sm:self-end sm:px-8 disabled:opacity-60"
                  >
                    {state === "sending" ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Inquiry
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
