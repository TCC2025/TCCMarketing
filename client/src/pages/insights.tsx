import { useState } from "react";
import SectionHeader from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Search, ArrowRight } from "lucide-react";
import insightsData from "@/data/insights.json";

export default function Insights() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const categories = ["All", "Employer Branding", "AI & Automation", "Talent Marketing", "Leadership"];
  
  const filteredInsights = insightsData
    .filter(post => selectedCategory === "All" || post.category === selectedCategory)
    .filter(post => 
      searchTerm === "" || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const featuredPost = insightsData.find(post => post.featured);
  const regularPosts = insightsData.filter(post => !post.featured);

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Insights & Thought Leadership"
            subtitle="Expert perspectives on the future of talent acquisition and employer branding"
            className="mb-12"
          />
          
          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search insights..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-insights"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-accent text-accent-foreground" : ""}
                  data-testid={`filter-${category.toLowerCase().replace(' ', '-').replace('&', 'and')}`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && selectedCategory === "All" && searchTerm === "" && (
        <section className="py-20 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-3xl font-bold text-primary mb-4">Featured Insight</h2>
            </div>
            
            <Card className="overflow-hidden hover-lift" data-testid={`featured-post-${featuredPost.slug}`}>
              <div className="grid lg:grid-cols-2">
                <div className="aspect-video lg:aspect-auto bg-muted flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-8 h-8 text-accent" />
                    </div>
                    <p className="text-muted-foreground">Featured Article Image</p>
                  </div>
                </div>
                
                <div className="p-8 lg:p-12">
                  <div className="flex items-center gap-4 mb-4">
                    <Badge className="bg-accent/10 text-accent hover:bg-accent/20">
                      Featured
                    </Badge>
                    <Badge variant="outline">{featuredPost.category}</Badge>
                  </div>
                  
                  <h3 className="font-playfair text-2xl md:text-3xl font-bold text-primary mb-4">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center text-sm text-muted-foreground mb-6">
                    <Calendar className="w-4 h-4 mr-2" />
                    {featuredPost.publishedAt}
                    <Clock className="w-4 h-4 ml-4 mr-2" />
                    {featuredPost.readTime}
                  </div>
                  
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90 group" data-testid={`button-read-${featuredPost.slug}`}>
                    Read Full Article
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Insights Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {searchTerm || selectedCategory !== "All" ? (
            <div className="mb-8">
              <h2 className="font-playfair text-2xl font-bold text-primary mb-4">
                {searchTerm ? `Search Results for "${searchTerm}"` : `${selectedCategory} Insights`}
              </h2>
              <p className="text-muted-foreground">
                {filteredInsights.length} article{filteredInsights.length !== 1 ? 's' : ''} found
              </p>
            </div>
          ) : (
            <div className="text-center mb-12">
              <h2 className="font-playfair text-3xl font-bold text-primary">Latest Insights</h2>
            </div>
          )}
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInsights.map((post) => (
              <Card key={post.slug} className="hover-lift overflow-hidden" data-testid={`insight-${post.slug}`}>
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <Calendar className="w-12 h-12 text-muted-foreground" />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline">{post.category}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <h3 className="font-playfair text-xl font-semibold text-primary mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.publishedAt}
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="group p-0 h-auto font-medium text-accent hover:text-accent/80"
                      data-testid={`button-read-${post.slug}`}
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {filteredInsights.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No insights found matching your criteria.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {setSearchTerm(""); setSelectedCategory("All");}}
                className="mt-4"
                data-testid="button-clear-filters"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-accent text-accent-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-4xl font-bold mb-6">
            Stay Informed with Weekly Insights
          </h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            Get the latest trends, strategies, and thought leadership delivered to your inbox.
          </p>
          
          <Button 
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            data-testid="button-subscribe-insights"
          >
            Subscribe to Newsletter
          </Button>
        </div>
      </section>
    </>
  );
}
