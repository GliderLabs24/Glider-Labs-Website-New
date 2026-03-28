import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';

import { useContactDialog } from '@/components/ContactDialog';

const navItems = [
  { kind: 'section' as const, label: 'Services', id: 'services' },
  { kind: 'section' as const, label: 'Why Glider', id: 'why-glider' },
  { kind: 'section' as const, label: 'Products', id: 'products' },
  { kind: 'section' as const, label: 'Insights', id: 'insights' },
  { kind: 'route' as const, label: 'Docs', href: '/docs/overview' },
  { kind: 'route' as const, label: 'Careers', href: '/careers' },
];

function isRouteActive(href: string, path: string) {
  if (href.startsWith('/docs')) return path.startsWith('/docs');
  return path === href || path.startsWith(`${href}/`);
}

export function Header() {
  const { openContact } = useContactDialog();
  const [loc] = useLocation();
  const isHome = loc === '/';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (!isHome) {
      window.location.assign(`/#${id}`);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-5 sm:px-6" data-testid="header-main">
      {/* Outer frame: thin border + slight gap before inner glass */}
      <div
        className={`max-w-7xl mx-auto rounded-2xl border border-white/[0.16] bg-white/[0.04] p-1 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.2)] transition-all duration-300 ${
          scrolled ? 'border-white/[0.22] shadow-[0_8px_40px_rgba(0,0,0,0.45)]' : ''
        }`}
      >
        <div
          className={`flex h-14 sm:h-[3.625rem] items-center justify-between gap-2 rounded-[0.65rem] border border-white/[0.12] bg-white/[0.07] px-3 backdrop-blur-2xl transition-all duration-300 sm:gap-3 sm:px-2.5 lg:px-3 ${
            scrolled ? 'bg-white/[0.09] border-white/[0.14]' : ''
          }`}
        >
          <div className="flex min-w-0 flex-1 items-center">
            <Link
              href="/"
              onClick={(e) => {
                if (isHome) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="flex min-w-0 shrink-0 items-center"
              aria-label="Glider Web3 Solutions home"
            >
              <img
                src="https://green-rainy-clam-911.mypinata.cloud/ipfs/bafkreif4rnp5754if77z747skgfhwgjj4vh5jb56d5dgrbjudsxl2nppsi"
                alt=""
                className="h-9 w-auto sm:h-10"
              />
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-0.5" data-testid="nav-menu">
            {navItems.map((item) =>
              item.kind === 'route' ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-xs font-medium transition-colors px-3 py-2 rounded-lg hover:bg-white/[0.08] ${
                    isRouteActive(item.href, loc) ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-white/[0.08]"
                >
                  {item.label}
                </button>
              ),
            )}
          </nav>

          <div className="flex shrink-0 items-center">
            <button
              type="button"
              data-testid="button-app"
              onClick={openContact}
              className="group relative inline-flex h-9 max-w-full shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/[0.18] bg-white/[0.08] px-4 text-sm font-bold tracking-tight text-white backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-1px_0_rgba(255,255,255,0.06)] transition-[transform,box-shadow,background-color] duration-200 hover:border-white/[0.26] hover:bg-white/[0.12] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.24),inset_0_-1px_0_rgba(255,255,255,0.08),0_0_20px_rgba(255,255,255,0.08)] active:scale-[0.98] sm:px-5"
            >
              {/* Moving white light sweep (behind label) */}
              <span
                className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-full"
                aria-hidden
              >
                <span className="absolute top-0 left-0 h-full w-[65%] -skew-x-[18deg] bg-gradient-to-r from-transparent via-white/[0.42] to-transparent opacity-90 animate-shimmer-sweep motion-reduce:animate-none" />
              </span>
              <span className="relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                Contact Us
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
