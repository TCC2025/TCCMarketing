import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import path from "path";
import { storage } from "./storage";
import { 
  insertServiceSchema, insertCaseStudySchema, insertBlogPostSchema, 
  insertTestimonialSchema, insertLeadSchema, insertStatSchema,
  insertMediaFileSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoints
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.get('/api/health/database', async (req, res) => {
    try {
      // Test database connection by fetching services
      const services = await storage.getServices();
      res.json({ 
        status: 'ok', 
        database: 'connected',
        servicesCount: services.length 
      });
    } catch (error) {
      res.status(500).json({ 
        status: 'error', 
        database: 'disconnected',
        error: 'Database connection failed' 
      });
    }
  });

  // Configure multer for file uploads
  const upload = multer({
    dest: 'public/uploads/',
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB limit
    },
    fileFilter: (req, file, cb) => {
      const allowedTypes = [
        'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif',
        'video/mp4', 'video/webm', 'video/mov'
      ];
      
      if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type. Only images and videos are allowed.'));
      }
    }
  });

  // File Upload API
  app.post("/api/upload", upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const file = req.file;
      const fileExtension = path.extname(file.originalname);
      const fileName = `${file.filename}${fileExtension}`;
      const fileUrl = `/uploads/${fileName}`;

      // Rename file to include extension
      const oldPath = file.path;
      const newPath = path.join('public/uploads/', fileName);
      
      // Move file to final location with proper extension
      require('fs').renameSync(oldPath, newPath);

      // Save file info to database
      const mediaFileData = {
        fileName: fileName,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        url: fileUrl
      };

      const validatedData = insertMediaFileSchema.parse(mediaFileData);
      const mediaFile = await storage.createMediaFile(validatedData);

      res.json({
        id: mediaFile.id,
        url: fileUrl,
        fileName: fileName,
        originalName: file.originalname,
        size: file.size,
        type: file.mimetype
      });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: "Failed to upload file" });
    }
  });

  // Get uploaded files
  app.get("/api/media", async (req, res) => {
    try {
      const mediaFiles = await storage.getMediaFiles();
      res.json(mediaFiles);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch media files" });
    }
  });

  // Delete uploaded file
  app.delete("/api/media/:id", async (req, res) => {
    try {
      const mediaFile = await storage.getMediaFile(req.params.id);
      if (!mediaFile) {
        return res.status(404).json({ error: "File not found" });
      }

      // Delete file from filesystem
      const filePath = path.join('public', mediaFile.url);
      try {
        require('fs').unlinkSync(filePath);
      } catch (fsError) {
        console.warn('Could not delete file from filesystem:', fsError);
      }

      // Delete from database
      await storage.deleteMediaFile(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error('Delete error:', error);
      res.status(500).json({ error: "Failed to delete file" });
    }
  });

  // Admin Authentication
  app.post("/api/admin/login", async (req, res) => {
    const { username, password } = req.body;
    
    // Simple admin auth (you can enhance this later)
    if (username === "admin" && password === "admin123") {
      const token = "admin_" + Date.now(); // Simple token for demo
      res.json({ token, message: "Login successful" });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  // Admin middleware for protected routes
  const adminAuth = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer admin_')) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    next();
  };
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
