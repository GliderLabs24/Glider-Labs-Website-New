import { motion } from 'framer-motion';
import { Building2, Globe2, ShieldCheck, TrendingUp } from 'lucide-react';

import { BoundingCornerFrame } from '@/components/BoundingCornerFrame';

/** Same asset as `Header` logo — used here as a low-contrast watermark only. */
const GLIDER_LOGO_SRC =
  'https://green-rainy-clam-911.mypinata.cloud/ipfs/bafkreif4rnp5754if77z747skgfhwgjj4vh5jb56d5dgrbjudsxl2nppsi';

const stats = [
  { label: 'Clients & engagements', value: '50+', icon: Building2 },
  { label: 'Target platform uptime', value: '99.9%', icon: ShieldCheck },
  { label: 'Assets under advisory scope', value: '$48M', icon: TrendingUp },
  { label: 'Countries served', value: '24', icon: Globe2 },
];

export function WhyGliderSection() {
  return (
    <section id="why-glider" className="relative bg-page pt-24 sm:pt-32 pb-10 sm:pb-12">
      <div className="container mx-auto px-6 sm:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <p className="mb-3 font-mono text-sm text-[#FF4C60]">Why Glider</p>
          <h2 className="mb-4 flex flex-wrap items-baseline justify-center gap-x-2 gap-y-2 overflow-visible font-display text-3xl font-bold text-foreground sm:gap-x-2.5 sm:text-4xl md:text-5xl">
            <span>Trusted. Technical.</span>
            <BoundingCornerFrame tone="brand">Forward.</BoundingCornerFrame>
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
            We combine hardware, DeFi, AI, and forensics - a rare full-stack security practice in the Indian Web3
            ecosystem, built for global operators who need evidence, not hype.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ label, value, icon: Icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="group relative"
            >
              <div className="relative flex min-h-[200px] flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-zinc-950/55 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05),inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-1px_0_rgba(0,0,0,0.45)] backdrop-blur-md transition-[border-color,background-color,box-shadow] duration-200 group-hover:border-white/[0.14] group-hover:bg-zinc-950/70 group-hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(0,0,0,0.35),0_0_24px_rgba(0,0,0,0.35)]">
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-px bg-gradient-to-r from-transparent via-white/12 to-transparent opacity-70"
                  aria-hidden
                />
                <img
                  src={GLIDER_LOGO_SRC}
                  alt=""
                  width={160}
                  height={160}
                  decoding="async"
                  className="pointer-events-none absolute bottom-1 right-1 z-[1] h-16 w-auto select-none object-contain opacity-[0.08] sm:bottom-2 sm:right-2 sm:h-[4.5rem]"
                  aria-hidden
                />
                <div className="relative z-10 flex flex-1 flex-col p-6">
                  <div className="mb-4 inline-flex shrink-0 self-start rounded-xl border border-white/[0.08] bg-black/25 p-1.5 transition-colors group-hover:border-white/[0.14]">
                    <div className="rounded-lg border border-white/[0.1] bg-black/35 p-3 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors group-hover:border-white/[0.16]">
                      <Icon className="h-6 w-6 text-white/80" aria-hidden />
                    </div>
                  </div>
                  <p className="font-display text-3xl font-bold tracking-tight text-zinc-100 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] sm:text-4xl">
                    {value}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
