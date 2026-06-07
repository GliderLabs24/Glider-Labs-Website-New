import { Fragment } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, ChevronRight, ClipboardCheck, Hammer, Shield } from 'lucide-react';

import { BoundingCornerFrame } from '@/components/BoundingCornerFrame';

const steps = [
  {
    step: '01',
    title: 'Assess',
    body: 'Threat modeling, architecture review, and chain-specific exposure mapping.',
    icon: ClipboardCheck,
  },
  {
    step: '02',
    title: 'Build',
    body: 'Hardened custody, DeFi integrations, monitoring pipelines, and AI-assisted tooling.',
    icon: Hammer,
  },
  {
    step: '03',
    title: 'Secure',
    body: 'Continuous monitoring, incident response, and forensic-grade evidence collection.',
    icon: Shield,
  },
];

function StepConnector() {
  return (
    <>
      <div className="flex justify-center py-5 lg:hidden" aria-hidden>
        <div className="flex flex-col items-center gap-1">
          <ChevronDown className="h-4 w-4 text-white/18" strokeWidth={1.5} />
          <div className="h-10 w-px bg-gradient-to-b from-white/15 to-white/5" />
        </div>
      </div>
      <div className="hidden w-10 shrink-0 items-center justify-center self-center lg:flex xl:w-14" aria-hidden>
        <div className="flex items-center gap-0.5 opacity-40">
          <div className="h-px w-4 bg-gradient-to-r from-transparent to-white/15" />
          <ChevronRight className="h-5 w-5 text-white/22" strokeWidth={1.5} />
          <div className="h-px w-4 bg-gradient-to-l from-transparent to-white/15" />
        </div>
      </div>
    </>
  );
}

export function HowItWorksSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="how-it-works" className="relative bg-page pt-8 sm:pt-10 pb-24 sm:pb-32">
      <div className="container relative mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 text-center sm:mb-16"
        >
          <h2 className="flex flex-nowrap items-baseline justify-center gap-x-1 px-1 font-display text-lg font-bold leading-tight text-foreground sm:flex-wrap sm:gap-x-2 sm:gap-y-2 sm:px-0 sm:text-4xl sm:leading-normal md:text-5xl">
            <span className="shrink-0 text-muted-foreground">Assess → Build →</span>
            <BoundingCornerFrame tone="brand" className="!text-lg leading-none sm:!text-4xl md:!text-5xl">
              Secure
            </BoundingCornerFrame>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            One delivery loop from first review to live defenses - scoped, documented, and measurable.
          </p>
        </motion.div>

        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row lg:items-stretch">
            {steps.map(({ step, title, body, icon: Icon }, i) => (
              <Fragment key={title}>
                <motion.article
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    delay: reduceMotion ? 0 : i * 0.1,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1] as const,
                  }}
                  className="group relative flex min-h-0 flex-1 flex-col lg:min-w-0"
                >
                  <div className="relative flex h-full min-h-[260px] flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-zinc-950/55 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05),inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-1px_0_rgba(0,0,0,0.45)] backdrop-blur-md transition-[border-color,background-color,box-shadow] duration-200 group-hover:border-white/[0.14] group-hover:bg-zinc-950/70 group-hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(0,0,0,0.35),0_0_24px_rgba(0,0,0,0.35)]">
                    <div
                      className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-px bg-gradient-to-r from-transparent via-white/12 to-transparent opacity-70"
                      aria-hidden
                    />
                    <span
                      className="pointer-events-none absolute right-2 top-2 font-display text-5xl font-bold leading-none text-white/[0.06] sm:right-4 sm:top-4 sm:text-6xl md:text-7xl"
                      aria-hidden
                    >
                      {step}
                    </span>

                    <div className="relative z-10 flex flex-1 flex-col items-stretch p-6 sm:p-7">
                      <div className="mb-5 inline-flex w-fit max-w-full shrink-0 items-center gap-2 self-start rounded-full border border-white/[0.08] bg-black/25 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/65 sm:text-xs">
                        <span className="text-white/55">{step}</span>
                        <span className="h-1 w-1 shrink-0 rounded-full bg-white/18" aria-hidden />
                        <span className="text-white/40">Phase</span>
                      </div>

                      <div className="mb-5 inline-flex shrink-0 self-start rounded-xl border border-white/[0.08] bg-black/25 p-1.5 transition-colors group-hover:border-white/[0.14]">
                        <div className="rounded-lg border border-white/[0.1] bg-black/35 p-3 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors group-hover:border-white/[0.16]">
                          <Icon className="h-7 w-7 text-white/80 sm:h-8 sm:w-8" aria-hidden />
                        </div>
                      </div>

                      <h3 className="font-display text-xl font-semibold tracking-tight text-zinc-100 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] sm:text-2xl">
                        {title}
                      </h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400 sm:text-[15px]">{body}</p>

                      {i < steps.length - 1 && (
                        <div className="mt-5 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-zinc-500 lg:hidden">
                          <span className="h-px max-w-[3rem] flex-1 bg-gradient-to-r from-white/12 to-transparent" />
                          <span>Next</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.article>

                {i < steps.length - 1 && <StepConnector />}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
