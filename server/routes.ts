import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertServiceSchema, insertCaseStudySchema, insertBlogPostSchema, 
  insertTestimonialSchema, insertLeadSchema, insertStatSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Services API
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch services" });
    }
  });

  app.get("/api/services/:slug", async (req, res) => {
    try {
      const service = await storage.getService(req.params.slug);
      if (!service) {
        return res.status(404).json({ error: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch service" });
    }
  });

  app.post("/api/services", async (req, res) => {
    try {
      const validatedData = insertServiceSchema.parse(req.body);
      const service = await storage.createService(validatedData);
      res.status(201).json(service);
    } catch (error) {
      res.status(400).json({ error: "Invalid service data", details: error });
    }
  });

  app.put("/api/services/:slug", async (req, res) => {
    try {
      const validatedData = insertServiceSchema.partial().parse(req.body);
      const service = await storage.updateService(req.params.slug, validatedData);
      if (!service) {
        return res.status(404).json({ error: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      res.status(400).json({ error: "Invalid service data", details: error });
    }
  });

  // Case Studies API
  app.get("/api/case-studies", async (req, res) => {
    try {
      const caseStudies = await storage.getCaseStudies();
      res.json(caseStudies);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch case studies" });
    }
  });

  app.get("/api/case-studies/:slug", async (req, res) => {
    try {
      const caseStudy = await storage.getCaseStudy(req.params.slug);
      if (!caseStudy) {
        return res.status(404).json({ error: "Case study not found" });
      }
      res.json(caseStudy);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch case study" });
    }
  });

  app.post("/api/case-studies", async (req, res) => {
    try {
      const validatedData = insertCaseStudySchema.parse(req.body);
      const caseStudy = await storage.createCaseStudy(validatedData);
      res.status(201).json(caseStudy);
    } catch (error) {
      res.status(400).json({ error: "Invalid case study data", details: error });
    }
  });

  app.put("/api/case-studies/:slug", async (req, res) => {
    try {
      const validatedData = insertCaseStudySchema.partial().parse(req.body);
      const caseStudy = await storage.updateCaseStudy(req.params.slug, validatedData);
      if (!caseStudy) {
        return res.status(404).json({ error: "Case study not found" });
      }
      res.json(caseStudy);
    } catch (error) {
      res.status(400).json({ error: "Invalid case study data", details: error });
    }
  });

  // Blog Posts API
  app.get("/api/blog", async (req, res) => {
    try {
      const blogPosts = await storage.getPublishedBlogPosts();
      res.json(blogPosts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const blogPost = await storage.getBlogPost(req.params.slug);
      if (!blogPost) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(blogPost);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  app.post("/api/blog", async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const blogPost = await storage.createBlogPost(validatedData);
      res.status(201).json(blogPost);
    } catch (error) {
      res.status(400).json({ error: "Invalid blog post data", details: error });
    }
  });

  app.put("/api/blog/:slug", async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.partial().parse(req.body);
      const blogPost = await storage.updateBlogPost(req.params.slug, validatedData);
      if (!blogPost) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(blogPost);
    } catch (error) {
      res.status(400).json({ error: "Invalid blog post data", details: error });
    }
  });

  // Testimonials API
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getActiveTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  app.post("/api/testimonials", async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validatedData);
      res.status(201).json(testimonial);
    } catch (error) {
      res.status(400).json({ error: "Invalid testimonial data", details: error });
    }
  });

  // Stats API
  app.get("/api/stats", async (req, res) => {
    try {
      const stats = await storage.getActiveStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  app.post("/api/stats", async (req, res) => {
    try {
      const validatedData = insertStatSchema.parse(req.body);
      const stat = await storage.createStat(validatedData);
      res.status(201).json(stat);
    } catch (error) {
      res.status(400).json({ error: "Invalid stat data", details: error });
    }
  });

  app.put("/api/stats/:id", async (req, res) => {
    try {
      const validatedData = insertStatSchema.partial().parse(req.body);
      const stat = await storage.updateStat(req.params.id, validatedData);
      if (!stat) {
        return res.status(404).json({ error: "Stat not found" });
      }
      res.json(stat);
    } catch (error) {
      res.status(400).json({ error: "Invalid stat data", details: error });
    }
  });

  // Lead Management API
  app.post("/api/leads", async (req, res) => {
    try {
      const validatedData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(validatedData);
      res.status(201).json({ success: true, message: "Lead captured successfully" });
    } catch (error) {
      res.status(400).json({ error: "Invalid lead data", details: error });
    }
  });

  app.get("/api/leads", async (req, res) => {
    try {
      const leads = await storage.getLeads();
      res.json(leads);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch leads" });
    }
  });

  app.get("/api/leads/:type", async (req, res) => {
    try {
      const leads = await storage.getLeadsByType(req.params.type);
      res.json(leads);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch leads" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
