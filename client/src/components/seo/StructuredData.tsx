import { useEffect } from 'react';

interface StructuredDataProps {
  data: any;
  id?: string;
}

export function StructuredData({ data, id = 'structured-data' }: StructuredDataProps) {
  useEffect(() => {
    // Remove existing structured data with the same ID
    const existing = document.getElementById(id);
    if (existing) {
      existing.remove();
    }
    
    // Create new structured data script
    const script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      ...data
    });
    
    document.head.appendChild(script);
    
    // Cleanup function
    return () => {
      const scriptToRemove = document.getElementById(id);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [data, id]);
  
  return null; // This component doesn't render anything
}