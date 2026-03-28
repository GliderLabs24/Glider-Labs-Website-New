import { Button } from '@/components/ui/button';
import { Construction } from 'lucide-react';
import { Link } from 'wouter';

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-page text-foreground flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.12] bg-white/[0.04] shadow-[0_0_40px_rgba(108,99,255,0.12)]">
          <Construction className="h-8 w-8 text-[#6C63FF]" aria-hidden />
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">Page under maintenance</h1>
        <p className="text-sm text-muted-foreground leading-relaxed mb-8">
          We are updating this area. Please check back soon, or reach out via our contact channels if you need
          assistance in the meantime.
        </p>
        <Link href="/">
          <Button className="bg-[#6C63FF] hover:bg-[#5a52e6] text-white font-semibold">Back to home</Button>
        </Link>
      </div>
    </div>
  );
}
