import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type Tone = 'brand' | 'white';

const toneStyles: Record<
  Tone,
  { corner: string; inner: string }
> = {
  brand: {
    corner:
      'pointer-events-none absolute z-[1] h-1 w-1 bg-[#8B7CFF]/90 shadow-[0_0_0_1px_rgba(108,99,255,0.4)] sm:h-1.5 sm:w-1.5',
    inner:
      'relative border border-[#8B7CFF]/55 px-[0.12em] py-[0.05em] font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-brand tracking-tight leading-none',
  },
  white: {
    corner:
      'pointer-events-none absolute z-[1] h-1 w-1 bg-white/[0.78] shadow-[0_0_0_1px_rgba(255,255,255,0.2)] sm:h-1.5 sm:w-1.5',
    inner:
      'relative border border-white/[0.5] px-[0.12em] py-[0.05em] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-display text-white tracking-tight leading-none',
  },
};

type BoundingCornerFrameProps = {
  children: ReactNode;
  tone?: Tone;
  className?: string;
};

/** Design-tool style rectangle + corner nodes (Core “End-to-end Web3”, Why Glider “Forward.”, hero optional). */
export function BoundingCornerFrame({ children, tone = 'brand', className }: BoundingCornerFrameProps) {
  const { corner, inner } = toneStyles[tone];
  return (
    <span className="relative inline-flex max-w-full shrink-0">
      <span className={`${corner} left-0 top-0 -translate-x-1/2 -translate-y-1/2`} aria-hidden />
      <span className={`${corner} right-0 top-0 translate-x-1/2 -translate-y-1/2`} aria-hidden />
      <span className={`${corner} left-0 bottom-0 -translate-x-1/2 translate-y-1/2`} aria-hidden />
      <span className={`${corner} right-0 bottom-0 translate-x-1/2 translate-y-1/2`} aria-hidden />
      <span className={cn(inner, className)}>{children}</span>
    </span>
  );
}
