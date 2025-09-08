import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Plus, Edit, Trash2, Save, X } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export default function ServicesAdmin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingService, setEditingService] = useState<any>(null);
  const [newService, setNewService] = useState({
    title: "",
    slug: "",
    excerpt: "",
    description: "",
    features: "",
    pricing: "",
    isActive: true
  });

  const { data: services = [], isLoading } = useQuery<any[]>({ queryKey: ['/api/services'] });

  const createMutation = useMutation({
    mutationFn: async (serviceData: any) => {
      return apiRequest('POST', '/api/services', serviceData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/services'] });
      setNewService({
        title: "",
        slug: "",
        excerpt: "",
        description: "",
        features: "",
        pricing: "",
        isActive: true
      });
      toast({
        title: "Service Created",
        description: "New service has been added successfully.",
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ slug, data }: { slug: string, data: any }) => {
      return apiRequest('PUT', `/api/services/${slug}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/services'] });
      setEditingService(null);
      toast({
        title: "Service Updated",
        description: "Service has been updated successfully.",
      });
    }
  });

  const handleCreate = () => {
    if (!newService.title || !newService.slug) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in title and slug.",
        variant: "destructive",
      });
      return;
    }

    const serviceData = {
      ...newService,
      features: newService.features.split('\n').filter(f => f.trim()),
      tags: [] // Can be enhanced later
    };

    createMutation.mutate(serviceData);
  };

  const handleUpdate = (service: any) => {
    const serviceData = {
      ...service,
      features: typeof service.features === 'string' 
        ? service.features.split('\n').filter((f: string) => f.trim())
        : service.features
    };

    updateMutation.mutate({ slug: service.slug, data: serviceData });
  };

  const handleSlugGeneration = (title: string) => {
    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    setNewService(prev => ({ ...prev, slug }));
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
                Manage Services
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Create New Service */}
        <Card className="p-6 mb-8">
          <h2 className="font-playfair text-xl font-bold text-primary mb-4">
            Create New Service
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium text-primary mb-1 block">
                Service Title *
              </label>
              <Input
                placeholder="AI Marketing & Automation"
                value={newService.title}
                onChange={(e) => {
                  setNewService(prev => ({ ...prev, title: e.target.value }));
                  handleSlugGeneration(e.target.value);
                }}
                data-testid="input-new-title"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-primary mb-1 block">
                URL Slug *
              </label>
              <Input
                placeholder="ai-marketing-automation"
                value={newService.slug}
                onChange={(e) => setNewService(prev => ({ ...prev, slug: e.target.value }))}
                data-testid="input-new-slug"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium text-primary mb-1 block">
              Excerpt
            </label>
            <Textarea
              placeholder="Brief description for cards and previews..."
              value={newService.excerpt}
              onChange={(e) => setNewService(prev => ({ ...prev, excerpt: e.target.value }))}
              rows={2}
              data-testid="textarea-new-excerpt"
            />
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium text-primary mb-1 block">
              Description
            </label>
            <Textarea
              placeholder="Detailed service description..."
              value={newService.description}
              onChange={(e) => setNewService(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              data-testid="textarea-new-description"
            />
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium text-primary mb-1 block">
              Features (one per line)
            </label>
            <Textarea
              placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
              value={newService.features}
              onChange={(e) => setNewService(prev => ({ ...prev, features: e.target.value }))}
              rows={4}
              data-testid="textarea-new-features"
            />
          </div>

          <Button 
            onClick={handleCreate}
            disabled={createMutation.isPending}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Service
          </Button>
        </Card>

        {/* Existing Services */}
        <div className="space-y-6">
          <h2 className="font-playfair text-xl font-bold text-primary">
            Existing Services ({services.length})
          </h2>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3].map(i => (
                <Card key={i} className="p-6 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(services as any[]).map((service: any) => (
                <Card key={service.id} className="p-6">
                  {editingService?.id === service.id ? (
                    <div className="space-y-4">
                      <Input
                        value={editingService.title}
                        onChange={(e) => setEditingService((prev: any) => ({ ...prev, title: e.target.value }))}
                        className="font-semibold"
                      />
                      <Textarea
                        value={editingService.excerpt}
                        onChange={(e) => setEditingService((prev: any) => ({ ...prev, excerpt: e.target.value }))}
                        rows={2}
                      />
                      <Textarea
                        value={editingService.description}
                        onChange={(e) => setEditingService((prev: any) => ({ ...prev, description: e.target.value }))}
                        rows={4}
                      />
                      <Textarea
                        value={Array.isArray(editingService.features) 
                          ? editingService.features.join('\n') 
                          : editingService.features}
                        onChange={(e) => setEditingService((prev: any) => ({ ...prev, features: e.target.value }))}
                        rows={3}
                        placeholder="One feature per line"
                      />
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleUpdate(editingService)}
                          disabled={updateMutation.isPending}
                        >
                          <Save className="w-4 h-4 mr-1" />
                          Save
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => setEditingService(null)}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-playfair text-lg font-bold text-primary">
                          {service.title}
                        </h3>
                        <div className="flex space-x-1">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setEditingService(service)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground text-sm mb-2">
                        /{service.slug}
                      </p>
                      
                      <p className="text-primary mb-3 line-clamp-2">
                        {service.excerpt}
                      </p>
                      
                      <div className="text-sm">
                        <span className={`inline-block px-2 py-1 rounded text-xs ${
                          service.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {service.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}