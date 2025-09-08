import { Link } from "wouter";
import { Linkedin, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const services = [
    { name: "AI Marketing & Automation", href: "/services" },
    { name: "Employer Branding", href: "/services" },
    { name: "Executive Branding", href: "/services" },
  ];

  const company = [
    { name: "About", href: "/about" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const legal = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ];

  return (
    <footer className="bg-[var(--tcc-navy)] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <h3 className="font-playfair text-2xl font-semibold mb-4 tracking-wide">
              THE COLLECTIVE
            </h3>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              Modern solutions for employer branding, recruitment marketing, 
              and AI-driven automation in today's dynamic business landscape.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 transition-colors duration-200"
                aria-label="LinkedIn"
                data-testid="social-link-linkedin"
              >
                <Linkedin className="w-5 h-5 text-primary-foreground" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 transition-colors duration-200"
                aria-label="Twitter"
                data-testid="social-link-twitter"
              >
                <Twitter className="w-5 h-5 text-primary-foreground" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 transition-colors duration-200"
                aria-label="Instagram"
                data-testid="social-link-instagram"
              >
                <Instagram className="w-5 h-5 text-primary-foreground" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-3 text-primary-foreground/80">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="hover:text-primary-foreground transition-colors duration-200"
                    data-testid={`footer-service-${service.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-primary-foreground/80">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-primary-foreground transition-colors duration-200"
                    data-testid={`footer-company-${item.name.toLowerCase().replace(' ', '-')}`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/60 text-sm">
            © {currentYear} The Collective by Thompson & Co. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-primary-foreground/60 mt-4 md:mt-0">
            {legal.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="hover:text-primary-foreground transition-colors duration-200"
                data-testid={`footer-legal-${item.name.toLowerCase().replace(' ', '-')}`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Schema.org markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "The Collective by Thompson & Co",
            "url": "https://thompsonco.com",
            "description": "The Collective by Thompson & Co provides modern solutions for employer branding, recruitment marketing, and AI-driven automation in today's dynamic business landscape.",
            "serviceType": [
              "Employer Branding",
              "Recruitment Marketing", 
              "AI Marketing Automation",
              "Executive Branding"
            ],
            "slogan": "Modern Solutions for a Dynamic World"
          })
        }}
      />
    </footer>
  );
}
