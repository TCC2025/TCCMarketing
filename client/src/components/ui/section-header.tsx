interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  showDivider?: boolean;
}

export default function SectionHeader({ 
  title, 
  subtitle, 
  className = "", 
  showDivider = true 
}: SectionHeaderProps) {
  return (
    <div className={`text-center ${className}`}>
      {showDivider && <div className="section-divider mb-6"></div>}
      <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xl text-secondary max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
