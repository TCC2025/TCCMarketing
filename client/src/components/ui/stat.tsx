interface StatProps {
  value: string;
  description: string;
  className?: string;
}

export default function Stat({ value, description, className = "" }: StatProps) {
  return (
    <div className={`text-center ${className}`} data-testid={`stat-${value.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()}`}>
      <div className="font-playfair text-5xl font-bold text-accent mb-2">
        {value}
      </div>
      <p className="text-lg text-secondary">
        {description}
      </p>
    </div>
  );
}
