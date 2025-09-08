import { useState } from "react";
import SectionHeader from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { CaseStudy } from "@shared/schema";

export default function CaseStudies() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { data: caseStudiesData = [], isLoading } = useQuery<CaseStudy[]>({ queryKey: ['/api/case-studies'] });
  
  const categories = ["All", "Employer Branding", "AI Marketing", "Fractional CMO", "Executive Branding"];
  
  const filteredCaseStudies = selectedCategory === "All" 
    ? caseStudiesData 
    : caseStudiesData.filter(study => study.category === selectedCategory);
    
  if (isLoading) {
    return (
      <section className="py-20 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>Loading case studies...</div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Case Studies"
            subtitle="Real results from our partnerships with industry-leading organizations"
            className="mb-12"
          />
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-accent text-accent-foreground" : ""}
                data-testid={`filter-${category.toLowerCase().replace(' ', '-')}`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCaseStudies.map((study) => (
              <Card key={study.slug} className="hover-lift overflow-hidden" data-testid={`case-study-${study.slug}`}>
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <TrendingUp className="w-12 h-12 text-muted-foreground" />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-accent/10 text-accent hover:bg-accent/20">
                      {study.category}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      {study.date}
                    </div>
                  </div>
                  
                  <h3 className="font-playfair text-xl font-semibold text-primary mb-3">
                    {study.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {study.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {study.results.map((result, index) => (
                      <div key={index} className="text-center">
                        <div className="font-playfair text-2xl font-bold text-accent">
                          {result.value}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {result.metric}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full group"
                    data-testid={`button-read-study-${study.slug}`}
                  >
                    Read Case Study
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          
          {filteredCaseStudies.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No case studies found for the selected category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-4xl font-bold mb-6">
            Ready to Create Your Success Story?
          </h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            Let's discuss how we can help you achieve similar results.
          </p>
          
          <Button 
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
            data-testid="button-start-your-project"
          >
            Start Your Project
          </Button>
        </div>
      </section>
    </>
  );
}
