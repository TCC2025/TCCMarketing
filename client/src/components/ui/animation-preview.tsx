import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, RotateCcw } from 'lucide-react';

const animationExamples = [
  {
    name: 'Fade In',
    class: 'animate-fade-in',
    description: 'Smooth opacity transition',
    demo: 'This text fades in smoothly'
  },
  {
    name: 'Slide In',
    class: 'animate-slide-in', 
    description: 'Slides from left with fade',
    demo: 'This text slides in from the left'
  },
  {
    name: 'Bounce In',
    class: 'animate-bounce-in',
    description: 'Bouncy entrance effect',
    demo: 'This text bounces into view'
  },
  {
    name: 'Pulse',
    class: 'animate-pulse-gentle',
    description: 'Gentle pulsing effect',
    demo: 'This text pulses gently'
  },
  {
    name: 'Wiggle',
    class: 'animate-wiggle',
    description: 'Quick wiggle animation',
    demo: 'This text wiggles playfully'
  },
  {
    name: 'Float',
    class: 'animate-float',
    description: 'Floating up and down',
    demo: 'This text floats gracefully'
  },
  {
    name: 'Glow',
    class: 'animate-glow',
    description: 'Glowing text effect',
    demo: 'This text has a mystical glow'
  },
  {
    name: 'Shimmer',
    class: 'animate-shimmer',
    description: 'Shimmering gradient effect',
    demo: 'This text shimmers with color'
  }
];

export function AnimationPreview() {
  const [activeAnimation, setActiveAnimation] = useState<string | null>(null);
  const [key, setKey] = useState(0);

  const triggerAnimation = (animationClass: string) => {
    setActiveAnimation(animationClass);
    setKey(prev => prev + 1);
    
    // Reset after animation completes
    setTimeout(() => {
      setActiveAnimation(null);
    }, 2000);
  };

  const resetAll = () => {
    setActiveAnimation(null);
    setKey(prev => prev + 1);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Animation Preview</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={resetAll}
          className="flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reset All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {animationExamples.map((animation) => (
          <div key={animation.name} className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Badge variant="outline" className="mb-1">
                  {animation.name}
                </Badge>
                <p className="text-xs text-muted-foreground">
                  {animation.description}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => triggerAnimation(animation.class)}
                className="flex items-center gap-1"
              >
                <Play className="w-3 h-3" />
                Play
              </Button>
            </div>
            
            <div className="border rounded p-4 bg-muted/20 min-h-[60px] flex items-center justify-center">
              <span
                key={`${animation.name}-${key}`}
                className={`
                  font-medium text-center
                  ${activeAnimation === animation.class ? animation.class : ''}
                `}
              >
                {animation.demo}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-medium text-blue-900 mb-2">How to Use in Blog Posts</h4>
        <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
          <li>Select the text you want to animate in the editor</li>
          <li>Click the "Animations" button in the toolbar</li>
          <li>Choose your desired animation effect</li>
          <li>The animation will be applied to your selected text</li>
          <li>Preview your post to see the animations in action</li>
        </ol>
      </div>
    </Card>
  );
}