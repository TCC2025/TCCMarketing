import SectionHeader from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Award, Users, TrendingUp } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: CheckCircle,
      title: "Authenticity",
      description: "We believe authentic employer brands attract the right talent and drive lasting engagement."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Our commitment to exceptional quality ensures every strategy delivers measurable results."
    },
    {
      icon: Users,
      title: "Partnership",
      description: "We work as an extension of your team, collaborating closely to achieve shared success."
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "Staying ahead of industry trends and leveraging cutting-edge technology for competitive advantage."
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="About Thompson & Co. Collective"
            subtitle="Transforming how organizations attract, engage, and retain top talent through strategic branding and innovative marketing solutions"
            className="mb-16"
          />
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-playfair text-4xl font-bold text-primary mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-secondary mb-6 leading-relaxed">
                To bridge the gap between exceptional organizations and exceptional talent through 
                strategic employer branding, innovative recruitment marketing, and data-driven insights.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                In today's competitive talent landscape, we help organizations stand out by crafting 
                authentic narratives that resonate with their ideal candidates while building sustainable 
                systems for long-term talent acquisition success.
              </p>
            </div>
            
            <div className="bg-background p-8 rounded-xl border border-border">
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-12 h-12 text-accent" />
                  </div>
                  <p className="text-muted-foreground font-medium">Mission Visualization</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our Values"
            subtitle="The principles that guide our approach to every client partnership"
            className="mb-16"
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="p-6 text-center hover-lift" data-testid={`value-${value.title.toLowerCase()}`}>
                  <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-playfair text-xl font-semibold text-primary mb-4">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Founder Bio Section */}
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-16 items-center">
            <div className="lg:col-span-1">
              <div className="aspect-square bg-background/10 rounded-xl flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-16 h-16 text-accent-foreground" />
                  </div>
                  <p className="text-secondary-foreground/80 font-medium">Founder Photo</p>
                  <p className="text-sm text-secondary-foreground/60 mt-1">Professional headshot placeholder</p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="section-divider mb-6 bg-accent"></div>
              <h2 className="font-playfair text-4xl font-bold mb-6">
                Meet Our Founder
              </h2>
              <p className="text-xl mb-6 leading-relaxed opacity-90">
                With over 15 years of experience in talent acquisition, employer branding, and marketing strategy, 
                [Founder Name] recognized the need for specialized expertise that bridges the gap between HR and marketing.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "Former VP of Talent at Fortune 500 companies",
                  "Certified in Digital Marketing and AI automation",
                  "Speaker at industry conferences and thought leader",
                  "Published researcher in talent acquisition trends"
                ].map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="opacity-90">{achievement}</span>
                  </div>
                ))}
              </div>
              
              <blockquote className="text-lg italic opacity-90 border-l-4 border-accent pl-6 mb-8">
                "The future of talent acquisition lies in the intersection of authentic branding, 
                intelligent automation, and human-centered experiences. That's where we excel."
              </blockquote>
              
              <Button 
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                data-testid="button-connect-linkedin"
              >
                Connect on LinkedIn
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our Approach"
            subtitle="A proven methodology that delivers consistent, measurable results"
            className="mb-16"
          />
          
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                phase: "Discovery",
                description: "Deep-dive analysis of your current employer brand, candidate journey, and competitive landscape to identify opportunities and challenges."
              },
              {
                phase: "Strategy",
                description: "Development of comprehensive positioning, messaging, and tactical roadmaps aligned with your business objectives and talent goals."
              },
              {
                phase: "Execution",
                description: "Implementation of integrated campaigns across all touchpoints with continuous optimization based on performance data and feedback."
              }
            ].map((phase, index) => (
              <Card key={index} className="p-8 text-center" data-testid={`approach-${phase.phase.toLowerCase()}`}>
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-accent-foreground font-bold text-xl">{index + 1}</span>
                </div>
                <h3 className="font-playfair text-xl font-semibold text-primary mb-4">
                  {phase.phase}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {phase.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent text-accent-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-4xl font-bold mb-6">
            Ready to Start Your Transformation?
          </h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            Let's discuss how our proven approach can help you achieve your talent acquisition goals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-testid="button-schedule-consultation"
            >
              Schedule a Consultation
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-accent"
              data-testid="button-view-our-work"
            >
              View Our Work
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
