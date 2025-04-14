import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { sendDemoRequestConfirmation } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission route
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate submission data
      const contactData = insertContactSchema.parse(req.body);
      
      // Add timestamp
      const submissionWithTimestamp = {
        ...contactData,
        createdAt: new Date().toISOString()
      };
      
      // Store submission
      const submission = await storage.createContactSubmission(submissionWithTimestamp);
      
      // Send confirmation email for demo requests if waitlist is joined
      if (contactData.joinWaitlist) {
        try {
          await sendDemoRequestConfirmation(
            contactData.name,
            contactData.email,
            contactData.role
          );
          console.log(`Demo request confirmation email sent to ${contactData.email}`);
        } catch (emailError) {
          console.error("Failed to send confirmation email:", emailError);
          // We don't want to fail the request if just the email fails
        }
      }
      
      return res.status(200).json({ 
        success: true, 
        message: "Contact submission received",
        data: submission
      });
    } catch (err) {
      if (err instanceof ZodError) {
        const validationError = fromZodError(err);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message
        });
      }
      
      return res.status(500).json({ 
        success: false, 
        message: "An error occurred while processing your request"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
