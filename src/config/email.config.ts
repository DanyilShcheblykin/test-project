import { registerAs } from '@nestjs/config';

export default registerAs('email', () => ({
  emailHost: process.env.EMAIL_HOST,
  emailPort: process.env.EMAIL_PORT,
  emailSecure: process.env.EMAIL_SECURE,
  emailUser: process.env.EMAIL_USER,
  emailPassword: process.env.EMAIL_PASSWORD,
  emailFromName: process.env.EMAIL_FROM_NAME,
  emailFromEmail: process.env.EMAIL_FROM_EMAIL,
  emailApiKey: process.env.EMAIL_API_KEY,
  emailDomain: process.env.EMAIL_DOMAIN,
  sendgridApiKey: process.env.SENDGRID_API_KEY,
  sendgridFromEmail: process.env.SENDGRID_FROM_EMAIL,
}));
