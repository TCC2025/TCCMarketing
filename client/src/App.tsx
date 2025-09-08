import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorBoundary } from "@/components/error-boundary";
import { useEffect } from "react";
import { initGA } from "./lib/analytics";
import { useAnalytics } from "./hooks/useAnalytics";
import { preloadCriticalResources } from "@/lib/performance";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Services from "@/pages/services";
import CaseStudies from "@/pages/case-studies";
import Insights from "@/pages/insights";
import Blog from "@/pages/blog";
import BrandColors from "@/pages/brand-colors";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";
import NewBlogPost from "@/pages/admin/blog/new";
import ServicesAdmin from "@/pages/admin/services";
import LeadsAdmin from "@/pages/admin/leads";
import ContentAdmin from "@/pages/admin/content";

function Router() {
  // Track page views when routes change
  useAnalytics();
  
  return (
    <Switch>
      {/* Admin Routes - No header/footer */}
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/blog/new" component={NewBlogPost} />
      <Route path="/admin/services" component={ServicesAdmin} />
      <Route path="/admin/leads" component={LeadsAdmin} />
      <Route path="/admin/content" component={ContentAdmin} />
      
      {/* Public Routes - With header/footer */}
      <Route>
        <Header />
        <main id="main-content">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/services" component={Services} />
            <Route path="/case-studies" component={CaseStudies} />
            <Route path="/insights" component={Insights} />
            <Route path="/blog" component={Blog} />
            <Route path="/brand-colors" component={BrandColors} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer />
      </Route>
    </Switch>
  );
}

function App() {
  // Initialize Google Analytics and performance optimizations when app loads
  useEffect(() => {
    // Verify required environment variable is present
    if (!import.meta.env.VITE_GA_MEASUREMENT_ID) {
      console.warn('Missing required Google Analytics key: VITE_GA_MEASUREMENT_ID');
    } else {
      initGA();
    }

    // Preload critical resources for better performance
    preloadCriticalResources();
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="min-h-screen bg-background text-foreground">
            <Toaster />
            <Router />
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
