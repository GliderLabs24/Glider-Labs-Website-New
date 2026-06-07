import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Briefcase, Construction, Mail, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'wouter';
import { z } from 'zod';

import { BoundingCornerFrame } from '@/components/BoundingCornerFrame';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const OPERATIONS_EMAIL = 'operations@glider.world';

const careersSchema = z.object({
  fullName: z.string().min(2, 'Enter your full name'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().optional(),
  linkedIn: z
    .string()
    .optional()
    .refine((val) => !val?.trim() || /^https?:\/\/.+/i.test(val.trim()), {
      message: 'Use a full URL (https://…)',
    }),
  roleTrack: z.string().min(1, 'Select an area'),
  message: z.string().min(40, 'Share at least a few sentences about your background and interest'),
  consent: z.boolean().refine((v) => v === true, {
    message: 'Please confirm to submit',
  }),
});

type CareersFormValues = z.infer<typeof careersSchema>;

const roleOptions = [
  { value: '', label: 'Select focus area' },
  { value: 'engineering', label: 'Engineering & protocol' },
  { value: 'security', label: 'Security & research' },
  { value: 'product', label: 'Product & design' },
  { value: 'operations', label: 'Operations & partnerships' },
  { value: 'other', label: 'Other / general' },
] as const;

const highlights = [
  'Work on hardware, custody, and high-assurance Web3 systems.',
  'Small senior team - ownership across architecture, review, and delivery.',
  'Remote-friendly with clear communication and written culture.',
];

const fieldClass =
  'h-11 rounded-xl border-white/[0.12] bg-zinc-950/55 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-[#6C63FF]/35 focus-visible:border-[#6C63FF]/40';

const selectClass =
  'h-11 w-full rounded-xl border border-white/[0.12] bg-zinc-950/55 px-3 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/35 focus:border-[#6C63FF]/40';

export default function CareersPage() {
  const [submitted, setSubmitted] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const form = useForm<CareersFormValues>({
    resolver: zodResolver(careersSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      linkedIn: '',
      roleTrack: '',
      message: '',
      consent: false,
    },
  });

  useEffect(() => {
    if (submitted && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [submitted]);

  function onSubmit(_values: CareersFormValues) {
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-page text-foreground flex flex-col">
      <Header />
      <main className="flex-1 pt-28 pb-16 sm:pt-32 sm:pb-24">
        <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
          {!submitted ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="mb-12 sm:mb-16 max-w-2xl"
              >
                <p className="mb-3 font-mono text-sm text-[#00F5A0]">Careers</p>
                <h1 className="mb-4 flex flex-wrap items-baseline gap-x-2 gap-y-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                  <span>Build with</span>
                  <BoundingCornerFrame tone="brand">Glider</BoundingCornerFrame>
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  We hire deliberately for security-minded builders. Tell us how you work - experience, stack, and
                  what you want to ship next.
                </p>
              </motion.div>

              <div className="grid gap-10 lg:gap-14 lg:grid-cols-12 items-start">
                <motion.aside
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.08 }}
                  className="lg:col-span-5 space-y-6"
                >
                  <div className="rounded-2xl border border-white/[0.09] bg-zinc-950/40 p-6 sm:p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md">
                    <div className="mb-4 inline-flex rounded-xl border border-white/[0.1] bg-black/30 p-3 text-[#6C63FF]">
                      <Briefcase className="h-6 w-6" aria-hidden />
                    </div>
                    <h2 className="font-display text-lg font-semibold text-white mb-3">Why join</h2>
                    <ul className="space-y-3 text-sm text-zinc-400 leading-relaxed">
                      {highlights.map((line) => (
                        <li key={line} className="flex gap-2">
                          <Sparkles className="h-4 w-4 shrink-0 text-[#00F5A0]/80 mt-0.5" aria-hidden />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-xs text-zinc-500 font-mono leading-relaxed">
                    Glider is an equal opportunity employer. We review every application; no automated keyword gates.
                  </p>
                </motion.aside>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.12 }}
                  className="lg:col-span-7"
                >
                  <div className="relative rounded-2xl border border-white/[0.1] bg-zinc-950/50 p-6 sm:p-8 md:p-10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04),0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                    <div
                      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
                      aria-hidden
                    />
                    <h2 className="font-display text-xl font-semibold text-white mb-1">Application</h2>
                    <p className="text-sm text-zinc-400 mb-8">
                      All fields marked with <span className="text-[#00F5A0]">*</span> are required.
                    </p>

                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid gap-6 sm:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-zinc-300">
                                  Full name <span className="text-[#00F5A0]">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input placeholder="Ada Lovelace" className={fieldClass} {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-zinc-300">
                                  Email <span className="text-[#00F5A0]">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="email"
                                    placeholder="you@domain.com"
                                    autoComplete="email"
                                    className={fieldClass}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-zinc-300">Phone (optional)</FormLabel>
                                <FormControl>
                                  <Input type="tel" placeholder="+1 …" className={fieldClass} {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="linkedIn"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-zinc-300">LinkedIn or site (optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="https://…" className={fieldClass} {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="roleTrack"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-zinc-300">
                                Primary interest <span className="text-[#00F5A0]">*</span>
                              </FormLabel>
                              <FormControl>
                                <select className={selectClass} {...field}>
                                  {roleOptions.map((opt) => (
                                    <option key={opt.value || 'empty'} value={opt.value} disabled={opt.value === ''}>
                                      {opt.label}
                                    </option>
                                  ))}
                                </select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-zinc-300">
                                Background &amp; motivation <span className="text-[#00F5A0]">*</span>
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Roles you have held, notable work, stack, and what you want to do at Glider."
                                  rows={6}
                                  className={`min-h-[140px] rounded-xl border-white/[0.12] bg-zinc-950/55 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-[#6C63FF]/35 resize-y`}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="consent"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start gap-3 space-y-0 rounded-xl border border-white/[0.08] bg-black/20 p-4">
                              <FormControl>
                                <input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={(e) => field.onChange(e.target.checked)}
                                  onBlur={field.onBlur}
                                  ref={field.ref}
                                  className="mt-1 h-4 w-4 shrink-0 rounded border-white/20 bg-zinc-950 text-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/40"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="text-sm font-normal text-zinc-300 cursor-pointer">
                                  I confirm the information is accurate and I agree to Glider processing this
                                  application data. <span className="text-[#00F5A0]">*</span>
                                </FormLabel>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          className="w-full sm:w-auto h-11 rounded-full bg-[#6C63FF] hover:bg-[#5a52e6] px-10 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
                        >
                          Submit application
                        </Button>
                      </form>
                    </Form>
                  </div>
                </motion.div>
              </div>
            </>
          ) : (
            <motion.div
              ref={resultRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-lg pt-4 text-center"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.12] bg-white/[0.04] shadow-[0_0_40px_rgba(108,99,255,0.12)]">
                <Construction className="h-8 w-8 text-[#6C63FF]" aria-hidden />
              </div>
              <p className="font-mono text-sm text-[#00F5A0] mb-2">Application received</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">Portal under maintenance</h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                Our careers inbox is being migrated. We could not store your submission in the live pipeline yet. Please
                send your profile and the same details directly to operations - we still read every message.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mb-10">
                <a
                  href={`mailto:${OPERATIONS_EMAIL}?subject=Careers%20application`}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#6C63FF] hover:bg-[#5a52e6] px-8 text-sm font-semibold text-white transition-colors"
                >
                  <Mail className="h-4 w-4" aria-hidden />
                  Email {OPERATIONS_EMAIL}
                </a>
                <Link
                  href="/"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-white/[0.14] bg-white/[0.06] px-8 text-sm font-semibold text-white hover:bg-white/[0.1] transition-colors"
                >
                  Back to home
                </Link>
              </div>
              <p className="text-xs text-zinc-500 font-mono">Thank you for your interest in Glider.</p>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
