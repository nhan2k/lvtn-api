import { Injectable } from '@nestjs/common';
import * as twilio from 'twilio';

@Injectable()
export class SmsService {
  private twilioClient: twilio.Twilio;

  constructor() {
    this.twilioClient = twilio(
      'AC681423c6f4a1a17a69ac683dc7667ea4',
      'd4027abb5a7828f4854e74923a264207'
    );
  }

  async sendOtp(phoneNumber: string, otp: string): Promise<void> {
    try {
      const message = await this.twilioClient.messages.create({
        body: `Your OTP: ${otp}`,
        from: '+13614597149',
        to: phoneNumber,
      });

      console.log('OTP message sent:', message.sid);
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  }
}
