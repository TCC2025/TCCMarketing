import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import type {
  Stat as StatType,
  Testimonial as TestimonialType,
} from "@shared/schema";
import { seoData } from "@/lib/seo";
import { useSEO } from "@/hooks/useSEO";
import { StructuredData } from "@/components/seo/StructuredData";
import { createOrganizationStructuredData } from "@/lib/seo";
import { trackFormSubmission } from "@/lib/analytics";

// Responsive gradient span so all 5 color stops remain visible
function useGradientSpan() {
  const [x2, setX2] = useState(1200);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const span = w >= 1440 ? 1400 : w >= 1024 ? 1200 : w >= 640 ? 1100 : 900;
      setX2(span);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return x2;
}

export default function Home() {
  const gradientX2 = useGradientSpan();
  const [email, setEmail] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false);
  const { toast } = useToast();

  // SEO
  useSEO({
    ...seoData.home,
    canonicalUrl: "/",
    type: "website",
  });

  // Fetch data
  const { data: statsData = [] } = useQuery<StatType[]>({
    queryKey: ["/api/stats"],
  });
  const { data: testimonialsData = [] } = useQuery<TestimonialType[]>({
    queryKey: ["/api/testimonials"],
  });

  const handleLeadMagnetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          formType: "lead_magnet",
          resource: "Talent Marketing Blueprint 2025",
        }),
      });

      if (!response.ok) throw new Error("Form submission failed");

      trackFormSubmission("blueprint_download", "hero_section");
      toast({
        title: "Success!",
        description: "Your blueprint is on its way. Check your email shortly.",
      });
      setEmail("");
    } catch {
      toast({
        title: "Error",
        description:
          "There was a problem downloading the blueprint. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;

    setIsNewsletterSubmitting(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: newsletterEmail,
          formType: "newsletter",
        }),
      });

      if (!response.ok) throw new Error("Newsletter subscription failed");

      trackFormSubmission("newsletter_signup", "footer");
      toast({ title: "Subscribed!", description: "You're now on the list." });
      setNewsletterEmail("");
    } catch {
      toast({
        title: "Error",
        description: "There was a problem subscribing. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsNewsletterSubmitting(false);
    }
  };

  return (
    <>
      {/* SEO Structured Data */}
      <StructuredData
        data={createOrganizationStructuredData()}
        id="organization-schema"
      />

      {/* Hero Section */}
      <section className="hero" id="home" aria-label="Homepage hero">
        <div className="container">
          <p className="hero__eyebrow">
            Enterprise-Grade Strategy, Human-Centered Growth
          </p>

          <h1 className="hero__title">
            <span>Cut Through the Noise.</span>
            <br />
            <span className="hero__title--teal">Grow With Clarity.</span>
          </h1>

          <p className="hero__subhead">
            Your brand doesn't have to run on reactive patchwork. We bring
            enterprise-grade strategy and AI-driven clarity to align brand
            equity, go-to-market strategy, and employer branding.
          </p>

          <div className="hero__ctas">
            <a
              className="btn btn--primary"
              href="#contact"
              data-event="cta_click"
              data-location="hero"
              data-variant="primary"
              data-label="strategy_consult"
            >
              Let's Talk Strategy
            </a>

            <a
              className="btn btn--ghost"
              href="#blueprint"
              data-event="cta_click"
              data-location="hero"
              data-variant="ghost"
              data-label="blueprint_download"
            >
              Get the Talent Marketing Blueprint
            </a>
          </div>

          <p className="hero__support microcopy">
            No pressure—30 minutes to get clarity. Conversation, not sales.
          </p>
          <p className="hero__promise">
            <em>
              Growth that's sustainable, measurable, and predictable. It's
              science.
            </em>
          </p>
        </div>

        <svg
          className="hero__art"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            {/* responsive gradient span so all 5 colors show */}
            <linearGradient
              id="tccGrad"
              x1="0"
              y1="0"
              x2="1200"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#0F2435" />
              <stop offset="22%" stopColor="#10676F" />
              <stop offset="46%" stopColor="#D89B2D" />
              <stop offset="66%" stopColor="#F07B1E" />
              <stop offset="100%" stopColor="#E7156A" />
            </linearGradient>
          </defs>

          <path
            d="M0,60 C300,20 600,100 1200,40 L1200,120 L0,120 Z"
            fill="url(#tccGrad)"
          />
        </svg>
      </section>

      {/* Services Section */}
      <section className="services" id="services">
        <div className="container">
          <p className="eyebrow">What We Do</p>
          <h2 className="services__title">Our Expertise</h2>
          <p className="services__subhead">
            Strategic marketing that pulls double duty for growth and hiring. We
            design systems, not one-offs—so brand, funnels, and automation
            compound.
          </p>

          <div className="services__grid">
            {/* Card 1 */}
            <article className="svc-card">
              <div className="svc-card__bar"></div>
              <h3 className="svc-card__title">Employer Branding & EVP</h3>
              <p className="svc-card__lede">
                Clarify the promise, proof, and story that attract the right
                talent and customers.
              </p>
              <ul className="svc-card__list">
                <li>EVP & message kit</li>
                <li>Career site & landing pages</li>
                <li>Proof library & testimonials</li>
              </ul>
              <a href="/services/employer-branding" className="svc-card__link">
                Explore this service →
              </a>
            </article>

            {/* Card 2 */}
            <article className="svc-card">
              <div className="svc-card__bar"></div>
              <h3 className="svc-card__title">
                Recruitment Marketing & Funnels
              </h3>
              <p className="svc-card__lede">
                High-signal sourcing and conversion flows that cut waste and
                reduce time-to-hire.
              </p>
              <ul className="svc-card__list">
                <li>Channel mix & media plan</li>
                <li>Funnel scorecard & CRO</li>
                <li>Analytics with guardrails</li>
              </ul>
              <a
                href="/services/recruitment-marketing"
                className="svc-card__link"
              >
                Explore this service →
              </a>
            </article>

            {/* Card 3 */}
            <article className="svc-card">
              <div className="svc-card__bar"></div>
              <h3 className="svc-card__title">
                AI-Driven Marketing & Automation
              </h3>
              <p className="svc-card__lede">
                Sequenced campaigns and workflows that scale personalization
                without adding headcount.
              </p>
              <ul className="svc-card__list">
                <li>CRM/CDP hygiene & journeys</li>
                <li>Email/SMS & lead routing</li>
                <li>Dashboards & QA governance</li>
              </ul>
              <a href="/services/ai-marketing" className="svc-card__link">
                Explore this service →
              </a>
            </article>

            {/* Card 4 */}
            <article className="svc-card">
              <div className="svc-card__bar"></div>
              <h3 className="svc-card__title">
                Fractional CMO / Growth Strategy
              </h3>
              <p className="svc-card__lede">
                Executive-level strategy and operating cadence—enterprise rigor
                without full-time overhead.
              </p>
              <ul className="svc-card__list">
                <li>90-day plan & OKRs</li>
                <li>Positioning & offer design</li>
                <li>RevOps & roadmap stewardship</li>
              </ul>
              <a href="/services/fractional-cmo" className="svc-card__link">
                Explore this service →
              </a>
            </article>
          </div>

          {/* Align360 strip */}
          <div className="process-strip" aria-label="Align360 process">
            <div className="step">
              <span>Audit</span>
              <em> see the whole system</em>
            </div>
            <div className="step">
              <span>Prioritize</span>
              <em> pick high-leverage fixes</em>
            </div>
            <div className="step">
              <span>Enable</span>
              <em> deploy, measure, compound</em>
            </div>
          </div>

          {/* Section CTA */}
          <div className="services__cta">
            <h3 className="services__cta-title">Not sure where to start?</h3>
            <p className="services__cta-sub">
              Begin with a 30-minute Strategy Consult or grab the Align360™
              Starter Kit.
            </p>
            <div className="services__cta-row">
              <a className="btn btn--primary" href="#contact">
                Start Your Strategy Consult
              </a>
              <a className="btn btn--ghost" href="#blueprint">
                Get the Starter Kit
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Align360 Framework */}
      <section className="py-20 lg:py-32 bg-secondary text-secondary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-divider mb-6 bg-accent"></div>
              <h2 className="font-playfair text-6xl md:text-7xl font-bold mb-6">
                The Align360™ Framework
              </h2>
              <p className="text-xl mb-8 leading-relaxed opacity-90">
                Our proprietary methodology that creates comprehensive alignment
                between your employer brand, candidate experience, and business
                objectives.
              </p>

              <div className="space-y-6">
                {[
                  {
                    step: "1",
                    title: "Assess",
                    description:
                      "Comprehensive audit of current employer brand positioning and candidate journey touchpoints.",
                  },
                  {
                    step: "2",
                    title: "Align",
                    description:
                      "Strategic positioning that connects your EVP with market demands and candidate expectations.",
                  },
                  {
                    step: "3",
                    title: "Activate",
                    description:
                      "Implementation across all candidate touchpoints with measurable KPIs and continuous optimization.",
                  },
                ].map((phase) => (
                  <div
                    key={phase.step}
                    className="flex items-start space-x-4"
                    data-testid={`framework-phase-${phase.step}`}
                  >
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-accent-foreground font-bold text-sm">
                        {phase.step}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        {phase.title}
                      </h3>
                      <p className="opacity-90">{phase.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-background/10 p-8 rounded-xl">
              <div className="aspect-square bg-background/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div
                    className="w-32 h-32 border-4 border-accent rounded-full flex items-center justify-center mb-4 mx-auto animate-spin"
                    style={{ animationDuration: "10s" }}
                  >
                    <span className="text-accent font-playfair text-2xl font-bold">
                      360°
                    </span>
                  </div>
                  <p className="text-accent font-semibold">
                    Alignment Framework
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section className="py-20 lg:py-32 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Client Logos */}
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl font-semibold text-primary mb-8">
              Trusted by Industry Leaders
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-muted p-6 rounded-lg flex items-center justify-center"
                >
                  <span className="font-semibold text-muted-foreground text-sm">
                    CLIENT LOGO
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {statsData.map((stat, index) => (
              <div
                key={index}
                className={`text-center slide-in-up stagger-${index + 1} group`}
              >
                <div className="font-playfair text-5xl font-bold mb-2 text-accent group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <p className="text-lg text-secondary group-hover:text-primary transition-colors duration-300">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-2 gap-8">
            {testimonialsData.slice(0, 2).map((testimonial, index) => (
              <div
                key={index}
                className={`gradient-card p-8 rounded-xl border-0 hover-lift slide-in-up stagger-${index + 1} group relative overflow-hidden`}
                data-testid={`testimonial-${testimonial.name.replace(/\s+/g, "").toLowerCase()}`}
              >
                <div className="absolute top-0 left-0 w-2 h-full gradient-button rounded-r-full"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 gradient-button rounded-full flex items-center justify-center mr-4 pulse-gradient">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary group-hover:text-accent transition-all duration-300">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                  <blockquote className="text-lg text-secondary leading-relaxed italic">
                    "{testimonial.quote}"
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Case Study */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-divider mb-6"></div>
              <span className="text-accent font-semibold uppercase tracking-wide text-sm">
                Featured Case Study
              </span>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6 mt-4">
                How We Transformed TechCorp's Talent Pipeline
              </h2>
              <p className="text-xl text-secondary mb-8 leading-relaxed">
                A comprehensive employer branding and recruitment marketing
                transformation that resulted in a 400% increase in qualified
                applications and 60% reduction in cost-per-hire.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Complete employer brand repositioning",
                  "AI-powered recruitment marketing automation",
                  "Multi-channel candidate experience optimization",
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-secondary">{item}</span>
                  </div>
                ))}
              </div>

              <Link href="/case-studies">
                <Button
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                  data-testid="button-read-case-study"
                >
                  Read Full Case Study
                </Button>
              </Link>
            </div>

            <div className="bg-card p-8 rounded-xl border border-border">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600"
                alt="Modern office workspace with diverse professionals collaborating"
                className="rounded-lg w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Lead Magnet */}
      <section className="py-20 lg:py-32 bg-accent text-accent-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
            Get Your Free Talent Marketing Blueprint 2025
          </h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            Exclusive insights, frameworks, and strategies from our work with
            Fortune 500 companies. Download our comprehensive guide to
            transforming your talent acquisition approach.
          </p>

          <form
            onSubmit={handleLeadMagnetSubmit}
            className="max-w-lg mx-auto"
            data-testid="form-lead-magnet"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 text-foreground border-accent-foreground/20 focus:ring-accent-foreground focus:border-accent-foreground"
                required
                data-testid="input-lead-magnet-email"
              />
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90 whitespace-nowrap"
                disabled={isSubmitting}
                data-testid="button-download-now"
              >
                {isSubmitting ? "Sending..." : "Download Now"}
              </Button>
            </div>
            <p className="text-sm opacity-75 mt-4">
              No spam. Unsubscribe anytime. Your email is safe with us.
            </p>
          </form>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-playfair text-2xl font-semibold text-primary mb-4">
            Stay Ahead of the Curve
          </h3>
          <p className="text-secondary mb-6">
            Weekly insights on talent marketing, employer branding, and
            recruitment innovation.
          </p>

          <form
            onSubmit={handleNewsletterSubmit}
            className="max-w-md mx-auto"
            data-testid="form-newsletter"
          >
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder="Your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 focus:ring-accent focus:border-accent"
                required
                data-testid="input-newsletter-email"
              />
              <Button
                type="submit"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                disabled={isNewsletterSubmitting}
                data-testid="button-subscribe"
              >
                {isNewsletterSubmitting ? "..." : "Subscribe"}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
