export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

export function updateSEO(seoData: SEOData) {
  // Update page title
  document.title = seoData.title;

  // Update or create meta description
  updateOrCreateMetaTag('name', 'description', seoData.description);

  // Update or create keywords meta tag
  if (seoData.keywords) {
    updateOrCreateMetaTag('name', 'keywords', seoData.keywords.join(', '));
  }

  // Update Open Graph tags
  updateOrCreateMetaTag('property', 'og:title', seoData.title);
  updateOrCreateMetaTag('property', 'og:description', seoData.description);
  if (seoData.ogImage) {
    updateOrCreateMetaTag('property', 'og:image', seoData.ogImage);
  }

  // Update Twitter Card tags
  updateOrCreateMetaTag('name', 'twitter:title', seoData.title);
  updateOrCreateMetaTag('name', 'twitter:description', seoData.description);
  if (seoData.ogImage) {
    updateOrCreateMetaTag('name', 'twitter:image', seoData.ogImage);
  }

  // Update canonical URL
  if (seoData.canonicalUrl) {
    updateOrCreateLinkTag('canonical', seoData.canonicalUrl);
  }
}

function updateOrCreateMetaTag(attribute: string, attributeValue: string, content: string) {
  let element = document.querySelector(`meta[${attribute}="${attributeValue}"]`);
  
  if (element) {
    element.setAttribute('content', content);
  } else {
    element = document.createElement('meta');
    element.setAttribute(attribute, attributeValue);
    element.setAttribute('content', content);
    document.head.appendChild(element);
  }
}

function updateOrCreateLinkTag(rel: string, href: string) {
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
  
  if (element) {
    element.href = href;
  } else {
    element = document.createElement('link');
    element.rel = rel;
    element.href = href;
    document.head.appendChild(element);
  }
}

// Page-specific SEO data
export const seoData = {
  home: {
    title: "Thompson & Co. Collective - Where Strategy Meets Extraordinary Outcomes",
    description: "Boutique consultancy specializing in employer branding, recruitment marketing, AI-driven marketing automation, and fractional CMO services that transform talent acquisition.",
    keywords: ["employer branding", "recruitment marketing", "AI marketing automation", "fractional CMO", "talent acquisition", "executive branding"]
  },
  services: {
    title: "Our Services - Thompson & Co. Collective",
    description: "Comprehensive employer branding, AI marketing automation, fractional CMO, and executive branding services designed to transform your talent acquisition strategy.",
    keywords: ["employer branding services", "AI recruitment marketing", "fractional CMO services", "executive branding", "talent marketing"]
  },
  caseStudies: {
    title: "Case Studies - Thompson & Co. Collective",
    description: "Real results from our partnerships with industry-leading organizations. See how we've transformed talent acquisition strategies and delivered measurable outcomes.",
    keywords: ["employer branding case studies", "recruitment marketing results", "talent acquisition success stories"]
  },
  insights: {
    title: "Insights & Thought Leadership - Thompson & Co. Collective",
    description: "Expert perspectives on the future of talent acquisition, employer branding, AI in recruitment, and strategic leadership insights from Thompson & Co. Collective.",
    keywords: ["talent acquisition insights", "employer branding trends", "recruitment marketing best practices", "AI in recruiting"]
  },
  about: {
    title: "About Us - Thompson & Co. Collective",
    description: "Learn about Thompson & Co. Collective's mission to transform talent acquisition through strategic employer branding, innovative marketing, and fractional leadership services.",
    keywords: ["about Thompson Co Collective", "employer branding consultancy", "talent acquisition experts"]
  },
  contact: {
    title: "Contact Us - Thompson & Co. Collective",
    description: "Ready to transform your talent strategy? Get in touch with Thompson & Co. Collective for a consultation on employer branding, recruitment marketing, and fractional CMO services.",
    keywords: ["contact talent consultants", "employer branding consultation", "recruitment marketing experts"]
  }
};
