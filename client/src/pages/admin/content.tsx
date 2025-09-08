import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileUpload } from "@/components/ui/file-upload";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Plus, Edit, Save, X, Star, ImageIcon } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export default function ContentAdmin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [editingCaseStudy, setEditingCaseStudy] = useState<any>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);
  
  const [newCaseStudy, setNewCaseStudy] = useState({
    title: "",
    slug: "",
    client: "",
    challenge: "",
    solution: "",
    results: "",
    metrics: "",
    tags: "",
    isPublished: true
  });
  const [caseStudyMedia, setCaseStudyMedia] = useState<Array<{id: string, name: string, url: string, type: string, size: number}>>([]);

  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    role: "",
    company: "",
    content: "",
    rating: 5,
    isPublished: true
  });

  const { data: caseStudies = [], isLoading: loadingCaseStudies } = useQuery<any[]>({ 
    queryKey: ['/api/case-studies'] 
  });
  
  const { data: testimonials = [], isLoading: loadingTestimonials } = useQuery<any[]>({ 
    queryKey: ['/api/testimonials'] 
  });

  // Case Study Mutations
  const createCaseStudyMutation = useMutation({
    mutationFn: async (caseStudyData: any) => {
      return apiRequest('POST', '/api/case-studies', caseStudyData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/case-studies'] });
      setNewCaseStudy({
        title: "",
        slug: "",
        client: "",
        challenge: "",
        solution: "",
        results: "",
        metrics: "",
        tags: "",
        isPublished: true
      });
      toast({
        title: "Case Study Created",
        description: "New case study has been added successfully.",
      });
    }
  });

  const updateCaseStudyMutation = useMutation({
    mutationFn: async ({ slug, data }: { slug: string, data: any }) => {
      return apiRequest('PUT', `/api/case-studies/${slug}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/case-studies'] });
      setEditingCaseStudy(null);
      toast({
        title: "Case Study Updated",
        description: "Case study has been updated successfully.",
      });
    }
  });

  // Testimonial Mutations
  const createTestimonialMutation = useMutation({
    mutationFn: async (testimonialData: any) => {
      return apiRequest('POST', '/api/testimonials', testimonialData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/testimonials'] });
      setNewTestimonial({
        name: "",
        role: "",
        company: "",
        content: "",
        rating: 5,
        isPublished: true
      });
      toast({
        title: "Testimonial Created",
        description: "New testimonial has been added successfully.",
      });
    }
  });

  const updateTestimonialMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string, data: any }) => {
      return apiRequest('PUT', `/api/testimonials/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/testimonials'] });
      setEditingTestimonial(null);
      toast({
        title: "Testimonial Updated",
        description: "Testimonial has been updated successfully.",
      });
    }
  });

  const handleCreateCaseStudy = () => {
    if (!newCaseStudy.title || !newCaseStudy.client) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in title and client.",
        variant: "destructive",
      });
      return;
    }

    const caseStudyData = {
      ...newCaseStudy,
      slug: newCaseStudy.slug || newCaseStudy.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      tags: newCaseStudy.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      metrics: newCaseStudy.metrics.split('\n').filter(m => m.trim())
    };

    createCaseStudyMutation.mutate(caseStudyData);
  };

  const handleCreateTestimonial = () => {
    if (!newTestimonial.name || !newTestimonial.content) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in name and content.",
        variant: "destructive",
      });
      return;
    }

    createTestimonialMutation.mutate(newTestimonial);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setLocation('/admin/dashboard')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="font-playfair text-2xl font-bold text-primary">
                Content Management
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="case-studies" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          </TabsList>

          {/* Case Studies Tab */}
          <TabsContent value="case-studies" className="space-y-8">
            {/* Create New Case Study */}
            <Card className="p-6">
              <h2 className="font-playfair text-xl font-bold text-primary mb-4">
                Create New Case Study
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium text-primary mb-1 block">
                    Case Study Title *
                  </label>
                  <Input
                    placeholder="How We Helped [Client] Achieve [Result]"
                    value={newCaseStudy.title}
                    onChange={(e) => {
                      setNewCaseStudy(prev => ({ ...prev, title: e.target.value }));
                    }}
                    data-testid="input-case-study-title"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-primary mb-1 block">
                    Client Name *
                  </label>
                  <Input
                    placeholder="Company or Organization"
                    value={newCaseStudy.client}
                    onChange={(e) => setNewCaseStudy(prev => ({ ...prev, client: e.target.value }))}
                    data-testid="input-case-study-client"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-primary mb-1 block">
                    Challenge
                  </label>
                  <Textarea
                    placeholder="What problem did the client face?"
                    value={newCaseStudy.challenge}
                    onChange={(e) => setNewCaseStudy(prev => ({ ...prev, challenge: e.target.value }))}
                    rows={3}
                    data-testid="textarea-case-study-challenge"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-primary mb-1 block">
                    Solution
                  </label>
                  <Textarea
                    placeholder="How did you solve their problem?"
                    value={newCaseStudy.solution}
                    onChange={(e) => setNewCaseStudy(prev => ({ ...prev, solution: e.target.value }))}
                    rows={3}
                    data-testid="textarea-case-study-solution"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-primary mb-1 block">
                    Results
                  </label>
                  <Textarea
                    placeholder="What outcomes did you achieve?"
                    value={newCaseStudy.results}
                    onChange={(e) => setNewCaseStudy(prev => ({ ...prev, results: e.target.value }))}
                    rows={3}
                    data-testid="textarea-case-study-results"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-primary mb-1 block">
                    Key Metrics (one per line)
                  </label>
                  <Textarea
                    placeholder="28% increase in qualified applicants&#10;50% reduction in time-to-hire&#10;85% improvement in brand perception"
                    value={newCaseStudy.metrics}
                    onChange={(e) => setNewCaseStudy(prev => ({ ...prev, metrics: e.target.value }))}
                    rows={3}
                    data-testid="textarea-case-study-metrics"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-primary mb-1 block">
                    Tags (comma separated)
                  </label>
                  <Input
                    placeholder="Employer Branding, Recruitment Marketing, Tech Industry"
                    value={newCaseStudy.tags}
                    onChange={(e) => setNewCaseStudy(prev => ({ ...prev, tags: e.target.value }))}
                    data-testid="input-case-study-tags"
                  />
                </div>
              </div>

              <Button 
                onClick={handleCreateCaseStudy}
                disabled={createCaseStudyMutation.isPending}
                className="bg-accent text-accent-foreground hover:bg-accent/90 mt-4"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Case Study
              </Button>
            </Card>

            {/* Existing Case Studies */}
            <div className="space-y-4">
              <h2 className="font-playfair text-xl font-bold text-primary">
                Existing Case Studies ({(caseStudies as any[]).length})
              </h2>

              {loadingCaseStudies ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <Card key={i} className="p-6 animate-pulse">
                      <div className="h-6 bg-gray-200 rounded mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {(caseStudies as any[]).map((caseStudy: any) => (
                    <Card key={caseStudy.id} className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-playfair text-lg font-bold text-primary mb-2">
                            {caseStudy.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-2">
                            Client: {caseStudy.client}
                          </p>
                          <p className="text-primary mb-3 line-clamp-2">
                            {caseStudy.challenge}
                          </p>
                          <div className="text-sm">
                            <span className={`inline-block px-2 py-1 rounded text-xs ${
                              caseStudy.isPublished 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {caseStudy.isPublished ? 'Published' : 'Draft'}
                            </span>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setEditingCaseStudy(caseStudy)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials" className="space-y-8">
            {/* Create New Testimonial */}
            <Card className="p-6">
              <h2 className="font-playfair text-xl font-bold text-primary mb-4">
                Create New Testimonial
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium text-primary mb-1 block">
                    Name *
                  </label>
                  <Input
                    placeholder="John Doe"
                    value={newTestimonial.name}
                    onChange={(e) => setNewTestimonial(prev => ({ ...prev, name: e.target.value }))}
                    data-testid="input-testimonial-name"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-primary mb-1 block">
                    Role
                  </label>
                  <Input
                    placeholder="VP of Talent"
                    value={newTestimonial.role}
                    onChange={(e) => setNewTestimonial(prev => ({ ...prev, role: e.target.value }))}
                    data-testid="input-testimonial-role"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-primary mb-1 block">
                    Company
                  </label>
                  <Input
                    placeholder="Tech Innovations Inc"
                    value={newTestimonial.company}
                    onChange={(e) => setNewTestimonial(prev => ({ ...prev, company: e.target.value }))}
                    data-testid="input-testimonial-company"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-primary mb-1 block">
                    Testimonial Content *
                  </label>
                  <Textarea
                    placeholder="The Collective transformed our employer brand and helped us attract top talent..."
                    value={newTestimonial.content}
                    onChange={(e) => setNewTestimonial(prev => ({ ...prev, content: e.target.value }))}
                    rows={4}
                    data-testid="textarea-testimonial-content"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-primary mb-1 block">
                    Rating
                  </label>
                  <Select 
                    value={newTestimonial.rating.toString()} 
                    onValueChange={(value) => setNewTestimonial(prev => ({ ...prev, rating: parseInt(value) }))}
                  >
                    <SelectTrigger className="w-32" data-testid="select-testimonial-rating">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map(rating => (
                        <SelectItem key={rating} value={rating.toString()}>
                          <div className="flex items-center">
                            {[...Array(rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                            <span className="ml-2">{rating}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                onClick={handleCreateTestimonial}
                disabled={createTestimonialMutation.isPending}
                className="bg-accent text-accent-foreground hover:bg-accent/90 mt-4"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Testimonial
              </Button>
            </Card>

            {/* Existing Testimonials */}
            <div className="space-y-4">
              <h2 className="font-playfair text-xl font-bold text-primary">
                Existing Testimonials ({(testimonials as any[]).length})
              </h2>

              {loadingTestimonials ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <Card key={i} className="p-6 animate-pulse">
                      <div className="h-6 bg-gray-200 rounded mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {(testimonials as any[]).map((testimonial: any) => (
                    <Card key={testimonial.id} className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-primary">
                              {testimonial.name}
                            </h3>
                            <div className="flex">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                          <p className="text-muted-foreground text-sm mb-2">
                            {testimonial.role}{testimonial.company && `, ${testimonial.company}`}
                          </p>
                          <p className="text-primary mb-3 line-clamp-3">
                            "{testimonial.content}"
                          </p>
                          <div className="text-sm">
                            <span className={`inline-block px-2 py-1 rounded text-xs ${
                              testimonial.isPublished 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {testimonial.isPublished ? 'Published' : 'Draft'}
                            </span>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setEditingTestimonial(testimonial)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}