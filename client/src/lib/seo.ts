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
    title: "The Collective by Thompson & Co - Modern Solutions for a Dynamic World",
    description: "The Collective by Thompson & Co provides modern solutions for employer branding, recruitment marketing, and AI-driven automation in today's dynamic business landscape.",
    keywords: ["employer branding", "recruitment marketing", "AI marketing automation", "talent acquisition", "executive branding", "modern solutions"]
  },
  services: {
    title: "Our Services - The Collective by Thompson & Co",
    description: "Comprehensive employer branding, AI marketing automation, and executive branding services designed to transform your talent acquisition strategy for the modern world.",
    keywords: ["employer branding services", "AI recruitment marketing", "executive branding", "talent marketing", "modern solutions"]
  },
  caseStudies: {
    title: "Case Studies - The Collective by Thompson & Co",
    description: "Real results from our partnerships with industry-leading organizations. See how we've transformed talent acquisition strategies and delivered measurable outcomes.",
    keywords: ["employer branding case studies", "recruitment marketing results", "talent acquisition success stories"]
  },
  blog: {
    title: "Blog - The Collective by Thompson & Co",
    description: "Expert insights on talent acquisition, employer branding, AI in recruitment, and modern business solutions. Stay ahead with our thought leadership.",
    keywords: ["talent acquisition blog", "employer branding insights", "recruitment marketing trends", "AI in recruiting", "business solutions"]
  },
  insights: {
    title: "Insights & Thought Leadership - The Collective by Thompson & Co", 
    description: "Expert perspectives on the future of talent acquisition, employer branding, AI in recruitment, and strategic leadership insights from The Collective by Thompson & Co.",
    keywords: ["talent acquisition insights", "employer branding trends", "recruitment marketing best practices", "AI in recruiting"]
  },
  about: {
    title: "About Us - The Collective by Thompson & Co",
    description: "Learn about The Collective by Thompson & Co's mission to provide modern solutions for employer branding and talent acquisition in today's dynamic world.",
    keywords: ["about The Collective", "employer branding consultancy", "talent acquisition experts", "modern solutions"]
  },
  contact: {
    title: "Contact Us - The Collective by Thompson & Co", 
    description: "Ready to transform your talent strategy? Get in touch with The Collective by Thompson & Co for modern solutions in employer branding and recruitment marketing.",
    keywords: ["contact talent consultants", "employer branding consultation", "recruitment marketing experts"]
  }
};
