import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import SectionHeader from "@/components/ui/section-header";
import Stat from "@/components/ui/stat";
import Testimonial from "@/components/ui/testimonial";
import { Bot, Users, TrendingUp, Star, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import servicesData from "@/data/services.json";
import statsData from "@/data/stats.json";
import testimonialsData from "@/data/testimonials.json";

export default function Home() {
  const [email, setEmail] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false);
  const { toast } = useToast();

  const handleLeadMagnetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    
    try {
      // Form submission to Formspree or environment endpoint
      const formspreeEndpoint = process.env.VITE_FORMSPREE_ENDPOINT || process.env.VITE_LEAD_MAGNET_FORM_ENDPOINT || "https://formspree.io/f/YOUR_FORM_ID";
      
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          form_type: "lead_magnet",
          resource: "Talent Marketing Blueprint 2025"
        })
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Your blueprint is on its way. Check your email in a few minutes.",
        });
        setEmail("");
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem downloading the blueprint. Please try again.",
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
      const newsletterEndpoint = process.env.VITE_NEWSLETTER_ENDPOINT || "https://formspree.io/f/YOUR_NEWSLETTER_FORM_ID";
      
      const response = await fetch(newsletterEndpoint, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: newsletterEmail,
          form_type: "newsletter"
        })
      });

      if (response.ok) {
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
    "Fractional CMO": TrendingUp,
    "Executive Branding": Star
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero-gradient py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-primary mb-6 leading-tight">
              Where Strategy Meets<br />
              <span className="text-gradient">Extraordinary Outcomes</span>
            </h1>
            <p className="text-xl md:text-2xl text-secondary max-w-4xl mx-auto mb-12 leading-relaxed">
              Boutique consultancy specializing in employer branding, recruitment marketing, 
              AI-driven automation, and fractional CMO services that transform how top-tier 
              companies attract and engage talent.
            </p>
            
            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg"
                className="bg-primary text-primary-foreground px-8 py-4 text-lg font-semibold hover:bg-primary/90 hover-lift"
                data-testid="button-book-strategy-call"
              >
                Book a Strategy Call
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-accent text-accent px-8 py-4 text-lg font-semibold hover:bg-accent hover:text-accent-foreground"
                data-testid="button-download-blueprint"
              >
                Download the Talent Marketing Blueprint 2025
              </Button>
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
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {servicesData.map((service, index) => {
              const IconComponent = serviceIcons[service.title as keyof typeof serviceIcons] || Bot;
              return (
                <Card key={index} className="p-8 hover-lift border border-border" data-testid={`service-card-${service.slug}`}>
                  <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                    <IconComponent className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-playfair text-xl font-semibold text-primary mb-4">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
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
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
                The Align360™ Framework
              </h2>
              <p className="text-xl mb-8 leading-relaxed opacity-90">
                Our proprietary methodology that creates comprehensive alignment between your employer brand, 
                candidate experience, and business objectives.
              </p>
              
              <div className="space-y-6">
                {[
                  {
                    step: "1",
                    title: "Assess",
                    description: "Comprehensive audit of current employer brand positioning and candidate journey touchpoints."
                  },
                  {
                    step: "2", 
                    title: "Align",
                    description: "Strategic positioning that connects your EVP with market demands and candidate expectations."
                  },
                  {
                    step: "3",
                    title: "Activate", 
                    description: "Implementation across all candidate touchpoints with measurable KPIs and continuous optimization."
                  }
                ].map((phase) => (
                  <div key={phase.step} className="flex items-start space-x-4" data-testid={`framework-phase-${phase.step}`}>
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-accent-foreground font-bold text-sm">{phase.step}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{phase.title}</h3>
                      <p className="opacity-90">{phase.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-background/10 p-8 rounded-xl">
              <div className="aspect-square bg-background/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 border-4 border-accent rounded-full flex items-center justify-center mb-4 mx-auto animate-spin" style={{ animationDuration: '10s' }}>
                    <span className="text-accent font-playfair text-2xl font-bold">360°</span>
                  </div>
                  <p className="text-accent font-semibold">Alignment Framework</p>
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
                <div key={i} className="bg-muted p-6 rounded-lg flex items-center justify-center">
                  <span className="font-semibold text-muted-foreground text-sm">CLIENT LOGO</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {statsData.map((stat, index) => (
              <Stat key={index} value={stat.value} description={stat.description} />
            ))}
          </div>
          
          {/* Testimonials */}
          <div className="grid md:grid-cols-2 gap-8">
            {testimonialsData.slice(0, 2).map((testimonial, index) => (
              <Testimonial
                key={index}
                quote={testimonial.quote}
                name={testimonial.name}
                title={testimonial.title}
              />
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
                A comprehensive employer branding and recruitment marketing transformation that resulted 
                in a 400% increase in qualified applications and 60% reduction in cost-per-hire.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "Complete employer brand repositioning",
                  "AI-powered recruitment marketing automation",
                  "Multi-channel candidate experience optimization"
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-secondary">{item}</span>
                  </div>
                ))}
              </div>
              
              <Link href="/case-studies">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90" data-testid="button-read-case-study">
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
            Exclusive insights, frameworks, and strategies from our work with Fortune 500 companies. 
            Download our comprehensive guide to transforming your talent acquisition approach.
          </p>
          
          <form onSubmit={handleLeadMagnetSubmit} className="max-w-lg mx-auto" data-testid="form-lead-magnet">
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
            Weekly insights on talent marketing, employer branding, and recruitment innovation.
          </p>
          
          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto" data-testid="form-newsletter">
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
