import { Injectable } from '@nestjs/common';
import { MailService } from '@sendgrid/mail';

@Injectable()
export class EmailService {
  private readonly mailService: MailService;

  constructor() {
    this.mailService = new MailService();
    this.mailService.setApiKey(
      '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',
    );
  }

  async sendEmail(to: string, subject: string, content: string): Promise<void> {
    const msg = {
      to,
      from: 'nhanrooney113@gmail.com',
      subject,
      text: content,
      html: `<p>${content}</p>`,
    };

    try {
      await this.mailService.send(msg);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
