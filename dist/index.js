var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  contactSubmissions: () => contactSubmissions,
  insertContactSchema: () => insertContactSchema,
  insertUserSchema: () => insertUserSchema,
  users: () => users
});
import { pgTable, text, serial, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  role: text("role").notNull(),
  message: text("message"),
  joinWaitlist: boolean("join_waitlist").default(false),
  createdAt: text("created_at").notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertContactSchema = createInsertSchema(contactSubmissions).omit({ id: true, createdAt: true });

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq } from "drizzle-orm";
var DatabaseStorage = class {
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || void 0;
  }
  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || void 0;
  }
  async createUser(insertUser) {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  async createContactSubmission(submission) {
    const [contactSubmission] = await db.insert(contactSubmissions).values(submission).returning();
    return contactSubmission;
  }
  async getContactSubmissions() {
    return await db.select().from(contactSubmissions);
  }
};
var storage = new DatabaseStorage();

// server/routes.ts
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

// server/email.ts
import { MailService } from "@sendgrid/mail";
var isDevelopment = process.env.NODE_ENV === "development";
var mailService = new MailService();
if (!process.env.SENDGRID_API_KEY && !isDevelopment) {
  throw new Error("SENDGRID_API_KEY environment variable must be set in production");
} else if (process.env.SENDGRID_API_KEY) {
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
}
async function sendEmail(params) {
  try {
    if (isDevelopment && !process.env.SENDGRID_API_KEY) {
      console.log("Development Mode: Email would be sent with the following params:");
      console.log(JSON.stringify(params, null, 2));
      return true;
    }
    if (!params.text && !params.html) {
      throw new Error("Email must have either text or html content");
    }
    const msg = {
      to: params.to,
      from: "kashyappatel2673@gmail.com",
      // As requested sender email
      subject: params.subject,
      content: [
        {
          type: params.html ? "text/html" : "text/plain",
          value: params.html || params.text || ""
        }
      ]
    };
    await mailService.send(msg);
    console.log(`Email sent successfully to ${params.to}`);
    return true;
  } catch (error) {
    console.error("SendGrid email error:", error);
    return false;
  }
}
async function sendDemoRequestConfirmation(name, email, role) {
  const subject = "Your MemoTag Demo Request Confirmation";
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #0d9488; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">MemoTag</h1>
        <p style="color: white; margin: 5px 0 0;">AI-Powered Dementia Care</p>
      </div>
      
      <div style="padding: 20px; border: 1px solid #e0e0e0; border-top: none;">
        <h2>Thank You for Your Interest!</h2>
        
        <p>Dear ${name},</p>
        
        <p>Thank you for requesting a demo of MemoTag's AI-powered dementia care platform. We're excited to show you how our technology can transform care for those with dementia.</p>
        
        <p>Your request details:</p>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Role:</strong> ${role}</li>
        </ul>
        
        <p>Our team will reach out to you within 1-2 business days to schedule your personalized demo. In the meantime, feel free to reply to this email if you have any questions.</p>
        
        <div style="margin: 30px 0; text-align: center;">
          <a href="https://memotagcare.com/resources" style="background-color: #0d9488; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Explore Resources</a>
        </div>
        
        <p>Best regards,<br>The MemoTag Team</p>
      </div>
      
      <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
        <p>\xA9 2025 MemoTag. All rights reserved.</p>
        <p>If you didn't request this demo, please disregard this email.</p>
      </div>
    </div>
  `;
  const text2 = `
    Thank You for Your Interest in MemoTag!
    
    Dear ${name},
    
    Thank you for requesting a demo of MemoTag's AI-powered dementia care platform. We're excited to show you how our technology can transform care for those with dementia.
    
    Your request details:
    - Name: ${name}
    - Email: ${email}
    - Role: ${role}
    
    Our team will reach out to you within 1-2 business days to schedule your personalized demo. In the meantime, feel free to reply to this email if you have any questions.
    
    Best regards,
    The MemoTag Team
    
    \xA9 2025 MemoTag. All rights reserved.
    If you didn't request this demo, please disregard this email.
  `;
  return sendEmail({
    to: email,
    subject,
    html,
    text: text2
  });
}

// server/routes.ts
async function registerRoutes(app2) {
  app2.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const submissionWithTimestamp = {
        ...contactData,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      const submission = await storage.createContactSubmission(submissionWithTimestamp);
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
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
