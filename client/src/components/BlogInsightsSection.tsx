import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { Link } from 'wouter';

import { BoundingCornerFrame } from '@/components/BoundingCornerFrame';

const posts = [
  {
    tag: 'Web3 security',
    title: 'Key hierarchy hardening: what enterprises get wrong in cold storage',
    excerpt: 'Separation of duties, policy engines, and recovery drills: a practical checklist for custody teams.',
    date: 'Mar 12, 2026',
  },
  {
    tag: 'DeFi',
    title: 'Liquidity shocks and oracle drift: monitoring patterns for treasuries',
    excerpt: 'How to correlate on-chain depth, bridge flows, and price feeds before stress becomes insolvency.',
    date: 'Feb 28, 2026',
  },
  {
    tag: 'AI × blockchain',
    title: 'When to trust an AI security scanner: limits of static analysis',
    excerpt: 'Pairing model-assisted triage with human review for contracts and orchestration layers.',
    date: 'Feb 14, 2026',
  },
];

export function BlogInsightsSection() {
  return (
    <section id="insights" className="relative py-24 sm:py-32 bg-page">
      <div className="container mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <p className="mb-3 font-mono text-sm text-[#00F5A0]">Blog &amp; insights</p>
          <h2 className="mb-1 flex flex-wrap items-baseline justify-center gap-x-2 gap-y-2 font-display text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            <span>Signal for</span>
            <BoundingCornerFrame tone="brand">operators</BoundingCornerFrame>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Technical notes on security, DeFi risk, and AI in blockchain - written for builders and compliance teams.
          </p>
          <Link
            href="/maintenance"
            className="mt-6 inline-flex items-center justify-center gap-2 text-sm font-medium text-[#6C63FF] transition-colors hover:text-[#8B7CFF]"
          >
            <BookOpen className="h-4 w-4 shrink-0" aria-hidden />
            View all articles
            <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
          </Link>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
              className="group relative h-full"
            >
              <a
                href="#insights"
                className="relative flex min-h-[260px] h-full flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-zinc-950/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-1px_0_rgba(0,0,0,0.45)] backdrop-blur-md transition-[border-color,background-color,box-shadow] duration-200 group-hover:border-white/[0.14] group-hover:bg-zinc-950/70 group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(0,0,0,0.35),0_0_24px_rgba(0,0,0,0.35)]"
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-px bg-gradient-to-r from-transparent via-white/12 to-transparent opacity-70"
                  aria-hidden
                />
                <div className="relative z-10 flex flex-1 flex-col p-6">
                  <span className="text-xs font-mono text-zinc-500">{post.tag}</span>
                  <h3 className="mt-2 font-display text-lg font-semibold tracking-tight text-zinc-100 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] transition-colors group-hover:text-white">
                    {post.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">{post.excerpt}</p>
                  <time className="mt-4 text-xs font-mono text-zinc-500">{post.date}</time>
                </div>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
