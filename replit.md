# Glider - Decentralized Social & Productivity Platform

## Overview

Glider is a next-generation Web3 single-page website showcasing a decentralized social and productivity platform. The project combines futuristic design with Web3 principles, featuring glassmorphism effects, animated network visualizations, and sections highlighting SocialFi, crypto messaging, multi-chain wallet, secure workspace (Workifi), and AI collaboration features.

The application is built as a marketing/landing page to communicate Glider's vision of user-owned networks, decentralized identity, and privacy-first collaboration tools. It includes an investor contact form for fundraising inquiries.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Tooling**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server for fast HMR and optimized builds
- **Wouter** for lightweight client-side routing (single-page application)
- **TanStack Query (React Query)** for server state management and API calls

**UI Component System**
- **shadcn/ui** component library (New York style variant) built on Radix UI primitives
- **Tailwind CSS** for utility-first styling with custom design tokens
- **Framer Motion** for declarative animations and scroll-based interactions
- Component path aliases configured: `@/components`, `@/lib`, `@/hooks`

**Design System**
- Dark-first futuristic theme with glassmorphism effects
- Custom CSS variables for colors, spacing, and elevation levels
- Typography: Space Grotesk, Space Mono, and Inter fonts
- Glass panel effects using `backdrop-blur` with semi-transparent backgrounds
- Neon accent colors (cyan/primary, violet/secondary) with soft glows
- Responsive spacing using Tailwind's scale (4, 8, 12, 16, 20, 24, 32)

**Animation Strategy**
- Canvas-based network visualization in hero section (WebGL/Canvas API)
- Scroll-triggered animations using Framer Motion's `useInView` hook
- Particle effects and orbital motion for feature demonstrations
- Smooth scroll behavior with section anchoring

### Backend Architecture

**Server Framework**
- **Express.js** on Node.js with TypeScript
- Custom Vite integration for SSR and middleware mode during development
- Production build uses esbuild for server bundling

**API Design**
- RESTful endpoints under `/api` prefix
- Contact form submission: `POST /api/contact`
- Admin contacts list: `GET /api/contacts`
- JSON request/response format with validation

**Data Validation**
- **Zod** schemas for runtime type checking and validation
- Integration with Drizzle ORM schema via `drizzle-zod`
- Frontend form validation using React Hook Form with Zod resolver

### Data Storage

**Database Strategy**
- **PostgreSQL** configured via Drizzle ORM
- Neon serverless database driver (`@neondatabase/serverless`)
- Schema-first approach with TypeScript types generated from Drizzle schema
- In-memory storage fallback (`MemStorage` class) for development/testing

**Database Schema**
- `users` table: Basic user authentication (id, username, password)
- `contacts` table: Investor inquiry submissions (id, name, email, message, createdAt)
- UUID primary keys using PostgreSQL's `gen_random_uuid()`
- Timestamps with `defaultNow()` for audit trails

**ORM Configuration**
- Schema location: `shared/schema.ts`
- Migration output: `./migrations`
- Push-based deployment: `npm run db:push`

### External Dependencies

**UI Component Libraries**
- **Radix UI** primitives (20+ components): Provides accessible, unstyled components for dialogs, dropdowns, navigation, tooltips, etc.
- **embla-carousel-react**: Touch-friendly carousel component
- **cmdk**: Command palette component
- **lucide-react**: Icon library for consistent iconography
- **react-icons**: Additional icons (SiSolana, SiEthereum, SiPolygon for blockchain logos)

**Form Management**
- **react-hook-form**: Performant form state management
- **@hookform/resolvers**: Integration layer for Zod validation

**Styling & Utilities**
- **class-variance-authority**: Type-safe variant management for components
- **clsx** + **tailwind-merge**: Conditional class merging utility
- **date-fns**: Date formatting and manipulation

**Development Tools**
- **@replit/vite-plugin-runtime-error-modal**: Error overlay for Replit environment
- **@replit/vite-plugin-cartographer**: Development navigation
- **@replit/vite-plugin-dev-banner**: Environment indicator

**Database & Sessions**
- **drizzle-orm**: Type-safe SQL query builder
- **connect-pg-simple**: PostgreSQL session store for Express (not currently implemented but available)

**Key Design Decisions**
- Single-page architecture eliminates page reloads for smooth, app-like experience
- Glass panels and backdrop blur create depth without heavy visual elements
- Canvas animations provide dynamic, living background that reinforces decentralization theme
- Form-based investor contact system allows direct engagement without complex CRM integration
- Shared schema between client and server ensures type safety across full stack