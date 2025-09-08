# The Collective by Thompson & Co Website

## Overview

The Collective by Thompson & Co is a sophisticated marketing website for a boutique consultancy providing modern solutions for employer branding, recruitment marketing, and AI-driven marketing automation. The website features an elevated modern interactive design with dynamic gradients, sophisticated animations, and is optimized for performance, SEO, and accessibility.

## Recent Changes (December 2024)

- ✓ **Major Brand Evolution**: Transformed from "Thompson & Co. Collective" to "The Collective by Thompson & Co" with new tagline "Modern Solutions for a Dynamic World"
- ✓ **Advanced Visual Design**: Implemented vibrant gradient color system (pink/magenta to teal) with dynamic backgrounds and interactive elements
- ✓ **Premium Animations**: Added sophisticated micro-animations, hover effects, floating elements, shimmer text effects, and scroll-triggered animations
- ✓ **Blog Architecture**: Replaced insights section with comprehensive blog system featuring search, filtering, and individual post pages for enhanced SEO
- ✓ **Service Refinement**: Removed Fractional CMO service, focusing on three core offerings: AI Marketing & Automation, Employer Branding & Talent Marketing, Executive Branding
- ✓ **Modern UI Components**: Elevated all components with gradient cards, glassmorphism effects, magnetic buttons, and advanced interactive elements
- ✓ **SEO Enhancement**: Updated all meta tags, schema markup, and sitemap for improved search engine optimization

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application uses a modern React-based single-page application (SPA) architecture built with:
- **React 18 + TypeScript** for type-safe component development
- **Vite** as the build tool and development server for optimal performance
- **wouter** for lightweight client-side routing instead of React Router
- **Tailwind CSS** with custom design system for styling
- **shadcn/ui** components for consistent UI elements

### Content Management Strategy
The system implements a "CMS-lite" approach using JSON files for content management:
- Static content stored in `/client/src/data/` directory
- Separate JSON files for services, case studies, testimonials, insights, and stats
- This allows non-technical users to update content without code changes
- Content is imported directly into React components for fast loading

### Design System Implementation
The website uses a custom design system built on Tailwind CSS:
- **Brand Colors**: Charcoal (#1F1F1F), Slate Blue-Grey (#4A5A6A), Soft Ivory (#F6F1EB), Rose-Gold (#B76E79), Deep Navy (#0B1C2C)
- **Typography**: Playfair Display (serif) for headings, Montserrat (sans-serif) for body text
- **CSS Variables**: Custom properties defined for consistent theming
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts

### Performance Optimization
- **Static Site Generation**: Optimized build process for Core Web Vitals
- **Asset Optimization**: Font preloading and efficient resource loading
- **Code Splitting**: Vite's built-in optimization for bundle size reduction
- **Image Handling**: Prepared for optimized asset serving

### SEO and Accessibility Architecture
- **SEO Utilities**: Custom SEO helper functions for dynamic meta tag management
- **Structured Data**: Schema.org markup for Organization, Service, and Article types
- **OpenGraph/Twitter Cards**: Social media optimization
- **WCAG AA Compliance**: Semantic HTML, proper landmarks, skip links, and color contrast
- **Sitemap and Robots.txt**: Search engine optimization files

### Form Handling Strategy
The system uses a dual approach for form submissions:
- **Client-side Validation**: React Hook Form with Zod schema validation
- **External Form Service**: Formspree integration for form processing
- **Environment Configuration**: Configurable endpoints via environment variables
- **Success/Error States**: Toast notifications for user feedback

### Database Layer (Prepared)
The application includes Drizzle ORM setup for future database integration:
- **PostgreSQL**: Configured for Neon Database or similar services
- **Schema Management**: Type-safe database operations with Drizzle
- **Migration Support**: Database versioning and schema updates
- **Environment-based Configuration**: Flexible database connection setup

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, TypeScript, Vite for modern development
- **UI Framework**: Radix UI components via shadcn/ui for accessible components
- **Styling**: Tailwind CSS with PostCSS for utility-first styling
- **Routing**: wouter for lightweight client-side navigation

### Form and Validation Services
- **Form Handling**: React Hook Form for performant form management
- **Validation**: Zod for runtime type validation and schema definition
- **Form Processing**: Formspree integration for serverless form submissions

### Database and ORM
- **Database**: Neon Database (PostgreSQL-compatible serverless database)
- **ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Connection**: @neondatabase/serverless for optimized database connections

### Analytics and Tracking (Prepared)
- **Google Analytics 4**: Environment-configurable tracking setup
- **Meta Pixel**: Facebook/Instagram advertising pixel integration
- **Privacy-Compliant**: Cookie consent and tracking preference management

### Development and Build Tools
- **Build System**: Vite with React plugin and TypeScript support
- **Code Quality**: ESLint and TypeScript for code consistency
- **Development**: Hot module replacement and fast refresh for development experience
- **Replit Integration**: Specialized plugins for Replit development environment

### External Integrations (Planned)
- **Calendly**: Appointment scheduling widget integration
- **Font Services**: Google Fonts for Playfair Display and Montserrat typography
- **CDN**: Prepared for asset delivery optimization