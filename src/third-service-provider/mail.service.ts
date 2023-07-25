import { Injectable } from '@nestjs/common';
import { MailService } from '@sendgrid/mail';

@Injectable()
export class EmailService {
  private readonly mailService: MailService;

  constructor() {
    this.mailService = new MailService();
    this.mailService.setApiKey(
      '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'
    );
  }

  async sendEmail(
    to: string,
    subject: string,
    content: string
  ): Promise<void> {
    const msg = {
      to,
      from: 'nhanrooney113@gmail.com',
      subject,
      text: content,
      html: `<p>${content}</p>`,
    };

    try {
      await this.mailService.send(msg);
      console.log(
        'Email sent successfully',
        JSON.stringify(msg, null, 4)
      );
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
