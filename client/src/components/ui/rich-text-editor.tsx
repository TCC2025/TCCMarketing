import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  List,
  ListOrdered,
  Link,
  Image,
  Sparkles,
  Zap,
  RotateCcw,
  Move3D
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const animationOptions = [
  { value: 'fadeIn', label: 'Fade In', class: 'animate-fade-in' },
  { value: 'slideIn', label: 'Slide In', class: 'animate-slide-in' },
  { value: 'bounce', label: 'Bounce', class: 'animate-bounce-in' },
  { value: 'pulse', label: 'Pulse', class: 'animate-pulse-gentle' },
  { value: 'wiggle', label: 'Wiggle', class: 'animate-wiggle' },
  { value: 'float', label: 'Float', class: 'animate-float' },
  { value: 'glow', label: 'Glow', class: 'animate-glow' },
  { value: 'typewriter', label: 'Typewriter', class: 'animate-typewriter' },
  { value: 'shimmer', label: 'Shimmer', class: 'animate-shimmer' }
];

export function RichTextEditor({ value, onChange, placeholder, className }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showAnimations, setShowAnimations] = useState(false);

  const execCommand = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  }, []);

  const insertAnimation = useCallback((animationType: string, animationClass: string) => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedText = range.toString();
      
      if (selectedText) {
        const animatedSpan = document.createElement('span');
        animatedSpan.className = `${animationClass} inline-block`;
        animatedSpan.textContent = selectedText;
        animatedSpan.setAttribute('data-animation', animationType);
        
        range.deleteContents();
        range.insertNode(animatedSpan);
        
        // Clear selection
        selection.removeAllRanges();
        
        // Update value
        if (editorRef.current) {
          onChange(editorRef.current.innerHTML);
        }
      }
    }
    setShowAnimations(false);
  }, [onChange]);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const insertImage = useCallback(() => {
    const url = prompt('Enter image URL:');
    if (url) {
      execCommand('insertImage', url);
    }
  }, [execCommand]);

  const insertLink = useCallback(() => {
    const url = prompt('Enter URL:');
    if (url) {
      execCommand('createLink', url);
    }
  }, [execCommand]);

  return (
    <div className={`border rounded-lg overflow-hidden ${className}`}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-muted/50">
        {/* Text Formatting */}
        <div className="flex items-center gap-1 border-r pr-2 mr-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand('bold')}
            data-testid="button-bold"
          >
            <Bold className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand('italic')}
            data-testid="button-italic"
          >
            <Italic className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand('underline')}
            data-testid="button-underline"
          >
            <Underline className="w-4 h-4" />
          </Button>
        </div>

        {/* Alignment */}
        <div className="flex items-center gap-1 border-r pr-2 mr-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand('justifyLeft')}
            data-testid="button-align-left"
          >
            <AlignLeft className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand('justifyCenter')}
            data-testid="button-align-center"
          >
            <AlignCenter className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand('justifyRight')}
            data-testid="button-align-right"
          >
            <AlignRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Lists */}
        <div className="flex items-center gap-1 border-r pr-2 mr-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand('insertUnorderedList')}
            data-testid="button-bullet-list"
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand('insertOrderedList')}
            data-testid="button-number-list"
          >
            <ListOrdered className="w-4 h-4" />
          </Button>
        </div>

        {/* Media & Links */}
        <div className="flex items-center gap-1 border-r pr-2 mr-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={insertLink}
            data-testid="button-insert-link"
          >
            <Link className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={insertImage}
            data-testid="button-insert-image"
          >
            <Image className="w-4 h-4" />
          </Button>
        </div>

        {/* Animations */}
        <Popover open={showAnimations} onOpenChange={setShowAnimations}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              data-testid="button-animations"
            >
              <Sparkles className="w-4 h-4" />
              <span className="ml-1 text-xs">Animations</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <h4 className="font-medium">Add Animation</h4>
              <p className="text-sm text-muted-foreground">
                Select text first, then choose an animation effect.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {animationOptions.map((animation) => (
                  <Button
                    key={animation.value}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => insertAnimation(animation.value, animation.class)}
                    className="justify-start"
                  >
                    {animation.value === 'bounce' && <Zap className="w-3 h-3 mr-1" />}
                    {animation.value === 'pulse' && <RotateCcw className="w-3 h-3 mr-1" />}
                    {animation.value === 'float' && <Move3D className="w-3 h-3 mr-1" />}
                    {!['bounce', 'pulse', 'float'].includes(animation.value) && <Sparkles className="w-3 h-3 mr-1" />}
                    {animation.label}
                  </Button>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="min-h-[300px] p-4 focus:outline-none"
        style={{ minHeight: '300px' }}
        dangerouslySetInnerHTML={{ __html: value }}
        data-testid="rich-text-editor"
        suppressContentEditableWarning={true}
      />
      
      {placeholder && !value && (
        <div className="absolute top-16 left-4 text-muted-foreground pointer-events-none">
          {placeholder}
        </div>
      )}
    </div>
  );
}