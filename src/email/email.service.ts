import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;
  private readonly configService: ConfigService;
  constructor(configService: ConfigService) {
    this.configService = configService;

    this.transporter = nodemailer.createTransport({
      host: this.configService.get('email.emailHost'),
      port: this.configService.get('email.emailPort'),
      auth: {
        user: this.configService.get('email.emailUser'),
        pass: this.configService.get('email.emailPassword'),
      },
    });
  }

  public async sendMailSmtp(
    to: string,
    subject: string,
    text: string,
    html: string,
  ) {
    try {
      let mail_options;
      if (text) {
        mail_options = {
          from: `"${this.configService.get('email.emailFromName')}" <${this.configService.get('email.emailFromEmail')}>`,
          to,
          subject,
          text,
        };
      } else {
        mail_options = {
          from: `"${this.configService.get('email.emailFromName')}" <${this.configService.get('email.emailFromEmail')}>`,
          to,
          subject,
          html,
        };
      }

      const info = await this.transporter.sendMail(mail_options);
      return info;
    } catch (error) {
      console.error('Error occurred while sending email via SMTP:', error);
    }
  }

  public async sendMail(
    to: string,
    subject: string,
    text: string,
    html: string,
  ) {
    try {
      let mailOptions;
      if (text) {
        mailOptions = {
          from: {
            email: this.configService.get('email.emailFromEmail'),
            name: this.configService.get('email.emailFromName'),
          },
          to: [
            {
              email: to,
            },
          ],
          subject: subject,
          text: text,
        };
      } else {
        mailOptions = {
          from: {
            email: this.configService.get('email.emailFromEmail'),
            name: this.configService.get('email.emailFromName'),
          },
          to: [
            {
              email: to,
            },
          ],
          subject: subject,
          html: html,
        };
      }

      const response = await axios.post(
        'https://send.api.mailtrap.io/api/send',
        mailOptions,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.configService.get('email.emailApiKey')}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error(
        'Error occurred while sending email via Mailtrap API:',
        error,
      );
    }
  }
}
