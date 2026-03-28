import type { ReactNode } from 'react';

export function SectionHeading({ children, className = 'mb-4' }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={`font-display text-xl sm:text-2xl font-semibold text-white pb-2 border-b border-white/[0.08] flex flex-wrap items-center gap-2 ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#00F5A0] shadow-[0_0_10px_rgba(0,245,160,0.45)] shrink-0" aria-hidden />
      {children}
    </h2>
  );
}
