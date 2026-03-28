import type { Express } from "express";
import { createServer, type Server } from "http";
import { sqliteStorage as storage } from "./sqlite-storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";
import { sendWaitlistConfirmation, sendNewWaitlistNotification } from "./email";

// Validate environment variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.warn('Warning: Email credentials not set. Email notifications will not work.');
  console.warn('Please set EMAIL_USER and EMAIL_PASS environment variables.');
}

if (!process.env.ADMIN_EMAIL) {
  console.warn('Warning: ADMIN_EMAIL not set. Using EMAIL_USER for admin notifications.');
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      
      // Send confirmation email to user
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        try {
          await sendWaitlistConfirmation(validatedData.email, validatedData.name || 'User');
          
          // Send notification to admin
          await sendNewWaitlistNotification(
            validatedData.email, 
            validatedData.name || 'User',
            validatedData
          );
        } catch (emailError) {
          console.error('Error sending email notification:', emailError);
          // Don't fail the request if email sending fails
        }
      }
      
      res.status(201).json({
        success: true,
        message: "Thanks for reaching out. We'll respond shortly — check your email for confirmation.",
        data: contact,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      } else {
        console.error("Error creating contact:", error);
        res.status(500).json({
          success: false,
          message: "Failed to submit contact form",
        });
      }
    }
  });

  // Get all contacts (for admin purposes - could add auth later)
  app.get("/api/contacts", async (_req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json({
        success: true,
        data: contacts,
      });
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch contacts",
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
