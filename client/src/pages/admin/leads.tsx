import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Search, Mail, Calendar, Filter } from "lucide-react";

export default function LeadsAdmin() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  
  const { data: leads = [], isLoading } = useQuery<any[]>({ queryKey: ['/api/leads'] });

  const filteredLeads = (leads as any[]).filter((lead: any) => {
    const matchesSearch = !searchTerm || 
      lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === "all" || lead.formType === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const getFormTypeColor = (formType: string) => {
    switch (formType) {
      case 'consultation': return 'bg-blue-100 text-blue-800';
      case 'blueprint': return 'bg-green-100 text-green-800';
      case 'contact': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFormTypeLabel = (formType: string) => {
    switch (formType) {
      case 'consultation': return 'Strategy Consultation';
      case 'blueprint': return 'Talent Marketing Blueprint';
      case 'contact': return 'General Contact';
      default: return formType;
    }
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
                Lead Management
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search leads by name, email, or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-leads"
                />
              </div>
            </div>
            
            <div className="w-full md:w-48">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger data-testid="select-filter-type">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Forms</SelectItem>
                  <SelectItem value="consultation">Strategy Consultation</SelectItem>
                  <SelectItem value="blueprint">Marketing Blueprint</SelectItem>
                  <SelectItem value="contact">General Contact</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Lead Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Total Leads</h3>
            <p className="text-2xl font-bold text-primary">{(leads as any[]).length}</p>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Consultations</h3>
            <p className="text-2xl font-bold text-blue-600">
              {(leads as any[]).filter((l: any) => l.formType === 'consultation').length}
            </p>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Blueprint Requests</h3>
            <p className="text-2xl font-bold text-green-600">
              {(leads as any[]).filter((l: any) => l.formType === 'blueprint').length}
            </p>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground">This Week</h3>
            <p className="text-2xl font-bold text-purple-600">
              {(leads as any[]).filter((l: any) => {
                const leadDate = new Date(l.createdAt);
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return leadDate >= weekAgo;
              }).length}
            </p>
          </Card>
        </div>

        {/* Leads List */}
        <div className="space-y-4">
          <h2 className="font-playfair text-xl font-bold text-primary">
            Leads ({filteredLeads.length})
          </h2>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <Card key={i} className="p-6 animate-pulse">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2 flex-1">
                      <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                  </div>
                </Card>
              ))}
            </div>
          ) : filteredLeads.length === 0 ? (
            <Card className="p-8 text-center">
              <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium text-lg text-primary mb-2">No leads found</h3>
              <p className="text-muted-foreground">
                {searchTerm || filterType !== "all" 
                  ? "Try adjusting your search or filter criteria."
                  : "Leads will appear here when visitors submit forms on your website."
                }
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredLeads.map((lead: any, index: number) => (
                <Card key={lead.id || index} className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold text-lg text-primary">
                          {lead.name || lead.email}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFormTypeColor(lead.formType)}`}>
                          {getFormTypeLabel(lead.formType)}
                        </span>
                      </div>
                      
                      <div className="space-y-1 text-sm text-muted-foreground">
                        {lead.email && (
                          <p className="flex items-center">
                            <Mail className="w-4 h-4 mr-2" />
                            {lead.email}
                          </p>
                        )}
                        {lead.company && (
                          <p className="flex items-center">
                            <span className="w-4 h-4 mr-2 text-center">🏢</span>
                            {lead.company}
                          </p>
                        )}
                        <p className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(lead.createdAt).toLocaleDateString()} at{' '}
                          {new Date(lead.createdAt).toLocaleTimeString()}
                        </p>
                      </div>

                      {lead.message && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-primary">{lead.message}</p>
                        </div>
                      )}

                      {lead.phone && (
                        <p className="text-sm text-muted-foreground">
                          📞 {lead.phone}
                        </p>
                      )}
                    </div>

                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(`mailto:${lead.email}`, '_blank')}
                      disabled={!lead.email}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Reply
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}