import { motion } from 'framer-motion';

import { useContactDialog } from '@/components/ContactDialog';
import { BoundingCornerFrame } from '@/components/BoundingCornerFrame';
import { Button } from '@/components/ui/button';
import { Brain, Landmark, Watch } from 'lucide-react';

const products = [
  {
    icon: Watch,
    name: 'Crypto Smart watch',
    teaser:
      'Wearable-first custody signals and alerts - hardened UX for signing awareness without sacrificing mobility.',
  },
  {
    icon: Landmark,
    name: 'DeFi Protocol',
    teaser:
      'Protocol-level risk surfaces for treasuries and builders - liquidity, governance, and bridge exposure in one discipline.',
  },
  {
    icon: Brain,
    name: 'AI Infrastructure',
    teaser:
      'Model-assisted monitoring and automation layers for Web3 ops - tuned for fewer false positives and audit-ready trails.',
  },
] as const;

export function FeaturedProductsSection() {
  const { openContact } = useContactDialog();

  return (
    <section id="products" className="relative bg-page py-24 sm:py-32">
      <div className="container relative z-10 mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <p className="mb-3 font-mono text-sm text-zinc-400">Featured products & tools</p>
          <h2 className="mb-4 flex flex-wrap items-baseline justify-center gap-x-2 gap-y-2 overflow-visible font-display text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            <span>Infrastructure you can</span>
            <BoundingCornerFrame tone="brand">ship and defend</BoundingCornerFrame>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Preview of flagship programs under active development. Engage early for design partners and pilot deployments.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {products.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.article
                key={p.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
                className="group relative flex h-full flex-col"
              >
                <div className="relative flex min-h-[280px] flex-1 flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-zinc-950/55 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05),inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-1px_0_rgba(0,0,0,0.45)] backdrop-blur-md transition-[border-color,background-color,box-shadow] duration-200 group-hover:border-white/[0.14] group-hover:bg-zinc-950/70 group-hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(0,0,0,0.35),0_0_24px_rgba(0,0,0,0.35)]">
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-px bg-gradient-to-r from-transparent via-white/12 to-transparent opacity-70"
                    aria-hidden
                  />
                  <div className="relative z-10 flex flex-1 flex-col p-6">
                    <div className="mb-4 inline-flex shrink-0 self-start rounded-xl border border-white/[0.08] bg-black/25 p-1.5 transition-colors group-hover:border-white/[0.14]">
                      <div className="rounded-lg border border-white/[0.1] bg-black/35 p-3 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors group-hover:border-white/[0.16]">
                        <Icon className="h-7 w-7 text-white/80" aria-hidden />
                      </div>
                    </div>
                    <h3 className="font-display text-xl font-semibold tracking-tight text-zinc-100 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
                      {p.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">{p.teaser}</p>
                    <div className="mt-6">
                      <Button
                        type="button"
                        variant="outline"
                        className="h-11 w-full rounded-xl border-white/20 bg-white/[0.04] font-semibold text-zinc-100 hover:bg-white/[0.08]"
                        onClick={openContact}
                      >
                        See research &amp; development
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
