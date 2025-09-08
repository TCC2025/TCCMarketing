import { useState } from "react";
import { Link } from "wouter";
import SectionHeader from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Search, ArrowRight, TrendingUp } from "lucide-react";
import insightsData from "@/data/insights.json";

export default function Blog() {
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

  return (
    <>
      {/* Hero Section */}
      <section className="hero-gradient py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center relative z-10">
            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-charcoal mb-6">
              Insights & <span className="text-gradient">Thought Leadership</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-blue-grey max-w-4xl mx-auto mb-12 leading-relaxed">
              Expert perspectives on the future of talent acquisition, employer branding, 
              and modern business solutions in today's dynamic landscape.
            </p>
            
            {/* Search and Filter */}
            <div className="max-w-2xl mx-auto">
              <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search insights and articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 py-4 text-lg rounded-full border-2 border-transparent focus:border-accent bg-white/90 backdrop-blur-sm"
                  data-testid="input-search-insights"
                />
              </div>
              
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full ${selectedCategory === category 
                      ? "gradient-button text-white" 
                      : "bg-white/90 backdrop-blur-sm border-2 hover:border-accent"
                    }`}
                    data-testid={`filter-${category.toLowerCase().replace(' ', '-').replace('&', 'and')}`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && selectedCategory === "All" && searchTerm === "" && (
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="section-divider mb-6"></div>
              <h2 className="font-playfair text-3xl font-bold text-primary mb-4">Featured Article</h2>
            </div>
            
            <Card className="overflow-hidden hover-lift gradient-border" data-testid={`featured-post-${featuredPost.slug}`}>
              <div className="bg-white rounded-lg">
                <div className="grid lg:grid-cols-2">
                  <div className="aspect-video lg:aspect-auto bg-gradient-bg flex items-center justify-center relative overflow-hidden">
                    <div className="text-center p-8 relative z-10">
                      <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                        <TrendingUp className="w-10 h-10 text-white" />
                      </div>
                      <p className="text-white font-medium">Featured Article</p>
                    </div>
                  </div>
                  
                  <div className="p-8 lg:p-12">
                    <div className="flex items-center gap-4 mb-4">
                      <Badge className="gradient-button text-white px-3 py-1">
                        Featured
                      </Badge>
                      <Badge variant="outline">{featuredPost.category}</Badge>
                    </div>
                    
                    <h3 className="font-playfair text-2xl md:text-3xl font-bold text-primary mb-4">
                      {featuredPost.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="flex items-center text-sm text-muted-foreground mb-6">
                      <Calendar className="w-4 h-4 mr-2" />
                      {featuredPost.publishedAt}
                      <Clock className="w-4 h-4 ml-4 mr-2" />
                      {featuredPost.readTime}
                    </div>
                    
                    <Link href={`/blog/${featuredPost.slug}`}>
                      <Button className="gradient-button text-white group rounded-full px-6" data-testid={`button-read-${featuredPost.slug}`}>
                        Read Full Article
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {searchTerm || selectedCategory !== "All" ? (
            <div className="mb-12 text-center">
              <h2 className="font-playfair text-3xl font-bold text-primary mb-4">
                {searchTerm ? `Search Results for "${searchTerm}"` : `${selectedCategory} Articles`}
              </h2>
              <p className="text-muted-foreground text-lg">
                {filteredInsights.length} article{filteredInsights.length !== 1 ? 's' : ''} found
              </p>
            </div>
          ) : (
            <div className="text-center mb-12">
              <div className="section-divider mb-6"></div>
              <h2 className="font-playfair text-3xl font-bold text-primary">Latest Articles</h2>
            </div>
          )}
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInsights.map((post) => (
              <Card key={post.slug} className="hover-lift overflow-hidden group" data-testid={`insight-${post.slug}`}>
                <div className="aspect-video bg-gradient-bg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-bg opacity-90"></div>
                  <TrendingUp className="w-12 h-12 text-white relative z-10" />
                </div>
                
                <div className="p-6 bg-white">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="border-accent text-accent">{post.category}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <h3 className="font-playfair text-xl font-semibold text-primary mb-3 line-clamp-2 group-hover:text-accent transition-colors">
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
                    
                    <Link href={`/blog/${post.slug}`}>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="group p-0 h-auto font-medium text-accent hover:text-accent/80"
                        data-testid={`button-read-${post.slug}`}
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {filteredInsights.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-4">
                No articles found matching your criteria.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {setSearchTerm(""); setSelectedCategory("All");}}
                className="rounded-full"
                data-testid="button-clear-filters"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="hero-gradient py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal mb-6">
            Stay Ahead with Weekly <span className="text-gradient">Insights</span>
          </h2>
          <p className="text-xl text-slate-blue-grey mb-8 leading-relaxed">
            Get the latest trends, strategies, and thought leadership delivered to your inbox.
          </p>
          
          <Button 
            size="lg"
            className="gradient-button text-white px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300 rounded-full"
            data-testid="button-subscribe-insights"
          >
            Subscribe to Newsletter
          </Button>
        </div>
      </section>
    </>
  );
}