import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, CheckCircle, Circle, BookOpen, ExternalLink } from 'lucide-react';

const setupTasks = [
  {
    id: 'content',
    title: 'Add Your Content',
    description: 'Update services, testimonials, and company information',
    category: 'Essential',
    steps: [
      'Go to Admin → Services and update your service offerings',
      'Add client testimonials in Admin → Content',
      'Update company stats and achievements',
      'Upload your logo and brand images'
    ]
  },
  {
    id: 'analytics',
    title: 'Set Up Analytics',
    description: 'Track visitors and measure performance',
    category: 'Recommended',
    steps: [
      'Get your Google Analytics 4 Measurement ID',
      'Add it to your environment variables as VITE_GA_MEASUREMENT_ID',
      'Test tracking on a few pages',
      'Set up conversion goals for contact forms'
    ]
  },
  {
    id: 'seo',
    title: 'Optimize for Search',
    description: 'Help people find your website online',
    category: 'Important',
    steps: [
      'Update meta descriptions for each page',
      'Create your first blog post for SEO',
      'Submit your sitemap to Google Search Console',
      'Set up Google My Business if applicable'
    ]
  },
  {
    id: 'contact',
    title: 'Test Contact Forms',
    description: 'Ensure leads can reach you',
    category: 'Essential',
    steps: [
      'Fill out and submit your contact form',
      'Check that emails are being received',
      'Set up auto-responders if needed',
      'Test on mobile devices'
    ]
  },
  {
    id: 'domain',
    title: 'Connect Custom Domain',
    description: 'Use your own domain name',
    category: 'Recommended',
    steps: [
      'Purchase your domain from a registrar',
      'Configure DNS settings in Replit Deployments',
      'Set up SSL certificate (automatic)',
      'Test domain redirect and www/non-www preferences'
    ]
  },
  {
    id: 'backup',
    title: 'Create Backup Plan',
    description: 'Protect your content and settings',
    category: 'Important',
    steps: [
      'Export your current content as backup',
      'Document your environment variables',
      'Set up regular backup reminders',
      'Test the restore process'
    ]
  }
];

export function QuickSetupGuide() {
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [expandedTask, setExpandedTask] = useState<string | null>(null);

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const toggleExpand = (taskId: string) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  const getProgressPercentage = () => {
    const essentialTasks = setupTasks.filter(t => t.category === 'Essential');
    const completedEssential = essentialTasks.filter(t => completedTasks.includes(t.id));
    return Math.round((completedEssential.length / essentialTasks.length) * 100);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Essential': return 'bg-red-100 text-red-800';
      case 'Important': return 'bg-orange-100 text-orange-800';
      case 'Recommended': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          <h3 className="text-lg font-semibold">Website Setup Guide</h3>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{getProgressPercentage()}%</div>
          <div className="text-xs text-muted-foreground">Essential tasks complete</div>
        </div>
      </div>

      <div className="mb-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4 border">
        <h4 className="font-medium text-blue-900 mb-2">🎉 Welcome to Your New Website!</h4>
        <p className="text-sm text-blue-800 mb-3">
          Follow this checklist to get your website ready for visitors. Start with Essential tasks first.
        </p>
        <div className="w-full bg-blue-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-3">
        {setupTasks.map((task) => (
          <div key={task.id} className="border rounded-lg">
            <div 
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50"
              onClick={() => toggleExpand(task.id)}
            >
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={completedTasks.includes(task.id)}
                  onCheckedChange={() => toggleTask(task.id)}
                  onClick={(e) => e.stopPropagation()}
                />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{task.title}</h4>
                    <Badge className={getCategoryColor(task.category)} variant="outline">
                      {task.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{task.description}</p>
                </div>
              </div>
              <ChevronRight 
                className={`w-5 h-5 text-muted-foreground transition-transform ${
                  expandedTask === task.id ? 'rotate-90' : ''
                }`}
              />
            </div>
            
            {expandedTask === task.id && (
              <div className="px-4 pb-4 border-t bg-muted/20">
                <div className="pt-4">
                  <h5 className="font-medium mb-3">Steps to complete:</h5>
                  <ol className="space-y-2 list-decimal list-inside text-sm">
                    {task.steps.map((step, index) => (
                      <li key={index} className="text-muted-foreground">{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {completedTasks.length} of {setupTasks.length} tasks completed
          </div>
          <Button variant="outline" size="sm">
            <ExternalLink className="w-4 h-4 mr-2" />
            View Full Documentation
          </Button>
        </div>
      </div>
    </Card>
  );
}