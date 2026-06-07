import { useState } from 'react';
import { motion } from 'framer-motion';

import { BoundingCornerFrame } from '@/components/BoundingCornerFrame';

/** Company domains — icons via Google favicon service, with fallbacks if a request fails. */
const partners = [
  { name: 'ChainSecurity', domain: 'chainsecurity.com' },
  { name: 'OpenZeppelin', domain: 'openzeppelin.com' },
  { name: 'Trail of Bits', domain: 'trailofbits.com' },
  { name: 'CertiK', domain: 'certik.com' },
  { name: 'Halborn', domain: 'halborn.com' },
  { name: 'Quantstamp', domain: 'quantstamp.com' },
  { name: 'Immunefi', domain: 'immunefi.com' },
  { name: 'Ledger Enterprise', domain: 'ledger.com' },
  { name: 'Fireblocks', domain: 'fireblocks.com' },
  { name: 'Chainalysis', domain: 'chainalysis.com' },
  { name: 'Elliptic', domain: 'elliptic.co' },
  { name: 'Nansen', domain: 'nansen.ai' },
] as const;

function googleS2Favicon(domain: string, sz: number) {
  return `https://www.google.com/s2/favicons?sz=${sz}&domain=${encodeURIComponent(domain)}`;
}

function googleFaviconV2(domain: string, size: number) {
  const site = `https://${domain}`;
  return `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${encodeURIComponent(site)}&size=${size}`;
}

function PartnerLogo({ name, domain }: { name: string; domain: string }) {
  const sources = [
    googleS2Favicon(domain, 256),
    googleFaviconV2(domain, 256),
    googleS2Favicon(domain, 128),
  ];
  const [srcIndex, setSrcIndex] = useState(0);

  if (srcIndex >= sources.length) {
    return (
      <span className="whitespace-nowrap font-mono text-sm text-muted-foreground/80 sm:text-base">{name}</span>
    );
  }

  return (
    <img
      src={sources[srcIndex]}
      alt={name}
      width={72}
      height={72}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      className="h-14 w-14 shrink-0 rounded-xl bg-white/[0.06] object-contain p-2 opacity-90 ring-1 ring-white/[0.1] transition-opacity hover:opacity-100 sm:h-16 sm:w-16 sm:p-2.5"
      onError={() => setSrcIndex((i) => i + 1)}
    />
  );
}

function MarqueeRow() {
  const doubled = [...partners, ...partners];
  return (
    <div className="flex overflow-hidden py-4 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <div className="animate-marquee flex items-center gap-16 whitespace-nowrap pr-16 sm:gap-24">
        {doubled.map((p, i) => (
          <div
            key={`${p.domain}-${i}`}
            className="inline-flex shrink-0 items-center justify-center"
          >
            <PartnerLogo name={p.name} domain={p.domain} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PartnersSection() {
  return (
    <section id="partners" className="relative overflow-hidden border-y border-white/[0.06] bg-page py-16 sm:py-20">
      <div className="container mx-auto mb-8 px-6 sm:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center font-mono text-sm text-muted-foreground"
        >
          Trusted by teams who align with leading auditors, custody, and analytics ecosystems
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-2 flex flex-wrap items-baseline justify-center gap-x-2 gap-y-2 text-center font-display text-2xl font-bold text-foreground sm:text-3xl"
        >
          <span>Partners &amp;</span>
          <BoundingCornerFrame tone="brand" className="text-2xl sm:text-3xl md:text-3xl">
            ecosystem
          </BoundingCornerFrame>
        </motion.h2>
      </div>
      <MarqueeRow />
    </section>
  );
}
