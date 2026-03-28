import type { ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { DOCS_NAV, DOCS_NAV_LEGAL_START_INDEX, type DocSlug } from './constants';

function SidebarNavLink({ slug, label, active }: { slug: DocSlug; label: string; active: boolean }) {
  return (
    <Link
      href={`/docs/${slug}`}
      className={`block rounded-lg py-2 pl-3 pr-2 text-[13px] leading-snug transition-all duration-200 border-l-2 -ml-px ${
        active
          ? 'border-[#6C63FF] text-white font-medium bg-gradient-to-r from-[#6C63FF]/14 to-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
          : 'border-transparent text-zinc-400 hover:text-zinc-100 hover:border-white/20 hover:bg-white/[0.04]'
      }`}
    >
      {label}
    </Link>
  );
}

function NavPanel({ activeSlug }: { activeSlug: DocSlug }) {
  return (
    <nav aria-label="Documentation sections" className="px-1">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/[0.08]">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#6C63FF]/30 bg-[#6C63FF]/10 text-[#8B7CFF]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0" aria-hidden>
            <path
              d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#00F5A0]/90">Documentation</p>
          <p className="text-xs text-zinc-500 font-medium">All topics</p>
        </div>
      </div>
      <ul className="space-y-0.5">
        {DOCS_NAV.map((item, i) => (
          <li key={item.slug}>
            {i === DOCS_NAV_LEGAL_START_INDEX && (
              <p className="font-mono text-[9px] uppercase tracking-wider text-zinc-600 mt-5 mb-2 px-1">
                Company &amp; legal
              </p>
            )}
            <SidebarNavLink slug={item.slug} label={item.label} active={activeSlug === item.slug} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

type DocsLayoutProps = {
  activeSlug: DocSlug;
  title: string;
  description?: string;
  eyebrow?: string;
  children: ReactNode;
};

export function DocsLayout({ activeSlug, title, description, eyebrow, children }: DocsLayoutProps) {
  const [loc] = useLocation();

  return (
    <div className="min-h-screen bg-page text-foreground flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-12 sm:pt-28 sm:pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <header className="mb-8 lg:mb-10 max-w-3xl relative">
            <div
              className="pointer-events-none absolute -left-4 top-0 h-full w-px bg-gradient-to-b from-[#6C63FF]/50 via-white/10 to-transparent opacity-80 hidden sm:block"
              aria-hidden
            />
            <nav className="text-xs text-zinc-500 mb-3 font-mono">
              <Link href="/" className="hover:text-[#00F5A0] transition-colors">
                Home
              </Link>
              <span className="mx-2 text-zinc-600">/</span>
              <Link href="/docs/overview" className="hover:text-[#00F5A0] transition-colors">
                Docs
              </Link>
              <span className="mx-2 text-zinc-600">/</span>
              <span className="text-zinc-400">{title}</span>
            </nav>
            <p className="font-mono text-sm text-[#00F5A0] mb-2">Documentation</p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
              {title}
            </h1>
            {eyebrow ? <p className="text-sm font-mono text-[#6C63FF] mb-3">{eyebrow}</p> : null}
            {description ? <p className="text-lg text-muted-foreground leading-relaxed">{description}</p> : null}
          </header>

          <div className="lg:hidden sticky z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 mb-8 bg-page/95 backdrop-blur-xl border-y border-white/[0.1] shadow-[0_12px_40px_rgba(0,0,0,0.35)] top-[5.25rem] sm:top-[5.5rem] overflow-x-auto">
            <div className="flex gap-2 min-w-min pb-0.5">
              {DOCS_NAV.map((item) => {
                const active = loc === `/docs/${item.slug}`;
                return (
                  <Link
                    key={item.slug}
                    href={`/docs/${item.slug}`}
                    className={`shrink-0 rounded-full border px-3 py-2 text-xs font-medium transition-all ${
                      active
                        ? 'border-[#6C63FF]/45 bg-[#6C63FF]/18 text-white shadow-[0_0_20px_rgba(108,99,255,0.15)]'
                        : 'border-white/[0.12] text-zinc-400 hover:border-white/25 hover:text-zinc-100 hover:bg-white/[0.04]'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-stretch lg:gap-10 xl:gap-14">
            <aside className="hidden lg:flex lg:w-[17rem] xl:w-[17.5rem] shrink-0 flex-col">
              <div className="sticky z-20 flex flex-col pb-4" style={{ top: '6.75rem' }}>
                <div className="rounded-2xl border border-white/[0.1] bg-zinc-950/70 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(108,99,255,0.06),0_16px_48px_rgba(0,0,0,0.45)] backdrop-blur-xl max-h-[calc(100vh-7.5rem)] overflow-x-hidden overflow-y-auto overscroll-y-contain [scrollbar-width:thin] [scrollbar-color:rgba(108,99,255,0.35)_transparent]">
                  <div
                    className="pointer-events-none h-px w-full bg-gradient-to-r from-transparent via-[#6C63FF]/35 to-transparent opacity-90"
                    aria-hidden
                  />
                  <div className="p-5">
                    <NavPanel activeSlug={activeSlug} />
                  </div>
                </div>
              </div>
            </aside>

            <article className="min-w-0 flex-1 max-w-3xl lg:max-w-none xl:max-w-3xl pb-8">
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 lg:p-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                {children}
              </div>
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
