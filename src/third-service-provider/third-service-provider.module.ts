import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { EmailService } from './mail.service';

@Module({
  providers: [SmsService, EmailService],
  exports: [ThirdPartyModule],
})
export class ThirdPartyModule {}
