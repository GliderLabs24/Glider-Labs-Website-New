import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { useContactDialog } from '@/components/ContactDialog';

export function FinalCTASection() {
  const { openContact } = useContactDialog();

  return (
    <section id="cta" className="relative py-20 sm:py-28 bg-page">
      <div className="container mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden border border-[#6C63FF]/30 bg-gradient-to-br from-[#121215] to-page px-8 py-14 sm:px-16 sm:py-16 text-center"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(108,99,255,0.2),transparent_55%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_100%,rgba(0,245,160,0.12),transparent_50%)] pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Ready to secure your Web3 future?
            </h2>
            <p className="text-muted-foreground text-lg mb-10">
              Book a confidential scoping call. We respond within two business days.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                type="button"
                onClick={openContact}
                className="group relative inline-flex h-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/[0.18] bg-white/[0.08] px-10 text-base font-bold tracking-tight text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-1px_0_rgba(255,255,255,0.06)] backdrop-blur-md transition-[transform,box-shadow,background-color,border-color] duration-200 hover:border-white/[0.26] hover:bg-white/[0.12] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.24),inset_0_-1px_0_rgba(255,255,255,0.08),0_0_20px_rgba(255,255,255,0.08)] active:scale-[0.98]"
              >
                <span
                  className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-full"
                  aria-hidden
                >
                  <span className="absolute left-0 top-0 h-full w-[65%] -skew-x-[18deg] bg-gradient-to-r from-transparent via-white/[0.42] to-transparent opacity-90 animate-shimmer-sweep motion-reduce:animate-none" />
                </span>
                <span className="relative z-10 inline-flex items-center gap-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                  Get in Touch
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </button>
              <a
                href="https://cal.com/glider-labs/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 shrink-0 items-center justify-center rounded-full border border-[#5FE8C4]/50 bg-gradient-to-b from-[#2EE8B0] to-[#00996E] px-10 text-sm font-bold tracking-tight text-zinc-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_4px_18px_rgba(0,0,0,0.35)] transition-[transform,background-color,border-color,box-shadow] duration-200 hover:border-[#8FF5D9] hover:from-[#4AF0C0] hover:to-[#00B37E] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_6px_24px_rgba(0,245,160,0.35)] active:scale-[0.98]"
              >
                Book a Call
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
