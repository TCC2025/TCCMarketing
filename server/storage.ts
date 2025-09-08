import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { and, eq } from "drizzle-orm";
import { 
  type User, type InsertUser,
  type Service, type InsertService,
  type CaseStudy, type InsertCaseStudy,
  type BlogPost, type InsertBlogPost,
  type Testimonial, type InsertTestimonial,
  type Lead, type InsertLead,
  type Stat, type InsertStat,
  users, services, caseStudies, blogPosts, testimonials, leads, stats
} from "@shared/schema";

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client);

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Service methods
  getServices(): Promise<Service[]>;
  getService(slug: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(slug: string, service: Partial<InsertService>): Promise<Service | undefined>;

  // Case Study methods
  getCaseStudies(): Promise<CaseStudy[]>;
  getCaseStudy(slug: string): Promise<CaseStudy | undefined>;
  createCaseStudy(caseStudy: InsertCaseStudy): Promise<CaseStudy>;
  updateCaseStudy(slug: string, caseStudy: Partial<InsertCaseStudy>): Promise<CaseStudy | undefined>;

  // Blog Post methods
  getBlogPosts(): Promise<BlogPost[]>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(slug: string, blogPost: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;

  // Testimonial methods
  getTestimonials(): Promise<Testimonial[]>;
  getActiveTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;

  // Lead methods
  createLead(lead: InsertLead): Promise<Lead>;
  getLeads(): Promise<Lead[]>;
  getLeadsByType(formType: string): Promise<Lead[]>;

  // Stats methods
  getStats(): Promise<Stat[]>;
  getActiveStats(): Promise<Stat[]>;
  createStat(stat: InsertStat): Promise<Stat>;
  updateStat(id: string, stat: Partial<InsertStat>): Promise<Stat | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  // Service methods
  async getServices(): Promise<Service[]> {
    return db.select().from(services).where(eq(services.isActive, true));
  }

  async getService(slug: string): Promise<Service | undefined> {
    const result = await db.select().from(services).where(eq(services.slug, slug));
    return result[0];
  }

  async createService(service: InsertService): Promise<Service> {
    const result = await db.insert(services).values([service]).returning();
    return result[0];
  }

  async updateService(slug: string, service: Partial<InsertService>): Promise<Service | undefined> {
    const updateData: any = { ...service, updatedAt: new Date() };
    const result = await db.update(services)
      .set(updateData)
      .where(eq(services.slug, slug))
      .returning();
    return result[0];
  }

  // Case Study methods
  async getCaseStudies(): Promise<CaseStudy[]> {
    return db.select().from(caseStudies).where(eq(caseStudies.isPublished, true));
  }

  async getCaseStudy(slug: string): Promise<CaseStudy | undefined> {
    const result = await db.select().from(caseStudies).where(eq(caseStudies.slug, slug));
    return result[0];
  }

  async createCaseStudy(caseStudy: InsertCaseStudy): Promise<CaseStudy> {
    const result = await db.insert(caseStudies).values([caseStudy]).returning();
    return result[0];
  }

  async updateCaseStudy(slug: string, caseStudy: Partial<InsertCaseStudy>): Promise<CaseStudy | undefined> {
    const updateData: any = { ...caseStudy, updatedAt: new Date() };
    const result = await db.update(caseStudies)
      .set(updateData)
      .where(eq(caseStudies.slug, slug))
      .returning();
    return result[0];
  }

  // Blog Post methods
  async getBlogPosts(): Promise<BlogPost[]> {
    return db.select().from(blogPosts);
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return db.select().from(blogPosts).where(eq(blogPosts.isPublished, true));
  }

  async getBlogPost(slug: string): Promise<BlogPost | undefined> {
    const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return result[0];
  }

  async createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost> {
    const result = await db.insert(blogPosts).values([blogPost]).returning();
    return result[0];
  }

  async updateBlogPost(slug: string, blogPost: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const updateData: any = { ...blogPost, updatedAt: new Date() };
    const result = await db.update(blogPosts)
      .set(updateData)
      .where(eq(blogPosts.slug, slug))
      .returning();
    return result[0];
  }

  // Testimonial methods
  async getTestimonials(): Promise<Testimonial[]> {
    return db.select().from(testimonials);
  }

  async getActiveTestimonials(): Promise<Testimonial[]> {
    return db.select().from(testimonials).where(eq(testimonials.isActive, true));
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const result = await db.insert(testimonials).values(testimonial).returning();
    return result[0];
  }

  // Lead methods
  async createLead(lead: InsertLead): Promise<Lead> {
    const result = await db.insert(leads).values(lead).returning();
    return result[0];
  }

  async getLeads(): Promise<Lead[]> {
    return db.select().from(leads);
  }

  async getLeadsByType(formType: string): Promise<Lead[]> {
    return db.select().from(leads).where(eq(leads.formType, formType));
  }

  // Stats methods
  async getStats(): Promise<Stat[]> {
    return db.select().from(stats);
  }

  async getActiveStats(): Promise<Stat[]> {
    return db.select().from(stats).where(eq(stats.isActive, true));
  }

  async createStat(stat: InsertStat): Promise<Stat> {
    const result = await db.insert(stats).values(stat).returning();
    return result[0];
  }

  async updateStat(id: string, stat: Partial<InsertStat>): Promise<Stat | undefined> {
    const result = await db.update(stats)
      .set(stat)
      .where(eq(stats.id, id))
      .returning();
    return result[0];
  }
}

export const storage = new DatabaseStorage();
