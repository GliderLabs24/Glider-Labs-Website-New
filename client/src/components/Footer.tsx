import { FormEvent, useState } from 'react';
import { SiGithub, SiLinkedin, SiTelegram, SiX } from 'react-icons/si';
import { Link } from 'wouter';
import { useContactDialog } from '@/components/ContactDialog';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const quickLinks = [
  { label: 'Services', href: '/#services' as const },
  { label: 'About', href: '/#why-glider' as const },
  { label: 'Blog', href: '/#insights' as const },
  { label: 'Docs', href: '/docs/overview' as const },
  { label: 'Careers', href: '/careers' as const },
  { label: 'Contact' as const, contact: true },
] as const;

export function Footer() {
  const { openContact } = useContactDialog();
  const { toast } = useToast();
  const [email, setEmail] = useState('');

  const onNewsletter = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({ title: 'Invalid email', description: 'Enter a valid address to subscribe.', variant: 'destructive' });
      return;
    }
    toast({ title: 'Subscribed', description: 'Thanks — we will send security briefings to your inbox.' });
    setEmail('');
  };

  return (
    <footer className="relative bg-page pt-6 sm:pt-8 pb-12" data-testid="footer-main">
      {/* Curved separator: dips downward in the center (arc from left & right) */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 h-[clamp(2.5rem,8vw,4.5rem)] -translate-y-full overflow-visible"
        aria-hidden
      >
        <svg
          className="h-full w-full block"
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="footer-curve-glow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(108,99,255,0)" />
              <stop offset="50%" stopColor="rgba(108,99,255,0.35)" />
              <stop offset="100%" stopColor="rgba(108,99,255,0)" />
            </linearGradient>
          </defs>
          <path
            d="M0 12 Q600 72 1200 12"
            fill="none"
            stroke="url(#footer-curve-glow)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M0 12 Q600 72 1200 12"
            fill="none"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="container relative mx-auto px-6 sm:px-8 pt-14 sm:pt-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10 mb-14">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://green-rainy-clam-911.mypinata.cloud/ipfs/bafkreif4rnp5754if77z747skgfhwgjj4vh5jb56d5dgrbjudsxl2nppsi"
                alt="Glider"
                className="h-10 w-auto"
              />
              <span className="font-display text-xl font-bold text-gradient-brand">Glider</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Securing the decentralized future. Web3 infrastructure, hardware security, DeFi, and AI-native tooling -
              engineered in India for global operators.
            </p>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-semibold text-foreground mb-4 tracking-wide text-white/95">
              Quick links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((l) => {
                if (l.label === 'Careers' && 'href' in l) {
                  return (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="inline-flex items-start gap-1.5 text-sm text-muted-foreground hover:text-[#00F5A0] transition-colors"
                      >
                        <span>{l.label}</span>
                        <span className="shrink-0 translate-y-px rounded border border-[#00F5A0] px-[3px] py-px text-[7px] font-mono font-semibold uppercase leading-none tracking-wide text-[#00F5A0]">
                          New
                        </span>
                      </Link>
                    </li>
                  );
                }

                return (
                  <li key={l.label}>
                    {'contact' in l && l.contact ? (
                      <button
                        type="button"
                        onClick={openContact}
                        className="text-sm text-muted-foreground hover:text-[#00F5A0] transition-colors text-left"
                      >
                        {l.label}
                      </button>
                    ) : 'href' in l && !l.href.includes('#') ? (
                      <Link
                        href={l.href}
                        className="text-sm text-muted-foreground hover:text-[#00F5A0] transition-colors"
                      >
                        {l.label}
                      </Link>
                    ) : (
                      <a
                        href={'href' in l ? l.href : '#'}
                        className="text-sm text-muted-foreground hover:text-[#00F5A0] transition-colors"
                      >
                        {l.label}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-semibold text-foreground mb-4 tracking-wide text-white/95">
              Social
            </h3>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://x.com/Gliderweb3"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center hover:border-[#6C63FF]/50 transition-colors"
                aria-label="X (Twitter)"
              >
                <SiX className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/glider-labs-751415373/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center hover:border-[#6C63FF]/50 transition-colors"
                aria-label="LinkedIn"
              >
                <SiLinkedin className="w-4 h-4 text-[#6C63FF]" />
              </a>
              <Link
                href="/maintenance"
                className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center hover:border-[#6C63FF]/50 transition-colors"
                aria-label="GitHub — page under maintenance"
              >
                <SiGithub className="w-4 h-4" />
              </Link>
              <a
                href="https://t.me/+2ErSV0N4ufZiNDZl"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center hover:border-[#6C63FF]/50 transition-colors"
                aria-label="Telegram"
              >
                <SiTelegram className="w-4 h-4 text-[#00F5A0]" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-semibold text-foreground mb-4 tracking-wide text-white/95">
              Newsletter
            </h3>
            <p className="text-xs text-muted-foreground mb-3">Web3 security briefings and product updates.</p>
            <form onSubmit={onNewsletter} className="flex flex-col gap-2">
              <Input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/[0.05] border-white/10 text-foreground placeholder:text-muted-foreground h-10"
              />
              <Button type="submit" className="w-full bg-[#6C63FF] hover:bg-[#5a52e6] text-white font-semibold">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="relative pt-10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <div
            className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent"
            aria-hidden
          />
          <p className="text-white/55">© {new Date().getFullYear()} Glider Web3 Solutions. All rights reserved.</p>
          <p className="font-mono text-[10px] sm:text-xs text-center sm:text-right text-white/45 tracking-wide">
            Hardware · DeFi · AI · Enterprise security
          </p>
        </div>
      </div>
    </footer>
  );
}
