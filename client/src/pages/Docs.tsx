import { Construction } from 'lucide-react';
import { Link, Redirect, useParams } from 'wouter';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

/**
 * Full documentation UI lives under `pages/docs/` and will be wired back when ready.
 * All `/docs/*` routes show this placeholder for now.
 */
export default function DocsPage() {
  const params = useParams<{ slug: string }>();
  if (!params.slug) {
    return <Redirect to="/docs/overview" />;
  }

  return (
    <div className="min-h-screen bg-page text-foreground flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="max-w-lg w-full text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.12] bg-white/[0.04] shadow-[0_0_40px_rgba(108,99,255,0.12)]">
            <Construction className="h-8 w-8 text-[#6C63FF]" aria-hidden />
          </div>
          <p className="font-mono text-sm text-[#00F5A0] mb-2">Documentation</p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">Under development</h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-8">
            We are rebuilding our technical documentation and product reference. Check back soon, or reach out if you
            need materials in the meantime.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/[0.14] bg-white/[0.06] px-8 text-sm font-semibold text-white hover:bg-white/[0.1] transition-colors w-full sm:w-auto"
            >
              Back to home
            </Link>
            <a
              href="mailto:operations@glider.world"
              className="inline-flex h-11 items-center justify-center rounded-full bg-[#6C63FF] hover:bg-[#5a52e6] px-8 text-sm font-semibold text-white transition-colors w-full sm:w-auto"
            >
              Email operations
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
