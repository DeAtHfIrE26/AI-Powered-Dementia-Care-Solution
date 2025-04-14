import type { MailDataRequired } from '@sendgrid/mail';
import { MailService } from '@sendgrid/mail';

const isDevelopment = process.env.NODE_ENV === 'development';

const mailService = new MailService();

// Only require API key in production
if (!process.env.SENDGRID_API_KEY && !isDevelopment) {
  throw new Error("SENDGRID_API_KEY environment variable must be set in production");
} else if (process.env.SENDGRID_API_KEY) {
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
}

interface EmailParams {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  try {
    // In development, just log the email instead of sending if no API key
    if (isDevelopment && !process.env.SENDGRID_API_KEY) {
      console.log('Development Mode: Email would be sent with the following params:');
      console.log(JSON.stringify(params, null, 2));
      return true;
    }
    
    // Ensure we have at least one content property as required by SendGrid
    if (!params.text && !params.html) {
      throw new Error('Email must have either text or html content');
    }
    
    const msg: MailDataRequired = {
      to: params.to,
      from: 'kashyappatel2673@gmail.com', // As requested sender email
      subject: params.subject,
      content: [
        {
          type: params.html ? 'text/html' : 'text/plain',
          value: params.html || params.text || '',
        },
      ],
    };
    
    await mailService.send(msg);
    console.log(`Email sent successfully to ${params.to}`);
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}

export async function sendDemoRequestConfirmation(
  name: string,
  email: string,
  role: string
): Promise<boolean> {
  const subject = 'Your MemoTag Demo Request Confirmation';
  
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
        <p>© 2025 MemoTag. All rights reserved.</p>
        <p>If you didn't request this demo, please disregard this email.</p>
      </div>
    </div>
  `;
  
  const text = `
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
    
    © 2025 MemoTag. All rights reserved.
    If you didn't request this demo, please disregard this email.
  `;
  
  return sendEmail({
    to: email,
    subject,
    html,
    text
  });
}