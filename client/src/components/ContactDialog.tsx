import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { Copy, Mail } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export const CONTACT_EMAIL = 'operations@glider.world';

const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Inquiry — Glider Web3 Solutions')}`;

type ContactDialogContextValue = {
  openContact: () => void;
};

const ContactDialogContext = createContext<ContactDialogContextValue | null>(null);

export function useContactDialog(): ContactDialogContextValue {
  const ctx = useContext(ContactDialogContext);
  if (!ctx) {
    throw new Error('useContactDialog must be used within ContactDialogProvider');
  }
  return ctx;
}

export function ContactDialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const openContact = useCallback(() => setOpen(true), []);

  const copyEmail = useCallback(() => {
    void navigator.clipboard.writeText(CONTACT_EMAIL).then(
      () => {
        toast({ title: 'Copied', description: 'Email address copied to your clipboard.' });
      },
      () => {
        toast({
          title: 'Could not copy',
          description: 'Select and copy the address manually.',
          variant: 'destructive',
        });
      },
    );
  }, [toast]);

  const value = useMemo(() => ({ openContact }), [openContact]);

  return (
    <ContactDialogContext.Provider value={value}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[min(28rem,calc(100vw-2rem))] border-white/[0.12] bg-[#121215] text-foreground shadow-[0_0_48px_rgba(0,0,0,0.6)] sm:max-w-md sm:rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-xl sm:text-2xl">Contact Glider</DialogTitle>
            <DialogDescription className="text-left text-muted-foreground text-sm leading-relaxed pt-1">
              For demos, security scoping, forensic consultations, partnerships, or careers, please write to our
              operations team. We aim to respond within two business days.
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 font-mono text-sm text-[#00F5A0] break-all">
            {CONTACT_EMAIL}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              className="border-white/15 bg-transparent text-foreground hover:bg-white/[0.06]"
              onClick={copyEmail}
            >
              <Copy className="mr-2 h-4 w-4" aria-hidden />
              Copy email
            </Button>
            <Button className="bg-[#6C63FF] hover:bg-[#5a52e6] text-white font-semibold" asChild>
              <a href={mailtoHref}>
                <Mail className="mr-2 h-4 w-4" aria-hidden />
                Open in email
              </a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </ContactDialogContext.Provider>
  );
}
