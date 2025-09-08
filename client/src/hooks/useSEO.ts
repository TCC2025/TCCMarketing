import { useEffect } from 'react';
import { updateSEO, SEOData } from '@/lib/seo';

export function useSEO(seoData: SEOData) {
  useEffect(() => {
    updateSEO(seoData);
  }, [seoData]);
}

