import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import SectionHeader from "@/components/ui/section-header";
import Stat from "@/components/ui/stat";
import Testimonial from "@/components/ui/testimonial";
import { Bot, Users, TrendingUp, Star, CheckCircle, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import type {
  Service,
  Stat as StatType,
  Testimonial as TestimonialType,
} from "@shared/schema";
import { seoData } from "@/lib/seo";
import { useSEO } from "@/hooks/useSEO";
import { StructuredData } from "@/components/seo/StructuredData";
import { createOrganizationStructuredData } from "@/lib/seo";
import { trackFormSubmission, trackCTAClick } from "@/lib/analytics";

export default function Home() {
  const [email, setEmail] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false);
  const { toast } = useToast();

  // SEO Optimization
  useSEO({
    ...seoData.home,
    canonicalUrl: "/",
    type: "website",
  });

  // Fetch data from APIs
  const { data: servicesData = [] } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          formType: "lead_magnet",
          resource: "Talent Marketing Blueprint 2025",
        }),
      });

      if (response.ok) {
        // Track conversion
        trackFormSubmission("blueprint_download", "hero_section");

        toast({
          title: "Success!",
          description:
            "Your blueprint is on its way. Check your email in a few minutes.",
        });
        setEmail("");
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: newsletterEmail,
          formType: "newsletter",
        }),
      });

      if (response.ok) {
        // Track newsletter signup
        trackFormSubmission("newsletter_signup", "footer");

        toast({
          title: "Subscribed!",
          description: "You're now subscribed to our weekly insights.",
        });
        setNewsletterEmail("");
      } else {
        throw new Error("Newsletter subscription failed");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem subscribing. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsNewsletterSubmitting(false);
    }
  };

  const serviceIcons = {
    "AI Marketing & Automation": Bot,
    "Employer Branding & Talent Marketing": Users,
    "Executive Branding": Star,
  };

  return (
    <>
      {/* SEO Structured Data */}
      <StructuredData
        data={createOrganizationStructuredData()}
        id="organization-schema"
      />

      {/* Hero Section */}
      <section className="hero-gradient py-20 lg:py-32">
        <div className="hero-brushstroke"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center animate-fade-in">
            <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold drop-shadow-lg mb-6 leading-tight relative z-10 text-[#0F2435]">
              Cut Through the Noise.
              <br />
              Grow With Clarity.
            </h1>
            <p className="text-lg md:text-xl text-[#0F2435] drop-shadow max-w-4xl mx-auto mb-12 leading-relaxed relative z-10">
              From customer campaigns to hiring funnels, we align your brand and
              marketing to do more with less—backed by AI-driven strategy and an
              enterprise-grade lens. We help SMBs, startups, and mid-market
              teams remove friction, cut waste, and accelerate measurable
              outcomes.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10 mb-8">
              <Button
                size="lg"
                className="bg-[#D89B2D] text-[#0F2435] px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300 hover-lift rounded-full hover:bg-[#D89B2D]/90 drop-shadow-lg"
                data-testid="button-strategy-consult"
              >
                Start Your 30-Minute Strategy Consult
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-[#D89B2D] text-[#0F2435] px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300 hover-lift rounded-full border-[#D89B2D] hover:bg-[#D89B2D]/90 drop-shadow-lg"
                data-testid="button-blueprint"
              >
                Get the Talent Marketing Blueprint
              </Button>
            </div>

            {/* Trust Stats */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-[#0F2435] relative z-10">
              <div className="text-center">
                <div className="font-bold text-lg">
                  28% lower cost-per-apply
                </div>
                <div className="text-sm opacity-80">
                  with channel mix testing
                </div>
              </div>
              <div className="hidden sm:block w-px h-8 bg-[#0F2435]/20"></div>
              <div className="text-center">
                <div className="font-bold text-lg">
                  2.1× lift in qualified applications
                </div>
                <div className="text-sm opacity-80">proven methodology</div>
              </div>
              <div className="hidden sm:block w-px h-8 bg-[#0F2435]/20"></div>
              <div className="text-center">
                <div className="font-bold text-lg">
                  Faster time-to-first-interview
                </div>
                <div className="text-sm opacity-80">(7→ 2 days)</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Services Grid */}
      <section id="services" className="py-20 lg:py-32 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our Expertise"
            subtitle="Four core pillars that drive measurable growth and competitive advantage"
            className="mb-16"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => {
              const IconComponent =
                serviceIcons[service.title as keyof typeof serviceIcons] || Bot;
              return (
                <Card
                  key={index}
                  className={`gradient-card p-8 hover-lift border-0 slide-in-up stagger-${index + 1} relative overflow-hidden group`}
                  data-testid={`service-card-${service.slug}`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-bg opacity-10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 gradient-button rounded-xl flex items-center justify-center mb-6 float-animation">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-playfair text-xl font-semibold text-primary mb-4 group-hover:text-accent transition-all duration-300">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </Card>
              );
            })}
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
