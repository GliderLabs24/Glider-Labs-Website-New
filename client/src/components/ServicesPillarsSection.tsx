import { motion } from 'framer-motion';
import { ArrowUpRight, Brain, Landmark, ScanSearch, Server, Usb } from 'lucide-react';
import { Link } from 'wouter';

import { BoundingCornerFrame } from '@/components/BoundingCornerFrame';

const pillars = [
  {
    icon: Usb,
    title: 'Hardware Wallet',
    description: 'Cold storage. Your keys. Your control.',
  },
  {
    icon: Landmark,
    title: 'DeFi Infrastructure',
    description: 'Build and secure decentralized finance.',
  },
  {
    icon: Brain,
    title: 'AI for Web3',
    description: 'Intelligent tools for the decentralized world.',
  },
  {
    icon: Server,
    title: 'Security Infrastructure',
    description: 'Enterprise-grade blockchain protection.',
  },
  {
    icon: ScanSearch,
    title: 'Crypto Forensics',
    description: 'Trace. Analyze. Recover.',
  },
] as const;

const serviceDetailHref = '/maintenance';

export function ServicesPillarsSection() {
  return (
    <section id="services" className="relative scroll-mt-24 bg-page py-24 sm:py-32">
      <div className="container mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <p className="mb-3 font-mono text-sm text-[#00F5A0]">Core services</p>
          <h2 className="mb-4 flex flex-wrap items-baseline justify-center gap-x-2 gap-y-2 overflow-visible sm:gap-x-2.5">
            <BoundingCornerFrame tone="brand">End-to-end Web3</BoundingCornerFrame>
            <span className="font-display text-3xl font-bold leading-none tracking-tight text-white sm:text-4xl md:text-5xl">
              security stack
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            From silicon to settlement - hardware, protocols, automation, and forensic response in one disciplined
            practice.
          </p>
        </motion.div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {pillars.map(({ icon: Icon, title, description }, i) => (
            <motion.li
              key={title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
              className="group relative h-full"
            >
              <Link
                href={serviceDetailHref}
                className="relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-zinc-950/55 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05),inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-1px_0_rgba(0,0,0,0.45)] backdrop-blur-md transition-[border-color,background-color,box-shadow] duration-200 group-hover:border-white/[0.14] group-hover:bg-zinc-950/70 group-hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(0,0,0,0.35),0_0_24px_rgba(0,0,0,0.35)]"
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-px bg-gradient-to-r from-transparent via-white/12 to-transparent opacity-70"
                  aria-hidden
                />
                <div className="relative z-10 flex flex-1 flex-col p-6">
                  <div className="mb-4 inline-flex shrink-0 self-start rounded-xl border border-white/[0.08] bg-black/25 p-1.5 transition-colors group-hover:border-white/[0.14]">
                    <div className="rounded-lg border border-white/[0.1] bg-black/35 p-3 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors group-hover:border-white/[0.16]">
                      <Icon className="h-6 w-6 text-white/80" aria-hidden />
                    </div>
                  </div>
                  <h3 className="font-display text-lg font-semibold tracking-tight text-zinc-100 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
                    {title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">{description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-zinc-300 transition-colors group-hover:text-zinc-50">
                    Learn more
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
