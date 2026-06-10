"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, CheckCircle } from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    
    try {
      // Note: Replace this with your actual Formspree endpoint or backend URL
      const endpoint = "https://formspree.io/f/YOUR_FORM_ID_HERE";
      
      // If endpoint is still placeholder, just simulate success for the demo
      if (endpoint.includes("YOUR_FORM_ID_HERE")) {
        setTimeout(() => setSubmitted(true), 800);
        return;
      }
      
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const contacts = [
    { icon: MapPin, label: "Location", value: "Patna, Bihar, India" },
    { icon: Mail, label: "Email", value: "contact@nbrf.org.in" },
  ];

  return (
    <section id="contact" className="py-24 bg-surface border-t border-border relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded border border-brand-primary/30 bg-brand-primary/10 text-brand-primary font-mono text-[10px] uppercase tracking-widest mb-4"
          >
            GET IN TOUCH
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-mono font-bold text-white mb-4 glow-text"
          >
            CONTACT US
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted text-lg font-sans max-w-2xl mx-auto"
          >
            Whether you want to collaborate, contribute research, partner with us, or simply learn more about NBRF — we&apos;d love to hear from you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            {contacts.map((item, i) => (
              <div key={i} className="tech-card p-6 flex items-start gap-4 group hover:border-brand-primary/50 transition-all hover:-translate-y-0.5">
                <div className="w-10 h-10 rounded bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-brand-primary" />
                </div>
                <div>
                  <p className="text-xs font-mono text-muted uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-white font-sans text-sm">{item.value}</p>
                </div>
              </div>
            ))}

            <div className="tech-card p-6 border-brand-primary/20">
              <h3 className="font-mono font-bold text-white text-sm mb-4">WAYS TO ENGAGE</h3>
              <ul className="space-y-3">
                {[
                  "Research collaboration",
                  "Policy contribution",
                  "Partnership enquiry",
                  "Media & press",
                  "Membership application",
                  "General enquiry",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-muted text-sm font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="tech-card p-5 sm:p-8 md:p-10 border-brand-primary/20">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center gap-6"
                >
                  <div className="w-16 h-16 rounded-full bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-mono font-bold text-white mb-2">Message Received</h3>
                    <p className="text-muted font-sans text-sm">Thank you for reaching out. Our team will get back to you soon.</p>
                  </div>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                    className="tech-button py-2 px-6 text-xs"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-mono text-muted uppercase tracking-widest mb-2">Full Name *</label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="Your name"
                        className="w-full bg-background border border-border rounded px-4 py-3 text-white text-sm font-sans outline-none focus:border-brand-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-mono text-muted uppercase tracking-widest mb-2">Email Address *</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full bg-background border border-border rounded px-4 py-3 text-white text-sm font-sans outline-none focus:border-brand-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-mono text-muted uppercase tracking-widest mb-2">Subject *</label>
                    <select
                      id="contact-subject"
                      name="subject"
                      required
                      value={form.subject}
                      onChange={e => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-background border border-border rounded px-4 py-3 text-white text-sm font-sans outline-none focus:border-brand-primary transition-colors"
                    >
                      <option value="" disabled>Select a subject...</option>
                      <option>Research Collaboration</option>
                      <option>Policy Contribution</option>
                      <option>Partnership Enquiry</option>
                      <option>Media & Press</option>
                      <option>Membership Application</option>
                      <option>General Enquiry</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-mono text-muted uppercase tracking-widest mb-2">Message *</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us how you'd like to engage with NBRF..."
                      className="w-full bg-background border border-border rounded px-4 py-3 text-white text-sm font-sans outline-none focus:border-brand-primary transition-colors resize-none"
                    />
                  </div>

                  <button type="submit" className="tech-button-primary w-full flex items-center justify-center gap-2 rounded">
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
