import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { 
  FileText, Users, Briefcase, MessageSquare, 
  BarChart3, Settings, PlusCircle, Edit3,
  LogOut, Home, BookOpen
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      setLocation('/admin/login');
    }
  }, [setLocation]);

  // Fetch dashboard stats
  const { data: leads = [] } = useQuery({ queryKey: ['/api/leads'] });
  const { data: blogPosts = [] } = useQuery({ queryKey: ['/api/blog'] });
  const { data: services = [] } = useQuery({ queryKey: ['/api/services'] });
  const { data: caseStudies = [] } = useQuery({ queryKey: ['/api/case-studies'] });

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setLocation('/admin/login');
    toast({
      title: "Signed out",
      description: "You have been logged out successfully.",
    });
  };

  const dashboardStats = [
    { 
      title: "Total Leads", 
      value: leads.length, 
      icon: Users,
      description: "Form submissions"
    },
    { 
      title: "Blog Posts", 
      value: blogPosts.length, 
      icon: FileText,
      description: "Published articles"
    },
    { 
      title: "Services", 
      value: services.length, 
      icon: Briefcase,
      description: "Service offerings"
    },
    { 
      title: "Case Studies", 
      value: caseStudies.length, 
      icon: BarChart3,
      description: "Success stories"
    }
  ];

  const quickActions = [
    {
      title: "Create Blog Post",
      description: "Write a new article for SEO",
      icon: PlusCircle,
      href: "/admin/blog/new",
      color: "bg-blue-500"
    },
    {
      title: "Edit Services",
      description: "Update service offerings",
      icon: Edit3,
      href: "/admin/services",
      color: "bg-green-500"
    },
    {
      title: "View Leads",
      description: "Check new inquiries",
      icon: MessageSquare,
      href: "/admin/leads",
      color: "bg-purple-500"
    },
    {
      title: "Manage Content",
      description: "Edit case studies & testimonials",
      icon: Settings,
      href: "/admin/content",
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="font-playfair text-2xl font-bold text-primary">
                Admin Dashboard
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" size="sm">
                  <Home className="w-4 h-4 mr-2" />
                  View Site
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-primary">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.description}
                    </p>
                  </div>
                  <IconComponent className="w-8 h-8 text-accent" />
                </div>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="font-playfair text-2xl font-bold text-primary mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Link key={index} href={action.href}>
                  <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${action.color} text-white group-hover:scale-110 transition-transform`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary group-hover:text-accent transition-colors">
                          {action.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <h3 className="font-playfair text-xl font-bold text-primary mb-4">
              Recent Leads
            </h3>
            <div className="space-y-3">
              {leads.slice(0, 5).map((lead: any, index: number) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="font-medium text-primary">{lead.name || lead.email}</p>
                    <p className="text-sm text-muted-foreground">{lead.formType}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
              {leads.length === 0 && (
                <p className="text-muted-foreground text-center py-4">No leads yet</p>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-playfair text-xl font-bold text-primary mb-4">
              Content Status
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-primary">Published Blog Posts</span>
                <span className="font-bold text-accent">{blogPosts.filter((p: any) => p.isPublished).length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-primary">Draft Posts</span>
                <span className="font-bold text-muted-foreground">{blogPosts.filter((p: any) => !p.isPublished).length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-primary">Active Services</span>
                <span className="font-bold text-accent">{services.filter((s: any) => s.isActive).length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-primary">Published Case Studies</span>
                <span className="font-bold text-accent">{caseStudies.filter((cs: any) => cs.isPublished).length}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}