import { Sparkles } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

import { BoundingCornerFrame } from '@/components/BoundingCornerFrame';

const TYPEWRITER_WORDS = ['Privacy.', 'network.', 'security.', 'life.'] as const;

/** Typewriter cycles: Privacy. → network → security → life */
function TypewriterHeadline() {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const words = TYPEWRITER_WORDS;
  const typingDelay = 90;
  const deletingDelay = 70;
  const pauseDuration = 2000;

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeoutId: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (text.length < currentWord.length) {
        timeoutId = setTimeout(() => {
          setText(currentWord.slice(0, text.length + 1));
        }, typingDelay);
      } else {
        timeoutId = setTimeout(() => setIsDeleting(true), pauseDuration);
      }
    } else if (text.length > 0) {
      timeoutId = setTimeout(() => {
        setText(text.slice(0, -1));
      }, deletingDelay);
    } else {
      timeoutId = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      }, 280);
    }

    return () => clearTimeout(timeoutId);
  }, [text, isDeleting, wordIndex]);

  const gradientWord = (
    <span className="bg-gradient-to-r from-cyan-400 via-[#6C63FF] to-fuchsia-400 bg-clip-text text-transparent">
      {text}
      <span className="inline-block h-[0.85em] w-0.5 animate-pulse bg-cyan-400/90 align-middle ml-0.5" />
    </span>
  );

  return (
    <>
      {/* Mobile: Glider; on its own line, then Own Your + typewriter */}
      <span className="block text-white sm:hidden">
        <span className="block">Glider;</span>
        <span className="mt-2 block leading-tight">
          Own Your {gradientWord}
        </span>
      </span>
      <span className="hidden text-white sm:block">
        Glider; Own Your {gradientWord}
      </span>
      <span className="mt-3 flex w-full justify-center sm:mt-2">
        <span className="max-w-[calc(100vw-2rem)]">
          <BoundingCornerFrame
            tone="white"
            className="text-center !text-[1.65rem] leading-none sm:!text-3xl md:!text-4xl lg:!text-5xl xl:!text-6xl"
          >
            Power Your World
          </BoundingCornerFrame>
        </span>
      </span>
    </>
  );
}

const HEADER_SCROLL_GAP_PX = 96;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function smoothScrollToY(targetY: number, durationMs: number) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  if (Math.abs(distance) < 2) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    window.scrollTo(0, targetY);
    return;
  }

  const start = performance.now();
  const step = (now: number) => {
    const elapsed = now - start;
    const t = Math.min(elapsed / durationMs, 1);
    const eased = easeInOutCubic(t);
    window.scrollTo(0, startY + distance * eased);
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export function HeroSection() {
  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - HEADER_SCROLL_GAP_PX;
    smoothScrollToY(Math.max(0, y), 900);
  }, []);

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-page"
      data-testid="section-hero"
      id="top"
    >
      {/* Foreground: copy animates in; CTA sits outside motion so Tailwind transform keyframes run (same as header). */}
      <div className="relative z-20 container mx-auto px-6 sm:px-8 text-center pt-28 pb-24">
        <motion.div
          className="max-w-5xl mx-auto space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.05] px-3 py-1.5 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(108,99,255,0.15)] sm:px-4 sm:py-2">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-white sm:h-4 sm:w-4" aria-hidden />
            <span className="text-xs font-medium leading-snug text-white/90 sm:text-sm">
              Web3 security &amp; infrastructure
            </span>
          </div>

          <h1
            className="font-display text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.12] sm:leading-tight px-1 sm:px-0 overflow-visible"
            data-testid="text-hero-title"
          >
            <TypewriterHeadline />
          </h1>

          <p
            className="max-w-2xl mx-auto px-2 text-lg leading-snug text-white/75 sm:text-lg md:text-xl sm:leading-relaxed"
            data-testid="text-hero-subtitle"
          >
            Glider builds enterprise Web3 security - hardware custody, DeFi, and AI in one unified stack.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto flex justify-center pt-6 sm:pt-8">
          <button
            type="button"
            onClick={() => scrollToSection('services')}
            data-testid="button-explore"
            className="group relative inline-flex h-12 max-sm:h-[3.25rem] shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/[0.22] bg-gradient-to-b from-white/[0.2] via-white/[0.09] to-zinc-500/[0.14] px-8 text-base font-bold tracking-wide text-zinc-100 backdrop-blur-md shadow-[0_4px_14px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.42),inset_0_-1px_0_rgba(0,0,0,0.35)] transition-[transform,box-shadow,border-color] duration-200 hover:border-white/35 hover:from-white/[0.26] hover:via-white/[0.14] hover:to-zinc-400/[0.18] hover:shadow-[0_4px_18px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-1px_0_rgba(0,0,0,0.3),0_0_22px_rgba(255,255,255,0.1)] active:scale-[0.98] sm:text-sm"
          >
            <span
              className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-full"
              aria-hidden
            >
              <span className="absolute top-0 left-0 h-full w-[65%] -skew-x-[18deg] bg-gradient-to-r from-transparent via-white/[0.42] to-transparent opacity-90 animate-shimmer-sweep motion-reduce:animate-none" />
            </span>
            <span className="relative z-10 flex items-center gap-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.65)]">
              <Sparkles className="h-4 w-4 text-zinc-200" strokeWidth={2} aria-hidden />
              Explore Solutions
              <svg
                className="h-4 w-4 text-zinc-300/95"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* Neutral patterns on page canvas — no purple wash */}
      <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
        <div className="absolute inset-0 animate-pulse-slow bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.045)_0%,transparent_55%)]" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 animate-grid-move [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:32px_32px]" />
          <div className="absolute inset-0 animate-grid-pulse [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.028)_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] via-transparent to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-[2] flex items-end justify-center pointer-events-none h-1/3 select-none">
        <span className="font-display text-[25vw] sm:text-[30vw] font-black text-white/[0.035] sm:text-white/[0.025] leading-none mb-[-5%] sm:mb-[-3%]">
          GLIDER
        </span>
      </div>

      {/* Dissolve hero (grid + watermark) into next section — same #0B0B0D as services */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[3] h-[min(42vh,22rem)] sm:h-[min(38vh,24rem)]"
        style={{
          background:
            'linear-gradient(to top, #0B0B0D 0%, #0B0B0D 10%, rgba(11,11,13,0.96) 24%, rgba(11,11,13,0.82) 42%, rgba(11,11,13,0.55) 58%, rgba(11,11,13,0.28) 74%, rgba(11,11,13,0.1) 88%, transparent 100%)',
        }}
        aria-hidden
      />
    </section>
  );
}
