"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  User, MapPin, Briefcase, GraduationCap,
  FileText, CheckCircle, Upload, ChevronRight, Award, Target
} from "lucide-react";

type Category = "executive" | "corporate" | "honorary" | "";

const fees: Record<string, string> = {
  executive: "₹2,000",
  corporate: "₹5,000",
  honorary: "Nil",
};

export default function MembershipForm() {
  const [category, setCategory] = useState<Category>("");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPhoto(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) return alert("Please select a membership category.");
    if (!agreed) return alert("Please accept the terms and conditions.");
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="tech-card p-12 max-w-lg w-full text-center"
        >
          <div className="w-20 h-20 rounded-full bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-brand-primary" />
          </div>
          <h1 className="text-2xl font-mono font-bold text-white mb-3">Application Submitted</h1>
          <p className="text-muted font-sans text-sm mb-8 leading-relaxed">
            Thank you for applying to NBRF. Your membership application has been received and will be reviewed by our Governing Board. You will be contacted shortly.
          </p>
          <Link href="/" className="tech-button-primary inline-flex items-center gap-2">
            Return to Home <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">

      {/* Header Banner */}
      <div className="bg-surface border-b border-border py-10 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-brand-primary/30 group-hover:border-brand-primary group-hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all overflow-hidden p-1 shrink-0">
              <Image src="/logo.png" alt="NBRF Logo" width={40} height={40} className="w-full h-full object-contain" />
            </div>
            <div className="text-left">
              <div className="font-mono font-bold text-white text-lg glow-text group-hover:text-brand-primary transition-colors">NBRF</div>
              <div className="text-[10px] font-mono text-muted uppercase tracking-widest mt-0.5">Think Tank</div>
            </div>
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-brand-primary/30 bg-brand-primary/10 text-brand-primary font-mono text-[10px] uppercase tracking-widest mb-4">
            MEMBERSHIP // APPLICATION
          </div>
          <h1 className="text-3xl md:text-4xl font-mono font-bold text-white mb-3">
            Membership Application Form
          </h1>
          <p className="text-muted font-sans text-sm italic max-w-2xl mx-auto leading-relaxed">
            &quot;An opportunity to serve society, awaken your soul, and experience the joy of bringing smiles to others through meaningful social contribution.&quot;
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">

        {/* Office Use + Category + Photo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Serial No - Office Use */}
          <div className="tech-card p-6 border-dashed border-border/60">
            <p className="text-[10px] font-mono text-muted uppercase tracking-widest mb-3">For Office Use Only</p>
            <label className="block text-xs font-mono text-muted mb-2">Serial No.</label>
            <input disabled placeholder="Assigned by office" className="w-full bg-background/50 border border-border rounded px-4 py-2.5 text-muted text-sm font-mono outline-none cursor-not-allowed" />
          </div>

          {/* Passport Photo */}
          <div className="tech-card p-6 flex flex-col items-center justify-center gap-3 text-center">
            <p className="text-[10px] font-mono text-muted uppercase tracking-widest">Passport Size Photograph</p>
            <label htmlFor="photo-upload" className="cursor-pointer">
              {photo ? (
                <div className="w-28 h-36 rounded border-2 border-brand-primary overflow-hidden">
                  <img src={photo} alt="Passport photo" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-28 h-36 rounded border-2 border-dashed border-border hover:border-brand-primary transition-colors flex flex-col items-center justify-center gap-2 bg-background">
                  <Upload className="w-6 h-6 text-muted" />
                  <span className="text-[10px] font-mono text-muted text-center">Click to upload<br />3.5 × 4.5 cm</span>
                </div>
              )}
              <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
            </label>
            {photo && (
              <button type="button" onClick={() => setPhoto(null)} className="text-[10px] font-mono text-muted hover:text-brand-primary transition-colors">Remove</button>
            )}
          </div>
        </div>

        {/* Membership Category */}
        <Section icon={Award} title="Membership Category" color="brand-primary">
          <p className="text-xs text-muted font-sans mb-5">Please select your membership category. Admission fees vary by category.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {([
              { key: "executive", label: "Executive Member", fee: "₹2,000", desc: "For individuals committed to active participation" },
              { key: "corporate", label: "Corporate Member", fee: "₹5,000", desc: "For organisations and corporate entities" },
              { key: "honorary", label: "Honorary Member", fee: "Nil", desc: "By invitation — distinguished contributors" },
            ] as const).map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => setCategory(opt.key)}
                className={`p-5 rounded border text-left transition-all duration-200 ${
                  category === opt.key
                    ? "border-brand-primary bg-brand-primary/10 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                    : "border-border bg-surface hover:border-brand-primary/50"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${category === opt.key ? "border-brand-primary" : "border-muted"}`}>
                    {category === opt.key && <div className="w-2 h-2 rounded-full bg-brand-primary" />}
                  </div>
                  <span className="font-mono text-sm font-bold text-white">{opt.label}</span>
                </div>
                <p className="text-xs text-muted font-sans mb-2">{opt.desc}</p>
                <span className="text-brand-primary font-mono text-xs font-bold">Admission: {opt.fee}</span>
              </button>
            ))}
          </div>
        </Section>

        {/* Personal Information */}
        <Section icon={User} title="Personal Information" color="brand-secondary">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Full Name *" id="full-name" placeholder="As per official ID" required />
            <Field label="Date of Birth *" id="dob" type="date" required />
            <div>
              <label className="block text-xs font-mono text-muted uppercase tracking-widest mb-2">Gender *</label>
              <select id="gender" required defaultValue="" className="w-full bg-background border border-border rounded px-4 py-3 text-white text-sm font-sans outline-none focus:border-brand-secondary transition-colors">
                <option value="" disabled>Select gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
                <option>Prefer not to say</option>
              </select>
            </div>
            <Field label="Father's / Mother's Name *" id="parent-name" placeholder="Full name" required />
            <Field label="PAN / Voter ID / Aadhaar / Passport No. *" id="id-number" placeholder="Any government ID number" required />
            <Field label="Occupation *" id="occupation" placeholder="Your current occupation" required />
            <Field label="Mobile Number *" id="mobile" type="tel" placeholder="+91 XXXXX XXXXX" required />
            <Field label="Email Address *" id="email" type="email" placeholder="your@email.com" required />
          </div>
        </Section>

        {/* Residential Address */}
        <Section icon={MapPin} title="Residential Address" color="brand-accent">
          <div className="space-y-4">
            <Field label="Address Line 1 *" id="addr1" placeholder="House / Flat No., Building Name" required />
            <Field label="Address Line 2" id="addr2" placeholder="Street, Locality, Area" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field label="City *" id="city" placeholder="City" required />
              <Field label="State *" id="state" placeholder="State" required />
              <Field label="PIN Code *" id="pin" placeholder="000000" required />
            </div>
          </div>
        </Section>

        {/* Professional Information */}
        <Section icon={Briefcase} title="Professional Information" color="brand-primary">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Profession / Occupation *" id="profession" placeholder="e.g. Researcher, Lawyer, Professor" required />
            <Field label="Organization / Institution" id="organization" placeholder="Name of employer or institution" />
            <div className="sm:col-span-2">
              <Field label="Educational Qualification *" id="education" placeholder="e.g. MBA, Ph.D, B.Tech" required />
            </div>
          </div>
        </Section>

        {/* Profile & Achievements */}
        <Section icon={GraduationCap} title="Profile & Achievements" color="brand-secondary">
          <p className="text-xs text-muted font-sans mb-5">Please briefly describe your background, experience, and what you bring to NBRF.</p>
          <div className="space-y-5">
            <TextArea label="Areas of Interest" id="interests" placeholder="e.g. Governance, Agriculture, Education, Public Health..." />
            <TextArea label="Social Work Experience" id="social-work" placeholder="Describe any previous volunteer work, NGO involvement, community service..." />
            <TextArea label="Awards & Recognitions" id="awards" placeholder="List any notable awards, certifications, or recognitions..." />
            <TextArea label="Skills and Expertise" id="skills" placeholder="e.g. Research, Policy Writing, Data Analysis, Communication, Legal, Finance..." />
            <TextArea label="Achievements" id="achievements" placeholder="Academic, professional, or social achievements..." />
          </div>
        </Section>

        {/* Contribution to NBRF */}
        <Section icon={Target} title="Contribution to NBRF" color="brand-accent">
          <TextArea
            label="How would you like to contribute to NBRF&apos;s objectives and activities? *"
            id="contribution"
            placeholder="Describe how you plan to actively contribute to NBRF&apos;s research, policy, events, outreach, or other activities..."
            rows={6}
            required
          />
        </Section>

        {/* Fee Table */}
        <div className="tech-card p-6 border-brand-primary/20">
          <div className="flex items-center gap-2 mb-5">
            <FileText className="w-4 h-4 text-brand-primary" />
            <h3 className="font-mono font-bold text-white text-sm uppercase tracking-widest">Admission Fee Schedule</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-sans">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-xs font-mono text-muted uppercase tracking-widest">Membership Category</th>
                  <th className="text-right py-3 px-4 text-xs font-mono text-muted uppercase tracking-widest">Admission Fee</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { cat: "Executive Member", fee: "₹2,000" },
                  { cat: "Corporate Member", fee: "₹5,000" },
                  { cat: "Honorary Member", fee: "Nil" },
                ].map((row) => (
                  <tr key={row.cat} className={`border-b border-border/50 ${category && fees[category] === row.fee ? "bg-brand-primary/5" : ""}`}>
                    <td className="py-3 px-4 text-white">{row.cat}</td>
                    <td className="py-3 px-4 text-brand-primary font-mono font-bold text-right">{row.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-muted font-sans mt-3 italic">* Fees may be revised from time to time by the Governing Body.</p>
        </div>

        {/* Terms & Conditions */}
        <div className="tech-card p-6 border-border">
          <h3 className="font-mono font-bold text-white text-sm uppercase tracking-widest mb-5">Terms, Conditions & Membership Rules</h3>
          <ol className="space-y-3">
            {[
              "The applicant must be at least 18 years of age.",
              "The applicant should have no criminal background.",
              "Members should be physically and mentally fit to participate in organizational activities.",
              "Members may be required to travel at their own expense for organizational work.",
              "Membership may be suspended or terminated by the Chairman or Governing Board in cases of misconduct, indiscipline, or actions contrary to the objectives of NBRF.",
              "Members shall abide by the decisions, policies, and directives of the Chairman and Governing Board.",
              "Members shall actively contribute towards achieving the objectives of the Foundation.",
              "Members are expected to attend General Body Meetings and other official meetings whenever required.",
              "Meetings shall be conducted under the supervision of the Chairman, Governing Board, or designated Committee Heads.",
              "Membership fees must be submitted along with the application form.",
              "In case of rejection of membership, the admission fee shall be refunded within seven working days.",
            ].map((rule, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-muted font-sans">
                <span className="shrink-0 w-5 h-5 rounded-full bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center text-[10px] font-mono text-brand-primary mt-0.5">{i + 1}</span>
                {rule}
              </li>
            ))}
          </ol>
        </div>

        {/* Declaration */}
        <div className="tech-card p-6 border-brand-primary/20">
          <h3 className="font-mono font-bold text-white text-sm uppercase tracking-widest mb-4">Declaration</h3>
          <p className="text-sm text-muted font-sans leading-relaxed mb-6">
            I hereby declare that the information provided in this application form is true and correct to the best of my knowledge and belief. I have carefully read and understood the Terms, Conditions, and Membership Rules of Nav Bihar Renaissance Foundation (NBRF). I agree to abide by them and actively work towards the objectives and interests of the Foundation. I understand that my membership may be suspended or terminated if my conduct, activities, or actions are found detrimental to the interests, reputation, or objectives of the organization.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            <Field label="Date *" id="decl-date" type="date" required />
            <Field label="Place *" id="decl-place" placeholder="City where signing" required />
          </div>

          <label className="flex items-start gap-3 cursor-pointer group">
            <div
              onClick={() => setAgreed(!agreed)}
              className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${agreed ? "bg-brand-primary border-brand-primary" : "border-border group-hover:border-brand-primary"}`}
            >
              {agreed && <CheckCircle className="w-3.5 h-3.5 text-background" />}
            </div>
            <span className="text-sm text-muted font-sans leading-relaxed group-hover:text-white transition-colors">
              By submitting this application, I voluntarily seek membership in NBRF and undertake to cooperate with the Governing Board, committees, and office bearers in carrying out the activities and mission of the Foundation. *
            </span>
          </label>
        </div>

        {/* Submit */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-4">
          <p className="text-xs text-muted font-sans">Fields marked with * are mandatory</p>
          <button
            type="submit"
            disabled={!agreed || !category}
            className="tech-button-primary flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed px-10"
          >
            Submit Application <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </form>

      {/* Footer note */}
      <div className="border-t border-border py-6 text-center">
        <p className="text-xs text-muted font-mono">© {new Date().getFullYear()} Nav Bihar Renaissance Foundation · All Rights Reserved</p>
      </div>

    </main>
  );
}

// --- Helpers ---

function Section({ icon: Icon, title, color, children }: {
  icon: React.ElementType; title: string; color: string; children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="tech-card p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
        <div className={`w-9 h-9 rounded bg-${color}/10 border border-${color}/30 flex items-center justify-center`}>
          <Icon className={`w-4 h-4 text-${color}`} />
        </div>
        <h2 className={`font-mono font-bold text-white text-base uppercase tracking-widest`}>{title}</h2>
      </div>
      {children}
    </motion.div>
  );
}

function Field({ label, id, type = "text", placeholder, required }: {
  label: string; id: string; type?: string; placeholder?: string; required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-mono text-muted uppercase tracking-widest mb-2">{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full bg-background border border-border rounded px-4 py-3 text-white text-sm font-sans outline-none focus:border-brand-primary transition-colors placeholder:text-muted/50"
      />
    </div>
  );
}

function TextArea({ label, id, placeholder, rows = 4, required }: {
  label: string; id: string; placeholder?: string; rows?: number; required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-mono text-muted uppercase tracking-widest mb-2">{label}</label>
      <textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        required={required}
        className="w-full bg-background border border-border rounded px-4 py-3 text-white text-sm font-sans outline-none focus:border-brand-primary transition-colors resize-none placeholder:text-muted/50"
      />
    </div>
  );
}
