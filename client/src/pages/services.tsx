import SectionHeader from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Users, TrendingUp, Star, CheckCircle, ArrowRight } from "lucide-react";
import servicesData from "@/data/services.json";

export default function Services() {
  const serviceIcons = {
    "AI Marketing & Automation": Bot,
    "Employer Branding & Talent Marketing": Users,
    "Fractional CMO": TrendingUp,
    "Executive Branding": Star
  };

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <SectionHeader
              title="Our Services"
              subtitle="Comprehensive solutions designed to transform your talent acquisition and employer branding strategies"
              className="mb-12"
            />
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {servicesData.map((service, index) => {
              const IconComponent = serviceIcons[service.title as keyof typeof serviceIcons] || Bot;
              const isEven = index % 2 === 0;
              
              return (
                <div key={service.slug} className={`grid lg:grid-cols-2 gap-16 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
                  <div className={!isEven ? 'lg:col-start-2' : ''}>
                    <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                      <IconComponent className="w-8 h-8 text-accent" />
                    </div>
                    <h2 className="font-playfair text-3xl md:text-4xl font-bold text-primary mb-6">
                      {service.title}
                    </h2>
                    <p className="text-xl text-secondary mb-8 leading-relaxed">
                      {service.longDescription}
                    </p>
                    
                    <div className="space-y-4 mb-8">
                      {service.keyFeatures.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                          <span className="text-secondary">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90" data-testid={`button-learn-more-${service.slug}`}>
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                  
                  <div className={!isEven ? 'lg:col-start-1' : ''}>
                    <Card className="p-8 bg-background">
                      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <IconComponent className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground font-medium">{service.title} Visualization</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent text-accent-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Talent Strategy?
          </h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            Let's discuss how our expertise can drive measurable results for your organization.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-testid="button-book-consultation"
            >
              Book a Free Consultation
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-accent"
              data-testid="button-view-case-studies"
            >
              View Case Studies
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
