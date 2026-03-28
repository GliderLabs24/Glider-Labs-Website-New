export const DOC_SLUGS = [
  'overview',
  'crypto-smart-watch',
  'defi-infrastructure',
  'ai-web3',
  'security-infrastructure',
  'crypto-forensics',
  'about-glider',
  'engagements',
  'terms',
  'privacy',
] as const;

export type DocSlug = (typeof DOC_SLUGS)[number];

export const isDocSlug = (s: string): s is DocSlug =>
  (DOC_SLUGS as readonly string[]).includes(s);

export type DocNavItem = {
  slug: DocSlug;
  label: string;
  title: string;
  description?: string;
  eyebrow?: string;
};

export const DOCS_NAV: DocNavItem[] = [
  {
    slug: 'overview',
    label: 'Overview',
    title: 'Overview',
    description: 'Practice areas, how to use this documentation, and what to expect from engagements.',
  },
  {
    slug: 'crypto-smart-watch',
    label: 'Crypto smart watch',
    title: 'Crypto smart watch',
    eyebrow: 'Solana-oriented cold wallet wearable · R&D',
    description: 'Wearable signing, payments, NFC, storage, and research directions.',
  },
  {
    slug: 'defi-infrastructure',
    label: 'DeFi infrastructure',
    title: 'DeFi infrastructure',
    description: 'Treasury dependency mapping, monitoring, and launch hardening.',
  },
  {
    slug: 'ai-web3',
    label: 'AI for Web3',
    title: 'AI for Web3',
    description: 'Human-in-the-loop automation, logging, and low–false-positive operations.',
  },
  {
    slug: 'security-infrastructure',
    label: 'Security infrastructure',
    title: 'Security infrastructure',
    description: 'Nodes, keys, CI/CD, observability, and incident readiness.',
  },
  {
    slug: 'crypto-forensics',
    label: 'Crypto forensics',
    title: 'Crypto forensics',
    description: 'Trace, analysis, and documentation for legal and compliance workflows.',
  },
  {
    slug: 'about-glider',
    label: 'About Glider',
    title: 'About Glider',
    description: 'Mission, geography, and how we work with regulated operators.',
  },
  {
    slug: 'engagements',
    label: 'Engagements & contact',
    title: 'Engagements & contact',
    description: 'How to start a conversation, proposals, and response times.',
  },
  {
    slug: 'terms',
    label: 'Terms of use',
    title: 'Terms of use',
    description: 'Site use, IP, and how this relates to signed service agreements.',
  },
  {
    slug: 'privacy',
    label: 'Privacy',
    title: 'Privacy',
    description: 'What we collect, processors, retention, and your rights.',
  },
];

/** Index before "Company & legal" subgroup in sidebar */
export const DOCS_NAV_LEGAL_START_INDEX = 7;

export function getDocMeta(slug: DocSlug): DocNavItem {
  const found = DOCS_NAV.find((n) => n.slug === slug);
  if (!found) return DOCS_NAV[0];
  return found;
}
