import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services like SendGrid, Mailgun, etc.
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

export async function sendEmail({ to, subject, html }: EmailOptions) {
  try {
    const mailOptions = {
      from: `"Glider" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function sendWaitlistConfirmation(email: string, name: string) {
  const subject = '🚀 Welcome to Glider Waitlist!';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #4F46E5;">Welcome to Glider, ${name}!</h2>
      <p>Thank you for joining the Glider waitlist. We're excited to have you on board!</p>
      <p>We'll notify you as soon as we launch. In the meantime, feel free to reach out if you have any questions.</p>
      <p>Best regards,<br>The Glider Team</p>
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
      <p style="font-size: 12px; color: #6b7280;">
        You're receiving this email because you signed up for the Glider waitlist.
        If this wasn't you, please ignore this email.
      </p>
    </div>
  `;

  return sendEmail({ to: email, subject, html });
}

export async function sendNewWaitlistNotification(email: string, name: string, data: Record<string, any>) {
  const subject = `🎉 New Waitlist Signup: ${name}`;
  
  const formatData = (obj: Record<string, any>, prefix = ''): string => {
    return Object.entries(obj)
      .map(([key, value]) => {
        if (value && typeof value === 'object') {
          return `${key}:<br>${formatData(value, '&nbsp;&nbsp;')}`;
        }
        return `${prefix}${key}: <strong>${value || 'N/A'}</strong>`;
      })
      .join('<br>');
  };

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #4F46E5;">New Waitlist Signup 🎉</h2>
      <p>A new user has joined the Glider waitlist!</p>
      <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
        ${formatData({ email, name, ...data })}
      </div>
      <p>Total waitlist signups: <strong>${await getWaitlistCount()}</strong></p>
      <p>Best regards,<br>Glider Notification System</p>
    </div>
  `;

  // Send to your admin email
  return sendEmail({ 
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER || '',
    subject,
    html
  });
}

// Helper function to get waitlist count
async function getWaitlistCount(): Promise<number> {
  // Implement this based on your storage solution
  // For now, returning a placeholder
  return 0;
}
