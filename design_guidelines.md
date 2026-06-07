# Glider Design Guidelines

## Design Approach
**Reference-Based Futuristic Web3 Interface** - Drawing inspiration from cutting-edge Web3 platforms and crypto applications with emphasis on glassmorphism, fluid animations, and decentralized network aesthetics.

## Core Visual Identity

**Typography**
- Primary: Modern sans-serif (Inter, Space Grotesk, or similar)
- Headings: Bold weights (700-800) for impact
- Body: Regular (400-500) for readability
- Hierarchy: Hero (text-5xl to text-7xl), Section Headers (text-4xl to text-5xl), Body (text-lg to text-xl), Supporting (text-base)

**Layout System**
- Spacing: Tailwind units of 4, 8, 12, 16, 20, 24, 32 (p-4, h-8, m-12, py-16, etc.)
- Single-page scroll with full-viewport sections
- Smooth scroll behavior with scroll-snap optional for section anchoring
- Max-width container: max-w-7xl for content, full-width for immersive sections

**Glassmorphism Treatment**
- Background: Dark base (#0a0a0f to #1a1a2e gradient)
- Glass panels: backdrop-blur-xl with bg-white/5 to bg-white/10
- Borders: Soft neon edges using border with cyan/violet/blue at 20-30% opacity
- Shadows: Multiple layered shadows for depth

## Component Architecture

**Header (Sticky)**
- Logo left, navigation center (smooth scroll links to sections), glowing App button right
- Transparent initially, gains backdrop-blur and bg-black/20 on scroll
- Height: h-20, padding: px-8

**Hero Section**
- Full viewport (min-h-screen)
- Animated decentralized network background (Canvas/WebGL implementation with glowing nodes and flowing connection lines)
- Headline: "Glider — Own Your Network, Power Your World."
- Subtext: "A decentralized social layer combining crypto messaging, multi-chain wallet, secure workspace, and AI collaboration."
- Two CTAs: "Explore Glider" (scroll anchor) + "App" (external link to app.glider.world)
- Dark gradient background with particle effects

**Feature Sections (SocialFi, Messaging, Wallet, Workifi, AI Hub)**
- Each section: py-24 to py-32 spacing
- Split layouts: 50/50 text and visual content
- Interactive animated visuals specific to each feature
- Glass cards with soft glow effects
- SocialFi: Connected avatars with flowing lines animation
- Messaging: Chat UI with messages transforming to glowing coins
- Wallet: Multi-chain assets in orbital motion, blockchain logos (Solana, Ethereum, Polygon) connected by glowing lines
- Workifi: Lighter tone, minimal encrypted workspace screens
- AI Hub: Digital brain visual with gradient lighting, scroll-responsive

**Tech + Trust Section**
- Icon grid: 3 columns on desktop, single on mobile
- Icons: Encryption, IPFS, On-chain Identity
- Minimal, clean design with subtle glow on icons
- Glass card backgrounds

**Investor Section**
- Brighter visuals with gradient accents
- Heading: "Glider is actively raising funds — join our mission."
- Contact form: Name, Email, Message fields in glassmorphic cards
- Submit button with glow effect
- Supporting text about partnerships

**Footer**
- Three-column grid: Community links (Discord, X, GitHub) | Copyright (Goodluck Technologies) | Tagline
- "Built decentralized. Powered by Glider."
- Social icons with hover glow effects
- bg-black/40 with backdrop-blur

## Animation Strategy

**Scroll-Triggered Animations**
- Fade-in with slight y-translate on section entry
- Continuous subtle motion on network lines, particles, and glow effects
- Message-to-coin transformation in Messaging section
- Orbital motion for Wallet assets
- AI brain particles forming/dispersing

**Interactive Elements**
- Buttons: Soft glow on hover, scale slightly (scale-105)
- Cards: Lift effect with increased glow and shadow
- Network lines: Pulse and flow animations
- Minimal, purposeful animations - avoid distraction

## Color Palette

**Primary Accents**
- Neon Blue: #00d4ff, #0099ff
- Neon Violet: #a855f7, #7c3aed
- Cyan: #06b6d4

**Backgrounds**
- Deep Dark: #0a0a0f, #0f0f1a
- Dark Gradient: #1a1a2e to #0a0a0f
- Glass overlay: white/5 to white/10

**Text**
- Primary: white (#ffffff)
- Secondary: gray-300 (#d1d5db)
- Accents: Match neon colors for CTAs

## Images
- Hero: Animated Canvas/WebGL network visualization (no static image)
- Feature sections: UI mockups, interface screenshots for Messaging, Wallet, Workifi
- AI Hub: Abstract gradient brain visualization
- All images should have glassmorphic treatment where appropriate

## Accessibility & Polish
- Smooth scroll-behavior
- Focus states with neon glow
- Sufficient contrast for text on glass backgrounds
- Form validation states with subtle color shifts
- Loading states with particle effects

**Overall Feel**: Cinematic, fluid, futuristic - each scroll reveals motion (flying messages, glowing tokens, forming particles). Dark glass aesthetic with crisp typography and neon accents throughout. Emphasis on control, innovation, and privacy as core brand values.