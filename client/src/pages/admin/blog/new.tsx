import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { FileUpload } from "@/components/ui/file-upload";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { AnimationPreview } from "@/components/ui/animation-preview";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Eye, Globe, ImageIcon } from "lucide-react";

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
  const [uploadedMedia, setUploadedMedia] = useState<Array<{id: string, name: string, url: string, type: string, size: number}>>([]);

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
                  <RichTextEditor
                    value={post.content}
                    onChange={(content) => setPost(prev => ({ ...prev, content }))}
                    placeholder="Write your blog post content here... Use the toolbar to format text and add animations!"
                    className="min-h-[400px]"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Tip: Select text and use the Animations button to add visual effects like fade-in, bounce, and shimmer.
                  </p>
                </div>

                <Card className="p-4 bg-muted/50">
                  <div className="flex items-center gap-2 mb-3">
                    <ImageIcon className="h-4 w-4" />
                    <label className="text-sm font-medium text-primary">
                      Media Gallery
                    </label>
                  </div>
                  <FileUpload
                    accept="image/*,video/*"
                    multiple={true}
                    maxFiles={10}
                    maxSize={10}
                    onUpload={(files) => {
                      setUploadedMedia(prev => [...prev, ...files]);
                    }}
                    onRemove={(fileId) => {
                      setUploadedMedia(prev => prev.filter(f => f.id !== fileId));
                    }}
                    initialFiles={uploadedMedia}
                    showPreview={true}
                  />
                  {uploadedMedia.length > 0 && (
                    <div className="mt-4 p-3 bg-background rounded border">
                      <p className="text-sm font-medium mb-2">Copy markdown to insert:</p>
                      <div className="space-y-1 text-xs font-mono">
                        {uploadedMedia.map((file) => (
                          <div key={file.id} className="flex items-center justify-between">
                            <span className="text-muted-foreground">
                              {file.type.startsWith('image/') ? 
                                `![${file.name}](${file.url})` : 
                                `[${file.name}](${file.url})`
                              }
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const markdown = file.type.startsWith('image/') ? 
                                  `![${file.name}](${file.url})` : 
                                  `[${file.name}](${file.url})`;
                                navigator.clipboard.writeText(markdown);
                                toast({
                                  title: "Copied!",
                                  description: "Markdown code copied to clipboard",
                                });
                              }}
                              data-testid={`button-copy-${file.id}`}
                            >
                              Copy
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
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

            {/* Animation Preview */}
            <AnimationPreview />
          </div>
        </div>
      </div>
    </div>
  );
}