#!/usr/bin/env tsx

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { services, caseStudies, testimonials, stats } from "@shared/schema";

// Import the existing JSON data
import servicesData from "../client/src/data/services.json";
import caseStudiesData from "../client/src/data/case-studies.json";
import testimonialsData from "../client/src/data/testimonials.json";
import statsData from "../client/src/data/stats.json";

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client);

async function migrateData() {
  console.log("Starting data migration...");

  try {
    // Migrate Services
    console.log("Migrating services...");
    for (const service of servicesData) {
      await db.insert(services).values({
        slug: service.slug,
        title: service.title,
        description: service.description,
        longDescription: service.longDescription,
        keyFeatures: service.keyFeatures,
        isActive: true,
      }).onConflictDoNothing();
    }
    console.log(`✓ Migrated ${servicesData.length} services`);

    // Migrate Case Studies
    console.log("Migrating case studies...");
    for (const caseStudy of caseStudiesData) {
      await db.insert(caseStudies).values({
        slug: caseStudy.slug,
        title: caseStudy.title,
        description: caseStudy.description,
        category: caseStudy.category,
        date: caseStudy.date,
        results: caseStudy.results,
        challenge: caseStudy.challenge,
        solution: caseStudy.solution,
        outcome: caseStudy.outcome,
        isPublished: true,
      }).onConflictDoNothing();
    }
    console.log(`✓ Migrated ${caseStudiesData.length} case studies`);

    // Migrate Testimonials
    console.log("Migrating testimonials...");
    for (const testimonial of testimonialsData) {
      await db.insert(testimonials).values({
        name: testimonial.name,
        title: testimonial.title,
        quote: testimonial.quote,
        company: testimonial.company,
        isActive: true,
      }).onConflictDoNothing();
    }
    console.log(`✓ Migrated ${testimonialsData.length} testimonials`);

    // Migrate Stats
    console.log("Migrating stats...");
    for (let i = 0; i < statsData.length; i++) {
      const stat = statsData[i];
      await db.insert(stats).values({
        value: stat.value,
        description: stat.description,
        order: i.toString(),
        isActive: true,
      }).onConflictDoNothing();
    }
    console.log(`✓ Migrated ${statsData.length} stats`);

    console.log("✅ Data migration completed successfully!");

  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

// Run the migration
migrateData();