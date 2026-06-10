import Link from "next/link";
import { MapPin, Mail, Video } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-muted pt-20 pb-10 border-t-2 border-brand-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 focus:outline-none group">
              <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center border border-border group-hover:border-brand-primary transition-colors overflow-hidden p-1">
                <Image src="/logo.png" alt="NBRF Logo" width={40} height={40} className="object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono font-bold text-xl leading-none tracking-tight text-white glow-text group-hover:text-brand-primary transition-colors">
                  NBRF
                </span>
                <span className="text-xs uppercase tracking-widest font-mono text-muted">
                  THINK TANK
                </span>
              </div>
            </Link>
            <p className="text-sm font-sans mb-6 max-w-sm">
              Nav Bihar Renaissance Foundation (NBRF) is Bihar&apos;s pioneering think tank, dedicated to addressing the state&apos;s developmental challenges through data-driven research and policy recommendations.
            </p>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/company/nbrfofficial/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded bg-surface border border-border flex items-center justify-center text-muted hover:text-[#0A66C2] hover:border-[#0A66C2] transition-colors">
                <span className="font-bold text-lg">in</span>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61590632909150" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded bg-surface border border-border flex items-center justify-center text-muted hover:text-[#1877F2] hover:border-[#1877F2] transition-colors">
                <span className="font-bold text-lg">f</span>
              </a>
              <a href="#" aria-label="X (Twitter)" className="w-10 h-10 rounded bg-surface border border-border flex items-center justify-center text-muted hover:text-white hover:border-white transition-colors">
                <span className="font-bold text-lg">𝕏</span>
              </a>
              <a href="#" aria-label="YouTube" className="w-10 h-10 rounded bg-surface border border-border flex items-center justify-center text-muted hover:text-[#FF0000] hover:border-[#FF0000] transition-colors">
                <Video className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-mono font-bold text-sm mb-6 uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-4 text-sm font-sans">
              <li><Link href="#about" className="hover:text-brand-primary transition-colors">About</Link></li>
              <li><Link href="#research" className="hover:text-brand-primary transition-colors">Research</Link></li>
              <li><Link href="#publications" className="hover:text-brand-primary transition-colors">Publications</Link></li>
              <li><Link href="#events" className="hover:text-brand-primary transition-colors">Events</Link></li>
              <li><Link href="#memberships" className="hover:text-brand-primary transition-colors">Membership</Link></li>
              <li><Link href="#memberships" className="hover:text-brand-primary transition-colors">Careers</Link></li>
              <li><Link href="#contact" className="hover:text-brand-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-mono font-bold text-sm mb-6 uppercase tracking-widest">Resources</h4>
            <ul className="space-y-4 text-sm font-sans">
              <li><Link href="#initiatives" className="hover:text-brand-primary transition-colors">Centers & Initiatives</Link></li>
              <li><Link href="#insights" className="hover:text-brand-primary transition-colors">Insights & Articles</Link></li>
              <li><Link href="#publications" className="hover:text-brand-primary transition-colors">Policy Briefs</Link></li>
              <li><Link href="#media" className="hover:text-brand-primary transition-colors">Media & Press</Link></li>
              <li><Link href="#partners" className="hover:text-brand-primary transition-colors">Partner Ecosystem</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-mono font-bold text-sm mb-6 uppercase tracking-widest">Contact</h4>
            <ul className="space-y-4 text-sm font-sans">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" aria-hidden="true" />
                <span>Patna, Bihar</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-primary shrink-0" aria-hidden="true" />
                <span>contact@nbrf.org.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-muted font-mono">
          <p>© {new Date().getFullYear()} Nav Bihar Renaissance Foundation. All Rights Reserved.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="#" className="hover:text-brand-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-brand-primary transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
