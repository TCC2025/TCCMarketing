// Define the gtag function globally
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// Initialize Google Analytics
export const initGA = () => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  if (!measurementId) {
    console.warn('Missing required Google Analytics key: VITE_GA_MEASUREMENT_ID');
    return;
  }

  // Add Google Analytics script to the head
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script1);

  // Initialize gtag
  const script2 = document.createElement('script');
  script2.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}');
  `;
  document.head.appendChild(script2);
};

// Track page views - useful for single-page applications
export const trackPageView = (url: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!measurementId) return;
  
  window.gtag('config', measurementId, {
    page_path: url
  });
};

// Track events
export const trackEvent = (
  action: string, 
  category?: string, 
  label?: string, 
  value?: number
) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Track form submissions
export const trackFormSubmission = (formType: string, source?: string) => {
  trackEvent('form_submit', 'engagement', formType, 1);
  
  // Track as conversion
  window.gtag && window.gtag('event', 'conversion', {
    send_to: import.meta.env.VITE_GA_MEASUREMENT_ID,
    event_category: 'lead_generation',
    event_label: formType,
    custom_parameter: source
  });
};

// Track CTA clicks
export const trackCTAClick = (ctaName: string, location: string) => {
  trackEvent('cta_click', 'engagement', `${ctaName}_${location}`, 1);
};

// Track blog post engagement
export const trackBlogEngagement = (action: string, postTitle: string, category?: string) => {
  trackEvent(action, 'blog_engagement', postTitle, 1);
  
  if (category) {
    trackEvent(action, 'blog_category', category, 1);
  }
};

// Track service interest
export const trackServiceInterest = (serviceName: string, action: string) => {
  trackEvent('service_interest', 'services', `${serviceName}_${action}`, 1);
};