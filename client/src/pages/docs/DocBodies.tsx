import type { ReactNode } from 'react';
import { Link } from 'wouter';
import type { DocSlug } from './constants';
import { SectionHeading } from './SectionHeading';

const prose = 'space-y-4 text-muted-foreground leading-relaxed text-[15px] sm:text-base';
const proseWide = 'space-y-5 text-muted-foreground leading-relaxed text-[15px] sm:text-base';

function OverviewBody() {
  return (
    <div className={prose}>
      <p>
        Glider Web3 Solutions is a security-first practice spanning wearable custody, DeFi and treasury exposure,
        AI-assisted operations, baseline infrastructure hardening, and forensic-grade chain investigations. We work
        with protocols, funds, family offices, and regulated entities that need disciplined engineering and defensible
        documentation—not slide-deck promises.
      </p>
      <p>
        Each topic in the sidebar opens its own page. This is not a substitute for a signed statement of work;
        specifications, timelines, and warranties are defined per engagement.
      </p>
      <SectionHeading>Practice tracks</SectionHeading>
      <ul className="list-disc pl-5 space-y-2 text-zinc-400">
        <li>
          <span className="text-zinc-300">Hardware track:</span> wearable-first cold-oriented signing and awareness, with
          Solana as a primary design center.
        </li>
        <li>
          <span className="text-zinc-300">Protocol &amp; treasury track:</span> DeFi risk surfaces, monitoring, and
          integration hardening.
        </li>
        <li>
          <span className="text-zinc-300">Automation track:</span> model-assisted triage with human review and
          audit-friendly logs.
        </li>
        <li>
          <span className="text-zinc-300">Assurance track:</span> infrastructure reviews, incident readiness, and crypto
          forensics for legal and compliance workflows.
        </li>
      </ul>
    </div>
  );
}

function CryptoSmartWatchBody() {
  return (
    <div className={proseWide}>
      <p>
        The Glider crypto smart watch program explores a wearable that behaves as a{' '}
        <strong className="text-zinc-200 font-semibold">cold-oriented signing device</strong> for the Solana ecosystem:
        keys and high-value authorizations are designed to stay off general-purpose phone OS surfaces, while the watch
        provides presence, intent, and limited UI for payments and policy-bound actions.
      </p>
      <SectionHeading>Security posture</SectionHeading>
      <p>
        We assume hostile phones, compromised browsers, and phishing as the default environment. The reference
        architecture separates <strong className="text-zinc-200 font-semibold">signing core</strong> (constrained
        firmware, minimal attack surface) from{' '}
        <strong className="text-zinc-200 font-semibold">companion flows</strong> that may run on less trusted devices.
        Pairing, firmware updates, and backup/recovery are treated as high-risk workflows and are designed with explicit
        user confirmation, rate limits, and rollback paths.
      </p>
      <SectionHeading>Payments &amp; signing</SectionHeading>
      <p>
        On-device UX targets{' '}
        <strong className="text-zinc-200 font-semibold">human-readable summaries</strong> of what is being approved:
        recipient, asset, amount, program IDs where applicable, and fee impact. Low-value, policy-approved spends can
        follow streamlined paths; high-value or novel contracts trigger stronger step-up rules. The goal is to reduce
        &ldquo;blind signing&rdquo; fatigue without hiding material risk.
      </p>
      <SectionHeading>NFC and physical interfaces</SectionHeading>
      <p>
        NFC is evaluated for <strong className="text-zinc-200 font-semibold">tap-to-verify</strong> and selective
        pairing: for example, confirming a physical counterparty, attesting proximity for multi-factor flows, or
        exchanging encrypted setup data in controlled retail and event scenarios. NFC is never the sole root of trust;
        it augments a broader threat model that includes theft, relay, and social engineering.
      </p>
      <SectionHeading>Storage &amp; recovery</SectionHeading>
      <p>
        Key material is designed for <strong className="text-zinc-200 font-semibold">hardware-backed isolation</strong>{' '}
        where the platform allows, with encrypted backups and social or institutional recovery options configurable to
        enterprise policy. We document failure modes (loss, theft, coercion) and map them to recovery tiers clients can
        adopt or reject explicitly.
      </p>
      <SectionHeading>Research &amp; development</SectionHeading>
      <p>
        Active R&amp;D threads include side-channel resistance on constrained MCUs, formalizing signing policies as
        executable rules, usability studies with non-custodial and small-team treasuries, and publication-oriented notes
        on Solana transaction anatomy for secure display. We collaborate with design partners under NDA; public
        disclosures follow coordinated release when IP and safety allow.
      </p>
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 text-sm text-zinc-400 mt-6">
        <strong className="text-zinc-300">Note:</strong> The smart watch is under active development. Capabilities
        described here are directional; pilots are subject to hardware availability, regulatory context, and contractual
        scope.
      </div>
    </div>
  );
}

function DefiBody() {
  return (
    <div className={proseWide}>
      <p>
        Glider&apos;s DeFi work is not &ldquo;integration for integration&apos;s sake.&rdquo; We map how liquidity,
        governance, bridges, and oracles jointly stress a treasury—often before a single extra market is turned on.
        Our diagrams treat <strong className="text-zinc-200 font-semibold">dependency graphs</strong> as first-class:
        which pools, routers, validators, and price feeds must stay healthy for a position to remain solvent and honest.
      </p>
      <SectionHeading>Monitoring &amp; operations</SectionHeading>
      <p>
        We build <strong className="text-zinc-200 font-semibold">correlation-aware monitoring</strong>: depth changes,
        borrow utilization, bridge inflows, and oracle deviation windows are tied into composite signals so operators see
        second-order effects (e.g., shallow liquidity + oracle lag) rather than isolated alerts. Runbooks specify who
        acts, what on-chain levers exist, and what is explicitly out of scope for automation.
      </p>
      <SectionHeading>Launch &amp; upgrade hardening</SectionHeading>
      <p>
        For builders, we help harden new launches: parameter choices, timelocks, guardian roles, and upgrade paths are
        reviewed against both attacker models and operational reality (key ceremonies, multisig fatigue, incident sleep
        schedules). Deliverables typically include threat models, integration checklists, and dashboard specifications
        your team can own or we can co-operate under retainer.
      </p>
    </div>
  );
}

function AiWeb3Body() {
  return (
    <div className={proseWide}>
      <p>
        We use AI as <strong className="text-zinc-200 font-semibold">decision support</strong>, not as an oracle of
        truth. Models may summarize diffs, cluster anomalies, or suggest triage queues; humans approve material actions.
        Every assisted workflow is designed to emit{' '}
        <strong className="text-zinc-200 font-semibold">structured, attributable logs</strong> suitable for internal audit
        and, where needed, external review.
      </p>
      <SectionHeading>Operations philosophy</SectionHeading>
      <p>
        Uniquely for Glider, we bias toward{' '}
        <strong className="text-zinc-200 font-semibold">low false-positive</strong> pipelines over maximal recall: noisy
        alerts burn trust faster than rare misses in many treasury settings. We document model versions, training data
        boundaries, and known failure modes (e.g., adversarial prompts against internal tools, schema drift on new chain
        upgrades).
      </p>
      <SectionHeading>Smart contracts &amp; orchestration</SectionHeading>
      <p>
        For smart contracts and orchestration layers, we pair static analysis with model-assisted narrative explanations
        so reviewers spend time on judgment calls, not grep. Where clients allow, we benchmark assisted review against
        historical incidents to quantify time-to-understanding—not vanity accuracy scores.
      </p>
    </div>
  );
}

function SecurityInfraBody() {
  return (
    <div className={proseWide}>
      <p>
        This line covers the <strong className="text-zinc-200 font-semibold">foundational layer</strong>: node and RPC
        posture, key management integrations, CI/CD secrets, observability, and incident response playbooks. We
        translate chain-specific quirks (reorgs, mempool behavior, fee markets) into operational SLOs your SRE and
        security teams can run against.
      </p>
      <SectionHeading>Engagement shape</SectionHeading>
      <p>
        Engagements often start with an architecture review and table-top exercises, then move to concrete controls: HSM
        or MPC boundaries, policy engines, rate limits, break-glass procedures, and evidence retention aligned to your
        counsel&apos;s expectations. We stay technology-agnostic on vendors but opinionated on{' '}
        <strong className="text-zinc-200 font-semibold">separation of duties</strong> and measurable readiness.
      </p>
    </div>
  );
}

function ForensicsBody() {
  return (
    <div className={proseWide}>
      <p>
        Glider supports{' '}
        <strong className="text-zinc-200 font-semibold">trace, analysis, and documentation</strong> for disputes,
        internal investigations, and regulatory inquiries. We chain together on-chain attribution heuristics,
        counterparty clustering, and timeline reconstruction while preserving provenance for counsel.
      </p>
      <SectionHeading>Deliverables</SectionHeading>
      <p>
        Deliverables emphasize{' '}
        <strong className="text-zinc-200 font-semibold">court- and regulator-ready</strong> clarity: what is known, what
        is inferred, and what would change conclusions if new data appears. We do not guarantee asset recovery; we
        improve the evidentiary foundation for whatever legal or commercial path you pursue.
      </p>
    </div>
  );
}

function AboutGliderBody() {
  return (
    <div className={proseWide}>
      <p>
        Glider is built in India with a global client footprint. We combine hardware discipline, protocol depth, and
        forensic rigor in one practice—unusual in a market that often sells point tools or generic audits. Our bias is
        toward <strong className="text-zinc-200 font-semibold">evidence, repeatability, and plain language</strong> for
        executives and technical teams alike.
      </p>
      <SectionHeading>Regulated &amp; institutional work</SectionHeading>
      <p>
        We engage seriously with regulated and institutional operators: custody policy, vendor due diligence, and
        cross-border data handling are part of normal scoping—not afterthoughts. The public site and this documentation
        reflect our current positioning; detailed credentials and references are shared under NDA when appropriate.
      </p>
    </div>
  );
}

function EngagementsBody() {
  return (
    <div className={prose}>
      <p>
        Start with a confidential scoping discussion. We produce a written proposal covering objectives, milestones,
        deliverables, assumptions, and fees. Larger programs may sequence Assess → Build → Secure across quarters;
        smaller asks may be time-boxed reviews or incident support.
      </p>
      <p>
        Book time via the site&apos;s Cal.com link from the home CTA, or email{' '}
        <a href="mailto:operations@glider.world" className="text-[#6C63FF] hover:text-[#8B7CFF]">
          operations@glider.world
        </a>{' '}
        with organization, chains involved, and urgency. We aim to respond within two business days for qualified
        inquiries.
      </p>
      <p>
        <Link href="/" className="text-[#00F5A0] hover:underline">
          ← Back to marketing site
        </Link>
        {' · '}
        <Link href="/cookies" className="text-[#00F5A0] hover:underline">
          Cookie policy
        </Link>
      </p>
    </div>
  );
}

function TermsBody() {
  return (
    <div className={prose}>
      <p className="text-sm text-zinc-500">
        Last updated March 2026. This summary is for orientation only and does not replace executed contracts.
      </p>
      <p>
        By using this website and documentation, you agree not to misuse hosted materials (no scraping, reverse
        engineering, or attempts to compromise our or others&apos; systems). Content is provided &ldquo;as is&rdquo; for
        information; we may update or remove pages without notice.
      </p>
      <SectionHeading>Professional services</SectionHeading>
      <p>
        Professional services are governed solely by{' '}
        <strong className="text-zinc-200 font-semibold">signed agreements</strong> (SOWs, MSAs, NDAs). Nothing here
        grants a license to our IP except as explicitly stated in those documents. Limitation of liability, indemnities,
        and dispute resolution are defined there, not on this page.
      </p>
      <p>
        For governing law and venue on services, refer to your contract with Glider Web3 Solutions or its contracting
        entity as named on invoices and signatures.
      </p>
    </div>
  );
}

function PrivacyBody() {
  return (
    <div className={prose}>
      <p className="text-sm text-zinc-500">Last updated March 2026.</p>
      <p>
        We collect information you submit voluntarily (for example, contact forms, email, call scheduling) and
        technical data typical of websites (logs, approximate location from IP, device and browser metadata). We use
        this to respond to inquiries, secure our services, and improve usability.
      </p>
      <SectionHeading>Processors &amp; rights</SectionHeading>
      <p>
        We do not sell your personal data. Processors (e.g., email, analytics, hosting) are chosen for security posture
        and contracted where required. Retention follows operational need and legal obligations; you may request access,
        correction, or deletion where applicable by contacting{' '}
        <a href="mailto:operations@glider.world" className="text-[#6C63FF] hover:text-[#8B7CFF]">
          operations@glider.world
        </a>
        .
      </p>
      <p>
        Cookies and similar technologies are described in our{' '}
        <Link href="/cookies" className="text-[#6C63FF] hover:text-[#8B7CFF]">
          Cookie policy
        </Link>
        . Engagement-related data may be subject to stricter handling under your NDA or DPA; this section applies to
        general site use unless superseded by those instruments.
      </p>
    </div>
  );
}

const BODIES: Record<DocSlug, ReactNode> = {
  overview: <OverviewBody />,
  'crypto-smart-watch': <CryptoSmartWatchBody />,
  'defi-infrastructure': <DefiBody />,
  'ai-web3': <AiWeb3Body />,
  'security-infrastructure': <SecurityInfraBody />,
  'crypto-forensics': <ForensicsBody />,
  'about-glider': <AboutGliderBody />,
  engagements: <EngagementsBody />,
  terms: <TermsBody />,
  privacy: <PrivacyBody />,
};

export function DocBody({ slug }: { slug: DocSlug }) {
  return BODIES[slug];
}
