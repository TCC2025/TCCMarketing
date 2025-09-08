import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Eye, Globe } from "lucide-react";

export default function NewBlogPost() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
    readTime: "",
    isPublished: false
  });

  const categories = [
    "Employer Branding",
    "Recruitment Marketing", 
    "AI & Automation",
    "Talent Strategy",
    "Executive Insights",
    "Industry Trends"
  ];

  const handleSave = async (publish = false) => {
    setIsLoading(true);
    
    try {
      const postData = {
        ...post,
        slug: post.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        tags: post.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        isPublished: publish,
        publishedAt: publish ? new Date().toISOString() : null
      };

      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: JSON.stringify(postData)
      });

      if (response.ok) {
        toast({
          title: publish ? "Post Published!" : "Draft Saved!",
          description: publish ? "Your blog post is now live." : "Your draft has been saved.",
        });
        setLocation('/admin/dashboard');
      } else {
        throw new Error('Failed to save post');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save blog post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
                New Blog Post
              </h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                onClick={() => handleSave(false)}
                disabled={isLoading}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button 
                onClick={() => handleSave(true)}
                disabled={isLoading || !post.title || !post.content}
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Globe className="w-4 h-4 mr-2" />
                Publish
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-primary mb-2 block">
                    Post Title *
                  </label>
                  <Input
                    placeholder="Enter your blog post title..."
                    value={post.title}
                    onChange={(e) => setPost(prev => ({ ...prev, title: e.target.value }))}
                    className="text-lg"
                    data-testid="input-title"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-primary mb-2 block">
                    Excerpt
                  </label>
                  <Textarea
                    placeholder="Brief description for SEO and social sharing..."
                    value={post.excerpt}
                    onChange={(e) => setPost(prev => ({ ...prev, excerpt: e.target.value }))}
                    rows={3}
                    data-testid="textarea-excerpt"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-primary mb-2 block">
                    Content *
                  </label>
                  <Textarea
                    placeholder="Write your blog post content here... (Supports Markdown)"
                    value={post.content}
                    onChange={(e) => setPost(prev => ({ ...prev, content: e.target.value }))}
                    rows={20}
                    className="font-mono"
                    data-testid="textarea-content"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Tip: You can use Markdown formatting for headers, links, lists, and more.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-playfair text-lg font-bold text-primary mb-4">
                Post Settings
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-primary mb-2 block">
                    Category
                  </label>
                  <Select value={post.category} onValueChange={(value) => setPost(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger data-testid="select-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-primary mb-2 block">
                    Tags
                  </label>
                  <Input
                    placeholder="tag1, tag2, tag3"
                    value={post.tags}
                    onChange={(e) => setPost(prev => ({ ...prev, tags: e.target.value }))}
                    data-testid="input-tags"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Separate tags with commas
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-primary mb-2 block">
                    Read Time
                  </label>
                  <Input
                    placeholder="5 min read"
                    value={post.readTime}
                    onChange={(e) => setPost(prev => ({ ...prev, readTime: e.target.value }))}
                    data-testid="input-read-time"
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-playfair text-lg font-bold text-primary mb-4">
                SEO Preview
              </h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-blue-600">
                    {post.title || "Your Blog Post Title"}
                  </p>
                  <p className="text-xs text-green-600">
                    thecollectivebythompson.com/blog/{post.title.toLowerCase().replace(/\s+/g, '-') || 'post-slug'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {post.excerpt || "Your post excerpt will appear here..."}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}