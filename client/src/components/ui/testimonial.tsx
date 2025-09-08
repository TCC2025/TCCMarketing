import { User } from "lucide-react";

interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  className?: string;
}

export default function Testimonial({ quote, name, title, className = "" }: TestimonialProps) {
  return (
    <div className={`bg-background p-8 rounded-xl border border-border ${className}`} data-testid={`testimonial-${name.replace(/\s+/g, '').toLowerCase()}`}>
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mr-4">
          <User className="w-6 h-6 text-accent-foreground" />
        </div>
        <div>
          <h4 className="font-semibold text-primary">{name}</h4>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </div>
      <blockquote className="text-lg text-secondary leading-relaxed italic">
        "{quote}"
      </blockquote>
    </div>
  );
}
